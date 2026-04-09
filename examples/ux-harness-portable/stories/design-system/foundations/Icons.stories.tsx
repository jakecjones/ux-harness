import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { colors } from '@/design-system/tokens';
import {
  Loader2, X, ChevronDown, ChevronRight, ChevronLeft, RefreshCw, Check,
  Info, AlertTriangle, AlertCircle, CheckCircle, CheckCircle2, XCircle,
  FileText, Trash2, Settings, Plus, ExternalLink, Search,
  TrendingUp, TrendingDown, Copy, Clock, Pin, Bot,
  Home, User, BarChart3, Lightbulb, Tag, Terminal, ShieldAlert, Blocks, FlaskConical,
  ArrowRight, Download, Eye, EyeOff, HelpCircle, Minus,
  Square, Circle, Triangle, Hexagon, Diamond,
} from 'lucide-react';

// ─── Icon size scale ─────────────────────────────────────────────────────────

const iconSizes = {
  xs: 12, // w-3 h-3  — badges, compact chips
  sm: 16, // w-4 h-4  — buttons, inputs (default)
  md: 20, // w-5 h-5  — sidebar nav, card headers
  lg: 24, // w-6 h-6  — navigation cards, empty states
  xl: 32, // w-8 h-8  — hero icons, splash screens
} as const;

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

// ─── Icon Cell ───────────────────────────────────────────────────────────────

const IconCell: React.FC<{
  name: string;
  icon: React.ReactNode;
  copied: string | null;
  onCopy: (text: string, key: string) => void;
}> = ({ name, icon, copied, onCopy }) => {
  const importStr = `import { ${name} } from 'lucide-react'`;
  return (
    <button
      onClick={() => onCopy(importStr, name)}
      className="group flex flex-col items-center gap-2 p-3 rounded-md hover:bg-bg-default transition-colors cursor-pointer"
      title={`Click to copy: ${importStr}`}
    >
      <div className="text-tx-default group-hover:text-tx-primary transition-colors">
        {icon}
      </div>
      <span className="text-[10px] font-mono text-tx-muted group-hover:text-tx-primary transition-colors">
        {copied === name ? <span className="text-status-success-text">Copied!</span> : name}
      </span>
    </button>
  );
};

// ─── Icons Page ──────────────────────────────────────────────────────────────

