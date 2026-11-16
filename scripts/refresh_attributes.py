#!/usr/bin/env python3
"""
Field Survey — Attribute Re-verification (Numbeo)
==================================================

Re-verifies cost_tier, safety_level, healthcare_level against a fresh pull
of Numbeo's country rankings (data/raw/*.html, fetched this run).

Method:
  1. Parse Numbeo Cost of Living Index, Crime Index, Health Care Index.
  2. Map each index to the app's categorical tiers with thresholds
     calibrated against the June 2026 hand assignments.
  3. Hysteresis: only propose a change when the index sits INSIDE another
     tier's band by a margin (not merely across a boundary line).
  4. Territories Numbeo doesn't list are left untouched (reported).

Climate (Köppen), language, religious_freedom, infrastructure are NOT
refreshed here — they change slowly / need qualitative sources.

Usage:
    python scripts/refresh_attributes.py            # dry-run (report only)
    python scripts/refresh_attributes.py --apply    # write territories.json
"""

from __future__ import annotations

import argparse
import html as html_mod
import json
import re
import sys
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parent.parent
RAW = PROJECT_ROOT / 'data' / 'raw'
ATTRIBUTES_FILE = PROJECT_ROOT / 'data' / 'territories.json'

# ---------------------------------------------------------------------------
# Numbeo name -> territories.json name
# ---------------------------------------------------------------------------
NAME_MAP = {
    'united kingdom': 'Britain',
    'united states': 'United States',
    'czech republic': 'Czech Republic',
    'czechia': 'Czech Republic',
    'ivory coast': "Côte d'Ivoire",
    'cote d ivoire': "Côte d'Ivoire",
    'dr congo': 'Congo, Dem. Republic of',
    'congo (democratic rep. of)': 'Congo, Dem. Republic of',
    'democratic republic of congo': 'Congo, Dem. Republic of',
    'congo': 'Congo, Republic of',
    ' republic of congo': 'Congo, Republic of',
    'russia': 'Russia',
    'south korea': 'South Korea',
    'korea, south': 'South Korea',
    'north kacedonia': 'North Macedonia',
    'macedonia': 'North Macedonia',
    'myanmar': 'Myanmar (Burma)',
    'cape verde': 'Cape Verde',
    'eswatini': 'Eswatini',
    'swaziland': 'Eswatini',
    'palestine': 'Palestine',
    'west bank': 'Palestine',
    'vietnam': 'Vietnam',
    'laos': 'Laos',
    'syria': 'Syria',
    'iran': 'Iran',
    'turkey': 'Turkey',
    'united arab emirates': 'United Arab Emirates',
    'trinidad and tobago': 'Trinidad',
    'puerto rico': 'Puerto Rico',
    'hong kong': 'Hong Kong',
    'bosnia and herzegovina': 'Bosnia',
    'saudi arabia': 'Saudi Arabia',
    'south africa': 'South Africa',
    'new zealand': 'New Zealand',
    'sri lanka': 'Sri Lanka',
    'costa rica': 'Costa Rica',
    'dominican republic': 'Dominican Republic',
    'papua new guinea': 'Papua New Guinea',
    'saudi arabia ': 'Saudi Arabia',
    'taiwan': 'Taiwan',
    'curaçao': 'Curaçao',
    'curacao': 'Curaçao',
    'aruba': 'Aruba',
    'kosovo': 'Kosovo',
    'rwanda': 'Rwanda',
    'uganda': 'Uganda',
    'kenya': 'Kenya',
    'tanzania': 'Tanzania',
    'ethiopia': 'Ethiopia',
    'ghana': 'Ghana',
    'nigeria': 'Nigeria',
    'zambia': 'Zambia',
    'zimbabwe': 'Zimbabwe',
    'botswana': 'Botswana',
    'namibia': 'Namibia',
    'mozambique': 'Mozambique',
    'malawi': 'Malawi',
    'brazil': 'Brazil',
    'peru': 'Peru',
    'bolivia': 'Bolivia',
    'paraguay': 'Paraguay',
    'uruguay': 'Uruguay',
    'ecuador': 'Ecuador',
    'colombia': 'Colombia',
    'venezuela': 'Venezuela',
    'guatemala': 'Guatemala',
    'honduras': 'Honduras',
    'nicaragua': 'Nicaragua',
    'panama': 'Panama',
    'elsalvador': 'El Salvador',
    'el salvador': 'El Salvador',
    'belize': 'Belize',
    'jamaica': 'Jamaica',
    'haiti': 'Haiti',
    'cuba': 'Cuba',
    'mexico': 'Mexico',
    'canada': 'Canada',
    'australia': 'Australia',
    'japan': 'Japan',
    'china': 'China',
    'india': 'India',
    'nepal': 'Nepal',
    'thailand': 'Thailand',
    'cambodia': 'Cambodia',
    'malaysia': 'Malaysia',
    'singapore': 'Singapore',
    'indonesia': 'Indonesia',
    'philippines': 'Philippines',
    'mongolia': 'Mongolia',
    'kazakhstan': 'Kazakhstan',
    'georgia': 'Georgia',
    'armenia': 'Armenia',
    'azerbaijan': 'Azerbaijan',
    'pakistan': 'Pakistan',
    'bangladesh': 'Bangladesh',
    'sri-lanka': 'Sri Lanka',
    'bahrain': 'Bahrain',
    'qatar': 'Qatar',
    'kuwait': 'Kuwait',
    'oman': 'Oman',
    'jordan': 'Jordan',
    'lebanon': 'Lebanon',
    'iraq': 'Iraq',
    'egypt': 'Egypt',
    'morocco': 'Morocco',
    'tunisia': 'Tunisia',
    'algeria': 'Algeria',
    'senegal': 'Senegal',
    'mali': 'Mali',
    'niger': 'Niger',
    'chad': 'Chad',
    'sudan': 'Sudan',
    'cameroon': 'Cameroon',
    'gabon': 'Gabon',
    'madagascar': 'Madagascar',
    'mauritius': 'Mauritius',
}

