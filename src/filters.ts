// ============================================================================
// Field Survey — Filters
// Pure predicate functions for territory filtering.
// ============================================================================

import { type Territory, type Filters } from './types';

export function applyFilters(
  territories: Territory[],
  filters: Filters,
): Territory[] {
  return territories.filter((t) => {
    if (filters.warmOnly && t.coldWinter) return false;
    if (filters.openOnly && t.status !== 'open') return false;
    if (filters.noConflict && t.status === 'conflict') return false;
    if (t.ratio < filters.minRatio) return false;
    if (t.ratio > filters.maxRatio) return false;
    if (t.growthRate < filters.minGrowth) return false;
    if (t.growthRate > filters.maxGrowth) return false;
    return true;
  });
}
