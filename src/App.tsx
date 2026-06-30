import { useState, useMemo, useCallback } from 'react';
import { SEED_DATASET } from './data/seed';
import {
  type Weights,
  type Filters,
  type RankedTerritory,
  type CriterionKey,
  type ScoredTerritory,
  type Territory,
  CRITERIA,
  DEFAULT_WEIGHTS,
} from './types';
import { rankTerritories, formatScore } from './engine';
import { applyFilters } from './filters';

// Slider range bounds — clamped to 10th/90th percentile for usability.
// Territories outside these bounds get clamped to the ends.
const RATIO_MIN = 100;
const RATIO_MAX = 10000;
const GROWTH_MIN = -10;
const GROWTH_MAX = 15;

const SCORE_COLORS: Record<string, string> = {
  good: '#22c55e',
  mid: '#f59e0b',
  bad: '#ef4444',
};

function scoreColor(score: number): string {
  if (score >= 8) return SCORE_COLORS.good;
  if (score >= 5) return SCORE_COLORS.mid;
  return SCORE_COLORS.bad;
}

function statusBadge(status: string): { label: string; color: string } {
  if (status === 'open') return { label: '🟢', color: '#22c55e' };
  if (status === 'restricted') return { label: '🟡', color: '#f59e0b' };
  if (status === 'conflict') return { label: '🔴', color: '#ef4444' };
  return { label: '?', color: '#94a3b8' };
}

function growthColor(growth: number): string {
  if (growth > 5) return SCORE_COLORS.good;
  if (growth >= 0) return '#a3e635';
  return SCORE_COLORS.bad;
}

function formatRatio(ratio: number): string {
  if (ratio >= 1_000_000) return `1:${(ratio / 1_000_000).toFixed(1)}M`;
  if (ratio >= 1_000) return `1:${(ratio / 1_000).toFixed(0)}K`;
  return `1:${ratio}`;
}

// Clamp a value to slider bounds
function clamp(v: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, v));
}

// --- Weight Slider (bigger for phone) ---

function WeightSlider({
  criterion,
  value,
  onChange,
}: {
  criterion: CriterionKey;
  value: number;
  onChange: (v: number) => void;
}) {
  const def = CRITERIA.find((c) => c.key === criterion)!;
  return (
    <div className="py-2">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <span className="text-lg">{def.icon}</span>
          <span className="text-sm font-medium text-slate-200">{def.label}</span>
        </div>
        <span className="text-sm font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
          {value}
        </span>
      </div>
      <input
        type="range"
        min={0}
        max={10}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  );
}

// --- Dual Range Slider ---

function DualRangeSlider({
  label,
  icon,
  min,
  max,
  step,
  currentMin,
  currentMax,
  onChange,
  formatVal,
}: {
  label: string;
  icon: string;
  min: number;
  max: number;
  step: number;
  currentMin: number;
  currentMax: number;
  onChange: (min: number, max: number) => void;
  formatVal: (v: number) => string;
}) {
  return (
    <div className="py-2">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <span className="text-lg">{icon}</span>
          <span className="text-sm font-medium text-slate-200">{label}</span>
        </div>
      </div>
      <div className="flex items-center justify-between mb-1 text-xs text-slate-500">
        <span className="bg-slate-800 px-2 py-0.5 rounded font-mono">
          {formatVal(currentMin)}
        </span>
        <span className="text-slate-700">to</span>
        <span className="bg-slate-800 px-2 py-0.5 rounded font-mono">
          {formatVal(currentMax)}
        </span>
      </div>
      <div className="flex items-center gap-1">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={currentMin}
          onChange={(e) => onChange(clamp(Number(e.target.value), min, currentMax), currentMax)}
          className="flex-1"
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={currentMax}
          onChange={(e) => onChange(currentMin, clamp(Number(e.target.value), currentMin, max))}
          className="flex-1"
        />
      </div>
      <div className="flex justify-between mt-0.5 text-[10px] text-slate-700">
        <span>{formatVal(min)}</span>
        <span>{formatVal(max)}</span>
      </div>
    </div>
  );
}

// --- Territory Row ---

