import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Activity, Percent } from 'lucide-react';

// ─── Circular Gauge (matches DualMetricCard) ────────────────────────────────

const R = 28;
const C = 2 * Math.PI * R;

const CircleGauge: React.FC<{ value: number | null; threshold: number; icon: React.ReactNode; label: string }> = ({ value, threshold, icon, label }) => {
  const has = value != null;
  const offset = has ? C * (1 - value / 100) : C;
  const color = has && value >= threshold ? 'text-tx-primary' : 'text-tx-strong';

  return (
    <div className="flex items-center gap-2">
      <div className="flex-shrink-0 w-10 h-10 rounded-md bg-bg-elevated flex items-center justify-center text-tx-weak">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-2xl font-bold text-tx-strong leading-none">{has ? `${Math.round(value)}%` : 'N/A'}</div>
        <div className="text-xs text-tx-weak mt-1">{label}</div>
      </div>
      <div className="relative w-16 h-16 flex-shrink-0">
        <svg className="w-16 h-16 transform -rotate-90">
          <circle cx="32" cy="32" r={R} stroke="currentColor" strokeWidth="4" fill="none" className="text-bd-default" />
          {has && (
            <circle cx="32" cy="32" r={R} stroke="currentColor" strokeWidth="4" fill="none"
              strokeDasharray={C} strokeDashoffset={offset} className={color} strokeLinecap="round" />
          )}
        </svg>
      </div>
    </div>
  );
};

// ─── Dual Metric Card ──────────────────────────────────────────────────────

const DualMetricCard: React.FC<{ name: string; type: string; subtitle?: string; passRate: number | null; coverage: number | null }> = ({ name, type, subtitle, passRate, coverage }) => (
  <div className="rounded-lg border border-bd-default bg-bg-default overflow-hidden cursor-pointer hover:border-bd-primary hover:shadow-md transition-all">
    <div className="px-4 pt-4 pb-2 border-b border-bd-default">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-tx-strong truncate flex-1">{name}</h3>
        <span className="px-2 py-0.5 text-xs font-medium rounded-md bg-bg-elevated text-tx-default border border-bd-default flex-shrink-0 ml-2">{type}</span>
      </div>
      {subtitle && <p className="text-xs text-tx-weak mt-1 truncate">{subtitle}</p>}
    </div>
    <div className="p-4 grid grid-cols-2 gap-6">
      <CircleGauge value={passRate} threshold={90} icon={<Activity className="w-5 h-5" />} label="Pass Rate" />
      <CircleGauge value={coverage} threshold={80} icon={<Percent className="w-5 h-5" />} label="Coverage" />
    </div>
  </div>
);

// ─── Skeleton ──────────────────────────────────────────────────────────────

const CardSkeleton: React.FC = () => (
  <div className="rounded-lg border border-bd-default bg-bg-default overflow-hidden animate-pulse">
    <div className="px-4 pt-4 pb-2 border-b border-bd-default">
      <div className="flex items-center justify-between mb-2">
        <div className="h-5 bg-bg-elevated rounded w-32" />
        <div className="h-5 w-14 bg-bg-elevated rounded" />
      </div>
      <div className="h-3 bg-bg-elevated rounded w-24" />
    </div>
    <div className="p-4 space-y-3">
      <div className="h-12 bg-bg-elevated rounded" />
      <div className="h-12 bg-bg-elevated rounded" />
    </div>
  </div>
);

// ─── Story ─────────────────────────────────────────────────────────────────

// ─── Info Panel ────────────────────────────────────────────────────────────

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

// ─── Story ─────────────────────────────────────────────────────────────────

const meta: Meta = {
  title: 'Widget Garage/Metric Card',
  parameters: { layout: 'fullscreen' },
  decorators: [(Story) => (
    <div className="min-h-screen bg-bg-page p-8 flex items-start justify-center">
      <div className="w-full max-w-lg"><Story /></div>
    </div>
  )],
};

export default meta;

export const Healthy: StoryObj = {
  render: () => (
    <>
      <DualMetricCard name="Sample Item" type="type-a" subtitle="Group • Owner" passRate={96} coverage={92} />
      <Info
        note="Both metrics above threshold — first metric >= 90% and second >= 80% activate the accent ring color."
        tokens={['text-tx-primary', 'text-bd-default']}
      />
    </>
  ),
};

export const Warning: StoryObj = {
  render: () => (
    <>
      <DualMetricCard name="Sample Item" type="type-b" subtitle="Group" passRate={72} coverage={58} />
      <Info
        note="Below threshold — rings fall back to text-tx-strong. First metric threshold is 90%, second is 80%."
        tokens={['text-tx-strong']}
      />
    </>
  ),
};

export const NoData: StoryObj = {
  name: 'No Data',
  render: () => (
    <>
      <DualMetricCard name="Sample Item" type="type-a" passRate={null} coverage={null} />
      <Info note="Null values render empty gauge tracks and 'N/A' labels. No progress circle is drawn." />
    </>
  ),
};

export const Loading: StoryObj = {
  render: () => (
    <>
      <CardSkeleton />
      <Info
        note="Skeleton placeholder with animate-pulse. Matches the header + metrics layout of the real card."
        tokens={['animate-pulse', 'bg-bg-elevated']}
      />
    </>
  ),
};
