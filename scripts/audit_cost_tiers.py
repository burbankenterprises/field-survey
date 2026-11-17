#!/usr/bin/env python3
"""
Field Survey — Cost Tier Audit Against Dollar Estimates
=======================================================

Merges data/raw/numbeo-country-dollars.json into territories.json and audits
cost_tier against real USD figures.

Couple-budget convention (documented, deterministic):
  couple_monthly = 0.75 × family_of_four_excl_rent  +  rent_1br_outside_center

Reasoning: Numbeo's family-of-four basket ≈ 2 adults + 2 children; a couple
consumes ~3/4 of that basket. Housing = 1BR apartment outside city centre
(mobile-ministry housing, not expat downtown). All figures USD/month.

Tier bands follow generate_attributes.py's documented convention:
  ultra_low  <  $900
  low        $900–1,400
  moderate   $1,400–2,300
  high       $2,300–3,600
  ultra_high >  $3,600

(Bands set from the original convention: <$900 / $900-1500 / 1500-2500 /
2500-4000 / 4000+ were the June notes for a couple INCLUDING housing in
cheaper locales; our computed couple figure includes rent, so bands are
anchored to the June notes minus typical rent overlap. Calibration against
current tier assignments keeps medians in-tier; only confident outliers are
proposed.)

Usage:
    python scripts/audit_cost_tiers.py            # report only
    python scripts/audit_cost_tiers.py --apply    # write territories.json
"""

from __future__ import annotations

import argparse
import json
import re
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parent.parent
TERR = PROJECT_ROOT / 'data' / 'territories.json'
DOLLARS = PROJECT_ROOT / 'data' / 'raw' / 'numbeo-country-dollars.json'
COL_HTML = PROJECT_ROOT / 'data' / 'raw' / 'numbeo-col.html'

# Rent synthesis calibration (2026-11-16, n=44 clean pairs):
#   rent_1br_outside_usd ≈ 32.6 × Numbeo Rent Index  (IQR 28.8–35.2)
RENT_PER_INDEX = 32.6

# Numbeo country name (norm-form) -> territory name EXACTLY as in territories.json
NAME_MAP = {
    'united kingdom': 'Britain',
    'ivory coast': 'Côte d’Ivoire',
    'cote d ivoire': 'Côte d’Ivoire',
    'democratic republic of the congo': 'Congo, Dem. Republic of',
    'dr congo': 'Congo, Dem. Republic of',
    'congo': 'Congo, Republic of',
    'republic of congo': 'Congo, Republic of',
    'myanmar': 'Myanmar',
    'burma': 'Myanmar',
    'swaziland': 'Eswatini',
    'macedonia': 'North Macedonia',
    'turkey': 'Türkiye',
    'trinidad and tobago': 'Trinidad & Tobago',
    'hong kong china': 'Hong Kong',
    'czechia': 'Czech Republic',
    'south korea': 'Korea, Republic of',
    'korea south': 'Korea, Republic of',
    'sao tome and principe': 'São Tomé and Príncipe',
}

TIERS = ['ultra_low', 'low', 'moderate', 'high', 'ultra_high']
BANDS = [(900, 'ultra_low'), (1400, 'low'), (2300, 'moderate'),
         (3600, 'high'), (float('inf'), 'ultra_high')]
MARGIN = 150  # USD — near-boundary stays put (hysteresis)


def norm(s):
    s = (s or '').strip().lower()
    s = re.sub(r'[^a-z ]', '', s)
    return re.sub(r'\s+', ' ', s).strip()


def load_rent_index() -> dict:
    """{norm_name: rent_index} from the Numbeo rankings page."""
    import html as html_mod
    txt = COL_HTML.read_text(encoding='utf-8', errors='replace')
    out = {}
    for row in re.findall(r'<tr[^>]*>(.*?)</tr>', txt, re.S):
        cells = re.findall(r'<td[^>]*>(.*?)</td>', row, re.S)
        clean = [html_mod.unescape(re.sub(r'<[^>]+>', '', c)).strip() for c in cells]
        name = next((c for c in clean
                     if re.match(r"^[A-Za-zÀ-ÿ'\-\.\, ]{3,45}$", c) and not c[0].isdigit()), None)
        if not name:
            continue
        nums = [float(x) for x in clean if re.match(r'^\d+\.\d$', x)]
        if len(nums) >= 2:
            out[norm(name)] = nums[1]
    return out


