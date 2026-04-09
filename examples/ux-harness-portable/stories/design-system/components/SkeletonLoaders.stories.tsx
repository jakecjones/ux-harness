import React, { useState, useEffect } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Loader2 } from 'lucide-react';

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

// ─── Live Transition Demo ───────────────────────────────────────────────────

const LoadedCard: React.FC = () => (
  <div className="rounded-lg border border-bd-default bg-bg-default overflow-hidden">
    <div className="px-4 pt-4 pb-2 border-b border-bd-default">
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm font-semibold text-tx-strong">Unit Tests</span>
        <span className="px-2 py-0.5 text-xs font-medium rounded bg-status-success-bg text-status-success-text">Healthy</span>
      </div>
      <span className="text-xs text-tx-weak">service-api</span>
    </div>
    <div className="p-4">
      <span className="text-2xl font-bold text-tx-strong">94.2%</span>
      <p className="text-xs text-tx-weak mt-1">Coverage across 148 tests</p>
    </div>
  </div>
);

const TransitionDemo: React.FC = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setLoaded((prev) => !prev), 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-xs">
      {loaded ? (
        <LoadedCard />
      ) : (
        <div className="rounded-lg border border-bd-default bg-bg-default overflow-hidden animate-pulse">
          <div className="px-4 pt-4 pb-2 border-b border-bd-default">
            <div className="flex items-center justify-between mb-2">
              <div className="h-4 w-24 bg-bg-elevated rounded" />
              <div className="h-5 w-16 bg-bg-elevated rounded" />
            </div>
            <div className="h-3 w-20 bg-bg-elevated rounded" />
          </div>
          <div className="p-4">
            <div className="h-7 w-20 bg-bg-elevated rounded mb-2" />
            <div className="h-3 w-40 bg-bg-elevated rounded" />
          </div>
        </div>
      )}
    </div>
  );
};

// ─── Page ────────────────────────────────────────────────────────────────────

