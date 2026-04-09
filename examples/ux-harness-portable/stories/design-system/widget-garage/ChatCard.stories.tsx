import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { MessageSquare, ChevronRight } from 'lucide-react';

// ─── Chat Card ──────────────────────────────────────────────────────────────

const topics = [
  { id: 'topic-1', label: 'First topic' },
  { id: 'topic-2', label: 'Second topic' },
  { id: 'topic-3', label: 'Third topic' },
  { id: 'topic-4', label: 'Fourth topic' },
];

const ChatCard: React.FC = () => (
  <div className="bg-bg-default border border-bd-default rounded-lg">
    <div className="px-6 py-4 border-b border-bd-default">
      <div className="flex items-center gap-2">
        <div className="text-tx-default flex-shrink-0 w-5 h-5 flex items-center justify-center">
          <MessageSquare className="w-5 h-5" />
        </div>
        <h2 className="text-lg font-semibold text-tx-strong">Chat</h2>
      </div>
      <p className="text-sm text-tx-weak mt-1">Ask a question or pick a topic to get started</p>
    </div>
    <div className="p-6">
      <div className="mb-6">
        <label className="block text-sm font-medium text-tx-default mb-2">Your message</label>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Ask a question..."
            readOnly
            className="flex-1 px-4 py-2 border border-bd-default rounded-md text-tx-strong placeholder-tx-muted bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-accent"
          />
          <button className="px-4 py-2 text-sm font-medium bg-bg-elevated hover:bg-bg-sunken text-tx-default rounded-md transition-colors cursor-pointer">
            Send
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-sm text-tx-weak mb-3">Or select a topic:</p>
        {topics.map((topic) => (
          <button
            key={topic.id}
            className="w-full text-left px-3 py-2 hover:bg-interactive-hover rounded transition-colors group flex items-center justify-between cursor-pointer"
          >
            <span className="text-sm text-tx-default group-hover:text-tx-strong">{topic.label}</span>
            <ChevronRight className="w-4 h-4 text-tx-muted group-hover:text-tx-default transition-colors flex-shrink-0" />
          </button>
        ))}
      </div>
    </div>
  </div>
);

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
  title: 'Widget Garage/Chat Card',
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
      <ChatCard />
      <Info
        note="Chat input with quick topic shortcuts. Topic rows use hover:bg-interactive-hover with a chevron arrow that brightens on hover."
        tokens={['hover:bg-interactive-hover', 'placeholder-tx-muted', 'focus:ring-blue-accent']}
      />
    </>
  ),
};
