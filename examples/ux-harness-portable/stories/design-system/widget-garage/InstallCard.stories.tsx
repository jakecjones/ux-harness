import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Sparkles, Copy, Check, ExternalLink } from 'lucide-react';

// ─── Install Card ───────────────────────────────────────────────────────────

const installCommand = 'npm install @your-org/your-package';

const InstallCard: React.FC<{ initialCopied?: boolean }> = ({ initialCopied = false }) => {
  const [copied, setCopied] = useState(initialCopied);

  const handleCopy = () => {
    navigator.clipboard.writeText(installCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-bg-default border border-bd-default rounded-lg">
      <div className="px-6 py-4 border-b border-bd-default">
        <div className="flex items-center gap-2">
          <div className="text-tx-default flex-shrink-0 w-5 h-5 flex items-center justify-center">
            <Sparkles className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-semibold text-tx-strong">Install</h2>
        </div>
        <p className="text-sm text-tx-weak mt-1">Copy the install command and follow the setup steps</p>
      </div>
      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-sm font-medium text-tx-strong mb-2">About</h3>
          <p className="text-sm text-tx-weak">
            Short paragraph describing what is being installed. Two or three sentences explaining the purpose and what the user will gain.
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-tx-default mb-2">Installation Command</label>
          <div className="relative group">
            <pre className="bg-bg-page border border-bd-default rounded-md p-4 text-xs font-mono text-tx-strong overflow-x-auto whitespace-pre-wrap break-all">
              {installCommand}
            </pre>
            <button
              onClick={handleCopy}
              className="absolute top-3 right-3 px-3 py-1.5 bg-bg-default hover:bg-interactive-hover border border-bd-default rounded transition-colors shadow-sm flex items-center gap-1.5 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-status-success-text" />
                  <span className="text-xs font-medium text-status-success-text">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-tx-weak" />
                  <span className="text-xs font-medium text-tx-weak">Copy</span>
                </>
              )}
            </button>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-tx-strong mb-2">Quick Setup</h3>
          <ol className="text-sm text-tx-weak space-y-1 list-decimal list-inside">
            <li>Copy the command above</li>
            <li>Run it in your terminal</li>
            <li>Restart your editor</li>
            <li>Follow the next-steps guide</li>
          </ol>
        </div>

        <a href="#" className="inline-flex items-center gap-2 text-sm text-tx-weak hover:text-tx-default transition-colors cursor-pointer">
          View full documentation <ExternalLink className="w-4 h-4" />
        </a>
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
  title: 'Widget Garage/Install Card',
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
      <InstallCard />
      <Info
        note="Compound card pattern with copy-to-clipboard install command. Pre block uses bg-bg-page for contrast against the card surface."
        tokens={['bg-bg-page', 'text-status-success-text', 'hover:bg-interactive-hover']}
      />
    </>
  ),
};

export const Copied: StoryObj = {
  name: 'Copied State',
  render: () => (
    <>
      <InstallCard initialCopied />
      <Info
        note="After clicking Copy, button shows a green checkmark with 'Copied!' text for 2 seconds."
        tokens={['text-status-success-text']}
      />
    </>
  ),
};
