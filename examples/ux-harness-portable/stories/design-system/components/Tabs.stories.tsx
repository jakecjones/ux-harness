import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Settings, FileText, TrendingUp, BarChart3, CheckCircle, XCircle, ShieldOff, Info, Database, Code, TestTube } from 'lucide-react';

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

// ─── Tab Variants ────────────────────────────────────────────────────────────

const UnderlineTabs = () => {
  const [active, setActive] = useState('overview');
  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'details', label: 'Details' },
    { id: 'history', label: 'History' },
  ];

  return (
    <div className="border-b border-bd-default">
      <div className="flex">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            role="tab"
            aria-selected={active === tab.id}
            className={`relative px-4 py-3 text-sm font-medium transition-colors cursor-pointer ${
              active === tab.id
                ? 'text-blue-accent border-b-2 border-blue-accent bg-bg-elevated'
                : 'text-tx-default hover:text-tx-strong hover:bg-interactive-hover/30'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

const PillTabs = () => {
  const [active, setActive] = useState('coverage');
  const tabs = [
    { id: 'coverage', label: 'Coverage Trend' },
    { id: 'reports', label: 'Recent Reports' },
  ];

  return (
    <nav className="border-b border-bd-default">
      <div className="flex gap-1 px-4 pt-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors cursor-pointer ${
              active === tab.id
                ? 'bg-bg-elevated text-tx-strong'
                : 'text-tx-weak hover:text-tx-strong hover:bg-interactive-hover'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </nav>
  );
};

const CountTabs = () => {
  const [active, setActive] = useState('fields');
  const tabs = [
    { id: 'fields', label: 'Fields', icon: <Database className="w-4 h-4" />, count: 12 },
    { id: 'preview', label: 'Preview', icon: <Code className="w-4 h-4" />, count: 3 },
    { id: 'tests', label: 'Tests', icon: <TestTube className="w-4 h-4" />, count: 8, disabled: false },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-4 h-4" />, disabled: true },
  ];

  return (
    <div className="relative sticky top-0 z-10 bg-bg-default after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-gradient-to-r after:from-bd-default after:to-transparent">
      <div className="flex gap-1 px-2 pt-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => !tab.disabled && setActive(tab.id)}
            disabled={tab.disabled}
            className={`relative px-4 py-2.5 flex items-center space-x-2 text-sm font-medium transition-colors cursor-pointer rounded-t-lg ${
              active === tab.id
                ? 'text-blue-accent bg-bg-elevated border border-bd-default border-b-bg-default -mb-px'
                : tab.disabled
                  ? 'opacity-50 cursor-not-allowed text-tx-weak border border-transparent'
                  : 'text-tx-weak hover:text-tx-strong hover:bg-interactive-hover/30 border border-transparent'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span className="ml-2 text-xs opacity-75">({tab.count})</span>
            )}
            {active === tab.id && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-accent" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

// ─── Sidebar / Vertical Tabs ─────────────────────────────────────────────────

const SidebarTabs = () => {
  const [active, setActive] = useState('config');
  const checks = [
    { id: 'config', label: 'Config Check', desc: 'Validates service configuration', status: 'pass' as const },
    { id: 'unit', label: 'Unit Tests', desc: 'Unit test coverage threshold', status: 'fail' as const },
    { id: 'contract', label: 'Contract Tests', desc: 'API contract validation', status: 'bypass' as const },
    { id: 'e2e', label: 'E2E Tests', desc: 'End-to-end test results', status: 'na' as const },
  ];

  const statusBadge = (status: 'pass' | 'fail' | 'bypass' | 'na') => {
    switch (status) {
      case 'pass':
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-semibold bg-status-success-bg text-status-success-text">
            <CheckCircle className="w-3 h-3" /> Pass
          </span>
        );
      case 'fail':
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-semibold bg-status-critical-bg text-status-critical-text">
            <XCircle className="w-3 h-3" /> Fail
          </span>
        );
      case 'bypass':
        return (
          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-xs font-medium bg-status-warning-bg text-status-warning-text">
            <ShieldOff className="w-3 h-3" /> Bypass
          </span>
        );
      case 'na':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-bg-elevated text-tx-weak">
            N/A
          </span>
        );
    }
  };

  return (
    <div className="w-64 space-y-1">
      {checks.map((check) => (
        <button
          key={check.id}
          onClick={() => setActive(check.id)}
          className={`w-full text-left px-3 py-2.5 rounded-lg transition-all cursor-pointer relative ${
            active === check.id
              ? 'bg-bg-elevated text-tx-strong'
              : 'text-tx-default hover:bg-interactive-hover/50'
          } ${check.status === 'bypass' ? 'opacity-60' : ''}`}
        >
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-sm font-medium ${check.status === 'bypass' ? 'line-through' : ''}`}>
              {check.label}
            </span>
          </div>
          <p className="text-xs text-tx-weak mb-2">{check.desc}</p>
          <div className="flex items-center gap-1.5 min-h-[20px]">
            {statusBadge(check.status)}
          </div>
        </button>
      ))}
    </div>
  );
};

// ─── States ──────────────────────────────────────────────────────────────────

const TabStates = () => (
  <div className="space-y-6">
    {/* Active */}
    <div>
      <p className="text-xs font-medium text-tx-weak mb-2">Active</p>
      <div className="border-b border-bd-default inline-flex">
        <button className="relative px-4 py-3 text-sm font-medium text-blue-accent border-b-2 border-blue-accent bg-bg-elevated cursor-pointer">
          Active Tab
        </button>
      </div>
    </div>

    {/* Inactive */}
    <div>
      <p className="text-xs font-medium text-tx-weak mb-2">Inactive</p>
      <div className="border-b border-bd-default inline-flex">
        <button className="relative px-4 py-3 text-sm font-medium text-tx-default hover:text-tx-strong hover:bg-interactive-hover/30 cursor-pointer transition-colors">
          Inactive Tab
        </button>
      </div>
    </div>

    {/* Disabled */}
    <div>
      <p className="text-xs font-medium text-tx-weak mb-2">Disabled</p>
      <div className="border-b border-bd-default inline-flex">
        <button className="relative px-4 py-3 text-sm font-medium text-tx-weak opacity-50 cursor-not-allowed">
          Disabled Tab
        </button>
      </div>
    </div>

    {/* With count */}
    <div>
      <p className="text-xs font-medium text-tx-weak mb-2">With Count Badge</p>
      <div className="border-b border-bd-default inline-flex">
        <button className="relative px-4 py-3 flex items-center space-x-2 text-sm font-medium text-blue-accent border-b-2 border-blue-accent bg-bg-elevated cursor-pointer">
          <Database className="w-4 h-4" />
          <span>Fields</span>
          <span className="ml-2 text-xs opacity-75">(12)</span>
        </button>
      </div>
    </div>
  </div>
);

// ─── In Context ──────────────────────────────────────────────────────────────

const InContextDemo = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'details', label: 'Details' },
    { id: 'history', label: 'History' },
  ];

  const [sidebarTab, setSidebarTab] = useState('coverage');

  return (
    <div className="space-y-8">
      {/* Modal with tabs */}
      <div>
        <p className="text-xs font-medium text-tx-weak mb-3">Data Form Modal</p>
        <div className="rounded-lg border border-bd-default bg-bg-default overflow-hidden max-w-lg">
          {/* Modal header */}
          <div className="px-4 py-3 border-b border-bd-default">
            <h3 className="text-sm font-semibold text-tx-strong">Create Custom Data</h3>
            <p className="text-xs text-tx-weak mt-0.5">Configure your data entry fields</p>
          </div>
          {/* Tab bar */}
          <div className="border-b border-bd-default">
            <div className="flex">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  role="tab"
                  aria-selected={activeTab === tab.id}
                  className={`relative px-4 py-3 text-sm font-medium transition-colors cursor-pointer ${
                    activeTab === tab.id
                      ? 'text-blue-accent border-b-2 border-blue-accent bg-bg-elevated'
                      : 'text-tx-default hover:text-tx-strong hover:bg-interactive-hover/30'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
          {/* Tab content */}
          <div className="p-4 space-y-3">
            <div className="h-3 w-3/4 bg-bg-elevated rounded animate-pulse" />
            <div className="h-3 w-1/2 bg-bg-elevated rounded animate-pulse" />
            <div className="h-8 w-full bg-bg-elevated rounded animate-pulse" />
            <div className="h-8 w-full bg-bg-elevated rounded animate-pulse" />
          </div>
        </div>
      </div>

      {/* Sidebar + content layout */}
      <div>
        <p className="text-xs font-medium text-tx-weak mb-3">Sidebar Tab Layout</p>
        <div className="rounded-lg border border-bd-default bg-bg-default overflow-hidden flex max-w-2xl">
          {/* Sidebar */}
          <div className="w-48 border-r border-bd-default p-2 space-y-1 flex-shrink-0">
            {[
              { id: 'coverage', label: 'Coverage', icon: <TrendingUp className="w-4 h-4" /> },
              { id: 'reports', label: 'Reports', icon: <FileText className="w-4 h-4" /> },
              { id: 'metrics', label: 'Metrics', icon: <BarChart3 className="w-4 h-4" /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSidebarTab(tab.id)}
                className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-2 text-sm transition-all cursor-pointer ${
                  sidebarTab === tab.id
                    ? 'bg-bg-elevated text-tx-strong font-medium'
                    : 'text-tx-default hover:bg-interactive-hover/50'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
          {/* Content */}
          <div className="flex-1 p-4">
            <div className="mb-3 px-3 py-2 bg-status-info-bg border border-status-info-border rounded-lg">
              <div className="flex items-center gap-2 text-xs text-status-info-text">
                <Info className="w-3.5 h-3.5" />
                <span>Showing data for the last 30 days</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="h-3 w-3/4 bg-bg-elevated rounded animate-pulse" />
              <div className="h-3 w-1/2 bg-bg-elevated rounded animate-pulse" />
              <div className="h-32 w-full bg-bg-elevated rounded animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Page ────────────────────────────────────────────────────────────────────

const TabsPage = () => {
  const { copied, copy } = useCopy();

  return (
    <div className="min-h-screen bg-bg-page text-tx-default p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-2xl font-bold text-tx-strong">Tabs</h1>
        <p className="text-sm text-tx-weak mt-1">
          Navigation pattern for switching between related content panels. Three variants: underline, pill, and sidebar.
        </p>
      </div>

      {/* Variants */}
      <Section title="Variants" description="Tab styles used across the app.">
        <div className="space-y-8">
          {/* Underline */}
          <div className="rounded-lg border border-bd-default bg-bg-default p-5">
            <p className="text-xs font-medium text-tx-weak mb-3">Underline — Primary tab pattern. Used in modals and data forms.</p>
            <UnderlineTabs />
          </div>

          {/* Pill / Rounded */}
          <div className="rounded-lg border border-bd-default bg-bg-default p-5">
            <p className="text-xs font-medium text-tx-weak mb-3">Pill — Rounded-top tabs. Used in team detail panels.</p>
            <PillTabs />
          </div>

          {/* Count Tabs */}
          <div className="rounded-lg border border-bd-default bg-bg-default p-5">
            <p className="text-xs font-medium text-tx-weak mb-3">Count — Tabs with count badges, disabled state, and gradient underline. Used in DataCard.</p>
            <CountTabs />
          </div>

          {/* Sidebar / Vertical */}
          <div className="rounded-lg border border-bd-default bg-bg-default p-5">
            <p className="text-xs font-medium text-tx-weak mb-3">Sidebar — Vertical tabs with status badges. Used in check detail panels.</p>
            <SidebarTabs />
          </div>
        </div>
      </Section>

      {/* States */}
      <Section title="States" description="Individual tab states: active, inactive, disabled, and with count badge.">
        <div className="rounded-lg border border-bd-default bg-bg-default p-5">
          <TabStates />
        </div>
      </Section>

      {/* Accessibility */}
      <Section title="Accessibility" description="ARIA attributes for keyboard-navigable tab interfaces.">
        <div className="rounded-lg border border-bd-default bg-bg-default p-5 space-y-4">
          <div className="space-y-3">
            {[
              { attr: 'role="tab"', desc: 'Each tab button gets the tab role' },
              { attr: 'aria-selected="true|false"', desc: 'Indicates the currently active tab' },
              { attr: 'aria-controls="panel-id"', desc: 'Links tab to its content panel' },
              { attr: 'role="tabpanel"', desc: 'Content area associated with a tab' },
              { attr: 'aria-labelledby="tab-id"', desc: 'Panel references its controlling tab' },
            ].map((row) => (
              <div key={row.attr} className="flex items-start gap-3 text-xs">
                <code className="font-mono text-tx-primary whitespace-nowrap">{row.attr}</code>
                <span className="text-tx-weak">{row.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* In Context */}
      <Section title="In Context" description="Tabs composed within real layout patterns.">
        <InContextDemo />
      </Section>

      {/* Recipes */}
      <Section title="Recipes" description="Copy-paste class strings for each tab variant.">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <RecipeRow label="Tab container" recipe="border-b border-bd-default flex" desc="Horizontal tab bar with bottom border" copied={copied} onCopy={copy} />
          <RecipeRow label="Active (underline)" recipe="text-blue-accent border-b-2 border-blue-accent bg-bg-elevated" desc="Blue text + bottom accent + elevated bg" copied={copied} onCopy={copy} />
          <RecipeRow label="Inactive" recipe="text-tx-default hover:text-tx-strong hover:bg-interactive-hover/30" desc="Default text with hover states" copied={copied} onCopy={copy} />
          <RecipeRow label="Active (pill)" recipe="bg-bg-elevated text-tx-strong rounded-t-lg" desc="Filled background with rounded top" copied={copied} onCopy={copy} />
          <RecipeRow label="Inactive (pill)" recipe="text-tx-weak hover:text-tx-strong hover:bg-interactive-hover rounded-t-lg" desc="Weak text with hover fill" copied={copied} onCopy={copy} />
          <RecipeRow label="Tab button base" recipe="px-4 py-3 flex items-center space-x-2 text-sm font-medium transition-colors cursor-pointer" desc="Shared base for all horizontal tabs" copied={copied} onCopy={copy} />
          <RecipeRow label="Disabled" recipe="opacity-50 cursor-not-allowed text-tx-weak" desc="Reduced opacity, no pointer" copied={copied} onCopy={copy} />
          <RecipeRow label="Count badge" recipe="ml-2 text-xs opacity-75" desc="Parenthesized count after label" copied={copied} onCopy={copy} />
          <RecipeRow label="Sidebar active" recipe="bg-bg-elevated text-tx-strong rounded-lg" desc="Elevated bg for vertical active tab" copied={copied} onCopy={copy} />
          <RecipeRow label="Sidebar inactive" recipe="text-tx-default hover:bg-interactive-hover/50 rounded-lg" desc="Subtle hover for vertical tabs" copied={copied} onCopy={copy} />
          <RecipeRow label="Gradient underline" recipe="after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-gradient-to-r after:from-bd-default after:to-transparent" desc="Pseudo-element gradient divider" copied={copied} onCopy={copy} />
          <RecipeRow label="Active accent bar" recipe="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-accent" desc="Bottom accent indicator on active tab" copied={copied} onCopy={copy} />
        </div>
      </Section>

      {/* Anatomy */}
      <Section title="Anatomy" description="Structural breakdown of tab components.">
        <div className="rounded-lg border border-bd-default bg-bg-default p-5 space-y-4">
          {[
            { part: 'Container', classes: 'border-b border-bd-default flex', desc: 'Flex row with bottom border divider' },
            { part: 'Tab button', classes: 'px-4 py-3 flex items-center space-x-2 text-sm font-medium', desc: 'Individual clickable tab with icon + label' },
            { part: 'Active indicator', classes: 'border-b-2 border-blue-accent', desc: 'Bottom accent line on the active tab' },
            { part: 'Icon', classes: 'w-4 h-4', desc: 'Leading icon sized at 16px' },
            { part: 'Label', classes: 'text-sm font-medium', desc: 'Tab text label' },
            { part: 'Count', classes: 'ml-2 text-xs opacity-75', desc: 'Optional parenthesized count badge' },
            { part: 'Panel', classes: 'role="tabpanel"', desc: 'Content area controlled by the tab' },
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
              <span>Don't use raw colors for active state — use <code className="text-tx-primary font-mono text-xs">text-blue-accent</code> and <code className="text-tx-primary font-mono text-xs">border-blue-accent</code></span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-status-critical-text mt-0.5">✗</span>
              <span>Don't mix tab variants in the same container — pick one style per context</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-status-critical-text mt-0.5">✗</span>
              <span>Don't omit <code className="text-tx-primary font-mono text-xs">role="tab"</code> and <code className="text-tx-primary font-mono text-xs">aria-selected</code> — tabs need ARIA for screen readers</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-status-critical-text mt-0.5">✗</span>
              <span>Don't use <code className="text-tx-primary font-mono text-xs">bg-gray-50</code> or <code className="text-tx-primary font-mono text-xs">hover:text-gray-900</code> — use <code className="text-tx-primary font-mono text-xs">bg-interactive-hover</code> and <code className="text-tx-primary font-mono text-xs">text-tx-strong</code></span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-status-critical-text mt-0.5">✗</span>
              <span>Don't nest more than 7 tabs — consider a dropdown or secondary nav for overflow</span>
            </li>
          </ul>
        </div>
      </Section>
    </div>
  );
};

// ─── Story ───────────────────────────────────────────────────────────────────

const meta: Meta = {
  title: 'Components/Tabs',
  parameters: { layout: 'fullscreen' },
};

export default meta;

export const TabSystem: StoryObj = {
  render: () => <TabsPage />,
  name: 'Tabs',
};
