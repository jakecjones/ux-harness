import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ArrowRight, BarChart3, Bot, Plus, RefreshCw, Settings, TrendingUp, TrendingDown, AlertCircle, CheckCircle2, ExternalLink } from 'lucide-react';

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

// ─── Recipe Row ──────────────────────────────────────────────────────────────

const RecipeRow: React.FC<{
  label: string;
  recipe: string;
  desc: string;
  copied: string | null;
  onCopy: (text: string, key: string) => void;
}> = ({ label, recipe, desc, copied, onCopy }) => (
  <button
    onClick={() => onCopy(recipe, label)}
    className="group flex flex-col px-3 py-2.5 rounded-md bg-bg-default border border-bd-default hover:border-bd-primary transition-colors cursor-pointer text-left w-full overflow-hidden"
    title={`Click to copy: ${recipe}`}
  >
    <div className="flex items-center justify-between w-full">
      <p className="text-xs font-medium text-tx-default">{label}</p>
      <span className="text-[10px] font-mono text-tx-primary flex-shrink-0 ml-2">
        {copied === label ? <span className="text-status-success-text">Copied!</span> : 'Copy'}
      </span>
    </div>
    <p className="text-[10px] text-tx-muted mt-0.5">{desc}</p>
    <code className="text-[10px] font-mono text-tx-weak mt-1.5 truncate w-full block group-hover:text-tx-primary transition-colors">
      {recipe}
    </code>
  </button>
);

// ─── Cards Page ──────────────────────────────────────────────────────────────

