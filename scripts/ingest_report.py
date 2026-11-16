#!/usr/bin/env python3
"""
Field Survey — Service Year Report Ingestion
=============================================

Parses a JW Service Year Report PDF (e.g. syr26_E.pdf) and merges the
per-country table into data/territories.json (the source of truth).

Updates per territory: population, publishers (avg), ratio, growthRate.
Preserves: all categorical attributes (cost_tier, safety_level, ...) —
those are hand-researched and change only by manual edit.

Column quirks this parser handles (verified against syr25):
- "% Inc." and "No. Bptzd." cells are sometimes blank -> fewer numbers.
- Lands under ban have a dagger marker and no figures -> skipped.
- pct_inc is disambiguated against last year's avg publishers in
  territories.json: predicted = (new_avg/old_avg - 1) * 100.

Usage:
    python scripts/ingest_report.py syr26_E.pdf            # apply
    python scripts/ingest_report.py syr26_E.pdf --dry-run  # preview only

Then: python scripts/refresh.py --dry-run / --auto-apply (see docs/PIPELINE.md).
"""

from __future__ import annotations

import argparse
import json
import re
import sys
from datetime import datetime
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parent.parent
ATTRIBUTES_FILE = PROJECT_ROOT / 'data' / 'territories.json'
INGEST_MARKER = PROJECT_ROOT / 'data' / 'last_ingest.json'

# Report-name -> territories.json name, for naming drift between years.
# Extend after reviewing the "Unmatched report rows" list from a dry-run.
NAME_FIXES = {
    'congo dem republic of': 'Congo, Dem. Republic of',
    'congo republic of': 'Congo, Republic of',
    'st kitts and nevis': 'St Kitts',
    'st lucia': 'St Lucia',
    'st vincent': 'St Vincent',
    'macedonia': 'North Macedonia',
    'swaziland': 'Eswatini',
    'ivory coast': "Côte d'Ivoire",
    'united kingdom': 'Britain',
    'bosnia and herzegovina': 'Bosnia',
    'myanmar burma': 'Myanmar (Burma)',
    'curacao': 'Curaçao',
    'cape verde': 'Cape Verde',
}


def norm(s: str) -> str:
    s = s.strip().lower()
    s = re.sub(r'[^a-z ]', '', s)
    return re.sub(r'\s+', ' ', s).strip()


def extract_pdf_text(pdf_path: Path) -> str:
    import shutil
    import subprocess

    if shutil.which('pdftotext'):
        out = subprocess.run(
            ['pdftotext', '-layout', str(pdf_path), '-'],
            capture_output=True, text=True, check=True,
        )
        return out.stdout
    try:
        from pypdf import PdfReader
    except ImportError:
        print('ERROR: need pdftotext or pypdf to read the PDF')
        sys.exit(1)
    reader = PdfReader(str(pdf_path))
    return '\n'.join(page.extract_text() or '' for page in reader.pages)


NUM = r'-?\d{1,3}(?:,\d{3})*'


def parse_rows(text: str) -> dict:
    """Parse per-country rows -> {report_name: {population, peak, ratio, avg, pct_inc}}."""
    rows = {}
    for raw in text.splitlines():
        line = raw.strip()
        if not line:
            continue
        # name + 8..10 numbers (population, peak, ratio, avg, [pct], [bptzd], pio, congs, studies, memorial)
        m = re.match(rf'^(.+?)\s{{2,}}({NUM}(?:\s+{NUM}){{3,}})\s*$', line)
        if not m:
            continue
        name = m.group(1).strip().rstrip('†').strip()
        if not name or name.lower() in ('country or territory', 'jw.org'):
            continue
        nums = [int(g.replace(',', '')) for g in m.group(2).split()]
        if len(nums) < 8 or len(nums) > 10:
            continue  # not a country row
        population, peak, ratio, avg = nums[0], nums[1], nums[2], nums[3]
        # Sanity: peak >= avg, ratio ~= population / avg
        if peak < avg:
            continue
        if avg > 0 and not (0.5 * population / avg <= ratio <= 2.0 * population / avg):
            continue
        rows[name] = {
            'population': population,
            'peak': peak,
            'ratio': ratio,
            'avg': avg,
            'pct_inc': None,
            '_rest': nums[4:],
        }
    return rows


def resolve_pct_inc(report_row: dict, old_avg: int | None) -> int | None:
    """Figure out the % increase column, which may be blank.

    Column layout after the first four numbers:
      full row: pct, bptzd, pio, congs, studies, memorial  (6 values)
      blank pct: bptzd, pio, congs, studies, memorial      (5 values)
      blank bptzd: pct, pio, congs, studies, memorial      (5 values)
      both blank: pio, congs, studies, memorial            (4 values)

    Disambiguation: the last 3 columns (congs, studies, memorial) are
    large numbers relative to publishers (studies often exceed pubs);
    pct is always -35..35. A single small number followed by >= 5
    values is pct present; if it's absent, pct must be derived.
    """
    rest = report_row['_rest']
    if not rest:
        return None
    predicted = None
    if old_avg is not None and old_avg > 0:
        predicted = round((report_row['avg'] / old_avg - 1) * 100)
    # pct present and unambiguous (6 tail values, or small first value)
    if len(rest) == 6:
        return rest[0] if -35 <= rest[0] <= 35 else None
    if len(rest) == 5 and -35 <= rest[0] <= 35:
        # could be pct (blank bptzd) or bptzd-missing row; accept as pct
        # when it matches the predicted value or there is no prediction
        if predicted is not None and abs(rest[0] - predicted) <= 1:
            return rest[0]
        if predicted is None:
            return rest[0]
        return None
    if len(rest) == 4 and predicted is not None and abs(predicted) <= 35:
        # both pct and bptzd blank -> derive
        return predicted
    return None


