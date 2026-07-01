#!/usr/bin/env python3
"""
generate_attributes.py
======================
Merges JW Service Year Report data (from src/data/seed.ts) with hand-researched
categorical country attributes, writing the combined dataset to
data/territories.json.

All 206 territories are covered. Attributes are assigned from real-world
knowledge of geography, cost of living, safety, visa policy, languages,
climate, infrastructure, healthcare, and religious freedom.

Usage:
    python3 scripts/generate_attributes.py
"""

from __future__ import annotations

import json
import os
from pathlib import Path
from typing import Any

# ---------------------------------------------------------------------------
# Paths
# ---------------------------------------------------------------------------
ROOT = Path(__file__).resolve().parent.parent
SEED_TS = ROOT / "src" / "data" / "seed.ts"
OUT_JSON = ROOT / "data" / "territories.json"

# ---------------------------------------------------------------------------
# Attribute schema (for validation / documentation)
# ---------------------------------------------------------------------------
COST_TIERS = {"ultra_low", "low", "moderate", "high", "ultra_high"}
SAFETY_LEVELS = {"very_safe", "safe", "moderate", "unsafe", "very_unsafe"}
VISA_DIFFICULTIES = {"easy", "moderate", "hard", "very_hard"}
ENGLISH_LEVELS = {"widespread", "common", "moderate", "limited", "rare"}
LANG_DIFFICULTIES = {"easy", "moderate", "hard", "very_hard"}
CLIMATE_TYPES = {
    "tropical", "subtropical", "mediterranean", "temperate",
    "continental", "cold", "arid", "polar",
}
INFRA_LEVELS = {"excellent", "good", "moderate", "basic", "minimal"}
HEALTH_LEVELS = {"excellent", "good", "moderate", "basic", "minimal"}
RELIGIOUS_FREEDOM = {"free", "mostly_free", "restricted", "banned"}

ATTR_KEYS = (
    "cost_tier",
    "safety_level",
    "visa_difficulty",
    "english_prevalence",
    "local_language_difficulty",
    "climate_type",
    "infrastructure_level",
    "healthcare_level",
    "religious_freedom",
)