function TerritoryRow({
  rt,
  expanded,
  onToggle,
  weights,
}: {
  rt: RankedTerritory;
  expanded: boolean;
  onToggle: () => void;
  weights: Weights;
}) {
  const t = rt.territory;
  const isScored = t.tier === 'full' && 'scores' in t;
  const badge = statusBadge(t.status);

  return (
    <div
      className={`territory-row border-b border-slate-800 ${expanded ? 'bg-slate-800/40' : 'hover:bg-slate-800/20'}`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-3 px-4 py-3 text-left"
      >
        {/* Rank */}
        <div className="w-7 text-center shrink-0">
          <span className={`text-base font-bold ${rt.rank <= 3 ? 'text-indigo-400' : 'text-slate-600'}`}>
            {rt.rank}
          </span>
        </div>

        {/* Score / REPORT badge */}
        <div className="shrink-0">
          {isScored ? (
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-base font-bold"
              style={{
                background: `${scoreColor(rt.totalScore)}22`,
                color: scoreColor(rt.totalScore),
                border: `2px solid ${scoreColor(rt.totalScore)}`,
              }}
            >
              {formatScore(rt.totalScore)}
            </div>
          ) : (
            <div className="w-12 h-12 rounded-full flex items-center justify-center text-[9px] font-medium text-slate-500 border-2 border-slate-700 bg-slate-800/50">
              INFO
            </div>
          )}
        </div>

        {/* Name + data */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-slate-100">{t.name}</span>
            <span title={t.status}>{badge.label}</span>
            {t.coldWinter && <span title="Cold winters">❄️</span>}
          </div>
          <div className="flex items-center gap-3 mt-0.5 text-sm text-slate-500">
            <span className="font-mono">{formatRatio(t.ratio)}</span>
            <span style={{ color: growthColor(t.growthRate) }}>
              {t.growthRate > 0 ? '↑' : t.growthRate < 0 ? '↓' : '—'} {Math.abs(t.growthRate)}%
            </span>
            <span className="text-slate-600">{(t.population / 1_000_000).toFixed(1)}M</span>
          </div>
        </div>
      </button>

      {/* Expanded: scored territory */}
      {expanded && isScored && (
        <div className="px-4 pb-3 pt-1 grid gap-1.5">
          {CRITERIA.map((def) => {
            const cs = (t as ScoredTerritory).scores[def.key];
            const weight = weights[def.key];
            return (
              <div key={def.key} className="flex items-start gap-3 py-1 border-t border-slate-800/50">
                <div className="w-32 shrink-0 pt-0.5">
                  <div className="flex items-center gap-1.5">
                    <span>{def.icon}</span>
                    <span className="text-xs text-slate-300">{def.label}</span>
                    {weight > 0 && (
                      <span className="text-[10px] text-slate-600">×{weight}</span>
                    )}
                  </div>
                </div>
                <div className="shrink-0 w-8">
                  <span className="text-sm font-bold" style={{ color: scoreColor(cs.score) }}>
                    {cs.score}
                  </span>
                </div>
                <div className="flex-1 min-w-0 text-xs text-slate-400">
                  {cs.rationale}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Expanded: report-only */}
      {expanded && !isScored && (
        <div className="px-4 pb-3 pt-1 text-sm text-slate-500">
          <div className="border-t border-slate-800/50 pt-2">
            <p>
              {t.publishers?.toLocaleString()} publishers · {(t.population / 1_000_000).toFixed(1)}M population · {t.region}
            </p>
            <p className="text-xs text-slate-600 mt-1 italic">
              Report data only — not yet scored across the 7 livability criteria.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// --- Filter Chip ---

function FilterChip({
  label,
  icon,
  active,
  onClick,
}: {
  label: string;
  icon: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
        active ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
      }`}
    >
      <span>{icon}</span>
      <span>{label}</span>
    </button>
  );
}

// --- Main App ---

export default function App() {
  const [weights, setWeights] = useState<Weights>(DEFAULT_WEIGHTS);
  const [filters, setFilters] = useState<Filters>({
    warmOnly: false,
    openOnly: false,
    noConflict: false,
    minRatio: RATIO_MIN,
    maxRatio: RATIO_MAX,
    minGrowth: GROWTH_MIN,
    maxGrowth: GROWTH_MAX,
  });
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [showControls, setShowControls] = useState(true);

  // For filtering: clamp territory values to slider bounds so they stay visible
  // at the extremes. A territory with ratio 771,075 clamps to RATIO_MAX.
  const clampedTerritories: Territory[] = useMemo(() => {
    return SEED_DATASET.territories.map((t: Territory) => ({
      ...t,
      ratio: clamp(t.ratio, RATIO_MIN, RATIO_MAX),
      growthRate: clamp(t.growthRate, GROWTH_MIN, GROWTH_MAX),
    }));
  }, []);

  const filtered = useMemo(
    () => applyFilters(clampedTerritories, filters),
    [clampedTerritories, filters],
  );

  const ranked = useMemo(
    () => rankTerritories(filtered, weights),
    [filtered, weights],
  );

  const updateWeight = useCallback((key: CriterionKey, value: number) => {
    setWeights((prev) => ({ ...prev, [key]: value }));
  }, []);

  const toggleFilter = useCallback((key: 'warmOnly' | 'openOnly' | 'noConflict') => {
    setFilters((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  const totalTerritories = SEED_DATASET.territories.length;
  const scoredCount = SEED_DATASET.territories.filter((t: Territory) => t.tier === 'full').length;

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              📖 Field Survey
            </h1>
            <p className="text-xs text-slate-500">
              {totalTerritories} territories · {scoredCount} scored
            </p>
          </div>
          <button
            onClick={() => setShowControls(!showControls)}
            className="lg:hidden px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-sm"
          >
            {showControls ? '✕ Close' : '☰ Filter'}
          </button>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-4 flex flex-col lg:flex-row gap-4">
        {/* Sidebar — Controls */}
        {showControls && (
          <aside className="lg:w-80 shrink-0 space-y-3">
            {/* Weights */}
            <div className="bg-slate-900/50 rounded-xl border border-slate-800 p-4">
              <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">
                Weights
              </h2>
              <div className="space-y-1">
                {CRITERIA.map((def) => (
                  <WeightSlider
                    key={def.key}
                    criterion={def.key}
                    value={weights[def.key]}
                    onChange={(v) => updateWeight(def.key, v)}
                  />
                ))}
              </div>
            </div>

            {/* Filters */}
            <div className="bg-slate-900/50 rounded-xl border border-slate-800 p-4">
              <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">
                Filters
              </h2>
              <div className="flex flex-wrap gap-2 mb-3">
                <FilterChip label="Warm" icon="☀️" active={filters.warmOnly} onClick={() => toggleFilter('warmOnly')} />
                <FilterChip label="Open" icon="📖" active={filters.openOnly} onClick={() => toggleFilter('openOnly')} />
                <FilterChip label="No Conflict" icon="🛡️" active={filters.noConflict} onClick={() => toggleFilter('noConflict')} />
              </div>

              <div className="border-t border-slate-800 pt-2">
                <DualRangeSlider
                  label="Ratio (1:N)"
                  icon="📊"
                  min={RATIO_MIN}
                  max={RATIO_MAX}
                  step={100}
                  currentMin={filters.minRatio}
                  currentMax={filters.maxRatio}
                  onChange={(min, max) => setFilters((prev) => ({ ...prev, minRatio: min, maxRatio: max }))}
                  formatVal={(v) => v >= 1000 ? `${(v / 1000).toFixed(0)}K` : `${v}`}
                />
                <DualRangeSlider
                  label="Growth Rate"
                  icon="📈"
                  min={GROWTH_MIN}
                  max={GROWTH_MAX}
                  step={1}
                  currentMin={filters.minGrowth}
                  currentMax={filters.maxGrowth}
                  onChange={(min, max) => setFilters((prev) => ({ ...prev, minGrowth: min, maxGrowth: max }))}
                  formatVal={(v) => `${v > 0 ? '+' : ''}${v}%`}
                />
              </div>
            </div>
          </aside>
        )}

        {/* Main — Ranked list */}
        <main className="flex-1 min-w-0">
          <div className="mb-2 text-xs text-slate-500 px-1">
            Showing {ranked.length} of {totalTerritories} territories
          </div>
          <div className="bg-slate-900/30 rounded-xl border border-slate-800 overflow-hidden">
            {ranked.length === 0 ? (
              <div className="px-4 py-12 text-center text-slate-500">
                No territories match the current filters.
              </div>
            ) : (
              ranked.map((rt) => (
                <TerritoryRow
                  key={rt.territory.id}
                  rt={rt}
                  expanded={expandedId === rt.territory.id}
                  onToggle={() =>
                    setExpandedId(expandedId === rt.territory.id ? null : rt.territory.id)
                  }
                  weights={weights}
                />
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
