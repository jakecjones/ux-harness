import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { typography, colors } from '@/design-system/tokens';

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

// ─── Type Specimen ───────────────────────────────────────────────────────────

const Specimen: React.FC<{
  label: string;
  size: string;
  weight: number;
  leading: string;
  sample: string;
  color: string;
  classes: string;
}> = ({ label, size, weight, leading, sample, color, classes }) => {
  const { copied, copy } = useCopy();

  const fontWeight = weight === 700 ? 'font-bold' : weight === 600 ? 'font-semibold' : weight === 500 ? 'font-medium' : 'font-normal';

  return (
    <button
      onClick={() => copy(classes, label)}
      className="group flex items-baseline gap-6 py-3 px-4 -mx-4 rounded-lg hover:bg-bg-default transition-colors cursor-pointer text-left w-full"
      title={`Click to copy: ${classes}`}
    >
      {/* Label + meta */}
      <div className="w-28 flex-shrink-0">
        <p className="text-xs font-medium text-tx-default">{label}</p>
        <p className="text-[10px] font-mono text-tx-muted mt-0.5">{size} / {weight}</p>
      </div>

      {/* Live specimen */}
      <div className="flex-1 min-w-0 truncate" style={{ fontSize: size, fontWeight: weight, lineHeight: leading, color }}>
        {sample}
      </div>

      {/* Tailwind classes */}
      <code className="text-[10px] font-mono text-tx-muted group-hover:text-tx-primary transition-colors flex-shrink-0 hidden lg:block">
        {copied === label ? <span className="text-status-success-text">Copied!</span> : classes}
      </code>
    </button>
  );
};

// ─── Font Family Demo ────────────────────────────────────────────────────────

const FontFamilyDemo: React.FC<{ name: string; family: string; sample: string }> = ({ name, family, sample }) => {
  const { copied, copy } = useCopy();
  const tw = name === 'sans' ? 'font-sans' : 'font-mono';

  return (
    <button
      onClick={() => copy(tw, name)}
      className="group p-4 rounded-lg border border-bd-default hover:border-bd-primary transition-colors cursor-pointer text-left"
      title={`Click to copy: ${tw}`}
    >
      <p className="text-[10px] font-mono text-tx-muted uppercase tracking-wider mb-2">{name}</p>
      <p className="text-lg text-tx-strong truncate" style={{ fontFamily: family }}>{sample}</p>
      <p className="text-[10px] font-mono text-tx-muted mt-2 truncate opacity-0 group-hover:opacity-100 transition-opacity">
        {copied === name ? <span className="text-status-success-text">Copied!</span> : family.split(',').slice(0, 2).join(', ') + ', ...'}
      </p>
    </button>
  );
};

// ─── Color Role Demo ────────────────────────────────────────────────────────

const TextColorRow: React.FC<{ name: string; tw: string; value: string; usage: string }> = ({ name, tw, value, usage }) => {
  const { copied, copy } = useCopy();

  return (
    <button
      onClick={() => copy(tw, name)}
      className="group flex items-center gap-4 py-2 px-4 -mx-4 rounded-lg hover:bg-bg-default transition-colors cursor-pointer text-left w-full"
    >
      <span className="text-sm font-medium w-48" style={{ color: value }}>{name}</span>
      <span className="text-xs text-tx-muted flex-1">{usage}</span>
      <code className="text-[10px] font-mono text-tx-muted group-hover:text-tx-primary transition-colors">
        {copied === name ? <span className="text-status-success-text">Copied!</span> : tw}
      </code>
    </button>
  );
};

// ─── Typography Page ─────────────────────────────────────────────────────────

