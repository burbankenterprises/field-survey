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
 * Compute a weighted total score for a territory.
 * Returns a number from 1–10 reflecting the overall fit.
 * Returns null if the territory doesn't have scores (Tier 1 / report-only).
 */
export function weightedTotal(
  scores: ScoredTerritory['scores'] | undefined,
  weights: Weights,
): number | null {
  if (!scores) return null;

  let weightedSum = 0;
  let totalWeight = 0;

  for (const def of CRITERIA) {
    const key: CriterionKey = def.key;
    const score = scores[key].score;
    const weight = weights[key];
    weightedSum += score * weight;
    totalWeight += weight;
  }

  return totalWeight > 0 ? weightedSum / totalWeight : 0;
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
