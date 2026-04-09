import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Zap } from 'lucide-react';

// ─── Input Action Card ─────────────────────────────────────────────────────

const InputActionCard: React.FC<{ error?: string }> = ({ error }) => (
  <div className="bg-bg-default border border-bd-default rounded-lg">
    <div className="px-6 py-4 border-b border-bd-default">
      <div className="flex items-center gap-2">
        <div className="text-tx-default flex-shrink-0 w-5 h-5 flex items-center justify-center">
          <Zap className="w-5 h-5" />
        </div>
        <h2 className="text-lg font-semibold text-tx-strong">Input Action</h2>
      </div>
      <p className="text-sm text-tx-weak mt-1">Single input field paired with a primary action</p>
    </div>
    <div className="p-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-tx-default mb-2">Reference</label>
          <input
            type="text"
            placeholder="REF-123"
            readOnly
            className="w-full px-4 py-2 border border-bd-default rounded-md text-tx-strong placeholder-tx-muted bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-accent"
          />
          {error && <p className="mt-2 text-sm text-status-critical-text">{error}</p>}
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-bg-elevated hover:bg-bg-sunken text-tx-default rounded-md transition-colors cursor-pointer">
          <Zap className="w-4 h-4" /> Submit
        </button>
      </div>
    </div>
  </div>
);

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

// ─── Story ─────────────────────────────────────────────────────────────────

const meta: Meta = {
  title: 'Widget Garage/Input Action Card',
  parameters: { layout: 'fullscreen' },
  decorators: [(Story) => (
    <div className="min-h-screen bg-bg-page p-8 flex items-start justify-center">
      <div className="w-full max-w-lg"><Story /></div>
    </div>
  )],
};

export default meta;

export const Default: StoryObj = {
  render: () => (
    <>
      <InputActionCard />
      <Info
        note="Compound card pattern — Header (icon + title + description) above Content (form). Single input field paired with a primary action button."
        tokens={['border-bd-default', 'placeholder-tx-muted', 'focus:ring-blue-accent']}
      />
    </>
  ),
};

export const WithError: StoryObj = {
  name: 'Validation Error',
  render: () => (
    <>
      <InputActionCard error="Invalid reference. Expected format: REF-123" />
      <Info
        note="Invalid input shows error message below the field in critical text color."
        tokens={['text-status-critical-text']}
      />
    </>
  ),
};
