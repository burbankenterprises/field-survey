#!/usr/bin/env python3
"""
Field Survey — Monthly Refresh Pipeline
========================================

This is the human-in-the-loop data refresh pipeline. It:

1. Loads the current scored dataset
2. Opens a structured diff prompt for reviewing/updating territory attributes
3. Re-scores all territories with the deterministic rubric
4. Generates a changelog of what changed
5. Outputs a new versioned dataset ready for review

Usage:
    python scripts/refresh.py                    # Interactive review
    python scripts/refresh.py --dry-run          # Show what would change, no write
    python scripts/refresh.py --auto-apply       # Apply all changes without review
    python scripts/refresh.py --report syr25_E.pdf  # Ingest new report data

In CI (GitHub Actions), it runs as --dry-run and opens a PR with proposed changes.
The PR review IS the human approval step.
"""

import argparse
import json
import os
import sys
from datetime import datetime, date
from pathlib import Path

# Add scripts dir to path for imports
sys.path.insert(0, str(Path(__file__).parent))
from scoring import score_territory, SCORING_VERSION, CRITERIA_FUNCTIONS, SOURCE_MAP, AS_OF

PROJECT_ROOT = Path(__file__).parent.parent
DATA_DIR = PROJECT_ROOT / 'data'
ATTRIBUTES_FILE = DATA_DIR / 'territories.json'
DATASET_FILE = PROJECT_ROOT / 'src' / 'data' / 'seed.ts'
CHANGELOG_FILE = DATA_DIR / 'changelog.json'


def load_attributes() -> list:
    """Load the territory attributes (source of truth for categorical data)."""
    if not ATTRIBUTES_FILE.exists():
        print(f"ERROR: {ATTRIBUTES_FILE} not found. Run scripts/generate_attributes.py first.")
        sys.exit(1)
    with open(ATTRIBUTES_FILE) as f:
        return json.load(f)


def load_current_dataset() -> dict:
    """Load the current published dataset from seed.ts."""
    if not DATASET_FILE.exists():
        return {'version': 0, 'territories': []}

    content = DATASET_FILE.read_text()
    # Extract JSON from TypeScript
    import re
    match = re.search(r'export const SEED_DATASET.*?=\s*(\{.*?\})\s*as const;', content, re.DOTALL)
    if not match:
        print("ERROR: Could not parse seed.ts")
        sys.exit(1)
    return json.loads(match.group(1))


def recompute_scores(territories: list) -> list:
    """Re-score all territories using the current rubric."""
    scored = []
    for t in territories:
        scored.append(score_territory(t))
    return scored


def diff_scores(old_dataset: dict, new_territories: list) -> list:
    """Compare old scores to new scores, return list of changes."""
    old_lookup = {}
    for t in old_dataset.get('territories', []):
        if 'scores' in t:
            old_lookup[t['name']] = t['scores']

    changes = []
    for t in new_territories:
        name = t['name']
        new_scores = t.get('scores', {})

        if name not in old_lookup:
            # New territory
            changes.append({
                'territory': name,
                'type': 'added',
                'details': f"New territory scored: {t.get('ratio', '?')} ratio, +{t.get('growthRate', '?')}% growth",
            })
            continue

        old_scores = old_lookup[name]
        for criterion, new_sc in new_scores.items():
            old_sc = old_scores.get(criterion, {})
            old_val = old_sc.get('score')
            new_val = new_sc.get('score')

            if old_val != new_val:
                changes.append({
                    'territory': name,
                    'type': 'score_change',
                    'criterion': criterion,
                    'old_score': old_val,
                    'new_score': new_val,
                    'old_rationale': old_sc.get('rationale', ''),
                    'new_rationale': new_sc.get('rationale', ''),
                })

    return changes


def classify_change(change: dict) -> str:
    """Classify a change as 'material' or 'minor'."""
    if change['type'] == 'added':
        return 'material'

    if change['type'] == 'score_change':
        criterion = change.get('criterion', '')
        old = change.get('old_score', 0)
        new = change.get('new_score', 0)
        delta = abs(new - old)

        # Visa, safety, and receptivity changes are always material
        if criterion in ('visa', 'safety', 'receptivity'):
            return 'material'

        # Climate never changes (static)
        if criterion == 'climate':
            return 'material'  # If it somehow changed, it's worth reviewing

        # Other criteria: >1 point shift is material
        if delta > 1:
            return 'material'

    return 'minor'


def load_changelog() -> list:
    """Load existing changelog."""
    if CHANGELOG_FILE.exists():
        with open(CHANGELOG_FILE) as f:
            return json.load(f)
    return []


def generate_versioned_dataset(territories: list, old_version: int) -> dict:
    """Generate a new versioned dataset ready for publication."""
    return {
        'version': old_version + 1,
        'generatedAt': datetime.now().strftime('%Y-%m-%d'),
        'scoringVersion': SCORING_VERSION,
        'territories': territories,
    }


