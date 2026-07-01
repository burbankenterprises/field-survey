"""
Field Survey — Deterministic Scoring Engine
============================================

Converts categorical country attributes into 1-10 scores across 7 criteria.
Pure functions: same inputs always produce the same output. Versioned.

Criteria:
  1. Cost of Living
  2. Women's Safety
  3. Visa Ease
  4. Language Ease
  5. Climate
  6. Comfort & Infrastructure
  7. Field Receptivity

Each scoring function takes a territory dict and returns (score, rationale).
"""

from typing import Tuple

SCORING_VERSION = "2.0.0"


# ============================================================================
# LOOKUP TABLES — each maps a categorical value to a numeric score component.
# These are the rubrics. Changing them = version bump.
# ============================================================================

COST_MAP = {
    'ultra_low': 10,    # <$600/mo couple (Cambodia, Bangladesh, Nepal)
    'low': 8,           # $600–1000/mo (Indonesia, Sri Lanka, Tanzania)
    'moderate': 6,      # $1000–1800/mo (Malaysia, Thailand, Türkiye)
    'high': 3,          # $1800–3000/mo (Israel, Korea, Taiwan)
    'ultra_high': 1,    # >$3000/mo (Switzerland, Norway, Monaco)
}

SAFETY_MAP = {
    'very_safe': 10,    # Japan, Norway, Singapore, Taiwan
    'safe': 8,          # Thailand, Malaysia, Montenegro
    'moderate': 6,      # Cambodia, Indonesia, South Africa
    'unsafe': 3,        # Pakistan, Bangladesh, Guatemala
    'very_unsafe': 1,   # Sudan, Mali, Haiti, conflict zones
}

VISA_MAP = {
    'easy': 9,          # 90+ days visa-free, nomad visa, easy renewal (Thailand, Cambodia)
    'moderate': 7,      # eVisa, 30-90 days, some paperwork (Indonesia, Brazil)
    'hard': 4,          # Visa required, bureaucratic, short stays (India, Nigeria)
    'very_hard': 2,     # Extremely difficult, conflict disruption (Sudan, North Korea)
}

# Language score blends English prevalence + local language difficulty
ENGLISH_MAP = {
    'widespread': 10,   # Official language (India, Nigeria, Philippines)
    'common': 8,        # Widely spoken in cities (Malaysia, Netherlands, Scandinavia)
    'moderate': 6,      # Tourist/business English (Thailand, Türkiye, Argentina)
    'limited': 3,       # Little English (Cambodia, Brazil, rural areas)
    'rare': 1,          # Almost none (Japan rural, rural Africa, rural Asia)
}

LANGUAGE_DIFFICULTY_MAP = {
    'easy': 9,          # Indonesian, Malay, Spanish, Portuguese — Latin script, simple grammar
    'moderate': 6,      # French, Swahili, Tagalog — moderate learning curve
    'hard': 3,          # Thai, Arabic, Hebrew — new script or complex grammar
    'very_hard': 2,     # Khmer, Burmese, Japanese, Korean — tonal/complex script
}

CLIMATE_MAP = {
    'tropical': 9,      # Warm year-round, no winter (SE Asia, Caribbean, Pacific)
    'subtropical': 8,   # Warm with mild seasonal variation (Florida, Taiwan south)
    'mediterranean': 9, # Mild winters, warm summers (Türkiye coast, Spain, Italy)
    'temperate': 4,     # Four seasons, cold winter possible (USA, Korea, Japan)
    'continental': 2,   # Cold winters, snow (Eastern Europe, Central Asia)
    'cold': 1,          # Very cold, long winters (Iceland, Mongolia, Finland)
    'arid': 5,          # Desert/hot (Sahel, Middle East — no cold but extreme heat)
    'polar': 1,         # Greenland, Antarctica
}

