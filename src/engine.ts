// ============================================================================
// Field Survey — Scoring Engine
// Pure functions. Same inputs → same output. No side effects. No randomness.
// ============================================================================

import {
  type Territory,
  type ScoredTerritory,
  type Weights,
  type RankedTerritory,
  type CriterionKey,
  CRITERIA,
} from './types';

/**
 * Compute a weighted geometric mean score for a territory.
 *
 * Uses geometric mean instead of arithmetic mean so that a low score on a
 * heavily-weighted criterion cannot be "averaged out" by high scores elsewhere.
 * A territory scoring 2 on a criterion weighted at 10 drops hard — exactly
 * what you want when the user says "this really matters."
 *
 * Formula: product(score_i ^ (weight_i / total_weight))
 * Scores are normalized to 0-1 (divide by 10), then result scaled back to 1-10.
 *
 * Returns null if the territory doesn't have scores (report-only).
 */
export function weightedTotal(
  scores: ScoredTerritory['scores'] | undefined,
  weights: Weights,
): number | null {
  if (!scores) return null;

  let totalWeight = 0;
  for (const def of CRITERIA) {
    totalWeight += weights[def.key];
  }

  if (totalWeight === 0) return 0;

  // Geometric mean via log space (avoids floating point underflow):
  // result = exp( sum( (weight/total) * ln(score/10) ) ) * 10
  let logSum = 0;
  for (const def of CRITERIA) {
    const key: CriterionKey = def.key;
    const weight = weights[key];
    if (weight > 0) {
      const normalizedScore = scores[key].score / 10; // 0.1 to 1.0
      logSum += (weight / totalWeight) * Math.log(normalizedScore);
    }
  }

  const result = Math.exp(logSum) * 10;
  return Math.round(result * 10) / 10; // round to 1 decimal
}

/**
 * Rank scored territories by weighted score, highest first.
 * Report-only territories (no scores) are returned after scored ones,
 * sorted by ratio (sparsest first).
 */
export function rankTerritories(
  territories: Territory[],
  weights: Weights,
): RankedTerritory[] {
  const scored: RankedTerritory[] = [];
  const unscored: RankedTerritory[] = [];

  for (const t of territories) {
    const totalScore = weightedTotal(
      'scores' in t ? (t as ScoredTerritory).scores : undefined,
      weights,
    );
    if (totalScore !== null) {
      scored.push({ territory: t as ScoredTerritory, totalScore, rank: 0 });
    } else {
      unscored.push({ territory: t as ScoredTerritory, totalScore: 0, rank: 0 });
    }
  }

  // Sort scored territories by score
  scored.sort((a, b) => b.totalScore - a.totalScore);

  // Sort unscored by ratio (sparsest first = higher ratio = more need)
  unscored.sort((a, b) => b.territory.ratio - a.territory.ratio);

  // Combine and assign ranks
  const combined = [...scored, ...unscored];
  combined.forEach((rt, i) => {
    rt.rank = i + 1;
  });

  return combined;
}

/**
 * Format a score number for display (1 decimal place).
 */
export function formatScore(score: number): string {
  return score.toFixed(1);
}
