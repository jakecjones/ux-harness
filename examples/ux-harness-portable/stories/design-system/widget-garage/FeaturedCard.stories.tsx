import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ChevronDown, Play, Square, Circle, Triangle, Hexagon, Diamond, FileText } from 'lucide-react';

// ─── Categorical color tokens ───────────────────────────────────────────────

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

const TypeIcon: React.FC<{ type: string; size?: number }> = ({ type, size = 24 }) => {
  const def = iconDef[type];
  if (!def) return <FileText className="w-6 h-6 text-tx-muted" />;
  const { Icon, fill, text } = def;
  const inner = Math.round(size * 0.51);
  const offset = Math.round((size * 37 / 24 - inner) / 2);
  return (
    <svg width={size} height={size} viewBox={`0 0 ${Math.round(size * 37 / 24)} ${Math.round(size * 37 / 24)}`} fill="none" className="flex-shrink-0">
      <circle cx={Math.round(size * 37 / 48)} cy={Math.round(size * 37 / 48)} r={Math.round(size * 37 / 48)} className={fill} />
      <Icon className={text} x={offset} y={offset} width={inner} height={inner} />
    </svg>
  );
};

// ─── Sample Data ────────────────────────────────────────────────────────────

const items = [
  { id: '1', name: 'Sample Item One', desc: 'Short supporting description', type: 'green' },
  { id: '2', name: 'Sample Item Two', desc: 'Short supporting description', type: 'blue' },
  { id: '3', name: 'Sample Item Three', desc: 'Short supporting description', type: 'purple' },
  { id: '4', name: 'Sample Item Four', desc: 'Short supporting description', type: 'yellow' },
  { id: '5', name: 'Sample Item Five', desc: 'Short supporting description', type: 'orange' },
];

// ─── Featured Card ──────────────────────────────────────────────────────────

const FeaturedCard: React.FC<{ item: typeof items[0]; showDropdown?: boolean }> = ({ item, showDropdown = false }) => {
  const [open, setOpen] = useState(showDropdown);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-tx-strong">Featured Item</h2>
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="inline-flex items-center gap-2 px-3 py-2 bg-bg-elevated hover:bg-bg-sunken text-tx-default rounded-md transition-colors text-sm font-medium cursor-pointer"
          >
            Change
            <ChevronDown className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} />
          </button>
          {open && (
            <div className="absolute right-0 mt-2 w-64 bg-bg-default border border-bd-default rounded-lg shadow-lg z-20 max-h-64 overflow-y-auto">
              {items.map((it) => (
                <button
                  key={it.id}
                  className={`w-full text-left px-3 py-2 text-sm hover:bg-interactive-hover transition-colors cursor-pointer ${it.id === item.id ? 'bg-bg-elevated' : ''}`}
                >
                  <div className="flex items-center gap-2">
                    <div className="flex-shrink-0"><TypeIcon type={it.type} size={20} /></div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-tx-strong truncate">{it.name}</div>
                      <div className="text-xs text-tx-weak truncate">{it.desc}</div>
                    </div>
                    {it.id === item.id && (
                      <svg className="w-4 h-4 text-tx-strong flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="relative bg-bg-default border border-bd-default rounded-lg p-4 pt-8 hover:border-bd-primary transition-all overflow-hidden">
        <div className={`absolute top-0 left-0 right-0 h-[22px] px-4 flex items-center ${barColor[item.type]}`}>
          <span className="text-[9px] font-semibold uppercase tracking-wider">{typeLabel[item.type]}</span>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-semibold text-tx-strong truncate">{item.name}</h3>
          <p className="text-sm text-tx-weak mt-0.5">{item.desc}</p>
          <button className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 bg-tx-header hover:bg-bg-elevated text-tx-inverse rounded-md transition-colors text-sm font-medium cursor-pointer">
            <Play className="w-4 h-4" /> Run
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Info Panel ─────────────────────────────────────────────────────────────

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

// ─── Story ──────────────────────────────────────────────────────────────────

const meta: Meta = {
  title: 'Widget Garage/Featured Card',
  parameters: { layout: 'fullscreen' },
  decorators: [(Story) => (
    <div className="min-h-screen bg-bg-page p-8 flex items-start justify-center">
      <div className="w-full max-w-md"><Story /></div>
    </div>
  )],
};

export default meta;

export const Default: StoryObj = {
  render: () => (
    <>
      <FeaturedCard item={items[0]} />
      <Info
        note="Featured card pattern with colored category bar and primary action. Dropdown lets users switch the selected item."
        tokens={['bg-dt-{color}-subtle', 'text-dt-{color}-text', 'hover:bg-interactive-hover']}
      />
    </>
  ),
};

export const Purple: StoryObj = {
  render: () => (
    <>
      <FeaturedCard item={items[2]} />
      <Info note="Purple-tinted bar from dt-purple tokens." />
    </>
  ),
};

export const WithDropdown: StoryObj = {
  name: 'Dropdown Open',
  render: () => (
    <>
      <FeaturedCard item={items[0]} showDropdown />
      <Info
        note="Dropdown shows all available items with category icons, names, descriptions, and a checkmark on the selected item."
        tokens={['bg-bg-elevated', 'hover:bg-interactive-hover', 'shadow-lg']}
      />
    </>
  ),
};
