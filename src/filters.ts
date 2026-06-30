// ============================================================================
// Field Survey — Filters
// Pure predicate functions for territory filtering.
// ============================================================================

import { type ScoredTerritory, type Filters } from './types';

export function applyFilters(
  territories: ScoredTerritory[],
  filters: Filters,
): ScoredTerritory[] {
  return territories.filter((t) => {
    if (filters.warmOnly && t.coldWinter) return false;
    if (filters.openOnly && t.status !== 'open') return false;
    if (filters.noConflict && t.status === 'conflict') return false;
    return true;
  });
}
