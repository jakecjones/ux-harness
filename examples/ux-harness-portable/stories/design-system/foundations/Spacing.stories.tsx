import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { spacing } from '@/design-system/tokens';

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

// ─── Scale names to Tailwind mappings ────────────────────────────────────────

const scaleMap: Record<string, { tw: string; px: string; usage: string }> = {
  none:  { tw: '0',    px: '0px',  usage: 'Reset' },
  '3xs': { tw: '0.5',  px: '2px',  usage: 'Fine detail, badge padding' },
  '2xs': { tw: '1',    px: '4px',  usage: 'Tight inner spacing' },
  xs:    { tw: '1.5',  px: '6px',  usage: 'Compact padding' },
  sm:    { tw: '2',    px: '8px',  usage: 'Standard inner padding' },
  md:    { tw: '3',    px: '12px', usage: 'Component padding' },
  lg:    { tw: '4',    px: '16px', usage: 'Section padding, comfortable gaps' },
  xl:    { tw: '6',    px: '24px', usage: 'Section gaps, page padding' },
  '2xl': { tw: '8',    px: '32px', usage: 'Large section spacing' },
  '3xl': { tw: '12',   px: '48px', usage: 'Major section breaks' },
  '4xl': { tw: '16',   px: '64px', usage: 'Page-level spacing' },
};

// ─── Spacing Page ────────────────────────────────────────────────────────────

