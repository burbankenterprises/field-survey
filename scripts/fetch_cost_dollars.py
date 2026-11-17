#!/usr/bin/env python3
"""
Field Survey — Cost of Living Dollar Estimates (Numbeo)
========================================================

Fetches Numbeo per-country pages and extracts the dollar estimates:
  - family_of_four:  estimated monthly costs, excl. rent   (USD)
  - single_person:   estimated monthly costs, excl. rent   (USD)
  - rent_1br_center: apartment (1 bedroom) Outside Centre  (USD)

Stores them in data/raw/numbeo-country-dollars.json as
  {numbeo_country_name: {family_of_four, single_person, rent_1br_outside}}

Politeness: one request in flight, 3s gap, honest UA. Cached forever —
re-run with --fresh to re-pull.

Usage:
    python scripts/fetch_cost_dollars.py           # fetch missing only
    python scripts/fetch_cost_dollars.py --fresh   # re-pull all
"""

from __future__ import annotations

import argparse
import html as html_mod
import json
import re
import time
import urllib.error
import urllib.request
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parent.parent
RAW = PROJECT_ROOT / 'data' / 'raw'
CACHE = RAW / 'numbeo-country-dollars.json'
UA = 'Mozilla/5.0 (compatible; field-survey-refresh/1.0; research pipeline)'

NUM_PATTERN = re.compile(r'&#36;|\$([\d,]+(?:\.\d+)?)')


def rankings_countries() -> set[str]:
    txt = (RAW / 'numbeo-col.html').read_text(encoding='utf-8', errors='replace')
    out = set()
    for row in re.findall(r'<tr[^>]*>(.*?)</tr>', txt, re.S):
        cells = re.findall(r'<td[^>]*>(.*?)</td>', row, re.S)
        clean = [html_mod.unescape(re.sub(r'<[^>]+>', '', c)).strip() for c in cells]
        name = next((c for c in clean
                     if re.match(r"^[A-Za-zÀ-ÿ'\-\.\, ]{3,45}$", c) and not c[0].isdigit()), None)
        if name:
            out.add(name)
    return out


def fetch_country(name: str) -> dict | None:
    url = ('https://www.numbeo.com/cost-of-living/country_result.jsp?country='
           + name.replace(' ', '+'))
    req = urllib.request.Request(url, headers={'User-Agent': UA})
    try:
        with urllib.request.urlopen(req, timeout=60) as resp:
            txt = resp.read().decode('utf-8', 'ignore')
    except urllib.error.HTTPError as e:
        print(f'  {name}: HTTP {e.code}')
        return None

    def grab(pattern):
        m = re.search(pattern, txt)
        if not m:
            return None
        v = m.group(1).replace(',', '')
        try:
            return float(v)
        except ValueError:
            return None

    fam = grab(r'family of four are <span class="emp_number">([^<]+)')
    single = grab(r'single person are <span class="emp_number">([^<]+)')
    rent = grab(r'Apartment \(1 bedroom\) Outside of Centre</td>\s*<td[^>]*>(?:<[^>]+>)*\$?([\d,]+(?:\.\d+)?)')
    if fam is None and single is None:
        return None
    return {
        'family_of_four_excl_rent': fam,
        'single_person_excl_rent': single,
        'rent_1br_outside_center': rent,
        'fetchedAt': time.strftime('%Y-%m-%d'),
    }


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--fresh', action='store_true', help='Re-pull every country')
    parser.add_argument('--limit', type=int, default=0, help='Stop after N fetches (testing)')
    args = parser.parse_args()

    cache: dict = json.loads(CACHE.read_text()) if CACHE.exists() else {}
    countries = sorted(rankings_countries())
    todo = [c for c in countries if args.fresh or c not in cache]
    print(f'Numbeo countries: {len(countries)} | cached: {len(cache)} | to fetch: {len(todo)}')

    fetched = 0
    for name in todo:
        if args.limit and fetched >= args.limit:
            break
        data = fetch_country(name)
        if data:
            cache[name] = data
            fetched += 1
            print(f"  {name}: family ${data['family_of_four_excl_rent']}, "
                  f"single ${data['single_person_excl_rent']}, "
                  f"rent ${data['rent_1br_outside_center']}")
        else:
            print(f'  {name}: no dollar estimates found')
        CACHE.write_text(json.dumps(cache, indent=1))
        time.sleep(3)

    print(f'\nDone. {len(cache)} countries in {CACHE}')


if __name__ == '__main__':
    main()
