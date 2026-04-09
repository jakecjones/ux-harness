import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { motion } from 'framer-motion';
import {
  CheckCircle, XCircle, ShieldOff, GitBranch, Rocket,
  AlertTriangle, Settings, RefreshCw, Bot, Users, ChevronDown, ChevronUp,
} from 'lucide-react';

// ─── Animation ──────────────────────────────────────────────────────────────

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

// ─── Types ──────────────────────────────────────────────────────────────────

type TimelineEvent = {
  id: string;
  type: 'deploy' | 'test-pass' | 'test-fail' | 'bypass' | 'alert' | 'config' | 'data-gen' | 'team';
  title: string;
  desc: string;
  time: string;
  actor?: string;
  details?: string[];
  branch?: string;
};

// ─── Event Config ───────────────────────────────────────────────────────────

const eventStyles: Record<TimelineEvent['type'], { icon: React.ReactNode; dot: string; badge: string; badgeText: string }> = {
  'deploy': {
    icon: <Rocket className="w-3.5 h-3.5" />,
    dot: 'bg-status-info-icon',
    badge: 'bg-status-info-bg text-status-info-text',
    badgeText: 'Deploy',
  },
  'test-pass': {
    icon: <CheckCircle className="w-3.5 h-3.5" />,
    dot: 'bg-status-success-icon',
    badge: 'bg-status-success-bg text-status-success-text',
    badgeText: 'Pass',
  },
  'test-fail': {
    icon: <XCircle className="w-3.5 h-3.5" />,
    dot: 'bg-status-critical-icon',
    badge: 'bg-status-critical-bg text-status-critical-text',
    badgeText: 'Fail',
  },
  'bypass': {
    icon: <ShieldOff className="w-3.5 h-3.5" />,
    dot: 'bg-status-warning-icon',
    badge: 'bg-status-warning-bg text-status-warning-text',
    badgeText: 'Bypass',
  },
  'alert': {
    icon: <AlertTriangle className="w-3.5 h-3.5" />,
    dot: 'bg-status-warning-icon',
    badge: 'bg-status-warning-bg text-status-warning-text',
    badgeText: 'Alert',
  },
  'config': {
    icon: <Settings className="w-3.5 h-3.5" />,
    dot: 'bg-status-neutral-icon',
    badge: 'bg-status-neutral-bg text-status-neutral-text',
    badgeText: 'Config',
  },
  'data-gen': {
    icon: <Bot className="w-3.5 h-3.5" />,
    dot: 'bg-status-info-icon',
    badge: 'bg-status-info-bg text-status-info-text',
    badgeText: 'Data Gen',
  },
  'team': {
    icon: <Users className="w-3.5 h-3.5" />,
    dot: 'bg-status-neutral-icon',
    badge: 'bg-status-neutral-bg text-status-neutral-text',
    badgeText: 'Team',
  },
};

// ─── Data ───────────────────────────────────────────────────────────────────

const events: TimelineEvent[] = [
  {
    id: '1', type: 'deploy', title: 'Deployed to production', time: '2 min ago',
    desc: 'service-api v2.14.3 rolled out to all regions.',
    actor: 'CI Pipeline', branch: 'main',
  },
  {
    id: '2', type: 'test-pass', title: 'Unit tests passed', time: '8 min ago',
    desc: 'All 148 unit tests passed in 1m 42s.',
    actor: 'CI Pipeline', branch: 'main',
    details: ['148 passed', '0 failed', '0 skipped', 'Coverage: 94.2%'],
  },
  {
    id: '3', type: 'test-fail', title: 'Contract tests failed', time: '24 min ago',
    desc: '3 contract violations detected in service-auth.',
    actor: 'CI Pipeline', branch: 'feat/sso',
    details: ['12 passed', '3 failed', '1 skipped', 'POST /auth/token — schema mismatch', 'GET /users/:id — missing field "roles"', 'PUT /users/:id — 500 response'],
  },
  {
    id: '4', type: 'data-gen', title: 'Sample data generated', time: '1h ago',
    desc: 'Created 50 records with linked entries.',
    actor: 'jake.jones',
  },
  {
    id: '5', type: 'bypass', title: 'E2E tests bypassed', time: '1h ago',
    desc: 'Bypassed due to environment instability.',
    actor: 'jake.jones', branch: 'feat/sso',
  },
  {
    id: '6', type: 'alert', title: 'Coverage dropped below threshold', time: '2h ago',
    desc: 'service-data coverage fell to 68% (threshold: 70%).',
    actor: 'System',
  },
  {
    id: '7', type: 'config', title: 'Quality gate updated', time: '3h ago',
    desc: 'Updated unit test threshold from 85% to 90%.',
    actor: 'sarah.chen',
  },
  {
    id: '8', type: 'team', title: 'Team member added', time: '5h ago',
    desc: 'Alex Rivera joined Platform Engineering.',
    actor: 'sarah.chen',
  },
];

