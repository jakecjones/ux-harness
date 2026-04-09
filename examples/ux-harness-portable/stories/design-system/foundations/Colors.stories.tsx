import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { colors } from '@/design-system/tokens';
import { Square, Circle, Triangle, Hexagon, Diamond } from 'lucide-react';

// ─── Swatch ──────────────────────────────────────────────────────────────────

const Swatch: React.FC<{
  name: string;
  value: string;
  tailwindClass: string;
  mode?: 'bg' | 'text' | 'border';
}> = ({ name, value, tailwindClass, mode = 'bg' }) => {
  const [copied, setCopied] = useState(false);
  const isAlpha = value.includes('rgba');

  const copy = () => {
    navigator.clipboard.writeText(tailwindClass);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <button onClick={copy} title={`${tailwindClass}\n${value}`} className="group text-left cursor-pointer">
      <div
        className="h-14 rounded-lg border border-bd-default overflow-hidden relative transition-transform group-hover:scale-105"
        style={
          isAlpha
            ? { background: `linear-gradient(${value}, ${value}), repeating-conic-gradient(#374151 0% 25%, #1f2937 0% 50%) 50%/12px 12px` }
            : mode === 'text'
              ? { backgroundColor: '#111827' }
              : mode === 'border'
                ? { backgroundColor: '#111827' }
                : { backgroundColor: value }
        }
      >
        {mode === 'text' && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-base font-semibold" style={{ color: value }}>Aa</span>
          </div>
        )}
        {mode === 'border' && (
          <div className="absolute inset-2 rounded border-2" style={{ borderColor: value }} />
        )}
        {copied && (
          <div className="absolute inset-0 bg-bg-overlay flex items-center justify-center">
            <span className="text-[10px] font-medium text-status-success-text">Copied!</span>
          </div>
        )}
      </div>
      <p className="text-[11px] font-medium text-tx-default mt-1.5 truncate">{name}</p>
      <p className="text-[10px] font-mono text-tx-muted truncate opacity-0 group-hover:opacity-100 transition-opacity">{value}</p>
    </button>
  );
};

// ─── Section ─────────────────────────────────────────────────────────────────

const Section: React.FC<{ title: string; usage: string; children: React.ReactNode }> = ({ title, usage, children }) => (
  <section className="mb-14">
    <div className="flex items-baseline gap-3 mb-5">
      <h2 className="text-base font-semibold text-tx-strong">{title}</h2>
      <code className="text-[11px] font-mono text-tx-muted">{usage}</code>
    </div>
    {children}
  </section>
);

// ─── Status Strip ────────────────────────────────────────────────────────────

const StatusStrip: React.FC<{ status: string; tokens: typeof colors.status.success }> = ({ status, tokens }) => {
  const [copied, setCopied] = useState<string | null>(null);

  const copy = (tw: string, key: string) => {
    navigator.clipboard.writeText(tw);
    setCopied(key);
    setTimeout(() => setCopied(null), 1200);
  };

  const variants = [
    { key: 'bg', value: tokens.bg, tw: `bg-status-${status}-bg` },
    { key: 'subtle', value: tokens.bgSubtle, tw: `bg-status-${status}-bg-subtle` },
    { key: 'text', value: tokens.text, tw: `text-status-${status}-text` },
  ];

  return (
    <div className="flex items-center gap-1.5">
      <span className="w-16 text-xs font-medium text-tx-default capitalize flex-shrink-0">{status}</span>
      {variants.map(v => (
        <button
          key={v.key}
          onClick={() => copy(v.tw, `${status}-${v.key}`)}
          title={v.tw}
          className="flex-1 h-10 rounded-md border border-bd-default cursor-pointer transition-transform hover:scale-105 relative overflow-hidden"
          style={
            v.key === 'text' || v.key === 'icon'
              ? { backgroundColor: '#111827' }
              : v.value.includes('rgba')
                ? { background: `linear-gradient(${v.value}, ${v.value}), repeating-conic-gradient(#374151 0% 25%, #1f2937 0% 50%) 50%/10px 10px` }
                : { backgroundColor: v.value }
          }
        >
          {(v.key === 'text' || v.key === 'icon') && (
            <span className="absolute inset-0 flex items-center justify-center text-xs font-bold" style={{ color: v.value }}>Aa</span>
          )}
          {v.key === 'border' && (
            <div className="absolute inset-1.5 rounded border-2" style={{ borderColor: v.value }} />
          )}
          {copied === `${status}-${v.key}` && (
            <div className="absolute inset-0 bg-bg-overlay flex items-center justify-center">
              <span className="text-[9px] text-status-success-text">Copied!</span>
            </div>
          )}
        </button>
      ))}
    </div>
  );
};