def match_territory(name: str, territories: list) -> dict | None:
    key = norm(name)
    fixed = NAME_FIXES.get(key)
    if fixed is not None:
        for t in territories:
            if norm(t['name']) == norm(fixed):
                return t
    exact = [t for t in territories if norm(t['name']) == key]
    if len(exact) == 1:
        return exact[0]
    contains = [t for t in territories
                if len(key) >= 4 and (key in norm(t['name']) or norm(t['name']) in key)]
    return contains[0] if len(contains) == 1 else None


def apply_report(rows: dict, territories: list):
    updated, skipped = [], []
    for name, r in rows.items():
        t = match_territory(name, territories)
        if t is None:
            skipped.append(name)
            continue
        old = {
            'population': t.get('population'),
            'publishers': t.get('publishers'),
            'ratio': t.get('ratio'),
            'growthRate': t.get('growthRate'),
        }
        pct = resolve_pct_inc(r, t.get('publishers'))
        t['population'] = r['population']
        t['publishers'] = r['peak']  # dataset convention: 'publishers' = peak pubs
        t['ratio'] = r['ratio']
        t['growthRate'] = pct if pct is not None else 0
        updated.append({
            'territory': t['name'], 'report_name': name, 'old': old,
            'new': {k: t[k] for k in ('population', 'publishers', 'ratio', 'growthRate')},
        })
    return updated, skipped


def main():
    parser = argparse.ArgumentParser(description='Ingest Service Year Report PDF')
    parser.add_argument('pdf', help='Path to report PDF (e.g. syr26_E.pdf)')
    parser.add_argument('--dry-run', action='store_true', help='Preview without writing')
    args = parser.parse_args()

    pdf_path = Path(args.pdf).expanduser().resolve()
    if not pdf_path.exists():
        print(f'ERROR: {pdf_path} not found.')
        sys.exit(1)

    print('Field Survey — Service Year Report Ingestion')
    print(f'  PDF: {pdf_path.name}')
    print(f'  Date: {datetime.now().strftime("%Y-%m-%d %H:%M")}\n')

    rows = parse_rows(extract_pdf_text(pdf_path))
    print(f'[1] Parsed {len(rows)} country rows from PDF')
    if len(rows) < 150:
        print('ERROR: too few rows parsed — PDF layout may have changed.')
        sys.exit(1)

    territories = json.loads(ATTRIBUTES_FILE.read_text())
    print(f'[2] Loaded {len(territories)} territories from territories.json')

    updated, skipped = apply_report(rows, territories)
    print(f'[3] Matched {len(updated)} territories; {len(skipped)} unmatched rows')

    if skipped:
        print('\nUnmatched report rows:')
        for n in sorted(skipped)[:40]:
            print(f'  ? {n}')
        if len(skipped) > 40:
            print(f'  ... and {len(skipped) - 40} more')

    changed = [u for u in updated
               if any(u['old'][k] != u['new'][k] for k in u['new'])]
    print(f'\n[4] {len(changed)} of {len(updated)} matched territories would change values')
    for u in changed[:10]:
        o, n = u['old'], u['new']
        print(f"  ~ {u['territory']}: pubs {o['publishers']} → {n['publishers']}, "
              f"ratio {o['ratio']} → {n['ratio']}, growth {o['growthRate']} → {n['growthRate']}")
    if len(changed) > 10:
        print(f'  ... and {len(changed) - 10} more')

    total = sum(u['new']['publishers'] - (u['old']['publishers'] or 0) for u in updated)
    print(f'\nTotal avg-publisher delta across matched territories: {total:+,}')

    if args.dry_run:
        print('\n--dry-run: nothing written.')
        return

    ATTRIBUTES_FILE.write_text(
        json.dumps(territories, indent=2, ensure_ascii=False) + '\n')
    INGEST_MARKER.write_text(json.dumps({
        'ingestedAt': datetime.now().isoformat(timespec='seconds'),
        'pdf': pdf_path.name,
        'matched': len(updated),
        'unmatched': len(skipped),
    }, indent=2) + '\n')
    print(f'\n✓ Merged into {ATTRIBUTES_FILE}')
    print('Next steps:')
    print('  1. Review unmatched names above; extend NAME_FIXES if needed')
    print('  2. python scripts/refresh.py --dry-run    # see score impact')
    print('  3. python scripts/refresh.py --auto-apply # publish seed.ts v+1')


if __name__ == '__main__':
    main()
