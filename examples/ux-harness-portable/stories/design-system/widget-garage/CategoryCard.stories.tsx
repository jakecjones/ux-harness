import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Square, Circle, Triangle, Hexagon, Diamond, FileText, Check, Minus, Plus } from 'lucide-react';

// ─── Semantic token classes ────────────────────────────────────────────────

const barColor: Record<string, string> = {
  blue: 'bg-dt-blue-subtle text-dt-blue-text',
  green: 'bg-dt-green-subtle text-dt-green-text',
  yellow: 'bg-dt-yellow-subtle text-dt-yellow-text',
  orange: 'bg-dt-orange-subtle text-dt-orange-text',
  purple: 'bg-dt-purple-subtle text-dt-purple-text',
};

const typeLabel: Record<string, string> = {
  blue: 'Blue', green: 'Green', yellow: 'Yellow', orange: 'Orange', purple: 'Purple',
};

const iconDef: Record<string, { Icon: React.FC<{ className?: string }>; fill: string; text: string }> = {
  blue: { Icon: Square, fill: 'fill-dt-blue-subtle', text: 'text-dt-blue-text' },
  purple: { Icon: Hexagon, fill: 'fill-dt-purple-subtle', text: 'text-dt-purple-text' },
  green: { Icon: Circle, fill: 'fill-dt-green-subtle', text: 'text-dt-green-text' },
  yellow: { Icon: Triangle, fill: 'fill-dt-yellow-subtle', text: 'text-dt-yellow-text' },
  orange: { Icon: Diamond, fill: 'fill-dt-orange-subtle', text: 'text-dt-orange-text' },
};

const TypeIcon: React.FC<{ type: string }> = ({ type }) => {
  const def = iconDef[type];
  if (!def) return <FileText className="w-10 h-10 text-tx-muted" />;
  const { Icon, fill, text } = def;
  return (
    <svg width="40" height="40" viewBox="0 0 37 37" fill="none" className="flex-shrink-0">
      <circle cx="18.5" cy="18.5" r="18.5" className={fill} />
      <Icon className={text} x="9" y="9" width="19" height="19" />
    </svg>
  );
};

// ─── Cards ─────────────────────────────────────────────────────────────────

const badgeColor: Record<string, string> = {
  blue: 'bg-dt-blue-icon text-bg-default',
  purple: 'bg-dt-purple-icon text-bg-default',
  green: 'bg-dt-green-icon text-bg-default',
  yellow: 'bg-dt-yellow-icon text-bg-default',
  orange: 'bg-dt-orange-icon text-bg-default',
};

const dotColor: Record<string, string> = {
  blue: 'bg-dt-blue-icon',
  purple: 'bg-dt-purple-icon',
  green: 'bg-dt-green-icon',
  yellow: 'bg-dt-yellow-icon',
  orange: 'bg-dt-orange-icon',
};

const CollapsedCard: React.FC<{ name: string; desc: string; type: string; count?: number; warn?: boolean }> = ({ name, desc, type, count, warn }) => (
  <div className="relative w-full text-left p-3 pt-8 rounded-lg border border-bd-default hover:bg-bg-primary/30 hover:border-bd-primary/40 cursor-pointer transition-all overflow-hidden">
    <div className={`absolute top-0 left-0 right-0 h-[22px] px-3 flex items-center ${barColor[type]}`}>
      <span className="text-[9px] font-semibold uppercase tracking-wider">{typeLabel[type]}</span>
    </div>
    {count !== undefined && count > 0 && !warn && (
      <span className={`absolute top-[11px] right-2 inline-flex items-center justify-center min-w-[1.125rem] h-[1.125rem] px-1 rounded-full text-[10px] font-bold leading-none z-10 ${badgeColor[type]}`}>
        {count}
      </span>
    )}
    {warn && (
      <span className="absolute top-[11px] right-2 inline-flex items-center justify-center min-w-[1.125rem] h-[1.125rem] px-1 rounded-full text-[10px] font-bold leading-none z-10 bg-status-critical-text text-bg-default">
        !
      </span>
    )}
    <h5 className="text-sm font-medium text-tx-strong truncate">{name}</h5>
    <p className="text-xs text-tx-weak mt-0.5">{desc}</p>
  </div>
);