def write_seed_ts(dataset: dict):
    """Write the dataset as TypeScript to seed.ts."""
    json_str = json.dumps(dataset, indent=2, ensure_ascii=False)
    count = len(dataset['territories'])

    ts = f'''// ============================================================================
// Field Survey — Dataset v{dataset['version']}
// {count} territories from the 2025 Service Year Report.
// All territories scored across 7 criteria.
// Generated by scripts/refresh.py — DO NOT EDIT MANUALLY.
// Scoring version: {dataset['scoringVersion']}
// ============================================================================

import type {{ Dataset }} from '../types';

export const SEED_DATASET: Dataset = {json_str} as const;
'''
    DATASET_FILE.write_text(ts)


def write_changelog(changes: list, version: int):
    """Append changes to changelog."""
    changelog = load_changelog()
    entry = {
        'version': version,
        'date': datetime.now().strftime('%Y-%m-%d'),
        'changes': changes,
        'summary': {
            'total': len(changes),
            'material': sum(1 for c in changes if classify_change(c) == 'material'),
            'minor': sum(1 for c in changes if classify_change(c) == 'minor'),
        },
    }
    changelog.append(entry)
    with open(CHANGELOG_FILE, 'w') as f:
        json.dump(changelog, f, indent=2)


def print_changes(changes: list):
    """Print a human-readable diff of all changes."""
    if not changes:
        print("✓ No changes detected. All scores remain the same.")
        return

    material = [c for c in changes if classify_change(c) == 'material']
    minor = [c for c in changes if classify_change(c) == 'minor']

    print(f"\n{'='*60}")
    print(f"  REFRESH SUMMARY: {len(changes)} changes")
    print(f"  ⚠ Material: {len(material)}  ·  Minor: {len(minor)}")
    print(f"{'='*60}\n")

    if material:
        print("⚠ MATERIAL CHANGES (require review):\n")
        for c in material:
            if c['type'] == 'added':
                print(f"  + {c['territory']}: {c['details']}")
            elif c['type'] == 'score_change':
                print(f"  ~ {c['territory']} · {c['criterion']}: {c['old_score']} → {c['new_score']}")
                print(f"    was: {c['old_rationale']}")
                print(f"    now: {c['new_rationale']}")
            print()

    if minor:
        print("Minor changes (auto-applied):\n")
        for c in minor:
            if c['type'] == 'score_change':
                print(f"  ~ {c['territory']} · {c['criterion']}: {c['old_score']} → {c['new_score']}")
        print()

    print(f"{'='*60}")


def main():
    parser = argparse.ArgumentParser(description='Field Survey monthly refresh pipeline')
    parser.add_argument('--dry-run', action='store_true', help='Show changes without writing')
    parser.add_argument('--auto-apply', action='store_true', help='Apply all changes without review')
    parser.add_argument('--report', type=str, help='Path to new Service Year Report PDF to ingest')
    args = parser.parse_args()

    print("Field Survey — Monthly Refresh Pipeline")
    print(f"  Scoring version: {SCORING_VERSION}")
    print(f"  Date: {datetime.now().strftime('%Y-%m-%d %H:%M')}\n")

    # Step 1: Load data
    print("[1] Loading territory attributes...")
    territories = load_attributes()
    print(f"    {len(territories)} territories loaded")

    print("[2] Loading current dataset...")
    current = load_current_dataset()
    print(f"    Current version: v{current.get('version', 0)}")

    # Step 3: Re-score
    print("[3] Re-scoring all territories with rubric v{}...".format(SCORING_VERSION))
    new_scored = recompute_scores(territories)
    print(f"    {len(new_scored)} territories scored")

    # Step 4: Diff
    print("[4] Computing diff against current dataset...")
    changes = diff_scores(current, new_scored)
    print_changes(changes)

    if not changes and current.get('version', 0) > 0:
        print("\n✓ Dataset is up to date. No action needed.")
        return

    # Step 5: Write or dry-run
    if args.dry_run:
        print("\n--dry-run: No files written. Review the changes above.")
        return

    # Step 6: Generate and write new dataset
    new_version = current.get('version', 0) + 1 if changes else current.get('version', 0)
    dataset = generate_versioned_dataset(new_scored, current.get('version', 0))

    if args.auto_apply:
        print(f"\n[5] Auto-applying all changes → v{new_version}")
        write_seed_ts(dataset)
        write_changelog(changes, new_version)
        print(f"    ✓ Written to {DATASET_FILE}")
        print(f"    ✓ Changelog updated at {CHANGELOG_FILE}")
        print(f"\n✓ Dataset v{new_version} published.")
    else:
        print(f"\n[5] Changes detected. Review above.")
        response = input(f"\nPublish dataset v{new_version}? (y/n): ").strip().lower()
        if response == 'y':
            write_seed_ts(dataset)
            write_changelog(changes, new_version)
            print(f"    ✓ Written to {DATASET_FILE}")
            print(f"    ✓ Changelog updated at {CHANGELOG_FILE}")
            print(f"\n✓ Dataset v{new_version} published.")
        else:
            print("Aborted. No changes written.")


if __name__ == '__main__':
    main()