const SkeletonLoadersPage: React.FC = () => {
  const { copied, copy } = useCopy();

  return (
    <div className="min-h-screen bg-bg-page text-tx-default p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-2xl font-bold text-tx-strong">Skeleton Loaders</h1>
        <p className="text-sm text-tx-weak mt-1">
          Placeholder shapes that pulse while content loads. Match the layout of the real content to prevent layout shift.
        </p>
      </div>

      {/* Building Blocks */}
      <Section title="Building Blocks" description="Atomic skeleton shapes. Combine these to match any content layout.">
        <div className="rounded-lg border border-bd-default bg-bg-default p-5 space-y-5">
          {[
            { label: 'Text line', el: <div className="h-3 w-48 bg-bg-elevated rounded animate-pulse" />, classes: 'h-3 w-48 bg-bg-elevated rounded animate-pulse' },
            { label: 'Heading', el: <div className="h-5 w-32 bg-bg-elevated rounded animate-pulse" />, classes: 'h-5 w-32 bg-bg-elevated rounded animate-pulse' },
            { label: 'Metric', el: <div className="h-7 w-20 bg-bg-elevated rounded animate-pulse" />, classes: 'h-7 w-20 bg-bg-elevated rounded animate-pulse' },
            { label: 'Badge', el: <div className="h-5 w-16 bg-bg-elevated rounded animate-pulse" />, classes: 'h-5 w-16 bg-bg-elevated rounded animate-pulse' },
            { label: 'Avatar', el: <div className="h-8 w-8 bg-bg-elevated rounded-xl animate-pulse" />, classes: 'h-8 w-8 bg-bg-elevated rounded-xl animate-pulse' },
            { label: 'Button', el: <div className="h-9 w-24 bg-bg-elevated rounded-md animate-pulse" />, classes: 'h-9 w-24 bg-bg-elevated rounded-md animate-pulse' },
            { label: 'Icon', el: <div className="h-5 w-5 bg-bg-elevated rounded animate-pulse" />, classes: 'h-5 w-5 bg-bg-elevated rounded animate-pulse' },
            { label: 'Chart area', el: <div className="h-32 w-full bg-bg-elevated rounded-lg animate-pulse" />, classes: 'h-32 w-full bg-bg-elevated rounded-lg animate-pulse' },
          ].map((block) => (
            <button
              key={block.label}
              onClick={() => copy(block.classes, block.label)}
              className="group flex items-center gap-4 w-full text-left cursor-pointer hover:bg-bg-page rounded-md px-2 py-1.5 -mx-2 transition-colors"
              title={`Click to copy: ${block.classes}`}
            >
              <span className="w-20 text-xs font-medium text-tx-weak flex-shrink-0">{block.label}</span>
              <div className="flex-1">{block.el}</div>
              <code className="text-[10px] font-mono text-tx-muted group-hover:text-tx-primary transition-colors flex-shrink-0">
                {copied === block.label ? <span className="text-status-success-text">Copied!</span> : 'Copy'}
              </code>
            </button>
          ))}
        </div>
      </Section>

      {/* Composed Skeletons */}
      <Section title="Composed Skeletons" description="Full skeleton layouts that mirror real components. The container gets animate-pulse — individual bars don't need it.">
        <div className="grid grid-cols-2 gap-6">
          {/* Metric Card */}
          <div>
            <p className="text-xs font-medium text-tx-weak mb-3">Metric Card</p>
            <div className="rounded-lg border border-bd-default bg-bg-default overflow-hidden animate-pulse">
              <div className="px-4 pt-4 pb-2 border-b border-bd-default">
                <div className="flex items-center justify-between mb-2">
                  <div className="h-4 w-24 bg-bg-elevated rounded" />
                  <div className="h-5 w-16 bg-bg-elevated rounded" />
                </div>
                <div className="h-3 w-20 bg-bg-elevated rounded" />
              </div>
              <div className="p-4 space-y-3">
                <div className="h-7 w-20 bg-bg-elevated rounded" />
                <div className="h-3 w-40 bg-bg-elevated rounded" />
              </div>
            </div>
          </div>

          {/* List Card */}
          <div>
            <p className="text-xs font-medium text-tx-weak mb-3">List Card</p>
            <div className="rounded-lg border border-bd-default bg-bg-default overflow-hidden animate-pulse">
              <div className="px-4 py-3 border-b border-bd-default">
                <div className="h-4 w-28 bg-bg-elevated rounded" />
              </div>
              <div className="p-4 space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="h-4 w-4 bg-bg-elevated rounded-xl" />
                    <div className="h-3 bg-bg-elevated rounded flex-1" />
                    <div className="h-5 w-14 bg-bg-elevated rounded" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Table */}
          <div>
            <p className="text-xs font-medium text-tx-weak mb-3">Table Rows</p>
            <div className="rounded-lg border border-bd-default bg-bg-default overflow-hidden animate-pulse">
              <div className="px-4 py-2.5 border-b border-bd-default flex gap-4">
                <div className="h-3 w-20 bg-bg-elevated rounded" />
                <div className="h-3 w-16 bg-bg-elevated rounded" />
                <div className="h-3 w-24 bg-bg-elevated rounded" />
                <div className="h-3 w-12 bg-bg-elevated rounded" />
              </div>
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="px-4 py-3 border-b border-bd-weak flex gap-4">
                  <div className="h-4 w-24 bg-bg-elevated rounded" />
                  <div className="h-4 w-16 bg-bg-elevated rounded" />
                  <div className="h-4 w-32 bg-bg-elevated rounded" />
                  <div className="h-4 w-14 bg-bg-elevated rounded" />
                </div>
              ))}
            </div>
          </div>

          {/* Profile / Header */}
          <div>
            <p className="text-xs font-medium text-tx-weak mb-3">Profile Header</p>
            <div className="rounded-lg border border-bd-default bg-bg-default p-4 animate-pulse">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 bg-bg-elevated rounded-xl" />
                <div className="space-y-2 flex-1">
                  <div className="h-4 w-32 bg-bg-elevated rounded" />
                  <div className="h-3 w-48 bg-bg-elevated rounded" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-3 w-full bg-bg-elevated rounded" />
                <div className="h-3 w-3/4 bg-bg-elevated rounded" />
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Loading Spinner */}
      <Section title="Loading Spinner" description="Animated spinner using Loader2 from lucide-react. Use for indeterminate loading where skeleton shapes don't apply.">
        <div className="rounded-lg border border-bd-default bg-bg-default p-5">
          <div className="flex items-start gap-8">
            {/* Centered */}
            <div className="flex flex-col items-center gap-2">
              <p className="text-xs font-medium text-tx-weak">Centered</p>
              <div className="flex items-center justify-center w-32 h-24 rounded-lg border border-bd-default">
                <Loader2 className="animate-spin h-8 w-8 text-blue-accent" />
              </div>
            </div>

            {/* Small inline */}
            <div className="flex flex-col items-center gap-2">
              <p className="text-xs font-medium text-tx-weak">Inline</p>
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-bd-default">
                <Loader2 className="animate-spin h-4 w-4 text-blue-accent" />
                <span className="text-xs text-blue-accent">Processing...</span>
              </div>
            </div>

            {/* In button */}
            <div className="flex flex-col items-center gap-2">
              <p className="text-xs font-medium text-tx-weak">Button</p>
              <button className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-tx-header bg-brand-primary rounded-md cursor-wait opacity-80">
                <Loader2 className="animate-spin h-4 w-4" />
                Saving...
              </button>
            </div>

            {/* CSS-only spinner */}
            <div className="flex flex-col items-center gap-2">
              <p className="text-xs font-medium text-tx-weak">CSS-only</p>
              <div className="flex items-center justify-center w-32 h-24 rounded-lg border border-bd-default">
                <div className="animate-spin rounded-xl h-8 w-8 border-3 border-bd-default border-t-brand-primary" />
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Live Transition */}
      <Section title="Loading → Loaded" description="Skeleton replaces with real content. Toggles automatically to show the transition.">
        <div className="rounded-lg border border-bd-default bg-bg-default p-5">
          <TransitionDemo />
        </div>
      </Section>

      {/* In Context */}
      <Section title="In Context" description="Skeleton loaders composed within real layout patterns.">
        <div className="space-y-8">
          {/* Dashboard grid */}
          <div>
            <p className="text-xs font-medium text-tx-weak mb-3">Dashboard Grid (3 cards loading)</p>
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="rounded-lg border border-bd-default bg-bg-default overflow-hidden animate-pulse">
                  <div className="px-4 pt-4 pb-2 border-b border-bd-default">
                    <div className="flex items-center justify-between mb-2">
                      <div className="h-4 w-24 bg-bg-elevated rounded" />
                      <div className="h-5 w-14 bg-bg-elevated rounded" />
                    </div>
                    <div className="h-3 w-20 bg-bg-elevated rounded" />
                  </div>
                  <div className="p-4 space-y-3">
                    <div className="h-8 w-16 bg-bg-elevated rounded" />
                    <div className="h-3 w-32 bg-bg-elevated rounded" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar detail panel */}
          <div>
            <p className="text-xs font-medium text-tx-weak mb-3">Detail Panel Loading</p>
            <div className="rounded-lg border border-bd-default bg-bg-default p-5 max-w-sm animate-pulse">
              <div className="flex items-center gap-3 mb-5">
                <div className="h-10 w-10 bg-bg-elevated rounded-xl" />
                <div className="space-y-2 flex-1">
                  <div className="h-4 w-32 bg-bg-elevated rounded" />
                  <div className="h-3 w-24 bg-bg-elevated rounded" />
                </div>
              </div>
              <div className="space-y-3 mb-5">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="h-3 w-20 bg-bg-elevated rounded" />
                    <div className="h-3 w-16 bg-bg-elevated rounded" />
                  </div>
                ))}
              </div>
              <div className="h-32 w-full bg-bg-elevated rounded-lg" />
            </div>
          </div>
        </div>
      </Section>

      {/* Recipes */}
      <Section title="Recipes" description="Copy-paste class strings for common skeleton patterns.">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <RecipeRow label="Text line" recipe="h-3 bg-bg-elevated rounded animate-pulse" desc="Body text placeholder (12px)" copied={copied} onCopy={copy} />
          <RecipeRow label="Heading" recipe="h-5 w-32 bg-bg-elevated rounded animate-pulse" desc="Title placeholder (20px)" copied={copied} onCopy={copy} />
          <RecipeRow label="Metric" recipe="h-7 w-20 bg-bg-elevated rounded animate-pulse" desc="Large number placeholder (28px)" copied={copied} onCopy={copy} />
          <RecipeRow label="Badge" recipe="h-5 w-16 bg-bg-elevated rounded animate-pulse" desc="Status badge placeholder" copied={copied} onCopy={copy} />
          <RecipeRow label="Avatar" recipe="h-8 w-8 bg-bg-elevated rounded-xl animate-pulse" desc="Circular avatar placeholder" copied={copied} onCopy={copy} />
          <RecipeRow label="Button" recipe="h-9 w-24 bg-bg-elevated rounded-md animate-pulse" desc="Button placeholder" copied={copied} onCopy={copy} />
          <RecipeRow label="Skeleton container" recipe="rounded-lg border border-bd-default bg-bg-default overflow-hidden animate-pulse" desc="Card wrapper — children pulse together" copied={copied} onCopy={copy} />
          <RecipeRow label="Chart area" recipe="h-32 w-full bg-bg-elevated rounded-lg animate-pulse" desc="Chart or large content area" copied={copied} onCopy={copy} />
          <RecipeRow label="Spinner (Loader2)" recipe="animate-spin h-8 w-8 text-blue-accent" desc="Indeterminate spinner icon" copied={copied} onCopy={copy} />
          <RecipeRow label="Spinner (CSS)" recipe="animate-spin rounded-xl h-8 w-8 border-3 border-bd-default border-t-brand-primary" desc="CSS-only spinner, no icon" copied={copied} onCopy={copy} />
          <RecipeRow label="Button loading" recipe="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-tx-header bg-brand-primary rounded-md cursor-wait opacity-80" desc="Button in loading state" copied={copied} onCopy={copy} />
          <RecipeRow label="Inline loading" recipe="flex items-center gap-2 text-xs text-blue-accent" desc="Spinner + text inline" copied={copied} onCopy={copy} />
        </div>
      </Section>

      {/* Anatomy */}
      <Section title="Anatomy" description="How a skeleton card is constructed from tokens.">
        <div className="rounded-lg border border-bd-default bg-bg-default p-5 space-y-4">
          {[
            { part: 'Container', classes: 'rounded-lg border border-bd-default bg-bg-default animate-pulse', desc: 'Card wrapper with pulse animation on the container' },
            { part: 'Bar', classes: 'h-{n} w-{n} bg-bg-elevated rounded', desc: 'Individual placeholder bar — height matches real content' },
            { part: 'Circle', classes: 'h-8 w-8 bg-bg-elevated rounded-xl', desc: 'Avatar or icon circle placeholder' },
            { part: 'Spacing', classes: 'space-y-2 / space-y-3', desc: 'Match spacing of the loaded component' },
            { part: 'Dividers', classes: 'border-b border-bd-default', desc: 'Same borders as the real card' },
            { part: 'Widths', classes: 'w-24 / w-48 / w-3/4 / w-full', desc: 'Vary widths to suggest text length variation' },
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
      <section className="mt-4 mb-10 p-5 rounded-lg border border-bd-default bg-bg-default">
        <h2 className="text-sm font-semibold text-tx-strong mb-3">Avoid</h2>
        <ul className="space-y-2 text-sm text-tx-default">
          <li className="flex items-start gap-2">
            <span className="text-status-critical-text mt-0.5">✗</span>
            <span>Don't use <code className="text-tx-primary font-mono text-xs">bg-gray-700</code> or hardcoded colors — use <code className="text-tx-primary font-mono text-xs">bg-bg-elevated</code></span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-status-critical-text mt-0.5">✗</span>
            <span>Don't put <code className="text-tx-primary font-mono text-xs">animate-pulse</code> on every bar — put it on the container so children pulse in sync</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-status-critical-text mt-0.5">✗</span>
            <span>Don't use a spinner where a skeleton fits — skeletons reduce perceived load time by hinting at content shape</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-status-critical-text mt-0.5">✗</span>
            <span>Don't mismatch skeleton layout vs. loaded layout — that causes layout shift and feels janky</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-status-critical-text mt-0.5">✗</span>
            <span>Don't leave skeletons without <code className="text-tx-primary font-mono text-xs">rounded</code> — bare rectangles look unfinished</span>
          </li>
        </ul>
      </section>
    </div>
  );
};

// ─── Story ───────────────────────────────────────────────────────────────────

const meta: Meta = {
  title: 'Components/Skeleton Loaders',
  parameters: { layout: 'fullscreen' },
};

export default meta;

export const SkeletonSystem: StoryObj = {
  render: () => <SkeletonLoadersPage />,
  name: 'Skeleton Loaders',
};