const ExpandedCard: React.FC<{ name: string; desc: string; type: string }> = ({ name, desc, type }) => (
  <div className="relative w-full text-left p-3 rounded-lg border border-bd-default hover:bg-bg-primary/30 hover:border-bd-primary/40 cursor-pointer transition-all overflow-hidden">
    <div className="flex items-center">
      <div className="flex-1 min-w-0">
        <h5 className="text-sm font-medium text-tx-strong truncate">{name}</h5>
        <p className="text-xs text-tx-weak mt-0.5">{desc}</p>
      </div>
      <div className="flex-shrink-0 ml-3 text-tx-weak">
        <TypeIcon type={type} />
      </div>
    </div>
  </div>
);

// ─── Sample Data ──────────────────────────────────────────────────────────

const items = [
  { name: 'Item One', desc: 'Short supporting description', type: 'green' },
  { name: 'Item Two', desc: 'Short supporting description', type: 'blue' },
  { name: 'Item Three', desc: 'Short supporting description', type: 'purple' },
  { name: 'Item Four', desc: 'Short supporting description', type: 'yellow' },
  { name: 'Item Five', desc: 'Short supporting description', type: 'orange' },
];

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

// ─── Cache-style badge with count ──────────────────────────────────────────

const ExpandedCardWithBadge: React.FC<{
  name: string; desc: string; type: string; count: number; warn?: boolean;
}> = ({ name, desc, type, count, warn }) => (
  <div className="relative w-full text-left p-3 rounded-lg border border-bd-default hover:bg-bg-primary/30 hover:border-bd-primary/40 cursor-pointer transition-all overflow-hidden">
    <div className="flex items-center">
      <div className="flex-1 min-w-0">
        <h5 className="text-sm font-medium text-tx-strong truncate">{name}</h5>
        <p className="text-xs text-tx-weak mt-0.5">{desc}</p>
      </div>
      <div className="flex-shrink-0 ml-3">
        <div className="relative group/badge" tabIndex={0}>
          <TypeIcon type={type} />
          {count > 0 && !warn && (
            <span className={`absolute -bottom-1 -left-1 inline-flex items-center justify-center min-w-[1.125rem] h-[1.125rem] px-1 rounded-full text-[10px] font-bold leading-none ${badgeColor[type]}`}>
              {count}
            </span>
          )}
          {warn && (
            <span className="absolute -bottom-1 -left-1 inline-flex items-center justify-center min-w-[1.125rem] h-[1.125rem] px-1 rounded-full text-[10px] font-bold leading-none bg-status-critical-text text-bg-default">
              !
            </span>
          )}
          <span className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover/badge:flex group-focus-within/badge:flex flex-col items-center z-50">
            <span className="whitespace-nowrap rounded-md bg-bg-elevated px-3 py-2 text-xs text-tx-strong shadow-lg border border-bd-default">
              {warn ? (
                <span className="text-status-critical-text font-medium">Disabled</span>
              ) : (
                <span className="flex items-center gap-1.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${dotColor[type]}`} />
                  <span className="font-medium">{count} {count === 1 ? 'item' : 'items'} ready</span>
                </span>
              )}
            </span>
            <span className="w-2 h-2 bg-bg-elevated rotate-45 -mt-1 border-b border-r border-bd-default" />
          </span>
        </div>
      </div>
    </div>
  </div>
);

// ─── Compact Card with states ─────────────────────────────────────────────

const CompactCard: React.FC<{
  name: string; desc: string; type: string;
  selected?: boolean; disabled?: boolean; running?: boolean;
}> = ({ name, desc, type, selected, disabled, running }) => (
  <div className={`relative w-full h-full text-left p-3 pt-8 rounded-lg border transition-all group flex flex-col justify-center ${
    disabled
      ? 'border-bd-default bg-bg-default/50 cursor-not-allowed opacity-60'
      : selected
      ? 'bg-bg-primary/30 border-bd-primary/40 hover:bg-bg-primary/40 cursor-pointer'
      : 'border-bd-default hover:bg-bg-primary/30 hover:border-bd-primary/40 cursor-pointer'
  } ${running ? 'opacity-60' : ''}`}>
    <div className={`absolute top-0 left-0 right-0 h-[22px] px-3 flex items-center rounded-t-lg ${barColor[type]}`}>
      <span className="text-[9px] font-semibold uppercase tracking-wider">{typeLabel[type]}</span>
    </div>
    <div className="relative flex items-center">
      {selected && (
        <div className="flex-shrink-0 mr-3">
          <div className="w-5 h-5 rounded border-2 bg-brand-primary border-bd-primary flex items-center justify-center">
            <Check className="w-3 h-3 text-tx-header" />
          </div>
        </div>
      )}
      <div className="flex-1 min-w-0">
        <h5 className="text-sm font-medium text-tx-strong truncate">{name}</h5>
        <p className="text-xs text-tx-weak mt-0.5">{desc}</p>
      </div>
    </div>
  </div>
);