const IconsPage: React.FC = () => {
  const { copied, copy } = useCopy();

  return (
    <div className="min-h-screen bg-bg-page p-10 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-2xl font-bold text-tx-strong">Icons</h1>
        <p className="text-sm text-tx-weak mt-1">
          Lucide React is the sole icon library. Click any icon to copy its import statement.
        </p>
      </div>

      {/* ── Library ─────────────────────────────────────────────────────────── */}
      <Section title="Library" description="lucide-react — consistent 24px grid, 2px stroke, rounded joins. No other icon libraries.">
        <div className="rounded-lg bg-bg-default border border-bd-default p-4 max-w-lg">
          <div className="space-y-2">
            <div className="text-xs">
              <div className="flex items-center gap-2">
                <span className="w-20 font-medium text-tx-default">Package</span>
                <code className="font-mono text-tx-primary">lucide-react</code>
              </div>
            </div>
            <div className="text-xs">
              <div className="flex items-center gap-2">
                <span className="w-20 font-medium text-tx-default">Import</span>
                <code className="font-mono text-tx-primary">{"import { IconName } from 'lucide-react'"}</code>
              </div>
            </div>
            <div className="text-xs">
              <div className="flex items-center gap-2">
                <span className="w-20 font-medium text-tx-default">Grid</span>
                <code className="font-mono text-tx-primary">24 × 24px</code>
              </div>
            </div>
            <div className="text-xs">
              <div className="flex items-center gap-2">
                <span className="w-20 font-medium text-tx-default">Stroke</span>
                <code className="font-mono text-tx-primary">2px, round cap & join</code>
              </div>
            </div>
            <div className="text-xs">
              <div className="flex items-center gap-2">
                <span className="w-20 font-medium text-tx-default">Color</span>
                <code className="font-mono text-tx-primary">currentColor — set via text-* class</code>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ── Sizes ───────────────────────────────────────────────────────────── */}
      <Section title="Sizes" description="5 named sizes via the Icon wrapper, or use Tailwind w-/h- classes directly. w-4 h-4 is the most common.">
        <div className="flex items-end gap-8">
          {(Object.entries(iconSizes) as [string, number][]).map(([name, px]) => {
            const twClass = `w-${px / 4} h-${px / 4}`;
            return (
              <button
                key={name}
                onClick={() => copy(`className="${twClass}"`, `size-${name}`)}
                className="group flex flex-col items-center gap-2 cursor-pointer"
              >
                <Settings style={{ width: px, height: px }} className="text-tx-default" />
                <p className="text-xs font-semibold text-tx-strong">{name}</p>
                <p className="text-[10px] font-mono text-tx-muted">{px}px</p>
                <code className="text-[10px] font-mono text-tx-muted group-hover:text-tx-primary transition-colors">
                  {copied === `size-${name}` ? <span className="text-status-success-text">Copied!</span> : twClass}
                </code>
              </button>
            );
          })}
        </div>

        <div className="mt-5 rounded-lg bg-bg-default border border-bd-default p-4 max-w-lg">
          <p className="text-xs font-medium text-tx-default mb-2">Common pairings</p>
          <div className="space-y-1.5 text-xs">
            <div className="flex items-center gap-3">
              <code className="font-mono text-tx-primary w-20">w-3 h-3</code>
              <span className="text-tx-weak">Badges, compact chips, tiny inline</span>
            </div>
            <div className="flex items-center gap-3">
              <code className="font-mono text-tx-primary w-20">w-4 h-4</code>
              <span className="text-tx-weak">Buttons, inputs, inline actions — default</span>
            </div>
            <div className="flex items-center gap-3">
              <code className="font-mono text-tx-primary w-20">w-5 h-5</code>
              <span className="text-tx-weak">Sidebar nav, card headers, toolbar</span>
            </div>
            <div className="flex items-center gap-3">
              <code className="font-mono text-tx-primary w-20">w-6 h-6</code>
              <span className="text-tx-weak">Navigation cards, empty state containers</span>
            </div>
          </div>
        </div>
      </Section>

      {/* ── Colors ──────────────────────────────────────────────────────────── */}
      <Section title="Colors" description="Icons inherit color via currentColor. Use text-icon-* tokens or text-tx-* tokens.">
        <div className="flex items-start gap-6 flex-wrap">
          {[
            { label: 'Default', tw: 'text-icon-default', color: colors.icon.default },
            { label: 'Strong', tw: 'text-icon-strong', color: colors.icon.strong },
            { label: 'Weak', tw: 'text-icon-weak', color: colors.icon.weak },
            { label: 'Primary', tw: 'text-icon-primary', color: colors.icon.primary },
            { label: 'Critical', tw: 'text-icon-critical', color: colors.icon.critical },
            { label: 'Success', tw: 'text-icon-success', color: colors.icon.success },
            { label: 'Warning', tw: 'text-icon-warning', color: colors.icon.warning },
            { label: 'Disabled', tw: 'text-icon-disabled', color: colors.icon.disabled },
          ].map(c => (
            <button
              key={c.label}
              onClick={() => copy(c.tw, `color-${c.label}`)}
              className="group flex flex-col items-center gap-2 cursor-pointer"
            >
              <div className="w-10 h-10 rounded-md bg-bg-default border border-bd-default flex items-center justify-center group-hover:border-bd-primary transition-colors">
                <Settings className="w-5 h-5" style={{ color: c.color }} />
              </div>
              <p className="text-[10px] font-semibold text-tx-strong">{c.label}</p>
              <code className="text-[10px] font-mono text-tx-muted group-hover:text-tx-primary transition-colors">
                {copied === `color-${c.label}` ? <span className="text-status-success-text">Copied!</span> : c.tw}
              </code>
            </button>
          ))}
        </div>
      </Section>

      {/* ── Common Icons ────────────────────────────────────────────────────── */}
      <Section title="Common Icons" description="The most-used icons across the codebase, grouped by purpose.">
        {/* Actions */}
        <div className="mb-6">
          <p className="text-xs font-medium text-tx-weak mb-3 uppercase tracking-wider">Actions</p>
          <div className="grid grid-cols-8 gap-1">
            <IconCell name="Plus" icon={<Plus className="w-5 h-5" />} copied={copied} onCopy={copy} />
            <IconCell name="Check" icon={<Check className="w-5 h-5" />} copied={copied} onCopy={copy} />
            <IconCell name="X" icon={<X className="w-5 h-5" />} copied={copied} onCopy={copy} />
            <IconCell name="Trash2" icon={<Trash2 className="w-5 h-5" />} copied={copied} onCopy={copy} />
            <IconCell name="Copy" icon={<Copy className="w-5 h-5" />} copied={copied} onCopy={copy} />
            <IconCell name="Download" icon={<Download className="w-5 h-5" />} copied={copied} onCopy={copy} />
            <IconCell name="ExternalLink" icon={<ExternalLink className="w-5 h-5" />} copied={copied} onCopy={copy} />
            <IconCell name="Search" icon={<Search className="w-5 h-5" />} copied={copied} onCopy={copy} />
          </div>
        </div>

        {/* Navigation */}
        <div className="mb-6">
          <p className="text-xs font-medium text-tx-weak mb-3 uppercase tracking-wider">Navigation</p>
          <div className="grid grid-cols-8 gap-1">
            <IconCell name="ChevronDown" icon={<ChevronDown className="w-5 h-5" />} copied={copied} onCopy={copy} />
            <IconCell name="ChevronRight" icon={<ChevronRight className="w-5 h-5" />} copied={copied} onCopy={copy} />
            <IconCell name="ChevronLeft" icon={<ChevronLeft className="w-5 h-5" />} copied={copied} onCopy={copy} />
            <IconCell name="ArrowRight" icon={<ArrowRight className="w-5 h-5" />} copied={copied} onCopy={copy} />
            <IconCell name="Home" icon={<Home className="w-5 h-5" />} copied={copied} onCopy={copy} />
            <IconCell name="Settings" icon={<Settings className="w-5 h-5" />} copied={copied} onCopy={copy} />
            <IconCell name="Pin" icon={<Pin className="w-5 h-5" />} copied={copied} onCopy={copy} />
            <IconCell name="Eye" icon={<Eye className="w-5 h-5" />} copied={copied} onCopy={copy} />
          </div>
        </div>

        {/* Status */}
        <div className="mb-6">
          <p className="text-xs font-medium text-tx-weak mb-3 uppercase tracking-wider">Status & Feedback</p>
          <div className="grid grid-cols-8 gap-1">
            <IconCell name="CheckCircle2" icon={<CheckCircle2 className="w-5 h-5 text-status-success-icon" />} copied={copied} onCopy={copy} />
            <IconCell name="CheckCircle" icon={<CheckCircle className="w-5 h-5 text-status-success-icon" />} copied={copied} onCopy={copy} />
            <IconCell name="XCircle" icon={<XCircle className="w-5 h-5 text-status-critical-icon" />} copied={copied} onCopy={copy} />
            <IconCell name="AlertCircle" icon={<AlertCircle className="w-5 h-5 text-status-critical-icon" />} copied={copied} onCopy={copy} />
            <IconCell name="AlertTriangle" icon={<AlertTriangle className="w-5 h-5 text-status-warning-icon" />} copied={copied} onCopy={copy} />
            <IconCell name="Info" icon={<Info className="w-5 h-5 text-status-info-icon" />} copied={copied} onCopy={copy} />
            <IconCell name="Loader2" icon={<Loader2 className="w-5 h-5 animate-spin" />} copied={copied} onCopy={copy} />
            <IconCell name="HelpCircle" icon={<HelpCircle className="w-5 h-5" />} copied={copied} onCopy={copy} />
          </div>
        </div>

        {/* Data & Metrics */}
        <div className="mb-6">
          <p className="text-xs font-medium text-tx-weak mb-3 uppercase tracking-wider">Data & Metrics</p>
          <div className="grid grid-cols-8 gap-1">
            <IconCell name="TrendingUp" icon={<TrendingUp className="w-5 h-5 text-status-success-icon" />} copied={copied} onCopy={copy} />
            <IconCell name="TrendingDown" icon={<TrendingDown className="w-5 h-5 text-status-critical-icon" />} copied={copied} onCopy={copy} />
            <IconCell name="BarChart3" icon={<BarChart3 className="w-5 h-5" />} copied={copied} onCopy={copy} />
            <IconCell name="Clock" icon={<Clock className="w-5 h-5" />} copied={copied} onCopy={copy} />
            <IconCell name="RefreshCw" icon={<RefreshCw className="w-5 h-5" />} copied={copied} onCopy={copy} />
            <IconCell name="Minus" icon={<Minus className="w-5 h-5" />} copied={copied} onCopy={copy} />
            <IconCell name="EyeOff" icon={<EyeOff className="w-5 h-5" />} copied={copied} onCopy={copy} />
            <IconCell name="Tag" icon={<Tag className="w-5 h-5" />} copied={copied} onCopy={copy} />
          </div>
        </div>

        {/* App-specific */}
        <div>
          <p className="text-xs font-medium text-tx-weak mb-3 uppercase tracking-wider">App Pages</p>
          <div className="grid grid-cols-8 gap-1">
            <IconCell name="Bot" icon={<Bot className="w-5 h-5" />} copied={copied} onCopy={copy} />
            <IconCell name="Terminal" icon={<Terminal className="w-5 h-5" />} copied={copied} onCopy={copy} />
            <IconCell name="Lightbulb" icon={<Lightbulb className="w-5 h-5" />} copied={copied} onCopy={copy} />
            <IconCell name="User" icon={<User className="w-5 h-5" />} copied={copied} onCopy={copy} />
            <IconCell name="ShieldAlert" icon={<ShieldAlert className="w-5 h-5" />} copied={copied} onCopy={copy} />
            <IconCell name="Blocks" icon={<Blocks className="w-5 h-5" />} copied={copied} onCopy={copy} />
            <IconCell name="FlaskConical" icon={<FlaskConical className="w-5 h-5" />} copied={copied} onCopy={copy} />
            <IconCell name="FileText" icon={<FileText className="w-5 h-5" />} copied={copied} onCopy={copy} />
          </div>
        </div>
      </Section>

      {/* ── Categorical Icons ───────────────────────────────────────────────── */}
      <Section title="Categorical Icons" description="Lucide icons with semantic dt- token classes. Circle background uses fill-dt-{color}-subtle, icon uses text-dt-{color}-text.">
        <div className="flex items-start gap-6 flex-wrap">
          {[
            { name: 'Blue', type: 'blue', Icon: Square, fill: 'fill-dt-blue-subtle', text: 'text-dt-blue-text', tw: 'fill-dt-blue-subtle + text-dt-blue-text' },
            { name: 'Purple', type: 'purple', Icon: Hexagon, fill: 'fill-dt-purple-subtle', text: 'text-dt-purple-text', tw: 'fill-dt-purple-subtle + text-dt-purple-text' },
            { name: 'Green', type: 'green', Icon: Circle, fill: 'fill-dt-green-subtle', text: 'text-dt-green-text', tw: 'fill-dt-green-subtle + text-dt-green-text' },
            { name: 'Yellow', type: 'yellow', Icon: Triangle, fill: 'fill-dt-yellow-subtle', text: 'text-dt-yellow-text', tw: 'fill-dt-yellow-subtle + text-dt-yellow-text' },
            { name: 'Orange', type: 'orange', Icon: Diamond, fill: 'fill-dt-orange-subtle', text: 'text-dt-orange-text', tw: 'fill-dt-orange-subtle + text-dt-orange-text' },
          ].map(dt => (
            <button
              key={dt.name}
              onClick={() => copy(dt.tw, dt.name)}
              className="group flex flex-col items-center gap-2 p-3 rounded-md hover:bg-bg-default transition-colors cursor-pointer"
              title={`Click to copy: ${dt.tw}`}
            >
              <svg width="40" height="40" viewBox="0 0 37 37" fill="none" className="flex-shrink-0">
                <circle cx="18.5" cy="18.5" r="18.5" className={dt.fill} />
                <dt.Icon className={dt.text} x="9" y="9" width="19" height="19" />
              </svg>
              <span className="text-[10px] font-mono text-tx-muted group-hover:text-tx-primary transition-colors">
                {copied === dt.name ? <span className="text-status-success-text">Copied!</span> : dt.name}
              </span>
            </button>
          ))}
        </div>
        <p className="text-xs text-tx-weak mt-4">
          Uses semantic <code className="text-tx-primary">fill-dt-*-subtle</code> + <code className="text-tx-primary">text-dt-*-text</code> token classes from the design system.
        </p>
      </Section>

      {/* ── Accessibility ───────────────────────────────────────────────────── */}
      <Section title="Accessibility" description="Decorative icons get aria-hidden. Meaningful icons get aria-label.">
        <div className="rounded-lg bg-bg-default border border-bd-default p-4 max-w-lg space-y-3">
          <div className="text-xs">
            <p className="font-medium text-tx-default mb-1">Decorative (most icons)</p>
            <code className="font-mono text-tx-primary text-[11px]">{'<Settings className="w-5 h-5" aria-hidden={true} />'}</code>
          </div>
          <div className="text-xs">
            <p className="font-medium text-tx-default mb-1">Meaningful (icon-only buttons)</p>
            <code className="font-mono text-tx-primary text-[11px]">{'<button aria-label="Close"><X className="w-5 h-5" /></button>'}</code>
          </div>
          <div className="text-xs">
            <p className="font-medium text-tx-default mb-1">Via Icon wrapper</p>
            <code className="font-mono text-tx-primary text-[11px]">{'<Icon size="lg" aria-label="Settings"><Settings /></Icon>'}</code>
          </div>
        </div>
      </Section>

      {/* ── Avoid ───────────────────────────────────────────────────────────── */}
      <section className="mt-4 mb-10 p-5 rounded-lg border border-bd-default bg-bg-default">
        <h2 className="text-sm font-semibold text-tx-strong mb-3">Avoid</h2>
        <div className="space-y-2">
          {[
            { bad: 'react-icons, heroicons, @fortawesome', good: 'lucide-react only' },
            { bad: 'Custom inline SVGs for common actions', good: 'Use a Lucide icon — 1500+ available' },
            { bad: 'w-[18px] h-[18px] (arbitrary)', good: 'w-4 h-4 (16px) or w-5 h-5 (20px)' },
            { bad: 'text-gray-400 on icons', good: 'text-icon-default or text-icon-weak' },
            { bad: 'text-blue-400 on icons', good: 'text-icon-primary' },
            { bad: 'text-red-400 on icons', good: 'text-icon-critical' },
            { bad: 'strokeWidth={1.5} (custom stroke)', good: 'Default 2px stroke — don\'t override' },
            { bad: 'Missing aria-hidden on decorative icons', good: 'Always add aria-hidden={true}' },
            { bad: 'Icon without label in icon-only buttons', good: 'Add aria-label on the button element' },
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
  title: 'Foundations/Icons',
  parameters: { layout: 'fullscreen' },
};

export default meta;

export const IconSystem: StoryObj = {
  render: () => <IconsPage />,
  name: 'Icons',
};
