import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TrendingUp, TrendingDown, Minus, CheckCircle, XCircle, ShieldOff, AlertTriangle, Clock } from 'lucide-react';

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

// ─── Page ────────────────────────────────────────────────────────────────────

const BadgesTagsPage = () => {
  const { copied, copy } = useCopy();
  const [selectedTags, setSelectedTags] = useState<string[]>(['unit', 'integration']);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div className="min-h-screen bg-bg-page text-tx-default p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-2xl font-bold text-tx-strong">Badges & Tags</h1>
        <p className="text-sm text-tx-weak mt-1">
          Small labeling elements for status, metrics, categories, and metadata. Non-interactive unless used as toggleable tags.
        </p>
      </div>

      {/* Status Badges */}
      <Section title="Status Badges" description="The core badge pattern. Uses semantic token classes from the design system. Two shapes: rounded and pill.">
        <div className="rounded-lg border border-bd-default bg-bg-default p-5 space-y-5">
          {/* Rounded */}
          <div>
            <p className="text-xs font-medium text-tx-weak mb-2">Rounded</p>
            <div className="flex flex-wrap gap-3">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-semibold bg-status-success-bg text-status-success-text">
                Success
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-semibold bg-status-warning-bg text-status-warning-text">
                Warning
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-semibold bg-status-critical-bg text-status-critical-text">
                Critical
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-semibold bg-status-info-bg text-status-info-text">
                Info
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-semibold bg-status-warning-bg text-status-warning-text">
                Bypass
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-semibold bg-bg-elevated text-tx-default">
                Neutral
              </span>
            </div>
          </div>
          {/* With Icons */}
          <div>
            <p className="text-xs font-medium text-tx-weak mb-2">With Icons</p>
            <div className="flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-semibold bg-status-success-bg text-status-success-text">
                <CheckCircle className="w-3 h-3" /> Pass
              </span>
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-semibold bg-status-critical-bg text-status-critical-text">
                <XCircle className="w-3 h-3" /> Fail
              </span>
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-xs font-medium bg-status-warning-bg text-status-warning-text">
                <ShieldOff className="w-3 h-3" /> Bypass
              </span>
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-semibold bg-bg-elevated text-tx-weak">
                <Clock className="w-3 h-3" /> Pending
              </span>
            </div>
          </div>
        </div>
      </Section>

      {/* Status Dots */}
      <Section title="Status Dots" description="Minimal indicator using a colored dot and label. Used in dependency health and service status.">
        <div className="rounded-lg border border-bd-default bg-bg-default p-5">
          <div className="flex flex-wrap gap-4">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 text-xs font-medium text-tx-default bg-bg-elevated rounded">
              <span className="h-1.5 w-1.5 rounded bg-status-success-text" />
              Healthy
            </span>
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 text-xs font-medium text-tx-default bg-bg-elevated rounded">
              <span className="h-1.5 w-1.5 rounded bg-status-warning-icon" />
              Warning
            </span>
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 text-xs font-medium text-tx-default bg-bg-elevated rounded">
              <span className="h-1.5 w-1.5 rounded bg-status-critical-icon" />
              Degraded
            </span>
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 text-xs font-medium text-tx-default bg-bg-elevated rounded">
              <span className="h-1.5 w-1.5 rounded bg-status-critical-icon animate-pulse" />
              Degraded (pulsing)
            </span>
          </div>
        </div>
      </Section>

      {/* Delta Badges */}
      <Section title="Delta Badges" description="Trend indicators showing positive, negative, or no change. Used in coverage and metric cards.">
        <div className="rounded-lg border border-bd-default bg-bg-default p-5">
          <div className="flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-status-success-bg-subtle text-status-success-icon">
              <TrendingUp className="w-3 h-3" />
              <span className="text-xs font-medium">+5.2%</span>
            </span>
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-status-critical-bg text-status-critical-text">
              <TrendingDown className="w-3 h-3" />
              <span className="text-xs font-medium">-2.8%</span>
            </span>
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-bg-elevated text-tx-weak">
              <Minus className="w-3 h-3" />
              <span className="text-xs font-medium">0%</span>
            </span>
          </div>
        </div>
      </Section>

      {/* Toggleable Tags */}
      <Section title="Toggleable Tags" description="Interactive tag selector for filtering. Toggle on/off with selected/unselected states.">
        <div className="rounded-lg border border-bd-default bg-bg-default p-5">
          <div className="flex flex-wrap gap-2">
            {['unit', 'integration', 'e2e', 'contract', 'performance'].map((tag) => {
              const isSelected = selectedTags.includes(tag);
              return (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-interactive-selected text-interactive-selected-text border border-bd-primary'
                      : 'bg-bg-elevated text-tx-default hover:bg-interactive-hover border border-bd-default'
                  }`}
                >
                  {tag}
                </button>
              );
            })}
            <button
              disabled
              className="px-4 py-2 rounded-md text-sm font-medium bg-bg-elevated text-tx-weak cursor-not-allowed border border-bd-default"
            >
              disabled
            </button>
          </div>
        </div>
      </Section>

      {/* In Context */}
      <Section title="In Context" description="Badges composed within real layout patterns.">
        <div className="space-y-8">
          {/* Metric Card Row */}
          <div>
            <p className="text-xs font-medium text-tx-weak mb-3">Dashboard Metric Card</p>
            <div className="rounded-lg border border-bd-default bg-bg-default p-4 max-w-xs">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-tx-strong">Unit Tests</span>
                <span className="px-2 py-0.5 text-xs font-medium rounded-md bg-bg-elevated text-tx-default border border-bd-default">
                  service
                </span>
              </div>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-2xl font-bold text-tx-strong">94.2%</span>
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-status-success-bg-subtle text-status-success-icon">
                  <TrendingUp className="w-3 h-3" />
                  <span className="text-xs font-medium">+3.1%</span>
                </span>
              </div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-semibold bg-status-success-bg text-status-success-text">
                Healthy
              </span>
            </div>
          </div>

          {/* Check Results */}
          <div>
            <p className="text-xs font-medium text-tx-weak mb-3">Check Results List</p>
            <div className="rounded-lg border border-bd-default bg-bg-default p-4 max-w-sm space-y-2">
              {[
                { label: 'Config Check', status: 'pass' },
                { label: 'Unit Tests', status: 'fail' },
                { label: 'Contract Tests', status: 'bypass' },
                { label: 'E2E Tests', status: 'pending' },
              ].map((check) => (
                <div key={check.label} className="flex items-center justify-between py-1.5">
                  <span className="text-sm text-tx-default">{check.label}</span>
                  {check.status === 'pass' && (
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-semibold bg-status-success-bg text-status-success-text">
                      <CheckCircle className="w-3 h-3" /> Pass
                    </span>
                  )}
                  {check.status === 'fail' && (
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-semibold bg-status-critical-bg text-status-critical-text">
                      <XCircle className="w-3 h-3" /> Fail
                    </span>
                  )}
                  {check.status === 'bypass' && (
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-xs font-medium bg-status-warning-bg text-status-warning-text">
                      <ShieldOff className="w-3 h-3" /> Bypass
                    </span>
                  )}
                  {check.status === 'pending' && (
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-semibold bg-bg-elevated text-tx-weak">
                      <Clock className="w-3 h-3" /> Pending
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Service Status Row */}
          <div>
            <p className="text-xs font-medium text-tx-weak mb-3">Service Status Bar</p>
            <div className="rounded-lg border border-bd-default bg-bg-default p-4 max-w-md">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-tx-strong">API Gateway</span>
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 text-xs font-medium text-tx-default bg-bg-elevated rounded">
                  <span className="h-1.5 w-1.5 rounded bg-status-success-text" />
                  Healthy
                </span>
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 text-xs font-medium text-tx-default bg-bg-elevated rounded">
                  <span className="h-2 w-2 rounded bg-status-warning-icon animate-pulse" />
                  Cache Warning
                </span>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Recipes */}
      <Section title="Recipes" description="Copy-paste class strings for each badge variant.">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <RecipeRow label="Badge base" recipe="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-semibold" desc="Shared base for all standard badges" copied={copied} onCopy={copy} />
          <RecipeRow label="Success" recipe="bg-status-success-bg text-status-success-text" desc="Healthy, pass, active" copied={copied} onCopy={copy} />
          <RecipeRow label="Warning" recipe="bg-status-warning-bg text-status-warning-text" desc="Warning, caution" copied={copied} onCopy={copy} />
          <RecipeRow label="Critical" recipe="bg-status-critical-bg text-status-critical-text" desc="Error, fail, critical" copied={copied} onCopy={copy} />
          <RecipeRow label="Info" recipe="bg-status-info-bg text-status-info-text" desc="Informational" copied={copied} onCopy={copy} />
          <RecipeRow label="Bypass" recipe="bg-status-warning-bg text-status-warning-text" desc="Bypassed or skipped" copied={copied} onCopy={copy} />
          <RecipeRow label="Neutral" recipe="bg-bg-elevated text-tx-default" desc="Inactive, neutral, default" copied={copied} onCopy={copy} />
          <RecipeRow label="Status dot" recipe="h-1.5 w-1.5 rounded bg-status-[level]-icon" desc="Small colored dot indicator" copied={copied} onCopy={copy} />
          <RecipeRow label="Delta positive" recipe="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-status-success-bg-subtle text-status-success-icon" desc="Positive trend" copied={copied} onCopy={copy} />
          <RecipeRow label="Tag selected" recipe="bg-interactive-selected text-interactive-selected-text border border-bd-primary" desc="Active toggleable tag" copied={copied} onCopy={copy} />
          <RecipeRow label="Tag unselected" recipe="bg-bg-elevated text-tx-default hover:bg-interactive-hover border border-bd-default" desc="Inactive toggleable tag" copied={copied} onCopy={copy} />
        </div>
      </Section>

      {/* Anatomy */}
      <Section title="Anatomy" description="Structural breakdown of badge components.">
        <div className="rounded-lg border border-bd-default bg-bg-default p-5 space-y-4">
          {[
            { part: 'Container', classes: 'inline-flex items-center px-2.5 py-0.5 rounded text-xs font-semibold', desc: 'Inline flex with tight padding and small text' },
            { part: 'Icon (optional)', classes: 'w-3 h-3 + gap-1.5', desc: 'Leading icon at 12px with gap to label' },
            { part: 'Label', classes: 'text-xs font-semibold', desc: 'Badge text content' },
            { part: 'Status dot', classes: 'h-1.5 w-1.5 rounded bg-status-[level]-icon', desc: 'Minimal indicator dot before label' },
            { part: 'Status bg', classes: 'bg-status-[level]-bg', desc: 'Semantic background from token system' },
            { part: 'Status text', classes: 'text-status-[level]-text', desc: 'Semantic text from token system' },
          ].map((row) => (
            <div key={row.part} className="text-xs">
              <div className="flex items-center gap-2">
                <span className="w-24 font-medium text-tx-default flex-shrink-0">{row.part}</span>
                <code className="font-mono text-tx-primary truncate">{row.classes}</code>
              </div>
              <p className="text-tx-muted mt-0.5 ml-[104px]">{row.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Avoid */}
      <Section title="Avoid" description="Anti-patterns to watch for.">
        <div className="rounded-lg border border-bd-default bg-bg-default p-5">
          <ul className="space-y-2 text-sm text-tx-default">
            <li className="flex items-start gap-2">
              <span className="text-status-critical-text mt-0.5">✗</span>
              <span>Don't use raw Tailwind colors like <code className="text-tx-primary font-mono text-xs">bg-green-900/30 text-green-300</code> — use <code className="text-tx-primary font-mono text-xs">bg-status-success-bg text-status-success-text</code></span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-status-critical-text mt-0.5">✗</span>
              <span>Don't hardcode hex values — use semantic token classes like <code className="text-tx-primary font-mono text-xs">bg-status-[level]-bg</code> + <code className="text-tx-primary font-mono text-xs">text-status-[level]-text</code></span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-status-critical-text mt-0.5">✗</span>
              <span>Don't use <code className="text-tx-primary font-mono text-xs">rounded-full</code> — use <code className="text-tx-primary font-mono text-xs">rounded</code> instead</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-status-critical-text mt-0.5">✗</span>
              <span>Don't use badges for long text — keep labels under 15 characters</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-status-critical-text mt-0.5">✗</span>
              <span>Don't use <code className="text-tx-primary font-mono text-xs">text-sm</code> or <code className="text-tx-primary font-mono text-xs">text-base</code> — badges are always <code className="text-tx-primary font-mono text-xs">text-xs</code></span>
            </li>
          </ul>
        </div>
      </Section>
    </div>
  );
};

// ─── Story ───────────────────────────────────────────────────────────────────

const meta: Meta = {
  title: 'Components/Badges',
  parameters: { layout: 'fullscreen' },
};

export default meta;

export const BadgeTags: StoryObj = {
  render: () => <BadgesTagsPage />,
  name: 'Badges',
};