# ---------------------------------------------------------------------------
# Attribute assignments keyed by territory id (matches seed.ts `id` field).
#
# Reference conventions:
#  - cost_tier: ultra_low (<$900/mo couple), low ($900-1500), moderate ($1500-2500),
#               high ($2500-4000), ultra_high ($4000+)
#  - safety_level: for a woman walking alone
#  - visa_difficulty: US passport, long-stay options
#  - english_prevalence: how widely English is spoken day-to-day
#  - local_language_difficulty: difficulty for an English speaker to learn
#  - climate_type: dominant climate of the locale base / capital
#  - infrastructure_level: roads, internet, utilities, shopping
#  - healthcare_level: quality of medical care available
#  - religious_freedom: legal/social freedom to practice & preach
# ---------------------------------------------------------------------------
ATTRIBUTES: dict[str, dict[str, str]] = {
    # ---- Europe (open, developed, generally expensive & safe) ----
    "albania": {
        "cost_tier": "low", "safety_level": "safe", "visa_difficulty": "easy",
        "english_prevalence": "common", "local_language_difficulty": "moderate",
        "climate_type": "mediterranean", "infrastructure_level": "moderate",
        "healthcare_level": "moderate", "religious_freedom": "free",
    },
    "andorra": {
        "cost_tier": "high", "safety_level": "very_safe", "visa_difficulty": "moderate",
        "english_prevalence": "common", "local_language_difficulty": "moderate",
        "climate_type": "cold", "infrastructure_level": "excellent",
        "healthcare_level": "excellent", "religious_freedom": "free",
    },
    "aruba": {
        "cost_tier": "high", "safety_level": "very_safe", "visa_difficulty": "easy",
        "english_prevalence": "widespread", "local_language_difficulty": "easy",
        "climate_type": "tropical", "infrastructure_level": "excellent",
        "healthcare_level": "good", "religious_freedom": "free",
    },
    "austria": {
        "cost_tier": "high", "safety_level": "very_safe", "visa_difficulty": "moderate",
        "english_prevalence": "widespread", "local_language_difficulty": "moderate",
        "climate_type": "continental", "infrastructure_level": "excellent",
        "healthcare_level": "excellent", "religious_freedom": "free",
    },
    "azores": {
        "cost_tier": "moderate", "safety_level": "very_safe", "visa_difficulty": "moderate",
        "english_prevalence": "common", "local_language_difficulty": "moderate",
        "climate_type": "temperate", "infrastructure_level": "good",
        "healthcare_level": "good", "religious_freedom": "free",
    },
    "belgium": {
        "cost_tier": "high", "safety_level": "safe", "visa_difficulty": "moderate",
        "english_prevalence": "widespread", "local_language_difficulty": "easy",
        "climate_type": "temperate", "infrastructure_level": "excellent",
        "healthcare_level": "excellent", "religious_freedom": "free",
    },
    "bosnia-and-herzegovina": {
        "cost_tier": "low", "safety_level": "safe", "visa_difficulty": "easy",
        "english_prevalence": "moderate", "local_language_difficulty": "moderate",
        "climate_type": "continental", "infrastructure_level": "moderate",
        "healthcare_level": "moderate", "religious_freedom": "free",
    },
    "britain": {
        "cost_tier": "high", "safety_level": "safe", "visa_difficulty": "hard",
        "english_prevalence": "widespread", "local_language_difficulty": "easy",
        "climate_type": "temperate", "infrastructure_level": "excellent",
        "healthcare_level": "excellent", "religious_freedom": "free",
    },
    "bulgaria": {
        "cost_tier": "low", "safety_level": "safe", "visa_difficulty": "easy",
        "english_prevalence": "moderate", "local_language_difficulty": "hard",
        "climate_type": "continental", "infrastructure_level": "good",
        "healthcare_level": "good", "religious_freedom": "free",
    },
    "croatia": {
        "cost_tier": "moderate", "safety_level": "safe", "visa_difficulty": "easy",
        "english_prevalence": "widespread", "local_language_difficulty": "hard",
        "climate_type": "mediterranean", "infrastructure_level": "good",
        "healthcare_level": "good", "religious_freedom": "free",
    },
    "cyprus": {
        "cost_tier": "moderate", "safety_level": "very_safe", "visa_difficulty": "easy",
        "english_prevalence": "widespread", "local_language_difficulty": "hard",
        "climate_type": "mediterranean", "infrastructure_level": "excellent",
        "healthcare_level": "excellent", "religious_freedom": "free",
    },
    "czech-republic": {
        "cost_tier": "moderate", "safety_level": "very_safe", "visa_difficulty": "moderate",
        "english_prevalence": "common", "local_language_difficulty": "hard",
        "climate_type": "continental", "infrastructure_level": "excellent",
        "healthcare_level": "excellent", "religious_freedom": "free",
    },
    "denmark": {
        "cost_tier": "ultra_high", "safety_level": "very_safe", "visa_difficulty": "hard",
        "english_prevalence": "widespread", "local_language_difficulty": "moderate",
        "climate_type": "cold", "infrastructure_level": "excellent",
        "healthcare_level": "excellent", "religious_freedom": "free",
    },
    "estonia": {
        "cost_tier": "moderate", "safety_level": "very_safe", "visa_difficulty": "easy",
        "english_prevalence": "widespread", "local_language_difficulty": "hard",
        "climate_type": "cold", "infrastructure_level": "excellent",
        "healthcare_level": "good", "religious_freedom": "free",
    },
    "faroe-islands": {
        "cost_tier": "high", "safety_level": "very_safe", "visa_difficulty": "moderate",
        "english_prevalence": "widespread", "local_language_difficulty": "hard",
        "climate_type": "cold", "infrastructure_level": "good",
        "healthcare_level": "good", "religious_freedom": "free",
    },
    "finland": {
        "cost_tier": "high", "safety_level": "very_safe", "visa_difficulty": "moderate",
        "english_prevalence": "widespread", "local_language_difficulty": "very_hard",
        "climate_type": "cold", "infrastructure_level": "excellent",
        "healthcare_level": "excellent", "religious_freedom": "free",
    },
    "france": {
        "cost_tier": "high", "safety_level": "safe", "visa_difficulty": "hard",
        "english_prevalence": "common", "local_language_difficulty": "moderate",
        "climate_type": "temperate", "infrastructure_level": "excellent",
        "healthcare_level": "excellent", "religious_freedom": "free",
    },
    "germany": {
        "cost_tier": "high", "safety_level": "safe", "visa_difficulty": "hard",
        "english_prevalence": "common", "local_language_difficulty": "moderate",
        "climate_type": "continental", "infrastructure_level": "excellent",
        "healthcare_level": "excellent", "religious_freedom": "free",
    },
    "gibraltar": {
        "cost_tier": "high", "safety_level": "very_safe", "visa_difficulty": "moderate",
        "english_prevalence": "widespread", "local_language_difficulty": "easy",
        "climate_type": "mediterranean", "infrastructure_level": "good",
        "healthcare_level": "good", "religious_freedom": "free",
    },
    "greece": {
        "cost_tier": "moderate", "safety_level": "safe", "visa_difficulty": "easy",
        "english_prevalence": "common", "local_language_difficulty": "hard",
        "climate_type": "mediterranean", "infrastructure_level": "good",
        "healthcare_level": "good", "religious_freedom": "free",
    },
    "greenland": {
        "cost_tier": "ultra_high", "safety_level": "very_safe", "visa_difficulty": "moderate",
        "english_prevalence": "common", "local_language_difficulty": "very_hard",
        "climate_type": "polar", "infrastructure_level": "moderate",
        "healthcare_level": "moderate", "religious_freedom": "free",
    },
    "hungary": {
        "cost_tier": "low", "safety_level": "safe", "visa_difficulty": "easy",
        "english_prevalence": "common", "local_language_difficulty": "hard",
        "climate_type": "continental", "infrastructure_level": "good",
        "healthcare_level": "good", "religious_freedom": "mostly_free",
    },
    "iceland": {
        "cost_tier": "ultra_high", "safety_level": "very_safe", "visa_difficulty": "moderate",
        "english_prevalence": "widespread", "local_language_difficulty": "very_hard",
        "climate_type": "cold", "infrastructure_level": "excellent",
        "healthcare_level": "excellent", "religious_freedom": "free",
    },
    "ireland": {
        "cost_tier": "high", "safety_level": "very_safe", "visa_difficulty": "moderate",
        "english_prevalence": "widespread", "local_language_difficulty": "easy",
        "climate_type": "temperate", "infrastructure_level": "excellent",
        "healthcare_level": "good", "religious_freedom": "free",
    },
    "italy": {
        "cost_tier": "moderate", "safety_level": "safe", "visa_difficulty": "hard",
        "english_prevalence": "limited", "local_language_difficulty": "moderate",
        "climate_type": "mediterranean", "infrastructure_level": "good",
        "healthcare_level": "good", "religious_freedom": "free",
    },
    "kosovo": {
        "cost_tier": "low", "safety_level": "moderate", "visa_difficulty": "hard",
        "english_prevalence": "common", "local_language_difficulty": "moderate",
        "climate_type": "continental", "infrastructure_level": "moderate",
        "healthcare_level": "basic", "religious_freedom": "mostly_free",
    },
    "latvia": {
        "cost_tier": "low", "safety_level": "safe", "visa_difficulty": "easy",
        "english_prevalence": "widespread", "local_language_difficulty": "hard",
        "climate_type": "cold", "infrastructure_level": "good",
        "healthcare_level": "good", "religious_freedom": "free",
    },
    "liechtenstein": {
        "cost_tier": "ultra_high", "safety_level": "very_safe", "visa_difficulty": "hard",
        "english_prevalence": "widespread", "local_language_difficulty": "moderate",
        "climate_type": "cold", "infrastructure_level": "excellent",
        "healthcare_level": "excellent", "religious_freedom": "free",
    },
    "lithuania": {
        "cost_tier": "low", "safety_level": "safe", "visa_difficulty": "easy",
        "english_prevalence": "widespread", "local_language_difficulty": "hard",
        "climate_type": "cold", "infrastructure_level": "good",
        "healthcare_level": "good", "religious_freedom": "free",
    },
    "luxembourg": {
        "cost_tier": "ultra_high", "safety_level": "very_safe", "visa_difficulty": "moderate",
        "english_prevalence": "widespread", "local_language_difficulty": "moderate",
        "climate_type": "temperate", "infrastructure_level": "excellent",
        "healthcare_level": "excellent", "religious_freedom": "free",
    },
    "madeira": {
        "cost_tier": "moderate", "safety_level": "very_safe", "visa_difficulty": "moderate",
        "english_prevalence": "common", "local_language_difficulty": "moderate",
        "climate_type": "subtropical", "infrastructure_level": "good",
        "healthcare_level": "good", "religious_freedom": "free",
    },
    "malta": {
        "cost_tier": "moderate", "safety_level": "very_safe", "visa_difficulty": "moderate",
        "english_prevalence": "widespread", "local_language_difficulty": "moderate",
        "climate_type": "mediterranean", "infrastructure_level": "good",
        "healthcare_level": "good", "religious_freedom": "free",
    },
    "moldova": {
        "cost_tier": "ultra_low", "safety_level": "moderate", "visa_difficulty": "easy",
        "english_prevalence": "limited", "local_language_difficulty": "moderate",
        "climate_type": "continental", "infrastructure_level": "basic",
        "healthcare_level": "basic", "religious_freedom": "free",
    },
    "monaco": {
        "cost_tier": "ultra_high", "safety_level": "very_safe", "visa_difficulty": "hard",
        "english_prevalence": "widespread", "local_language_difficulty": "moderate",
        "climate_type": "mediterranean", "infrastructure_level": "excellent",
        "healthcare_level": "excellent", "religious_freedom": "free",
    },
    "montenegro": {
        "cost_tier": "low", "safety_level": "safe", "visa_difficulty": "easy",
        "english_prevalence": "common", "local_language_difficulty": "hard",
        "climate_type": "mediterranean", "infrastructure_level": "moderate",
        "healthcare_level": "moderate", "religious_freedom": "free",
    },
    "netherlands": {
        "cost_tier": "high", "safety_level": "very_safe", "visa_difficulty": "moderate",
        "english_prevalence": "widespread", "local_language_difficulty": "easy",
        "climate_type": "temperate", "infrastructure_level": "excellent",
        "healthcare_level": "excellent", "religious_freedom": "free",
    },
    "north-macedonia": {
        "cost_tier": "low", "safety_level": "safe", "visa_difficulty": "easy",
        "english_prevalence": "moderate", "local_language_difficulty": "moderate",
        "climate_type": "continental", "infrastructure_level": "moderate",
        "healthcare_level": "moderate", "religious_freedom": "free",
    },
    "norway": {
        "cost_tier": "ultra_high", "safety_level": "very_safe", "visa_difficulty": "hard",
        "english_prevalence": "widespread", "local_language_difficulty": "moderate",
        "climate_type": "cold", "infrastructure_level": "excellent",
        "healthcare_level": "excellent", "religious_freedom": "free",
    },
    "poland": {
        "cost_tier": "low", "safety_level": "very_safe", "visa_difficulty": "easy",
        "english_prevalence": "common", "local_language_difficulty": "hard",
        "climate_type": "continental", "infrastructure_level": "good",
        "healthcare_level": "good", "religious_freedom": "free",
    },
    "portugal": {
        "cost_tier": "moderate", "safety_level": "very_safe", "visa_difficulty": "easy",
        "english_prevalence": "common", "local_language_difficulty": "moderate",
        "climate_type": "mediterranean", "infrastructure_level": "good",
        "healthcare_level": "good", "religious_freedom": "free",
    },
    "romania": {
        "cost_tier": "low", "safety_level": "safe", "visa_difficulty": "easy",
        "english_prevalence": "common", "local_language_difficulty": "moderate",
        "climate_type": "continental", "infrastructure_level": "good",
        "healthcare_level": "moderate", "religious_freedom": "free",
    },
    "san-marino": {
        "cost_tier": "high", "safety_level": "very_safe", "visa_difficulty": "moderate",
        "english_prevalence": "common", "local_language_difficulty": "moderate",
        "climate_type": "mediterranean", "infrastructure_level": "excellent",
        "healthcare_level": "excellent", "religious_freedom": "free",
    },
    "serbia": {
        "cost_tier": "low", "safety_level": "safe", "visa_difficulty": "easy",
        "english_prevalence": "common", "local_language_difficulty": "moderate",
        "climate_type": "continental", "infrastructure_level": "good",
        "healthcare_level": "moderate", "religious_freedom": "free",
    },
    "slovakia": {
        "cost_tier": "low", "safety_level": "very_safe", "visa_difficulty": "easy",
        "english_prevalence": "common", "local_language_difficulty": "hard",
        "climate_type": "continental", "infrastructure_level": "good",
        "healthcare_level": "good", "religious_freedom": "free",
    },
    "slovenia": {
        "cost_tier": "moderate", "safety_level": "very_safe", "visa_difficulty": "easy",
        "english_prevalence": "widespread", "local_language_difficulty": "hard",
        "climate_type": "continental", "infrastructure_level": "excellent",
        "healthcare_level": "excellent", "religious_freedom": "free",
    },
    "spain": {
        "cost_tier": "moderate", "safety_level": "safe", "visa_difficulty": "hard",
        "english_prevalence": "limited", "local_language_difficulty": "easy",
        "climate_type": "mediterranean", "infrastructure_level": "excellent",
        "healthcare_level": "excellent", "religious_freedom": "free",
    },
    "st-pierre-and-miquelon": {
        "cost_tier": "high", "safety_level": "very_safe", "visa_difficulty": "moderate",
        "english_prevalence": "moderate", "local_language_difficulty": "moderate",
        "climate_type": "cold", "infrastructure_level": "moderate",
        "healthcare_level": "good", "religious_freedom": "free",
    },
    "sweden": {
        "cost_tier": "high", "safety_level": "safe", "visa_difficulty": "moderate",
        "english_prevalence": "widespread", "local_language_difficulty": "moderate",
        "climate_type": "cold", "infrastructure_level": "excellent",
        "healthcare_level": "excellent", "religious_freedom": "free",
    },
    "switzerland": {
        "cost_tier": "ultra_high", "safety_level": "very_safe", "visa_difficulty": "hard",
        "english_prevalence": "widespread", "local_language_difficulty": "moderate",
        "climate_type": "cold", "infrastructure_level": "excellent",
        "healthcare_level": "excellent", "religious_freedom": "free",
    },
    "türkiye": {
        "cost_tier": "low", "safety_level": "moderate", "visa_difficulty": "easy",
        "english_prevalence": "limited", "local_language_difficulty": "hard",
        "climate_type": "mediterranean", "infrastructure_level": "good",
        "healthcare_level": "good", "religious_freedom": "restricted",
    },
    "ukraine": {
        "cost_tier": "ultra_low", "safety_level": "very_unsafe", "visa_difficulty": "easy",
        "english_prevalence": "moderate", "local_language_difficulty": "hard",
        "climate_type": "continental", "infrastructure_level": "basic",
        "healthcare_level": "basic", "religious_freedom": "mostly_free",
    },

    # ---- Americas (North, Central, South, Caribbean) ----
    "american-samoa": {
        "cost_tier": "moderate", "safety_level": "safe", "visa_difficulty": "easy",
        "english_prevalence": "widespread", "local_language_difficulty": "moderate",
        "climate_type": "tropical", "infrastructure_level": "moderate",
        "healthcare_level": "moderate", "religious_freedom": "free",
    },
    "anguilla": {
        "cost_tier": "high", "safety_level": "very_safe", "visa_difficulty": "easy",
        "english_prevalence": "widespread", "local_language_difficulty": "easy",
        "climate_type": "tropical", "infrastructure_level": "good",
        "healthcare_level": "moderate", "religious_freedom": "free",
    },
    "antigua": {
        "cost_tier": "moderate", "safety_level": "safe", "visa_difficulty": "easy",
        "english_prevalence": "widespread", "local_language_difficulty": "easy",
        "climate_type": "tropical", "infrastructure_level": "good",
        "healthcare_level": "moderate", "religious_freedom": "free",
    },
    "argentina": {
        "cost_tier": "low", "safety_level": "moderate", "visa_difficulty": "easy",
        "english_prevalence": "limited", "local_language_difficulty": "moderate",
        "climate_type": "temperate", "infrastructure_level": "good",
        "healthcare_level": "moderate", "religious_freedom": "free",
    },
    "bahamas": {
        "cost_tier": "high", "safety_level": "safe", "visa_difficulty": "easy",
        "english_prevalence": "widespread", "local_language_difficulty": "easy",
        "climate_type": "tropical", "infrastructure_level": "good",
        "healthcare_level": "good", "religious_freedom": "free",
    },
    "barbados": {
        "cost_tier": "high", "safety_level": "safe", "visa_difficulty": "easy",
        "english_prevalence": "widespread", "local_language_difficulty": "easy",
        "climate_type": "tropical", "infrastructure_level": "excellent",
        "healthcare_level": "good", "religious_freedom": "free",
    },
    "belize": {
        "cost_tier": "low", "safety_level": "moderate", "visa_difficulty": "easy",
        "english_prevalence": "widespread", "local_language_difficulty": "easy",
        "climate_type": "tropical", "infrastructure_level": "moderate",
        "healthcare_level": "moderate", "religious_freedom": "free",
    },
    "bermuda": {
        "cost_tier": "ultra_high", "safety_level": "very_safe", "visa_difficulty": "moderate",
        "english_prevalence": "widespread", "local_language_difficulty": "easy",
        "climate_type": "subtropical", "infrastructure_level": "excellent",
        "healthcare_level": "excellent", "religious_freedom": "free",
    },
    "bolivia": {
        "cost_tier": "ultra_low", "safety_level": "moderate", "visa_difficulty": "easy",
        "english_prevalence": "limited", "local_language_difficulty": "moderate",
        "climate_type": "temperate", "infrastructure_level": "basic",
        "healthcare_level": "basic", "religious_freedom": "free",
    },
    "bonaire": {
        "cost_tier": "high", "safety_level": "very_safe", "visa_difficulty": "easy",
        "english_prevalence": "widespread", "local_language_difficulty": "easy",
        "climate_type": "tropical", "infrastructure_level": "good",
        "healthcare_level": "good", "religious_freedom": "free",
    },
    "brazil": {
        "cost_tier": "low", "safety_level": "moderate", "visa_difficulty": "easy",
        "english_prevalence": "limited", "local_language_difficulty": "hard",
        "climate_type": "tropical", "infrastructure_level": "good",
        "healthcare_level": "moderate", "religious_freedom": "free",
    },
    "canada": {
        "cost_tier": "high", "safety_level": "very_safe", "visa_difficulty": "hard",
        "english_prevalence": "widespread", "local_language_difficulty": "easy",
        "climate_type": "cold", "infrastructure_level": "excellent",
        "healthcare_level": "excellent", "religious_freedom": "free",
    },
    "cayman-islands": {
        "cost_tier": "ultra_high", "safety_level": "very_safe", "visa_difficulty": "moderate",
        "english_prevalence": "widespread", "local_language_difficulty": "easy",
        "climate_type": "tropical", "infrastructure_level": "excellent",
        "healthcare_level": "excellent", "religious_freedom": "free",
    },
    "chile": {
        "cost_tier": "moderate", "safety_level": "safe", "visa_difficulty": "easy",
        "english_prevalence": "limited", "local_language_difficulty": "moderate",
        "climate_type": "mediterranean", "infrastructure_level": "good",
        "healthcare_level": "good", "religious_freedom": "free",
    },
    "colombia": {
        "cost_tier": "low", "safety_level": "moderate", "visa_difficulty": "easy",
        "english_prevalence": "limited", "local_language_difficulty": "moderate",
        "climate_type": "tropical", "infrastructure_level": "moderate",
        "healthcare_level": "moderate", "religious_freedom": "free",
    },
    "costa-rica": {
        "cost_tier": "moderate", "safety_level": "safe", "visa_difficulty": "easy",
        "english_prevalence": "common", "local_language_difficulty": "moderate",
        "climate_type": "tropical", "infrastructure_level": "good",
        "healthcare_level": "good", "religious_freedom": "free",
    },
    "cuba": {
        "cost_tier": "ultra_low", "safety_level": "safe", "visa_difficulty": "hard",
        "english_prevalence": "limited", "local_language_difficulty": "moderate",
        "climate_type": "tropical", "infrastructure_level": "basic",
        "healthcare_level": "moderate", "religious_freedom": "restricted",
    },
    "curaçao": {
        "cost_tier": "high", "safety_level": "very_safe", "visa_difficulty": "easy",
        "english_prevalence": "widespread", "local_language_difficulty": "easy",
        "climate_type": "tropical", "infrastructure_level": "good",
        "healthcare_level": "good", "religious_freedom": "free",
    },
    "dominica": {
        "cost_tier": "low", "safety_level": "safe", "visa_difficulty": "easy",
        "english_prevalence": "widespread", "local_language_difficulty": "easy",
        "climate_type": "tropical", "infrastructure_level": "moderate",
        "healthcare_level": "basic", "religious_freedom": "free",
    },
    "dominican-republic": {
        "cost_tier": "low", "safety_level": "moderate", "visa_difficulty": "easy",
        "english_prevalence": "limited", "local_language_difficulty": "moderate",
        "climate_type": "tropical", "infrastructure_level": "moderate",
        "healthcare_level": "moderate", "religious_freedom": "free",
    },
    "ecuador": {
        "cost_tier": "low", "safety_level": "moderate", "visa_difficulty": "easy",
        "english_prevalence": "limited", "local_language_difficulty": "moderate",
        "climate_type": "tropical", "infrastructure_level": "moderate",
        "healthcare_level": "moderate", "religious_freedom": "free",
    },
    "el-salvador": {
        "cost_tier": "low", "safety_level": "moderate", "visa_difficulty": "easy",
        "english_prevalence": "limited", "local_language_difficulty": "moderate",
        "climate_type": "tropical", "infrastructure_level": "moderate",
        "healthcare_level": "moderate", "religious_freedom": "free",
    },
    "falkland-islands": {
        "cost_tier": "high", "safety_level": "very_safe", "visa_difficulty": "moderate",
        "english_prevalence": "widespread", "local_language_difficulty": "easy",
        "climate_type": "cold", "infrastructure_level": "good",
        "healthcare_level": "good", "religious_freedom": "free",
    },
    "french-guiana": {
        "cost_tier": "high", "safety_level": "moderate", "visa_difficulty": "moderate",
        "english_prevalence": "limited", "local_language_difficulty": "moderate",
        "climate_type": "tropical", "infrastructure_level": "moderate",
        "healthcare_level": "good", "religious_freedom": "free",
    },
    "grenada": {
        "cost_tier": "moderate", "safety_level": "safe", "visa_difficulty": "easy",
        "english_prevalence": "widespread", "local_language_difficulty": "easy",
        "climate_type": "tropical", "infrastructure_level": "moderate",
        "healthcare_level": "moderate", "religious_freedom": "free",
    },
    "guadeloupe": {
        "cost_tier": "high", "safety_level": "safe", "visa_difficulty": "moderate",
        "english_prevalence": "limited", "local_language_difficulty": "moderate",
        "climate_type": "tropical", "infrastructure_level": "good",
        "healthcare_level": "excellent", "religious_freedom": "free",
    },
    "guatemala": {
        "cost_tier": "low", "safety_level": "moderate", "visa_difficulty": "easy",
        "english_prevalence": "limited", "local_language_difficulty": "moderate",
        "climate_type": "subtropical", "infrastructure_level": "moderate",
        "healthcare_level": "moderate", "religious_freedom": "free",
    },
    "guyana": {
        "cost_tier": "low", "safety_level": "moderate", "visa_difficulty": "easy",
        "english_prevalence": "widespread", "local_language_difficulty": "easy",
        "climate_type": "tropical", "infrastructure_level": "basic",
        "healthcare_level": "basic", "religious_freedom": "free",
    },
    "haiti": {
        "cost_tier": "ultra_low", "safety_level": "very_unsafe", "visa_difficulty": "hard",
        "english_prevalence": "limited", "local_language_difficulty": "moderate",
        "climate_type": "tropical", "infrastructure_level": "minimal",
        "healthcare_level": "minimal", "religious_freedom": "mostly_free",
    },
    "honduras": {
        "cost_tier": "ultra_low", "safety_level": "unsafe", "visa_difficulty": "easy",
        "english_prevalence": "limited", "local_language_difficulty": "moderate",
        "climate_type": "tropical", "infrastructure_level": "basic",
        "healthcare_level": "basic", "religious_freedom": "free",
    },
    "jamaica": {
        "cost_tier": "low", "safety_level": "moderate", "visa_difficulty": "easy",
        "english_prevalence": "widespread", "local_language_difficulty": "easy",
        "climate_type": "tropical", "infrastructure_level": "moderate",
        "healthcare_level": "moderate", "religious_freedom": "free",
    },
    "martinique": {
        "cost_tier": "high", "safety_level": "safe", "visa_difficulty": "moderate",
        "english_prevalence": "limited", "local_language_difficulty": "moderate",
        "climate_type": "tropical", "infrastructure_level": "good",
        "healthcare_level": "excellent", "religious_freedom": "free",
    },
    "mexico": {
        "cost_tier": "low", "safety_level": "moderate", "visa_difficulty": "easy",
        "english_prevalence": "limited", "local_language_difficulty": "moderate",
        "climate_type": "subtropical", "infrastructure_level": "good",
        "healthcare_level": "good", "religious_freedom": "free",
    },
    "montserrat": {
        "cost_tier": "high", "safety_level": "very_safe", "visa_difficulty": "easy",
        "english_prevalence": "widespread", "local_language_difficulty": "easy",
        "climate_type": "tropical", "infrastructure_level": "moderate",
        "healthcare_level": "moderate", "religious_freedom": "free",
    },
    "nevis": {
        "cost_tier": "high", "safety_level": "very_safe", "visa_difficulty": "easy",
        "english_prevalence": "widespread", "local_language_difficulty": "easy",
        "climate_type": "tropical", "infrastructure_level": "good",
        "healthcare_level": "moderate", "religious_freedom": "free",
    },
    "nicaragua": {
        "cost_tier": "ultra_low", "safety_level": "moderate", "visa_difficulty": "easy",
        "english_prevalence": "limited", "local_language_difficulty": "moderate",
        "climate_type": "tropical", "infrastructure_level": "basic",
        "healthcare_level": "basic", "religious_freedom": "restricted",
    },
    "panama": {
        "cost_tier": "moderate", "safety_level": "safe", "visa_difficulty": "easy",
        "english_prevalence": "common", "local_language_difficulty": "moderate",
        "climate_type": "tropical", "infrastructure_level": "good",
        "healthcare_level": "good", "religious_freedom": "free",
    },
    "paraguay": {
        "cost_tier": "ultra_low", "safety_level": "moderate", "visa_difficulty": "easy",
        "english_prevalence": "limited", "local_language_difficulty": "moderate",
        "climate_type": "subtropical", "infrastructure_level": "moderate",
        "healthcare_level": "moderate", "religious_freedom": "free",
    },
    "peru": {
        "cost_tier": "low", "safety_level": "moderate", "visa_difficulty": "easy",
        "english_prevalence": "limited", "local_language_difficulty": "moderate",
        "climate_type": "temperate", "infrastructure_level": "moderate",
        "healthcare_level": "moderate", "religious_freedom": "free",
    },
    "puerto-rico": {
        "cost_tier": "high", "safety_level": "moderate", "visa_difficulty": "easy",
        "english_prevalence": "widespread", "local_language_difficulty": "easy",
        "climate_type": "tropical", "infrastructure_level": "good",
        "healthcare_level": "good", "religious_freedom": "free",
    },
    "saba": {
        "cost_tier": "high", "safety_level": "very_safe", "visa_difficulty": "easy",
        "english_prevalence": "widespread", "local_language_difficulty": "easy",
        "climate_type": "tropical", "infrastructure_level": "moderate",
        "healthcare_level": "good", "religious_freedom": "free",
    },
    "st-barthélemy": {
        "cost_tier": "ultra_high", "safety_level": "very_safe", "visa_difficulty": "moderate",
        "english_prevalence": "common", "local_language_difficulty": "moderate",
        "climate_type": "tropical", "infrastructure_level": "excellent",
        "healthcare_level": "good", "religious_freedom": "free",
    },
    "st-eustatius": {
        "cost_tier": "high", "safety_level": "very_safe", "visa_difficulty": "easy",
        "english_prevalence": "widespread", "local_language_difficulty": "easy",
        "climate_type": "tropical", "infrastructure_level": "moderate",
        "healthcare_level": "good", "religious_freedom": "free",
    },
    "st-kitts": {
        "cost_tier": "moderate", "safety_level": "safe", "visa_difficulty": "easy",
        "english_prevalence": "widespread", "local_language_difficulty": "easy",
        "climate_type": "tropical", "infrastructure_level": "good",
        "healthcare_level": "moderate", "religious_freedom": "free",
    },
    "st-lucia": {
        "cost_tier": "moderate", "safety_level": "safe", "visa_difficulty": "easy",
        "english_prevalence": "widespread", "local_language_difficulty": "easy",
        "climate_type": "tropical", "infrastructure_level": "moderate",
        "healthcare_level": "moderate", "religious_freedom": "free",
    },
    "st-maarten": {
        "cost_tier": "high", "safety_level": "very_safe", "visa_difficulty": "easy",
        "english_prevalence": "widespread", "local_language_difficulty": "easy",
        "climate_type": "tropical", "infrastructure_level": "good",
        "healthcare_level": "good", "religious_freedom": "free",
    },
    "st-martin": {
        "cost_tier": "high", "safety_level": "safe", "visa_difficulty": "moderate",
        "english_prevalence": "common", "local_language_difficulty": "moderate",
        "climate_type": "tropical", "infrastructure_level": "good",
        "healthcare_level": "good", "religious_freedom": "free",
    },
    "st-vincent-the-grenadines": {
        "cost_tier": "moderate", "safety_level": "safe", "visa_difficulty": "easy",
        "english_prevalence": "widespread", "local_language_difficulty": "easy",
        "climate_type": "tropical", "infrastructure_level": "moderate",
        "healthcare_level": "moderate", "religious_freedom": "free",
    },
    "suriname": {
        "cost_tier": "low", "safety_level": "moderate", "visa_difficulty": "easy",
        "english_prevalence": "common", "local_language_difficulty": "moderate",
        "climate_type": "tropical", "infrastructure_level": "basic",
        "healthcare_level": "basic", "religious_freedom": "free",
    },
    "trinidad-tobago": {
        "cost_tier": "moderate", "safety_level": "moderate", "visa_difficulty": "easy",
        "english_prevalence": "widespread", "local_language_difficulty": "easy",
        "climate_type": "tropical", "infrastructure_level": "moderate",
        "healthcare_level": "moderate", "religious_freedom": "free",
    },
    "turks-and-caicos": {
        "cost_tier": "high", "safety_level": "safe", "visa_difficulty": "easy",
        "english_prevalence": "widespread", "local_language_difficulty": "easy",
        "climate_type": "tropical", "infrastructure_level": "good",
        "healthcare_level": "moderate", "religious_freedom": "free",
    },
    "united-states-of-america": {
        "cost_tier": "high", "safety_level": "safe", "visa_difficulty": "easy",
        "english_prevalence": "widespread", "local_language_difficulty": "easy",
        "climate_type": "temperate", "infrastructure_level": "excellent",
        "healthcare_level": "good", "religious_freedom": "free",
    },
    "uruguay": {
        "cost_tier": "moderate", "safety_level": "safe", "visa_difficulty": "easy",
        "english_prevalence": "limited", "local_language_difficulty": "moderate",
        "climate_type": "temperate", "infrastructure_level": "good",
        "healthcare_level": "good", "religious_freedom": "free",
    },
    "venezuela": {
        "cost_tier": "ultra_low", "safety_level": "unsafe", "visa_difficulty": "hard",
        "english_prevalence": "limited", "local_language_difficulty": "moderate",
        "climate_type": "tropical", "infrastructure_level": "basic",
        "healthcare_level": "minimal", "religious_freedom": "restricted",
    },
    "virgin-islands-british": {
        "cost_tier": "high", "safety_level": "very_safe", "visa_difficulty": "easy",
        "english_prevalence": "widespread", "local_language_difficulty": "easy",
        "climate_type": "tropical", "infrastructure_level": "good",
        "healthcare_level": "moderate", "religious_freedom": "free",
    },
    "virgin-islands-us": {
        "cost_tier": "high", "safety_level": "safe", "visa_difficulty": "easy",
        "english_prevalence": "widespread", "local_language_difficulty": "easy",
        "climate_type": "tropical", "infrastructure_level": "good",
        "healthcare_level": "good", "religious_freedom": "free",
    },

    # ---- East Africa ----
    "angola": {
        "cost_tier": "moderate", "safety_level": "moderate", "visa_difficulty": "hard",
        "english_prevalence": "limited", "local_language_difficulty": "hard",
        "climate_type": "tropical", "infrastructure_level": "basic",
        "healthcare_level": "basic", "religious_freedom": "free",
    },
    "botswana": {
        "cost_tier": "moderate", "safety_level": "safe", "visa_difficulty": "easy",
        "english_prevalence": "widespread", "local_language_difficulty": "moderate",
        "climate_type": "arid", "infrastructure_level": "good",
        "healthcare_level": "moderate", "religious_freedom": "free",
    },
    "burundi": {
        "cost_tier": "ultra_low", "safety_level": "moderate", "visa_difficulty": "hard",
        "english_prevalence": "limited", "local_language_difficulty": "hard",
        "climate_type": "tropical", "infrastructure_level": "basic",
        "healthcare_level": "basic", "religious_freedom": "free",
    },
    "eswatini": {
        "cost_tier": "low", "safety_level": "moderate", "visa_difficulty": "easy",
        "english_prevalence": "widespread", "local_language_difficulty": "moderate",
        "climate_type": "subtropical", "infrastructure_level": "moderate",
        "healthcare_level": "basic", "religious_freedom": "free",
    },
    "ethiopia": {
        "cost_tier": "ultra_low", "safety_level": "unsafe", "visa_difficulty": "hard",
        "english_prevalence": "moderate", "local_language_difficulty": "hard",
        "climate_type": "subtropical", "infrastructure_level": "basic",
        "healthcare_level": "basic", "religious_freedom": "mostly_free",
    },
    "kenya": {
        "cost_tier": "low", "safety_level": "moderate", "visa_difficulty": "easy",
        "english_prevalence": "widespread", "local_language_difficulty": "hard",
        "climate_type": "tropical", "infrastructure_level": "moderate",
        "healthcare_level": "moderate", "religious_freedom": "free",
    },
    "lesotho": {
        "cost_tier": "low", "safety_level": "moderate", "visa_difficulty": "easy",
        "english_prevalence": "widespread", "local_language_difficulty": "moderate",
        "climate_type": "temperate", "infrastructure_level": "basic",
        "healthcare_level": "basic", "religious_freedom": "free",
    },
    "madagascar": {
        "cost_tier": "ultra_low", "safety_level": "moderate", "visa_difficulty": "easy",
        "english_prevalence": "limited", "local_language_difficulty": "hard",
        "climate_type": "tropical", "infrastructure_level": "basic",
        "healthcare_level": "basic", "religious_freedom": "free",
    },
    "malawi": {
        "cost_tier": "ultra_low", "safety_level": "moderate", "visa_difficulty": "easy",
        "english_prevalence": "widespread", "local_language_difficulty": "moderate",
        "climate_type": "subtropical", "infrastructure_level": "basic",
        "healthcare_level": "basic", "religious_freedom": "free",
    },
    "mauritius": {
        "cost_tier": "moderate", "safety_level": "very_safe", "visa_difficulty": "easy",
        "english_prevalence": "widespread", "local_language_difficulty": "moderate",
        "climate_type": "tropical", "infrastructure_level": "good",
        "healthcare_level": "good", "religious_freedom": "free",
    },
    "mayotte": {
        "cost_tier": "high", "safety_level": "moderate", "visa_difficulty": "moderate",
        "english_prevalence": "limited", "local_language_difficulty": "hard",
        "climate_type": "tropical", "infrastructure_level": "moderate",
        "healthcare_level": "good", "religious_freedom": "free",
    },
    "mozambique": {
        "cost_tier": "ultra_low", "safety_level": "moderate", "visa_difficulty": "easy",
        "english_prevalence": "limited", "local_language_difficulty": "moderate",
        "climate_type": "tropical", "infrastructure_level": "basic",
        "healthcare_level": "basic", "religious_freedom": "free",
    },
    "namibia": {
        "cost_tier": "moderate", "safety_level": "safe", "visa_difficulty": "easy",
        "english_prevalence": "widespread", "local_language_difficulty": "moderate",
        "climate_type": "arid", "infrastructure_level": "good",
        "healthcare_level": "moderate", "religious_freedom": "free",
    },
    "réunion": {
        "cost_tier": "high", "safety_level": "safe", "visa_difficulty": "moderate",
        "english_prevalence": "limited", "local_language_difficulty": "moderate",
        "climate_type": "tropical", "infrastructure_level": "excellent",
        "healthcare_level": "excellent", "religious_freedom": "free",
    },
    "rodrigues": {
        "cost_tier": "moderate", "safety_level": "very_safe", "visa_difficulty": "easy",
        "english_prevalence": "widespread", "local_language_difficulty": "moderate",
        "climate_type": "tropical", "infrastructure_level": "moderate",
        "healthcare_level": "moderate", "religious_freedom": "free",
    },
    "rwanda": {
        "cost_tier": "low", "safety_level": "safe", "visa_difficulty": "easy",
        "english_prevalence": "widespread", "local_language_difficulty": "hard",
        "climate_type": "temperate", "infrastructure_level": "moderate",
        "healthcare_level": "moderate", "religious_freedom": "free",
    },
    "seychelles": {
        "cost_tier": "high", "safety_level": "very_safe", "visa_difficulty": "easy",
        "english_prevalence": "widespread", "local_language_difficulty": "moderate",
        "climate_type": "tropical", "infrastructure_level": "good",
        "healthcare_level": "good", "religious_freedom": "free",
    },
    "south-africa": {
        "cost_tier": "moderate", "safety_level": "unsafe", "visa_difficulty": "moderate",
        "english_prevalence": "widespread", "local_language_difficulty": "easy",
        "climate_type": "temperate", "infrastructure_level": "good",
        "healthcare_level": "good", "religious_freedom": "free",
    },
    "south-sudan": {
        "cost_tier": "ultra_low", "safety_level": "very_unsafe", "visa_difficulty": "very_hard",
        "english_prevalence": "moderate", "local_language_difficulty": "hard",
        "climate_type": "tropical", "infrastructure_level": "minimal",
        "healthcare_level": "minimal", "religious_freedom": "mostly_free",
    },
    "st-helena": {
        "cost_tier": "high", "safety_level": "very_safe", "visa_difficulty": "moderate",
        "english_prevalence": "widespread", "local_language_difficulty": "easy",
        "climate_type": "temperate", "infrastructure_level": "moderate",
        "healthcare_level": "good", "religious_freedom": "free",
    },
    "tanzania": {
        "cost_tier": "low", "safety_level": "moderate", "visa_difficulty": "easy",
        "english_prevalence": "widespread", "local_language_difficulty": "hard",
        "climate_type": "tropical", "infrastructure_level": "basic",
        "healthcare_level": "basic", "religious_freedom": "free",
    },
    "uganda": {
        "cost_tier": "ultra_low", "safety_level": "moderate", "visa_difficulty": "easy",
        "english_prevalence": "widespread", "local_language_difficulty": "hard",
        "climate_type": "tropical", "infrastructure_level": "basic",
        "healthcare_level": "basic", "religious_freedom": "free",
    },
    "zambia": {
        "cost_tier": "low", "safety_level": "moderate", "visa_difficulty": "easy",
        "english_prevalence": "widespread", "local_language_difficulty": "moderate",
        "climate_type": "subtropical", "infrastructure_level": "basic",
        "healthcare_level": "basic", "religious_freedom": "free",
    },
    "zimbabwe": {
        "cost_tier": "ultra_low", "safety_level": "moderate", "visa_difficulty": "easy",
        "english_prevalence": "widespread", "local_language_difficulty": "moderate",
        "climate_type": "subtropical", "infrastructure_level": "basic",
        "healthcare_level": "basic", "religious_freedom": "free",
    },

    # ---- West Africa ----
    "benin": {
        "cost_tier": "ultra_low", "safety_level": "moderate", "visa_difficulty": "easy",
        "english_prevalence": "limited", "local_language_difficulty": "hard",
        "climate_type": "tropical", "infrastructure_level": "basic",
        "healthcare_level": "basic", "religious_freedom": "free",
    },
    "burkina-faso": {
        "cost_tier": "ultra_low", "safety_level": "very_unsafe", "visa_difficulty": "hard",
        "english_prevalence": "limited", "local_language_difficulty": "hard",
        "climate_type": "tropical", "infrastructure_level": "basic",
        "healthcare_level": "minimal", "religious_freedom": "mostly_free",
    },
    "cape-verde": {
        "cost_tier": "low", "safety_level": "safe", "visa_difficulty": "easy",
        "english_prevalence": "common", "local_language_difficulty": "moderate",
        "climate_type": "arid", "infrastructure_level": "moderate",
        "healthcare_level": "moderate", "religious_freedom": "free",
    },
    "côte-divoire": {
        "cost_tier": "low", "safety_level": "moderate", "visa_difficulty": "hard",
        "english_prevalence": "limited", "local_language_difficulty": "hard",
        "climate_type": "tropical", "infrastructure_level": "moderate",
        "healthcare_level": "moderate", "religious_freedom": "free",
    },
    "gambia": {
        "cost_tier": "ultra_low", "safety_level": "moderate", "visa_difficulty": "easy",
        "english_prevalence": "widespread", "local_language_difficulty": "moderate",
        "climate_type": "tropical", "infrastructure_level": "basic",
        "healthcare_level": "basic", "religious_freedom": "free",
    },
    "ghana": {
        "cost_tier": "low", "safety_level": "moderate", "visa_difficulty": "easy",
        "english_prevalence": "widespread", "local_language_difficulty": "hard",
        "climate_type": "tropical", "infrastructure_level": "moderate",
        "healthcare_level": "moderate", "religious_freedom": "free",
    },
    "guinea": {
        "cost_tier": "ultra_low", "safety_level": "unsafe", "visa_difficulty": "hard",
        "english_prevalence": "limited", "local_language_difficulty": "hard",
        "climate_type": "tropical", "infrastructure_level": "basic",
        "healthcare_level": "minimal", "religious_freedom": "mostly_free",
    },
    "guinea-bissau": {
        "cost_tier": "ultra_low", "safety_level": "moderate", "visa_difficulty": "hard",
        "english_prevalence": "limited", "local_language_difficulty": "hard",
        "climate_type": "tropical", "infrastructure_level": "minimal",
        "healthcare_level": "minimal", "religious_freedom": "free",
    },
    "liberia": {
        "cost_tier": "ultra_low", "safety_level": "unsafe", "visa_difficulty": "hard",
        "english_prevalence": "widespread", "local_language_difficulty": "easy",
        "climate_type": "tropical", "infrastructure_level": "basic",
        "healthcare_level": "minimal", "religious_freedom": "free",
    },
    "mali": {
        "cost_tier": "ultra_low", "safety_level": "very_unsafe", "visa_difficulty": "very_hard",
        "english_prevalence": "limited", "local_language_difficulty": "hard",
        "climate_type": "arid", "infrastructure_level": "basic",
        "healthcare_level": "minimal", "religious_freedom": "mostly_free",
    },
    "niger": {
        "cost_tier": "ultra_low", "safety_level": "very_unsafe", "visa_difficulty": "very_hard",
        "english_prevalence": "limited", "local_language_difficulty": "hard",
        "climate_type": "arid", "infrastructure_level": "minimal",
        "healthcare_level": "minimal", "religious_freedom": "mostly_free",
    },
    "nigeria": {
        "cost_tier": "low", "safety_level": "unsafe", "visa_difficulty": "hard",
        "english_prevalence": "widespread", "local_language_difficulty": "hard",
        "climate_type": "tropical", "infrastructure_level": "moderate",
        "healthcare_level": "basic", "religious_freedom": "restricted",
    },
    "senegal": {
        "cost_tier": "ultra_low", "safety_level": "moderate", "visa_difficulty": "easy",
        "english_prevalence": "limited", "local_language_difficulty": "hard",
        "climate_type": "arid", "infrastructure_level": "moderate",
        "healthcare_level": "moderate", "religious_freedom": "free",
    },
    "sierra-leone": {
        "cost_tier": "ultra_low", "safety_level": "moderate", "visa_difficulty": "easy",
        "english_prevalence": "widespread", "local_language_difficulty": "moderate",
        "climate_type": "tropical", "infrastructure_level": "basic",
        "healthcare_level": "minimal", "religious_freedom": "free",
    },
    "togo": {
        "cost_tier": "ultra_low", "safety_level": "moderate", "visa_difficulty": "hard",
        "english_prevalence": "limited", "local_language_difficulty": "hard",
        "climate_type": "tropical", "infrastructure_level": "basic",
        "healthcare_level": "basic", "religious_freedom": "free",
    },

    # ---- Central Africa ----
    "cameroon": {
        "cost_tier": "low", "safety_level": "moderate", "visa_difficulty": "hard",
        "english_prevalence": "moderate", "local_language_difficulty": "hard",
        "climate_type": "tropical", "infrastructure_level": "basic",
        "healthcare_level": "basic", "religious_freedom": "free",
    },
    "central-african-republic": {
        "cost_tier": "ultra_low", "safety_level": "very_unsafe", "visa_difficulty": "very_hard",
        "english_prevalence": "limited", "local_language_difficulty": "hard",
        "climate_type": "tropical", "infrastructure_level": "minimal",
        "healthcare_level": "minimal", "religious_freedom": "mostly_free",
    },
    "chad": {
        "cost_tier": "ultra_low", "safety_level": "very_unsafe", "visa_difficulty": "very_hard",
        "english_prevalence": "limited", "local_language_difficulty": "hard",
        "climate_type": "arid", "infrastructure_level": "minimal",
        "healthcare_level": "minimal", "religious_freedom": "mostly_free",
    },
    "congo-dem-republic-of": {
        "cost_tier": "ultra_low", "safety_level": "unsafe", "visa_difficulty": "very_hard",
        "english_prevalence": "limited", "local_language_difficulty": "hard",
        "climate_type": "tropical", "infrastructure_level": "minimal",
        "healthcare_level": "minimal", "religious_freedom": "mostly_free",
    },
    "congo-republic-of": {
        "cost_tier": "moderate", "safety_level": "moderate", "visa_difficulty": "hard",
        "english_prevalence": "limited", "local_language_difficulty": "hard",
        "climate_type": "tropical", "infrastructure_level": "basic",
        "healthcare_level": "basic", "religious_freedom": "free",
    },
    "equatorial-guinea": {
        "cost_tier": "high", "safety_level": "moderate", "visa_difficulty": "very_hard",
        "english_prevalence": "limited", "local_language_difficulty": "moderate",
        "climate_type": "tropical", "infrastructure_level": "moderate",
        "healthcare_level": "basic", "religious_freedom": "restricted",
    },
    "gabon": {
        "cost_tier": "moderate", "safety_level": "moderate", "visa_difficulty": "hard",
        "english_prevalence": "limited", "local_language_difficulty": "hard",
        "climate_type": "tropical", "infrastructure_level": "moderate",
        "healthcare_level": "moderate", "religious_freedom": "free",
    },
    "são-tomé-and-príncipe": {
        "cost_tier": "ultra_low", "safety_level": "safe", "visa_difficulty": "easy",
        "english_prevalence": "limited", "local_language_difficulty": "hard",
        "climate_type": "tropical", "infrastructure_level": "basic",
        "healthcare_level": "basic", "religious_freedom": "free",
    },

    # ---- North Africa ----
    "sudan": {
        "cost_tier": "low", "safety_level": "very_unsafe", "visa_difficulty": "very_hard",
        "english_prevalence": "limited", "local_language_difficulty": "hard",
        "climate_type": "arid", "infrastructure_level": "minimal",
        "healthcare_level": "minimal", "religious_freedom": "restricted",
    },

    # ---- Middle East ----
    "israel": {
        "cost_tier": "high", "safety_level": "moderate", "visa_difficulty": "easy",
        "english_prevalence": "widespread", "local_language_difficulty": "moderate",
        "climate_type": "mediterranean", "infrastructure_level": "excellent",
        "healthcare_level": "excellent", "religious_freedom": "free",
    },
    "palestinian-territories": {
        "cost_tier": "low", "safety_level": "unsafe", "visa_difficulty": "very_hard",
        "english_prevalence": "moderate", "local_language_difficulty": "hard",
        "climate_type": "mediterranean", "infrastructure_level": "basic",
        "healthcare_level": "moderate", "religious_freedom": "restricted",
    },

    # ---- Central Asia ----
    "armenia": {
        "cost_tier": "low", "safety_level": "safe", "visa_difficulty": "easy",
        "english_prevalence": "common", "local_language_difficulty": "moderate",
        "climate_type": "continental", "infrastructure_level": "moderate",
        "healthcare_level": "moderate", "religious_freedom": "free",
    },
    "azerbaijan": {
        "cost_tier": "moderate", "safety_level": "safe", "visa_difficulty": "moderate",
        "english_prevalence": "limited", "local_language_difficulty": "hard",
        "climate_type": "continental", "infrastructure_level": "good",
        "healthcare_level": "moderate", "religious_freedom": "restricted",
    },
    "georgia": {
        "cost_tier": "low", "safety_level": "safe", "visa_difficulty": "easy",
        "english_prevalence": "common", "local_language_difficulty": "hard",
        "climate_type": "continental", "infrastructure_level": "good",
        "healthcare_level": "moderate", "religious_freedom": "free",
    },
    "kazakhstan": {
        "cost_tier": "low", "safety_level": "safe", "visa_difficulty": "easy",
        "english_prevalence": "limited", "local_language_difficulty": "hard",
        "climate_type": "continental", "infrastructure_level": "good",
        "healthcare_level": "moderate", "religious_freedom": "restricted",
    },
    "kyrgyzstan": {
        "cost_tier": "ultra_low", "safety_level": "safe", "visa_difficulty": "easy",
        "english_prevalence": "limited", "local_language_difficulty": "hard",
        "climate_type": "continental", "infrastructure_level": "basic",
        "healthcare_level": "basic", "religious_freedom": "restricted",
    },
    "mongolia": {
        "cost_tier": "low", "safety_level": "safe", "visa_difficulty": "easy",
        "english_prevalence": "limited", "local_language_difficulty": "very_hard",
        "climate_type": "continental", "infrastructure_level": "basic",
        "healthcare_level": "basic", "religious_freedom": "free",
    },

    # ---- South Asia ----
    "bangladesh": {
        "cost_tier": "ultra_low", "safety_level": "moderate", "visa_difficulty": "moderate",
        "english_prevalence": "common", "local_language_difficulty": "hard",
        "climate_type": "tropical", "infrastructure_level": "basic",
        "healthcare_level": "basic", "religious_freedom": "free",
    },
    "india": {
        "cost_tier": "ultra_low", "safety_level": "moderate", "visa_difficulty": "hard",
        "english_prevalence": "widespread", "local_language_difficulty": "hard",
        "climate_type": "tropical", "infrastructure_level": "moderate",
        "healthcare_level": "moderate", "religious_freedom": "free",
    },
    "nepal": {
        "cost_tier": "ultra_low", "safety_level": "moderate", "visa_difficulty": "easy",
        "english_prevalence": "common", "local_language_difficulty": "hard",
        "climate_type": "temperate", "infrastructure_level": "basic",
        "healthcare_level": "basic", "religious_freedom": "free",
    },
    "pakistan": {
        "cost_tier": "ultra_low", "safety_level": "unsafe", "visa_difficulty": "hard",
        "english_prevalence": "common", "local_language_difficulty": "hard",
        "climate_type": "arid", "infrastructure_level": "moderate",
        "healthcare_level": "basic", "religious_freedom": "restricted",
    },
    "sri-lanka": {
        "cost_tier": "low", "safety_level": "moderate", "visa_difficulty": "easy",
        "english_prevalence": "widespread", "local_language_difficulty": "hard",
        "climate_type": "tropical", "infrastructure_level": "moderate",
        "healthcare_level": "moderate", "religious_freedom": "free",
    },

    # ---- SE Asia ----
    "cambodia": {
        "cost_tier": "ultra_low", "safety_level": "moderate", "visa_difficulty": "easy",
        "english_prevalence": "limited", "local_language_difficulty": "hard",
        "climate_type": "tropical", "infrastructure_level": "basic",
        "healthcare_level": "basic", "religious_freedom": "free",
    },
    "indonesia": {
        "cost_tier": "low", "safety_level": "moderate", "visa_difficulty": "easy",
        "english_prevalence": "limited", "local_language_difficulty": "hard",
        "climate_type": "tropical", "infrastructure_level": "moderate",
        "healthcare_level": "moderate", "religious_freedom": "restricted",
    },
    "malaysia": {
        "cost_tier": "moderate", "safety_level": "safe", "visa_difficulty": "moderate",
        "english_prevalence": "widespread", "local_language_difficulty": "moderate",
        "climate_type": "tropical", "infrastructure_level": "excellent",
        "healthcare_level": "good", "religious_freedom": "restricted",
    },
    "myanmar": {
        "cost_tier": "ultra_low", "safety_level": "unsafe", "visa_difficulty": "very_hard",
        "english_prevalence": "limited", "local_language_difficulty": "very_hard",
        "climate_type": "tropical", "infrastructure_level": "basic",
        "healthcare_level": "minimal", "religious_freedom": "restricted",
    },
    "philippines": {
        "cost_tier": "low", "safety_level": "moderate", "visa_difficulty": "easy",
        "english_prevalence": "widespread", "local_language_difficulty": "easy",
        "climate_type": "tropical", "infrastructure_level": "moderate",
        "healthcare_level": "moderate", "religious_freedom": "free",
    },
    "thailand": {
        "cost_tier": "low", "safety_level": "safe", "visa_difficulty": "easy",
        "english_prevalence": "limited", "local_language_difficulty": "hard",
        "climate_type": "tropical", "infrastructure_level": "good",
        "healthcare_level": "good", "religious_freedom": "restricted",
    },
    "timor-leste": {
        "cost_tier": "ultra_low", "safety_level": "moderate", "visa_difficulty": "easy",
        "english_prevalence": "moderate", "local_language_difficulty": "hard",
        "climate_type": "tropical", "infrastructure_level": "basic",
        "healthcare_level": "basic", "religious_freedom": "free",
    },

    # ---- East Asia ----
    "hong-kong": {
        "cost_tier": "high", "safety_level": "very_safe", "visa_difficulty": "moderate",
        "english_prevalence": "widespread", "local_language_difficulty": "very_hard",
        "climate_type": "subtropical", "infrastructure_level": "excellent",
        "healthcare_level": "excellent", "religious_freedom": "mostly_free",
    },
    "japan": {
        "cost_tier": "high", "safety_level": "very_safe", "visa_difficulty": "moderate",
        "english_prevalence": "limited", "local_language_difficulty": "very_hard",
        "climate_type": "temperate", "infrastructure_level": "excellent",
        "healthcare_level": "excellent", "religious_freedom": "free",
    },
    "korea-republic-of": {
        "cost_tier": "high", "safety_level": "very_safe", "visa_difficulty": "moderate",
        "english_prevalence": "common", "local_language_difficulty": "very_hard",
        "climate_type": "temperate", "infrastructure_level": "excellent",
        "healthcare_level": "excellent", "religious_freedom": "free",
    },
    "macao": {
        "cost_tier": "high", "safety_level": "very_safe", "visa_difficulty": "moderate",
        "english_prevalence": "common", "local_language_difficulty": "very_hard",
        "climate_type": "subtropical", "infrastructure_level": "excellent",
        "healthcare_level": "excellent", "religious_freedom": "mostly_free",
    },
    "taiwan": {
        "cost_tier": "moderate", "safety_level": "very_safe", "visa_difficulty": "easy",
        "english_prevalence": "common", "local_language_difficulty": "very_hard",
        "climate_type": "subtropical", "infrastructure_level": "excellent",
        "healthcare_level": "excellent", "religious_freedom": "free",
    },

    # ---- Oceania (incl. US-affiliated islands) ----
    "australia": {
        "cost_tier": "high", "safety_level": "safe", "visa_difficulty": "hard",
        "english_prevalence": "widespread", "local_language_difficulty": "easy",
        "climate_type": "temperate", "infrastructure_level": "excellent",
        "healthcare_level": "excellent", "religious_freedom": "free",
    },
    "cook-islands": {
        "cost_tier": "moderate", "safety_level": "very_safe", "visa_difficulty": "easy",
        "english_prevalence": "widespread", "local_language_difficulty": "easy",
        "climate_type": "tropical", "infrastructure_level": "good",
        "healthcare_level": "moderate", "religious_freedom": "free",
    },
    "fiji": {
        "cost_tier": "low", "safety_level": "moderate", "visa_difficulty": "easy",
        "english_prevalence": "widespread", "local_language_difficulty": "moderate",
        "climate_type": "tropical", "infrastructure_level": "moderate",
        "healthcare_level": "moderate", "religious_freedom": "free",
    },
    "guam": {
        "cost_tier": "high", "safety_level": "safe", "visa_difficulty": "easy",
        "english_prevalence": "widespread", "local_language_difficulty": "moderate",
        "climate_type": "tropical", "infrastructure_level": "good",
        "healthcare_level": "good", "religious_freedom": "free",
    },
    "kiribati": {
        "cost_tier": "low", "safety_level": "safe", "visa_difficulty": "easy",
        "english_prevalence": "widespread", "local_language_difficulty": "moderate",
        "climate_type": "tropical", "infrastructure_level": "basic",
        "healthcare_level": "basic", "religious_freedom": "free",
    },
    "marshall-islands": {
        "cost_tier": "moderate", "safety_level": "safe", "visa_difficulty": "easy",
        "english_prevalence": "widespread", "local_language_difficulty": "moderate",
        "climate_type": "tropical", "infrastructure_level": "basic",
        "healthcare_level": "basic", "religious_freedom": "free",
    },
    "nauru": {
        "cost_tier": "moderate", "safety_level": "safe", "visa_difficulty": "easy",
        "english_prevalence": "widespread", "local_language_difficulty": "moderate",
        "climate_type": "tropical", "infrastructure_level": "basic",
        "healthcare_level": "basic", "religious_freedom": "free",
    },
    "new-caledonia": {
        "cost_tier": "high", "safety_level": "safe", "visa_difficulty": "moderate",
        "english_prevalence": "limited", "local_language_difficulty": "moderate",
        "climate_type": "subtropical", "infrastructure_level": "good",
        "healthcare_level": "good", "religious_freedom": "free",
    },
    "new-zealand": {
        "cost_tier": "high", "safety_level": "very_safe", "visa_difficulty": "hard",
        "english_prevalence": "widespread", "local_language_difficulty": "easy",
        "climate_type": "temperate", "infrastructure_level": "excellent",
        "healthcare_level": "excellent", "religious_freedom": "free",
    },
    "niue": {
        "cost_tier": "moderate", "safety_level": "very_safe", "visa_difficulty": "easy",
        "english_prevalence": "widespread", "local_language_difficulty": "easy",
        "climate_type": "tropical", "infrastructure_level": "moderate",
        "healthcare_level": "moderate", "religious_freedom": "free",
    },
    "palau": {
        "cost_tier": "moderate", "safety_level": "safe", "visa_difficulty": "easy",
        "english_prevalence": "widespread", "local_language_difficulty": "moderate",
        "climate_type": "tropical", "infrastructure_level": "moderate",
        "healthcare_level": "moderate", "religious_freedom": "free",
    },
    "papua-new-guinea": {
        "cost_tier": "moderate", "safety_level": "unsafe", "visa_difficulty": "easy",
        "english_prevalence": "widespread", "local_language_difficulty": "moderate",
        "climate_type": "tropical", "infrastructure_level": "basic",
        "healthcare_level": "basic", "religious_freedom": "free",
    },
    "samoa": {
        "cost_tier": "moderate", "safety_level": "safe", "visa_difficulty": "easy",
        "english_prevalence": "widespread", "local_language_difficulty": "moderate",
        "climate_type": "tropical", "infrastructure_level": "moderate",
        "healthcare_level": "moderate", "religious_freedom": "free",
    },
    "solomon-islands": {
        "cost_tier": "low", "safety_level": "moderate", "visa_difficulty": "easy",
        "english_prevalence": "widespread", "local_language_difficulty": "moderate",
        "climate_type": "tropical", "infrastructure_level": "basic",
        "healthcare_level": "basic", "religious_freedom": "free",
    },
    "tahiti": {
        "cost_tier": "ultra_high", "safety_level": "safe", "visa_difficulty": "moderate",
        "english_prevalence": "limited", "local_language_difficulty": "moderate",
        "climate_type": "tropical", "infrastructure_level": "good",
        "healthcare_level": "excellent", "religious_freedom": "free",
    },
    "tonga": {
        "cost_tier": "moderate", "safety_level": "safe", "visa_difficulty": "easy",
        "english_prevalence": "widespread", "local_language_difficulty": "moderate",
        "climate_type": "tropical", "infrastructure_level": "moderate",
        "healthcare_level": "moderate", "religious_freedom": "free",
    },
    "tuvalu": {
        "cost_tier": "moderate", "safety_level": "safe", "visa_difficulty": "easy",
        "english_prevalence": "widespread", "local_language_difficulty": "moderate",
        "climate_type": "tropical", "infrastructure_level": "basic",
        "healthcare_level": "basic", "religious_freedom": "free",
    },
    "vanuatu": {
        "cost_tier": "moderate", "safety_level": "moderate", "visa_difficulty": "easy",
        "english_prevalence": "widespread", "local_language_difficulty": "moderate",
        "climate_type": "tropical", "infrastructure_level": "basic",
        "healthcare_level": "basic", "religious_freedom": "free",
    },
    "wallis-futuna-islands": {
        "cost_tier": "high", "safety_level": "very_safe", "visa_difficulty": "moderate",
        "english_prevalence": "limited", "local_language_difficulty": "moderate",
        "climate_type": "tropical", "infrastructure_level": "moderate",
        "healthcare_level": "good", "religious_freedom": "free",
    },

    # ---- Federated States of Micronesia (US-affiliated) ----
    "chuuk": {
        "cost_tier": "moderate", "safety_level": "moderate", "visa_difficulty": "easy",
        "english_prevalence": "widespread", "local_language_difficulty": "moderate",
        "climate_type": "tropical", "infrastructure_level": "basic",
        "healthcare_level": "basic", "religious_freedom": "free",
    },
    "kosrae": {
        "cost_tier": "moderate", "safety_level": "safe", "visa_difficulty": "easy",
        "english_prevalence": "widespread", "local_language_difficulty": "moderate",
        "climate_type": "tropical", "infrastructure_level": "basic",
        "healthcare_level": "basic", "religious_freedom": "free",
    },
    "pohnpei": {
        "cost_tier": "moderate", "safety_level": "safe", "visa_difficulty": "easy",
        "english_prevalence": "widespread", "local_language_difficulty": "moderate",
        "climate_type": "tropical", "infrastructure_level": "moderate",
        "healthcare_level": "moderate", "religious_freedom": "free",
    },
    "yap": {
        "cost_tier": "moderate", "safety_level": "safe", "visa_difficulty": "easy",
        "english_prevalence": "widespread", "local_language_difficulty": "moderate",
        "climate_type": "tropical", "infrastructure_level": "basic",
        "healthcare_level": "basic", "religious_freedom": "free",
    },

    # ---- Northern Mariana Islands (US-affiliated) ----
    "rota": {
        "cost_tier": "high", "safety_level": "very_safe", "visa_difficulty": "easy",
        "english_prevalence": "widespread", "local_language_difficulty": "moderate",
        "climate_type": "tropical", "infrastructure_level": "moderate",
        "healthcare_level": "moderate", "religious_freedom": "free",
    },
    "saipan": {
        "cost_tier": "high", "safety_level": "safe", "visa_difficulty": "easy",
        "english_prevalence": "widespread", "local_language_difficulty": "moderate",
        "climate_type": "tropical", "infrastructure_level": "good",
        "healthcare_level": "moderate", "religious_freedom": "free",
    },
    "tinian": {
        "cost_tier": "high", "safety_level": "very_safe", "visa_difficulty": "easy",
        "english_prevalence": "widespread", "local_language_difficulty": "moderate",
        "climate_type": "tropical", "infrastructure_level": "basic",
        "healthcare_level": "basic", "religious_freedom": "free",
    },
}


