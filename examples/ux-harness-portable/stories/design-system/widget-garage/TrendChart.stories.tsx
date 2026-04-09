import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ResponsiveContainer, ComposedChart, CartesianGrid, XAxis, YAxis, Area, Line, Tooltip } from 'recharts';
import { colors } from '@/design-system/tokens';

// ─── Mock Data ──────────────────────────────────────────────────────────────

const trendData = [
  { date: 'Mar 8', metricA: 71, metricB: 84 },
  { date: 'Mar 15', metricA: 73, metricB: 86 },
  { date: 'Mar 22', metricA: 74, metricB: 85 },
  { date: 'Mar 29', metricA: 76, metricB: 88 },
  { date: 'Apr 5', metricA: 78, metricB: 91 },
  { date: 'Apr 12', metricA: 79, metricB: 90 },
  { date: 'Apr 19', metricA: 81, metricB: 93 },
  { date: 'Apr 26', metricA: 82, metricB: 92 },
];

const flatData = [
  { date: 'Mar 8', metricA: 62, metricB: 71 },
  { date: 'Mar 15', metricA: 61, metricB: 70 },
  { date: 'Mar 22', metricA: 63, metricB: 72 },
  { date: 'Mar 29', metricA: 62, metricB: 69 },
  { date: 'Apr 5', metricA: 64, metricB: 71 },
  { date: 'Apr 12', metricA: 63, metricB: 70 },
  { date: 'Apr 19', metricA: 62, metricB: 72 },
  { date: 'Apr 26', metricA: 63, metricB: 71 },
];

// ─── Tooltip ────────────────────────────────────────────────────────────────

const ChartTooltip: React.FC<{ active?: boolean; payload?: Array<{ name: string; value: number; color: string }>; label?: string }> = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-bg-default border border-bd-default rounded-lg p-3 shadow-lg">
      <p className="text-xs font-medium text-tx-strong mb-1.5">{label}</p>
      {payload.filter((e) => e.name !== undefined).reduce<Array<{ name: string; value: number; color: string }>>((acc, entry) => {
        if (!acc.find((a) => a.name === entry.name)) acc.push(entry);
        return acc;
      }, []).map((entry) => (
        <div key={entry.name} className="flex items-center gap-2 text-xs">
          <div className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ backgroundColor: entry.color }} />
          <span className="text-tx-weak">{entry.name}:</span>
          <span className="text-tx-strong font-medium">{entry.value.toFixed(1)}%</span>
        </div>
      ))}
    </div>
  );
};

// ─── Chart Card ─────────────────────────────────────────────────────────────

const lines = [
  { dataKey: 'metricA', name: 'Metric A', stroke: colors.chart.coverage, showGradient: true },
  { dataKey: 'metricB', name: 'Metric B', stroke: colors.chart.pass, showGradient: true },
];

const presets = [7, 30, 90] as const;

const TrendChart: React.FC<{ data: typeof trendData; title: string; activePreset?: number }> = ({ data, title, activePreset = 30 }) => (
  <div className="bg-bg-default border border-bd-default rounded-lg">
    <div className="px-6 py-4 border-b border-bd-default flex items-center justify-between">
      <h2 className="text-lg font-semibold text-tx-strong">{title}</h2>
      <div className="flex items-center gap-1.5">
        {presets.map((d) => (
          <button
            key={d}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
              d === activePreset
                ? 'bg-interactive-selected text-interactive-selected-text'
                : 'bg-bg-elevated text-tx-default hover:bg-interactive-hover border border-bd-default'
            }`}
          >
            {d}d
          </button>
        ))}
      </div>
    </div>
    <div className="p-6">
      <ResponsiveContainer width="100%" height={280}>
        <ComposedChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
          <defs>
            {lines.filter((l) => l.showGradient).map((l) => (
              <linearGradient key={l.dataKey} id={`grad-${l.dataKey}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={l.stroke} stopOpacity={0.15} />
                <stop offset="95%" stopColor={l.stroke} stopOpacity={0.02} />
              </linearGradient>
            ))}
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke={colors.chart.grid} vertical={false} />
          <XAxis dataKey="date" tick={{ fontSize: 11, fill: colors.chart.axis }} axisLine={false} tickLine={false} />
          <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: colors.chart.axis }} axisLine={false} tickLine={false} />
          <Tooltip content={<ChartTooltip />} />
          {lines.map((l) => (
            <Area
              key={`area-${l.dataKey}`}
              type="monotone"
              dataKey={l.dataKey}
              name={l.name}
              stroke="transparent"
              fill={`url(#grad-${l.dataKey})`}
              connectNulls
              isAnimationActive={false}
              baseValue={0}
            />
          ))}
          {lines.map((l) => (
            <Line
              key={`line-${l.dataKey}`}
              type="monotone"
              dataKey={l.dataKey}
              name={l.name}
              stroke={l.stroke}
              strokeWidth={2}
              dot={false}
              connectNulls
              isAnimationActive={false}
            />
          ))}
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  </div>
);

