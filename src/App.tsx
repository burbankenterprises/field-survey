import { useState, useMemo, useCallback } from 'react';
import { SEED_DATASET } from './data/seed';
import {
  type Weights,
  type Filters,
  type RankedTerritory,
  type CriterionKey,
  type ScoredTerritory,
  CRITERIA,
  DEFAULT_WEIGHTS,
  DEFAULT_FILTERS,
  PRESETS,
} from './types';
import { rankTerritories, formatScore } from './engine';
import { applyFilters } from './filters';

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
  if (status === 'open') return { label: '🟢 Open', color: '#22c55e' };
  if (status === 'restricted') return { label: '🟡 Restricted', color: '#f59e0b' };
  if (status === 'conflict') return { label: '🔴 Conflict', color: '#ef4444' };
  return { label: status, color: '#94a3b8' };
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

// --- Weight Slider ---

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
    <div className="flex items-center gap-3 py-1.5">
      <div className="w-36 flex items-center gap-2 shrink-0">
        <span className="text-base">{def.icon}</span>
        <span className="text-xs font-medium text-slate-200">{def.label}</span>
      </div>
      <input
        type="range"
        min={0}
        max={10}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="flex-1"
      />
      <span className="w-6 text-center text-xs font-mono text-slate-400">{value}</span>
    </div>
  );
}

// --- Range Slider (for ratio/growth) ---