const TypographyPage: React.FC = () => (
  <div className="min-h-screen bg-bg-page p-10 max-w-5xl mx-auto">
    {/* Header */}
    <div className="mb-12">
      <h1 className="text-2xl font-bold text-tx-strong">Typography</h1>
      <p className="text-sm text-tx-weak mt-1">
        Type scale, weights, and text color roles — click any row to copy its Tailwind classes.
      </p>
    </div>

    {/* Font Families */}
    <Section title="Font Families" description="Two families: sans for UI, mono for code and data.">
      <div className="grid grid-cols-2 gap-3">
        <FontFamilyDemo
          name="sans"
          family={typography.fontFamily.sans}
          sample="The quick brown fox jumps over 42 lazy dogs"
        />
        <FontFamilyDemo
          name="mono"
          family={typography.fontFamily.mono}
          sample="const result = await api.fetch(id)"
        />
      </div>
    </Section>

    {/* Mono Usage */}
    <Section title="Mono in Context" description="Where font-mono appears across the app. Always paired with a semantic text color.">
      <div className="rounded-lg border border-bd-default bg-bg-default p-5 space-y-4">
        {[
          { label: 'Code snippet', sample: 'const data = await fetch("/api/v1/teams")', classes: 'text-sm font-mono text-tx-primary', desc: 'Inline code, API paths, imports' },
          { label: 'Token class', sample: 'bg-status-success-bg text-status-success-text', classes: 'text-xs font-mono text-tx-primary', desc: 'Tailwind class references in docs' },
          { label: 'Data value', sample: '94.2% · 148 tests · 3.2s', classes: 'text-sm font-mono text-tx-strong', desc: 'Metrics, counts, durations' },
          { label: 'Hex / color', sample: '#bae6fd · rgba(22, 101, 52, 0.40)', classes: 'text-xs font-mono text-tx-muted', desc: 'Color values, token metadata' },
          { label: 'Keyboard shortcut', sample: '⌘K · Ctrl+Shift+P', classes: 'text-xs font-mono text-tx-default', desc: 'Key bindings, shortcuts' },
          { label: 'File path', sample: 'src/design-system/tokens.ts', classes: 'text-xs font-mono text-tx-weak', desc: 'File references, directory paths' },
          { label: 'CLI command', sample: 'npm run storybook', classes: 'text-sm font-mono text-tx-primary bg-bg-sunken px-2 py-1 rounded', desc: 'Terminal commands in code blocks' },
          { label: 'Table cell data', sample: 'service-api-gateway', classes: 'text-xs font-mono text-tx-default', desc: 'Identifiers, slugs, enum values' },
        ].map((row) => (
          <div key={row.label} className="flex items-baseline gap-4">
            <span className="w-28 text-xs font-medium text-tx-weak flex-shrink-0">{row.label}</span>
            <span className={row.classes}>{row.sample}</span>
            <span className="text-[10px] text-tx-muted flex-shrink-0 ml-auto">{row.desc}</span>
          </div>
        ))}
      </div>
    </Section>

    {/* Heading Tier */}
    <Section title="Headings" description="Each size has a specific role. Use text-tx-strong or text-tx-header.">
      <div className="divide-y divide-bd-weak">
        <Specimen label="heading.2xl" size={typography.heading['2xl'].size} weight={typography.heading['2xl'].weight} leading={typography.heading['2xl'].leading} sample="Page Title" color={colors.text.strong} classes="text-2xl font-semibold text-tx-strong" />
        <Specimen label="heading.xl" size={typography.heading.xl.size} weight={typography.heading.xl.weight} leading={typography.heading.xl.leading} sample="Section Heading" color={colors.text.strong} classes="text-xl font-semibold text-tx-strong" />
        <Specimen label="heading.lg" size={typography.heading.lg.size} weight={typography.heading.lg.weight} leading={typography.heading.lg.leading} sample="Card Title" color={colors.text.strong} classes="text-lg font-semibold text-tx-strong" />
        <Specimen label="heading.md" size={typography.heading.md.size} weight={typography.heading.md.weight} leading={typography.heading.md.leading} sample="Sub-heading" color={colors.text.strong} classes="text-base font-semibold text-tx-strong" />
        <Specimen label="heading.sm" size={typography.heading.sm.size} weight={typography.heading.sm.weight} leading={typography.heading.sm.leading} sample="Minor Heading" color={colors.text.strong} classes="text-sm font-semibold text-tx-strong" />
      </div>
    </Section>

    {/* Label Tier */}
    <Section title="Labels" description="UI controls, form labels, navigation items. Use text-tx-default.">
      <div className="divide-y divide-bd-weak">
        {Object.entries(typography.label).map(([key, spec]) => (
          <Specimen
            key={key}
            label={`label.${key}`}
            size={spec.size}
            weight={spec.weight}
            leading={spec.leading}
            sample="Form Label Text"
            color={colors.text.default}
            classes={`text-${key === 'lg' ? 'sm' : key === 'md' ? 'sm' : 'xs'} font-medium text-tx-default`}
          />
        ))}
      </div>
    </Section>

    {/* Body Tier */}
    <Section title="Body" description="Paragraphs, descriptions, content blocks. Use text-tx-default or text-tx-weak.">
      <div className="divide-y divide-bd-weak">
        {Object.entries(typography.body).map(([key, spec]) => (
          <Specimen
            key={key}
            label={`body.${key}`}
            size={spec.size}
            weight={spec.weight}
            leading={spec.leading}
            sample="Body text for descriptions, paragraphs, and general content that appears throughout the application."
            color={colors.text.default}
            classes={`text-${key === 'lg' ? 'base' : key === 'md' ? 'sm' : 'xs'} text-tx-default`}
          />
        ))}
      </div>
    </Section>

    {/* Table Header */}
    <Section title="Table Header" description="Data table column headers. Uppercase with letter-spacing.">
      <div className="py-3 px-4 -mx-4">
        <p
          className="text-tx-default"
          style={{
            fontSize: typography.tableHeader.size,
            fontWeight: typography.tableHeader.weight,
            lineHeight: typography.tableHeader.leading,
            letterSpacing: typography.tableHeader.tracking,
            textTransform: typography.tableHeader.transform,
          }}
        >
          Column Header
        </p>
        <code className="text-[10px] font-mono text-tx-muted mt-1 block">
          text-xs font-medium text-tx-default uppercase tracking-wider
        </code>
      </div>
    </Section>

    {/* Metric */}
    <Section title="Metrics" description="Large numeric displays for dashboards and cards.">
      <div className="divide-y divide-bd-weak">
        {Object.entries(typography.metric).map(([key, spec]) => (
          <Specimen
            key={key}
            label={`metric.${key}`}
            size={spec.size}
            weight={spec.weight}
            leading={spec.leading}
            sample="92.4%"
            color={colors.text.strong}
            classes={`text-${key} font-bold text-tx-strong`}
          />
        ))}
      </div>
    </Section>

    {/* Text Color Roles */}
    <Section title="Text Colors" description="Semantic text color roles — which to use where.">
      <div className="divide-y divide-bd-weak">
        <TextColorRow name="Strong" tw="text-tx-strong" value={colors.text.strong} usage="Page titles, headings, emphasis" />
        <TextColorRow name="Header" tw="text-tx-header" value={colors.text.header} usage="Page/section headers (white)" />
        <TextColorRow name="Default" tw="text-tx-default" value={colors.text.default} usage="Body text, descriptions, labels" />
        <TextColorRow name="Weak" tw="text-tx-weak" value={colors.text.weak} usage="Secondary info, captions, timestamps" />
        <TextColorRow name="Muted" tw="text-tx-muted" value={colors.text.muted} usage="Placeholders, disabled text" />
        <TextColorRow name="Primary" tw="text-tx-primary" value={colors.text.primary} usage="Links, interactive text" />
        <TextColorRow name="Critical" tw="text-status-critical-text" value={colors.status.critical.text} usage="Error messages" />
        <TextColorRow name="Success" tw="text-status-success-text" value={colors.status.success.text} usage="Success messages" />
        <TextColorRow name="Warning" tw="text-status-warning-text" value={colors.status.warning.text} usage="Warning messages" />
      </div>
    </Section>

    {/* Hierarchy Preview */}
    <Section title="Hierarchy in Context" description="How the tiers work together on a typical card.">
      <div className="p-6 rounded-lg bg-bg-default border border-bd-default max-w-lg">
        <p className="text-xs font-medium text-tx-default uppercase tracking-wider mb-1">Section Label</p>
        <h3 className="text-lg font-semibold text-tx-strong">Card Title Goes Here</h3>
        <p className="text-sm text-tx-weak mt-1">A brief description explaining what this card is about and why it matters to the user.</p>
        <div className="mt-4 flex items-baseline gap-3">
          <span className="text-2xl font-bold text-tx-strong">94.2%</span>
          <span className="text-xs text-status-success-text font-medium">+2.1% from last week</span>
        </div>
        <div className="mt-4 pt-3 border-t border-bd-default flex items-center justify-between">
          <span className="text-xs text-tx-muted">Updated 2 hours ago</span>
          <span className="text-sm font-medium text-tx-primary cursor-pointer">View Details</span>
        </div>
      </div>
    </Section>

    {/* Avoid */}
    <section className="mt-4 mb-10 p-5 rounded-lg border border-bd-default bg-bg-default">
      <h2 className="text-sm font-semibold text-tx-strong mb-3">Avoid</h2>
      <div className="space-y-2">
        {[
          { bad: 'text-gray-50', good: 'text-tx-strong' },
          { bad: 'text-gray-300', good: 'text-tx-default' },
          { bad: 'text-gray-400', good: 'text-tx-weak' },
          { bad: 'text-gray-500', good: 'text-tx-muted' },
          { bad: 'text-white', good: 'text-tx-header (for headers) or text-tx-strong' },
          { bad: 'text-red-300', good: 'text-status-critical-text' },
          { bad: 'text-green-300', good: 'text-status-success-text' },
          { bad: 'text-[var(--header-text)]', good: 'text-tx-header' },
          { bad: 'text-[10px] (arbitrary)', good: 'text-xs (12px — smallest standard)' },
          { bad: 'font-weight via style={}', good: 'font-bold / font-semibold / font-medium' },
        ].map(row => (
          <div key={row.bad} className="flex items-center gap-3 text-xs font-mono">
            <code className="text-tx-muted line-through w-60 flex-shrink-0">{row.bad}</code>
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
  title: 'Foundations/Typography',
  parameters: { layout: 'fullscreen' },
};

export default meta;

export const TypeSystem: StoryObj = {
  render: () => <TypographyPage />,
  name: 'Typography',
};
