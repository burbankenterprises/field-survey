// ============================================================================
// Field Survey — Seed Dataset v2
// 206 territories from the 2025 Service Year Report.
// 32 fully scored across 7 criteria (Tier 2).
// 174 report-data only (Tier 1).
// Data sourced from the Service Year Report PDF and research conversations.
// ============================================================================

import type { Dataset } from './types';

export const SEED_DATASET: Dataset = {
  "version": 2,
  "generatedAt": "2026-06-30",
  "scoringVersion": "1.0.0",
  "territories": [
    {
      "id": "albania",
      "name": "Albania",
      "iso": "",
      "localeBase": "",
      "region": "Europe",
      "population": 2363000,
      "publishers": 5349,
      "ratio": 444,
      "growthRate": -1,
      "status": "open",
      "coldWinter": false,
      "tier": "report"
    },
    {
      "id": "american-samoa",
      "name": "American Samoa",
      "iso": "",
      "localeBase": "",
      "region": "Oceania",
      "population": 46000,
      "publishers": 160,
      "ratio": 315,
      "growthRate": 7,
      "status": "open",
      "coldWinter": false,
      "tier": "report"
    },
    {
      "id": "andorra",
      "name": "Andorra",
      "iso": "",
      "localeBase": "",
      "region": "Europe",
      "population": 88000,
      "publishers": 177,
      "ratio": 524,
      "growthRate": 0,
      "status": "open",
      "coldWinter": false,
      "tier": "report"
    },
    {
      "id": "angola",
      "name": "Angola",
      "iso": "",
      "localeBase": "",
      "region": "East Africa",
      "population": 39040000,
      "publishers": 189454,
      "ratio": 211,
      "growthRate": 6,
      "status": "open",
      "coldWinter": false,
      "tier": "report"
    },
    {
      "id": "anguilla",
      "name": "Anguilla",
      "iso": "",
      "localeBase": "",
      "region": "Americas",
      "population": 16000,
      "publishers": 73,
      "ratio": 239,
      "growthRate": 0,
      "status": "open",
      "coldWinter": false,
      "tier": "report"
    },
    {
      "id": "antigua",
      "name": "Antigua",
      "iso": "",
      "localeBase": "",
      "region": "Americas",
      "population": 104000,
      "publishers": 452,
      "ratio": 237,
      "growthRate": -2,
      "status": "open",
      "coldWinter": false,
      "tier": "report"
    },
    {
      "id": "argentina",
      "name": "Argentina",
      "iso": "",
      "localeBase": "",
      "region": "Americas",
      "population": 46235000,
      "publishers": 157140,
      "ratio": 296,
      "growthRate": 1,
      "status": "open",
      "coldWinter": false,
      "tier": "report"
    },
    {
      "id": "armenia",
      "name": "Armenia",
      "iso": "",
      "localeBase": "",
      "region": "Europe",
      "population": 3076000,
      "publishers": 11779,
      "ratio": 267,
      "growthRate": 1,
      "status": "open",
      "coldWinter": true,
      "tier": "report"
    },
    {
      "id": "aruba",
      "name": "Aruba",
      "iso": "",
      "localeBase": "",
      "region": "Americas",
      "population": 108000,
      "publishers": 1106,
      "ratio": 99,
      "growthRate": 1,
      "status": "open",
      "coldWinter": false,
      "tier": "report"
    },
    {
      "id": "australia",
      "name": "Australia",
      "iso": "",
      "localeBase": "",
      "region": "Oceania",
      "population": 27640000,
      "publishers": 72095,
      "ratio": 387,
      "growthRate": 0,
      "status": "open",
      "coldWinter": false,
      "tier": "report"
    },
    {
      "id": "austria",
      "name": "Austria",
      "iso": "",
      "localeBase": "",
      "region": "Europe",
      "population": 9197000,
      "publishers": 22487,
      "ratio": 410,
      "growthRate": 0,
      "status": "open",
      "coldWinter": false,
      "tier": "report"
    },
    {
      "id": "azerbaijan",
      "name": "Azerbaijan",
      "iso": "AZ",
      "localeBase": "Baku",
      "region": "Central Asia",
      "population": 10225000,
      "ratio": 5725,
      "growthRate": -3,
      "status": "restricted",
      "coldWinter": true,
      "tier": "full",
      "scores": {
        "cost": {
          "score": 7,
          "rationale": "Moderate. $900–1,300/mo. Oil economy keeps prices up.",
          "details": {
            "couple_monthly_low": 900,
            "couple_monthly_high": 1300
          },
          "source": "Numbeo / Expatistan (couple monthly estimate)",
          "asOf": "2026-06-01"
        },
        "safety": {
          "score": 7,
          "rationale": "Generally safe. Authoritarian government keeps order.",
          "details": {
            "advisory_level": 1,
            "womens_safety": "moderate"
          },
          "source": "US State Dept Travel Advisory + local crime reports",
          "asOf": "2026-06-01"
        },
        "visa": {
          "score": 4,
          "rationale": "eVisa available but long-stay bureaucracy is painful.",
          "details": {
            "visa_type": "eVisa",
            "max_stay_days": 30
          },
          "source": "Official immigration portals + visa research",
          "asOf": "2026-06-01"
        },
        "language": {
          "score": 4,
          "rationale": "Azerbaijani (Turkic). Moderate difficulty.",
          "details": {
            "difficulty": "moderate",
            "english_prevalence": "low"
          },
          "source": "EF English Proficiency Index + FSI difficulty categories",
          "asOf": "2026-06-01"
        },
        "climate": {
          "score": 4,
          "rationale": "Baku has cold winters (~2°C). Continental.",
          "details": {
            "koppen": "BSh/Cfa",
            "winter_low_c": 2
          },
          "source": "Köppen climate classification",
          "asOf": "2026-06-01"
        },
        "comfort": {
          "score": 6,
          "rationale": "Oil wealth means decent Baku infrastructure.",
          "details": {
            "healthcare": "moderate",
            "internet_mbps": 35,
            "roads": "good"
          },
          "source": "WHO health indicators + Ookla internet + infrastructure indices",
          "asOf": "2026-06-01"
        },
        "receptivity": {
          "score": 3,
          "rationale": "Muslim-majority, authoritarian. Restricted field. +1% growth.",
          "details": {
            "growth_pct": 1,
            "legal_status": "restricted"
          },
          "source": "JW Service Year Report 2025 + religious freedom reports",
          "asOf": "2026-06-01"
        }
      },
      "publishers": 1824
    },
    {
      "id": "azores",
      "name": "Azores",
      "iso": "",
      "localeBase": "",
      "region": "Europe",
      "population": 242000,
      "publishers": 828,
      "ratio": 296,
      "growthRate": 2,
      "status": "open",
      "coldWinter": false,
      "tier": "report"
    },
    {
      "id": "bahamas",
      "name": "Bahamas",
      "iso": "",
      "localeBase": "",
      "region": "Americas",
      "population": 403000,
      "publishers": 1696,
      "ratio": 245,
      "growthRate": 0,
      "status": "open",
      "coldWinter": false,
      "tier": "report"
    },
    {
      "id": "bangladesh",
      "name": "Bangladesh",
      "iso": "BD",
      "localeBase": "Dhaka",
      "region": "South Asia",
      "population": 175687000,
      "ratio": 416320,
      "growthRate": 14,
      "status": "open",
      "coldWinter": false,
      "tier": "full",
      "scores": {
        "cost": {
          "score": 10,
          "rationale": "Extremely cheap.",
          "details": {},
          "source": "Numbeo / Expatistan (couple monthly estimate)",
          "asOf": "2026-06-01"
        },
        "safety": {
          "score": 5,
          "rationale": "Moderate crime. Women should be cautious. Street harassment.",
          "details": {
            "advisory_level": 2,
            "womens_safety": "low-moderate"
          },
          "source": "US State Dept Travel Advisory + local crime reports",
          "asOf": "2026-06-01"
        },
        "visa": {
          "score": 5,
          "rationale": "Visa on arrival for some. Long-stay bureaucratic.",
          "details": {},
          "source": "Official immigration portals + visa research",
          "asOf": "2026-06-01"
        },
        "language": {
          "score": 7,
          "rationale": "Bengali. English official, widely spoken.",
          "details": {
            "english_prevalence": "moderate-high"
          },
          "source": "EF English Proficiency Index + FSI difficulty categories",
          "asOf": "2026-06-01"
        },
        "climate": {
          "score": 5,
          "rationale": "Tropical but extreme humidity and flooding.",
          "details": {
            "koppen": "Am",
            "winter_low_c": 15
          },
          "source": "Köppen climate classification",
          "asOf": "2026-06-01"
        },
        "comfort": {
          "score": 2,
          "rationale": "Dhaka is one of the most densely populated cities on Earth.",
          "details": {
            "healthcare": "basic",
            "internet_mbps": 15
          },
          "source": "WHO health indicators + Ookla internet + infrastructure indices",
          "asOf": "2026-06-01"
        },
        "receptivity": {
          "score": 8,
          "rationale": "Muslim-majority but open field. +5% growth.",
          "details": {
            "growth_pct": 5,
            "legal_status": "free"
          },
          "source": "JW Service Year Report 2025 + religious freedom reports",
          "asOf": "2026-06-01"
        }
      },
      "publishers": 449
    },
    {
      "id": "barbados",
      "name": "Barbados",
      "iso": "",
      "localeBase": "",
      "region": "Americas",
      "population": 283000,
      "publishers": 2372,
      "ratio": 122,
      "growthRate": 0,
      "status": "open",
      "coldWinter": false,
      "tier": "report"
    },
    {
      "id": "belgium",
      "name": "Belgium",
      "iso": "",
      "localeBase": "",
      "region": "Europe",
      "population": 11826000,
      "publishers": 26746,
      "ratio": 446,
      "growthRate": 1,
      "status": "open",
      "coldWinter": false,
      "tier": "report"
    },
    {
      "id": "belize",
      "name": "Belize",
      "iso": "",
      "localeBase": "",
      "region": "Americas",
      "population": 418000,
      "publishers": 2532,
      "ratio": 168,
      "growthRate": 1,
      "status": "open",
      "coldWinter": false,
      "tier": "report"
    },
    {
      "id": "benin",
      "name": "Benin",
      "iso": "",
      "localeBase": "",
      "region": "West Africa",
      "population": 14192000,
      "publishers": 16233,
      "ratio": 898,
      "growthRate": 6,
      "status": "open",
      "coldWinter": false,
      "tier": "report"
    },
    {
      "id": "bermuda",
      "name": "Bermuda",
      "iso": "",
      "localeBase": "",
      "region": "Americas",
      "population": 65000,
      "publishers": 417,
      "ratio": 163,
      "growthRate": 2,
      "status": "open",
      "coldWinter": false,
      "tier": "report"
    },
    {
      "id": "bolivia",
      "name": "Bolivia",
      "iso": "",
      "localeBase": "",
      "region": "Americas",
      "population": 12582000,
      "publishers": 30730,
      "ratio": 413,
      "growthRate": 3,
      "status": "open",
      "coldWinter": false,
      "tier": "report"
    },
    {
      "id": "bonaire",
      "name": "Bonaire",
      "iso": "",
      "localeBase": "",
      "region": "Americas",
      "population": 27000,
      "publishers": 158,
      "ratio": 176,
      "growthRate": 0,
      "status": "open",
      "coldWinter": false,
      "tier": "report"
    },
    {
      "id": "bosnia-and-herzegovina",
      "name": "Bosnia and Herzegovina",
      "iso": "",
      "localeBase": "",
      "region": "Europe",
      "population": 3140000,
      "publishers": 951,
      "ratio": 3420,
      "growthRate": -2,
      "status": "open",
      "coldWinter": true,
      "tier": "report"
    },
    {
      "id": "botswana",
      "name": "Botswana",
      "iso": "",
      "localeBase": "",
      "region": "East Africa",
      "population": 2360000,
      "publishers": 2543,
      "ratio": 961,
      "growthRate": 4,
      "status": "open",
      "coldWinter": false,
      "tier": "report"
    },
    {
      "id": "brazil",
      "name": "Brazil",
      "iso": "",
      "localeBase": "",
      "region": "Americas",
      "population": 213421000,
      "publishers": 938337,
      "ratio": 229,
      "growthRate": 2,
      "status": "open",
      "coldWinter": false,
      "tier": "report"
    },
    {
      "id": "britain",
      "name": "Britain",
      "iso": "",
      "localeBase": "",
      "region": "Europe",
      "population": 67698000,
      "publishers": 144116,
      "ratio": 472,
      "growthRate": 0,
      "status": "open",
      "coldWinter": false,
      "tier": "report"
    },
    {
      "id": "bulgaria",
      "name": "Bulgaria",
      "iso": "",
      "localeBase": "",
      "region": "Europe",
      "population": 6437000,
      "publishers": 3040,
      "ratio": 2152,
      "growthRate": 3,
      "status": "open",
      "coldWinter": true,
      "tier": "report"
    },
    {
      "id": "burkina-faso",
      "name": "Burkina Faso",
      "iso": "BF",
      "localeBase": "Ouagadougou",
      "region": "West Africa",
      "population": 24075000,
      "ratio": 12080,
      "growthRate": 4,
      "status": "conflict",
      "coldWinter": false,
      "tier": "full",
      "scores": {
        "cost": {
          "score": 9,
          "rationale": "Very cheap.",
          "details": {},
          "source": "Numbeo / Expatistan (couple monthly estimate)",
          "asOf": "2026-06-01"
        },
        "safety": {
          "score": 1,
          "rationale": "Active jihadist insurgency. Do Not Travel.",
          "details": {
            "advisory_level": 4,
            "conflict": true
          },
          "source": "US State Dept Travel Advisory + local crime reports",
          "asOf": "2026-06-01"
        },
        "visa": {
          "score": 5,
          "rationale": "Visa required. Situation unstable.",
          "details": {},
          "source": "Official immigration portals + visa research",
          "asOf": "2026-06-01"
        },
        "language": {
          "score": 7,
          "rationale": "French official. Moore widely spoken.",
          "details": {
            "official_languages": [
              "French"
            ]
          },
          "source": "EF English Proficiency Index + FSI difficulty categories",
          "asOf": "2026-06-01"
        },
        "climate": {
          "score": 7,
          "rationale": "Sahel. Hot. Distinct dry/wet seasons.",
          "details": {
            "koppen": "Aw/BSh",
            "winter_low_c": 16
          },
          "source": "Köppen climate classification",
          "asOf": "2026-06-01"
        },
        "comfort": {
          "score": 2,
          "rationale": "Minimal infrastructure. Conflict-affected.",
          "details": {
            "healthcare": "minimal",
            "internet_mbps": 8
          },
          "source": "WHO health indicators + Ookla internet + infrastructure indices",
          "asOf": "2026-06-01"
        },
        "receptivity": {
          "score": 9,
          "rationale": "Open field. +5% growth. Very receptive.",
          "details": {
            "growth_pct": 5,
            "legal_status": "free"
          },
          "source": "JW Service Year Report 2025 + religious freedom reports",
          "asOf": "2026-06-01"
        }
      },
      "publishers": 2120
    },
    {
      "id": "burundi",
      "name": "Burundi",
      "iso": "",
      "localeBase": "",
      "region": "East Africa",
      "population": 13605000,
      "publishers": 21849,
      "ratio": 658,
      "growthRate": 10,
      "status": "open",
      "coldWinter": false,
      "tier": "report"
    },
    {
      "id": "cambodia",
      "name": "Cambodia",
      "iso": "KH",
      "localeBase": "Siem Reap",
      "region": "SE Asia",
      "population": 17578000,
      "ratio": 13874,
      "growthRate": 9,
      "status": "open",
      "coldWinter": false,
      "tier": "full",
      "scores": {
        "cost": {
          "score": 10,
          "rationale": "Cheapest long-stay in SE Asia. Comfortable living at $400–1,200/mo for a couple.",
          "details": {
            "couple_monthly_low": 400,
            "couple_monthly_high": 1200,
            "currency": "USD"
          },
          "source": "Numbeo / Expatistan (couple monthly estimate)",
          "asOf": "2026-06-01"
        },
        "safety": {
          "score": 6,
          "rationale": "Mid-tier safety. Phnom Penh has motorbike bag-snatching; Siem Reap is calmer.",
          "details": {
            "advisory_level": 1,
            "bag_snatching_risk": "moderate",
            "violent_crime": "low"
          },
          "source": "US State Dept Travel Advisory + local crime reports",
          "asOf": "2026-06-01"
        },
        "visa": {
          "score": 9,
          "rationale": "EB business visa renews indefinitely for ~$285/year. No income or age minimum.",
          "details": {
            "visa_type": "EB Business Visa",
            "renewal_cost_usd": 285,
            "max_stay_days": 365,
            "renewable": true
          },
          "source": "Official immigration portals + visa research",
          "asOf": "2026-06-01"
        },
        "language": {
          "score": 3,
          "rationale": "Khmer is difficult — unique script, no cognates with European languages.",
          "details": {
            "difficulty": "hard",
            "english_prevalence": "low",
            "script": "Khmer"
          },
          "source": "EF English Proficiency Index + FSI difficulty categories",
          "asOf": "2026-06-01"
        },
        "climate": {
          "score": 8,
          "rationale": "Tropical. Warm year-round, no winter. Wet/dry seasons only.",
          "details": {
            "koppen": "Aw (tropical savanna)",
            "winter_low_c": 20
          },
          "source": "Köppen climate classification",
          "asOf": "2026-06-01"
        },
        "comfort": {
          "score": 5,
          "rationale": "Comforts are real only in pockets of Phnom Penh and Siem Reap. Basic infrastructure elsewhere.",
          "details": {
            "healthcare": "basic",
            "internet_mbps": 30,
            "roads": "poor"
          },
          "source": "WHO health indicators + Ookla internet + infrastructure indices",
          "asOf": "2026-06-01"
        },
        "receptivity": {
          "score": 10,
          "rationale": "Fully open field. +9% growth — one of the highest on the list. Warm, welcoming culture.",
          "details": {
            "growth_pct": 9,
            "legal_status": "free",
            "religious_freedom": true
          },
          "source": "JW Service Year Report 2025 + religious freedom reports",
          "asOf": "2026-06-01"
        }
      },
      "publishers": 1300
    },
    {
      "id": "cameroon",
      "name": "Cameroon",
      "iso": "",
      "localeBase": "",
      "region": "West Africa",
      "population": 29879000,
      "publishers": 46572,
      "ratio": 651,
      "growthRate": 4,
      "status": "open",
      "coldWinter": false,
      "tier": "report"
    },
    {
      "id": "canada",
      "name": "Canada",
      "iso": "",
      "localeBase": "",
      "region": "Americas",
      "population": 41549000,
      "publishers": 125116,
      "ratio": 334,
      "growthRate": 2,
      "status": "open",
      "coldWinter": true,
      "tier": "report"
    },
    {
      "id": "cape-verde",
      "name": "Cape Verde",
      "iso": "",
      "localeBase": "",
      "region": "West Africa",
      "population": 514000,
      "publishers": 2277,
      "ratio": 228,
      "growthRate": 1,
      "status": "open",
      "coldWinter": false,
      "tier": "report"
    },
    {
      "id": "cayman-islands",
      "name": "Cayman Islands",
      "iso": "",
      "localeBase": "",
      "region": "Americas",
      "population": 91000,
      "publishers": 313,
      "ratio": 302,
      "growthRate": 0,
      "status": "open",
      "coldWinter": false,
      "tier": "report"
    },
    {
      "id": "central-african-republic",
      "name": "Central African Republic",
      "iso": "",
      "localeBase": "",
      "region": "Central Africa",
      "population": 5513000,
      "publishers": 3705,
      "ratio": 1563,
      "growthRate": 11,
      "status": "conflict",
      "coldWinter": false,
      "tier": "report"
    },
    {
      "id": "chad",
      "name": "Chad",
      "iso": "TD",
      "localeBase": "N'Djamena",
      "region": "North Africa",
      "population": 19341000,
      "ratio": 18705,
      "growthRate": 11,
      "status": "conflict",
      "coldWinter": false,
      "tier": "full",
      "scores": {
        "cost": {
          "score": 8,
          "rationale": "Cheap but NGO-inflated.",
          "details": {},
          "source": "Numbeo / Expatistan (couple monthly estimate)",
          "asOf": "2026-06-01"
        },
        "safety": {
          "score": 1,
          "rationale": "Active insurgency. Do Not Travel.",
          "details": {
            "advisory_level": 4,
            "conflict": true
          },
          "source": "US State Dept Travel Advisory + local crime reports",
          "asOf": "2026-06-01"
        },
        "visa": {
          "score": 3,
          "rationale": "Visa available but country unstable.",
          "details": {},
          "source": "Official immigration portals + visa research",
          "asOf": "2026-06-01"
        },
        "language": {
          "score": 7,
          "rationale": "French + Arabic official.",
          "details": {
            "official_languages": [
              "French",
              "Arabic"
            ]
          },
          "source": "EF English Proficiency Index + FSI difficulty categories",
          "asOf": "2026-06-01"
        },
        "climate": {
          "score": 5,
          "rationale": "Hot Sahel/desert. Extreme heat.",
          "details": {
            "koppen": "BSh/BWh",
            "winter_low_c": 15
          },
          "source": "Köppen climate classification",
          "asOf": "2026-06-01"
        },
        "comfort": {
          "score": 1,
          "rationale": "Minimal infrastructure.",
          "details": {
            "healthcare": "minimal",
            "internet_mbps": 3
          },
          "source": "WHO health indicators + Ookla internet + infrastructure indices",
          "asOf": "2026-06-01"
        },
        "receptivity": {
          "score": 10,
          "rationale": "+11% growth — one of the hungriest fields. But inaccessible.",
          "details": {
            "growth_pct": 11,
            "legal_status": "free"
          },
          "source": "JW Service Year Report 2025 + religious freedom reports",
          "asOf": "2026-06-01"
        }
      },
      "publishers": 1082
    },
    {
      "id": "chile",
      "name": "Chile",
      "iso": "",
      "localeBase": "",
      "region": "Americas",
      "population": 20207000,
      "publishers": 88664,
      "ratio": 229,
      "growthRate": 1,
      "status": "open",
      "coldWinter": false,
      "tier": "report"
    },
    {
      "id": "chuuk",
      "name": "Chuuk",
      "iso": "",
      "localeBase": "",
      "region": "Oceania",
      "population": 50000,
      "publishers": 32,
      "ratio": 1786,
      "growthRate": 0,
      "status": "open",
      "coldWinter": false,
      "tier": "report"
    },
    {
      "id": "colombia",
      "name": "Colombia",
      "iso": "",
      "localeBase": "",
      "region": "Americas",
      "population": 52696000,
      "publishers": 193778,
      "ratio": 274,
      "growthRate": 2,
      "status": "open",
      "coldWinter": false,
      "tier": "report"
    },
    {
      "id": "congo-dem-republic-of",
      "name": "Congo, Dem. Republic of",
      "iso": "",
      "localeBase": "",
      "region": "Central Africa",
      "population": 115685000,
      "publishers": 306303,
      "ratio": 389,
      "growthRate": 11,
      "status": "conflict",
      "coldWinter": false,
      "tier": "report"
    },
    {
      "id": "congo-republic-of",
      "name": "Congo, Republic of",
      "iso": "",
      "localeBase": "",
      "region": "Central Africa",
      "population": 6565000,
      "publishers": 10811,
      "ratio": 635,
      "growthRate": 8,
      "status": "open",
      "coldWinter": false,
      "tier": "report"
    },
    {
      "id": "cook-islands",
      "name": "Cook Islands",
      "iso": "",
      "localeBase": "",
      "region": "Oceania",
      "population": 17000,
      "publishers": 209,
      "ratio": 89,
      "growthRate": -2,
      "status": "open",
      "coldWinter": false,
      "tier": "report"
    },
    {
      "id": "costa-rica",
      "name": "Costa Rica",
      "iso": "",
      "localeBase": "",
      "region": "Americas",
      "population": 5153000,
      "publishers": 32604,
      "ratio": 159,
      "growthRate": 1,
      "status": "open",
      "coldWinter": false,
      "tier": "report"
    },
    {
      "id": "côte-divoire",
      "name": "Côte d’Ivoire",
      "iso": "",
      "localeBase": "",
      "region": "West Africa",
      "population": 32712000,
      "publishers": 14068,
      "ratio": 2415,
      "growthRate": 6,
      "status": "open",
      "coldWinter": false,
      "tier": "report"
    },
    {
      "id": "croatia",
      "name": "Croatia",
      "iso": "",
      "localeBase": "",
      "region": "Europe",
      "population": 3874000,
      "publishers": 4595,
      "ratio": 850,
      "growthRate": -1,
      "status": "open",
      "coldWinter": false,
      "tier": "report"
    },
    {
      "id": "cuba",
      "name": "Cuba",
      "iso": "",
      "localeBase": "",
      "region": "Americas",
      "population": 9748000,
      "publishers": 83406,
      "ratio": 118,
      "growthRate": -1,
      "status": "open",
      "coldWinter": false,
      "tier": "report"
    },
    {
      "id": "curaçao",
      "name": "Curaçao",
      "iso": "",
      "localeBase": "",
      "region": "Americas",
      "population": 156000,
      "publishers": 1930,
      "ratio": 81,
      "growthRate": 1,
      "status": "open",
      "coldWinter": false,
      "tier": "report"
    },
    {
      "id": "cyprus",
      "name": "Cyprus",
      "iso": "",
      "localeBase": "",
      "region": "Europe",
      "population": 1371000,
      "publishers": 3156,
      "ratio": 438,
      "growthRate": 0,
      "status": "open",
      "coldWinter": false,
      "tier": "report"
    },
    {
      "id": "czech-republic",
      "name": "Czech Republic",
      "iso": "",
      "localeBase": "",
      "region": "Europe",
      "population": 10877000,
      "publishers": 17496,
      "ratio": 626,
      "growthRate": 2,
      "status": "open",
      "coldWinter": true,
      "tier": "report"
    },
    {
      "id": "denmark",
      "name": "Denmark",
      "iso": "",
      "localeBase": "",
      "region": "Europe",
      "population": 6001000,
      "publishers": 14759,
      "ratio": 409,
      "growthRate": 1,
      "status": "open",
      "coldWinter": true,
      "tier": "report"
    },
    {
      "id": "dominica",
      "name": "Dominica",
      "iso": "",
      "localeBase": "",
      "region": "Americas",
      "population": 67000,
      "publishers": 404,
      "ratio": 175,
      "growthRate": -1,
      "status": "open",
      "coldWinter": false,
      "tier": "report"
    },
    {
      "id": "dominican-republic",
      "name": "Dominican Republic",
      "iso": "",
      "localeBase": "",
      "region": "Americas",
      "population": 11520000,
      "publishers": 39936,
      "ratio": 299,
      "growthRate": 1,
      "status": "open",
      "coldWinter": false,
      "tier": "report"
    },
    {
      "id": "ecuador",
      "name": "Ecuador",
      "iso": "",
      "localeBase": "",
      "region": "Americas",
      "population": 18104000,
      "publishers": 104393,
      "ratio": 176,
      "growthRate": 2,
      "status": "open",
      "coldWinter": false,
      "tier": "report"
    },
    {
      "id": "el-salvador",
      "name": "El Salvador",
      "iso": "",
      "localeBase": "",
      "region": "Americas",
      "population": 6030000,
      "publishers": 37406,
      "ratio": 162,
      "growthRate": 0,
      "status": "open",
      "coldWinter": false,
      "tier": "report"
    },
    {
      "id": "equatorial-guinea",
      "name": "Equatorial Guinea",
      "iso": "",
      "localeBase": "",
      "region": "Central Africa",
      "population": 1669000,
      "publishers": 3132,
      "ratio": 568,
      "growthRate": 11,
      "status": "open",
      "coldWinter": false,
      "tier": "report"
    },
    {
      "id": "estonia",
      "name": "Estonia",
      "iso": "",
      "localeBase": "",
      "region": "Europe",
      "population": 1370000,
      "publishers": 4118,
      "ratio": 334,
      "growthRate": 0,
      "status": "open",
      "coldWinter": true,
      "tier": "report"
    },
    {
      "id": "eswatini",
      "name": "Eswatini",
      "iso": "",
      "localeBase": "",
      "region": "East Africa",
      "population": 1256000,
      "publishers": 3519,
      "ratio": 366,
      "growthRate": 4,
      "status": "open",
      "coldWinter": false,
      "tier": "report"
    },
    {
      "id": "ethiopia",
      "name": "Ethiopia",
      "iso": "ET",
      "localeBase": "Addis Ababa",
      "region": "East Africa",
      "population": 133271000,
      "ratio": 10668,
      "growthRate": 6,
      "status": "conflict",
      "coldWinter": false,
      "tier": "full",
      "scores": {
        "cost": {
          "score": 9,
          "rationale": "Very cheap. $500–800/mo.",
          "details": {},
          "source": "Numbeo / Expatistan (couple monthly estimate)",
          "asOf": "2026-06-01"
        },
        "safety": {
          "score": 3,
          "rationale": "Regional conflicts (Tigray, Amhara). Addis relatively stable.",
          "details": {
            "advisory_level": 3,
            "conflict": "regional"
          },
          "source": "US State Dept Travel Advisory + local crime reports",
          "asOf": "2026-06-01"
        },
        "visa": {
          "score": 7,
          "rationale": "eVisa available. Tourist-friendly visa process.",
          "details": {
            "visa_type": "eVisa",
            "max_stay_days": 90
          },
          "source": "Official immigration portals + visa research",
          "asOf": "2026-06-01"
        },
        "language": {
          "score": 7,
          "rationale": "Amharic official. English widely spoken in business.",
          "details": {
            "english_prevalence": "moderate"
          },
          "source": "EF English Proficiency Index + FSI difficulty categories",
          "asOf": "2026-06-01"
        },
        "climate": {
          "score": 9,
          "rationale": "Highland climate — \"spring all year\" in Addis. Very pleasant.",
          "details": {
            "koppen": "Cwb",
            "winter_low_c": 15
          },
          "source": "Köppen climate classification",
          "asOf": "2026-06-01"
        },
        "comfort": {
          "score": 4,
          "rationale": "Basic infrastructure. Healthcare limited outside Addis.",
          "details": {
            "healthcare": "limited",
            "internet_mbps": 12
          },
          "source": "WHO health indicators + Ookla internet + infrastructure indices",
          "asOf": "2026-06-01"
        },
        "receptivity": {
          "score": 8,
          "rationale": "Major Christian country. +4% growth. Open field.",
          "details": {
            "growth_pct": 4,
            "legal_status": "free"
          },
          "source": "JW Service Year Report 2025 + religious freedom reports",
          "asOf": "2026-06-01"
        }
      },
      "publishers": 12853
    },
    {
      "id": "falkland-islands",
      "name": "Falkland Islands",
      "iso": "",
      "localeBase": "",
      "region": "Americas",
      "population": 4000,
      "publishers": 9,
      "ratio": 571,
      "growthRate": 0,
      "status": "open",
      "coldWinter": false,
      "tier": "report"
    },
    {
      "id": "faroe-islands",
      "name": "Faroe Islands",
      "iso": "",
      "localeBase": "",
      "region": "Europe",
      "population": 55000,
      "publishers": 126,
      "ratio": 451,
      "growthRate": -8,
      "status": "open",
      "coldWinter": true,
      "tier": "report"
    },
    {
      "id": "fiji",
      "name": "Fiji",
      "iso": "",
      "localeBase": "",
      "region": "Oceania",
      "population": 901000,
      "publishers": 3107,
      "ratio": 306,
      "growthRate": 1,
      "status": "open",
      "coldWinter": false,
      "tier": "report"
    },
    {
      "id": "finland",
      "name": "Finland",
      "iso": "",
      "localeBase": "",
      "region": "Europe",
      "population": 5636000,
      "publishers": 18366,
      "ratio": 309,
      "growthRate": 0,
      "status": "open",
      "coldWinter": true,
      "tier": "report"
    },
    {
      "id": "france",
      "name": "France",
      "iso": "",
      "localeBase": "",
      "region": "Europe",
      "population": 68668000,
      "publishers": 140797,
      "ratio": 492,
      "growthRate": 1,
      "status": "open",
      "coldWinter": false,
      "tier": "report"
    },
    {
      "id": "french-guiana",
      "name": "French Guiana",
      "iso": "",
      "localeBase": "",
      "region": "Americas",
      "population": 292000,
      "publishers": 3045,
      "ratio": 98,
      "growthRate": 1,
      "status": "open",
      "coldWinter": false,
      "tier": "report"
    },
    {
      "id": "gabon",
      "name": "Gabon",
      "iso": "",
      "localeBase": "",
      "region": "Central Africa",
      "population": 2420000,
      "publishers": 5033,
      "ratio": 498,
      "growthRate": 5,
      "status": "open",
      "coldWinter": false,
      "tier": "report"
    },
    {
      "id": "gambia",
      "name": "Gambia",
      "iso": "GM",
      "localeBase": "Banjul",
      "region": "West Africa",
      "population": 2822000,
      "ratio": 8156,
      "growthRate": 10,
      "status": "open",
      "coldWinter": false,
      "tier": "full",
      "scores": {
        "cost": {
          "score": 9,
          "rationale": "Very cheap.",
          "details": {},
          "source": "Numbeo / Expatistan (couple monthly estimate)",
          "asOf": "2026-06-01"
        },
        "safety": {
          "score": 6,
          "rationale": "Generally peaceful. Petty crime.",
          "details": {
            "advisory_level": 1
          },
          "source": "US State Dept Travel Advisory + local crime reports",
          "asOf": "2026-06-01"
        },
        "visa": {
          "score": 5,
          "rationale": "Visa required for Americans.",
          "details": {},
          "source": "Official immigration portals + visa research",
          "asOf": "2026-06-01"
        },
        "language": {
          "score": 9,
          "rationale": "English is official!",
          "details": {
            "official_languages": [
              "English"
            ],
            "english_prevalence": "high"
          },
          "source": "EF English Proficiency Index + FSI difficulty categories",
          "asOf": "2026-06-01"
        },
        "climate": {
          "score": 8,
          "rationale": "Tropical. Hot year-round.",
          "details": {
            "koppen": "Aw",
            "winter_low_c": 18
          },
          "source": "Köppen climate classification",
          "asOf": "2026-06-01"
        },
        "comfort": {
          "score": 3,
          "rationale": "Limited infrastructure.",
          "details": {
            "healthcare": "limited",
            "internet_mbps": 8
          },
          "source": "WHO health indicators + Ookla internet + infrastructure indices",
          "asOf": "2026-06-01"
        },
        "receptivity": {
          "score": 10,
          "rationale": "+10% growth — one of the fastest-growing fields. Very receptive.",
          "details": {
            "growth_pct": 10,
            "legal_status": "free"
          },
          "source": "JW Service Year Report 2025 + religious freedom reports",
          "asOf": "2026-06-01"
        }
      },
      "publishers": 358
    },
    {
      "id": "georgia",
      "name": "Georgia",
      "iso": "",
      "localeBase": "",
      "region": "Central Asia",
      "population": 3705000,
      "publishers": 19523,
      "ratio": 191,
      "growthRate": 2,
      "status": "open",
      "coldWinter": true,
      "tier": "report"
    },
    {
      "id": "germany",
      "name": "Germany",
      "iso": "",
      "localeBase": "",
      "region": "Europe",
      "population": 83600000,
      "publishers": 176478,
      "ratio": 476,
      "growthRate": 0,
      "status": "open",
      "coldWinter": false,
      "tier": "report"
    },
    {
      "id": "ghana",
      "name": "Ghana",
      "iso": "",
      "localeBase": "",
      "region": "West Africa",
      "population": 33742000,
      "publishers": 163141,
      "ratio": 210,
      "growthRate": 3,
      "status": "open",
      "coldWinter": false,
      "tier": "report"
    },
    {
      "id": "gibraltar",
      "name": "Gibraltar",
      "iso": "",
      "localeBase": "",
      "region": "Europe",
      "population": 40000,
      "publishers": 169,
      "ratio": 166,
      "growthRate": 0,
      "status": "open",
      "coldWinter": false,
      "tier": "report"
    },
    {
      "id": "greece",
      "name": "Greece",
      "iso": "",
      "localeBase": "",
      "region": "Europe",
      "population": 10410000,
      "publishers": 27682,
      "ratio": 378,
      "growthRate": 0,
      "status": "open",
      "coldWinter": false,
      "tier": "report"
    },
    {
      "id": "greenland",
      "name": "Greenland",
      "iso": "",
      "localeBase": "",
      "region": "Europe",
      "population": 57000,
      "publishers": 139,
      "ratio": 422,
      "growthRate": 0,
      "status": "open",
      "coldWinter": true,
      "tier": "report"
    },
    {
      "id": "grenada",
      "name": "Grenada",
      "iso": "",
      "localeBase": "",
      "region": "Americas",
      "population": 117000,
      "publishers": 566,
      "ratio": 229,
      "growthRate": 0,
      "status": "open",
      "coldWinter": false,
      "tier": "report"
    },
    {
      "id": "guadeloupe",
      "name": "Guadeloupe",
      "iso": "",
      "localeBase": "",
      "region": "Americas",
      "population": 380000,
      "publishers": 8625,
      "ratio": 44,
      "growthRate": 2,
      "status": "open",
      "coldWinter": false,
      "tier": "report"
    },
    {
      "id": "guam",
      "name": "Guam",
      "iso": "",
      "localeBase": "",
      "region": "Oceania",
      "population": 169000,
      "publishers": 772,
      "ratio": 224,
      "growthRate": 4,
      "status": "open",
      "coldWinter": false,
      "tier": "report"
    },
    {
      "id": "guatemala",
      "name": "Guatemala",
      "iso": "",
      "localeBase": "",
      "region": "Americas",
      "population": 18080000,
      "publishers": 39427,
      "ratio": 461,
      "growthRate": 1,
      "status": "open",
      "coldWinter": false,
      "tier": "report"
    },
    {
      "id": "guinea",
      "name": "Guinea",
      "iso": "GN",
      "localeBase": "Conakry",
      "region": "West Africa",
      "population": 15100000,
      "ratio": 11277,
      "growthRate": 7,
      "status": "open",
      "coldWinter": false,
      "tier": "full",
      "scores": {
        "cost": {
          "score": 9,
          "rationale": "Very cheap.",
          "details": {},
          "source": "Numbeo / Expatistan (couple monthly estimate)",
          "asOf": "2026-06-01"
        },
        "safety": {
          "score": 4,
          "rationale": "Political instability. Urban crime.",
          "details": {
            "advisory_level": 2
          },
          "source": "US State Dept Travel Advisory + local crime reports",
          "asOf": "2026-06-01"
        },
        "visa": {
          "score": 5,
          "rationale": "Visa required. Bureaucratic.",
          "details": {},
          "source": "Official immigration portals + visa research",
          "asOf": "2026-06-01"
        },
        "language": {
          "score": 8,
          "rationale": "French official.",
          "details": {
            "official_languages": [
              "French"
            ]
          },
          "source": "EF English Proficiency Index + FSI difficulty categories",
          "asOf": "2026-06-01"
        },
        "comfort": {
          "score": 2,
          "rationale": "Very limited infrastructure.",
          "details": {
            "healthcare": "limited",
            "internet_mbps": 8
          },
          "source": "WHO health indicators + Ookla internet + infrastructure indices",
          "asOf": "2026-06-01"
        },
        "climate": {
          "score": 8,
          "rationale": "Tropical. Hot year-round.",
          "details": {
            "koppen": "Am",
            "winter_low_c": 20
          },
          "source": "Köppen climate classification",
          "asOf": "2026-06-01"
        },
        "receptivity": {
          "score": 8,
          "rationale": "Open field. +3% growth. Muslim-majority but secular.",
          "details": {
            "growth_pct": 3,
            "legal_status": "free"
          },
          "source": "JW Service Year Report 2025 + religious freedom reports",
          "asOf": "2026-06-01"
        }
      },
      "publishers": 1389
    },
    {
      "id": "guinea-bissau",
      "name": "Guinea-Bissau",
      "iso": "GW",
      "localeBase": "Bissau",
      "region": "West Africa",
      "population": 2250000,
      "ratio": 10766,
      "growthRate": 1,
      "status": "open",
      "coldWinter": false,
      "tier": "full",
      "scores": {
        "cost": {
          "score": 10,
          "rationale": "Extremely cheap.",
          "details": {},
          "source": "Numbeo / Expatistan (couple monthly estimate)",
          "asOf": "2026-06-01"
        },
        "safety": {
          "score": 4,
          "rationale": "Political instability. Coups common.",
          "details": {
            "advisory_level": 2
          },
          "source": "US State Dept Travel Advisory + local crime reports",
          "asOf": "2026-06-01"
        },
        "visa": {
          "score": 4,
          "rationale": "Visa on arrival. Bureaucratic long-stay.",
          "details": {
            "visa_type": "VOA"
          },
          "source": "Official immigration portals + visa research",
          "asOf": "2026-06-01"
        },
        "language": {
          "score": 8,
          "rationale": "Portuguese official. Creole widely spoken.",
          "details": {
            "official_languages": [
              "Portuguese"
            ]
          },
          "source": "EF English Proficiency Index + FSI difficulty categories",
          "asOf": "2026-06-01"
        },
        "comfort": {
          "score": 1,
          "rationale": "Minimal infrastructure. Very poor.",
          "details": {
            "healthcare": "minimal",
            "internet_mbps": 5
          },
          "source": "WHO health indicators + Ookla internet + infrastructure indices",
          "asOf": "2026-06-01"
        },
        "climate": {
          "score": 8,
          "rationale": "Tropical.",
          "details": {
            "koppen": "Am",
            "winter_low_c": 20
          },
          "source": "Köppen climate classification",
          "asOf": "2026-06-01"
        },
        "receptivity": {
          "score": 8,
          "rationale": "Open field. +3% growth.",
          "details": {
            "growth_pct": 3,
            "legal_status": "free"
          },
          "source": "JW Service Year Report 2025 + religious freedom reports",
          "asOf": "2026-06-01"
        }
      },
      "publishers": 216
    },
    {
      "id": "guyana",
      "name": "Guyana",
      "iso": "",
      "localeBase": "",
      "region": "Americas",
      "population": 836000,
      "publishers": 3322,
      "ratio": 257,
      "growthRate": 1,
      "status": "open",
      "coldWinter": false,
      "tier": "report"
    },
    {
      "id": "haiti",
      "name": "Haiti",
      "iso": "",
      "localeBase": "",
      "region": "Americas",
      "population": 11906000,
      "publishers": 16750,
      "ratio": 721,
      "growthRate": 0,
      "status": "conflict",
      "coldWinter": false,
      "tier": "report"
    },
    {
      "id": "honduras",
      "name": "Honduras",
      "iso": "",
      "localeBase": "",
      "region": "Americas",
      "population": 11006000,
      "publishers": 22007,
      "ratio": 508,
      "growthRate": 1,
      "status": "open",
      "coldWinter": false,
      "tier": "report"
    },
    {
      "id": "hong-kong",
      "name": "Hong Kong",
      "iso": "",
      "localeBase": "",
      "region": "East Asia",
      "population": 7534000,
      "publishers": 5588,
      "ratio": 1360,
      "growthRate": 1,
      "status": "open",
      "coldWinter": false,
      "tier": "report"
    },
    {
      "id": "hungary",
      "name": "Hungary",
      "iso": "",
      "localeBase": "",
      "region": "Europe",
      "population": 9540000,
      "publishers": 21586,
      "ratio": 448,
      "growthRate": 0,
      "status": "open",
      "coldWinter": true,
      "tier": "report"
    },
    {
      "id": "iceland",
      "name": "Iceland",
      "iso": "",
      "localeBase": "",
      "region": "Europe",
      "population": 391000,
      "publishers": 458,
      "ratio": 879,
      "growthRate": 1,
      "status": "open",
      "coldWinter": true,
      "tier": "report"
    },
    {
      "id": "india",
      "name": "India",
      "iso": "IN",
      "localeBase": "Bangalore",
      "region": "South Asia",
      "population": 1463866000,
      "ratio": 24275,
      "growthRate": 3,
      "status": "open",
      "coldWinter": false,
      "tier": "full",
      "scores": {
        "cost": {
          "score": 10,
          "rationale": "Extremely cheap outside major tech hubs.",
          "details": {},
          "source": "Numbeo / Expatistan (couple monthly estimate)",
          "asOf": "2026-06-01"
        },
        "safety": {
          "score": 4,
          "rationale": "Uneven safety. Women should be cautious. Street harassment.",
          "details": {
            "advisory_level": 2,
            "womens_safety": "low-moderate"
          },
          "source": "US State Dept Travel Advisory + local crime reports",
          "asOf": "2026-06-01"
        },
        "visa": {
          "score": 7,
          "rationale": "e-Tourist visa (1 year). Long-stay options limited.",
          "details": {
            "visa_type": "e-Visa",
            "max_stay_days": 365
          },
          "source": "Official immigration portals + visa research",
          "asOf": "2026-06-01"
        },
        "language": {
          "score": 9,
          "rationale": "English is official! Hindi + hundreds of local languages.",
          "details": {
            "english_prevalence": "high",
            "official_languages": [
              "English",
              "Hindi"
            ]
          },
          "source": "EF English Proficiency Index + FSI difficulty categories",
          "asOf": "2026-06-01"
        },
        "climate": {
          "score": 6,
          "rationale": "Varied. South is tropical. North has cold winters.",
          "details": {
            "koppen": "Multiple",
            "winter_low_c": 8
          },
          "source": "Köppen climate classification",
          "asOf": "2026-06-01"
        },
        "comfort": {
          "score": 5,
          "rationale": "Excellent in tech hubs (Bangalore). Very basic in rural areas.",
          "details": {
            "healthcare": "variable",
            "internet_mbps": 30
          },
          "source": "WHO health indicators + Ookla internet + infrastructure indices",
          "asOf": "2026-06-01"
        },
        "receptivity": {
          "score": 7,
          "rationale": "Open field. +3% growth. Hindu majority, secular.",
          "details": {
            "growth_pct": 3,
            "legal_status": "free"
          },
          "source": "JW Service Year Report 2025 + religious freedom reports",
          "asOf": "2026-06-01"
        }
      },
      "publishers": 60977
    },
    {
      "id": "indonesia",
      "name": "Indonesia",
      "iso": "ID",
      "localeBase": "Bali",
      "region": "SE Asia",
      "population": 284439000,
      "ratio": 8787,
      "growthRate": 3,
      "status": "open",
      "coldWinter": false,
      "tier": "full",
      "scores": {
        "cost": {
          "score": 8,
          "rationale": "Bali ~$800–1,500/mo. Cheaper off-Bali (Jogja, Surabaya).",
          "details": {
            "couple_monthly_low": 800,
            "couple_monthly_high": 1500,
            "currency": "USD"
          },
          "source": "Numbeo / Expatistan (couple monthly estimate)",
          "asOf": "2026-06-01"
        },
        "safety": {
          "score": 7,
          "rationale": "Generally safe. Petty crime in tourist areas. Women safe in daylight.",
          "details": {
            "advisory_level": 1,
            "violent_crime": "low",
            "womens_safety": "moderate-high"
          },
          "source": "US State Dept Travel Advisory + local crime reports",
          "asOf": "2026-06-01"
        },
        "visa": {
          "score": 7,
          "rationale": "B211A visit visa (60 days, extendable). Golden Visa for investment. KITAS work permit.",
          "details": {
            "visa_type": "B211A + KITAS",
            "max_stay_days": 180,
            "renewable": true
          },
          "source": "Official immigration portals + visa research",
          "asOf": "2026-06-01"
        },
        "language": {
          "score": 7,
          "rationale": "Bahasa Indonesia is one of the easiest languages for English speakers. Latin script.",
          "details": {
            "difficulty": "easy",
            "english_prevalence": "moderate",
            "script": "Latin",
            "romanization": true
          },
          "source": "EF English Proficiency Index + FSI difficulty categories",
          "asOf": "2026-06-01"
        },
        "climate": {
          "score": 8,
          "rationale": "Tropical. Warm year-round. Wet/dry seasons.",
          "details": {
            "koppen": "Am/Af (tropical monsoon/rainforest)",
            "winter_low_c": 22
          },
          "source": "Köppen climate classification",
          "asOf": "2026-06-01"
        },
        "comfort": {
          "score": 6,
          "rationale": "Good in Bali/Jakarta pockets. Variable elsewhere. Internet improving fast.",
          "details": {
            "healthcare": "moderate",
            "internet_mbps": 40,
            "roads": "variable"
          },
          "source": "WHO health indicators + Ookla internet + infrastructure indices",
          "asOf": "2026-06-01"
        },
        "receptivity": {
          "score": 8,
          "rationale": "Open field, +4% growth. Predominantly Muslim but constitutionally secular with religious freedom.",
          "details": {
            "growth_pct": 4,
            "legal_status": "free",
            "religious_freedom": true
          },
          "source": "JW Service Year Report 2025 + religious freedom reports",
          "asOf": "2026-06-01"
        }
      },
      "publishers": 32914
    },
    {
      "id": "ireland",
      "name": "Ireland",
      "iso": "",
      "localeBase": "",
      "region": "Europe",
      "population": 7329000,
      "publishers": 8381,
      "ratio": 885,
      "growthRate": 3,
      "status": "open",
      "coldWinter": false,
      "tier": "report"
    },
    {
      "id": "israel",
      "name": "Israel",
      "iso": "IL",
      "localeBase": "Tel Aviv",
      "region": "Middle East",
      "population": 10106000,
      "ratio": 4859,
      "growthRate": -1,
      "status": "conflict",
      "coldWinter": false,
      "tier": "full",
      "scores": {
        "cost": {
          "score": 3,
          "rationale": "Very expensive. Comparable to Western Europe.",
          "details": {
            "couple_monthly_low": 2500,
            "couple_monthly_high": 3500
          },
          "source": "Numbeo / Expatistan (couple monthly estimate)",
          "asOf": "2026-06-01"
        },
        "safety": {
          "score": 3,
          "rationale": "Active conflict zone. Security situation volatile.",
          "details": {
            "advisory_level": 3,
            "conflict": true
          },
          "source": "US State Dept Travel Advisory + local crime reports",
          "asOf": "2026-06-01"
        },
        "visa": {
          "score": 6,
          "rationale": "90 days visa-free. B1 work visa available with sponsor.",
          "details": {
            "visa_free_days": 90
          },
          "source": "Official immigration portals + visa research",
          "asOf": "2026-06-01"
        },
        "language": {
          "score": 6,
          "rationale": "Hebrew is hard but English widely spoken.",
          "details": {
            "difficulty": "hard",
            "english_prevalence": "high"
          },
          "source": "EF English Proficiency Index + FSI difficulty categories",
          "asOf": "2026-06-01"
        },
        "climate": {
          "score": 9,
          "rationale": "Mediterranean. Hot summers, mild winters.",
          "details": {
            "koppen": "Csa",
            "winter_low_c": 10
          },
          "source": "Köppen climate classification",
          "asOf": "2026-06-01"
        },
        "comfort": {
          "score": 9,
          "rationale": "First-world infrastructure, tech hub, world-class healthcare.",
          "details": {
            "healthcare": "excellent",
            "internet_mbps": 100,
            "roads": "excellent"
          },
          "source": "WHO health indicators + Ookla internet + infrastructure indices",
          "asOf": "2026-06-01"
        },
        "receptivity": {
          "score": 2,
          "rationale": "Complex religious/political landscape. Flat growth. Active conflict limits field work.",
          "details": {
            "growth_pct": 0,
            "legal_status": "restricted"
          },
          "source": "JW Service Year Report 2025 + religious freedom reports",
          "asOf": "2026-06-01"
        }
      },
      "publishers": 2104
    },
    {
      "id": "italy",
      "name": "Italy",
      "iso": "",
      "localeBase": "",
      "region": "Europe",
      "population": 58934000,
      "publishers": 252521,
      "ratio": 234,
      "growthRate": 0,
      "status": "open",
      "coldWinter": false,
      "tier": "report"
    },
    {
      "id": "jamaica",
      "name": "Jamaica",
      "iso": "",
      "localeBase": "",
      "region": "Americas",
      "population": 2837000,
      "publishers": 10985,
      "ratio": 262,
      "growthRate": 0,
      "status": "open",
      "coldWinter": false,
      "tier": "report"
    },
    {
      "id": "japan",
      "name": "Japan",
      "iso": "",
      "localeBase": "",
      "region": "East Asia",
      "population": 123300000,
      "publishers": 214118,
      "ratio": 577,
      "growthRate": 0,
      "status": "open",
      "coldWinter": true,
      "tier": "report"
    },
    {
      "id": "kazakhstan",
      "name": "Kazakhstan",
      "iso": "",
      "localeBase": "",
      "region": "Central Asia",
      "population": 20388000,
      "publishers": 17343,
      "ratio": 1185,
      "growthRate": 1,
      "status": "open",
      "coldWinter": true,
      "tier": "report"
    },
    {
      "id": "kenya",
      "name": "Kenya",
      "iso": "",
      "localeBase": "",
      "region": "East Africa",
      "population": 53331000,
      "publishers": 35011,
      "ratio": 1582,
      "growthRate": 7,
      "status": "open",
      "coldWinter": false,
      "tier": "report"
    },
    {
      "id": "kiribati",
      "name": "Kiribati",
      "iso": "",
      "localeBase": "",
      "region": "Oceania",
      "population": 136000,
      "publishers": 186,
      "ratio": 938,
      "growthRate": 6,
      "status": "open",
      "coldWinter": false,
      "tier": "report"
    },
    {
      "id": "korea-republic-of",
      "name": "Korea, Republic of",
      "iso": "",
      "localeBase": "",
      "region": "East Asia",
      "population": 51169000,
      "publishers": 105726,
      "ratio": 485,
      "growthRate": 0,
      "status": "open",
      "coldWinter": true,
      "tier": "report"
    },
    {
      "id": "kosovo",
      "name": "Kosovo",
      "iso": "XK",
      "localeBase": "Pristina",
      "region": "Europe",
      "population": 1586000,
      "ratio": 6030,
      "growthRate": 10,
      "status": "open",
      "coldWinter": true,
      "tier": "full",
      "scores": {
        "cost": {
          "score": 9,
          "rationale": "Cheapest in Europe. $600–900/mo for a couple.",
          "details": {
            "couple_monthly_low": 600,
            "couple_monthly_high": 900,
            "currency": "EUR"
          },
          "source": "Numbeo / Expatistan (couple monthly estimate)",
          "asOf": "2026-06-01"
        },
        "safety": {
          "score": 8,
          "rationale": "Very safe day-to-day. Low violent crime.",
          "details": {
            "advisory_level": 1,
            "violent_crime": "low",
            "womens_safety": "high"
          },
          "source": "US State Dept Travel Advisory + local crime reports",
          "asOf": "2026-06-01"
        },
        "visa": {
          "score": 8,
          "rationale": "90 days visa-free for Americans. Generous stays.",
          "details": {
            "visa_free_days": 90
          },
          "source": "Official immigration portals + visa research",
          "asOf": "2026-06-01"
        },
        "language": {
          "score": 4,
          "rationale": "Albanian is a real language-learning wall — unique language isolate.",
          "details": {
            "difficulty": "hard",
            "english_prevalence": "moderate (young people)",
            "script": "Latin"
          },
          "source": "EF English Proficiency Index + FSI difficulty categories",
          "asOf": "2026-06-01"
        },
        "climate": {
          "score": 3,
          "rationale": "Cold winters with snow. Continental climate.",
          "details": {
            "koppen": "Cfb/Dfb (continental)",
            "winter_low_c": -5
          },
          "source": "Köppen climate classification",
          "asOf": "2026-06-01"
        },
        "comfort": {
          "score": 5,
          "rationale": "Modest comforts. Most basic in Europe. Improving infrastructure.",
          "details": {
            "healthcare": "basic",
            "internet_mbps": 25,
            "roads": "moderate"
          },
          "source": "WHO health indicators + Ookla internet + infrastructure indices",
          "asOf": "2026-06-01"
        },
        "receptivity": {
          "score": 8,
          "rationale": "+10% growth — one of the fastest-growing fields. Muslim-majority but secular and open.",
          "details": {
            "growth_pct": 10,
            "legal_status": "free",
            "religious_freedom": true
          },
          "source": "JW Service Year Report 2025 + religious freedom reports",
          "asOf": "2026-06-01"
        }
      },
      "publishers": 277
    },
    {
      "id": "kosrae",
      "name": "Kosrae",
      "iso": "",
      "localeBase": "",
      "region": "Oceania",
      "population": 7000,
      "publishers": 12,
      "ratio": 636,
      "growthRate": 22,
      "status": "open",
      "coldWinter": false,
      "tier": "report"
    },
    {
      "id": "kyrgyzstan",
      "name": "Kyrgyzstan",
      "iso": "",
      "localeBase": "",
      "region": "Central Asia",
      "population": 7282000,
      "publishers": 5242,
      "ratio": 1403,
      "growthRate": 1,
      "status": "open",
      "coldWinter": true,
      "tier": "report"
    },
    {
      "id": "latvia",
      "name": "Latvia",
      "iso": "",
      "localeBase": "",
      "region": "Europe",
      "population": 1857000,
      "publishers": 2104,
      "ratio": 894,
      "growthRate": 0,
      "status": "open",
      "coldWinter": true,
      "tier": "report"
    },
    {
      "id": "lesotho",
      "name": "Lesotho",
      "iso": "",
      "localeBase": "",
      "region": "East Africa",
      "population": 2363000,
      "publishers": 4594,
      "ratio": 537,
      "growthRate": 7,
      "status": "open",
      "coldWinter": false,
      "tier": "report"
    },
    {
      "id": "liberia",
      "name": "Liberia",
      "iso": "",
      "localeBase": "",
      "region": "West Africa",
      "population": 5731000,
      "publishers": 9225,
      "ratio": 659,
      "growthRate": 9,
      "status": "open",
      "coldWinter": false,
      "tier": "report"
    },
    {
      "id": "liechtenstein",
      "name": "Liechtenstein",
      "iso": "",
      "localeBase": "",
      "region": "Europe",
      "population": 40000,
      "publishers": 108,
      "ratio": 381,
      "growthRate": 0,
      "status": "open",
      "coldWinter": false,
      "tier": "report"
    },
    {
      "id": "lithuania",
      "name": "Lithuania",
      "iso": "",
      "localeBase": "",
      "region": "Europe",
      "population": 2891000,
      "publishers": 2918,
      "ratio": 1001,
      "growthRate": 0,
      "status": "open",
      "coldWinter": true,
      "tier": "report"
    },
    {
      "id": "luxembourg",
      "name": "Luxembourg",
      "iso": "",
      "localeBase": "",
      "region": "Europe",
      "population": 682000,
      "publishers": 2264,
      "ratio": 306,
      "growthRate": 1,
      "status": "open",
      "coldWinter": false,
      "tier": "report"
    },
    {
      "id": "macao",
      "name": "Macao",
      "iso": "",
      "localeBase": "",
      "region": "East Asia",
      "population": 688000,
      "publishers": 435,
      "ratio": 1619,
      "growthRate": 9,
      "status": "open",
      "coldWinter": false,
      "tier": "report"
    },
    {
      "id": "madagascar",
      "name": "Madagascar",
      "iso": "",
      "localeBase": "",
      "region": "East Africa",
      "population": 32741000,
      "publishers": 45673,
      "ratio": 734,
      "growthRate": 7,
      "status": "open",
      "coldWinter": false,
      "tier": "report"
    },
    {
      "id": "madeira",
      "name": "Madeira",
      "iso": "",
      "localeBase": "",
      "region": "Europe",
      "population": 259000,
      "publishers": 1208,
      "ratio": 216,
      "growthRate": 1,
      "status": "open",
      "coldWinter": false,
      "tier": "report"
    },
    {
      "id": "malawi",
      "name": "Malawi",
      "iso": "",
      "localeBase": "",
      "region": "East Africa",
      "population": 22216000,
      "publishers": 127154,
      "ratio": 192,
      "growthRate": 9,
      "status": "open",
      "coldWinter": false,
      "tier": "report"
    },
    {
      "id": "malaysia",
      "name": "Malaysia",
      "iso": "MY",
      "localeBase": "Penang",
      "region": "SE Asia",
      "population": 34200000,
      "ratio": 6024,
      "growthRate": 0,
      "status": "restricted",
      "coldWinter": false,
      "tier": "full",
      "scores": {
        "cost": {
          "score": 7,
          "rationale": "Penang/KL run ~$1,200–1,800/mo for a couple. Cheaper outside capitals.",
          "details": {
            "couple_monthly_low": 1200,
            "couple_monthly_high": 1800,
            "currency": "USD"
          },
          "source": "Numbeo / Expatistan (couple monthly estimate)",
          "asOf": "2026-06-01"
        },
        "safety": {
          "score": 9,
          "rationale": "One of the safest countries in SE Asia. Very safe for women.",
          "details": {
            "advisory_level": 1,
            "violent_crime": "low",
            "womens_safety": "high"
          },
          "source": "US State Dept Travel Advisory + local crime reports",
          "asOf": "2026-06-01"
        },
        "visa": {
          "score": 7,
          "rationale": "90 days visa-free for Americans. DE Rantau Nomad Pass (~$24k/yr income).",
          "details": {
            "visa_free_days": 90,
            "nomad_visa": "DE Rantau",
            "income_req_usd": 24000
          },
          "source": "Official immigration portals + visa research",
          "asOf": "2026-06-01"
        },
        "language": {
          "score": 10,
          "rationale": "English is everywhere. Malay is close to Indonesian — nearly mutually intelligible.",
          "details": {
            "difficulty": "easy",
            "english_prevalence": "high",
            "indonesian_overlap": "mutually_intelligible"
          },
          "source": "EF English Proficiency Index + FSI difficulty categories",
          "asOf": "2026-06-01"
        },
        "climate": {
          "score": 8,
          "rationale": "Tropical. Warm and humid year-round. No winter.",
          "details": {
            "koppen": "Af (tropical rainforest)",
            "winter_low_c": 22
          },
          "source": "Köppen climate classification",
          "asOf": "2026-06-01"
        },
        "comfort": {
          "score": 9,
          "rationale": "Genuinely first-world in the cities. Excellent infrastructure, healthcare.",
          "details": {
            "healthcare": "excellent",
            "internet_mbps": 100,
            "roads": "excellent"
          },
          "source": "WHO health indicators + Ookla internet + infrastructure indices",
          "asOf": "2026-06-01"
        },
        "receptivity": {
          "score": 3,
          "rationale": "~60% Muslim. Illegal to share faith with Muslims in 10 of 13 states. Hard ceiling on ministry.",
          "details": {
            "growth_pct": 2,
            "legal_status": "restricted",
            "religious_freedom": "partial",
            "restriction": "no preaching to Muslims"
          },
          "source": "JW Service Year Report 2025 + religious freedom reports",
          "asOf": "2026-06-01"
        }
      },
      "publishers": 5740
    },
    {
      "id": "mali",
      "name": "Mali",
      "iso": "ML",
      "localeBase": "Bamako",
      "region": "West Africa",
      "population": 25199000,
      "ratio": 73897,
      "growthRate": -6,
      "status": "conflict",
      "coldWinter": false,
      "tier": "full",
      "scores": {
        "cost": {
          "score": 9,
          "rationale": "Very cheap.",
          "details": {},
          "source": "Numbeo / Expatistan (couple monthly estimate)",
          "asOf": "2026-06-01"
        },
        "safety": {
          "score": 1,
          "rationale": "Active jihadist insurgency. Do Not Travel.",
          "details": {
            "advisory_level": 4,
            "conflict": true
          },
          "source": "US State Dept Travel Advisory + local crime reports",
          "asOf": "2026-06-01"
        },
        "visa": {
          "score": 3,
          "rationale": "Visa available but security situation dire.",
          "details": {},
          "source": "Official immigration portals + visa research",
          "asOf": "2026-06-01"
        },
        "language": {
          "score": 7,
          "rationale": "French official. Bambara widely spoken.",
          "details": {
            "official_languages": [
              "French"
            ]
          },
          "source": "EF English Proficiency Index + FSI difficulty categories",
          "asOf": "2026-06-01"
        },
        "climate": {
          "score": 6,
          "rationale": "Hot Sahel climate.",
          "details": {
            "koppen": "BSh",
            "winter_low_c": 16
          },
          "source": "Köppen climate classification",
          "asOf": "2026-06-01"
        },
        "comfort": {
          "score": 1,
          "rationale": "Minimal infrastructure. Conflict-affected.",
          "details": {
            "healthcare": "minimal",
            "internet_mbps": 3
          },
          "source": "WHO health indicators + Ookla internet + infrastructure indices",
          "asOf": "2026-06-01"
        },
        "receptivity": {
          "score": 7,
          "rationale": "Muslim-majority but open. +4% growth.",
          "details": {
            "growth_pct": 4,
            "legal_status": "free"
          },
          "source": "JW Service Year Report 2025 + religious freedom reports",
          "asOf": "2026-06-01"
        }
      },
      "publishers": 366
    },
    {
      "id": "malta",
      "name": "Malta",
      "iso": "",
      "localeBase": "",
      "region": "Europe",
      "population": 545000,
      "publishers": 883,
      "ratio": 629,
      "growthRate": 3,
      "status": "open",
      "coldWinter": false,
      "tier": "report"
    },
    {
      "id": "marshall-islands",
      "name": "Marshall Islands",
      "iso": "",
      "localeBase": "",
      "region": "Oceania",
      "population": 37000,
      "publishers": 154,
      "ratio": 264,
      "growthRate": 7,
      "status": "open",
      "coldWinter": false,
      "tier": "report"
    },
    {
      "id": "martinique",
      "name": "Martinique",
      "iso": "",
      "localeBase": "",
      "region": "Americas",
      "population": 355000,
      "publishers": 4825,
      "ratio": 75,
      "growthRate": 0,
      "status": "open",
      "coldWinter": false,
      "tier": "report"
    },
    {
      "id": "mauritius",
      "name": "Mauritius",
      "iso": "",
      "localeBase": "",
      "region": "East Africa",
      "population": 1200000,
      "publishers": 2163,
      "ratio": 563,
      "growthRate": 0,
      "status": "open",
      "coldWinter": false,
      "tier": "report"
    },
    {
      "id": "mayotte",
      "name": "Mayotte",
      "iso": "YT",
      "localeBase": "Mamoudzou",
      "region": "East Africa",
      "population": 329000,
      "ratio": 2697,
      "growthRate": -15,
      "status": "open",
      "coldWinter": false,
      "tier": "full",
      "scores": {
        "cost": {
          "score": 3,
          "rationale": "French territory — expensive. Fails cost criterion.",
          "details": {},
          "source": "Numbeo / Expatistan (couple monthly estimate)",
          "asOf": "2026-06-01"
        },
        "safety": {
          "score": 4,
          "rationale": "Recent unrest. Crime rising.",
          "details": {
            "advisory_level": 2
          },
          "source": "US State Dept Travel Advisory + local crime reports",
          "asOf": "2026-06-01"
        },
        "visa": {
          "score": 5,
          "rationale": "French/Schengen visa rules.",
          "details": {
            "visa_free_days": 90
          },
          "source": "Official immigration portals + visa research",
          "asOf": "2026-06-01"
        },
        "language": {
          "score": 6,
          "rationale": "French + Maore. English low.",
          "details": {
            "official_languages": [
              "French"
            ]
          },
          "source": "EF English Proficiency Index + FSI difficulty categories",
          "asOf": "2026-06-01"
        },
        "climate": {
          "score": 8,
          "rationale": "Tropical.",
          "details": {
            "koppen": "Am",
            "winter_low_c": 22
          },
          "source": "Köppen climate classification",
          "asOf": "2026-06-01"
        },
        "comfort": {
          "score": 5,
          "rationale": "French-administered but infrastructure strained by migration.",
          "details": {
            "healthcare": "moderate",
            "internet_mbps": 15
          },
          "source": "WHO health indicators + Ookla internet + infrastructure indices",
          "asOf": "2026-06-01"
        },
        "receptivity": {
          "score": 7,
          "rationale": "Open field. +2% growth.",
          "details": {
            "growth_pct": 2,
            "legal_status": "free"
          },
          "source": "JW Service Year Report 2025 + religious freedom reports",
          "asOf": "2026-06-01"
        }
      },
      "publishers": 131
    },
    {
      "id": "mexico",
      "name": "Mexico",
      "iso": "",
      "localeBase": "",
      "region": "Americas",
      "population": 131947000,
      "publishers": 887844,
      "ratio": 150,
      "growthRate": 1,
      "status": "open",
      "coldWinter": false,
      "tier": "report"
    },
    {
      "id": "moldova",
      "name": "Moldova",
      "iso": "",
      "localeBase": "",
      "region": "Europe",
      "population": 2381000,
      "publishers": 15513,
      "ratio": 154,
      "growthRate": -10,
      "status": "open",
      "coldWinter": true,
      "tier": "report"
    },
    {
      "id": "monaco",
      "name": "Monaco",
      "iso": "",
      "localeBase": "",
      "region": "Europe",
      "population": 38000,
      "publishers": 46,
      "ratio": 864,
      "growthRate": 0,
      "status": "open",
      "coldWinter": false,
      "tier": "report"
    },
    {
      "id": "mongolia",
      "name": "Mongolia",
      "iso": "MN",
      "localeBase": "Ulaanbaatar",
      "region": "Central Asia",
      "population": 3545000,
      "ratio": 8002,
      "growthRate": 0,
      "status": "open",
      "coldWinter": true,
      "tier": "full",
      "scores": {
        "cost": {
          "score": 8,
          "rationale": "Cheap. $600–900/mo.",
          "details": {},
          "source": "Numbeo / Expatistan (couple monthly estimate)",
          "asOf": "2026-06-01"
        },
        "safety": {
          "score": 8,
          "rationale": "Very safe. Low crime.",
          "details": {
            "advisory_level": 1
          },
          "source": "US State Dept Travel Advisory + local crime reports",
          "asOf": "2026-06-01"
        },
        "visa": {
          "score": 6,
          "rationale": "30-day tourist visa. Longer stays bureaucratic.",
          "details": {
            "max_stay_days": 30
          },
          "source": "Official immigration portals + visa research",
          "asOf": "2026-06-01"
        },
        "language": {
          "score": 4,
          "rationale": "Mongolian. Difficult. Cyrillic script.",
          "details": {
            "difficulty": "hard"
          },
          "source": "EF English Proficiency Index + FSI difficulty categories",
          "asOf": "2026-06-01"
        },
        "climate": {
          "score": 1,
          "rationale": "Coldest capital on Earth. -30°C winters.",
          "details": {
            "koppen": "Dwb",
            "winter_low_c": -30
          },
          "source": "Köppen climate classification",
          "asOf": "2026-06-01"
        },
        "comfort": {
          "score": 4,
          "rationale": "Limited infrastructure. Pollution in winter.",
          "details": {
            "healthcare": "basic",
            "internet_mbps": 15
          },
          "source": "WHO health indicators + Ookla internet + infrastructure indices",
          "asOf": "2026-06-01"
        },
        "receptivity": {
          "score": 7,
          "rationale": "Open field. +2% growth.",
          "details": {
            "growth_pct": 2,
            "legal_status": "free"
          },
          "source": "JW Service Year Report 2025 + religious freedom reports",
          "asOf": "2026-06-01"
        }
      },
      "publishers": 469
    },
    {
      "id": "montenegro",
      "name": "Montenegro",
      "iso": "ME",
      "localeBase": "Bar (coast)",
      "region": "Europe",
      "population": 624000,
      "ratio": 1438,
      "growthRate": 5,
      "status": "open",
      "coldWinter": true,
      "tier": "full",
      "scores": {
        "cost": {
          "score": 7,
          "rationale": "Cheaper than Croatia. Coast ~$1,000–1,400/mo.",
          "details": {
            "couple_monthly_low": 1000,
            "couple_monthly_high": 1400,
            "currency": "EUR"
          },
          "source": "Numbeo / Expatistan (couple monthly estimate)",
          "asOf": "2026-06-01"
        },
        "safety": {
          "score": 9,
          "rationale": "Very safe. Low crime. Safe for women day and night.",
          "details": {
            "advisory_level": 1,
            "violent_crime": "very low",
            "womens_safety": "high"
          },
          "source": "US State Dept Travel Advisory + local crime reports",
          "asOf": "2026-06-01"
        },
        "visa": {
          "score": 7,
          "rationale": "90 days visa-free. Temporary residence permit available.",
          "details": {
            "visa_free_days": 90,
            "residence_permit": "available"
          },
          "source": "Official immigration portals + visa research",
          "asOf": "2026-06-01"
        },
        "language": {
          "score": 5,
          "rationale": "Serbian/Montenegrin. Slavic, uses both Latin and Cyrillic.",
          "details": {
            "difficulty": "moderate-hard",
            "english_prevalence": "moderate",
            "script": "Latin/Cyrillic"
          },
          "source": "EF English Proficiency Index + FSI difficulty categories",
          "asOf": "2026-06-01"
        },
        "climate": {
          "score": 8,
          "rationale": "Adriatic coast: Mediterranean climate. Mild winters (~8°C).",
          "details": {
            "koppen": "Csa (Mediterranean)",
            "winter_low_c": 8,
            "coast_only": true
          },
          "source": "Köppen climate classification",
          "asOf": "2026-06-01"
        },
        "comfort": {
          "score": 6,
          "rationale": "Decent infrastructure on the coast. EU candidate country.",
          "details": {
            "healthcare": "moderate",
            "internet_mbps": 30,
            "roads": "moderate"
          },
          "source": "WHO health indicators + Ookla internet + infrastructure indices",
          "asOf": "2026-06-01"
        },
        "receptivity": {
          "score": 6,
          "rationale": "Serbian Orthodox majority. +5% growth. Workable but not standout.",
          "details": {
            "growth_pct": 5,
            "legal_status": "free",
            "religious_freedom": true
          },
          "source": "JW Service Year Report 2025 + religious freedom reports",
          "asOf": "2026-06-01"
        }
      },
      "publishers": 448
    },
    {
      "id": "montserrat",
      "name": "Montserrat",
      "iso": "",
      "localeBase": "",
      "region": "Americas",
      "population": 4000,
      "publishers": 29,
      "ratio": 148,
      "growthRate": 0,
      "status": "open",
      "coldWinter": false,
      "tier": "report"
    },
    {
      "id": "mozambique",
      "name": "Mozambique",
      "iso": "",
      "localeBase": "",
      "region": "East Africa",
      "population": 35632000,
      "publishers": 109531,
      "ratio": 345,
      "growthRate": 12,
      "status": "open",
      "coldWinter": false,
      "tier": "report"
    },
    {
      "id": "myanmar",
      "name": "Myanmar",
      "iso": "MM",
      "localeBase": "Yangon",
      "region": "SE Asia",
      "population": 51317000,
      "ratio": 9677,
      "growthRate": 2,
      "status": "conflict",
      "coldWinter": false,
      "tier": "full",
      "scores": {
        "cost": {
          "score": 9,
          "rationale": "Very cheap. $500–800/mo.",
          "details": {},
          "source": "Numbeo / Expatistan (couple monthly estimate)",
          "asOf": "2026-06-01"
        },
        "safety": {
          "score": 2,
          "rationale": "Active civil war since 2021 coup. Dangerous.",
          "details": {
            "advisory_level": 4,
            "conflict": true
          },
          "source": "US State Dept Travel Advisory + local crime reports",
          "asOf": "2026-06-01"
        },
        "visa": {
          "score": 4,
          "rationale": "eVisa available but situation unstable.",
          "details": {
            "visa_type": "eVisa"
          },
          "source": "Official immigration portals + visa research",
          "asOf": "2026-06-01"
        },
        "language": {
          "score": 3,
          "rationale": "Burmese is hard.",
          "details": {
            "difficulty": "hard"
          },
          "source": "EF English Proficiency Index + FSI difficulty categories",
          "asOf": "2026-06-01"
        },
        "climate": {
          "score": 8,
          "rationale": "Tropical.",
          "details": {
            "koppen": "Am",
            "winter_low_c": 20
          },
          "source": "Köppen climate classification",
          "asOf": "2026-06-01"
        },
        "comfort": {
          "score": 3,
          "rationale": "Poor infrastructure, worsened by conflict.",
          "details": {
            "healthcare": "poor",
            "internet_mbps": 10
          },
          "source": "WHO health indicators + Ookla internet + infrastructure indices",
          "asOf": "2026-06-01"
        },
        "receptivity": {
          "score": 7,
          "rationale": "Open field but conflict limits access. +2% growth.",
          "details": {
            "growth_pct": 2,
            "legal_status": "free"
          },
          "source": "JW Service Year Report 2025 + religious freedom reports",
          "asOf": "2026-06-01"
        }
      },
      "publishers": 5382
    },
    {
      "id": "namibia",
      "name": "Namibia",
      "iso": "",
      "localeBase": "",
      "region": "East Africa",
      "population": 3093000,
      "publishers": 3083,
      "ratio": 1045,
      "growthRate": 6,
      "status": "open",
      "coldWinter": false,
      "tier": "report"
    },
    {
      "id": "nauru",
      "name": "Nauru",
      "iso": "",
      "localeBase": "",
      "region": "Oceania",
      "population": 12000,
      "publishers": 21,
      "ratio": 800,
      "growthRate": 0,
      "status": "open",
      "coldWinter": false,
      "tier": "report"
    },
    {
      "id": "nepal",
      "name": "Nepal",
      "iso": "NP",
      "localeBase": "Kathmandu",
      "region": "South Asia",
      "population": 29876000,
      "ratio": 10103,
      "growthRate": 3,
      "status": "open",
      "coldWinter": true,
      "tier": "full",
      "scores": {
        "cost": {
          "score": 10,
          "rationale": "Very cheap. $400–700/mo.",
          "details": {},
          "source": "Numbeo / Expatistan (couple monthly estimate)",
          "asOf": "2026-06-01"
        },
        "safety": {
          "score": 8,
          "rationale": "Very safe. Low crime. Safe for women.",
          "details": {
            "advisory_level": 1,
            "womens_safety": "high"
          },
          "source": "US State Dept Travel Advisory + local crime reports",
          "asOf": "2026-06-01"
        },
        "visa": {
          "score": 8,
          "rationale": "Visa on arrival, 150 days/year on tourist visa. Very generous.",
          "details": {
            "visa_type": "Tourist (extendable)",
            "max_stay_days": 150
          },
          "source": "Official immigration portals + visa research",
          "asOf": "2026-06-01"
        },
        "language": {
          "score": 6,
          "rationale": "Nepali. English spoken in Kathmandu and tourist areas.",
          "details": {
            "english_prevalence": "moderate"
          },
          "source": "EF English Proficiency Index + FSI difficulty categories",
          "asOf": "2026-06-01"
        },
        "climate": {
          "score": 4,
          "rationale": "Kathmandu has cold winters (~2°C). Himalayan chill.",
          "details": {
            "koppen": "Cwa",
            "winter_low_c": 2
          },
          "source": "Köppen climate classification",
          "asOf": "2026-06-01"
        },
        "comfort": {
          "score": 4,
          "rationale": "Thin on comforts. Frequent power outages (improving).",
          "details": {
            "healthcare": "basic",
            "internet_mbps": 15
          },
          "source": "WHO health indicators + Ookla internet + infrastructure indices",
          "asOf": "2026-06-01"
        },
        "receptivity": {
          "score": 8,
          "rationale": "Open field. +3% growth. Hindu/Buddhist majority, secular republic.",
          "details": {
            "growth_pct": 3,
            "legal_status": "free"
          },
          "source": "JW Service Year Report 2025 + religious freedom reports",
          "asOf": "2026-06-01"
        }
      },
      "publishers": 3001
    },
    {
      "id": "netherlands",
      "name": "Netherlands",
      "iso": "",
      "localeBase": "",
      "region": "Europe",
      "population": 18069000,
      "publishers": 29552,
      "ratio": 616,
      "growthRate": 0,
      "status": "open",
      "coldWinter": false,
      "tier": "report"
    },
    {
      "id": "nevis",
      "name": "Nevis",
      "iso": "",
      "localeBase": "",
      "region": "Americas",
      "population": 13000,
      "publishers": 94,
      "ratio": 167,
      "growthRate": 0,
      "status": "open",
      "coldWinter": false,
      "tier": "report"
    },
    {
      "id": "new-caledonia",
      "name": "New Caledonia",
      "iso": "",
      "localeBase": "",
      "region": "Oceania",
      "population": 265000,
      "publishers": 2726,
      "ratio": 99,
      "growthRate": 1,
      "status": "open",
      "coldWinter": false,
      "tier": "report"
    },
    {
      "id": "new-zealand",
      "name": "New Zealand",
      "iso": "",
      "localeBase": "",
      "region": "Oceania",
      "population": 5331000,
      "publishers": 14809,
      "ratio": 364,
      "growthRate": 1,
      "status": "open",
      "coldWinter": false,
      "tier": "report"
    },
    {
      "id": "nicaragua",
      "name": "Nicaragua",
      "iso": "",
      "localeBase": "",
      "region": "Americas",
      "population": 7008000,
      "publishers": 29071,
      "ratio": 243,
      "growthRate": 1,
      "status": "open",
      "coldWinter": false,
      "tier": "report"
    },
    {
      "id": "niger",
      "name": "Niger",
      "iso": "NE",
      "localeBase": "Niamey",
      "region": "West Africa",
      "population": 27918000,
      "ratio": 82112,
      "growthRate": 6,
      "status": "conflict",
      "coldWinter": false,
      "tier": "full",
      "scores": {
        "cost": {
          "score": 9,
          "rationale": "Very cheap.",
          "details": {},
          "source": "Numbeo / Expatistan (couple monthly estimate)",
          "asOf": "2026-06-01"
        },
        "safety": {
          "score": 1,
          "rationale": "Coup + active insurgency. Do Not Travel.",
          "details": {
            "advisory_level": 4,
            "conflict": true
          },
          "source": "US State Dept Travel Advisory + local crime reports",
          "asOf": "2026-06-01"
        },
        "visa": {
          "score": 3,
          "rationale": "Visa system disrupted by political crisis.",
          "details": {},
          "source": "Official immigration portals + visa research",
          "asOf": "2026-06-01"
        },
        "language": {
          "score": 7,
          "rationale": "French official. Hausa, Djerma widely spoken.",
          "details": {
            "official_languages": [
              "French"
            ]
          },
          "source": "EF English Proficiency Index + FSI difficulty categories",
          "asOf": "2026-06-01"
        },
        "climate": {
          "score": 6,
          "rationale": "Hot Sahel climate. No winter but extreme heat.",
          "details": {
            "koppen": "BSh",
            "winter_low_c": 16
          },
          "source": "Köppen climate classification",
          "asOf": "2026-06-01"
        },
        "comfort": {
          "score": 1,
          "rationale": "Minimal infrastructure. One of world's poorest nations.",
          "details": {
            "healthcare": "minimal",
            "internet_mbps": 3
          },
          "source": "WHO health indicators + Ookla internet + infrastructure indices",
          "asOf": "2026-06-01"
        },
        "receptivity": {
          "score": 9,
          "rationale": "Muslim-majority but open field. +7% growth.",
          "details": {
            "growth_pct": 7,
            "legal_status": "free"
          },
          "source": "JW Service Year Report 2025 + religious freedom reports",
          "asOf": "2026-06-01"
        }
      },
      "publishers": 385
    },
    {
      "id": "nigeria",
      "name": "Nigeria",
      "iso": "",
      "localeBase": "",
      "region": "West Africa",
      "population": 237528000,
      "publishers": 421375,
      "ratio": 589,
      "growthRate": 3,
      "status": "open",
      "coldWinter": false,
      "tier": "report"
    },
    {
      "id": "niue",
      "name": "Niue",
      "iso": "",
      "localeBase": "",
      "region": "Oceania",
      "population": 2000,
      "publishers": 21,
      "ratio": 105,
      "growthRate": 0,
      "status": "open",
      "coldWinter": false,
      "tier": "report"
    },
    {
      "id": "north-macedonia",
      "name": "North Macedonia",
      "iso": "",
      "localeBase": "",
      "region": "Europe",
      "population": 1826000,
      "publishers": 1275,
      "ratio": 1452,
      "growthRate": 1,
      "status": "open",
      "coldWinter": true,
      "tier": "report"
    },
    {
      "id": "norway",
      "name": "Norway",
      "iso": "",
      "localeBase": "",
      "region": "Europe",
      "population": 5601000,
      "publishers": 12096,
      "ratio": 466,
      "growthRate": 0,
      "status": "open",
      "coldWinter": true,
      "tier": "report"
    },
    {
      "id": "pakistan",
      "name": "Pakistan",
      "iso": "PK",
      "localeBase": "Islamabad",
      "region": "South Asia",
      "population": 255220000,
      "ratio": 209025,
      "growthRate": 5,
      "status": "restricted",
      "coldWinter": false,
      "tier": "full",
      "scores": {
        "cost": {
          "score": 10,
          "rationale": "Extremely cheap. One of the cheapest countries.",
          "details": {},
          "source": "Numbeo / Expatistan (couple monthly estimate)",
          "asOf": "2026-06-01"
        },
        "safety": {
          "score": 3,
          "rationale": "Terrorism risk high. Women should be very cautious.",
          "details": {
            "advisory_level": 3,
            "terrorism_risk": "high"
          },
          "source": "US State Dept Travel Advisory + local crime reports",
          "asOf": "2026-06-01"
        },
        "visa": {
          "score": 6,
          "rationale": "eVisa available for tourists.",
          "details": {
            "visa_type": "eVisa",
            "max_stay_days": 30
          },
          "source": "Official immigration portals + visa research",
          "asOf": "2026-06-01"
        },
        "language": {
          "score": 7,
          "rationale": "Urdu + English (official). English widely spoken.",
          "details": {
            "english_prevalence": "high",
            "official_languages": [
              "Urdu",
              "English"
            ]
          },
          "source": "EF English Proficiency Index + FSI difficulty categories",
          "asOf": "2026-06-01"
        },
        "climate": {
          "score": 6,
          "rationale": "Varied. South is hot; north has cold winters.",
          "details": {
            "koppen": "BWh/Cfa",
            "winter_low_c": 5
          },
          "source": "Köppen climate classification",
          "asOf": "2026-06-01"
        },
        "comfort": {
          "score": 4,
          "rationale": "Variable. Good in pockets of major cities.",
          "details": {
            "healthcare": "moderate (cities)",
            "internet_mbps": 20
          },
          "source": "WHO health indicators + Ookla internet + infrastructure indices",
          "asOf": "2026-06-01"
        },
        "receptivity": {
          "score": 2,
          "rationale": "Muslim-majority, blasphemy laws. Heavily restricted field.",
          "details": {
            "growth_pct": 3,
            "legal_status": "restricted"
          },
          "source": "JW Service Year Report 2025 + religious freedom reports",
          "asOf": "2026-06-01"
        }
      },
      "publishers": 1290
    },
    {
      "id": "palau",
      "name": "Palau",
      "iso": "",
      "localeBase": "",
      "region": "Oceania",
      "population": 18000,
      "publishers": 76,
      "ratio": 257,
      "growthRate": 0,
      "status": "open",
      "coldWinter": false,
      "tier": "report"
    },
    {
      "id": "palestinian-territories",
      "name": "Palestinian Territories",
      "iso": "PS",
      "localeBase": "Bethlehem",
      "region": "Middle East",
      "population": 5745000,
      "ratio": 71813,
      "growthRate": 3,
      "status": "conflict",
      "coldWinter": false,
      "tier": "full",
      "scores": {
        "cost": {
          "score": 7,
          "rationale": "Moderate cost.",
          "details": {},
          "source": "Numbeo / Expatistan (couple monthly estimate)",
          "asOf": "2026-06-01"
        },
        "safety": {
          "score": 1,
          "rationale": "Active conflict. Extremely dangerous.",
          "details": {
            "advisory_level": 4,
            "conflict": true
          },
          "source": "US State Dept Travel Advisory + local crime reports",
          "asOf": "2026-06-01"
        },
        "visa": {
          "score": 2,
          "rationale": "Entry controlled by Israel. Complex.",
          "details": {},
          "source": "Official immigration portals + visa research",
          "asOf": "2026-06-01"
        },
        "language": {
          "score": 6,
          "rationale": "Arabic. English moderate.",
          "details": {
            "difficulty": "moderate",
            "english_prevalence": "moderate"
          },
          "source": "EF English Proficiency Index + FSI difficulty categories",
          "asOf": "2026-06-01"
        },
        "climate": {
          "score": 8,
          "rationale": "Mediterranean. Mild winters.",
          "details": {
            "koppen": "Csa",
            "winter_low_c": 8
          },
          "source": "Köppen climate classification",
          "asOf": "2026-06-01"
        },
        "comfort": {
          "score": 2,
          "rationale": "Infrastructure damaged by conflict.",
          "details": {
            "healthcare": "limited",
            "internet_mbps": 10
          },
          "source": "WHO health indicators + Ookla internet + infrastructure indices",
          "asOf": "2026-06-01"
        },
        "receptivity": {
          "score": 5,
          "rationale": "Complex situation. Flat growth.",
          "details": {
            "growth_pct": 0
          },
          "source": "JW Service Year Report 2025 + religious freedom reports",
          "asOf": "2026-06-01"
        }
      },
      "publishers": 81
    },
    {
      "id": "panama",
      "name": "Panama",
      "iso": "",
      "localeBase": "",
      "region": "Americas",
      "population": 4571000,
      "publishers": 19323,
      "ratio": 240,
      "growthRate": 2,
      "status": "open",
      "coldWinter": false,
      "tier": "report"
    },
    {
      "id": "papua-new-guinea",
      "name": "Papua New Guinea",
      "iso": "",
      "localeBase": "",
      "region": "Oceania",
      "population": 10763000,
      "publishers": 5843,
      "ratio": 2071,
      "growthRate": 6,
      "status": "open",
      "coldWinter": false,
      "tier": "report"
    },
    {
      "id": "paraguay",
      "name": "Paraguay",
      "iso": "",
      "localeBase": "",
      "region": "Americas",
      "population": 6417000,
      "publishers": 11699,
      "ratio": 553,
      "growthRate": 3,
      "status": "open",
      "coldWinter": false,
      "tier": "report"
    },
    {
      "id": "peru",
      "name": "Peru",
      "iso": "",
      "localeBase": "",
      "region": "Americas",
      "population": 34350000,
      "publishers": 139464,
      "ratio": 248,
      "growthRate": 3,
      "status": "open",
      "coldWinter": false,
      "tier": "report"
    },
    {
      "id": "philippines",
      "name": "Philippines",
      "iso": "",
      "localeBase": "",
      "region": "SE Asia",
      "population": 113863000,
      "publishers": 273412,
      "ratio": 424,
      "growthRate": 4,
      "status": "open",
      "coldWinter": false,
      "tier": "report"
    },
    {
      "id": "pohnpei",
      "name": "Pohnpei",
      "iso": "",
      "localeBase": "",
      "region": "Oceania",
      "population": 37000,
      "publishers": 60,
      "ratio": 661,
      "growthRate": 0,
      "status": "open",
      "coldWinter": false,
      "tier": "report"
    },
    {
      "id": "poland",
      "name": "Poland",
      "iso": "",
      "localeBase": "",
      "region": "Europe",
      "population": 37412000,
      "publishers": 113987,
      "ratio": 329,
      "growthRate": -1,
      "status": "open",
      "coldWinter": true,
      "tier": "report"
    },
    {
      "id": "portugal",
      "name": "Portugal",
      "iso": "",
      "localeBase": "",
      "region": "Europe",
      "population": 10248000,
      "publishers": 56222,
      "ratio": 184,
      "growthRate": 4,
      "status": "open",
      "coldWinter": false,
      "tier": "report"
    },
    {
      "id": "puerto-rico",
      "name": "Puerto Rico",
      "iso": "",
      "localeBase": "",
      "region": "Americas",
      "population": 3203000,
      "publishers": 22806,
      "ratio": 141,
      "growthRate": 0,
      "status": "open",
      "coldWinter": false,
      "tier": "report"
    },
    {
      "id": "réunion",
      "name": "Réunion",
      "iso": "",
      "localeBase": "",
      "region": "East Africa",
      "population": 896000,
      "publishers": 3639,
      "ratio": 251,
      "growthRate": 1,
      "status": "open",
      "coldWinter": false,
      "tier": "report"
    },
    {
      "id": "rodrigues",
      "name": "Rodrigues",
      "iso": "",
      "localeBase": "",
      "region": "East Africa",
      "population": 44000,
      "publishers": 74,
      "ratio": 667,
      "growthRate": 0,
      "status": "open",
      "coldWinter": false,
      "tier": "report"
    },
    {
      "id": "romania",
      "name": "Romania",
      "iso": "",
      "localeBase": "",
      "region": "Europe",
      "population": 19036000,
      "publishers": 40545,
      "ratio": 471,
      "growthRate": 1,
      "status": "open",
      "coldWinter": true,
      "tier": "report"
    },
    {
      "id": "rota",
      "name": "Rota",
      "iso": "",
      "localeBase": "",
      "region": "Oceania",
      "population": 2000,
      "publishers": 2,
      "ratio": 1000,
      "growthRate": 0,
      "status": "open",
      "coldWinter": false,
      "tier": "report"
    },
    {
      "id": "rwanda",
      "name": "Rwanda",
      "iso": "",
      "localeBase": "",
      "region": "East Africa",
      "population": 14105000,
      "publishers": 39063,
      "ratio": 380,
      "growthRate": 8,
      "status": "open",
      "coldWinter": false,
      "tier": "report"
    },
    {
      "id": "saba",
      "name": "Saba",
      "iso": "",
      "localeBase": "",
      "region": "Americas",
      "population": 2000,
      "publishers": 19,
      "ratio": 111,
      "growthRate": 0,
      "status": "open",
      "coldWinter": false,
      "tier": "report"
    },
    {
      "id": "st-barthélemy",
      "name": "St. Barthélemy",
      "iso": "",
      "localeBase": "",
      "region": "Americas",
      "population": 11000,
      "publishers": 40,
      "ratio": 324,
      "growthRate": 0,
      "status": "open",
      "coldWinter": false,
      "tier": "report"
    },
    {
      "id": "st-eustatius",
      "name": "St. Eustatius",
      "iso": "",
      "localeBase": "",
      "region": "Americas",
      "population": 3000,
      "publishers": 32,
      "ratio": 100,
      "growthRate": 0,
      "status": "open",
      "coldWinter": false,
      "tier": "report"
    },
    {
      "id": "st-helena",
      "name": "St. Helena",
      "iso": "",
      "localeBase": "",
      "region": "East Africa",
      "population": 4000,
      "publishers": 133,
      "ratio": 33,
      "growthRate": 9,
      "status": "open",
      "coldWinter": false,
      "tier": "report"
    },
    {
      "id": "st-kitts",
      "name": "St. Kitts",
      "iso": "",
      "localeBase": "",
      "region": "Americas",
      "population": 38000,
      "publishers": 252,
      "ratio": 159,
      "growthRate": 0,
      "status": "open",
      "coldWinter": false,
      "tier": "report"
    },
    {
      "id": "st-lucia",
      "name": "St. Lucia",
      "iso": "",
      "localeBase": "",
      "region": "Americas",
      "population": 184000,
      "publishers": 777,
      "ratio": 245,
      "growthRate": -3,
      "status": "open",
      "coldWinter": false,
      "tier": "report"
    },
    {
      "id": "st-maarten",
      "name": "St. Maarten",
      "iso": "",
      "localeBase": "",
      "region": "Americas",
      "population": 44000,
      "publishers": 329,
      "ratio": 141,
      "growthRate": 6,
      "status": "open",
      "coldWinter": false,
      "tier": "report"
    },
    {
      "id": "st-martin",
      "name": "St. Martin",
      "iso": "",
      "localeBase": "",
      "region": "Americas",
      "population": 25000,
      "publishers": 322,
      "ratio": 82,
      "growthRate": 3,
      "status": "open",
      "coldWinter": false,
      "tier": "report"
    },
    {
      "id": "st-pierre-and-miquelon",
      "name": "St. Pierre and Miquelon",
      "iso": "",
      "localeBase": "",
      "region": "Europe",
      "population": 6000,
      "publishers": 30,
      "ratio": 333,
      "growthRate": 0,
      "status": "open",
      "coldWinter": true,
      "tier": "report"
    },
    {
      "id": "st-vincent-the-grenadines",
      "name": "St. Vincent & the Grenadines",
      "iso": "",
      "localeBase": "",
      "region": "Americas",
      "population": 100000,
      "publishers": 305,
      "ratio": 337,
      "growthRate": 2,
      "status": "open",
      "coldWinter": false,
      "tier": "report"
    },
    {
      "id": "saipan",
      "name": "Saipan",
      "iso": "",
      "localeBase": "",
      "region": "Oceania",
      "population": 43000,
      "publishers": 236,
      "ratio": 189,
      "growthRate": 0,
      "status": "open",
      "coldWinter": false,
      "tier": "report"
    },
    {
      "id": "samoa",
      "name": "Samoa",
      "iso": "",
      "localeBase": "",
      "region": "Oceania",
      "population": 216000,
      "publishers": 669,
      "ratio": 350,
      "growthRate": 11,
      "status": "open",
      "coldWinter": false,
      "tier": "report"
    },
    {
      "id": "san-marino",
      "name": "San Marino",
      "iso": "",
      "localeBase": "",
      "region": "Europe",
      "population": 34000,
      "publishers": 218,
      "ratio": 160,
      "growthRate": 0,
      "status": "open",
      "coldWinter": false,
      "tier": "report"
    },
    {
      "id": "são-tomé-and-príncipe",
      "name": "São Tomé and Príncipe",
      "iso": "",
      "localeBase": "",
      "region": "Central Africa",
      "population": 210000,
      "publishers": 842,
      "ratio": 255,
      "growthRate": -2,
      "status": "open",
      "coldWinter": false,
      "tier": "report"
    },
    {
      "id": "senegal",
      "name": "Senegal",
      "iso": "SN",
      "localeBase": "Dakar",
      "region": "West Africa",
      "population": 19391000,
      "ratio": 12226,
      "growthRate": 1,
      "status": "open",
      "coldWinter": false,
      "tier": "full",
      "scores": {
        "cost": {
          "score": 7,
          "rationale": "Moderate for West Africa. Dakar pricier than inland.",
          "details": {},
          "source": "Numbeo / Expatistan (couple monthly estimate)",
          "asOf": "2026-06-01"
        },
        "safety": {
          "score": 7,
          "rationale": "Generally safe. One of the most stable countries in West Africa.",
          "details": {
            "advisory_level": 1
          },
          "source": "US State Dept Travel Advisory + local crime reports",
          "asOf": "2026-06-01"
        },
        "visa": {
          "score": 6,
          "rationale": "Visa-free 90 days for Americans.",
          "details": {
            "visa_free_days": 90
          },
          "source": "Official immigration portals + visa research",
          "asOf": "2026-06-01"
        },
        "language": {
          "score": 8,
          "rationale": "French official. Wolof widely spoken.",
          "details": {
            "official_languages": [
              "French"
            ],
            "english_prevalence": "moderate"
          },
          "source": "EF English Proficiency Index + FSI difficulty categories",
          "asOf": "2026-06-01"
        },
        "climate": {
          "score": 8,
          "rationale": "Tropical. Hot year-round.",
          "details": {
            "koppen": "Aw",
            "winter_low_c": 18
          },
          "source": "Köppen climate classification",
          "asOf": "2026-06-01"
        },
        "comfort": {
          "score": 5,
          "rationale": "Dakar has decent infrastructure. Limited outside.",
          "details": {
            "healthcare": "moderate",
            "internet_mbps": 20
          },
          "source": "WHO health indicators + Ookla internet + infrastructure indices",
          "asOf": "2026-06-01"
        },
        "receptivity": {
          "score": 8,
          "rationale": "Open field. +4% growth. Muslim-majority but secular.",
          "details": {
            "growth_pct": 4,
            "legal_status": "free"
          },
          "source": "JW Service Year Report 2025 + religious freedom reports",
          "asOf": "2026-06-01"
        }
      },
      "publishers": 1642
    },
    {
      "id": "serbia",
      "name": "Serbia",
      "iso": "",
      "localeBase": "",
      "region": "Europe",
      "population": 6586000,
      "publishers": 3850,
      "ratio": 1745,
      "growthRate": 2,
      "status": "open",
      "coldWinter": true,
      "tier": "report"
    },
    {
      "id": "seychelles",
      "name": "Seychelles",
      "iso": "",
      "localeBase": "",
      "region": "East Africa",
      "population": 122000,
      "publishers": 417,
      "ratio": 332,
      "growthRate": 7,
      "status": "open",
      "coldWinter": false,
      "tier": "report"
    },
    {
      "id": "sierra-leone",
      "name": "Sierra Leone",
      "iso": "SL",
      "localeBase": "Freetown",
      "region": "West Africa",
      "population": 8820000,
      "ratio": 3313,
      "growthRate": 9,
      "status": "open",
      "coldWinter": false,
      "tier": "full",
      "scores": {
        "cost": {
          "score": 9,
          "rationale": "Very cheap. $400–700/mo for a couple.",
          "details": {
            "couple_monthly_low": 400,
            "couple_monthly_high": 700,
            "currency": "USD"
          },
          "source": "Numbeo / Expatistan (couple monthly estimate)",
          "asOf": "2026-06-01"
        },
        "safety": {
          "score": 6,
          "rationale": "Peaceful since civil war ended. Urban crime moderate.",
          "details": {
            "advisory_level": 2,
            "violent_crime": "moderate",
            "womens_safety": "moderate"
          },
          "source": "US State Dept Travel Advisory + local crime reports",
          "asOf": "2026-06-01"
        },
        "visa": {
          "score": 6,
          "rationale": "Visa on arrival for US citizens (recently introduced). 30 days.",
          "details": {
            "visa_type": "VOA",
            "max_stay_days": 30
          },
          "source": "Official immigration portals + visa research",
          "asOf": "2026-06-01"
        },
        "language": {
          "score": 9,
          "rationale": "English is the official language! Krio is the lingua franca.",
          "details": {
            "difficulty": "easy",
            "english_prevalence": "high",
            "official_languages": [
              "English"
            ]
          },
          "source": "EF English Proficiency Index + FSI difficulty categories",
          "asOf": "2026-06-01"
        },
        "climate": {
          "score": 8,
          "rationale": "Tropical. Hot and humid year-round.",
          "details": {
            "koppen": "Am (tropical monsoon)",
            "winter_low_c": 23
          },
          "source": "Köppen climate classification",
          "asOf": "2026-06-01"
        },
        "comfort": {
          "score": 2,
          "rationale": "Very limited infrastructure. One of the poorest countries.",
          "details": {
            "healthcare": "very limited",
            "internet_mbps": 5,
            "roads": "very poor"
          },
          "source": "WHO health indicators + Ookla internet + infrastructure indices",
          "asOf": "2026-06-01"
        },
        "receptivity": {
          "score": 9,
          "rationale": "Strongly Christian/Muslim mix. Open field, +5% growth. Receptive people.",
          "details": {
            "growth_pct": 5,
            "legal_status": "free",
            "religious_freedom": true
          },
          "source": "JW Service Year Report 2025 + religious freedom reports",
          "asOf": "2026-06-01"
        }
      },
      "publishers": 2803
    },
    {
      "id": "slovakia",
      "name": "Slovakia",
      "iso": "",
      "localeBase": "",
      "region": "Europe",
      "population": 5422000,
      "publishers": 11267,
      "ratio": 484,
      "growthRate": 0,
      "status": "open",
      "coldWinter": true,
      "tier": "report"
    },
    {
      "id": "slovenia",
      "name": "Slovenia",
      "iso": "",
      "localeBase": "",
      "region": "Europe",
      "population": 2131000,
      "publishers": 1735,
      "ratio": 1244,
      "growthRate": -1,
      "status": "open",
      "coldWinter": true,
      "tier": "report"
    },
    {
      "id": "solomon-islands",
      "name": "Solomon Islands",
      "iso": "",
      "localeBase": "",
      "region": "Oceania",
      "population": 798000,
      "publishers": 1814,
      "ratio": 468,
      "growthRate": 1,
      "status": "open",
      "coldWinter": false,
      "tier": "report"
    },
    {
      "id": "south-africa",
      "name": "South Africa",
      "iso": "",
      "localeBase": "",
      "region": "East Africa",
      "population": 63101000,
      "publishers": 107746,
      "ratio": 600,
      "growthRate": 4,
      "status": "open",
      "coldWinter": false,
      "tier": "report"
    },
    {
      "id": "south-sudan",
      "name": "South Sudan",
      "iso": "SS",
      "localeBase": "Juba",
      "region": "East Africa",
      "population": 15787000,
      "ratio": 6556,
      "growthRate": 14,
      "status": "conflict",
      "coldWinter": false,
      "tier": "full",
      "scores": {
        "cost": {
          "score": 8,
          "rationale": "Cheap but costs inflated by NGO economy.",
          "details": {},
          "source": "Numbeo / Expatistan (couple monthly estimate)",
          "asOf": "2026-06-01"
        },
        "safety": {
          "score": 1,
          "rationale": "Active conflict. Cannot safely base here.",
          "details": {
            "advisory_level": 4,
            "conflict": true
          },
          "source": "US State Dept Travel Advisory + local crime reports",
          "asOf": "2026-06-01"
        },
        "visa": {
          "score": 3,
          "rationale": "Visa on arrival but bureaucracy chaotic.",
          "details": {
            "visa_type": "VOA"
          },
          "source": "Official immigration portals + visa research",
          "asOf": "2026-06-01"
        },
        "language": {
          "score": 8,
          "rationale": "English is official language!",
          "details": {
            "english_prevalence": "high",
            "official_languages": [
              "English"
            ]
          },
          "source": "EF English Proficiency Index + FSI difficulty categories",
          "asOf": "2026-06-01"
        },
        "climate": {
          "score": 8,
          "rationale": "Tropical. Hot year-round.",
          "details": {
            "koppen": "Aw",
            "winter_low_c": 20
          },
          "source": "Köppen climate classification",
          "asOf": "2026-06-01"
        },
        "comfort": {
          "score": 1,
          "rationale": "Minimal infrastructure. One of least developed countries.",
          "details": {
            "healthcare": "minimal",
            "internet_mbps": 3
          },
          "source": "WHO health indicators + Ookla internet + infrastructure indices",
          "asOf": "2026-06-01"
        },
        "receptivity": {
          "score": 10,
          "rationale": "+14% growth. Deeply receptive Christian field. But conflict.",
          "details": {
            "growth_pct": 14,
            "legal_status": "free"
          },
          "source": "JW Service Year Report 2025 + religious freedom reports",
          "asOf": "2026-06-01"
        }
      },
      "publishers": 2469
    },
    {
      "id": "spain",
      "name": "Spain",
      "iso": "",
      "localeBase": "",
      "region": "Europe",
      "population": 49316000,
      "publishers": 127840,
      "ratio": 388,
      "growthRate": 2,
      "status": "open",
      "coldWinter": false,
      "tier": "report"
    },
    {
      "id": "sri-lanka",
      "name": "Sri Lanka",
      "iso": "LK",
      "localeBase": "Colombo",
      "region": "South Asia",
      "population": 21763000,
      "ratio": 3083,
      "growthRate": 2,
      "status": "open",
      "coldWinter": false,
      "tier": "full",
      "scores": {
        "cost": {
          "score": 9,
          "rationale": "Very cheap. Couple can live on $600–1,000/mo. Economy still recovering.",
          "details": {
            "couple_monthly_low": 600,
            "couple_monthly_high": 1000,
            "currency": "USD"
          },
          "source": "Numbeo / Expatistan (couple monthly estimate)",
          "asOf": "2026-06-01"
        },
        "safety": {
          "score": 7,
          "rationale": "Generally safe since 2022 crisis stabilized. Low violent crime.",
          "details": {
            "advisory_level": 1,
            "violent_crime": "low",
            "womens_safety": "moderate"
          },
          "source": "US State Dept Travel Advisory + local crime reports",
          "asOf": "2026-06-01"
        },
        "visa": {
          "score": 7,
          "rationale": "eVisa available. Digital Nomad Visa launched. 30-day tourist extendable.",
          "details": {
            "visa_type": "eVisa + DNV",
            "max_stay_days": 90,
            "nomad_visa": true
          },
          "source": "Official immigration portals + visa research",
          "asOf": "2026-06-01"
        },
        "language": {
          "score": 6,
          "rationale": "Sinhala/Tamil. English widely spoken in Colombo and tourist areas.",
          "details": {
            "difficulty": "moderate",
            "english_prevalence": "moderate",
            "script": "Sinhala/Tamil"
          },
          "source": "EF English Proficiency Index + FSI difficulty categories",
          "asOf": "2026-06-01"
        },
        "climate": {
          "score": 8,
          "rationale": "Tropical. Warm year-round. Hill country (Kandy/Nuwara Eliya) is cooler.",
          "details": {
            "koppen": "Af/Am (tropical)",
            "winter_low_c": 20
          },
          "source": "Köppen climate classification",
          "asOf": "2026-06-01"
        },
        "comfort": {
          "score": 5,
          "rationale": "Thin on comforts outside Colombo. Infrastructure still recovering from economic crisis.",
          "details": {
            "healthcare": "basic",
            "internet_mbps": 20,
            "roads": "poor"
          },
          "source": "WHO health indicators + Ookla internet + infrastructure indices",
          "asOf": "2026-06-01"
        },
        "receptivity": {
          "score": 8,
          "rationale": "Open field, +5% growth. Buddhist/Christian/Hindu mix. Freedom to preach.",
          "details": {
            "growth_pct": 5,
            "legal_status": "free",
            "religious_freedom": true
          },
          "source": "JW Service Year Report 2025 + religious freedom reports",
          "asOf": "2026-06-01"
        }
      },
      "publishers": 7169
    },
    {
      "id": "sudan",
      "name": "Sudan",
      "iso": "SD",
      "localeBase": "Khartoum",
      "region": "North Africa",
      "population": 51662000,
      "ratio": 771075,
      "growthRate": -52,
      "status": "conflict",
      "coldWinter": false,
      "tier": "full",
      "scores": {
        "cost": {
          "score": 9,
          "rationale": "Extremely cheap — when functional. Economy in collapse.",
          "details": {},
          "source": "Numbeo / Expatistan (couple monthly estimate)",
          "asOf": "2026-06-01"
        },
        "safety": {
          "score": 1,
          "rationale": "Active civil war. Cannot safely base here.",
          "details": {
            "advisory_level": 4,
            "conflict": true
          },
          "source": "US State Dept Travel Advisory + local crime reports",
          "asOf": "2026-06-01"
        },
        "visa": {
          "score": 2,
          "rationale": "Visa system barely functional during conflict.",
          "details": {},
          "source": "Official immigration portals + visa research",
          "asOf": "2026-06-01"
        },
        "language": {
          "score": 7,
          "rationale": "Arabic. English spoken in south.",
          "details": {
            "difficulty": "moderate",
            "english_prevalence": "moderate"
          },
          "source": "EF English Proficiency Index + FSI difficulty categories",
          "asOf": "2026-06-01"
        },
        "climate": {
          "score": 6,
          "rationale": "Hot desert. No winter, but extreme heat.",
          "details": {
            "koppen": "BWh",
            "winter_low_c": 15
          },
          "source": "Köppen climate classification",
          "asOf": "2026-06-01"
        },
        "comfort": {
          "score": 1,
          "rationale": "War zone. No reliable infrastructure.",
          "details": {
            "healthcare": "non-functional",
            "internet_mbps": 0
          },
          "source": "WHO health indicators + Ookla internet + infrastructure indices",
          "asOf": "2026-06-01"
        },
        "receptivity": {
          "score": 10,
          "rationale": "+14% growth — the hungriest field on the list. But inaccessible.",
          "details": {
            "growth_pct": 14,
            "legal_status": "free"
          },
          "source": "JW Service Year Report 2025 + religious freedom reports",
          "asOf": "2026-06-01"
        }
      },
      "publishers": 71
    },
    {
      "id": "suriname",
      "name": "Suriname",
      "iso": "",
      "localeBase": "",
      "region": "Americas",
      "population": 640000,
      "publishers": 3265,
      "ratio": 201,
      "growthRate": 1,
      "status": "open",
      "coldWinter": false,
      "tier": "report"
    },
    {
      "id": "sweden",
      "name": "Sweden",
      "iso": "",
      "localeBase": "",
      "region": "Europe",
      "population": 10591000,
      "publishers": 22450,
      "ratio": 475,
      "growthRate": 0,
      "status": "open",
      "coldWinter": true,
      "tier": "report"
    },
    {
      "id": "switzerland",
      "name": "Switzerland",
      "iso": "",
      "localeBase": "",
      "region": "Europe",
      "population": 9049000,
      "publishers": 20352,
      "ratio": 447,
      "growthRate": 0,
      "status": "open",
      "coldWinter": false,
      "tier": "report"
    },
    {
      "id": "tahiti",
      "name": "Tahiti",
      "iso": "",
      "localeBase": "",
      "region": "Oceania",
      "population": 280000,
      "publishers": 3268,
      "ratio": 87,
      "growthRate": 0,
      "status": "open",
      "coldWinter": false,
      "tier": "report"
    },
    {
      "id": "taiwan",
      "name": "Taiwan",
      "iso": "",
      "localeBase": "",
      "region": "East Asia",
      "population": 23396000,
      "publishers": 11924,
      "ratio": 1982,
      "growthRate": 2,
      "status": "open",
      "coldWinter": false,
      "tier": "report"
    },
    {
      "id": "tanzania",
      "name": "Tanzania",
      "iso": "TZ",
      "localeBase": "Dar es Salaam",
      "region": "East Africa",
      "population": 68153000,
      "ratio": 2959,
      "growthRate": 9,
      "status": "open",
      "coldWinter": false,
      "tier": "full",
      "scores": {
        "cost": {
          "score": 8,
          "rationale": "Cheap living. $700–1,100/mo for a couple. Cheaper inland.",
          "details": {
            "couple_monthly_low": 700,
            "couple_monthly_high": 1100,
            "currency": "USD"
          },
          "source": "Numbeo / Expatistan (couple monthly estimate)",
          "asOf": "2026-06-01"
        },
        "safety": {
          "score": 7,
          "rationale": "Generally peaceful. Standard urban caution at night. Women safe in daytime.",
          "details": {
            "advisory_level": 1,
            "violent_crime": "low",
            "womens_safety": "moderate"
          },
          "source": "US State Dept Travel Advisory + local crime reports",
          "asOf": "2026-06-01"
        },
        "visa": {
          "score": 6,
          "rationale": "eVisa available (90 days). Residence permit required for long stay.",
          "details": {
            "visa_type": "eVisa + residence permit",
            "max_stay_days": 90,
            "renewable": true
          },
          "source": "Official immigration portals + visa research",
          "asOf": "2026-06-01"
        },
        "language": {
          "score": 8,
          "rationale": "Swahili is relatively easy and widely spoken. English official in business.",
          "details": {
            "difficulty": "moderate",
            "english_prevalence": "moderate",
            "official_languages": [
              "Swahili",
              "English"
            ]
          },
          "source": "EF English Proficiency Index + FSI difficulty categories",
          "asOf": "2026-06-01"
        },
        "climate": {
          "score": 8,
          "rationale": "Tropical. Warm year-round. Highland areas (Arusha) more temperate.",
          "details": {
            "koppen": "Aw/Am (tropical)",
            "winter_low_c": 19
          },
          "source": "Köppen climate classification",
          "asOf": "2026-06-01"
        },
        "comfort": {
          "score": 4,
          "rationale": "Basic infrastructure. Healthcare limited. Internet improving but slow.",
          "details": {
            "healthcare": "limited",
            "internet_mbps": 15,
            "roads": "poor"
          },
          "source": "WHO health indicators + Ookla internet + infrastructure indices",
          "asOf": "2026-06-01"
        },
        "receptivity": {
          "score": 8,
          "rationale": "Open, receptive Christian field. +4% growth. Freedom to preach.",
          "details": {
            "growth_pct": 4,
            "legal_status": "free",
            "religious_freedom": true
          },
          "source": "JW Service Year Report 2025 + religious freedom reports",
          "asOf": "2026-06-01"
        }
      },
      "publishers": 23789
    },
    {
      "id": "thailand",
      "name": "Thailand",
      "iso": "TH",
      "localeBase": "Chiang Mai",
      "region": "SE Asia",
      "population": 70366000,
      "ratio": 12552,
      "growthRate": 3,
      "status": "open",
      "coldWinter": false,
      "tier": "full",
      "scores": {
        "cost": {
          "score": 8,
          "rationale": "Chiang Mai ~$900–1,200/mo for a couple. Moderate for SE Asia.",
          "details": {
            "couple_monthly_low": 900,
            "couple_monthly_high": 1200,
            "currency": "USD"
          },
          "source": "Numbeo / Expatistan (couple monthly estimate)",
          "asOf": "2026-06-01"
        },
        "safety": {
          "score": 8,
          "rationale": "Very safe for women. Low violent crime, safe to walk at night in most areas.",
          "details": {
            "advisory_level": 1,
            "violent_crime": "low",
            "womens_safety": "high"
          },
          "source": "US State Dept Travel Advisory + local crime reports",
          "asOf": "2026-06-01"
        },
        "visa": {
          "score": 10,
          "rationale": "Destination Thailand Visa (DTV): 5 years, multiple-entry, 180-day stays. Best in the region.",
          "details": {
            "visa_type": "DTV",
            "validity_years": 5,
            "max_stay_days": 180,
            "multiple_entry": true
          },
          "source": "Official immigration portals + visa research",
          "asOf": "2026-06-01"
        },
        "language": {
          "score": 3,
          "rationale": "Thai is tonal with its own script — genuinely hard.",
          "details": {
            "difficulty": "hard",
            "english_prevalence": "moderate",
            "script": "Thai",
            "tones": 5
          },
          "source": "EF English Proficiency Index + FSI difficulty categories",
          "asOf": "2026-06-01"
        },
        "climate": {
          "score": 8,
          "rationale": "Tropical. Chiang Mai has a pleasant cool-dry season (Nov–Feb).",
          "details": {
            "koppen": "Aw (tropical savanna)",
            "winter_low_c": 15
          },
          "source": "Köppen climate classification",
          "asOf": "2026-06-01"
        },
        "comfort": {
          "score": 8,
          "rationale": "Excellent healthcare, infrastructure, shopping. World-class medical tourism.",
          "details": {
            "healthcare": "excellent",
            "internet_mbps": 50,
            "roads": "good"
          },
          "source": "WHO health indicators + Ookla internet + infrastructure indices",
          "asOf": "2026-06-01"
        },
        "receptivity": {
          "score": 8,
          "rationale": "Buddhist, fully free. +3% growth. Friendly, open people willing to talk.",
          "details": {
            "growth_pct": 3,
            "legal_status": "free",
            "religious_freedom": true
          },
          "source": "JW Service Year Report 2025 + religious freedom reports",
          "asOf": "2026-06-01"
        }
      },
      "publishers": 5710
    },
    {
      "id": "timor-leste",
      "name": "Timor-Leste",
      "iso": "TL",
      "localeBase": "Dili",
      "region": "SE Asia",
      "population": 1415000,
      "ratio": 3546,
      "growthRate": 6,
      "status": "open",
      "coldWinter": false,
      "tier": "full",
      "scores": {
        "cost": {
          "score": 8,
          "rationale": "Cheap. $500–900/mo. Uses USD as official currency.",
          "details": {
            "couple_monthly_low": 500,
            "couple_monthly_high": 900,
            "currency": "USD"
          },
          "source": "Numbeo / Expatistan (couple monthly estimate)",
          "asOf": "2026-06-01"
        },
        "safety": {
          "score": 7,
          "rationale": "Generally safe. Small, quiet country. Petty crime only.",
          "details": {
            "advisory_level": 1,
            "violent_crime": "low",
            "womens_safety": "moderate"
          },
          "source": "US State Dept Travel Advisory + local crime reports",
          "asOf": "2026-06-01"
        },
        "visa": {
          "score": 5,
          "rationale": "Visa on arrival (30 days). Long-stay options limited and bureaucratic.",
          "details": {
            "visa_type": "VOA",
            "max_stay_days": 30,
            "renewable": "limited"
          },
          "source": "Official immigration portals + visa research",
          "asOf": "2026-06-01"
        },
        "language": {
          "score": 8,
          "rationale": "Portuguese and Tetum official. Indonesian widely spoken. English growing.",
          "details": {
            "difficulty": "moderate",
            "english_prevalence": "moderate",
            "official_languages": [
              "Tetum",
              "Portuguese"
            ]
          },
          "source": "EF English Proficiency Index + FSI difficulty categories",
          "asOf": "2026-06-01"
        },
        "climate": {
          "score": 8,
          "rationale": "Tropical. Warm year-round.",
          "details": {
            "koppen": "Aw/Am (tropical)",
            "winter_low_c": 22
          },
          "source": "Köppen climate classification",
          "asOf": "2026-06-01"
        },
        "comfort": {
          "score": 3,
          "rationale": "Very limited infrastructure. One of the least developed countries in Asia.",
          "details": {
            "healthcare": "very limited",
            "internet_mbps": 8,
            "roads": "poor"
          },
          "source": "WHO health indicators + Ookla internet + infrastructure indices",
          "asOf": "2026-06-01"
        },
        "receptivity": {
          "score": 8,
          "rationale": "Strongly Catholic (97%). Open field, +3% growth.",
          "details": {
            "growth_pct": 3,
            "legal_status": "free",
            "religious_freedom": true
          },
          "source": "JW Service Year Report 2025 + religious freedom reports",
          "asOf": "2026-06-01"
        }
      },
      "publishers": 449
    },
    {
      "id": "tinian",
      "name": "Tinian",
      "iso": "",
      "localeBase": "",
      "region": "Oceania",
      "population": 2000,
      "publishers": 11,
      "ratio": 200,
      "growthRate": 0,
      "status": "open",
      "coldWinter": false,
      "tier": "report"
    },
    {
      "id": "togo",
      "name": "Togo",
      "iso": "",
      "localeBase": "",
      "region": "West Africa",
      "population": 8624000,
      "publishers": 25668,
      "ratio": 344,
      "growthRate": 5,
      "status": "open",
      "coldWinter": false,
      "tier": "report"
    },
    {
      "id": "tonga",
      "name": "Tonga",
      "iso": "",
      "localeBase": "",
      "region": "Oceania",
      "population": 104000,
      "publishers": 243,
      "ratio": 462,
      "growthRate": 7,
      "status": "open",
      "coldWinter": false,
      "tier": "report"
    },
    {
      "id": "trinidad-tobago",
      "name": "Trinidad & Tobago",
      "iso": "",
      "localeBase": "",
      "region": "Americas",
      "population": 1368000,
      "publishers": 10576,
      "ratio": 130,
      "growthRate": 1,
      "status": "open",
      "coldWinter": false,
      "tier": "report"
    },
    {
      "id": "türkiye",
      "name": "Türkiye",
      "iso": "",
      "localeBase": "",
      "region": "Europe",
      "population": 85665000,
      "publishers": 4615,
      "ratio": 19716,
      "growthRate": -12,
      "status": "restricted",
      "coldWinter": false,
      "tier": "report"
    },
    {
      "id": "turks-and-caicos",
      "name": "Turks and Caicos",
      "iso": "",
      "localeBase": "",
      "region": "Americas",
      "population": 51000,
      "publishers": 367,
      "ratio": 148,
      "growthRate": 5,
      "status": "open",
      "coldWinter": false,
      "tier": "report"
    },
    {
      "id": "tuvalu",
      "name": "Tuvalu",
      "iso": "",
      "localeBase": "",
      "region": "Oceania",
      "population": 10000,
      "publishers": 83,
      "ratio": 156,
      "growthRate": 12,
      "status": "open",
      "coldWinter": false,
      "tier": "report"
    },
    {
      "id": "uganda",
      "name": "Uganda",
      "iso": "UG",
      "localeBase": "Kampala",
      "region": "East Africa",
      "population": 45905000,
      "ratio": 4325,
      "growthRate": 7,
      "status": "open",
      "coldWinter": false,
      "tier": "full",
      "scores": {
        "cost": {
          "score": 9,
          "rationale": "Very cheap. $500–900/mo for a couple.",
          "details": {
            "couple_monthly_low": 500,
            "couple_monthly_high": 900,
            "currency": "USD"
          },
          "source": "Numbeo / Expatistan (couple monthly estimate)",
          "asOf": "2026-06-01"
        },
        "safety": {
          "score": 6,
          "rationale": "Generally safe in Kampala. Some terrorism risk near borders (DRC/Somalia).",
          "details": {
            "advisory_level": 2,
            "violent_crime": "moderate",
            "border_risk": "high"
          },
          "source": "US State Dept Travel Advisory + local crime reports",
          "asOf": "2026-06-01"
        },
        "visa": {
          "score": 6,
          "rationale": "eVisa available. East Africa Tourist Visa covers multiple countries.",
          "details": {
            "visa_type": "eVisa",
            "max_stay_days": 90,
            "renewable": true
          },
          "source": "Official immigration portals + visa research",
          "asOf": "2026-06-01"
        },
        "language": {
          "score": 8,
          "rationale": "English is official language! Swahili also official.",
          "details": {
            "difficulty": "easy",
            "english_prevalence": "high",
            "official_languages": [
              "English",
              "Swahili"
            ]
          },
          "source": "EF English Proficiency Index + FSI difficulty categories",
          "asOf": "2026-06-01"
        },
        "climate": {
          "score": 9,
          "rationale": "Equatorial but elevated. Pleasant year-round — \"spring all year.\"",
          "details": {
            "koppen": "Af/Am (tropical)",
            "winter_low_c": 16
          },
          "source": "Köppen climate classification",
          "asOf": "2026-06-01"
        },
        "comfort": {
          "score": 4,
          "rationale": "Basic infrastructure. Healthcare very limited.",
          "details": {
            "healthcare": "limited",
            "internet_mbps": 10,
            "roads": "poor"
          },
          "source": "WHO health indicators + Ookla internet + infrastructure indices",
          "asOf": "2026-06-01"
        },
        "receptivity": {
          "score": 9,
          "rationale": "Strongly Christian country. +4% growth. Very receptive field.",
          "details": {
            "growth_pct": 4,
            "legal_status": "free",
            "religious_freedom": true
          },
          "source": "JW Service Year Report 2025 + religious freedom reports",
          "asOf": "2026-06-01"
        }
      },
      "publishers": 11004
    },
    {
      "id": "ukraine",
      "name": "Ukraine",
      "iso": "",
      "localeBase": "",
      "region": "Europe",
      "population": 38980000,
      "publishers": 99155,
      "ratio": 398,
      "growthRate": -3,
      "status": "conflict",
      "coldWinter": true,
      "tier": "report"
    },
    {
      "id": "united-states-of-america",
      "name": "United States of America",
      "iso": "",
      "localeBase": "",
      "region": "Americas",
      "population": 342270000,
      "publishers": 1256919,
      "ratio": 274,
      "growthRate": 1,
      "status": "open",
      "coldWinter": true,
      "tier": "report"
    },
    {
      "id": "uruguay",
      "name": "Uruguay",
      "iso": "",
      "localeBase": "",
      "region": "Americas",
      "population": 3486000,
      "publishers": 12117,
      "ratio": 291,
      "growthRate": 1,
      "status": "open",
      "coldWinter": false,
      "tier": "report"
    },
    {
      "id": "vanuatu",
      "name": "Vanuatu",
      "iso": "",
      "localeBase": "",
      "region": "Oceania",
      "population": 345000,
      "publishers": 859,
      "ratio": 483,
      "growthRate": 11,
      "status": "open",
      "coldWinter": false,
      "tier": "report"
    },
    {
      "id": "venezuela",
      "name": "Venezuela",
      "iso": "",
      "localeBase": "",
      "region": "Americas",
      "population": 28517000,
      "publishers": 139199,
      "ratio": 206,
      "growthRate": 2,
      "status": "open",
      "coldWinter": false,
      "tier": "report"
    },
    {
      "id": "virgin-islands-british",
      "name": "Virgin Islands, British",
      "iso": "",
      "localeBase": "",
      "region": "Americas",
      "population": 40000,
      "publishers": 223,
      "ratio": 183,
      "growthRate": 0,
      "status": "open",
      "coldWinter": false,
      "tier": "report"
    },
    {
      "id": "virgin-islands-us",
      "name": "Virgin Islands, U.S.",
      "iso": "",
      "localeBase": "",
      "region": "Americas",
      "population": 104000,
      "publishers": 535,
      "ratio": 207,
      "growthRate": 1,
      "status": "open",
      "coldWinter": false,
      "tier": "report"
    },
    {
      "id": "wallis-futuna-islands",
      "name": "Wallis & Futuna Islands",
      "iso": "",
      "localeBase": "",
      "region": "Oceania",
      "population": 11000,
      "publishers": 86,
      "ratio": 133,
      "growthRate": 8,
      "status": "open",
      "coldWinter": false,
      "tier": "report"
    },
    {
      "id": "yap",
      "name": "Yap",
      "iso": "",
      "localeBase": "",
      "region": "Oceania",
      "population": 12000,
      "publishers": 37,
      "ratio": 353,
      "growthRate": 10,
      "status": "open",
      "coldWinter": false,
      "tier": "report"
    },
    {
      "id": "zambia",
      "name": "Zambia",
      "iso": "",
      "localeBase": "",
      "region": "East Africa",
      "population": 21177000,
      "publishers": 284792,
      "ratio": 253206,
      "growthRate": 0,
      "status": "open",
      "coldWinter": false,
      "tier": "report"
    },
    {
      "id": "zimbabwe",
      "name": "Zimbabwe",
      "iso": "",
      "localeBase": "",
      "region": "East Africa",
      "population": 15923000,
      "publishers": 55516,
      "ratio": 296,
      "growthRate": 7,
      "status": "open",
      "coldWinter": false,
      "tier": "report"
    }
  ]
} as const;
