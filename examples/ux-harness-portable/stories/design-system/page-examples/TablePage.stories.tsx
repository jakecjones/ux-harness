import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { motion } from 'framer-motion';
import { ChevronRight, CheckCircle, XCircle } from 'lucide-react';

// ─── Animation ──────────────────────────────────────────────────────────────

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

// ─── Page ───────────────────────────────────────────────────────────────────

const TablePageDemo: React.FC = () => (
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
          {/* Header with breadcrumb */}
          <div className="p-6 border-b border-bd-default">
            <div className="flex items-center text-xs text-tx-weak mb-4">
              <span className="hover:text-tx-primary cursor-pointer transition-colors">Parent</span>
              <ChevronRight className="w-3.5 h-3.5 mx-1.5" />
              <span className="text-tx-strong">Current Page</span>
            </div>
            <h1 className="text-2xl font-semibold text-tx-strong">Table Page</h1>
            <p className="text-sm text-tx-weak mt-1">Breadcrumb above the title. Header separated by border-b.</p>
          </div>

          {/* Table */}
          <table className="min-w-full divide-y divide-bd-default">
            <thead className="bg-bg-elevated">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-tx-default uppercase tracking-wider">ID Column</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-tx-default uppercase tracking-wider">Name Column</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-tx-default uppercase tracking-wider">Detail Column</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-tx-default uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-bd-default">
              <tr className="hover:bg-interactive-hover/50 cursor-pointer transition-colors">
                <td className="px-4 py-3 text-xs font-mono text-tx-primary">ID-001</td>
                <td className="px-4 py-3 text-sm text-tx-strong">Row title in text-tx-strong</td>
                <td className="px-4 py-3 text-xs font-mono text-tx-weak">detail-value</td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-status-success-bg text-status-success-text">
                    <CheckCircle className="w-3 h-3" /> Pass
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-interactive-hover/50 cursor-pointer transition-colors">
                <td className="px-4 py-3 text-xs font-mono text-tx-primary">ID-002</td>
                <td className="px-4 py-3 text-sm text-tx-strong">Another row title</td>
                <td className="px-4 py-3 text-xs font-mono text-tx-weak">another-value</td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-status-critical-bg text-status-critical-text">
                    <XCircle className="w-3 h-3" /> Fail
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-interactive-hover/50 cursor-pointer transition-colors">
                <td className="px-4 py-3 text-xs font-mono text-tx-primary">ID-003</td>
                <td className="px-4 py-3 text-sm text-tx-strong">Third row</td>
                <td className="px-4 py-3 text-xs font-mono text-tx-weak">third-value</td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-status-success-bg text-status-success-text">
                    <CheckCircle className="w-3 h-3" /> Pass
                  </span>
                </td>
              </tr>
            </tbody>
          </table>

          {/* Footer note */}
          <div className="px-6 py-4 border-t border-bd-default">
            <p className="text-xs text-tx-muted">Table headers use bg-bg-elevated with uppercase tracking-wider. Rows hover with bg-interactive-hover/50.</p>
          </div>
        </div>
      </motion.div>
    </div>
  </div>
);

// ─── Story ───────────────────────────────────────────────────────────────────

const meta: Meta = {
  title: 'Page Examples/Table Page',
  parameters: { layout: 'fullscreen' },
};

export default meta;

export const Table: StoryObj = {
  render: () => <TablePageDemo />,
  name: 'Table Page',
};