# ---------------------------------------------------------------------------
# Index -> tier bands.
# Calibrated 2026-11-16 against June hand assignments (see calibration
# report printed by --calibrate). Bands include a small no-man's-land:
# a value within MARGIN of a boundary keeps its CURRENT tier (hysteresis).
# ---------------------------------------------------------------------------
# Numbeo Cost of Living Index (NYC = 100, excl. rent).
# Bands calibrated 2026-11-16 at midpoints of June-tier medians
# (ultra_low 35.1, low 39.6, moderate 49.1, high 68.2, ultra_high 97.6),
# so a tier's median always stays in its own tier; only outliers move.
COST_BANDS = [
    (37.4, 'ultra_low'),
    (44.4, 'low'),
    (58.7, 'moderate'),
    (82.9, 'high'),
    (float('inf'), 'ultra_high'),
]
COST_MARGIN = 3.0

# Numbeo Crime Index (0-100, higher = more crime).
#   very_safe < 20, safe 20-35, moderate 35-50, unsafe 50-65, very_unsafe > 65
SAFETY_BANDS = [
    (20, 'very_safe'),
    (35, 'safe'),
    (50, 'moderate'),
    (65, 'unsafe'),
    (float('inf'), 'very_unsafe'),
]
SAFETY_MARGIN = 2.0

# Numbeo Health Care Index (0-100, higher = better).
# Bands calibrated 2026-11-16 at midpoints of June-tier medians
# (minimal 39.4, basic 52.1, moderate 59.2, good 63.8, excellent 73.5).
HEALTH_BANDS_DESC = [
    (68.7, 'excellent'),
    (61.5, 'good'),
    (55.7, 'moderate'),
    (45.8, 'basic'),
    (0, 'minimal'),
]
HEALTH_MARGIN = 3.0


def norm(s):
    s = (s or '').strip().lower()
    s = re.sub(r'[^a-z ]', '', s)
    return re.sub(r'\s+', ' ', s).strip()


def parse_numbeo_table(path: Path, col_index: int) -> dict:
    """Return {country: [floats]} from a Numbeo rankings page."""
    txt = path.read_text(encoding='utf-8', errors='replace')
    out = {}
    for row in re.findall(r'<tr[^>]*>(.*?)</tr>', txt, re.S):
        cells = re.findall(r'<td[^>]*>(.*?)</td>', row, re.S)
        if len(cells) < 3:
            continue
        clean = [html_mod.unescape(re.sub(r'<[^>]+>', '', c)).strip() for c in cells]
        name = next((c for c in clean
                     if re.match(r"^[A-Za-zÀ-ÿ'\-\.\, ]{3,45}$", c) and not c[0].isdigit()), None)
        if not name:
            continue
        nums = [float(c) for c in clean if re.match(r'^-?\d+(\.\d+)?$', c)]
        if not nums:
            continue
        out[name] = nums
    return out


def band_for(value: float, bands: list, descending: bool = False) -> str:
    """Map value to tier. bands: [(upper_bound, tier), ...] ascending,
    or [(lower_bound, tier), ...] if descending."""
    if not descending:
        for bound, tier in bands:
            if value < bound:
                return tier
        return bands[-1][1]
    for bound, tier in bands:
        if value > bound:
            return tier
    return bands[-1][1]


