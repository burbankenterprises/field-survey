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

// Slider range bounds
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

function clamp(v: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, v));
}

// --- Info Modal ---

function InfoModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto p-6 space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between">
          <h2 className="text-lg font-bold text-slate-100">
            📖 How to Use This Tool
          </h2>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-300 text-2xl leading-none"
          >
            ✕
          </button>
        </div>

        {/* What it is */}
        <div>
          <h3 className="text-sm font-semibold text-indigo-400 mb-1">What Is This?</h3>
          <p className="text-sm text-slate-400 leading-relaxed">
            This tool helps you identify and compare territories <strong className="text-slate-200">where the need is great</strong> —
            places where there are few publishers (preachers) relative to the population, meaning
            many people have not yet had the opportunity to hear Bible truth.
          </p>
        </div>

        {/* The ratio */}
        <div>
          <h3 className="text-sm font-semibold text-indigo-400 mb-1">Understanding the Ratio</h3>
          <p className="text-sm text-slate-400 leading-relaxed">
            The <strong className="text-slate-200">publisher-to-population ratio</strong> shows how
            many people there are for every one publisher. A ratio of <code className="text-indigo-300">1:10,000</code> means
            10,000 people for each publisher — a great need. A ratio of <code className="text-indigo-300">1:100</code> means
            the territory is already well-covered.
          </p>
        </div>

        {/* How to use */}
        <div>
          <h3 className="text-sm font-semibold text-indigo-400 mb-1">How to Use It</h3>
          <ul className="text-sm text-slate-400 space-y-2">
            <li>
              <strong className="text-slate-200">Adjust the weights</strong> to reflect what matters
              most to you — cost of living, safety, visa ease, language, climate, comfort, and field
              receptivity.
            </li>
            <li>
              <strong className="text-slate-200">Use the filters</strong> to narrow down:
              warm-climate only, open fields only, exclude conflict zones, and set ranges for ratio
              and growth rate.
            </li>
            <li>
              <strong className="text-slate-200">Tap any territory</strong> to see the full
              breakdown of how each criterion was scored and why.
            </li>
            <li>
              The list <strong className="text-slate-200">re-sorts live</strong> as you adjust —
              your highest-scoring territories rise to the top.
            </li>
          </ul>
        </div>

        {/* Field status */}
        <div>
          <h3 className="text-sm font-semibold text-indigo-400 mb-1">Field Status</h3>
          <div className="text-sm text-slate-400 space-y-1">
            <div><span className="text-green-400">🟢 Open</span> — The field is open; preaching work is legally permitted</div>
            <div><span className="text-yellow-400">🟡 Restricted</span> — There are legal limits on the ministry</div>
            <div><span className="text-red-400">🔴 Conflict</span> — Active conflict makes the territory unsafe</div>
          </div>
        </div>

        {/* How it's built */}
        <div>
          <h3 className="text-sm font-semibold text-indigo-400 mb-1">How It's Built</h3>
          <p className="text-sm text-slate-400 leading-relaxed">
            Territory data comes from the <strong className="text-slate-200">2025 Service Year Report</strong> of
            Jehovah's Witnesses (population, publishers, ratio, growth rate). Each territory is scored
            across 7 criteria using a <strong className="text-slate-200">deterministic rubric</strong> —
            the same inputs always produce the same scores. The scoring categories (cost of living,
            safety, visa difficulty, language, climate, infrastructure, healthcare, and religious
            freedom) are based on public data from sources like the US State Department, Numbeo, EF
            English Proficiency Index, and Köppen climate classifications.
          </p>
          <p className="text-sm text-slate-400 leading-relaxed mt-2">
            The scoring rubric is open and transparent — every score traces back to categorical data
            that you can review. Scores are updated monthly through an automated pipeline.
          </p>
        </div>

        {/* Data note */}
        <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
          <p className="text-xs text-slate-500 leading-relaxed">
            <strong className="text-slate-400">Note:</strong> Scores are a starting point for
            research, not a definitive judgment. The decision of where to serve is deeply personal
            and should be made with prayerful consideration and guidance from the local congregation
            elders. Always verify current conditions before making plans. — Matthew 9:37, 38
          </p>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-colors"
        >
          Got it — let me explore
        </button>
      </div>
    </div>
  );
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
        <div className="w-7 text-center shrink-0">
          <span className={`text-base font-bold ${rt.rank <= 3 ? 'text-indigo-400' : 'text-slate-600'}`}>
            {rt.rank}
          </span>
        </div>

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
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-[10px] font-mono font-medium text-slate-400 border-2 border-slate-700 bg-slate-800/50 leading-tight text-center"
            >
              1:{t.ratio >= 1000 ? `${(t.ratio / 1000).toFixed(0)}K` : t.ratio}
            </div>
          )}
        </div>

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

      {expanded && !isScored && (
        <div className="px-4 pb-3 pt-1 text-sm text-slate-500">
          <div className="border-t border-slate-800/50 pt-2">
            <p>
              {t.publishers?.toLocaleString()} publishers · {(t.population / 1_000_000).toFixed(1)}M population · {t.region}
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
  const [showInfo, setShowInfo] = useState(false);

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

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      {/* Info Modal */}
      {showInfo && <InfoModal onClose={() => setShowInfo(false)} />}

      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h1 className="text-base sm:text-lg font-bold text-slate-100 flex items-center gap-2">
              📖 Where the Need Is Great
            </h1>
            <p className="text-xs text-slate-500 hidden sm:block">
              {totalTerritories} territories · ranked by your priorities
            </p>
          </div>
          <button
            onClick={() => setShowInfo(true)}
            className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-sm hover:bg-slate-700 transition-colors flex items-center gap-1.5 shrink-0"
          >
            <span>ℹ️</span>
            <span className="hidden sm:inline">How it works</span>
          </button>
          <button
            onClick={() => setShowControls(!showControls)}
            className="lg:hidden px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-sm shrink-0"
          >
            {showControls ? '✕' : '☰'}
          </button>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-4 flex flex-col lg:flex-row gap-4">
        {/* Sidebar */}
        {showControls && (
          <aside className="lg:w-80 shrink-0 space-y-3">
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
          </aside>
        )}

        {/* List */}
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
