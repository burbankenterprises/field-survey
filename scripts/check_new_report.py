#!/usr/bin/env python3
"""
Field Survey — New Service Year Report Detector
===============================================

Checks whether the next year's Service Year Report is published on jw.org
and, if so, downloads the PDF to the project root for ingestion.

Detection (in order, all verified against how syr25 is published):
  1. GETPUBMEDIALINKS API for pub=syrNN (returns 404 until published)
  2. Library books index contains the syrNN book page URL

Exits 0 with "PUBLISHED <path>" on stdout when the PDF is downloaded.
Exits 1 with "NOT_PUBLISHED" when it isn't out yet. Other failures exit 2.

Usage:
    python scripts/check_new_report.py [year]   # default: next year after
                                                # the one in seed.ts
"""

from __future__ import annotations

import json
import re
import sys
import urllib.error
import urllib.request
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parent.parent
UA = 'Mozilla/5.0 (compatible; field-survey-refresh/1.0; research pipeline)'


def http_get(url: str, timeout: int = 60) -> tuple[int, bytes]:
    req = urllib.request.Request(url, headers={'User-Agent': UA})
    try:
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            return resp.status, resp.read()
    except urllib.error.HTTPError as e:
        return e.code, b''
    except urllib.error.URLError:
        return 0, b''


def current_report_year() -> int:
    """The year stamped in seed.ts, e.g. '2025 Service Year Report'."""
    seed = PROJECT_ROOT / 'src' / 'data' / 'seed.ts'
    m = re.search(r'(\d{4}) Service Year Report', seed.read_text())
    if not m:
        raise SystemExit('ERROR: cannot determine current report year from seed.ts')
    return int(m.group(1))


def media_links_url(pub: str) -> str:
    return ('https://b.jw-cdn.org/apis/pub-media/GETPUBMEDIALINKS'
            f'?output=json&pub={pub}&fileformat=PDF&langwritten=E&txtCMSLang=E')


def pdf_url_from_links(body: bytes) -> str | None:
    try:
        data = json.loads(body)
    except json.JSONDecodeError:
        return None
    # v1 shape: files.E[0].file.url ; be defensive about both shapes
    def walk(obj):
        if isinstance(obj, dict):
            if 'url' in obj and isinstance(obj['url'], str) and '.pdf' in obj['url']:
                return obj['url']
            for v in obj.values():
                r = walk(v)
                if r:
                    return r
        elif isinstance(obj, list):
            for v in obj:
                r = walk(v)
                if r:
                    return r
        return None
    return walk(data)


def main():
    year = int(sys.argv[1]) if len(sys.argv) > 1 else current_report_year() + 1
    pub = f'syr{str(year)[-2:]}'
    print(f'Checking for {year} Service Year Report (pub {pub})...')

    # Route 1: media links API
    status, body = http_get(media_links_url(pub))
    if status == 200:
        url = pdf_url_from_links(body)
        if url:
            status2, pdf = http_get(url)
            if status2 == 200 and pdf[:4] == b'%PDF':
                dest = PROJECT_ROOT / f'{pub}_E.pdf'
                dest.write_bytes(pdf)
                print(f'PUBLISHED {dest}')
                return
            print(f'ERROR: links API ok but PDF fetch failed ({status2})')
            sys.exit(2)

    # Route 2: library books index (the API can lag the pages)
    status, body = http_get('https://www.jw.org/en/library/books/')
    if status == 200 and f'{year}-Service-Year-Report'.lower() in body.decode('utf-8', 'ignore').lower():
        print(f'ERROR: books index lists {year} report but media API has no PDF yet')
        sys.exit(2)

    print('NOT_PUBLISHED')
    sys.exit(1)


if __name__ == '__main__':
    main()
