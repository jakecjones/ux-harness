import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { motion } from 'framer-motion';
import { LayoutGrid, LayoutList, Layers, Shield, Activity, Bot, GitBranch, Settings } from 'lucide-react';

// ─── Animation ──────────────────────────────────────────────────────────────

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

// ─── Data ───────────────────────────────────────────────────────────────────

const items = [
  { icon: <Layers className="w-5 h-5" />, title: 'Templates', desc: 'Reusable starting points' },
  { icon: <Shield className="w-5 h-5" />, title: 'Policies', desc: 'Rules and thresholds' },
  { icon: <Activity className="w-5 h-5" />, title: 'Monitoring', desc: 'Health dashboards' },
  { icon: <Bot className="w-5 h-5" />, title: 'Automation', desc: 'Background workflows' },
  { icon: <GitBranch className="w-5 h-5" />, title: 'Pipelines', desc: 'CI/CD integrations' },
  { icon: <Settings className="w-5 h-5" />, title: 'Configuration', desc: 'Environment settings' },
];

// ─── Page ───────────────────────────────────────────────────────────────────

const CardGridPageDemo: React.FC = () => {
  const [cols, setCols] = useState<3 | 2>(3);

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
            {/* Header */}
            <div className="p-6 border-b border-bd-default">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-semibold text-tx-strong">Card Grid Page</h1>
                  <p className="text-sm text-tx-weak mt-1">Uniform cards in a responsive grid. Toggle column count.</p>
                </div>
                <div className="flex items-center gap-1">
                  {([3, 2] as const).map((n) => (
                    <button
                      key={n}
                      onClick={() => setCols(n)}
                      className={`p-2 rounded-md transition-colors cursor-pointer ${
                        cols === n ? 'bg-interactive-selected text-interactive-selected-text' : 'text-tx-default hover:bg-interactive-hover'
                      }`}
                    >
                      {n === 3 ? <LayoutGrid className="w-4 h-4" /> : <LayoutList className="w-4 h-4" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Grid */}
            <div className="p-6">
              <div className={`grid gap-4 ${cols === 3 ? 'grid-cols-1 md:grid-cols-3' : 'grid-cols-1 md:grid-cols-2'}`}>
                {items.map((item) => (
                  <div
                    key={item.title}
                    className="bg-bg-default border border-bd-default rounded-lg p-4 hover:border-bd-primary transition-all cursor-pointer group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-status-info-bg flex items-center justify-center text-status-info-text mb-3">
                      {item.icon}
                    </div>
                    <p className="text-sm font-semibold text-tx-strong group-hover:text-tx-primary transition-colors">{item.title}</p>
                    <p className="text-xs text-tx-weak mt-1">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Info banner */}
            <div className="px-6 pb-6">
              <div className="bg-bg-elevated p-4 rounded-md">
                <p className="text-sm text-tx-default">
                  Cards use bg-bg-default border border-bd-default rounded-lg. Hover shifts to border-bd-primary. Grid switches between 3-col and 2-col.
                </p>
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
  title: 'Page Examples/Card Grid',
  parameters: { layout: 'fullscreen' },
};

export default meta;

export const CardGrid: StoryObj = {
  render: () => <CardGridPageDemo />,
  name: 'Card Grid',
};