// ─── DataType Strip ──────────────────────────────────────────────────────────

const dataTypeIconDef: Record<string, { Icon: React.FC<{ className?: string }>; fill: string; text: string }> = {
  blue: { Icon: Square, fill: 'fill-dt-blue-subtle', text: 'text-dt-blue-text' },
  purple: { Icon: Hexagon, fill: 'fill-dt-purple-subtle', text: 'text-dt-purple-text' },
  green: { Icon: Circle, fill: 'fill-dt-green-subtle', text: 'text-dt-green-text' },
  yellow: { Icon: Triangle, fill: 'fill-dt-yellow-subtle', text: 'text-dt-yellow-text' },
  orange: { Icon: Diamond, fill: 'fill-dt-orange-subtle', text: 'text-dt-orange-text' },
};

const DataTypeIcon: React.FC<{ entity: string }> = ({ entity }) => {
  const def = dataTypeIconDef[entity];
  if (!def) return null;
  const { Icon, fill, text } = def;
  return (
    <svg width="24" height="24" viewBox="0 0 37 37" fill="none" className="flex-shrink-0">
      <circle cx="18.5" cy="18.5" r="18.5" className={fill} />
      <Icon className={text} x="9" y="9" width="19" height="19" />
    </svg>
  );
};

const DataTypeStrip: React.FC<{ entity: string; tokens: typeof colors.dataType.blue }> = ({ entity, tokens }) => {
  const [copied, setCopied] = useState<string | null>(null);

  const variants = [
    { key: 'base', value: tokens.base, tw: `bg-dt-${entity}-base` },
    { key: 'subtle', value: tokens.subtle, tw: `bg-dt-${entity}-subtle` },
    { key: 'text', value: tokens.text, tw: `text-dt-${entity}-text` },
  ];

  const copy = (tw: string, key: string) => {
    navigator.clipboard.writeText(tw);
    setCopied(key);
    setTimeout(() => setCopied(null), 1200);
  };

  return (
    <div className="flex items-center gap-1.5">
      <div className="w-28 flex items-center gap-2 flex-shrink-0">
        <DataTypeIcon entity={entity} />
        <span className="text-xs font-medium text-tx-default capitalize">{entity}</span>
      </div>
      {variants.map(v => (
        <button
          key={v.key}
          onClick={() => copy(v.tw, `${entity}-${v.key}`)}
          title={v.tw}
          className="flex-1 h-10 rounded-md border border-bd-default cursor-pointer transition-transform hover:scale-105 relative overflow-hidden"
          style={
            v.key === 'text'
              ? { backgroundColor: '#111827' }
              : v.value.includes('rgba')
                ? { background: `linear-gradient(${v.value}, ${v.value}), repeating-conic-gradient(#374151 0% 25%, #1f2937 0% 50%) 50%/10px 10px` }
                : { backgroundColor: v.value }
          }
        >
          {v.key === 'text' && (
            <span className="absolute inset-0 flex items-center justify-center text-xs font-bold" style={{ color: v.value }}>Aa</span>
          )}
          {copied === `${entity}-${v.key}` && (
            <div className="absolute inset-0 bg-bg-overlay flex items-center justify-center">
              <span className="text-[9px] text-status-success-text">Copied!</span>
            </div>
          )}
        </button>
      ))}
    </div>
  );
};

// ─── Colors Page ─────────────────────────────────────────────────────────────