function RangeFilter({
  label,
  icon,
  min,
  max,
  step,
  currentMin,
  currentMax,
  onChange,
  format,
}: {
  label: string;
  icon: string;
  min: number;
  max: number;
  step: number;
  currentMin: number;
  currentMax: number;
  onChange: (min: number, max: number) => void;
  format: (v: number) => string;
}) {
  return (
    <div className="py-1.5">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-base">{icon}</span>
        <span className="text-xs font-medium text-slate-200">{label}</span>
      </div>
      <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
        <span>{format(currentMin)}</span>
        <span className="flex-1 text-center text-slate-700">—</span>
        <span>{format(currentMax)}</span>
      </div>
      <div className="flex items-center gap-2">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={currentMin}
          onChange={(e) => onChange(Number(e.target.value), currentMax)}
          className="flex-1"
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={currentMax}
          onChange={(e) => onChange(currentMin, Number(e.target.value))}
          className="flex-1"
        />
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
      {/* Header row */}
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-3 px-4 py-2.5 text-left"
      >
        {/* Rank */}
        <div className="w-7 text-center shrink-0">
          <span className={`text-sm font-bold ${rt.rank <= 3 ? 'text-indigo-400' : 'text-slate-600'}`}>
            {rt.rank}
          </span>
        </div>

        {/* Score circle (scored) or ratio indicator (report-only) */}
        <div className="shrink-0">
          {isScored ? (
            <div
              className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold"
              style={{
                background: `${scoreColor(rt.totalScore)}22`,
                color: scoreColor(rt.totalScore),
                border: `2px solid ${scoreColor(rt.totalScore)}`,
              }}
            >
              {formatScore(rt.totalScore)}
            </div>
          ) : (
            <div className="w-11 h-11 rounded-full flex items-center justify-center text-[10px] font-medium text-slate-500 border-2 border-slate-700 bg-slate-800/50">
              REPORT
            </div>
          )}
        </div>

        {/* Name + tags */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-slate-100 text-sm">{t.name}</span>
            {t.localeBase && (
              <span className="text-xs text-slate-500">{t.localeBase}</span>
            )}
            <span
              className="text-[10px] px-1.5 py-0.5 rounded"
              style={{ background: `${badge.color}22`, color: badge.color }}
            >
              {badge.label}
            </span>
            {t.coldWinter && (
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400">❄️</span>
            )}
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-700/50 text-slate-400">
              {t.region}
            </span>
          </div>
          <div className="flex items-center gap-3 mt-0.5 text-xs text-slate-500">
            <span className="font-mono">{formatRatio(t.ratio)}</span>
            <span style={{ color: growthColor(t.growthRate) }}>
              {t.growthRate > 0 ? '↑' : t.growthRate < 0 ? '↓' : '—'} {Math.abs(t.growthRate)}%
            </span>
            <span className="text-slate-600">{(t.population / 1_000_000).toFixed(1)}M</span>
            {t.publishers && (
              <span className="text-slate-600">{t.publishers.toLocaleString()} pub</span>
            )}
          </div>
        </div>
      </button>

      {/* Expanded detail — only for scored territories */}
      {expanded && isScored && (
        <div className="px-4 pb-3 pt-1 grid gap-1.5">
          {(t as ScoredTerritory).scores && CRITERIA.map((def) => {
            const cs = (t as ScoredTerritory).scores[def.key];
            const weight = weights[def.key];
            return (
              <div key={def.key} className="flex items-start gap-3 py-0.5">
                <div className="w-36 flex items-center gap-2 shrink-0 pt-0.5">
                  <span className="text-sm">{def.icon}</span>
                  <div>
                    <span className="text-xs text-slate-300">{def.label}</span>
                    {weight > 0 && (
                      <span className="text-[10px] text-slate-600 ml-1">×{weight}</span>
                    )}
                  </div>
                </div>
                <div className="shrink-0 w-10">
                  <span className="text-xs font-bold" style={{ color: scoreColor(cs.score) }}>
                    {cs.score}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-slate-400">{cs.rationale}</div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Expanded detail — for report-only territories */}
      {expanded && !isScored && (
        <div className="px-4 pb-3 pt-1">
          <div className="text-xs text-slate-500 italic">
            Report data only — not yet scored across the 7 criteria.
            Population {(t.population / 1_000_000).toFixed(1)}M · {t.publishers?.toLocaleString() || 'N/A'} publishers · ratio {formatRatio(t.ratio)} · growth {t.growthRate > 0 ? '+' : ''}{t.growthRate}%
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
      className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
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
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = useMemo(
    () => applyFilters(SEED_DATASET.territories, filters),
    [filters],
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

  const applyPreset = useCallback((presetWeights: Weights) => {
    setWeights(presetWeights);
  }, []);

  const totalTerritories = SEED_DATASET.territories.length;
  const scoredCount = SEED_DATASET.territories.filter((t) => t.tier === 'full').length;

  // For ratio slider bounds
  const maxRatioInData = Math.max(...SEED_DATASET.territories.map((t) => t.ratio));

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
              {totalTerritories} territories · {scoredCount} fully scored · Dataset v{SEED_DATASET.version}
            </p>
          </div>
          <div className="text-xs text-slate-600">
            Showing {ranked.length} of {totalTerritories}
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-4 flex flex-col lg:flex-row gap-4">
        {/* Sidebar — Controls */}
        <aside className="lg:w-72 shrink-0 space-y-3">
          {/* Presets */}
          <div className="bg-slate-900/50 rounded-xl border border-slate-800 p-3">
            <h2 className="text-[10px] font-semibold text-slate-500 uppercase tracking-wide mb-2">Presets</h2>
            <div className="flex flex-wrap gap-1.5">
              {PRESETS.map((p) => (
                <button
                  key={p.name}
                  onClick={() => applyPreset(p.weights)}
                  title={p.description}
                  className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] text-slate-300 transition-colors"
                >
                  {p.name}
                </button>
              ))}
            </div>
          </div>

          {/* Weights */}
          <div className="bg-slate-900/50 rounded-xl border border-slate-800 p-3">
            <h2 className="text-[10px] font-semibold text-slate-500 uppercase tracking-wide mb-1">
              Criterion Weights
            </h2>
            <div className="space-y-0.5">
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
          <div className="bg-slate-900/50 rounded-xl border border-slate-800 p-3">
            <h2 className="text-[10px] font-semibold text-slate-500 uppercase tracking-wide mb-2">
              Filters
            </h2>
            <div className="flex flex-wrap gap-1.5 mb-3">
              <FilterChip label="Warm" icon="☀️" active={filters.warmOnly} onClick={() => toggleFilter('warmOnly')} />
              <FilterChip label="Open" icon="📖" active={filters.openOnly} onClick={() => toggleFilter('openOnly')} />
              <FilterChip label="No Conflict" icon="🛡️" active={filters.noConflict} onClick={() => toggleFilter('noConflict')} />
            </div>

            <div className="space-y-2">
              <RangeFilter
                label="Ratio (1:N)"
                icon="📊"
                min={0}
                max={Math.min(maxRatioInData, 800000)}
                step={500}
                currentMin={filters.minRatio === -Infinity ? 0 : filters.minRatio}
                currentMax={filters.maxRatio === Infinity ? Math.min(maxRatioInData, 800000) : filters.maxRatio}
                onChange={(min, max) => setFilters((prev) => ({ ...prev, minRatio: min, maxRatio: max }))}
                format={(v) => v >= 1000 ? `${(v / 1000).toFixed(0)}K` : `${v}`}
              />
              <RangeFilter
                label="Growth Rate %"
                icon="📈"
                min={-60}
                max={20}
                step={1}
                currentMin={filters.minGrowth === -Infinity ? -60 : filters.minGrowth}
                currentMax={filters.maxGrowth === Infinity ? 20 : filters.maxGrowth}
                onChange={(min, max) => setFilters((prev) => ({ ...prev, minGrowth: min, maxGrowth: max }))}
                format={(v) => `${v > 0 ? '+' : ''}${v}%`}
              />
            </div>
          </div>
        </aside>

        {/* Main — Ranked list */}
        <main className="flex-1 min-w-0">
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

          {/* Legend */}
          <div className="mt-3 text-xs text-slate-600 flex items-center gap-4 justify-center">
            <span>● Score = weighted total (1–10)</span>
            <span>● REPORT = report data only, not yet scored</span>
          </div>
        </main>
      </div>
    </div>
  );
}
