#!/usr/bin/env python3
"""
Field Survey — Safety Re-verification (US State Dept Travel Advisories)
=======================================================================

Re-verifies safety_level for every territory against the current US State
Department travel advisories (the app's cited safety source), via
cadataapi.state.gov/api/TravelAdvisories (no key, public).

Mapping (conservative — advisory level constrains the tier):
  Level 1 (Normal)            -> very_safe | safe
  Level 2 (Increased Caution) -> safe | moderate
  Level 3 (Reconsider)        -> unsafe
  Level 4 (Do Not Travel)     -> very_unsafe

When the current tier is already allowed for the level, it is KEPT (the
June hand-assignments encoded finer-grained info than 4 advisory levels).
Otherwise the nearest allowed tier is chosen.

Usage:
    python scripts/refresh_safety.py            # dry-run
    python scripts/refresh_safety.py --apply
"""

from __future__ import annotations

import argparse
import json
import re
import urllib.request
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parent.parent
RAW = PROJECT_ROOT / 'data' / 'raw'
ATTRIBUTES_FILE = PROJECT_ROOT / 'data' / 'territories.json'
API_URL = 'https://cadataapi.state.gov/api/TravelAdvisories'

# our-normalized-name -> advisory-normalized-name; None = no advisory exists
# (territories of other countries: Azores->Portugal, Guam->US, etc.)
EXACT = {
    'american samoa': None, 'antigua': 'antigua and barbuda', 'azores': None,
    'bahamas': 'the bahamas', 'chuuk': 'federated states of micronesia',
    'congo dem republic of': 'democratic republic of the congo',
    'congo republic of': 'republic of congo',
    'cook islands': None, 'czech republic': 'czechia',
    'falkland islands': None, 'faroe islands': None, 'gambia': 'the gambia',
    'gibraltar': None, 'guam': None, 'kosrae': 'federated states of micronesia',
    'kyrgyzstan': 'the kyrgyz republic', 'macao': 'macau',
    'madeira': None, 'mayotte': None, 'mexico': 'mexico travel advisory',
    'monaco': None, 'nauru': 'naoero', 'nevis': 'saint kitts and nevis',
    'niue': None, 'pohnpei': 'federated states of micronesia',
    'puerto rico': None, 'runion': None, 'rodrigues': None, 'rota': None,
    'saba': 'saba and sint eustatius', 'saipan': None, 'san marino': None,
    'st barthlemy': 'saint barthelemy',
    'st eustatius': 'saba and sint eustatius',
    'st helena': None, 'st kitts': 'saint kitts and nevis',
    'st lucia': 'saint lucia', 'st martin': 'french saint martin',
    'st maarten': 'sint maarten', 'st pierre and miquelon': None,
    'st vincent the grenadines': 'saint vincent and the grenadines',
    'tahiti': 'french polynesia', 'tinian': None, 'trkiye': 'turkey',
    'turks and caicos': 'turks and caicos islands',
    'united states of america': None, 'virgin islands us': None,
    'virgin islands british': 'british virgin islands',
    'wallis futuna islands': None, 'yap': 'federated states of micronesia',
    'britain': 'united kingdom', 'korea republic of': 'south korea',
    'myanmar': 'burma', 'myanmar burma': 'burma',
    'palestinian territories': 'gaza', 'bosnia': 'bosnia and herzegovina',
    'cape verde': 'cabo verde', "cote d'ivoire": 'cote d ivoire',
    'cote d ivoire': 'cote d ivoire', 'trinidad tobago': 'trinidad and tobago',
}


def norm(s):
    s = (s or '').strip().lower()
    s = re.sub(r'[^a-z ]', '', s)
    return re.sub(r'\s+', ' ', s).strip()


def load_advisories() -> dict:
    """{advisory_name_norm: (display, level, updated)} — fetch or cached."""
    cache = RAW / 'state-dept-advisories.json'
    if cache.exists():
        data = json.loads(cache.read_text())
    else:
        req = urllib.request.Request(
            API_URL, headers={'User-Agent': 'field-survey-refresh/1.0 (research)'})
        with urllib.request.urlopen(req, timeout=60) as resp:
            data = json.loads(resp.read())
        RAW.mkdir(parents=True, exist_ok=True)
        cache.write_text(json.dumps(data))
    adv = {}
    for r in data:
        m = re.match(r'^(.*?) - Level (\d)', r.get('Title', ''))
        if m:
            adv[norm(m.group(1))] = (m.group(1), int(m.group(2)),
                                     (r.get('Updated') or '')[:10])
    return adv


LEVEL_ALLOWED = {
    # L1 "normal precautions" is compatible with moderate (petty crime can
    # still be common; June assignments encoded local crime nuance).
    1: {'very_safe', 'safe', 'moderate'},
    2: {'safe', 'moderate'},
    3: {'unsafe'},
    4: {'very_unsafe'},
}


def new_tier_for(level: int, current: str) -> str:
    if level == 1:
        # current unsafe/very_unsafe is incompatible with L1 -> upgrade
        return 'safe'
    if level == 2:
        if current == 'very_safe':
            return 'safe'
        return 'moderate'  # unsafe/very_unsafe soften to moderate
    if level == 3:
        return 'unsafe'
    return 'very_unsafe'


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--apply', action='store_true')
    args = parser.parse_args()

    territories = json.loads(ATTRIBUTES_FILE.read_text())
    adv = load_advisories()
    print(f'State Dept advisories loaded: {len(adv)}')

    matched = 0
    proposals = []
    for t in territories:
        k = norm(t['name'])
        sd_key = EXACT.get(k, k)
        if sd_key is None:
            continue  # territory of another country; no own advisory
        hit = adv.get(sd_key)
        if not hit:
            print(f'  WARN unmatched: {t["name"]} (key {sd_key!r})')
            continue
        matched += 1
        _, lvl, updated = hit
        cur = t['safety_level']
        if cur not in LEVEL_ALLOWED[lvl]:
            proposals.append((t, cur, new_tier_for(lvl, cur), lvl, updated))

    print(f'\nMatched {matched}/{len(territories)} territories with advisories')
    print(f'Proposed safety changes: {len(proposals)}\n')
    for t, cur, new, lvl, upd in sorted(proposals, key=lambda p: p[0]['name']):
        print(f'  {t["name"]}: {cur} -> {new}  (Level {lvl}, updated {upd})')

    if not args.apply:
        print('\n--dry-run: nothing written. Re-run with --apply.')
        return

    for t, cur, new, lvl, upd in proposals:
        t['safety_level'] = new
    ATTRIBUTES_FILE.write_text(
        json.dumps(territories, indent=2, ensure_ascii=False) + '\n')
    print(f'\n✓ Applied {len(proposals)} safety updates.')


if __name__ == '__main__':
    main()