// ─── Animated incrementer demo ────────────────────────────────────────────

const AnimatedCardWithBadge: React.FC<{
  name: string; desc: string; type: string; count: number;
}> = ({ name, desc, type, count }) => (
  <div className="relative w-full text-left p-3 rounded-lg border border-bd-default hover:bg-bg-primary/30 hover:border-bd-primary/40 cursor-pointer transition-all overflow-hidden">
    <div className="flex items-center">
      <div className="flex-1 min-w-0">
        <h5 className="text-sm font-medium text-tx-strong truncate">{name}</h5>
        <p className="text-xs text-tx-weak mt-0.5">{desc}</p>
      </div>
      <div className="flex-shrink-0 ml-3">
        <div className="relative">
          <TypeIcon type={type} />
          <AnimatePresence>
            {count > 0 && (
              <motion.span
                className={`absolute -bottom-1 -left-1 inline-flex items-center justify-center min-w-[1.125rem] h-[1.125rem] px-1 rounded-full text-[10px] font-bold leading-none overflow-hidden ${badgeColor[type]}`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 25 }}
              >
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={count}
                    initial={{ x: -12, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 12, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                  >
                    {count}
                  </motion.span>
                </AnimatePresence>
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  </div>
);

const IncrementDemo: React.FC = () => {
  const [count, setCount] = useState(5);
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="w-72">
        <AnimatedCardWithBadge name="Sample Item" desc="Counter badge with spring physics" type="green" count={count} />
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={() => setCount(c => Math.max(0, c - 1))}
          className="inline-flex items-center justify-center w-8 h-8 bg-bg-default border border-bd-default hover:bg-interactive-active rounded-md transition-colors cursor-pointer"
        >
          <Minus className="w-4 h-4 text-tx-default" />
        </button>
        <span className="text-sm font-mono text-tx-strong w-8 text-center">{count}</span>
        <button
          onClick={() => setCount(c => Math.min(10, c + 1))}
          className="inline-flex items-center justify-center w-8 h-8 bg-bg-default border border-bd-default hover:bg-interactive-active rounded-md transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4 text-tx-default" />
        </button>
      </div>
      <p className="text-xs text-tx-weak">Use +/- to change the count. Badge scales in/out at 0 with spring physics.</p>
    </div>
  );
};

// ─── Story ─────────────────────────────────────────────────────────────────

const meta: Meta = {
  title: 'Widget Garage/Category Card',
  parameters: { layout: 'fullscreen' },
  decorators: [(Story) => (
    <div className="min-h-screen bg-bg-page p-8 flex items-start justify-center">
      <div className="w-full max-w-3xl"><Story /></div>
    </div>
  )],
};

export default meta;

export const Collapsed: StoryObj = {
  render: () => (
    <>
      <div className="flex gap-4">
        <div className="w-72">
          <CollapsedCard name="Sample Item" desc="With count badge" type="green" count={5} />
        </div>
        <div className="w-72">
          <CollapsedCard name="Sample Item" desc="No badge" type="green" />
        </div>
      </div>
      <Info
        note="Colored category bar at top, name + description below. Optional count badge straddles the bar/content boundary at top-right."
        tokens={['bg-dt-{color}-subtle', 'text-dt-{color}-text', 'bg-dt-{color}-icon']}
      />
    </>
  ),
};

export const Expanded: StoryObj = {
  render: () => (
    <>
      <div className="w-80">
        <ExpandedCard name="Sample Item" desc="With circular icon badge" type="green" />
      </div>
      <Info
        note="No bar — circular icon badge on the right. Used in main content grids."
        tokens={['fill-dt-{color}-subtle', 'text-dt-{color}-text']}
      />
    </>
  ),
};

export const AllCollapsed: StoryObj = {
  name: 'All Colors — Collapsed',
  render: () => (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {items.map((it) => <CollapsedCard key={it.name} {...it} />)}
      </div>
      <Info
        note="All five categorical colors in collapsed view. Each bar background and label use the matching dt- tokens."
        tokens={['bg-dt-blue-subtle', 'bg-dt-purple-subtle', 'bg-dt-green-subtle', 'bg-dt-yellow-subtle', 'bg-dt-orange-subtle']}
      />
    </>
  ),
};

export const AllExpanded: StoryObj = {
  name: 'All Colors — Expanded',
  render: () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {items.map((it) => <ExpandedCard key={it.name} {...it} />)}
      </div>
      <Info
        note="All five categorical colors in expanded view. Each icon circle uses fill-dt-{color}-subtle with text-dt-{color}-text for the icon stroke."
        tokens={['fill-dt-blue-subtle', 'fill-dt-purple-subtle', 'fill-dt-green-subtle', 'fill-dt-yellow-subtle', 'fill-dt-orange-subtle']}
      />
    </>
  ),
};

export const CountBadge: StoryObj = {
  name: 'With Count Badge',
  render: () => (
    <>
      <p className="text-xs font-medium text-tx-weak mb-3 uppercase tracking-wider">Expanded view with icon + count badge</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <ExpandedCardWithBadge name="Item One" desc="Five ready" type="green" count={5} />
        <ExpandedCardWithBadge name="Item Two" desc="Three ready" type="blue" count={3} />
        <ExpandedCardWithBadge name="Item Three" desc="Eight ready" type="purple" count={8} />
        <ExpandedCardWithBadge name="Item Four" desc="One ready" type="yellow" count={1} />
        <ExpandedCardWithBadge name="Item Five" desc="None ready" type="orange" count={0} />
      </div>
      <Info
        note="Count badge anchored to the icon. Color matches the data type icon token. Badge disappears when count reaches 0. Hover the icon for tooltip."
        tokens={['bg-dt-{color}-icon', 'text-bg-default']}
      />
    </>
  ),
};

export const CardStates: StoryObj = {
  name: 'Card States',
  render: () => (
    <>
      <p className="text-xs font-medium text-tx-weak mb-3 uppercase tracking-wider">Default / Selected / Disabled / Running</p>
      <div className="grid grid-cols-2 gap-3">
        <CompactCard name="Sample Item" desc="Default state" type="green" />
        <CompactCard name="Sample Item" desc="Selected state" type="green" selected />
        <CompactCard name="Sample Item" desc="Disabled state" type="green" disabled />
        <CompactCard name="Sample Item" desc="Running state" type="green" running />
      </div>
      <Info
        note="Selected uses bg-bg-primary/30 highlight. Disabled drops opacity and removes pointer events. Running dims to 60% opacity."
        tokens={['bg-bg-primary/30', 'border-bd-primary/40', 'opacity-60', 'bg-bg-default/50']}
      />
    </>
  ),
};

export const WarningState: StoryObj = {
  name: 'Warning State',
  render: () => (
    <>
      <p className="text-xs font-medium text-tx-weak mb-3 uppercase tracking-wider">Warning vs active</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <ExpandedCardWithBadge name="Sample Item" desc="Disabled state" type="green" count={0} warn />
        <ExpandedCardWithBadge name="Sample Item" desc="Active state — 5 ready" type="green" count={5} />
      </div>
      <Info
        note="Warning state shows red '!' badge with tooltip. Compare with active state showing count badge."
        tokens={['bg-status-critical-text', 'text-status-critical-text']}
      />
    </>
  ),
};

export const Incrementer: StoryObj = {
  name: 'Badge Incrementer',
  render: () => (
    <>
      <IncrementDemo />
      <Info
        note="Interactive demo — +/- to change count. Badge disappears at 0 and animates with spring physics (Framer Motion)."
        tokens={['bg-dt-green-icon', 'min-w-[1.125rem]', 'rounded-full']}
      />
    </>
  ),
};
