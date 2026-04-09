import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Home, User, ShieldAlert, Blocks, Settings, FileBarChart, Bot, Terminal,
  RefreshCw, Lightbulb, FileText, Tag, ChevronsRight, ChevronsLeft, MessageSquare,
  FlaskConical,
} from 'lucide-react';

// ─── Types ─────────────────────────────────────────────────────────────────

interface NavLink {
  name: string;
  icon: React.ReactNode;
  section: string;
  active?: boolean;
}

// ─── Data ──────────────────────────────────────────────────────────────────

const navSections: Record<string, NavLink[]> = {
  Main: [
    { name: 'Dashboard', icon: <Home className="w-5 h-5" />, section: 'Main', active: true },
    { name: 'Profile', icon: <User className="w-5 h-5" />, section: 'Main' },
  ],
  Admin: [
    { name: 'Access & Alerts', icon: <ShieldAlert className="w-5 h-5" />, section: 'Admin' },
    { name: 'Resources', icon: <Blocks className="w-5 h-5" />, section: 'Admin' },
    { name: 'Branches', icon: <Settings className="w-5 h-5" />, section: 'Admin' },
    { name: 'Rule Engine', icon: <FlaskConical className="w-5 h-5" />, section: 'Admin' },
  ],
  Management: [
    { name: 'Reports', icon: <FileBarChart className="w-5 h-5" />, section: 'Management' },
  ],
  Workspace: [
    { name: 'Assistant', icon: <Bot className="w-5 h-5" />, section: 'Workspace' },
    { name: 'Sync', icon: <RefreshCw className="w-5 h-5" />, section: 'Workspace' },
    { name: 'Tags', icon: <Tag className="w-5 h-5" />, section: 'Workspace' },
  ],
  Insights: [
    { name: 'Highlights', icon: <Lightbulb className="w-5 h-5" />, section: 'Insights' },
  ],
  Resources: [
    { name: 'API Explorer', icon: <Terminal className="w-5 h-5" />, section: 'Resources' },
    { name: 'Documentation', icon: <FileText className="w-5 h-5" />, section: 'Resources' },
  ],
};

// ─── Sidebar Component ─────────────────────────────────────────────────────

const SideNavStory: React.FC<{ collapsed?: boolean; activePath?: string }> = ({
  collapsed: initialCollapsed = false,
  activePath = 'Dashboard',
}) => {
  const [isCollapsed, setIsCollapsed] = useState(initialCollapsed);

  return (
    <div
      className={`${isCollapsed ? 'w-16' : 'w-64'} bg-bg-default h-full border-r border-bd-default transition-all duration-300 ease-in-out flex flex-col`}
    >
      {/* Header */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-bd-default">
        {!isCollapsed && (
          <span className="text-lg font-bold text-tx-strong tracking-tight">App Name</span>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 rounded-md text-tx-default hover:bg-interactive-hover cursor-pointer transition-colors"
        >
          {isCollapsed ? (
            <ChevronsRight className="w-5 h-5" />
          ) : (
            <ChevronsLeft className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 py-4 overflow-y-auto">
        <div className="space-y-1">
          {Object.entries(navSections).map(([section, links]) => (
            <div key={section}>
              {!isCollapsed && (
                <p className={`px-3 mb-2 text-xs font-semibold text-tx-weak uppercase tracking-wider ${section !== 'Main' ? 'mt-6' : ''}`}>
                  {section}
                </p>
              )}
              {isCollapsed && section !== 'Main' && <div className="mt-4" />}
              {links.map((link) => {
                const isActive = link.name === activePath;
                return (
                  <button
                    key={link.name}
                    className={`flex items-center ${
                      isCollapsed ? 'justify-center w-10 mx-auto' : 'px-3 w-full'
                    } py-2 text-sm font-medium rounded-md transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-bg-elevated text-blue-accent'
                        : 'text-tx-weak hover:bg-interactive-hover'
                    }`}
                    title={isCollapsed ? link.name : undefined}
                  >
                    <span className="flex-shrink-0">{link.icon}</span>
                    {!isCollapsed && <span className="ml-3">{link.name}</span>}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-bd-default">
        {!isCollapsed ? (
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-tx-default">App Name</p>
              <p className="text-xs text-tx-weak">v4.2.0</p>
            </div>
            <button className="flex items-center justify-center rounded-md p-2 bg-bg-elevated text-tx-primary hover:bg-interactive-hover transition-colors cursor-pointer">
              <MessageSquare className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <button className="flex items-center justify-center rounded-md p-2 bg-bg-elevated text-tx-primary hover:bg-interactive-hover transition-colors cursor-pointer">
              <MessageSquare className="w-5 h-5" />
            </button>
          </div>
        )}
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
  title: 'Widget Garage/Side Nav',
  parameters: { layout: 'fullscreen' },
  decorators: [(Story) => (
    <div className="min-h-screen bg-bg-page p-8 flex items-start justify-center">
      <div className="h-[700px]"><Story /></div>
    </div>
  )],
};

export default meta;

export const Expanded: StoryObj = {
  render: () => (
    <div className="flex gap-6 items-start">
      <div className="h-[700px] rounded-lg overflow-hidden border border-bd-default">
        <SideNavStory />
      </div>
      <div className="w-72">
        <Info
          note="Full-width sidebar with section headers, active state highlight, collapsible toggle, and footer with version + chat button. Matches the app Sidebar.tsx layout exactly."
          tokens={['bg-bg-default', 'text-blue-accent', 'bg-bg-elevated', 'hover:bg-interactive-hover', 'text-tx-weak']}
        />
      </div>
    </div>
  ),
};

export const Collapsed: StoryObj = {
  render: () => (
    <div className="flex gap-6 items-start">
      <div className="h-[700px] rounded-lg overflow-hidden border border-bd-default">
        <SideNavStory collapsed />
      </div>
      <div className="w-72">
        <Info
          note="Collapsed state — icons only with tooltip titles. Section labels hidden, spacing separators maintained. Toggle button switches to ChevronsRight."
          tokens={['w-16', 'w-10', 'justify-center']}
        />
      </div>
    </div>
  ),
};

export const NestedActive: StoryObj = {
  name: 'Nested Item Active',
  render: () => (
    <div className="flex gap-6 items-start">
      <div className="h-[700px] rounded-lg overflow-hidden border border-bd-default">
        <SideNavStory activePath="Assistant" />
      </div>
      <div className="w-72">
        <Info
          note="Active state on a Workspace link. Active items get bg-bg-elevated + text-blue-accent. Inactive items are text-tx-weak with hover:bg-interactive-hover."
          tokens={['bg-bg-elevated', 'text-blue-accent']}
        />
      </div>
    </div>
  ),
};

export const HighlightsActive: StoryObj = {
  name: 'Highlights Active',
  render: () => (
    <div className="flex gap-6 items-start">
      <div className="h-[700px] rounded-lg overflow-hidden border border-bd-default">
        <SideNavStory activePath="Highlights" />
      </div>
      <div className="w-72">
        <Info
          note="Active state on an Insights link. Shows how deeply nested sections highlight correctly."
        />
      </div>
    </div>
  ),
};