// ─── Empty State ────────────────────────────────────────────────────────────

const EmptyChart: React.FC = () => (
  <div className="bg-bg-default border border-bd-default rounded-lg">
    <div className="px-6 py-4 border-b border-bd-default">
      <h2 className="text-lg font-semibold text-tx-strong">Trend Chart</h2>
    </div>
    <div className="p-6 flex flex-col items-center justify-center py-16">
      <div className="w-12 h-12 rounded-lg bg-bg-elevated flex items-center justify-center text-tx-weak mb-3">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      </div>
      <p className="text-sm font-medium text-tx-strong mb-1">No data available</p>
      <p className="text-xs text-tx-weak text-center max-w-xs">Try expanding the date range or check that your data source is configured.</p>
    </div>
  </div>
);

// ─── Info Panel ─────────────────────────────────────────────────────────────

const Token: React.FC<{ children: string }> = ({ children }) => (
  <code className="text-[10px] font-mono text-tx-primary bg-bg-elevated px-1.5 py-0.5 rounded">{children}</code>
);

const Info: React.FC<{ note: string; tokens?: string[] }> = ({ note, tokens }) => (
  <div className="mt-5 p-3 rounded-md bg-bg-sunken border border-bd-default">
    <p className="text-xs text-tx-weak">{note}</p>
    {tokens && (
      <div className="flex flex-wrap gap-1.5 mt-2">
        {tokens.map((t) => <Token key={t}>{t}</Token>)}
      </div>
    )}
  </div>
);

// ─── Story ──────────────────────────────────────────────────────────────────

const meta: Meta = {
  title: 'Widget Garage/Trend Chart',
  parameters: { layout: 'fullscreen' },
  decorators: [(Story) => (
    <div className="min-h-screen bg-bg-page p-8 flex items-start justify-center">
      <div className="w-full max-w-2xl"><Story /></div>
    </div>
  )],
};

export default meta;

export const Rising: StoryObj = {
  render: () => (
    <>
      <TrendChart data={trendData} title="Trend Chart" />
      <Info
        note="Upward trend — both metrics climbing over 8 weeks. Lines use Recharts ComposedChart with gradient Area fills underneath. Date preset buttons act as a time-range selector."
        tokens={['colors.chart.coverage (#60a5fa)', 'colors.chart.pass (#86efac)', 'colors.chart.grid (#374151)']}
      />
    </>
  ),
};

export const Flat: StoryObj = {
  render: () => (
    <>
      <TrendChart data={flatData} title="Trend Chart" />
      <Info
        note="Flat trend — metrics hovering around the same value. No meaningful change over the period."
        tokens={['colors.chart.axis (#9ca3af)']}
      />
    </>
  ),
};

export const Empty: StoryObj = {
  name: 'No Data',
  render: () => (
    <>
      <EmptyChart />
      <Info
        note="Empty state when no data is available. Shows an icon, message, and suggestion to expand the date range."
        tokens={['bg-bg-elevated', 'text-tx-weak']}
      />
    </>
  ),
};