const SpacingPage: React.FC = () => {
  const { copied, copy } = useCopy();

  return (
    <div className="min-h-screen bg-bg-page p-10 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-2xl font-bold text-tx-strong">Spacing</h1>
        <p className="text-sm text-tx-weak mt-1">
          Named spacing scale from tokens — click any row to copy its Tailwind value.
        </p>
      </div>

      {/* Scale */}
      <Section title="Scale" description="11 named steps from none (0) to 4xl (64px). Use p-{n}, m-{n}, gap-{n}.">
        <div className="space-y-1">
          {Object.entries(spacing).map(([name, value]) => {
            const map = scaleMap[name];
            if (!map) return null;
            const twClass = `p-${map.tw}`;

            return (
              <button
                key={name}
                onClick={() => copy(twClass, name)}
                className="group flex items-center gap-4 py-2 px-4 -mx-4 rounded-lg hover:bg-bg-default transition-colors cursor-pointer text-left w-full"
                title={`Click to copy: ${twClass}`}
              >
                {/* Name */}
                <span className="w-12 text-xs font-semibold text-tx-strong flex-shrink-0">{name}</span>

                {/* Visual bar */}
                <div className="flex-shrink-0 h-5 flex items-center" style={{ width: '280px' }}>
                  <div
                    className="h-full rounded-sm bg-brand-primary transition-all"
                    style={{ width: name === 'none' ? '1px' : value, minWidth: name === 'none' ? '1px' : undefined }}
                  />
                </div>

                {/* Value */}
                <span className="w-16 text-[11px] font-mono text-tx-muted flex-shrink-0">{map.px}</span>

                {/* Usage */}
                <span className="text-xs text-tx-weak flex-1">{map.usage}</span>

                {/* Tailwind class */}
                <code className="text-[10px] font-mono text-tx-muted group-hover:text-tx-primary transition-colors flex-shrink-0">
                  {copied === name ? <span className="text-status-success-text">Copied!</span> : twClass}
                </code>
              </button>
            );
          })}
        </div>
      </Section>

      {/* Common Patterns */}
      <Section title="Common Patterns" description="Standard spacing recipes used across components.">
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: 'Card padding', classes: 'p-4', desc: 'Standard card body (lg / 16px)' },
            { label: 'Card padding (compact)', classes: 'p-3', desc: 'Compact cards, nested panels (md / 12px)' },
            { label: 'Card padding (generous)', classes: 'p-6', desc: 'Modal bodies, hero sections (xl / 24px)' },
            { label: 'Section gap', classes: 'space-y-6', desc: 'Between major sections (xl / 24px)' },
            { label: 'Component gap', classes: 'space-y-4', desc: 'Between related items (lg / 16px)' },
            { label: 'Inline items', classes: 'gap-2', desc: 'Icons + text, button groups (sm / 8px)' },
            { label: 'Tight inline', classes: 'gap-1.5', desc: 'Badge icon + label, compact controls (xs / 6px)' },
            { label: 'Input padding', classes: 'px-3 py-2', desc: 'Standard input fields (md-h, sm-v)' },
            { label: 'Button padding', classes: 'px-4 py-2', desc: 'Standard buttons (lg-h, sm-v)' },
            { label: 'Button padding (small)', classes: 'px-3 py-1.5', desc: 'Compact buttons (md-h, xs-v)' },
          ].map(p => (
            <button
              key={p.classes}
              onClick={() => copy(p.classes, p.label)}
              className="group flex items-center justify-between px-3 py-2.5 rounded-md bg-bg-default border border-bd-default hover:border-bd-primary transition-colors cursor-pointer text-left"
              title={`Click to copy: ${p.classes}`}
            >
              <div className="min-w-0">
                <p className="text-xs font-medium text-tx-default">{p.label}</p>
                <p className="text-[10px] text-tx-muted mt-0.5">{p.desc}</p>
              </div>
              <code className="text-[11px] font-mono text-tx-primary flex-shrink-0 ml-3">
                {copied === p.label ? <span className="text-status-success-text">Copied!</span> : p.classes}
              </code>
            </button>
          ))}
        </div>
      </Section>

      {/* Visual Demo */}
      <Section title="In Context" description="How spacing tiers compose on a typical card.">
        <div className="max-w-md">
          {/* Card with annotated spacing */}
          <div className="relative">
            <div className="rounded-lg bg-bg-default border border-bd-default overflow-hidden">
              {/* Header — p-4 */}
              <div className="p-4 border-b border-bd-default">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-md bg-brand-primary flex items-center justify-center">
                    <span className="text-tx-header text-xs font-bold">T</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-tx-strong">Card Title</p>
                    <p className="text-xs text-tx-weak">Subtitle text</p>
                  </div>
                </div>
              </div>

              {/* Body — p-4, space-y-3 */}
              <div className="p-4 space-y-3">
                <p className="text-sm text-tx-default">Content with consistent internal spacing.</p>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-tx-strong">84%</span>
                  <span className="text-xs text-status-success-text">+3.2%</span>
                </div>
              </div>

              {/* Footer — px-4 py-3 */}
              <div className="px-4 py-3 border-t border-bd-default flex justify-end gap-2">
                <span className="px-3 py-1.5 text-xs text-tx-default bg-bg-elevated rounded-md">Cancel</span>
                <span className="px-3 py-1.5 text-xs text-tx-header bg-brand-primary rounded-md">Save</span>
              </div>
            </div>

            {/* Annotations */}
            <div className="mt-3 grid grid-cols-3 gap-2">
              <div className="text-center">
                <p className="text-[10px] font-mono text-tx-muted">Header</p>
                <p className="text-[10px] font-mono text-tx-primary">p-4 gap-2</p>
              </div>
              <div className="text-center">
                <p className="text-[10px] font-mono text-tx-muted">Body</p>
                <p className="text-[10px] font-mono text-tx-primary">p-4 space-y-3</p>
              </div>
              <div className="text-center">
                <p className="text-[10px] font-mono text-tx-muted">Footer</p>
                <p className="text-[10px] font-mono text-tx-primary">px-4 py-3 gap-2</p>
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
            { bad: 'p-5', good: 'p-4 or p-6 — stay on the scale' },
            { bad: 'p-[18px] (arbitrary)', good: 'p-4 (16px) or p-5 (20px)' },
            { bad: 'Mixing p-3 and p-4 on sibling cards', good: 'Pick one padding tier per context' },
            { bad: 'gap-1 for icon + text', good: 'gap-1.5 (6px) or gap-2 (8px)' },
            { bad: 'mt-7 / mb-9 (odd values)', good: 'Stick to 4, 6, 8, 12 for vertical rhythm' },
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
  title: 'Foundations/Spacing',
  parameters: { layout: 'fullscreen' },
};

export default meta;

export const SpaceScale: StoryObj = {
  render: () => <SpacingPage />,
  name: 'Spacing',
};
