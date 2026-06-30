// ============================================================================
// Field Survey — Core Types
// ============================================================================

/** A place under evaluation for relocation + ministry work. */
export interface Territory {
  id: string;
  name: string;
  iso: string;
  /** The locale/base city where you'd actually live */
  localeBase: string;
  region: string;

  // --- Report data (always present, from the Service Year Report) ---
  population: number;
  /** Number of publishers (preachers) */
  publishers?: number;
  /** 1 publisher per N people */
  ratio: number;
  /** % increase/decrease over prior year */
  growthRate: number;

  // --- Field status ---
  status: 'open' | 'restricted' | 'conflict';
  coldWinter: boolean;

  // --- Scoring tier ---
  /** 'full' = all 7 criteria researched & scored; 'report' = report data only */
  tier: 'full' | 'report';
}

/** A scored territory includes per-criterion data with provenance. */
export interface ScoredTerritory extends Territory {
  scores: ScoreSet;
}

/** Per-criterion raw data + 1–10 score + rationale + source. */
export interface ScoreSet {
  cost: CriterionScore;
  safety: CriterionScore;
  visa: CriterionScore;
  language: CriterionScore;
  climate: CriterionScore;
  comfort: CriterionScore;
  receptivity: CriterionScore;
}

export interface CriterionScore {
  /** 1–10 */
  score: number;
  /** Short human-readable "why" */
  rationale: string;
  /** Raw data supporting the score */
  details: Record<string, string | number | boolean>;
  /** Source name */
  source: string;
  /** When the source was last valid */
  asOf: string; // ISO date
}

// --- Criteria definitions ---

export type CriterionKey = keyof ScoreSet;

export interface CriterionDef {
  key: CriterionKey;
  label: string;
  icon: string;
  description: string;
  /** Whether higher score = "better" (always true for us, but typed for clarity) */
  higherIsBetter: true;
}

export const CRITERIA: CriterionDef[] = [
  {
    key: 'cost',
    label: 'Cost of Living',
    icon: '💰',
    description: 'Monthly expenses for a couple living modestly but comfortably.',
    higherIsBetter: true,
  },
  {
    key: 'safety',
    label: "Women's Safety",
    icon: '🛡️',
    description: 'How safe it is for your wife to walk and move around alone.',
    higherIsBetter: true,
  },
  {
    key: 'visa',
    label: 'Visa Ease',
    icon: '📋',
    description: 'Long-stay visa options, renewal friction, and path to residency.',
    higherIsBetter: true,
  },
  {
    key: 'language',
    label: 'Language Ease',
    icon: '🗣️',
    description: 'Difficulty of learning the local language; English prevalence.',
    higherIsBetter: true,
  },
  {
    key: 'climate',
    label: 'Climate',
    icon: '🌤️',
    description: 'Temperate/warm year-round. No harsh winters.',
    higherIsBetter: true,
  },
  {
    key: 'comfort',
    label: 'Comfort & Infrastructure',
    icon: '🏥',
    description: 'Healthcare, internet, roads, shopping — first-world amenities.',
    higherIsBetter: true,
  },
  {
    key: 'receptivity',
    label: 'Field Receptivity',
    icon: '📖',
    description: 'Openness to Bible discussions; legal freedom to preach.',
    higherIsBetter: true,
  },
];

// --- Weight presets ---

export type Weights = Record<CriterionKey, number>;

export interface WeightPreset {
  name: string;
  description: string;
  weights: Weights;
}

export const DEFAULT_WEIGHTS: Weights = {
  cost: 9,
  safety: 9,
  visa: 7,
  language: 6,
  climate: 7,
  comfort: 4,
  receptivity: 9,
};

export const PRESETS: WeightPreset[] = [
  {
    name: 'Jon\'s Priorities',
    description: 'Cost + wife\'s safety + open field weighted highest',
    weights: DEFAULT_WEIGHTS,
  },
  {
    name: 'Cost First',
    description: 'Maximize affordability above all',
    weights: { cost: 10, safety: 7, visa: 6, language: 5, climate: 7, comfort: 3, receptivity: 7 },
  },
  {
    name: 'Open Field First',
    description: 'Spiritual receptivity and legal freedom dominate',
    weights: { cost: 6, safety: 7, visa: 5, language: 5, climate: 6, comfort: 4, receptivity: 10 },
  },
  {
    name: 'Her Safety First',
    description: 'Women\'s safety is the deciding factor',
    weights: { cost: 6, safety: 10, visa: 6, language: 5, climate: 7, comfort: 6, receptivity: 7 },
  },
];

// --- Filters ---

export interface Filters {
  warmOnly: boolean;
  openOnly: boolean;
  noConflict: boolean;
  /** Minimum ratio threshold (1:N). 0 = no filter. */
  minRatio: number;
  /** Maximum ratio threshold. Infinity = no filter. */
  maxRatio: number;
  /** Minimum growth rate %. -Infinity = no filter. */
  minGrowth: number;
  /** Maximum growth rate %. Infinity = no filter. */
  maxGrowth: number;
}

export const DEFAULT_FILTERS: Filters = {
  warmOnly: false,
  openOnly: false,
  noConflict: false,
  minRatio: 0,
  maxRatio: Infinity,
  minGrowth: -Infinity,
  maxGrowth: Infinity,
};

// --- Dataset ---

export interface Dataset {
  version: number;
  generatedAt: string;
  scoringVersion: string;
  territories: Territory[];
}

export interface RankedTerritory {
  territory: ScoredTerritory;
  totalScore: number;
  rank: number;
}
