// ============================================================================
// Field Survey — Scoring Engine
// Pure functions. Same inputs → same output. No side effects. No randomness.
// ============================================================================

import {
  type ScoredTerritory,
  type Weights,
  type RankedTerritory,
  type CriterionKey,
  CRITERIA,
} from './types';

/**
 * Compute a weighted total score for a territory.
 * Returns a number from 1–10 reflecting the overall fit.
 */
export function weightedTotal(scores: ScoredTerritory['scores'], weights: Weights): number {
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
 * Rank all territories by weighted score, highest first.
 */
export function rankTerritories(
  territories: ScoredTerritory[],
  weights: Weights,
): RankedTerritory[] {
  return territories
    .map((t) => ({
      territory: t,
      totalScore: weightedTotal(t.scores, weights),
      rank: 0, // assigned after sort
    }))
    .sort((a, b) => b.totalScore - a.totalScore)
    .map((rt, i) => ({ ...rt, rank: i + 1 }));
}

/**
 * Format a score number for display (1 decimal place).
 */
export function formatScore(score: number): string {
  return score.toFixed(1);
}
