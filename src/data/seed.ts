// ============================================================================
// Field Survey — Seed Dataset v1
// 34 territories at the 1:2,500 ratio threshold, fully scored.
// Data sourced from the research conversations and Service Year Report.
// Generated programmatically to ensure type safety.
// ============================================================================

import type { Dataset } from './types';

export const SEED_DATASET: Dataset = {
  "version": 1,
  "generatedAt": "2026-06-30",
  "scoringVersion": "1.0.0",
  "territories": [
    {
      "id": "cambodia",
      "name": "Cambodia",
      "iso": "KH",
      "localeBase": "Siem Reap",
      "region": "SE Asia",
      "population": 16800000,
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
      }
    },
    {
      "id": "thailand",
      "name": "Thailand",
      "iso": "TH",
      "localeBase": "Chiang Mai",
      "region": "SE Asia",
      "population": 71700000,
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
      }
    },
    {
      "id": "malaysia",
      "name": "Malaysia",
      "iso": "MY",
      "localeBase": "Penang",
      "region": "SE Asia",
      "population": 34300000,
      "ratio": 6024,
      "growthRate": 2,
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
      }
    },
    {
      "id": "indonesia",
      "name": "Indonesia",
      "iso": "ID",
      "localeBase": "Bali",
      "region": "SE Asia",
      "population": 281000000,
      "ratio": 8787,
      "growthRate": 4,
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
      }
    },
    {
      "id": "sri-lanka",
      "name": "Sri Lanka",
      "iso": "LK",
      "localeBase": "Colombo",
      "region": "South Asia",
      "population": 22000000,
      "ratio": 3083,
      "growthRate": 5,
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
      }
    },
    {
      "id": "tanzania",
      "name": "Tanzania",
      "iso": "TZ",
      "localeBase": "Dar es Salaam",
      "region": "East Africa",
      "population": 67000000,
      "ratio": 2959,
      "growthRate": 4,
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
      }
    },
    {
      "id": "uganda",
      "name": "Uganda",
      "iso": "UG",
      "localeBase": "Kampala",
      "region": "East Africa",
      "population": 48000000,
      "ratio": 4325,
      "growthRate": 4,
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
      }
    },
    {
      "id": "timor-leste",
      "name": "Timor-Leste",
      "iso": "TL",
      "localeBase": "Dili",
      "region": "SE Asia",
      "population": 1360000,
      "ratio": 3546,
      "growthRate": 3,
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
      }
    },
    {
      "id": "sierra-leone",
      "name": "Sierra Leone",
      "iso": "SL",
      "localeBase": "Freetown",
      "region": "West Africa",
      "population": 8600000,
      "ratio": 3313,
      "growthRate": 5,
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
      }
    },
    {
      "id": "turkiye",
      "name": "Türkiye",
      "iso": "TR",
      "localeBase": "Antalya",
      "region": "Europe",
      "population": 85000000,
      "ratio": 19716,
      "growthRate": -12,
      "status": "restricted",
      "coldWinter": false,
      "tier": "full",
      "scores": {
        "cost": {
          "score": 8,
          "rationale": "Cheap for USD earners. Antalya coast ~$800–1,200/mo for a couple.",
          "details": {
            "couple_monthly_low": 800,
            "couple_monthly_high": 1200,
            "currency": "USD"
          },
          "source": "Numbeo / Expatistan (couple monthly estimate)",
          "asOf": "2026-06-01"
        },
        "safety": {
          "score": 8,
          "rationale": "Very safe for women in resort cities. Low violent crime on the coast.",
          "details": {
            "advisory_level": 2,
            "violent_crime": "low",
            "womens_safety": "high"
          },
          "source": "US State Dept Travel Advisory + local crime reports",
          "asOf": "2026-06-01"
        },
        "visa": {
          "score": 6,
          "rationale": "90 days visa-free. Residence permits harder to renew in popular areas.",
          "details": {
            "visa_free_days": 90,
            "residence_permit": "available but tightening"
          },
          "source": "Official immigration portals + visa research",
          "asOf": "2026-06-01"
        },
        "language": {
          "score": 5,
          "rationale": "Turkish is moderate difficulty. Latin script, but agglutinative grammar.",
          "details": {
            "difficulty": "moderate",
            "english_prevalence": "moderate",
            "script": "Latin"
          },
          "source": "EF English Proficiency Index + FSI difficulty categories",
          "asOf": "2026-06-01"
        },
        "climate": {
          "score": 9,
          "rationale": "Mediterranean coast (Antalya/Fethiye): mild winters ~15°C, hot dry summers.",
          "details": {
            "koppen": "Csa (Mediterranean)",
            "winter_low_c": 10
          },
          "source": "Köppen climate classification",
          "asOf": "2026-06-01"
        },
        "comfort": {
          "score": 7,
          "rationale": "Good infrastructure in coastal cities. Quality healthcare. Big expat scene.",
          "details": {
            "healthcare": "good",
            "internet_mbps": 40,
            "roads": "good"
          },
          "source": "WHO health indicators + Ookla internet + infrastructure indices",
          "asOf": "2026-06-01"
        },
        "receptivity": {
          "score": 2,
          "rationale": "Muslim-majority, socially fraught. -12% growth — steepest decline on the list.",
          "details": {
            "growth_pct": -12,
            "legal_status": "restricted",
            "religious_freedom": "partial"
          },
          "source": "JW Service Year Report 2025 + religious freedom reports",
          "asOf": "2026-06-01"
        }
      }
    },
    {
      "id": "montenegro",
      "name": "Montenegro",
      "iso": "ME",
      "localeBase": "Bar (coast)",
      "region": "Europe",
      "population": 620000,
      "ratio": 1438,
      "growthRate": 5,
      "status": "open",
      "coldWinter": false,
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
      }
    },
    {
      "id": "kosovo",
      "name": "Kosovo",
      "iso": "XK",
      "localeBase": "Pristina",
      "region": "Europe",
      "population": 1800000,
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
      }
    },
    {
      "id": "bosnia",
      "name": "Bosnia and Herzegovina",
      "iso": "BA",
      "localeBase": "Sarajevo",
      "region": "Europe",
      "population": 3200000,
      "ratio": 3420,
      "growthRate": 2,
      "status": "open",
      "coldWinter": true,
      "tier": "full",
      "scores": {
        "cost": {
          "score": 9,
          "rationale": "Europe-cheap. $700–1,000/mo for a couple.",
          "details": {
            "couple_monthly_low": 700,
            "couple_monthly_high": 1000,
            "currency": "BAM"
          },
          "source": "Numbeo / Expatistan (couple monthly estimate)",
          "asOf": "2026-06-01"
        },
        "safety": {
          "score": 8,
          "rationale": "Low crime. Safe for women. Post-war stability long established.",
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
          "rationale": "90 days visa-free. Digital nomad visa available.",
          "details": {
            "visa_free_days": 90,
            "nomad_visa": true
          },
          "source": "Official immigration portals + visa research",
          "asOf": "2026-06-01"
        },
        "language": {
          "score": 5,
          "rationale": "Bosnian is Slavic — tough but uses Latin script.",
          "details": {
            "difficulty": "moderate-hard",
            "english_prevalence": "moderate",
            "script": "Latin"
          },
          "source": "EF English Proficiency Index + FSI difficulty categories",
          "asOf": "2026-06-01"
        },
        "climate": {
          "score": 3,
          "rationale": "Cold winters with snow. Continental/mountain climate.",
          "details": {
            "koppen": "Cfb/Dfb",
            "winter_low_c": -4
          },
          "source": "Köppen climate classification",
          "asOf": "2026-06-01"
        },
        "comfort": {
          "score": 6,
          "rationale": "Decent infrastructure. European-standard amenities in Sarajevo.",
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
          "rationale": "Muslim-majority (50%) but secular. +2% growth. Mixed field.",
          "details": {
            "growth_pct": 2,
            "legal_status": "free",
            "religious_freedom": true
          },
          "source": "JW Service Year Report 2025 + religious freedom reports",
          "asOf": "2026-06-01"
        }
      }
    },
    {
      "id": "azerbaijan",
      "name": "Azerbaijan",
      "iso": "AZ",
      "localeBase": "Baku",
      "region": "Central Asia",
      "population": 10100000,
      "ratio": 5725,
      "growthRate": 1,
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
      }
    },
    {
      "id": "israel",
      "name": "Israel",
      "iso": "IL",
      "localeBase": "Tel Aviv",
      "region": "Middle East",
      "population": 9500000,
      "ratio": 4859,
      "growthRate": 0,
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
      }
    },
    {
      "id": "sudan",
      "name": "Sudan",
      "iso": "SD",
      "localeBase": "Khartoum",
      "region": "North Africa",
      "population": 48000000,
      "ratio": 771075,
      "growthRate": 14,
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
      }
    },
    {
      "id": "south-sudan",
      "name": "South Sudan",
      "iso": "SS",
      "localeBase": "Juba",
      "region": "East Africa",
      "population": 11000000,
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
      }
    },
    {
      "id": "myanmar",
      "name": "Myanmar",
      "iso": "MM",
      "localeBase": "Yangon",
      "region": "SE Asia",
      "population": 54000000,
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
      }
    },
    {
      "id": "pakistan",
      "name": "Pakistan",
      "iso": "PK",
      "localeBase": "Islamabad",
      "region": "South Asia",
      "population": 240000000,
      "ratio": 209025,
      "growthRate": 3,
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
      }
    },
    {
      "id": "bangladesh",
      "name": "Bangladesh",
      "iso": "BD",
      "localeBase": "Dhaka",
      "region": "South Asia",
      "population": 173000000,
      "ratio": 416320,
      "growthRate": 5,
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
      }
    },
    {
      "id": "niger",
      "name": "Niger",
      "iso": "NE",
      "localeBase": "Niamey",
      "region": "West Africa",
      "population": 27000000,
      "ratio": 82112,
      "growthRate": 7,
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
      }
    },
    {
      "id": "mali",
      "name": "Mali",
      "iso": "ML",
      "localeBase": "Bamako",
      "region": "West Africa",
      "population": 23000000,
      "ratio": 73897,
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
      }
    },
    {
      "id": "chad",
      "name": "Chad",
      "iso": "TD",
      "localeBase": "N'Djamena",
      "region": "North Africa",
      "population": 18000000,
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
      }
    },
    {
      "id": "palestinian-territories",
      "name": "Palestinian Territories",
      "iso": "PS",
      "localeBase": "Bethlehem",
      "region": "Middle East",
      "population": 5400000,
      "ratio": 71813,
      "growthRate": 0,
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
      }
    },
    {
      "id": "ethiopia",
      "name": "Ethiopia",
      "iso": "ET",
      "localeBase": "Addis Ababa",
      "region": "East Africa",
      "population": 126000000,
      "ratio": 10668,
      "growthRate": 4,
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
      }
    },
    {
      "id": "nepal",
      "name": "Nepal",
      "iso": "NP",
      "localeBase": "Kathmandu",
      "region": "South Asia",
      "population": 30000000,
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
      }
    },
    {
      "id": "mongolia",
      "name": "Mongolia",
      "iso": "MN",
      "localeBase": "Ulaanbaatar",
      "region": "Central Asia",
      "population": 3400000,
      "ratio": 8002,
      "growthRate": 2,
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
      }
    },
    {
      "id": "india",
      "name": "India",
      "iso": "IN",
      "localeBase": "Bangalore",
      "region": "South Asia",
      "population": 1430000000,
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
      }
    },
    {
      "id": "senegal",
      "name": "Senegal",
      "iso": "SN",
      "localeBase": "Dakar",
      "region": "West Africa",
      "population": 17700000,
      "ratio": 12226,
      "growthRate": 4,
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
      }
    },
    {
      "id": "burkina-faso",
      "name": "Burkina Faso",
      "iso": "BF",
      "localeBase": "Ouagadougou",
      "region": "West Africa",
      "population": 23000000,
      "ratio": 12080,
      "growthRate": 5,
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
      }
    },
    {
      "id": "guinea",
      "name": "Guinea",
      "iso": "GN",
      "localeBase": "Conakry",
      "region": "West Africa",
      "population": 13500000,
      "ratio": 11277,
      "growthRate": 3,
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
      }
    },
    {
      "id": "guinea-bissau",
      "name": "Guinea-Bissau",
      "iso": "GW",
      "localeBase": "Bissau",
      "region": "West Africa",
      "population": 2100000,
      "ratio": 10766,
      "growthRate": 3,
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
      }
    },
    {
      "id": "gambia",
      "name": "Gambia",
      "iso": "GM",
      "localeBase": "Banjul",
      "region": "West Africa",
      "population": 2700000,
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
      }
    },
    {
      "id": "mayotte",
      "name": "Mayotte",
      "iso": "YT",
      "localeBase": "Mamoudzou",
      "region": "East Africa",
      "population": 320000,
      "ratio": 2697,
      "growthRate": 2,
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
      }
    }
  ]
} as const;
