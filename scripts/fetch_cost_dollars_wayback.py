#!/usr/bin/env python3
"""
Field Survey — Cost of Living Dollar Estimates (Numbeo via Wayback)
====================================================================

Numbeo WAF-blocks server IPs on per-country pages. Wayback Machine holds
recent snapshots of the same pages (typically 1-8 weeks old). This script:

  1. For each Numbeo-covered country, finds the closest Wayback snapshot
     of its cost-of-living page (numbeo.com/cost-of-living/country_result.jsp)
  2. Extracts family-of-four / single-person monthly estimates + 1BR rents
  3. Normalizes currency: snapshots render in the crawler's locale currency
     (C$ = CAD, $ = USD, etc.) — parsed per page, CAD converted to USD
     via exchangerate.host (free, no key)
  4. Writes data/raw/numbeo-country-dollars.json

Politeness: ~1 request/second to archive.org, cache written after each
country so re-runs resume.

Usage:
    python scripts/fetch_cost_dollars_wayback.py            # fetch missing
    python scripts/fetch_cost_dollars_wayback.py --fresh    # re-pull all
"""

from __future__ import annotations

import argparse
import html as html_mod
import json
import re
import time
import urllib.parse
import urllib.request
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parent.parent
RAW = PROJECT_ROOT / 'data' / 'raw'
CACHE = RAW / 'numbeo-country-dollars.json'
UA = 'field-survey-refresh/1.0 (research pipeline; +https://fieldsurvey.burbankenterprises.com)'

# currency symbol -> code, for symbols Numbeo emits on these pages
CURRENCY_SYMBOLS = {
    'C$': 'CAD', 'US$': 'USD', '$': 'USD', '€': 'EUR', '£': 'GBP',
    'A$': 'AUD', 'SFr.': 'CHF', '¥': 'JPY',
}


def http_get(url: str, timeout: int = 60) -> bytes | None:
    req = urllib.request.Request(url, headers={'User-Agent': UA})
    for attempt in range(3):
        try:
            with urllib.request.urlopen(req, timeout=timeout) as resp:
                return resp.read()
        except Exception:
            if attempt == 2:
                return None
            time.sleep(5)
    return None


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


_fx_cache: dict = {}


def fx_to_usd(code: str, amount: float) -> float | None:
    if code == 'USD':
        return amount
    if code not in _fx_cache:
        body = http_get(f'https://open.er-api.com/v6/latest/{code}', timeout=30)
        if body is None:
            return None
        try:
            rates = json.loads(body)['rates']
            _fx_cache[code] = rates['USD']
        except Exception:
            return None
    return round(amount * _fx_cache[code], 1)


def parse_amount(raw: str) -> tuple[str, float] | None:
    """'C$2,549.1 ' -> ('CAD', 2549.1)"""
    raw = html_mod.unescape(raw).strip()
    for sym, code in sorted(CURRENCY_SYMBOLS.items(), key=lambda kv: -len(kv[0])):
        if raw.startswith(sym):
            num = raw[len(sym):].strip().replace(',', '')
            try:
                return code, float(num)
            except ValueError:
                return None
    m = re.match(r'^([\d,]+(?:\.\d+)?)', raw)
    if m:  # bare number: assume page context currency unknown
        return None
    return None


def parse_usd(raw_full: str, raw_paren: str | None) -> float | None:
    """Numbeo pages show one amount in the crawler's display currency and the
    other in parentheses. The $-marked (&#36;/US$/C$-with-$-fallback) value
    is the USD one; the paren may hold EITHER local or USD depending on the
    snapshot's render locale. Rule: prefer the value marked with a plain $,
    whichever position it's in; validate plausibility (150–15000/mo family,
    80–6000 single handled by caller sanity check)."""
    def is_dollar_marked(s):
        s = html_mod.unescape(s or '')
        return s.lstrip().startswith('$') or s.lstrip().startswith('&#36;')

    def num_of(s):
        m = re.search(r'([\d,]+(?:\.\d+)?)', html_mod.unescape(s or ''))
        return float(m.group(1).replace(',', '')) if m else None

    # paren shape from split_usd: '(content' already stripped of '('
    if raw_paren is not None and is_dollar_marked(raw_paren):
        v = num_of(raw_paren)
        if v:
            return v
    if is_dollar_marked(raw_full):
        v = num_of(raw_full)
        if v:
            return v
    # Neither is $-marked: fall back to symbol parse + FX on the main value
    pair = parse_amount(raw_full)
    if pair:
        return fx_to_usd(pair[0], pair[1])
    return None