def confident(value: float, bands: list, target: str, descending=False, margin=2.0) -> bool:
    """True if value is inside target's band by more than MARGIN."""
    if not descending:
        bounds = [b for b, t in bands if t == target]
        if not bounds:
            return False
        hi = bounds[0]
        lower = [b for b, t in bands if b <= hi]
        lo = max(lower) if lower else -1e9
        return (lo + margin) <= value < (hi - margin)
    bounds = sorted([b for b, t in bands if t == target], reverse=True)
    if not bounds:
        return False
    hi = bounds[0]
    lo_candidates = [b for b, t in bands if b < hi]
    lo = max(lo_candidates) if lo_candidates else -1e9
    return (lo + margin) <= value < (hi - margin)


def match(name: str, territories: list) -> dict | None:
    key = norm(NAME_MAP.get(norm(name), name))
    for t in territories:
        if norm(t['name']) == key:
            return t
    # try direct contains
    cands = [t for t in territories if len(key) >= 4 and
             (key in norm(t['name']) or norm(t['name']) in key)]
    return cands[0] if len(cands) == 1 else None


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--apply', action='store_true', help='Write changes')
    parser.add_argument('--calibrate', action='store_true',
                        help='Print current-tier vs index calibration table')
    args = parser.parse_args()

    territories = json.loads(ATTRIBUTES_FILE.read_text())

    col = parse_numbeo_table(RAW / 'numbeo-col.html', 0)
    crime = parse_numbeo_table(RAW / 'numbeo-crime.html', 0)
    health = parse_numbeo_table(RAW / 'numbeo-health.html', 0)
    print(f"Numbeo tables: cost={len(col)} crime={len(crime)} health={len(health)}")

    # Normalize lookups by name
    def idx(table, tname_key):
        for n, nums in table.items():
            mapped = NAME_MAP.get(norm(n), n)
            if norm(mapped) == tname_key or norm(n) == tname_key:
                return nums
        return None

    changes, unmatched = [], []
    seen = set()
    for t in territories:
        key = norm(t['name'])
        col_v = idx(col, key)
        crime_v = idx(crime, key)
        health_v = idx(health, key)

        proposals = []
        if col_v:
            # Cost of Living Index is typically first numeric column on that page
            v = col_v[0]
            new = band_for(v, COST_BANDS)
            cur = t['cost_tier']
            if new != cur and confident(v, COST_BANDS, new):
                proposals.append(('cost_tier', cur, new, v))
            elif args.calibrate and col_v:
                print(f"  cal cost {t['name']:<28} cur={cur:<10} idx={v}")
        if crime_v:
            v = crime_v[0]
            new = band_for(v, SAFETY_BANDS)
            cur = t['safety_level']
            if new != cur and confident(v, SAFETY_BANDS, new):
                proposals.append(('safety_level', cur, new, v))
            elif args.calibrate:
                print(f"  cal crime {t['name']:<28} cur={cur:<12} idx={v}")
        if health_v:
            v = health_v[0]
            new = band_for(v, HEALTH_BANDS_DESC, descending=True)
            cur = t['healthcare_level']
            if new != cur and confident(v, HEALTH_BANDS_DESC, new,
                                        descending=True, margin=HEALTH_MARGIN):
                proposals.append(('healthcare_level', cur, new, v))
            elif args.calibrate:
                print(f"  cal health {t['name']:<28} cur={cur:<10} idx={v}")

        if not col_v and not crime_v and not health_v:
            unmatched.append(t['name'])
        if proposals:
            changes.append((t, proposals))

    print(f"\nTerritories with Numbeo data: {len(territories) - len(unmatched)}/{len(territories)}")
    print(f"Numbeo-unlisted (untouched): {len(unmatched)}")
    print(f"\nProposed changes: {sum(len(p) for _, p in changes)} attributes across "
          f"{len(changes)} territories\n")
    for t, props in sorted(changes, key=lambda x: x[0]['name']):
        for attr, old, new, v in props:
            print(f"  ~ {t['name']}: {attr} {old} -> {new}  (index {v})")

    if not args.apply:
        print("\n--dry-run: nothing written. Re-run with --apply.")
        return

    for t, props in changes:
        for attr, old, new, v in props:
            t[attr] = new
    ATTRIBUTES_FILE.write_text(
        json.dumps(territories, indent=2, ensure_ascii=False) + '\n')
    print(f"\n✓ Applied {sum(len(p) for _, p in changes)} attribute updates.")
    print("Next: python scripts/refresh.py --dry-run  (score impact)")


if __name__ == '__main__':
    main()
