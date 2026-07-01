# Field Survey — Data Pipeline

**How territory data is scored, refreshed, and kept current.**

---

## Architecture

```
territories.json (source of truth — categorical attributes)
        │
        ▼
  scoring.py (deterministic rubric → 1-10 scores)
        │
        ▼
  refresh.py (monthly pipeline — diff, classify, publish)
        │
        ▼
  seed.ts (published dataset — consumed by the React app)
        │
        ▼
  GitHub Pages (auto-deploys on merge to main)
```

**The key principle:** `territories.json` holds categorical facts (cost tier, safety level, etc.). `scoring.py` converts those to 1-10 scores deterministically. `seed.ts` is generated output — never edited by hand. Changing a territory's attributes and re-running `refresh.py` updates its scores automatically.

---

## Files

| File | Purpose | Edit by hand? |
|------|---------|---------------|
| `data/territories.json` | Territory attributes + report data (source of truth) | ✅ Yes — update attributes here |
| `scripts/scoring.py` | Deterministic scoring rubric (attributes → scores) | ✅ Yes — change scoring logic here |
| `scripts/generate_attributes.py` | Initial attribute generation from report | ❌ Generated |
| `scripts/refresh.py` | Monthly refresh pipeline (diff + publish) | ❌ Don't edit |
| `src/data/seed.ts` | Published scored dataset (app reads this) | ❌ Generated — don't edit |
| `data/changelog.json` | Audit trail of all score changes | ❌ Generated |

---

## How Scoring Works

Each territory has categorical attributes:

```json
{
  "name": "Cambodia",
  "cost_tier": "ultra_low",
  "safety_level": "moderate",
  "visa_difficulty": "easy",
  "english_prevalence": "limited",
  "local_language_difficulty": "very_hard",
  "climate_type": "tropical",
  "infrastructure_level": "basic",
  "healthcare_level": "basic",
  "religious_freedom": "free",
  "status": "open",
  "growthRate": 9
}
```

The rubric in `scoring.py` maps each attribute to a numeric score:

| Criterion | What drives it | Score range |
|-----------|---------------|-------------|
| Cost | `cost_tier` (ultra_low=10, ultra_high=1) | 1–10 |
| Safety | `safety_level` (very_safe=10, very_unsafe=1) | 1–10 |
| Visa | `visa_difficulty` (easy=9, very_hard=2) | 2–9 |
| Language | 60% English prevalence + 40% local difficulty | 1–10 |
| Climate | `climate_type` (tropical=9, cold=1) | 1–9 |
| Comfort | Average of infrastructure + healthcare levels | 1–10 |
| Receptivity | Religious freedom + growth rate, capped by status | 1–10 |

**Conflict zones** get receptivity capped at 2. **Restricted fields** get capped at 5.

---

## Monthly Refresh Process

### Automatic (GitHub Actions)

Runs on the 1st of every month at 06:00 UTC:

1. Loads `territories.json` and current `seed.ts`
2. Re-scores all territories with the rubric
3. Computes diff (what changed since last month)
4. Classifies changes as **material** (visa/safety/receptivity, or >1pt shift) or **minor**
5. Opens a **Pull Request** with the changes — the PR review IS the human approval step
6. Merge the PR → auto-deploys to GitHub Pages

### Manual

```bash
# See what would change without writing anything
python scripts/refresh.py --dry-run

# Apply all changes, regenerate seed.ts
python scripts/refresh.py --auto-apply

# Interactive (prompts before writing)
python scripts/refresh.py
```

### Trigger from GitHub

Go to Actions → "Monthly Data Refresh" → "Run workflow". Check the **auto_apply** box to skip PR review.

---

## Updating Territory Data

When you learn new information about a country (visa rules changed, cost shifted, etc.):

1. Edit `data/territories.json` — update the relevant attribute
2. Run `python scripts/refresh.py --dry-run` to see what scores changed
3. Run `python scripts/refresh.py --auto-apply` to publish

The changelog records every score change with before/after values.

---

## Ingesting a New Annual Report

When the new Service Year Report drops (typically September):

1. Place the PDF in the project directory
2. Run the extraction script to parse territory data (population, publishers, ratio, growth)
3. Merge updated report values into `territories.json`
4. Run `refresh.py` to re-score — growth rate changes will shift receptivity scores
5. Review and publish

---

## Scoring Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-06-30 | Initial hand-scored 34 territories |
| 2.0.0 | 2026-06-30 | Deterministic rubric, all 206 territories auto-scored |