# Comfort = average of infrastructure + healthcare
INFRA_MAP = {
    'excellent': 10,    # First-world (Singapore, Japan, Germany, USA)
    'good': 8,          # Solid infrastructure (Malaysia, Thailand, Türkiye, Brazil)
    'moderate': 5,      # Developing (Indonesia, South Africa, Philippines)
    'basic': 3,         # Limited (Cambodia, Tanzania, Nepal)
    'minimal': 1,       # Barely functional (Sudan, Mali, South Sudan)
}

HEALTHCARE_MAP = {
    'excellent': 10,
    'good': 8,
    'moderate': 5,
    'basic': 3,
    'minimal': 1,
}

# Receptivity is a blend of religious freedom + growth rate from the report
RELIGIOUS_FREEDOM_MAP = {
    'free': 10,         # Full religious freedom, no legal barriers
    'mostly_free': 7,   # Generally free, some social restrictions
    'restricted': 3,    # Legal limits on proselytizing (Malaysia, Russia)
    'banned': 1,        # Activity banned or severely persecuted
}


# ============================================================================
# SCORING FUNCTIONS — each returns (score: int 1-10, rationale: str)
# ============================================================================

def score_cost(t: dict) -> Tuple[int, str]:
    tier = t.get('cost_tier', 'moderate')
    score = COST_MAP.get(tier, 5)
    ranges = {
        'ultra_low': '<$600/mo', 'low': '$600–1,000/mo', 'moderate': '$1,000–1,800/mo',
        'high': '$1,800–3,000/mo', 'ultra_high': '>$3,000/mo'
    }
    return score, f"Cost tier: {tier.replace('_', ' ')} ({ranges.get(tier, '?')} for a couple)"


def score_safety(t: dict) -> Tuple[int, str]:
    level = t.get('safety_level', 'moderate')
    score = SAFETY_MAP.get(level, 5)
    descs = {
        'very_safe': 'Very safe for women, low crime',
        'safe': 'Generally safe, standard caution',
        'moderate': 'Moderate safety, some areas to avoid',
        'unsafe': 'Notable crime, women should be cautious',
        'very_unsafe': 'Dangerous, not recommended for women alone',
    }
    return score, descs.get(level, 'Unknown')


def score_visa(t: dict) -> Tuple[int, str]:
    diff = t.get('visa_difficulty', 'moderate')
    score = VISA_MAP.get(diff, 5)
    descs = {
        'easy': 'Easy long-stay options, visa-free or nomad visa',
        'moderate': 'eVisa or moderate paperwork for stays',
        'hard': 'Visa required, bureaucratic process',
        'very_hard': 'Very difficult, severely restricted entry',
    }
    return score, descs.get(diff, 'Unknown')


def score_language(t: dict) -> Tuple[int, str]:
    eng = t.get('english_prevalence', 'limited')
    diff = t.get('local_language_difficulty', 'moderate')

    eng_score = ENGLISH_MAP.get(eng, 3)
    diff_score = LANGUAGE_DIFFICULTY_MAP.get(diff, 5)

    # Blend: 60% English prevalence (immediate usability) + 40% local difficulty (learning curve)
    blended = round((eng_score * 0.6 + diff_score * 0.4))
    blended = max(1, min(10, blended))

    eng_desc = eng.replace('_', ' ')
    diff_desc = diff.replace('_', ' ')
    return blended, f"English: {eng_desc}, local language: {diff_desc}"


def score_climate(t: dict) -> Tuple[int, str]:
    climate = t.get('climate_type', 'temperate')
    score = CLIMATE_MAP.get(climate, 4)
    descs = {
        'tropical': 'Warm year-round, tropical',
        'subtropical': 'Subtropical, mild variation',
        'mediterranean': 'Mediterranean, mild winters',
        'temperate': 'Temperate, four seasons',
        'continental': 'Continental, cold winters',
        'cold': 'Cold climate, long winters',
        'arid': 'Arid/desert, extreme heat',
        'polar': 'Polar/extreme cold',
    }
    return score, descs.get(climate, 'Unknown')