// ─── Timeline Item ──────────────────────────────────────────────────────────

const TimelineItem: React.FC<{ event: TimelineEvent; isLast: boolean }> = ({ event, isLast }) => {
  const [expanded, setExpanded] = useState(false);
  const style = eventStyles[event.type];

  return (
    <div className="flex gap-3">
      {/* Timeline rail */}
      <div className="flex flex-col items-center flex-shrink-0">
        <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${style.badge}`}>
          {style.icon}
        </div>
        {!isLast && <div className="w-px flex-1 bg-bd-default mt-1" />}
      </div>

      {/* Content */}
      <div className="flex-1 pb-6">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <p className="text-sm font-medium text-tx-strong">{event.title}</p>
              <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${style.badge}`}>{style.badgeText}</span>
            </div>
            <p className="text-xs text-tx-weak mt-0.5">{event.desc}</p>
          </div>
          <span className="text-[10px] text-tx-muted flex-shrink-0 mt-0.5">{event.time}</span>
        </div>

        {/* Meta */}
        <div className="flex items-center gap-3 mt-2">
          {event.actor && (
            <span className="text-[10px] text-tx-muted">
              by <span className="font-mono text-tx-weak">{event.actor}</span>
            </span>
          )}
          {event.branch && (
            <span className="inline-flex items-center gap-1 text-[10px] text-tx-muted">
              <GitBranch className="w-3 h-3" />
              <span className="font-mono text-tx-weak">{event.branch}</span>
            </span>
          )}
        </div>

        {/* Expandable details */}
        {event.details && (
          <div className="mt-2">
            <button
              onClick={() => setExpanded(!expanded)}
              className="inline-flex items-center gap-1 text-[10px] text-tx-primary hover:text-tx-strong transition-colors cursor-pointer"
            >
              {expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              {expanded ? 'Hide' : 'Show'} details
            </button>
            {expanded && (
              <div className="mt-2 px-3 py-2 rounded-md bg-bg-sunken border border-bd-default space-y-1">
                {event.details.map((d, i) => (
                  <p key={i} className="text-[11px] font-mono text-tx-weak">{d}</p>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// ─── Filter Chips ───────────────────────────────────────────────────────────

const filterOptions = ['All', 'Deploys', 'Tests', 'Alerts', 'Config'] as const;

// ─── Page ───────────────────────────────────────────────────────────────────

const ActivityTimelinePage: React.FC = () => {
  const [filter, setFilter] = useState<string>('All');

  const filtered = filter === 'All' ? events : events.filter((e) => {
    if (filter === 'Deploys') return e.type === 'deploy';
    if (filter === 'Tests') return ['test-pass', 'test-fail', 'bypass'].includes(e.type);
    if (filter === 'Alerts') return e.type === 'alert';
    if (filter === 'Config') return ['config', 'team', 'data-gen'].includes(e.type);
    return true;
  });

  return (
    <div className="min-h-screen bg-bg-page p-6">
      <div className="max-w-2xl mx-auto">
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
              <h1 className="text-2xl font-semibold text-tx-strong">Activity Timeline</h1>
              <p className="text-sm text-tx-weak mt-1">
                Chronological feed of deployments, test runs, alerts, and configuration changes.
              </p>
            </div>

            {/* Filters */}
            <div className="px-6 pt-5 flex items-center gap-2">
              {filterOptions.map((opt) => (
                <button
                  key={opt}
                  onClick={() => setFilter(opt)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                    filter === opt
                      ? 'bg-interactive-selected text-interactive-selected-text'
                      : 'bg-bg-elevated text-tx-default hover:bg-interactive-hover border border-bd-default'
                  }`}
                >
                  {opt}
                </button>
              ))}
              <div className="flex-1" />
              <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-tx-default hover:bg-interactive-hover rounded-md transition-colors cursor-pointer">
                <RefreshCw className="w-3.5 h-3.5" /> Refresh
              </button>
            </div>

            {/* Timeline */}
            <div className="p-6">
              {filtered.map((event, i) => (
                <TimelineItem key={event.id} event={event} isLast={i === filtered.length - 1} />
              ))}
              {filtered.length === 0 && (
                <div className="py-8 text-center">
                  <p className="text-sm text-tx-weak">No events match this filter.</p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// ─── Story ───────────────────────────────────────────────────────────────────

const meta: Meta = {
  title: 'Page Examples/Activity Timeline',
  parameters: { layout: 'fullscreen' },
};

export default meta;

export const Timeline: StoryObj = {
  render: () => <ActivityTimelinePage />,
  name: 'Activity Timeline',
};
