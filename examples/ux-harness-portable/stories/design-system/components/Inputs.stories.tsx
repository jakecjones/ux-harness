import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Search, X, ChevronDown, Calendar, AlertCircle, Check, Eye, EyeOff } from 'lucide-react';

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

// ─── Inputs Page ─────────────────────────────────────────────────────────────

const InputsPage: React.FC = () => {
  const { copied, copy } = useCopy();
  const [searchValue, setSearchValue] = useState('');
  const [toggleA, setToggleA] = useState(false);
  const [toggleB, setToggleB] = useState(true);
  const [checkA, setCheckA] = useState(false);
  const [checkB, setCheckB] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-bg-page p-10 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-2xl font-bold text-tx-strong">Inputs</h1>
        <p className="text-sm text-tx-weak mt-1">
          Text fields, selects, toggles, checkboxes, and form patterns — click any recipe to copy.
        </p>
      </div>

      {/* ── Text Inputs ─────────────────────────────────────────────────────── */}
      <Section title="Text Inputs" description="Standard size is px-3 py-2 text-sm. All inputs use bg-bg-default with border-bd-default.">
        <div className="space-y-4 max-w-md">
          {/* Default */}
          <div>
            <label className="flex items-center gap-1 text-sm font-medium text-tx-default mb-1">
              Label
            </label>
            <input
              type="text"
              placeholder="Placeholder text"
              className="w-full px-3 py-2 text-sm border border-bd-default rounded-md focus:outline-none focus:ring-2 focus:ring-blue-accent bg-bg-default text-tx-strong"
            />
          </div>

          {/* With required indicator */}
          <div>
            <label className="flex items-center gap-1 text-sm font-medium text-tx-default mb-1">
              Required field <span className="text-status-critical-text">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter value"
              className="w-full px-3 py-2 text-sm border border-bd-default rounded-md focus:outline-none focus:ring-2 focus:ring-blue-accent bg-bg-default text-tx-strong"
            />
          </div>

          {/* Disabled */}
          <div>
            <label className="flex items-center gap-1 text-sm font-medium text-tx-default mb-1">
              Disabled
            </label>
            <input
              type="text"
              value="Read-only value"
              disabled
              className="w-full px-3 py-2 text-sm border border-bd-default rounded-md bg-bg-elevated text-tx-muted cursor-not-allowed"
            />
          </div>

          {/* Password with toggle */}
          <div>
            <label className="flex items-center gap-1 text-sm font-medium text-tx-default mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                defaultValue="secret123"
                className="w-full px-3 py-2 pr-10 text-sm border border-bd-default rounded-md focus:outline-none focus:ring-2 focus:ring-blue-accent bg-bg-default text-tx-strong"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-tx-muted hover:text-tx-default cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </Section>

      {/* ── Search Input ────────────────────────────────────────────────────── */}
      <Section title="Search Input" description="Left icon, right clear button. Uses pl-8 for icon space.">
        <div className="max-w-md">
          <div className="relative">
            <div className="absolute inset-y-0 left-2 flex items-center pointer-events-none">
              <Search className="w-4 h-4 text-tx-muted" />
            </div>
            <input
              type="text"
              placeholder="Search..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="w-full pl-8 pr-8 py-2 text-sm border border-bd-default rounded-md focus:outline-none focus:ring-2 focus:ring-blue-accent bg-bg-default text-tx-strong"
            />
            {searchValue && (
              <button
                onClick={() => setSearchValue('')}
                className="absolute inset-y-0 right-2 flex items-center text-tx-muted hover:text-tx-default cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </Section>

      {/* ── Select ──────────────────────────────────────────────────────────── */}
      <Section title="Select" description="Native select with appearance-none and custom chevron. Same sizing as text inputs.">
        <div className="space-y-4 max-w-md">
          {/* Default select */}
          <div>
            <label className="flex items-center gap-1 text-sm font-medium text-tx-default mb-1">
              Environment
            </label>
            <div className="relative">
              <select className="w-full px-3 py-2 text-sm border border-bd-default rounded-md focus:outline-none focus:ring-2 focus:ring-blue-accent bg-bg-default text-tx-strong appearance-none cursor-pointer">
                <option>Production</option>
                <option>Staging</option>
                <option>Development</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-tx-default">
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Disabled select */}
          <div>
            <label className="flex items-center gap-1 text-sm font-medium text-tx-default mb-1">
              Disabled
            </label>
            <div className="relative">
              <select disabled className="w-full px-3 py-2 text-sm border border-bd-default rounded-md bg-bg-elevated text-tx-muted appearance-none cursor-not-allowed">
                <option>Locked value</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-tx-muted">
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ── Textarea ────────────────────────────────────────────────────────── */}
      <Section title="Textarea" description="Same border/focus tokens as text inputs. Use resize-vertical or resize-none.">
        <div className="space-y-4 max-w-md">
          <div>
            <label className="flex items-center gap-1 text-sm font-medium text-tx-default mb-1">
              Description
            </label>
            <textarea
              placeholder="Enter a description..."
              rows={3}
              className="w-full px-3 py-2 text-sm border border-bd-default rounded-md focus:outline-none focus:ring-2 focus:ring-blue-accent bg-bg-default text-tx-strong resize-vertical"
            />
          </div>
          <div>
            <label className="flex items-center gap-1 text-sm font-medium text-tx-default mb-1">
              Fixed height (chat-style)
            </label>
            <textarea
              placeholder="Type a message..."
              rows={2}
              className="w-full px-3 py-2 text-sm border border-bd-default rounded-md focus:outline-none focus:ring-2 focus:ring-blue-accent bg-bg-elevated text-tx-strong resize-none"
            />
          </div>
        </div>
      </Section>

      {/* ── Toggles ─────────────────────────────────────────────────────────── */}
      <Section title="Toggle Switches" description="Track with sliding thumb. Blue when active, sunken when off.">
        <div className="space-y-3 max-w-md rounded-lg bg-bg-default border border-bd-default p-4">
          <div
            className="flex items-center justify-between p-3 border border-bd-default rounded-md cursor-pointer hover:bg-interactive-hover/50 transition-colors bg-bg-default"
            onClick={() => setToggleA(!toggleA)}
          >
            <div>
              <p className="text-sm font-medium text-tx-default">Enable notifications</p>
              <p className="text-xs text-tx-muted mt-0.5">Receive alerts when thresholds are crossed</p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={toggleA}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 rounded-xl border-2 border-transparent transition-colors duration-200 ease-in-out cursor-pointer ${
                toggleA ? 'bg-blue-accent' : 'bg-interactive-hover'
              }`}
              onClick={(e) => { e.stopPropagation(); setToggleA(!toggleA); }}
            >
              <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-xl bg-tx-header shadow ring-0 transition duration-200 ease-in-out ${
                toggleA ? 'translate-x-5' : 'translate-x-0'
              }`} />
            </button>
          </div>

          <div
            className="flex items-center justify-between p-3 border border-bd-default rounded-md cursor-pointer hover:bg-interactive-hover/50 transition-colors bg-bg-default"
            onClick={() => setToggleB(!toggleB)}
          >
            <div>
              <p className="text-sm font-medium text-tx-default">Auto-refresh data</p>
              <p className="text-xs text-tx-muted mt-0.5">Polls every 30 seconds for updates</p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={toggleB}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 rounded-xl border-2 border-transparent transition-colors duration-200 ease-in-out cursor-pointer ${
                toggleB ? 'bg-blue-accent' : 'bg-interactive-hover'
              }`}
              onClick={(e) => { e.stopPropagation(); setToggleB(!toggleB); }}
            >
              <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-xl bg-tx-header shadow ring-0 transition duration-200 ease-in-out ${
                toggleB ? 'translate-x-5' : 'translate-x-0'
              }`} />
            </button>
          </div>
        </div>
      </Section>

      {/* ── Checkboxes ──────────────────────────────────────────────────────── */}
      <Section title="Checkboxes" description="Custom div-based checkboxes. Blue-accent fill when checked, bd-default border when unchecked.">
        <div className="space-y-3 max-w-md">
          <label
            className="flex items-center gap-3 p-2 -mx-2 rounded-md hover:bg-interactive-hover/50 transition-colors cursor-pointer"
            onClick={() => setCheckA(!checkA)}
          >
            <div className={`w-5 h-5 border-2 rounded flex items-center justify-center flex-shrink-0 transition-colors ${
              checkA ? 'bg-blue-accent border-blue-accent' : 'border-bd-strong bg-bg-default'
            }`}>
              {checkA && <Check className="w-3 h-3 text-tx-header" />}
            </div>
            <span className="text-sm text-tx-default">Include sample data</span>
          </label>

          <label
            className="flex items-center gap-3 p-2 -mx-2 rounded-md hover:bg-interactive-hover/50 transition-colors cursor-pointer"
            onClick={() => setCheckB(!checkB)}
          >
            <div className={`w-5 h-5 border-2 rounded flex items-center justify-center flex-shrink-0 transition-colors ${
              checkB ? 'bg-blue-accent border-blue-accent' : 'border-bd-strong bg-bg-default'
            }`}>
              {checkB && <Check className="w-3 h-3 text-tx-header" />}
            </div>
            <span className="text-sm text-tx-default">Run validation checks</span>
          </label>

          {/* Disabled */}
          <div className="flex items-center gap-3 p-2 -mx-2 opacity-50 cursor-not-allowed">
            <div className="w-5 h-5 border-2 border-bd-strong rounded flex items-center justify-center flex-shrink-0 bg-bg-elevated">
            </div>
            <span className="text-sm text-tx-muted">Disabled option</span>
          </div>
        </div>
      </Section>

      {/* ── Error States ────────────────────────────────────────────────────── */}
      <Section title="Error States" description="Swap border to status-critical-border and add an error message below.">
        <div className="space-y-4 max-w-md">
          <div>
            <label className="flex items-center gap-1 text-sm font-medium text-tx-default mb-1">
              Email <span className="text-status-critical-text">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value="not-an-email"
                readOnly
                className="w-full px-3 py-2 pr-10 text-sm border border-status-critical-border rounded-md focus:outline-none focus:ring-2 focus:ring-status-critical-border bg-bg-default text-tx-strong"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <AlertCircle className="w-4 h-4 text-status-critical-text" />
              </div>
            </div>
            <p className="text-xs text-status-critical-text mt-1">Please enter a valid email address</p>
          </div>


        </div>
      </Section>

      {/* ── Labels ──────────────────────────────────────────────────────────── */}
      <Section title="Labels" description="Always use text-sm font-medium text-tx-default with mb-1 spacing.">
        <div className="space-y-4 max-w-md">
          <div className="flex flex-col gap-3">
            <div className="flex items-start gap-6">
              <div className="flex-1">
                <label className="flex items-center gap-1 text-sm font-medium text-tx-default mb-1">
                  Standard label
                </label>
                <div className="h-[38px] rounded-md border border-bd-default bg-bg-default" />
              </div>
              <div className="flex-1">
                <label className="flex items-center gap-1 text-sm font-medium text-tx-default mb-1">
                  Required <span className="text-status-critical-text">*</span>
                </label>
                <div className="h-[38px] rounded-md border border-bd-default bg-bg-default" />
              </div>
            </div>
            <div>
              <label className="flex items-center gap-1 text-sm font-medium text-tx-default mb-1">
                With helper text
              </label>
              <div className="h-[38px] rounded-md border border-bd-default bg-bg-default" />
              <p className="text-xs text-tx-muted mt-1">Additional context about this field</p>
            </div>
          </div>
        </div>
      </Section>

      {/* ── In Context ──────────────────────────────────────────────────────── */}
      <Section title="In Context" description="How inputs compose inside real forms.">
        <div className="grid grid-cols-2 gap-4">
          {/* Settings form */}
          <div className="rounded-lg bg-bg-default border border-bd-default overflow-hidden">
            <div className="p-4 border-b border-bd-default">
              <h3 className="text-sm font-semibold text-tx-strong">Alert Settings</h3>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="flex items-center gap-1 text-sm font-medium text-tx-default mb-1">
                  Alert name <span className="text-status-critical-text">*</span>
                </label>
                <input
                  type="text"
                  defaultValue="Coverage threshold"
                  className="w-full px-3 py-2 text-sm border border-bd-default rounded-md focus:outline-none focus:ring-2 focus:ring-blue-accent bg-bg-default text-tx-strong"
                />
              </div>
              <div>
                <label className="flex items-center gap-1 text-sm font-medium text-tx-default mb-1">
                  Environment
                </label>
                <div className="relative">
                  <select className="w-full px-3 py-2 text-sm border border-bd-default rounded-md focus:outline-none focus:ring-2 focus:ring-blue-accent bg-bg-default text-tx-strong appearance-none cursor-pointer">
                    <option>Production</option>
                    <option>Staging</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-tx-default">
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 -mx-1 border border-bd-default rounded-md">
                <span className="text-sm font-medium text-tx-default">Enabled</span>
                <button
                  type="button"
                  role="switch"
                  aria-checked={true}
                  className="relative inline-flex h-6 w-11 flex-shrink-0 rounded-xl border-2 border-transparent bg-blue-accent cursor-pointer"
                >
                  <span className="pointer-events-none inline-block h-5 w-5 transform rounded-xl bg-tx-header shadow translate-x-5" />
                </button>
              </div>
            </div>
            <div className="px-4 py-3 border-t border-bd-default flex justify-end gap-2">
              <button className="px-4 py-2 text-sm font-medium text-tx-default bg-bg-elevated hover:bg-interactive-hover rounded-md transition-colors cursor-pointer">Cancel</button>
              <button className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-tx-header bg-brand-primary hover:bg-brand-primary-hover rounded-md transition-colors cursor-pointer">
                <Check className="w-4 h-4" /> Save
              </button>
            </div>
          </div>

          {/* Filter panel */}
          <div className="rounded-lg bg-bg-default border border-bd-default overflow-hidden">
            <div className="p-4 border-b border-bd-default">
              <h3 className="text-sm font-semibold text-tx-strong">Filters</h3>
            </div>
            <div className="p-4 space-y-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-2 flex items-center pointer-events-none">
                  <Search className="w-4 h-4 text-tx-muted" />
                </div>
                <input
                  type="text"
                  placeholder="Search tests..."
                  className="w-full pl-8 pr-3 py-2 text-sm border border-bd-default rounded-md focus:outline-none focus:ring-2 focus:ring-blue-accent bg-bg-default text-tx-strong"
                />
              </div>
              <div className="space-y-2">
                <label className="flex items-center gap-3 cursor-pointer">
                  <div className="w-5 h-5 border-2 bg-blue-accent border-blue-accent rounded flex items-center justify-center">
                    <Check className="w-3 h-3 text-tx-header" />
                  </div>
                  <span className="text-sm text-tx-default">Passing</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <div className="w-5 h-5 border-2 bg-blue-accent border-blue-accent rounded flex items-center justify-center">
                    <Check className="w-3 h-3 text-tx-header" />
                  </div>
                  <span className="text-sm text-tx-default">Failing</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <div className="w-5 h-5 border-2 border-bd-strong bg-bg-default rounded" />
                  <span className="text-sm text-tx-default">Skipped</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ── Recipes ─────────────────────────────────────────────────────────── */}
      <Section title="Recipes" description="Complete class strings for common input patterns. Click to copy.">
        <div className="grid grid-cols-2 gap-3">
          <RecipeRow
            label="Text Input"
            recipe="w-full px-3 py-2 text-sm border border-bd-default rounded-md focus:outline-none focus:ring-2 focus:ring-blue-accent bg-bg-default text-tx-strong"
            desc="Standard text field — most common"
            copied={copied}
            onCopy={copy}
          />
          <RecipeRow
            label="Search Input"
            recipe="w-full pl-8 pr-8 py-2 text-sm border border-bd-default rounded-md focus:outline-none focus:ring-2 focus:ring-blue-accent bg-bg-default text-tx-strong"
            desc="With left icon + right clear button"
            copied={copied}
            onCopy={copy}
          />
          <RecipeRow
            label="Select"
            recipe="w-full px-3 py-2 text-sm border border-bd-default rounded-md focus:outline-none focus:ring-2 focus:ring-blue-accent bg-bg-default text-tx-strong appearance-none"
            desc="Native select with custom chevron"
            copied={copied}
            onCopy={copy}
          />
          <RecipeRow
            label="Textarea"
            recipe="w-full px-3 py-2 text-sm border border-bd-default rounded-md focus:outline-none focus:ring-2 focus:ring-blue-accent bg-bg-default text-tx-strong resize-vertical"
            desc="Multi-line text entry"
            copied={copied}
            onCopy={copy}
          />
          <RecipeRow
            label="Disabled Input"
            recipe="w-full px-3 py-2 text-sm border border-bd-default rounded-md bg-bg-elevated text-tx-muted cursor-not-allowed"
            desc="Read-only / disabled state"
            copied={copied}
            onCopy={copy}
          />
          <RecipeRow
            label="Error Input"
            recipe="w-full px-3 py-2 text-sm border border-status-critical-border rounded-md focus:outline-none focus:ring-2 focus:ring-status-critical-border bg-bg-default text-tx-strong"
            desc="Validation error — red border + ring"
            copied={copied}
            onCopy={copy}
          />
          <RecipeRow
            label="Label"
            recipe="flex items-center gap-1 text-sm font-medium text-tx-default mb-1"
            desc="Standard form label above input"
            copied={copied}
            onCopy={copy}
          />
          <RecipeRow
            label="Toggle Track (on)"
            recipe="relative inline-flex h-6 w-11 flex-shrink-0 rounded-xl border-2 border-transparent bg-blue-accent transition-colors duration-200 ease-in-out cursor-pointer"
            desc="Switch track — active state"
            copied={copied}
            onCopy={copy}
          />
          <RecipeRow
            label="Toggle Track (off)"
            recipe="relative inline-flex h-6 w-11 flex-shrink-0 rounded-xl border-2 border-transparent bg-interactive-hover transition-colors duration-200 ease-in-out cursor-pointer"
            desc="Switch track — inactive state"
            copied={copied}
            onCopy={copy}
          />
          <RecipeRow
            label="Toggle Thumb"
            recipe="pointer-events-none inline-block h-5 w-5 transform rounded-xl bg-tx-header shadow ring-0 transition duration-200 ease-in-out"
            desc="Sliding dot — translate-x-5 when on"
            copied={copied}
            onCopy={copy}
          />
          <RecipeRow
            label="Checkbox (checked)"
            recipe="w-5 h-5 border-2 bg-blue-accent border-blue-accent rounded flex items-center justify-center"
            desc="Blue fill with white check icon"
            copied={copied}
            onCopy={copy}
          />
          <RecipeRow
            label="Checkbox (unchecked)"
            recipe="w-5 h-5 border-2 border-bd-strong bg-bg-default rounded flex items-center justify-center"
            desc="Empty box with strong border"
            copied={copied}
            onCopy={copy}
          />
        </div>
      </Section>

      {/* ── Anatomy ─────────────────────────────────────────────────────────── */}
      <Section title="Anatomy" description="How an input is constructed from tokens.">
        <div className="max-w-lg rounded-lg bg-bg-default border border-bd-default p-6">
          <div className="flex items-center justify-center mb-6">
            <input
              type="text"
              placeholder="Placeholder text"
              className="w-64 px-3 py-2 text-sm border border-bd-default rounded-md focus:outline-none focus:ring-2 focus:ring-blue-accent bg-bg-default text-tx-strong"
            />
          </div>
          <div className="space-y-3">
            {[
              { part: 'Padding', classes: 'px-3 py-2', desc: 'Horizontal md, vertical sm' },
              { part: 'Typography', classes: 'text-sm', desc: '14px — matches label tier' },
              { part: 'Border', classes: 'border border-bd-default', desc: 'Semantic default border' },
              { part: 'Radius', classes: 'rounded-md', desc: '6px — same as buttons' },
              { part: 'Background', classes: 'bg-bg-default', desc: 'Card surface — not page' },
              { part: 'Text', classes: 'text-tx-strong', desc: 'High contrast for typed values' },
              { part: 'Focus', classes: 'focus:ring-2 focus:ring-blue-accent', desc: 'Blue accent ring on focus' },
              { part: 'Disabled', classes: 'bg-bg-elevated text-tx-muted cursor-not-allowed', desc: 'Elevated bg + muted text' },
              { part: 'Error', classes: 'border-status-critical-border', desc: 'Swaps border token only' },
            ].map(row => (
              <div key={row.part} className="text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-20 font-medium text-tx-default flex-shrink-0">{row.part}</span>
                  <code className="font-mono text-tx-primary truncate">{row.classes}</code>
                </div>
                <p className="text-tx-muted mt-0.5 ml-[88px]">{row.desc}</p>
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
            { bad: 'bg-tx-header / bg-gray-800', good: 'bg-bg-default' },
            { bad: 'border-gray-300 / border-gray-600', good: 'border-bd-default' },
            { bad: 'focus:ring-blue-500', good: 'focus:ring-blue-accent' },
            { bad: 'focus:ring-gray-600', good: 'focus:ring-blue-accent (consistent focus)' },
            { bad: 'text-gray-900 / text-gray-100', good: 'text-tx-strong (input value text)' },
            { bad: 'border-red-500 (error)', good: 'border-status-critical-border' },
            { bad: 'text-red-500 (error msg)', good: 'text-status-critical-text' },
            { bad: 'disabled:bg-gray-100', good: 'disabled:bg-bg-elevated' },
            { bad: 'shadow-sm on inputs', good: 'No shadow — shadow-none or omit' },
            { bad: 'dark:bg-gray-800 dark:text-gray-100', good: 'Semantic tokens handle dark mode' },
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
  title: 'Components/Inputs',
  parameters: { layout: 'fullscreen' },
};

export default meta;

export const FormInputs: StoryObj = {
  render: () => <InputsPage />,
  name: 'Inputs',
};