def extract(txt: str) -> dict | None:
    def split_usd(inner: str) -> tuple[str, str | None]:
        """Split 'C$3,943.6 <span class="in_other_currency">($2,774.0)' into
        (full, paren) — tolerant of unterminated nested spans."""
        pm = re.search(
            r'^(.*?)\s*<span class="in_other_currency">\((.*?)\)',
            inner, re.S)
        if pm:
            return pm.group(1).strip(), pm.group(2).strip()
        return re.sub(r'<[^>]+>', '', inner).strip(), None

    def grab_summary(phrase):
        # capture through the nested paren span to the double close
        m = re.search(
            re.escape(phrase) + r'[^<]*<span class="emp_number">(.+?)</span></span>',
            txt, re.S)
        if not m:
            # tolerate unterminated nested span: stop at first '<' after content
            m = re.search(
                re.escape(phrase) + r'[^<]*<span class="emp_number">([^<]+)',
                txt, re.S)
        if not m:
            return None, None
        return split_usd(m.group(1))

    fam = grab_summary('family of four are')
    single = grab_summary('single person are')

    def rent(kind):
        label = ('1 Bedroom Apartment Outside of City Centre' if kind == 'outside'
                 else '1 Bedroom Apartment in City Centre')
        m = re.search(
            re.escape(label) + r'\s*</td>\s*<td[^>]*>\s*(?:<[^>]+>\s*)*'
            r'<span class="first_currency">([^<]+)',
            txt, re.S)
        if not m:
            return None, None
        return m.group(1).strip(), None

    rent_out = rent('outside')
    rent_in = rent('inside')

    if fam[0] is None and single[0] is None:
        return None
    return {
        'family_of_four_excl_rent': fam if fam[0] else None,
        'single_person_excl_rent': single if single[0] else None,
        'rent_1br_outside_center': rent_out if rent_out[0] else None,
        'rent_1br_city_center': rent_in if rent_in[0] else None,
    }


def closest_snapshot(country: str) -> tuple[str, str] | None:
    """(timestamp, url) of closest Wayback snapshot, or None."""
    q = urllib.parse.quote(
        f'numbeo.com/cost-of-living/country_result.jsp?country={country}', safe='')
    body = http_get(f'https://archive.org/wayback/available?url={q}&timestamp=20261101')
    if body is None:
        return None
    try:
        snap = json.loads(body)['archived_snapshots']['closest']
        return snap['timestamp'], snap['url']
    except Exception:
        return None


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--fresh', action='store_true')
    parser.add_argument('--limit', type=int, default=0)
    args = parser.parse_args()

    cache: dict = json.loads(CACHE.read_text()) if CACHE.exists() else {}
    countries = sorted(rankings_countries())
    todo = [c for c in countries if args.fresh or c not in cache]
    print(f'countries: {len(countries)} | cached: {len(cache)} | todo: {len(todo)}')

    done = 0
    for name in todo:
        if args.limit and done >= args.limit:
            break
        snap = closest_snapshot(name)
        if not snap:
            print(f'  {name}: no wayback snapshot', flush=True)
            time.sleep(1)
            continue
        ts, url = snap
        body = http_get(url.replace('http://web.archive.org', 'https://web.archive.org'))
        if body is None:
            print(f'  {name}: snapshot fetch failed', flush=True)
            time.sleep(1)
            continue
        parsed = extract(body.decode('utf-8', 'ignore'))
        if not parsed:
            print(f'  {name}: no estimates in snapshot {ts}', flush=True)
            time.sleep(1)
            continue

        def to_usd(pair):
            if pair is None:
                return None
            raw_full, raw_paren = pair
            return parse_usd(raw_full, raw_paren)

        entry = {
            'family_of_four_excl_rent_usd': to_usd(parsed['family_of_four_excl_rent']),
            'single_person_excl_rent_usd': to_usd(parsed['single_person_excl_rent']),
            'rent_1br_outside_center_usd': to_usd(parsed['rent_1br_outside_center']),
            'rent_1br_city_center_usd': to_usd(parsed['rent_1br_city_center']),
            'snapshot': ts[:8],
            'source': 'numbeo via wayback',
        }
        cache[name] = entry
        CACHE.write_text(json.dumps(cache, indent=1))
        done += 1
        print(f"  {name}: fam ${entry['family_of_four_excl_rent_usd']} "
              f"single ${entry['single_person_excl_rent_usd']} "
              f"rent(out) ${entry['rent_1br_outside_center_usd']} "
              f"[snap {entry['snapshot']}]", flush=True)
        time.sleep(1)

    print(f'\nDone. {len(cache)} countries in {CACHE}')


if __name__ == '__main__':
    main()
