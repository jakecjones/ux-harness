import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { borderRadius, shadows, colors } from '@/design-system/tokens';

// ─── Copy Helper ─────────────────────────────────────────────────────────────

const useCopy = () => {
  const [copied, setCopied] = useState<string | null>(null);
  const copy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 1200);
  };
  return { copied, copy };
};

// ─── Section ─────────────────────────────────────────────────────────────────

const Section: React.FC<{ title: string; description: string; children: React.ReactNode }> = ({ title, description, children }) => (
  <section className="mb-14">
    <div className="mb-5">
      <h2 className="text-base font-semibold text-tx-strong">{title}</h2>
      <p className="text-sm text-tx-weak mt-0.5">{description}</p>
    </div>
    {children}
  </section>
);

// ─── Radius names to Tailwind ────────────────────────────────────────────────

const radiusMap: Record<string, { tw: string; usage: string }> = {
  none:  { tw: 'rounded-none', usage: 'Reset / square edges' },
  sm:    { tw: 'rounded-sm',   usage: 'Subtle rounding' },
  md:    { tw: 'rounded-md',   usage: 'Inputs, dropdowns, small controls' },
  lg:    { tw: 'rounded-lg',   usage: 'Cards, modals, panels' },
  xl:    { tw: 'rounded-xl',   usage: 'Large containers' },
  '2xl': { tw: 'rounded-2xl',  usage: 'Hero panels, page cards' },
  round: { tw: 'rounded-xl', usage: 'Avatars, pills, badges, FABs' },
};

// ─── Shadow names to Tailwind ────────────────────────────────────────────────

const shadowMap: Record<string, { tw: string; usage: string }> = {
  none:  { tw: 'shadow-none',  usage: 'Reset / flat surfaces' },
  sm:    { tw: 'shadow-sm',    usage: 'Subtle lift — form cards, tooltips' },
  md:    { tw: 'shadow-md',    usage: 'Standard elevation — dropdowns, popovers' },
  lg:    { tw: 'shadow-lg',    usage: 'Prominent — modals, hover cards' },
  xl:    { tw: 'shadow-xl',    usage: 'High emphasis — dialogs, command palette' },
  '2xl': { tw: 'shadow-2xl',   usage: 'Maximum depth — fullscreen overlays' },
  focus: { tw: 'ring-2 ring-interactive-focus', usage: 'Focus indicator ring' },
};

// ─── Borders & Shadows Page ──────────────────────────────────────────────────