const ColorsPage: React.FC = () => (
  <div className="min-h-screen bg-bg-page p-10 max-w-5xl mx-auto">
    {/* Header */}
    <div className="mb-12">
      <h1 className="text-2xl font-bold text-tx-strong">Colors</h1>
      <p className="text-sm text-tx-weak mt-1">
        Semantic design tokens — click any swatch to copy its Tailwind class.
      </p>

      {/* How to Use */}
      <div className="mt-6 grid grid-cols-2 gap-3 max-w-2xl">
        {[
          { label: 'Card surface', code: 'bg-bg-default' },
          { label: 'Heading text', code: 'text-tx-strong' },
          { label: 'Body text', code: 'text-tx-default' },
          { label: 'Card border', code: 'border-bd-default' },
          { label: 'Primary action', code: 'bg-brand-primary' },
          { label: 'Error message', code: 'text-status-critical-text' },
        ].map(ex => (
          <button
            key={ex.code}
            className="flex items-center justify-between px-3 py-2 rounded-md bg-bg-sunken border border-bd-default hover:border-bd-primary transition-colors cursor-pointer text-left"
            onClick={() => navigator.clipboard.writeText(ex.code)}
            title="Click to copy"
          >
            <span className="text-xs text-tx-weak">{ex.label}</span>
            <code className="text-xs font-mono text-tx-primary">{ex.code}</code>
          </button>
        ))}
      </div>
    </div>

    {/* Background */}
    <Section title="Background" usage="bg-bg-{name}">
      <div className="grid grid-cols-6 gap-3">
        {Object.entries(colors.background).map(([name, value]) => (
          <Swatch key={name} name={name} value={value} tailwindClass={`bg-bg-${name}`} />
        ))}
      </div>
    </Section>

    {/* Text */}
    <Section title="Text" usage="text-tx-{name}">
      <div className="grid grid-cols-6 gap-3">
        {Object.entries(colors.text).map(([name, value]) => (
          <Swatch key={name} name={name} value={value} tailwindClass={`text-tx-${name}`} mode="text" />
        ))}
      </div>
    </Section>

    {/* Border */}
    <Section title="Border" usage="border-bd-{name}">
      <div className="grid grid-cols-7 gap-3">
        {Object.entries(colors.border).map(([name, value]) => (
          <Swatch key={name} name={name} value={value} tailwindClass={`border-bd-${name}`} mode="border" />
        ))}
      </div>
    </Section>

    {/* Icon */}
    <Section title="Icon" usage="text-icon-{name}">
      <div className="grid grid-cols-8 gap-3">
        {Object.entries(colors.icon).map(([name, value]) => (
          <Swatch key={name} name={name} value={value} tailwindClass={`text-icon-${name}`} mode="text" />
        ))}
      </div>
    </Section>

    {/* Brand */}
    <Section title="Brand" usage="bg-brand-{name}">
      <div className="grid grid-cols-6 gap-3">
        {Object.entries(colors.brand).map(([name, value]) => {
          const cssName = name.replace(/([A-Z])/g, '-$1').toLowerCase();
          return <Swatch key={name} name={name} value={value} tailwindClass={`bg-brand-${cssName}`} />;
        })}
      </div>
    </Section>

    {/* Status */}
    <Section title="Status" usage="bg-status-{name}-bg · text-status-{name}-text">
      <p className="text-sm text-tx-weak mb-4 -mt-3">
        Five semantic levels, each with five token slots. Backgrounds use translucent rgba so they blend with any surface.
        Compose badges with <code className="text-tx-primary font-mono text-xs">bg-status-[level]-bg</code> + <code className="text-tx-primary font-mono text-xs">text-status-[level]-text</code>.
      </p>

      {/* Token grid */}
      <div className="space-y-2 mb-6">
        <div className="flex items-center gap-1.5">
          <span className="w-16 flex-shrink-0" />
          {['bg', 'subtle', 'text'].map(h => (
            <span key={h} className="flex-1 text-[9px] font-mono text-tx-muted text-center uppercase">{h}</span>
          ))}
        </div>
        <StatusStrip status="success" tokens={colors.status.success} />
        <StatusStrip status="warning" tokens={colors.status.warning} />
        <StatusStrip status="critical" tokens={colors.status.critical} />
        <StatusStrip status="info" tokens={colors.status.info} />
        <StatusStrip status="neutral" tokens={colors.status.neutral} />
      </div>

      {/* How they compose */}
      <div className="rounded-lg border border-bd-default bg-bg-sunken p-4 space-y-3">
        <p className="text-xs font-medium text-tx-strong">How they compose</p>
        <div className="grid grid-cols-5 gap-3">
          <div className="flex flex-col items-center gap-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-semibold bg-status-success-bg text-status-success-text">Healthy</span>
            <code className="text-[9px] font-mono text-tx-muted">success</code>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-semibold bg-status-warning-bg text-status-warning-text">Warning</span>
            <code className="text-[9px] font-mono text-tx-muted">warning</code>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-semibold bg-status-critical-bg text-status-critical-text">Critical</span>
            <code className="text-[9px] font-mono text-tx-muted">critical</code>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-semibold bg-status-info-bg text-status-info-text">Info</span>
            <code className="text-[9px] font-mono text-tx-muted">info</code>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-semibold bg-status-neutral-bg text-status-neutral-text">Neutral</span>
            <code className="text-[9px] font-mono text-tx-muted">neutral</code>
          </div>
        </div>
        <div className="mt-3 space-y-1.5">
          <p className="text-[11px] text-tx-weak"><span className="font-medium text-tx-default">bg</span> — Translucent fill for badges, banners, and cards</p>
          <p className="text-[11px] text-tx-weak"><span className="font-medium text-tx-default">subtle</span> — Even lighter fill for backgrounds and hover states</p>
          <p className="text-[11px] text-tx-weak"><span className="font-medium text-tx-default">text</span> — Light foreground color for labels and descriptions</p>
        </div>
      </div>
    </Section>

    {/* Categorical / Data Types */}
    <Section title="Categorical" usage="bg-dt-{color}-base · text-dt-{color}-text">
      <p className="text-sm text-tx-weak mb-4 -mt-3">
        Five neutral palette colors for tagging, grouping, or distinguishing entity types in the consuming app.
      </p>
      <div className="space-y-2">
        <div className="flex items-center gap-1.5">
          <span className="w-28 flex-shrink-0" />
          {['base', 'subtle', 'text'].map(h => (
            <span key={h} className="flex-1 text-[9px] font-mono text-tx-muted text-center uppercase">{h}</span>
          ))}
        </div>
        {Object.entries(colors.dataType).filter(([entity]) => entity !== 'default').map(([entity, tokens]) => (
          <DataTypeStrip key={entity} entity={entity} tokens={tokens} />
        ))}
      </div>
    </Section>

    {/* Interactive */}
    <Section title="Interactive" usage="bg-interactive-{name}">
      <div className="grid grid-cols-6 gap-3">
        {Object.entries(colors.interactive).map(([name, value]) => {
          const cssName = name.replace(/([A-Z])/g, '-$1').toLowerCase();
          return <Swatch key={name} name={name} value={value} tailwindClass={`bg-interactive-${cssName}`} />;
        })}
      </div>
    </Section>

    {/* Chart */}
    <Section title="Chart" usage="Series 1–16 + semantic">
      <div className="flex gap-0.5">
        {colors.chart.series.map((color, i) => (
          <button
            key={i}
            className="flex-1 h-5 cursor-pointer transition-transform hover:scale-y-150 relative first:rounded-l-md last:rounded-r-md"
            style={{ backgroundColor: color }}
            title={`Series ${i + 1}: ${color}`}
            onClick={() => navigator.clipboard.writeText(color)}
          />
        ))}
      </div>
      <div className="flex gap-3 mt-3">
        {Object.entries(colors.chart)
          .filter(([k]) => k !== 'series')
          .map(([name, value]) => (
            <button
              key={name}
              className="flex items-center gap-1.5 cursor-pointer group"
              title={value as string}
              onClick={() => navigator.clipboard.writeText(value as string)}
            >
              <div className="w-3 h-3 rounded-sm flex-shrink-0" style={{ backgroundColor: value as string }} />
              <span className="text-[10px] font-mono text-tx-muted group-hover:text-tx-primary transition-colors">{name}</span>
            </button>
          ))}
      </div>
    </Section>

    {/* Scrollbar */}
    <Section title="Scrollbar" usage="CSS custom properties">
      <div className="grid grid-cols-3 gap-3 max-w-xs">
        {Object.entries(colors.scrollbar).map(([name, value]) => {
          const cssName = name.replace(/([A-Z])/g, '-$1').toLowerCase();
          return <Swatch key={name} name={name} value={value} tailwindClass={`var(--scrollbar-${cssName})`} />;
        })}
      </div>
    </Section>

    {/* Avoid */}
    <section className="mt-4 mb-10 p-5 rounded-lg border border-bd-default bg-bg-default">
      <h2 className="text-sm font-semibold text-tx-strong mb-3">Avoid</h2>
      <div className="space-y-2">
        {[
          { bad: 'bg-gray-800', good: 'bg-bg-default' },
          { bad: 'text-gray-50', good: 'text-tx-strong' },
          { bad: 'text-gray-400', good: 'text-tx-weak' },
          { bad: 'border-gray-700', good: 'border-bd-default' },
          { bad: 'bg-blue-600', good: 'bg-brand-primary' },
          { bad: 'text-red-300', good: 'text-status-critical-text' },
          { bad: 'bg-[#1f2937]', good: 'bg-bg-default' },
          { bad: 'text-[var(--header-text)]', good: 'text-tx-header' },
        ].map(row => (
          <div key={row.bad} className="flex items-center gap-3 text-xs font-mono">
            <code className="text-tx-muted line-through w-56">{row.bad}</code>
            <span className="text-tx-muted">→</span>
            <code className="text-tx-primary">{row.good}</code>
          </div>
        ))}
      </div>
    </section>
  </div>
);

// ─── Story ───────────────────────────────────────────────────────────────────

const meta: Meta = {
  title: 'Foundations/Colors',
  parameters: { layout: 'fullscreen' },
};

export default meta;

export const AllColors: StoryObj = {
  render: () => <ColorsPage />,
  name: 'Colors',
};