# ---------------------------------------------------------------------------
# Seed parsing
# ---------------------------------------------------------------------------
def load_seed() -> dict[str, Any]:
    """Parse the SEED_DATASET object out of seed.ts and return it as JSON."""
    text = SEED_TS.read_text(encoding="utf-8")
    start = text.index("{", text.index("SEED_DATASET"))
    end = text.index("as const", start)
    chunk = text[start:end].rstrip().rstrip(";").rstrip()
    return json.loads(chunk)


# ---------------------------------------------------------------------------
# Validation
# ---------------------------------------------------------------------------
ALLOWED = {
    "cost_tier": COST_TIERS,
    "safety_level": SAFETY_LEVELS,
    "visa_difficulty": VISA_DIFFICULTIES,
    "english_prevalence": ENGLISH_LEVELS,
    "local_language_difficulty": LANG_DIFFICULTIES,
    "climate_type": CLIMATE_TYPES,
    "infrastructure_level": INFRA_LEVELS,
    "healthcare_level": HEALTH_LEVELS,
    "religious_freedom": RELIGIOUS_FREEDOM,
}


def validate(territories: list[dict[str, Any]]) -> None:
    """Ensure every territory has complete, schema-valid attributes."""
    ids_in_seed = {t["id"] for t in territories}
    ids_in_attrs = set(ATTRIBUTES.keys())

    missing_from_attrs = sorted(ids_in_seed - ids_in_attrs)
    extra_in_attrs = sorted(ids_in_attrs - ids_in_seed)
    if missing_from_attrs:
        raise SystemExit(
            f"ERROR: {len(missing_from_attrs)} territories missing from "
            f"ATTRIBUTES: {missing_from_attrs[:20]}"
        )
    if extra_in_attrs:
        raise SystemExit(
            f"ERROR: {len(extra_in_attrs)} ids in ATTRIBUTES not in seed: "
            f"{extra_in_attrs[:20]}"
        )

    for tid, attrs in ATTRIBUTES.items():
        missing_keys = [k for k in ATTR_KEYS if k not in attrs]
        if missing_keys:
            raise SystemExit(f"ERROR: '{tid}' missing keys: {missing_keys}")
        for key, value in attrs.items():
            allowed = ALLOWED.get(key)
            if allowed and value not in allowed:
                raise SystemExit(
                    f"ERROR: '{tid}' has invalid {key}='{value}'. "
                    f"Allowed: {sorted(allowed)}"
                )


# ---------------------------------------------------------------------------
# Merge + write
# ---------------------------------------------------------------------------
def main() -> None:
    seed = load_seed()
    territories: list[dict[str, Any]] = seed["territories"]

    validate(territories)

    merged: list[dict[str, Any]] = []
    for t in territories:
        merged_t = dict(t)  # copy original report data
        merged_t.update(ATTRIBUTES[t["id"]])
        merged.append(merged_t)

    OUT_JSON.parent.mkdir(parents=True, exist_ok=True)
    OUT_JSON.write_text(
        json.dumps(merged, indent=2, ensure_ascii=False) + "\n",
        encoding="utf-8",
    )

    print(f"Wrote {len(merged)} territories to {OUT_JSON}")
    print(f"  Example record keys: {sorted(merged[0].keys())}")


if __name__ == "__main__":
    main()