const BordersShadowsPage: React.FC = () => {
  const { copied, copy } = useCopy();

  return (
    <div className="min-h-screen bg-bg-page p-10 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-2xl font-bold text-tx-strong">Borders & Shadows</h1>
        <p className="text-sm text-tx-weak mt-1">
          Border radius, border colors, shadows, and elevation — click any item to copy.
        </p>
      </div>

      {/* Border Radius */}
      <Section title="Border Radius" description="7 steps from square to fully round. rounded-lg is the default for cards.">
        <div className="flex items-end gap-4">
          {Object.entries(borderRadius).map(([name, value]) => {
            const map = radiusMap[name];
            if (!map) return null;
            const size = name === 'round' ? 64 : 64;

            return (
              <button
                key={name}
                onClick={() => copy(map.tw, name)}
                className="group flex flex-col items-center gap-2 cursor-pointer"
                title={`Click to copy: ${map.tw}`}
              >
                <div
                  className="w-16 h-16 bg-bg-default border-2 transition-transform group-hover:scale-110"
                  style={{ borderRadius: value, borderColor: colors.text.primary }}
                />
                <p className="text-xs font-semibold text-tx-strong">{name}</p>
                <p className="text-[10px] font-mono text-tx-muted">{value}</p>
                <code className="text-[10px] font-mono text-tx-muted group-hover:text-tx-primary transition-colors">
                  {copied === name ? <span className="text-status-success-text">Copied!</span> : map.tw}
                </code>
              </button>
            );
          })}
        </div>

        {/* Usage guide */}
        <div className="mt-6 grid grid-cols-3 gap-3">
          {[
            { label: 'Cards & Modals', tw: 'rounded-lg', example: 'bg-bg-default border border-bd-default rounded-lg' },
            { label: 'Inputs & Dropdowns', tw: 'rounded-md', example: 'bg-bg-elevated border border-bd-default rounded-md' },
            { label: 'Badges & Pills', tw: 'rounded-xl', example: 'bg-brand-primary text-tx-header rounded-xl' },
          ].map(item => (
            <button
              key={item.label}
              onClick={() => copy(item.tw, item.label)}
              className="group flex items-center justify-between px-3 py-2.5 rounded-md bg-bg-default border border-bd-default hover:border-bd-primary transition-colors cursor-pointer text-left"
            >
              <span className="text-xs text-tx-default">{item.label}</span>
              <code className="text-[11px] font-mono text-tx-primary">
                {copied === item.label ? <span className="text-status-success-text">Copied!</span> : item.tw}
              </code>
            </button>
          ))}
        </div>
      </Section>

      {/* Border Colors */}
      <Section title="Border Colors" description="Semantic border roles. border-bd-default is the standard.">
        <div className="space-y-1">
          {Object.entries(colors.border).map(([name, value]) => {
            const tw = `border-bd-${name}`;
            return (
              <button
                key={name}
                onClick={() => copy(tw, `bd-${name}`)}
                className="group flex items-center gap-4 py-2.5 px-4 -mx-4 rounded-lg hover:bg-bg-default transition-colors cursor-pointer text-left w-full"
                title={`Click to copy: ${tw}`}
              >
                <span className="w-16 text-xs font-semibold text-tx-strong flex-shrink-0">{name}</span>
                <div className="flex-shrink-0 w-48 h-10 rounded-lg bg-bg-default border-2" style={{ borderColor: value }} />
                <span className="text-xs text-tx-weak flex-1">
                  {name === 'default' && 'Cards, inputs, dividers'}
                  {name === 'strong' && 'Emphasized borders, hover states'}
                  {name === 'weak' && 'Subtle dividers, nested separators'}
                  {name === 'primary' && 'Focus states, active selection'}
                  {name === 'critical' && 'Error inputs, destructive actions'}
                  {name === 'success' && 'Success indicators'}
                  {name === 'warning' && 'Warning indicators'}
                </span>
                <code className="text-[10px] font-mono text-tx-muted group-hover:text-tx-primary transition-colors flex-shrink-0">
                  {copied === `bd-${name}` ? <span className="text-status-success-text">Copied!</span> : tw}
                </code>
              </button>
            );
          })}
        </div>
      </Section>

      {/* Shadows */}
      <Section title="Shadows" description="6 elevation levels plus a focus ring. Dark mode shadows use higher opacity.">
        <div className="grid grid-cols-4 gap-4">
          {Object.entries(shadows).map(([name, value]) => {
            const map = shadowMap[name];
            if (!map) return null;

            return (
              <button
                key={name}
                onClick={() => copy(map.tw, `sh-${name}`)}
                className="group flex flex-col items-center gap-3 cursor-pointer"
                title={`Click to copy: ${map.tw}`}
              >
                <div
                  className="w-full h-20 rounded-lg bg-bg-default border border-bd-default transition-transform group-hover:scale-105"
                  style={name === 'focus'
                    ? { boxShadow: value, borderColor: colors.interactive.focus }
                    : { boxShadow: value }
                  }
                />
                <div className="text-center">
                  <p className="text-xs font-semibold text-tx-strong">{name}</p>
                  <p className="text-[10px] text-tx-weak mt-0.5">{map.usage}</p>
                  <code className="text-[10px] font-mono text-tx-muted group-hover:text-tx-primary transition-colors">
                    {copied === `sh-${name}` ? <span className="text-status-success-text">Copied!</span> : map.tw}
                  </code>
                </div>
              </button>
            );
          })}
        </div>
      </Section>

      {/* Elevation Stack */}
      <Section title="Elevation in Context" description="Each layer gets progressively lighter, with shadows added at floating layers.">
        <div className="grid grid-cols-5 gap-3">
          {[
            { level: '0', label: 'Page', bg: 'bg-bg-page', border: 'none', shadow: 'none', recipe: 'bg-bg-page', desc: 'Base canvas' },
            { level: '1', label: 'Card', bg: 'bg-bg-default', border: 'border border-bd-default', shadow: 'none', recipe: 'bg-bg-default border border-bd-default rounded-lg', desc: 'Primary surfaces' },
            { level: '2', label: 'Elevated', bg: 'bg-bg-elevated', border: 'border border-bd-strong', shadow: 'none', recipe: 'bg-bg-elevated border border-bd-strong rounded-md', desc: 'Nested panels, sub-cards' },
            { level: '3', label: 'Dropdown', bg: 'bg-bg-elevated', border: 'border border-bd-strong', shadow: 'shadow-lg', recipe: 'bg-bg-elevated border border-bd-strong rounded-md shadow-lg', desc: 'Menus, popovers, tooltips' },
            { level: '4', label: 'Modal', bg: 'bg-bg-default', border: 'border border-bd-default', shadow: 'shadow-xl', recipe: 'bg-bg-default border border-bd-default rounded-lg shadow-xl', desc: 'Dialogs over backdrop' },
          ].map(layer => (
            <button
              key={layer.level}
              onClick={() => copy(layer.recipe, `layer-${layer.level}`)}
              className="group cursor-pointer text-left"
              title={`Click to copy: ${layer.recipe}`}
            >
              {/* Visual */}
              <div className="relative h-28 rounded-lg border border-bd-weak p-2 mb-3 flex items-center justify-center" style={{ backgroundColor: '#0b1120' }}>
                {layer.level === '4' && (
                  <div className="absolute inset-0 rounded-lg bg-bg-overlay" />
                )}
                <div
                  className={`relative w-full h-20 rounded-lg ${layer.bg} ${layer.border} ${layer.shadow} flex items-center justify-center`}
                >
                  <span className="text-sm font-semibold text-tx-strong">{layer.label}</span>
                </div>
              </div>

              {/* Info */}
              <p className="text-xs font-semibold text-tx-strong">Level {layer.level}</p>
              <p className="text-[10px] text-tx-weak mt-0.5">{layer.desc}</p>
              <code className="text-[10px] font-mono text-tx-muted group-hover:text-tx-primary transition-colors mt-1 block leading-relaxed">
                {copied === `layer-${layer.level}` ? <span className="text-status-success-text">Copied!</span> : layer.recipe}
              </code>
            </button>
          ))}
        </div>

        {/* Stacking example */}
        <div className="mt-6 relative h-56 max-w-2xl">
          <div className="absolute inset-0 rounded-xl bg-bg-page border border-bd-weak overflow-hidden">
            <p className="text-[9px] font-mono text-tx-muted p-2">Level 0 — Page</p>

            <div className="absolute top-8 left-4 right-4 bottom-4 rounded-lg bg-bg-default border border-bd-default">
              <p className="text-[9px] font-mono text-tx-muted p-2">Level 1 — Card</p>

              <div className="absolute top-8 left-3 w-32 rounded-md bg-bg-elevated border border-bd-strong p-2">
                <p className="text-[9px] font-mono text-tx-muted">Level 2 — Nested</p>
              </div>

              <div className="absolute top-8 left-40 w-36 rounded-md bg-bg-elevated border border-bd-strong shadow-lg p-2">
                <p className="text-[9px] font-mono text-tx-muted">Level 3 — Dropdown</p>
                <div className="mt-1.5 space-y-1">
                  <div className="h-4 rounded bg-interactive-hover" />
                  <div className="h-4 rounded bg-bg-elevated" />
                  <div className="h-4 rounded bg-bg-elevated" />
                </div>
              </div>

              <div className="absolute top-4 right-3 bottom-3 w-44 rounded-lg bg-bg-default border border-bd-default shadow-xl p-2">
                <p className="text-[9px] font-mono text-tx-muted">Level 4 — Modal</p>
                <div className="mt-2 space-y-1.5">
                  <div className="h-3 rounded bg-bg-elevated w-3/4" />
                  <div className="h-3 rounded bg-bg-elevated w-full" />
                  <div className="h-3 rounded bg-bg-elevated w-1/2" />
                </div>
                <div className="absolute bottom-2 right-2 flex gap-1">
                  <div className="px-2 py-1 rounded text-[8px] bg-bg-elevated text-tx-muted">Cancel</div>
                  <div className="px-2 py-1 rounded text-[8px] bg-brand-primary text-tx-header">Save</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Avoid */}
      <section className="mt-4 mb-10 p-5 rounded-lg border border-bd-default bg-bg-default">
        <h2 className="text-sm font-semibold text-tx-strong mb-3">Avoid</h2>
        <div className="space-y-2">
          {[
            { bad: 'rounded-xl on cards', good: 'rounded-lg — xl is for page-level containers only' },
            { bad: 'border-gray-700', good: 'border-bd-default' },
            { bad: 'border-blue-500', good: 'border-bd-primary' },
            { bad: 'shadow-sm on cards at rest', good: 'No shadow at rest — add shadow-lg on hover' },
            { bad: 'ring-1 ring-black ring-opacity-5', good: 'border border-bd-default (use border, not ring)' },
            { bad: 'Mixing rounded-md and rounded-lg on sibling cards', good: 'rounded-lg for all cards consistently' },
          ].map(row => (
            <div key={row.bad} className="flex items-start gap-3 text-xs font-mono">
              <code className="text-tx-muted line-through w-64 flex-shrink-0">{row.bad}</code>
              <span className="text-tx-muted">→</span>
              <code className="text-tx-primary">{row.good}</code>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

// ─── Story ───────────────────────────────────────────────────────────────────

const meta: Meta = {
  title: 'Foundations/Borders & Shadows',
  parameters: { layout: 'fullscreen' },
};

export default meta;

export const Elevation: StoryObj = {
  render: () => <BordersShadowsPage />,
  name: 'Borders & Shadows',
};
