import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { motion } from 'framer-motion';
import { Layers, Plus, CheckCircle, Clock } from 'lucide-react';

// ─── Animation ──────────────────────────────────────────────────────────────

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

// ─── Page ───────────────────────────────────────────────────────────────────

const WorkspacePageDemo: React.FC = () => (
  <div className="min-h-screen bg-bg-page p-6">
    <div className="max-w-[1400px] mx-auto">
      <motion.div
        initial="initial"
        animate="in"
        exit="exit"
        variants={pageVariants}
        transition={{ type: 'tween', ease: 'anticipate', duration: 0.5 }}
      >
        {/* Header card — separate from content */}
        <div className="bg-bg-default shadow rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-tx-strong">Workspace</h1>
              <p className="text-sm text-tx-weak mt-1">Header as a standalone card. Action button right-aligned.</p>
            </div>
            <button className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-tx-header bg-brand-primary hover:bg-brand-primary-hover rounded-md transition-colors cursor-pointer">
              <Plus className="w-4 h-4" /> Action
            </button>
          </div>
        </div>

        {/* Split: 3/5 + 2/5 on xl */}
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
          {/* Left panel — wider */}
          <div className="xl:col-span-3">
            <div className="bg-bg-default shadow rounded-lg overflow-hidden">
              <div className="px-5 py-4 border-b border-bd-default">
                <h2 className="text-sm font-semibold text-tx-strong">Left Panel</h2>
                <p className="text-xs text-tx-weak mt-0.5">Takes 3 of 5 columns on xl. Stacks on smaller screens.</p>
              </div>
              <div className="p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {['Action Card', 'Template Card', 'Another Card'].map((name) => (
                  <button key={name} className="text-left p-4 rounded-lg border border-bd-default hover:border-bd-primary bg-bg-default transition-all cursor-pointer group">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-7 h-7 rounded-md bg-status-info-bg flex items-center justify-center text-status-info-text">
                        <Layers className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-medium text-tx-strong group-hover:text-tx-primary transition-colors">{name}</span>
                    </div>
                    <p className="text-xs text-tx-weak">Clickable card with icon, title, and description.</p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right panel — narrower */}
          <div className="xl:col-span-2">
            <div className="bg-bg-default shadow rounded-lg overflow-hidden">
              <div className="px-5 py-4 border-b border-bd-default">
                <h2 className="text-sm font-semibold text-tx-strong">Right Panel</h2>
                <p className="text-xs text-tx-weak mt-0.5">Takes 2 of 5 columns. List layout with divide-y.</p>
              </div>
              <div className="divide-y divide-bd-default">
                <div className="px-5 py-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-tx-strong">List Item</p>
                    <p className="text-xs text-tx-weak font-mono mt-0.5">subtitle in font-mono</p>
                  </div>
                  <CheckCircle className="w-4 h-4 text-status-success-icon" />
                </div>
                <div className="px-5 py-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-tx-strong">Another Item</p>
                    <p className="text-xs text-tx-weak font-mono mt-0.5">loading state</p>
                  </div>
                  <Clock className="w-4 h-4 text-icon-weak animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  </div>
);

// ─── Story ───────────────────────────────────────────────────────────────────

const meta: Meta = {
  title: 'Page Examples/Workspace',
  parameters: { layout: 'fullscreen' },
};

export default meta;

export const Workspace: StoryObj = {
  render: () => <WorkspacePageDemo />,
  name: 'Workspace',
};