const CardsPage: React.FC = () => {
  const { copied, copy } = useCopy();

  return (
    <div className="min-h-screen bg-bg-page p-10 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-2xl font-bold text-tx-strong">Cards</h1>
        <p className="text-sm text-tx-weak mt-1">
          Card structures, metric displays, empty states, and surface hierarchy — click any recipe to copy.
        </p>
      </div>

      {/* ── Base Card ───────────────────────────────────────────────────────── */}
      <Section title="Base Card" description="The foundation. bg-bg-default + border-bd-default + rounded-lg. No padding on the container — children own their padding.">
        <div className="grid grid-cols-2 gap-4">
          {/* Simple */}
          <button
            onClick={() => copy('bg-bg-default border border-bd-default rounded-lg', 'card-base')}
            className="group text-left cursor-pointer"
          >
            <div className="bg-bg-default border border-bd-default rounded-lg p-4 group-hover:border-bd-primary transition-colors">
              <p className="text-sm font-semibold text-tx-strong">Simple Card</p>
              <p className="text-xs text-tx-weak mt-1">Content with p-4 padding applied by children.</p>
            </div>
            <code className="text-[10px] font-mono text-tx-muted group-hover:text-tx-primary mt-2 block transition-colors">
              {copied === 'card-base' ? <span className="text-status-success-text">Copied!</span> : 'Base card'}
            </code>
          </button>

          {/* With hover */}
          <button
            onClick={() => copy('bg-bg-default border border-bd-default rounded-lg hover:shadow-md transition-all cursor-pointer', 'card-hover')}
            className="group text-left cursor-pointer"
          >
            <div className="bg-bg-default border border-bd-default rounded-lg p-4 hover:shadow-md transition-all">
              <p className="text-sm font-semibold text-tx-strong">Interactive Card</p>
              <p className="text-xs text-tx-weak mt-1">Adds hover:shadow-md for clickable cards.</p>
            </div>
            <code className="text-[10px] font-mono text-tx-muted group-hover:text-tx-primary mt-2 block transition-colors">
              {copied === 'card-hover' ? <span className="text-status-success-text">Copied!</span> : 'Interactive card'}
            </code>
          </button>

        </div>
      </Section>

      {/* ── Card with Header ────────────────────────────────────────────────── */}
      <Section title="Header / Body / Footer" description="Compound card with border-b dividers. Header owns px-6 py-4, body owns p-6, footer owns px-6 py-3.">
        <div className="max-w-lg">
          <div className="bg-bg-default border border-bd-default rounded-lg overflow-hidden">
            {/* Header */}
            <div className="px-6 py-4 border-b border-bd-default flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-tx-strong">Card Title</h3>
                <p className="text-sm text-tx-weak mt-0.5">Optional subtitle or description</p>
              </div>
              <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-tx-default hover:bg-interactive-hover rounded-md transition-colors cursor-pointer">
                <Settings className="w-3.5 h-3.5" /> Settings
              </button>
            </div>

            {/* Body */}
            <div className="p-6">
              <p className="text-sm text-tx-default">Card body content. This area holds the main payload — metrics, tables, forms, or anything else.</p>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="bg-bg-elevated rounded-md p-3">
                  <p className="text-xs text-tx-weak">Pass rate</p>
                  <p className="text-lg font-bold text-tx-strong">94.2%</p>
                </div>
                <div className="bg-bg-elevated rounded-md p-3">
                  <p className="text-xs text-tx-weak">Coverage</p>
                  <p className="text-lg font-bold text-tx-strong">78.1%</p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-3 border-t border-bd-default flex items-center justify-between">
              <span className="text-xs text-tx-muted">Updated 2 hours ago</span>
              <button className="inline-flex items-center gap-1 text-sm font-medium text-tx-primary hover:underline cursor-pointer">
                View Details <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </Section>

      {/* ── Metric Cards ────────────────────────────────────────────────────── */}
      <Section title="Metric Cards" description="Stat displays for dashboards. Large number + trend indicator + label.">
        <div className="grid grid-cols-3 gap-4">
          {/* Success metric */}
          <div className="bg-bg-default border border-bd-default rounded-lg p-4 hover:shadow-md transition-all cursor-pointer">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-tx-weak uppercase tracking-wider">Pass Rate</span>
              <CheckCircle2 className="w-4 h-4 text-status-success-text" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-tx-strong">94.2%</span>
              <span className="inline-flex items-center gap-0.5 text-xs font-medium text-status-success-text">
                <TrendingUp className="w-3 h-3" /> +3.1%
              </span>
            </div>
            <p className="text-xs text-tx-muted mt-2">vs. last 7 days</p>
          </div>

          {/* Warning metric */}
          <div className="bg-bg-default border border-bd-default rounded-lg p-4 hover:shadow-md transition-all cursor-pointer">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-tx-weak uppercase tracking-wider">Coverage</span>
              <BarChart3 className="w-4 h-4 text-status-warning-text" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-tx-strong">68.4%</span>
              <span className="inline-flex items-center gap-0.5 text-xs font-medium text-status-warning-text">
                <TrendingDown className="w-3 h-3" /> -1.2%
              </span>
            </div>
            <p className="text-xs text-tx-muted mt-2">Below 80% target</p>
          </div>

          {/* Critical metric */}
          <div className="bg-bg-default border border-bd-default rounded-lg p-4 hover:shadow-md transition-all cursor-pointer">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-tx-weak uppercase tracking-wider">Failures</span>
              <AlertCircle className="w-4 h-4 text-status-critical-text" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-tx-strong">12</span>
              <span className="inline-flex items-center gap-0.5 text-xs font-medium text-status-critical-text">
                <TrendingUp className="w-3 h-3" /> +4
              </span>
            </div>
            <p className="text-xs text-tx-muted mt-2">Last 24 hours</p>
          </div>
        </div>
      </Section>

      {/* ── Navigation Card ─────────────────────────────────────────────────── */}
      <Section title="Navigation Card" description="Clickable card that links to a page. Icon + title + description + hover lift.">
        <div className="grid grid-cols-3 gap-4">
          {[
            { icon: <Bot className="w-6 h-6 text-tx-primary" />, title: 'Assistant', desc: 'Conversational helper for everyday tasks' },
            { icon: <BarChart3 className="w-6 h-6 text-tx-primary" />, title: 'Dashboard', desc: 'Metric overview and live data widgets' },
            { icon: <RefreshCw className="w-6 h-6 text-tx-primary" />, title: 'Sync', desc: 'Background workers and scheduled jobs' },
          ].map(nav => (
            <div
              key={nav.title}
              className="bg-bg-default border border-bd-default rounded-lg p-5 cursor-pointer hover:shadow-md hover:border-bd-strong transition-all"
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-0.5">{nav.icon}</div>
                <div>
                  <p className="text-base font-semibold text-tx-strong">{nav.title}</p>
                  <p className="text-sm text-tx-weak mt-1">{nav.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Empty State ─────────────────────────────────────────────────────── */}
      <Section title="Empty State" description="Centered icon + message + CTA. Used when a card has no data to display.">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-bg-default border border-bd-default rounded-lg p-8 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-bg-elevated mb-4">
              <BarChart3 className="w-6 h-6 text-tx-muted" />
            </div>
            <p className="text-sm font-medium text-tx-strong">No test suites configured</p>
            <p className="text-xs text-tx-weak mt-1">Add a test suite to start tracking coverage metrics.</p>
            <button className="inline-flex items-center gap-1.5 px-4 py-2 mt-4 text-sm font-medium text-tx-header bg-brand-primary hover:bg-brand-primary-hover rounded-md transition-colors cursor-pointer">
              <Plus className="w-4 h-4" /> Add Suite
            </button>
          </div>

          <div className="bg-bg-default border border-bd-default rounded-lg p-8 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-bg-elevated mb-4">
              <AlertCircle className="w-6 h-6 text-tx-muted" />
            </div>
            <p className="text-sm font-medium text-tx-strong">No alerts triggered</p>
            <p className="text-xs text-tx-weak mt-1">All thresholds are within acceptable range.</p>
          </div>
        </div>
      </Section>

      {/* ── Loading Skeleton ────────────────────────────────────────────────── */}
      <Section title="Loading Skeleton" description="Animate-pulse with bg-bg-elevated bars. Matches the card structure being loaded.">
        <div className="grid grid-cols-3 gap-4">
          {/* Metric skeleton */}
          <div className="bg-bg-default border border-bd-default rounded-lg p-4 animate-pulse">
            <div className="flex items-center justify-between mb-3">
              <div className="h-3 w-16 bg-bg-elevated rounded" />
              <div className="h-4 w-4 bg-bg-elevated rounded" />
            </div>
            <div className="h-7 w-20 bg-bg-elevated rounded mt-2" />
            <div className="h-3 w-24 bg-bg-elevated rounded mt-3" />
          </div>

          {/* Card skeleton */}
          <div className="bg-bg-default border border-bd-default rounded-lg overflow-hidden animate-pulse col-span-2">
            <div className="px-6 py-4 border-b border-bd-default">
              <div className="h-5 w-32 bg-bg-elevated rounded" />
              <div className="h-3 w-48 bg-bg-elevated rounded mt-2" />
            </div>
            <div className="p-6 space-y-3">
              <div className="h-4 w-full bg-bg-elevated rounded" />
              <div className="h-4 w-3/4 bg-bg-elevated rounded" />
              <div className="h-4 w-1/2 bg-bg-elevated rounded" />
            </div>
          </div>
        </div>
      </Section>

      {/* ── In Context ──────────────────────────────────────────────────────── */}
      <Section title="In Context" description="How cards compose on a typical dashboard layout.">
        <div className="space-y-4">
          {/* Metrics row */}
          <div className="grid grid-cols-4 gap-3">
            {[
              { label: 'Total Tests', value: '1,247', trend: '+12', positive: true },
              { label: 'Pass Rate', value: '94.2%', trend: '+3.1%', positive: true },
              { label: 'Coverage', value: '68.4%', trend: '-1.2%', positive: false },
              { label: 'Avg Duration', value: '4.3s', trend: '-0.8s', positive: true },
            ].map(m => (
              <div key={m.label} className="bg-bg-default border border-bd-default rounded-lg p-3">
                <p className="text-[10px] font-medium text-tx-weak uppercase tracking-wider">{m.label}</p>
                <div className="flex items-baseline gap-1.5 mt-1">
                  <span className="text-lg font-bold text-tx-strong">{m.value}</span>
                  <span className={`text-[10px] font-medium ${m.positive ? 'text-status-success-text' : 'text-status-critical-text'}`}>{m.trend}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Content cards */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-bg-default border border-bd-default rounded-lg overflow-hidden">
              <div className="px-4 py-3 border-b border-bd-default flex items-center justify-between">
                <h3 className="text-sm font-semibold text-tx-strong">Recent Failures</h3>
                <button className="text-xs text-tx-primary hover:underline cursor-pointer">View all</button>
              </div>
              <div className="divide-y divide-bd-default">
                {['Login flow — timeout', 'Cart checkout — 500', 'Search filter — assertion'].map(item => (
                  <div key={item} className="px-4 py-2.5 flex items-center justify-between hover:bg-interactive-hover/50 transition-colors">
                    <span className="text-xs text-tx-default">{item}</span>
                    <span className="text-[10px] text-status-critical-text">Failed</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-bg-default border border-bd-default rounded-lg p-6 flex flex-col items-center justify-center text-center">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-bg-elevated mb-3">
                <ExternalLink className="w-5 h-5 text-tx-muted" />
              </div>
              <p className="text-sm font-medium text-tx-strong">No items yet</p>
              <p className="text-xs text-tx-weak mt-1">Create your first item to get started.</p>
              <button className="inline-flex items-center gap-1.5 px-3 py-1.5 mt-3 text-xs font-medium text-tx-header bg-brand-primary hover:bg-brand-primary-hover rounded-md transition-colors cursor-pointer">
                <Plus className="w-3.5 h-3.5" /> New Item
              </button>
            </div>
          </div>
        </div>
      </Section>

      {/* ── Recipes ─────────────────────────────────────────────────────────── */}
      <Section title="Recipes" description="Complete class strings for common card patterns. Click to copy.">
        <div className="grid grid-cols-2 gap-3">
          <RecipeRow
            label="Base Card"
            recipe="bg-bg-default border border-bd-default rounded-lg"
            desc="Standard card — no padding, children own spacing"
            copied={copied}
            onCopy={copy}
          />
          <RecipeRow
            label="Card with Padding"
            recipe="bg-bg-default border border-bd-default rounded-lg p-4"
            desc="Simple content card"
            copied={copied}
            onCopy={copy}
          />
          <RecipeRow
            label="Interactive Card"
            recipe="bg-bg-default border border-bd-default rounded-lg hover:shadow-md transition-all cursor-pointer"
            desc="Clickable — adds shadow on hover"
            copied={copied}
            onCopy={copy}
          />
          <RecipeRow
            label="Card Header"
            recipe="px-6 py-4 border-b border-bd-default flex items-center justify-between"
            desc="Title bar with optional action slot"
            copied={copied}
            onCopy={copy}
          />
          <RecipeRow
            label="Card Body"
            recipe="p-6"
            desc="Main content area"
            copied={copied}
            onCopy={copy}
          />
          <RecipeRow
            label="Card Footer"
            recipe="px-6 py-3 border-t border-bd-default flex items-center justify-between"
            desc="Action bar or metadata"
            copied={copied}
            onCopy={copy}
          />
          <RecipeRow
            label="Metric Card"
            recipe="bg-bg-default border border-bd-default rounded-lg p-4 hover:shadow-md transition-all cursor-pointer"
            desc="Stat display — number + trend + label"
            copied={copied}
            onCopy={copy}
          />
          <RecipeRow
            label="Skeleton Card"
            recipe="bg-bg-default border border-bd-default rounded-lg overflow-hidden animate-pulse"
            desc="Loading placeholder"
            copied={copied}
            onCopy={copy}
          />
          <RecipeRow
            label="Skeleton Bar"
            recipe="h-4 bg-bg-elevated rounded"
            desc="Loading text line inside skeleton"
            copied={copied}
            onCopy={copy}
          />
          <RecipeRow
            label="Empty State Icon"
            recipe="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-bg-elevated"
            desc="Circular icon container for empty states"
            copied={copied}
            onCopy={copy}
          />
          <RecipeRow
            label="List Divider"
            recipe="divide-y divide-bd-default"
            desc="Horizontal dividers between list items"
            copied={copied}
            onCopy={copy}
          />
        </div>
      </Section>

      {/* ── Anatomy ─────────────────────────────────────────────────────────── */}
      <Section title="Anatomy" description="How a compound card is constructed from tokens.">
        <div className="max-w-lg rounded-lg bg-bg-default border border-bd-default p-6">
          <div className="space-y-3">
            {[
              { part: 'Container', classes: 'bg-bg-default border border-bd-default rounded-lg overflow-hidden' },
              { part: 'Header', classes: 'px-6 py-4 border-b border-bd-default' },
              { part: 'Title', classes: 'text-lg font-semibold text-tx-strong' },
              { part: 'Subtitle', classes: 'text-sm text-tx-weak mt-0.5' },
              { part: 'Body', classes: 'p-6' },
              { part: 'Footer', classes: 'px-6 py-3 border-t border-bd-default' },
              { part: 'Footer text', classes: 'text-xs text-tx-muted' },
              { part: 'Footer link', classes: 'text-sm font-medium text-tx-primary' },
              { part: 'Hover', classes: 'hover:shadow-md transition-all' },
            ].map(row => (
              <div key={row.part} className="text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-24 font-medium text-tx-default flex-shrink-0">{row.part}</span>
                  <code className="font-mono text-tx-primary truncate">{row.classes}</code>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── Avoid ───────────────────────────────────────────────────────────── */}
      <section className="mt-4 mb-10 p-5 rounded-lg border border-bd-default bg-bg-default">
        <h2 className="text-sm font-semibold text-tx-strong mb-3">Avoid</h2>
        <div className="space-y-2">
          {[
            { bad: 'rounded-xl on standard cards', good: 'rounded-lg — xl is for special surfaces only' },
            { bad: 'shadow-sm at rest', good: 'No shadow at rest — add shadow-md on hover' },
            { bad: 'bg-gray-800 / bg-[#1f2937]', good: 'bg-bg-default' },
            { bad: 'border-gray-700', good: 'border-bd-default' },
            { bad: 'p-6 on the container', good: 'No padding on container — header/body/footer own their padding' },
            { bad: 'Mixing rounded-md and rounded-lg on sibling cards', good: 'rounded-lg for all cards, rounded-md for nested panels' },
            { bad: 'Custom divider margins', good: 'border-b border-bd-default on header, border-t on footer' },
            { bad: 'Skeleton with bg-gray-600', good: 'bg-bg-elevated for skeleton bars' },
            { bad: 'Empty state without icon', good: 'Always include a rounded-xl icon container' },
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
  title: 'Components/Cards',
  parameters: { layout: 'fullscreen' },
};

export default meta;

export const CardSystem: StoryObj = {
  render: () => <CardsPage />,
  name: 'Cards',
};
