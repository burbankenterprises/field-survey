import { useState, useMemo, useCallback } from 'react';
import { SEED_DATASET } from './data/seed';
import {
  type Weights,
  type Filters,
  type RankedTerritory,
  type CriterionKey,
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
      <div className="w-40 flex items-center gap-2 shrink-0">
        <span className="text-lg">{def.icon}</span>
        <div>
          <div className="text-sm font-medium text-slate-200">{def.label}</div>
        </div>
      </div>
      <input
        type="range"
        min={0}
        max={10}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="flex-1"
      />
      <span className="w-8 text-center text-sm font-mono text-slate-400">{value}</span>
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
  const badge = statusBadge(t.status);

  return (
    <div
      className={`territory-row border-b border-slate-800 ${expanded ? 'bg-slate-800/40' : 'hover:bg-slate-800/20'}`}
    >
      {/* Header row */}
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-4 px-4 py-3 text-left"
      >
        {/* Rank */}
        <div className="w-8 text-center shrink-0">
          <span className={`text-lg font-bold ${rt.rank <= 3 ? 'text-indigo-400' : 'text-slate-500'}`}>
            {rt.rank}
          </span>
        </div>

        {/* Score circle */}
        <div className="shrink-0">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold"
            style={{
              background: `${scoreColor(rt.totalScore)}22`,
              color: scoreColor(rt.totalScore),
              border: `2px solid ${scoreColor(rt.totalScore)}`,
            }}
          >
            {formatScore(rt.totalScore)}
          </div>
        </div>

        {/* Name + tags */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-slate-100">{t.name}</span>
            <span className="text-xs text-slate-500">{t.localeBase}</span>
            <span
              className="text-xs px-1.5 py-0.5 rounded"
              style={{ background: `${badge.color}22`, color: badge.color }}
            >
              {badge.label}
            </span>
            {t.coldWinter && (
              <span className="text-xs px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400">❄️ Cold</span>
            )}
          </div>
          <div className="flex items-center gap-3 mt-0.5 text-xs text-slate-500">
            <span>1:{t.ratio.toLocaleString()}</span>
            <span style={{ color: growthColor(t.growthRate) }}>
              {t.growthRate > 0 ? '+' : ''}{t.growthRate}% growth
            </span>
            <span>{(t.population / 1_000_000).toFixed(1)}M pop</span>
          </div>
        </div>

        {/* Expand arrow */}
        <div className={`text-slate-500 transition-transform ${expanded ? 'rotate-90' : ''}`}>
          ▶
        </div>
      </button>

      {/* Expanded detail */}
      {expanded && (
        <div className="px-4 pb-4 pt-1 grid gap-2">
          {CRITERIA.map((def) => {
            const cs = t.scores[def.key];
            const weight = weights[def.key];
            return (
              <div key={def.key} className="flex items-start gap-3 py-1">
                <div className="w-40 flex items-center gap-2 shrink-0 pt-0.5">
                  <span>{def.icon}</span>
                  <div>
                    <span className="text-sm text-slate-300">{def.label}</span>
                    {weight > 0 && (
                      <span className="text-xs text-slate-600 ml-1">×{weight}</span>
                    )}
                  </div>
                </div>
                <div className="shrink-0 w-12">
                  <span
                    className="text-sm font-bold"
                    style={{ color: scoreColor(cs.score) }}
                  >
                    {cs.score}/10
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-slate-400">{cs.rationale}</div>
                  <div className="text-xs text-slate-600 mt-0.5">
                    {cs.source.split('(')[0].trim()} · as of {cs.asOf}
                  </div>
                </div>
              </div>
            );
          })}
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
  count,
}: {
  label: string;
  icon: string;
  active: boolean;
  onClick: () => void;
  count?: number;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
        active
          ? 'bg-indigo-600 text-white'
          : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
      }`}
    >
      <span>{icon}</span>
      <span>{label}</span>
      {count !== undefined && (
        <span className={`text-xs ${active ? 'text-indigo-200' : 'text-slate-600'}`}>
          {count}
        </span>
      )}
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

  const toggleFilter = useCallback((key: keyof Filters) => {
    setFilters((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  const applyPreset = useCallback((presetWeights: Weights) => {
    setWeights(presetWeights);
  }, []);

  const totalTerritories = SEED_DATASET.territories.length;

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-slate-100 flex items-center gap-2">
              📖 Field Survey
            </h1>
            <p className="text-xs text-slate-500">
              Weighted relocation scorecard · Dataset v{SEED_DATASET.version} · {totalTerritories} territories
            </p>
          </div>
          <div className="text-xs text-slate-600">
            Showing {ranked.length} of {totalTerritories}
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-4 flex flex-col lg:flex-row gap-4">
        {/* Sidebar — Controls */}
        <aside className="lg:w-80 shrink-0 space-y-4">
          {/* Presets */}
          <div className="bg-slate-900/50 rounded-xl border border-slate-800 p-3">
            <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Presets</h2>
            <div className="flex flex-wrap gap-2">
              {PRESETS.map((p) => (
                <button
                  key={p.name}
                  onClick={() => applyPreset(p.weights)}
                  title={p.description}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 transition-colors"
                >
                  {p.name}
                </button>
              ))}
            </div>
          </div>

          {/* Weights */}
          <div className="bg-slate-900/50 rounded-xl border border-slate-800 p-3">
            <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
              Weights
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
            <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
              Filters
            </h2>
            <div className="flex flex-wrap gap-2">
              <FilterChip
                label="Warm winters"
                icon="☀️"
                active={filters.warmOnly}
                onClick={() => toggleFilter('warmOnly')}
              />
              <FilterChip
                label="Open field"
                icon="📖"
                active={filters.openOnly}
                onClick={() => toggleFilter('openOnly')}
              />
              <FilterChip
                label="No conflict"
                icon="🛡️"
                active={filters.noConflict}
                onClick={() => toggleFilter('noConflict')}
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
        </main>
      </div>
    </div>
  );
}