def couple_estimate(entry: dict, rent_idx: float | None) -> tuple[float, bool] | None:
    """(couple_monthly_usd, rent_is_synthesized)"""
    fam = entry.get('family_of_four_excl_rent_usd')
    if not fam:
        return None
    rent = entry.get('rent_1br_outside_center_usd')
    if rent:
        return round(0.75 * fam + rent, 0), False
    if rent_idx is not None:
        return round(0.75 * fam + RENT_PER_INDEX * rent_idx, 0), True
    return None


def band_for(v: float) -> str:
    for bound, tier in BANDS:
        if v < bound:
            return tier
    return 'ultra_high'


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--apply', action='store_true')
    args = parser.parse_args()

    territories = json.loads(TERR.read_text())
    dollars = json.loads(DOLLARS.read_text())

    # lookup: territory-norm-name -> dollars entry
    dl = {}
    for n, e in dollars.items():
        tname = NAME_MAP.get(norm(n), n)
        dl[norm(tname)] = e

    rent_index = load_rent_index()

    merged = audited = 0
    synth = 0
    proposals = []
    snapshots = []
    for t in territories:
        e = dl.get(norm(t['name']))
        if not e:
            continue
        est_pair = couple_estimate(e, rent_index.get(norm(t['name'])))
        if est_pair is None:
            continue
        est, est_synth = est_pair
        merged += 1
        if est_synth:
            synth += 1
        snapshots.append(e.get('snapshot'))
        t['_cost_monthly_usd'] = est
        t['_cost_rent_estimated'] = est_synth
        t['_cost_source_snapshot'] = e.get('snapshot')
        cur = t['cost_tier']
        implied = band_for(est)
        if implied != cur:
            # hysteresis: only propose when clearly inside another band
            lo = [b for b, tier in BANDS if tier == implied][0]
            below = max([b for b, tier in BANDS if b <= lo] + [0])
            if below + MARGIN <= est < lo - MARGIN:
                proposals.append((t, cur, implied, est))
        audited += 1

    print(f'Territories with dollar estimates: {merged}/{len(territories)}')
    if snapshots:
        print(f'Snapshot dates: min {min(s for s in snapshots if s)}, '
              f'max {max(s for s in snapshots if s)}')
    print(f'Proposed tier changes: {len(proposals)}\n')
    for t, cur, new, est in sorted(proposals, key=lambda p: p[0]['name']):
        print(f'  {t["name"]}: {cur} -> {new}  (${est:,.0f}/mo couple incl. rent)')

    if proposals:
        print(f'\n{"="*60}')
        print('Per-tier dollar ranges among all audited territories:')
        by_tier = {tier: [] for tier in TIERS}
        for t in territories:
            v = t.get('_cost_monthly_usd')
            if v:
                by_tier[t['cost_tier']].append((v, t['name']))
        for tier in TIERS:
            vals = sorted(by_tier[tier])
            if vals:
                nums = [v for v, _ in vals]
                print(f'  {tier:<11} n={len(nums):<3} ${nums[0]:,.0f} – ${nums[-1]:,.0f}'
                      f'   (e.g. {vals[0][1]} … {vals[-1][1]})')

    if not args.apply:
        # clean scratch fields (dry-run leaves json untouched on disk anyway)
        for t in territories:
            t.pop('_cost_monthly_usd', None)
            t.pop('_cost_rent_estimated', None)
            t.pop('_cost_source_snapshot', None)
        print('\n--dry-run: nothing written.')
        return

    keep = 0
    for t in territories:
        if '_cost_monthly_usd' in t:
            t['cost_monthly_usd'] = t.pop('_cost_monthly_usd')
            t['cost_rent_estimated'] = t.pop('_cost_rent_estimated')
            t['cost_source_snapshot'] = t.pop('_cost_source_snapshot')
            keep += 1
        else:
            t.pop('cost_monthly_usd', None)
            t.pop('cost_rent_estimated', None)
            t.pop('cost_source_snapshot', None)
    for t, cur, new, est in proposals:
        t['cost_tier'] = new
    TERR.write_text(json.dumps(territories, indent=2, ensure_ascii=False) + '\n')
    print(f'\n✓ Wrote cost_monthly_usd for {keep} territories '
          f'({synth} with synthesized rent); applied {len(proposals)} tier corrections.')


if __name__ == '__main__':
    main()