def score_comfort(t: dict) -> Tuple[int, str]:
    infra = t.get('infrastructure_level', 'basic')
    health = t.get('healthcare_level', 'basic')

    infra_score = INFRA_MAP.get(infra, 3)
    health_score = HEALTHCARE_MAP.get(health, 3)

    # Average rounded
    avg = round((infra_score + health_score) / 2)
    avg = max(1, min(10, avg))

    infra_desc = infra.replace('_', ' ')
    health_desc = health.replace('_', ' ')
    return avg, f"Infrastructure: {infra_desc}, healthcare: {health_desc}"


def score_receptivity(t: dict) -> Tuple[int, str]:
    freedom = t.get('religious_freedom', 'free')
    growth = t.get('growthRate', 0)

    freedom_score = RELIGIOUS_FREEDOM_MAP.get(freedom, 5)

    # Growth rate modifier: high growth boosts score, decline reduces it
    # Growth of +10% → +2 bonus, growth of -10% → -2 penalty
    growth_mod = max(-3, min(3, growth / 5))

    # Conflict zones get capped — can't work a field you can't safely enter
    status = t.get('status', 'open')
    cap = 10
    if status == 'conflict':
        cap = 2
        rationale_suffix = ' (capped: active conflict)'
    elif status == 'restricted':
        cap = 5
        rationale_suffix = ' (capped: restricted field)'
    else:
        rationale_suffix = ''

    raw = freedom_score + growth_mod
    score = max(1, min(cap, round(raw)))

    growth_desc = f"+{growth}%" if growth > 0 else f"{growth}%"
    freedom_desc = freedom.replace('_', ' ')
    return score, f"Religious freedom: {freedom_desc}, growth: {growth_desc}{rationale_suffix}"


# ============================================================================
# MASTER SCORING FUNCTION
# ============================================================================

CRITERIA_FUNCTIONS = {
    'cost': score_cost,
    'safety': score_safety,
    'visa': score_visa,
    'language': score_language,
    'climate': score_climate,
    'comfort': score_comfort,
    'receptivity': score_receptivity,
}

SOURCE_MAP = {
    'cost': 'Numbeo / Expatistan (couple monthly estimate)',
    'safety': 'US State Dept Travel Advisory + local crime reports',
    'visa': 'Official immigration portals + visa research',
    'language': 'EF English Proficiency Index + FSI difficulty categories',
    'climate': 'Köppen climate classification',
    'comfort': 'WHO health indicators + Ookla internet + infrastructure indices',
    'receptivity': 'JW Service Year Report 2025 + religious freedom reports',
}

AS_OF = '2026-06-01'


def score_territory(t: dict) -> dict:
    """Score a single territory across all 7 criteria.

    Args:
        t: territory dict with categorical attributes

    Returns:
        The territory dict with 'scores' and 'tier'='full' added.
    """
    scores = {}
    for key, fn in CRITERIA_FUNCTIONS.items():
        score_val, rationale = fn(t)
        scores[key] = {
            'score': score_val,
            'rationale': rationale,
            'details': {},
            'source': SOURCE_MAP[key],
            'asOf': AS_OF,
        }

    result = dict(t)
    result['scores'] = scores
    result['tier'] = 'full'
    return result


def score_all_territories(territories: list) -> list:
    """Score all territories. Returns list of scored territory dicts."""
    return [score_territory(t) for t in territories]


if __name__ == '__main__':
    import json
    import sys

    if len(sys.argv) < 2:
        print("Usage: python scoring.py <territories.json>")
        print("  Reads territories with attributes, writes scored territories to stdout")
        sys.exit(1)

    with open(sys.argv[1]) as f:
        territories = json.load(f)

    scored = score_all_territories(territories)

    dataset = {
        'version': 3,
        'generatedAt': '2026-06-30',
        'scoringVersion': SCORING_VERSION,
        'territories': scored,
    }

    print(json.dumps(dataset, indent=2, ensure_ascii=False))
