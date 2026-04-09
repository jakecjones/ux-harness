import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

// ─── Animation ──────────────────────────────────────────────────────────────

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

// ─── Data ───────────────────────────────────────────────────────────────────

const sections = [
  { id: 'overview', label: 'Overview' },
  { id: 'settings', label: 'Settings' },
  { id: 'activity', label: 'Activity' },
];

// ─── Page ───────────────────────────────────────────────────────────────────

const DetailPageDemo: React.FC = () => {
  const [active, setActive] = useState('overview');

  return (
    <div className="min-h-screen bg-bg-page p-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial="initial"
          animate="in"
          exit="exit"
          variants={pageVariants}
          transition={{ type: 'tween', ease: 'anticipate', duration: 0.5 }}
        >
          <div className="bg-bg-default shadow rounded-lg overflow-hidden">
            {/* Header with breadcrumb and inline badge */}
            <div className="p-6 border-b border-bd-default">
              <div className="flex items-center text-xs text-tx-weak mb-4">
                <span className="hover:text-tx-primary cursor-pointer transition-colors">Parent</span>
                <ChevronRight className="w-3.5 h-3.5 mx-1.5" />
                <span className="text-tx-strong">Detail Page</span>
              </div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-semibold text-tx-strong">Detail Page</h1>
                <span className="px-2 py-0.5 rounded text-xs font-semibold bg-status-success-bg text-status-success-text">Badge</span>
              </div>
              <p className="text-sm text-tx-weak mt-1">Title with an inline status badge. Breadcrumb for navigation context.</p>
            </div>

            {/* Split: sidebar + content */}
            <div className="flex">
              {/* Sidebar nav */}
              <div className="w-48 border-r border-bd-default p-3 space-y-1 flex-shrink-0">
                <p className="text-[10px] font-medium text-tx-muted uppercase tracking-wider px-2 py-1">Sections</p>
                {sections.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setActive(s.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                      active === s.id ? 'bg-bg-elevated text-tx-strong' : 'text-tx-default hover:bg-interactive-hover/50'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>

              {/* Content area */}
              <div className="flex-1 p-6">
                <h2 className="text-lg font-semibold text-tx-strong mb-1">
                  {sections.find((s) => s.id === active)?.label}
                </h2>
                <p className="text-sm text-tx-weak mb-6">Content changes when sidebar items are clicked. Active item uses bg-bg-elevated.</p>

                {/* Definition list pattern */}
                <div className="border-t border-bd-default">
                  <dl className="divide-y divide-bd-default">
                    <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                      <dt className="text-sm font-medium text-tx-weak">Label</dt>
                      <dd className="mt-1 text-sm text-tx-default sm:mt-0 sm:col-span-2">Value in text-tx-default. Uses a 3-col grid on sm+.</dd>
                    </div>
                    <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                      <dt className="text-sm font-medium text-tx-weak">Mono Value</dt>
                      <dd className="mt-1 text-sm font-mono text-tx-strong sm:mt-0 sm:col-span-2">font-mono text-tx-strong</dd>
                    </div>
                    <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                      <dt className="text-sm font-medium text-tx-weak">Link Value</dt>
                      <dd className="mt-1 text-sm text-tx-primary cursor-pointer hover:text-tx-strong transition-colors sm:mt-0 sm:col-span-2">text-tx-primary with hover</dd>
                    </div>
                  </dl>
                </div>

                {/* Info panel */}
                <div className="bg-bg-elevated p-4 rounded-md mt-6">
                  <p className="text-xs font-medium text-tx-default mb-2">Info Panel</p>
                  <p className="text-sm text-tx-default">Elevated panels use bg-bg-elevated with rounded-md. No border needed.</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// ─── Story ───────────────────────────────────────────────────────────────────

const meta: Meta = {
  title: 'Page Examples/Detail Page',
  parameters: { layout: 'fullscreen' },
};

export default meta;

export const Detail: StoryObj = {
  render: () => <DetailPageDemo />,
  name: 'Detail Page',
};
