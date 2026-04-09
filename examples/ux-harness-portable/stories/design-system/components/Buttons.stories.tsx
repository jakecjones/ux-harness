import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { colors } from '@/design-system/tokens';
import { Check, Loader2, Trash2, Download, Plus, X, ChevronDown, ArrowRight, Pin, FileText, MessageSquare, Settings, Copy, ExternalLink } from 'lucide-react';

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

// ─── Live Button ─────────────────────────────────────────────────────────────

const LiveButton: React.FC<{
  label: string;
  className: string;
  copyKey: string;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
  disabled?: boolean;
  copied: string | null;
  onCopy: (text: string, key: string) => void;
}> = ({ label, className, copyKey, icon, iconRight, disabled, copied, onCopy }) => (
  <div className="flex flex-col items-center gap-2">
    <button
      className={className}
      disabled={disabled}
      onClick={(e) => { e.preventDefault(); onCopy(className, copyKey); }}
    >
      {icon}
      {label}
      {iconRight}
    </button>
    <code className="text-[10px] font-mono text-tx-muted text-center max-w-[200px] leading-relaxed">
      {copied === copyKey ? <span className="text-status-success-text">Copied!</span> : copyKey}
    </code>
  </div>
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

// ─── Buttons Page ────────────────────────────────────────────────────────────

const ButtonsPage: React.FC = () => {
  const { copied, copy } = useCopy();

  return (
    <div className="min-h-screen bg-bg-page p-10 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-2xl font-bold text-tx-strong">Buttons</h1>
        <p className="text-sm text-tx-weak mt-1">
          Button variants, sizes, states, and icon patterns — click any button to copy its classes.
        </p>
      </div>

      {/* ── Variants ────────────────────────────────────────────────────────── */}
      <Section title="Variants" description="5 semantic variants. Primary for main actions, Secondary for cancel/back, Light for selected states, Ghost for toolbar items.">
        <div className="flex items-start gap-6 flex-wrap">
          <LiveButton
            label="Primary"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-tx-header bg-brand-primary hover:bg-brand-primary-hover rounded-md transition-colors cursor-pointer"
            copyKey="Primary"
            copied={copied}
            onCopy={copy}
          />
          <LiveButton
            label="Secondary"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-tx-default bg-bg-default border border-bd-default hover:bg-interactive-active rounded-md transition-colors cursor-pointer"
            copyKey="Secondary"
            copied={copied}
            onCopy={copy}
          />
          <LiveButton
            label="Light"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-tx-inverse bg-bg-page hover:bg-bg-sunken rounded-md transition-colors cursor-pointer"
            copyKey="Light"
            copied={copied}
            onCopy={copy}
          />
          <LiveButton
            label="Ghost"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-tx-default hover:bg-interactive-active rounded-md transition-colors cursor-pointer"
            copyKey="Ghost"
            copied={copied}
            onCopy={copy}
          />
          <LiveButton
            label="Danger"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-status-critical-text bg-status-critical-bg hover:brightness-110 rounded-md transition-colors cursor-pointer"
            copyKey="Danger"
            copied={copied}
            onCopy={copy}
          />
        </div>
      </Section>

      {/* ── Sizes ───────────────────────────────────────────────────────────── */}
      <Section title="Sizes" description="3 sizes. Medium is the default. Use Small for dense UIs and inline actions.">
        <div className="flex items-end gap-6">
          <LiveButton
            label="Small"
            className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-tx-header bg-brand-primary hover:bg-brand-primary-hover rounded-md transition-colors cursor-pointer"
            copyKey="sm"
            copied={copied}
            onCopy={copy}
          />
          <LiveButton
            label="Medium"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-tx-header bg-brand-primary hover:bg-brand-primary-hover rounded-md transition-colors cursor-pointer"
            copyKey="md"
            copied={copied}
            onCopy={copy}
          />
          <LiveButton
            label="Large"
            className="inline-flex items-center px-6 py-2.5 text-sm font-medium text-tx-header bg-brand-primary hover:bg-brand-primary-hover rounded-lg transition-colors cursor-pointer"
            copyKey="lg"
            copied={copied}
            onCopy={copy}
          />
        </div>

        <div className="mt-5 grid grid-cols-3 gap-3">
          <RecipeRow label="Small" recipe="px-3 py-1.5 text-xs rounded-md" desc="Compact actions, inline controls" copied={copied} onCopy={copy} />
          <RecipeRow label="Medium (default)" recipe="px-4 py-2 text-sm rounded-md" desc="Standard buttons — most common" copied={copied} onCopy={copy} />
          <RecipeRow label="Large" recipe="px-6 py-2.5 text-sm rounded-lg" desc="Modal CTAs, hero actions" copied={copied} onCopy={copy} />
        </div>
      </Section>

      {/* ── States ──────────────────────────────────────────────────────────── */}
      <Section title="States" description="Hover, focus, disabled, and loading. Disabled uses opacity-50 and cursor-not-allowed.">
        <div className="space-y-6">
          {/* Primary states */}
          <div>
            <p className="text-xs font-medium text-tx-weak mb-3 uppercase tracking-wider">Primary states</p>
            <div className="flex items-start gap-6">
              <LiveButton
                label="Default"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-tx-header bg-brand-primary rounded-md cursor-pointer"
                copyKey="state-default"
                copied={copied}
                onCopy={copy}
              />
              <LiveButton
                label="Hover"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-tx-header bg-brand-primary-hover rounded-md cursor-pointer"
                copyKey="state-hover"
                copied={copied}
                onCopy={copy}
              />
              <LiveButton
                label="Focus"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-tx-header bg-brand-primary rounded-md ring-2 ring-interactive-focus ring-offset-2 ring-offset-bg-page cursor-pointer"
                copyKey="state-focus"
                copied={copied}
                onCopy={copy}
              />
              <LiveButton
                label="Disabled"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-tx-header bg-brand-primary rounded-md opacity-50 cursor-not-allowed"
                copyKey="state-disabled"
                disabled
                copied={copied}
                onCopy={copy}
              />
              <div className="flex flex-col items-center gap-2">
                <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-tx-header bg-brand-primary rounded-md opacity-70 cursor-not-allowed" disabled>
                  <Loader2 className="animate-spin -ml-0.5 mr-2 h-4 w-4" />
                  Loading…
                </button>
                <code className="text-[10px] font-mono text-tx-muted text-center max-w-[200px] leading-relaxed">
                  {copied === 'state-loading' ? <span className="text-status-success-text">Copied!</span> : 'Loading'}
                </code>
              </div>
            </div>
          </div>

          {/* Secondary states */}
          <div>
            <p className="text-xs font-medium text-tx-weak mb-3 uppercase tracking-wider">Secondary states</p>
            <div className="flex items-start gap-6">
              <LiveButton
                label="Default"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-tx-default bg-bg-default border border-bd-default rounded-md cursor-pointer"
                copyKey="sec-default"
                copied={copied}
                onCopy={copy}
              />
              <LiveButton
                label="Hover"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-tx-default bg-interactive-active border border-bd-default rounded-md cursor-pointer"
                copyKey="sec-hover"
                copied={copied}
                onCopy={copy}
              />
              <LiveButton
                label="Disabled"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-tx-default bg-bg-default border border-bd-default rounded-md opacity-50 cursor-not-allowed"
                copyKey="sec-disabled"
                disabled
                copied={copied}
                onCopy={copy}
              />
            </div>
          </div>
        </div>
      </Section>

      {/* ── Icon Buttons ────────────────────────────────────────────────────── */}
      <Section title="With Icons" description="Icons go before the label. Use 16px (w-4 h-4) icons with appropriate spacing.">
        <div className="space-y-6">
          {/* Icon + text */}
          <div>
            <p className="text-xs font-medium text-tx-weak mb-3 uppercase tracking-wider">Icon + Label</p>
            <div className="flex items-start gap-6 flex-wrap">
              <LiveButton
                label="Create"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-tx-header bg-brand-primary hover:bg-brand-primary-hover rounded-md transition-colors cursor-pointer"
                copyKey="icon-create"
                icon={<Plus className="w-4 h-4" />}
                copied={copied}
                onCopy={copy}
              />
              <LiveButton
                label="Save"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-tx-header bg-brand-primary hover:bg-brand-primary-hover rounded-md transition-colors cursor-pointer"
                copyKey="icon-save"
                icon={<Check className="w-4 h-4" />}
                copied={copied}
                onCopy={copy}
              />
              <LiveButton
                label="Delete"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-status-critical-text bg-status-critical-bg hover:brightness-110 rounded-md transition-colors cursor-pointer"
                copyKey="icon-delete"
                icon={<Trash2 className="w-4 h-4" />}
                copied={copied}
                onCopy={copy}
              />
              <LiveButton
                label="Export"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-tx-default bg-bg-default border border-bd-default hover:bg-interactive-active rounded-md transition-colors cursor-pointer"
                copyKey="icon-export"
                icon={<Download className="w-4 h-4" />}
                copied={copied}
                onCopy={copy}
              />
              <LiveButton
                label="View More"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-tx-primary hover:bg-interactive-active rounded-md transition-colors cursor-pointer"
                copyKey="icon-view"
                iconRight={<ArrowRight className="w-4 h-4" />}
                copied={copied}
                onCopy={copy}
              />
              <LiveButton
                label="Options"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-tx-default bg-bg-default border border-bd-default hover:bg-interactive-active rounded-md transition-colors cursor-pointer"
                copyKey="icon-options"
                iconRight={<ChevronDown className="w-4 h-4" />}
                copied={copied}
                onCopy={copy}
              />
            </div>
          </div>

          {/* Icon only */}
          <div>
            <p className="text-xs font-medium text-tx-weak mb-3 uppercase tracking-wider">Icon Only</p>
            <div className="flex items-start gap-6">
              <div className="flex flex-col items-center gap-2">
                <button
                  className="inline-flex items-center justify-center w-8 h-8 text-tx-default hover:bg-interactive-active rounded-md transition-colors cursor-pointer"
                  onClick={() => copy('inline-flex items-center justify-center w-8 h-8 text-tx-default hover:bg-interactive-active rounded-md transition-colors', 'icon-sm')}
                >
                  <X className="w-4 h-4" />
                </button>
                <code className="text-[10px] font-mono text-tx-muted">
                  {copied === 'icon-sm' ? <span className="text-status-success-text">Copied!</span> : 'Square sm'}
                </code>
              </div>
              <div className="flex flex-col items-center gap-2">
                <button
                  className="inline-flex items-center justify-center p-2 text-tx-primary bg-bg-elevated hover:bg-interactive-active rounded-md transition-all cursor-pointer"
                  onClick={() => copy('inline-flex items-center justify-center p-2 text-tx-primary bg-bg-elevated hover:bg-interactive-active rounded-md transition-all', 'icon-nav')}
                >
                  <MessageSquare className="w-5 h-5" />
                </button>
                <code className="text-[10px] font-mono text-tx-muted">
                  {copied === 'icon-nav' ? <span className="text-status-success-text">Copied!</span> : 'Nav icon'}
                </code>
              </div>
              <div className="flex flex-col items-center gap-2">
                <button
                  className="inline-flex items-center justify-center w-10 h-10 text-tx-default bg-bg-elevated hover:bg-interactive-active rounded-xl transition-colors cursor-pointer"
                  onClick={() => copy('inline-flex items-center justify-center w-10 h-10 text-tx-default bg-bg-elevated hover:bg-interactive-active rounded-xl transition-colors', 'icon-circle')}
                >
                  <Settings className="w-5 h-5" />
                </button>
                <code className="text-[10px] font-mono text-tx-muted">
                  {copied === 'icon-circle' ? <span className="text-status-success-text">Copied!</span> : 'Circle md'}
                </code>
              </div>
              <div className="flex flex-col items-center gap-2">
                <button
                  className="inline-flex items-center justify-center w-10 h-10 text-tx-default bg-bg-elevated hover:bg-interactive-active rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-interactive-focus focus:ring-offset-2 cursor-pointer"
                  onClick={() => copy('inline-flex items-center justify-center w-10 h-10 text-tx-default bg-bg-elevated hover:bg-interactive-active rounded-xl transition-colors focus:ring-2 focus:ring-interactive-focus', 'icon-circle-ring')}
                >
                  <FileText className="w-5 h-5" />
                </button>
                <code className="text-[10px] font-mono text-tx-muted">
                  {copied === 'icon-circle-ring' ? <span className="text-status-success-text">Copied!</span> : 'Circle + ring'}
                </code>
              </div>
              <div className="flex flex-col items-center gap-2">
                <button
                  className="inline-flex items-center justify-center w-14 h-14 text-tx-header bg-brand-primary hover:bg-brand-primary-hover rounded-xl shadow-lg hover:scale-105 transition-all cursor-pointer"
                  onClick={() => copy('inline-flex items-center justify-center w-14 h-14 text-tx-header bg-brand-primary hover:bg-brand-primary-hover rounded-xl shadow-lg hover:scale-105 transition-all', 'icon-fab')}
                >
                  <MessageSquare className="w-7 h-7" />
                </button>
                <code className="text-[10px] font-mono text-tx-muted">
                  {copied === 'icon-fab' ? <span className="text-status-success-text">Copied!</span> : 'FAB'}
                </code>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ── Pills & Chips ───────────────────────────────────────────────────── */}
      <Section title="Pills & Chips" description="Rounded-full for tags, filters, and inline suggestions.">
        <div className="flex items-start gap-4 flex-wrap">
          <div className="flex flex-col items-center gap-2">
            <button
              className="text-xs font-medium bg-bg-elevated hover:bg-brand-primary hover:text-tx-header text-tx-primary px-3 py-1 rounded-xl border border-bd-default transition-colors cursor-pointer"
              onClick={() => copy('text-xs font-medium bg-bg-elevated hover:bg-brand-primary hover:text-tx-header text-tx-primary px-3 py-1 rounded-xl border border-bd-default transition-colors', 'pill-suggest')}
            >
              Suggestion chip
            </button>
            <code className="text-[10px] font-mono text-tx-muted">
              {copied === 'pill-suggest' ? <span className="text-status-success-text">Copied!</span> : 'Suggestion'}
            </code>
          </div>
          <div className="flex flex-col items-center gap-2">
            <button
              className="text-xs font-medium text-tx-header bg-brand-primary px-3 py-1 rounded-xl transition-colors cursor-pointer"
              onClick={() => copy('text-xs font-medium text-tx-header bg-brand-primary px-3 py-1 rounded-xl transition-colors', 'pill-active')}
            >
              Active filter
            </button>
            <code className="text-[10px] font-mono text-tx-muted">
              {copied === 'pill-active' ? <span className="text-status-success-text">Copied!</span> : 'Active'}
            </code>
          </div>
          <div className="flex flex-col items-center gap-2">
            <button
              className="text-xs font-medium text-tx-default bg-bg-elevated px-3 py-1 rounded-xl border border-bd-default hover:bg-interactive-active transition-colors cursor-pointer"
              onClick={() => copy('text-xs font-medium text-tx-default bg-bg-elevated px-3 py-1 rounded-xl border border-bd-default hover:bg-interactive-active transition-colors', 'pill-inactive')}
            >
              Inactive filter
            </button>
            <code className="text-[10px] font-mono text-tx-muted">
              {copied === 'pill-inactive' ? <span className="text-status-success-text">Copied!</span> : 'Inactive'}
            </code>
          </div>
          <div className="flex flex-col items-center gap-2">
            <button
              className="inline-flex items-center gap-1 text-xs font-medium text-tx-default bg-bg-elevated px-3 py-1 rounded-xl border border-bd-default hover:bg-interactive-active transition-colors cursor-pointer"
              onClick={() => copy('inline-flex items-center gap-1 text-xs font-medium text-tx-default bg-bg-elevated px-3 py-1 rounded-xl border border-bd-default hover:bg-interactive-active transition-colors', 'pill-dismiss')}
            >
              Dismissible
              <X className="w-3 h-3 text-tx-muted" />
            </button>
            <code className="text-[10px] font-mono text-tx-muted">
              {copied === 'pill-dismiss' ? <span className="text-status-success-text">Copied!</span> : 'Dismissible'}
            </code>
          </div>
        </div>
      </Section>

      {/* ── Button Groups ───────────────────────────────────────────────────── */}
      <Section title="Button Groups" description="Common button pairings. Primary action always goes right.">
        <div className="space-y-6">
          {/* Confirm / Cancel */}
          <div>
            <p className="text-xs font-medium text-tx-weak mb-3 uppercase tracking-wider">Modal footer</p>
            <div className="flex items-center gap-2 p-4 rounded-lg bg-bg-default border border-bd-default max-w-md">
              <div className="flex-1" />
              <button className="px-4 py-2 text-sm font-medium text-tx-default bg-bg-elevated hover:bg-interactive-active rounded-md transition-colors cursor-pointer">
                Cancel
              </button>
              <button className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-tx-header bg-brand-primary hover:bg-brand-primary-hover rounded-md transition-colors cursor-pointer">
                <Check className="w-4 h-4" />
                Save
              </button>
            </div>
          </div>

          {/* Destructive confirm */}
          <div>
            <p className="text-xs font-medium text-tx-weak mb-3 uppercase tracking-wider">Destructive confirmation</p>
            <div className="flex items-center gap-2 p-4 rounded-lg bg-bg-default border border-bd-default max-w-md">
              <div className="flex-1" />
              <button className="px-4 py-2 text-sm font-medium text-tx-default bg-bg-elevated hover:bg-interactive-active rounded-md transition-colors cursor-pointer">
                Cancel
              </button>
              <button className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-status-critical-text bg-status-critical-bg hover:brightness-110 rounded-md transition-colors cursor-pointer">
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          </div>

          {/* Toolbar */}
          <div>
            <p className="text-xs font-medium text-tx-weak mb-3 uppercase tracking-wider">Toolbar strip</p>
            <div className="inline-flex items-center gap-1 p-1 rounded-lg bg-bg-default border border-bd-default">
              <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-tx-default hover:bg-interactive-active rounded-md transition-colors cursor-pointer">
                <Copy className="w-3.5 h-3.5" /> Copy
              </button>
              <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-tx-default hover:bg-interactive-active rounded-md transition-colors cursor-pointer">
                <Download className="w-3.5 h-3.5" /> Export
              </button>
              <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-tx-default hover:bg-interactive-active rounded-md transition-colors cursor-pointer">
                <ExternalLink className="w-3.5 h-3.5" /> Open
              </button>
              <div className="w-px h-5 bg-bd-default mx-0.5" />
              <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-status-critical-text hover:bg-status-critical-bg-subtle rounded-md transition-colors cursor-pointer">
                <Trash2 className="w-3.5 h-3.5" /> Delete
              </button>
            </div>
          </div>
        </div>
      </Section>

      {/* ── Loading Pattern ─────────────────────────────────────────────────── */}
      <Section title="Loading Pattern" description="Replace icon with spinner, dim with opacity-70, and disable. Always show loading text.">
        <div className="flex items-start gap-6">
          <div className="flex flex-col items-center gap-2">
            <button className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-tx-header bg-brand-primary hover:bg-brand-primary-hover rounded-md transition-colors cursor-pointer">
              <Check className="w-4 h-4" />
              Create Alert
            </button>
            <code className="text-[10px] font-mono text-tx-muted">Idle</code>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-tx-muted text-lg">→</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <button className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-tx-header bg-brand-primary rounded-md opacity-70 cursor-not-allowed" disabled>
              <Loader2 className="animate-spin w-4 h-4" />
              Creating…
            </button>
            <code className="text-[10px] font-mono text-tx-muted">Loading</code>
          </div>
        </div>
        <button
          onClick={() => copy('disabled className="... opacity-70 cursor-not-allowed">\n  <Loader2 className="animate-spin w-4 h-4" />\n  Loading…', 'loading-recipe')}
          className="mt-4 group flex items-center justify-between px-3 py-2.5 rounded-md bg-bg-default border border-bd-default hover:border-bd-primary transition-colors cursor-pointer text-left w-full max-w-lg"
        >
          <div>
            <p className="text-xs font-medium text-tx-default">Loading recipe</p>
            <p className="text-[10px] text-tx-muted mt-0.5">Swap icon → Loader2 animate-spin, add opacity-70, disable</p>
          </div>
          <code className="text-[11px] font-mono text-tx-primary flex-shrink-0 ml-3">
            {copied === 'loading-recipe' ? <span className="text-status-success-text">Copied!</span> : 'Copy'}
          </code>
        </button>
      </Section>

      {/* ── Toggle States ──────────────────────────────────────────────────── */}
      <Section title="Toggle States" description="Light variant paired with Secondary for accept/select toggles. White surface = selected.">
        <div className="flex items-start gap-6">
          <div className="flex flex-col items-center gap-2">
            <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-tx-default bg-bg-elevated hover:bg-interactive-active rounded-md transition-colors cursor-pointer">
              Accept
            </button>
            <code className="text-[10px] font-mono text-tx-muted">Unselected</code>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-tx-muted text-lg">→</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-tx-inverse bg-bg-page hover:bg-bg-sunken rounded-md transition-colors cursor-pointer">
              <Check className="w-3 h-3" />
              Accepted
            </button>
            <code className="text-[10px] font-mono text-tx-muted">Selected (Light)</code>
          </div>
        </div>
      </Section>

      {/* ── Recipes ─────────────────────────────────────────────────────────── */}
      <Section title="Recipes" description="Complete class strings for the most common button patterns. Click to copy.">
        <div className="grid grid-cols-2 gap-3">
          <RecipeRow
            label="Primary CTA"
            recipe="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-tx-header bg-brand-primary hover:bg-brand-primary-hover rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            desc="Main page action — create, save, submit"
            copied={copied}
            onCopy={copy}
          />
          <RecipeRow
            label="Secondary"
            recipe="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-tx-default bg-bg-default border border-bd-default hover:bg-interactive-active rounded-md transition-colors"
            desc="Cancel, back, dismiss"
            copied={copied}
            onCopy={copy}
          />
          <RecipeRow
            label="Light"
            recipe="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-tx-inverse bg-bg-page hover:bg-bg-sunken rounded-md transition-colors"
            desc="Accepted state, inverted emphasis"
            copied={copied}
            onCopy={copy}
          />
          <RecipeRow
            label="Ghost"
            recipe="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-tx-default hover:bg-interactive-active rounded-md transition-colors"
            desc="Toolbar items, subtle actions"
            copied={copied}
            onCopy={copy}
          />
          <RecipeRow
            label="Danger"
            recipe="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-status-critical-text bg-status-critical-bg hover:brightness-110 rounded-md transition-colors"
            desc="Delete, remove, destructive"
            copied={copied}
            onCopy={copy}
          />
          <RecipeRow
            label="Nav Icon"
            recipe="inline-flex items-center justify-center p-2 text-tx-primary bg-bg-elevated hover:bg-interactive-active rounded-md transition-all"
            desc="Sidebar chat toggle, nav utility buttons"
            copied={copied}
            onCopy={copy}
          />
          <RecipeRow
            label="Icon Circle"
            recipe="inline-flex items-center justify-center w-10 h-10 text-tx-default bg-bg-elevated hover:bg-interactive-active rounded-xl transition-colors focus:ring-2 focus:ring-interactive-focus"
            desc="Navbar actions, panel toggles"
            copied={copied}
            onCopy={copy}
          />
          <RecipeRow
            label="FAB"
            recipe="inline-flex items-center justify-center w-14 h-14 text-tx-header bg-brand-primary hover:bg-brand-primary-hover rounded-xl shadow-lg hover:scale-105 transition-all"
            desc="Chat toggle, floating action"
            copied={copied}
            onCopy={copy}
          />
          <RecipeRow
            label="Suggestion Chip"
            recipe="text-xs font-medium bg-bg-elevated hover:bg-brand-primary hover:text-tx-header text-tx-primary px-3 py-1 rounded-xl border border-bd-default transition-colors"
            desc="AI suggestions, quick actions"
            copied={copied}
            onCopy={copy}
          />
          <RecipeRow
            label="Small Action"
            recipe="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-tx-default bg-bg-default border border-bd-default hover:bg-interactive-active rounded-md transition-colors"
            desc="Refresh, load, inline controls"
            copied={copied}
            onCopy={copy}
          />
          <RecipeRow
            label="Full-width CTA"
            recipe="flex items-center justify-center gap-1.5 w-full px-4 py-2.5 text-sm font-semibold text-tx-header bg-brand-primary hover:bg-brand-primary-hover rounded-lg transition-colors disabled:opacity-70"
            desc="Modal primary, card action"
            copied={copied}
            onCopy={copy}
          />
        </div>
      </Section>

      {/* ── Anatomy ─────────────────────────────────────────────────────────── */}
      <Section title="Anatomy" description="How a button is constructed from tokens.">
        <div className="max-w-lg rounded-lg bg-bg-default border border-bd-default p-6">
          {/* Annotated button */}
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <button className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-tx-header bg-brand-primary rounded-md">
                <Plus className="w-4 h-4" />
                Create Alert
              </button>
            </div>
          </div>

          {/* Parts breakdown */}
          <div className="space-y-2">
            {[
              { part: 'Layout', classes: 'inline-flex items-center gap-1.5', desc: 'Flex row, icon spacing' },
              { part: 'Padding', classes: 'px-4 py-2', desc: 'Horizontal lg, vertical sm' },
              { part: 'Typography', classes: 'text-sm font-medium', desc: '14px, weight 500' },
              { part: 'Color', classes: 'text-tx-header bg-brand-primary', desc: 'Brand surface + white text' },
              { part: 'Radius', classes: 'rounded-md', desc: '6px — standard control radius' },
              { part: 'Interaction', classes: 'hover:bg-brand-primary-hover transition-colors', desc: 'Darken on hover' },
              { part: 'Disabled', classes: 'disabled:opacity-50 disabled:cursor-not-allowed', desc: 'Dim + block pointer' },
              { part: 'Icon', classes: 'w-4 h-4 (16px)', desc: 'Lucide React, before label' },
            ].map(row => (
              <div key={row.part} className="flex items-start gap-3 text-xs">
                <span className="w-20 font-medium text-tx-default flex-shrink-0">{row.part}</span>
                <code className="font-mono text-tx-primary flex-shrink-0">{row.classes}</code>
                <span className="text-tx-muted">— {row.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── In Context ──────────────────────────────────────────────────────── */}
      <Section title="In Context" description="How buttons compose inside real UI patterns.">
        <div className="grid grid-cols-2 gap-4">
          {/* Card with actions */}
          <div className="rounded-lg bg-bg-default border border-bd-default overflow-hidden">
            <div className="p-4 border-b border-bd-default">
              <h3 className="text-sm font-semibold text-tx-strong">Alert Rule</h3>
              <p className="text-xs text-tx-weak mt-0.5">Coverage drops below 80%</p>
            </div>
            <div className="px-4 py-3 flex justify-end gap-2">
              <button className="px-3 py-1.5 text-xs font-medium text-tx-default hover:bg-interactive-active rounded-md transition-colors cursor-pointer">Edit</button>
              <button className="px-3 py-1.5 text-xs font-medium text-status-critical-text hover:bg-status-critical-bg-subtle rounded-md transition-colors cursor-pointer">Delete</button>
            </div>
          </div>

          {/* Empty state with CTA */}
          <div className="rounded-lg bg-bg-default border border-bd-default p-6 flex flex-col items-center justify-center text-center">
            <p className="text-sm text-tx-weak mb-3">No test suites configured</p>
            <button className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-tx-header bg-brand-primary hover:bg-brand-primary-hover rounded-md transition-colors cursor-pointer">
              <Plus className="w-4 h-4" />
              Add Suite
            </button>
          </div>
        </div>
      </Section>

      {/* ── Avoid ───────────────────────────────────────────────────────────── */}
      <section className="mt-4 mb-10 p-5 rounded-lg border border-bd-default bg-bg-default">
        <h2 className="text-sm font-semibold text-tx-strong mb-3">Avoid</h2>
        <div className="space-y-2">
          {[
            { bad: 'bg-blue-600', good: 'bg-brand-primary' },
            { bad: 'bg-[#228BE6]', good: 'bg-brand-primary' },
            { bad: 'hover:bg-[#1A6EB8]', good: 'hover:bg-brand-primary-hover' },
            { bad: 'bg-red-600', good: 'bg-status-critical-bg' },
            { bad: 'text-red-300', good: 'text-status-critical-text' },
            { bad: 'bg-gray-600 (neutral button)', good: 'bg-bg-elevated hover:bg-interactive-active' },
            { bad: 'bg-[#0284c7] (sky-600)', good: 'bg-brand-primary' },
            { bad: 'bg-bg-page/80 text-gray-900', good: 'bg-bg-page text-tx-inverse (Light variant)' },
            { bad: 'border-gray-300', good: 'border-bd-default' },
            { bad: 'rounded-lg on standard buttons', good: 'rounded-md — lg is for large/full-width only' },
            { bad: 'shadow-sm on buttons', good: 'No shadow — FAB is the only exception (shadow-lg)' },
            { bad: 'Different padding per variant', good: 'Same size classes across all variants' },
            { bad: 'onClick + <a> tag', good: 'Use <button> for actions, <a> for navigation' },
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
  title: 'Components/Buttons',
  parameters: { layout: 'fullscreen' },
};

export default meta;

export const ButtonSystem: StoryObj = {
  render: () => <ButtonsPage />,
  name: 'Buttons',
};
