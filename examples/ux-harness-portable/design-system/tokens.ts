/**
 * UX Harness Design System Tokens
 *
 * Single source of truth for all visual design decisions.
 * Dark-mode only. All color values target dark backgrounds.
 *
 * Usage: import { colors, spacing, typography } from '@/design-system/tokens'
 *
 * Rules:
 *   - Never use raw Tailwind color classes (bg-gray-800) in components.
 *     Use semantic tokens (colors.background.default) instead.
 *   - All exports use `as const` for type safety.
 */

// ─── Colors ──────────────────────────────────────────────────────────────────

export const colors = {
  background: {
    default: '#1f2937',    // gray-800  — card/panel surfaces
    page: '#111827',       // gray-900  — page background
    elevated: '#374151',   // gray-700  — elevated surfaces (dropdowns, popovers)
    sunken: '#0f172a',     // slate-900 — inset areas, code blocks
    primary: '#1e3a5f',    // blue-dark — primary action surfaces
    critical: '#7f1d1d',   // red-900   — destructive backgrounds
    success: '#14532d',    // green-900 — success backgrounds
    warning: '#78350f',    // amber-900 — warning backgrounds
    info: '#1e3a5f',       // blue-900  — info backgrounds
    disabled: '#374151',   // gray-700  — disabled element backgrounds
    overlay: 'rgba(0, 0, 0, 0.5)', // modal/drawer backdrops
  },

  text: {
    default: '#d1d5db',    // gray-300  — body text
    strong: '#f9fafb',     // gray-50   — headings, emphasis
    weak: '#9ca3af',       // gray-400  — secondary, captions
    muted: '#6b7280',      // gray-500  — placeholders, disabled text
    primary: '#e0f2fe',    // sky-200  — links, interactive text
    critical: '#fca5a5',   // red-300   — error text
    success: '#86efac',    // green-300 — success text
    warning: '#fcd34d',    // yellow-300 — warning text
    info: '#93c5fd',       // blue-300  — info text
    disabled: '#4b5563',   // gray-600  — disabled text
    inverse: '#111827',    // gray-900  — text on light surfaces
    header: '#ffffff',     // white     — page/section headers
  },

  border: {
    default: '#374151',    // gray-700  — standard borders (inputs, cards)
    strong: '#4b5563',     // gray-600  — emphasized borders
    weak: '#1f2937',       // gray-800  — subtle dividers
    primary: '#3b82f6',    // blue-500  — focus/active borders
    critical: '#ef4444',   // red-500   — error borders
    success: '#22c55e',    // green-500 — success borders
    warning: '#f59e0b',    // amber-500 — warning borders
  },

  icon: {
    default: '#9ca3af',    // gray-400  — default icons
    strong: '#d1d5db',     // gray-300  — emphasized icons
    weak: '#6b7280',       // gray-500  — subtle icons
    primary: '#60a5fa',    // blue-400  — interactive/branded icons
    critical: '#f87171',   // red-400   — error icons
    success: '#4ade80',    // green-400 — success icons
    warning: '#fbbf24',    // yellow-400 — warning icons
    disabled: '#4b5563',   // gray-600  — disabled icons
  },

  brand: {
    primary: '#228BE6',    // --blue-accent  — primary brand color
    primaryHover: '#1A6EB8', // hover state
    navy: '#0A2647',       // --navy-accent
    dark: '#1B2433',       // --brand-dark
  },

  // Status colors for badges, indicators, alerts
  status: {
    success: {
      bg: 'rgba(22, 101, 52, 0.40)', // green-800/40
      bgSubtle: 'rgba(34, 197, 94, 0.12)', // green-500/12
      text: '#86efac',     // green-300
      border: '#22c55e',   // green-500
      icon: '#4ade80',     // green-400
    },
    warning: {
      bg: 'rgba(120, 53, 15, 0.50)', // amber-900/50
      bgSubtle: 'rgba(245, 158, 11, 0.12)', // amber-500/12
      text: '#fcd34d',     // yellow-300
      border: '#f59e0b',   // amber-500
      icon: '#fbbf24',     // yellow-400
    },
    critical: {
      bg: 'rgba(153, 27, 27, 0.40)', // red-800/40
      bgSubtle: 'rgba(239, 68, 68, 0.12)', // red-500/12
      text: '#fca5a5',     // red-300
      border: '#ef4444',   // red-500
      icon: '#f87171',     // red-400
    },
    info: {
      bg: 'rgba(7, 89, 133, 0.40)', // sky-800/40
      bgSubtle: 'rgba(59, 130, 246, 0.12)', // blue-500/12
      text: '#e0f2fe',     // sky-200
      border: '#3b82f6',   // blue-500
      icon: '#60a5fa',     // blue-400
    },
    neutral: {
      bg: '#374151',       // gray-700
      bgSubtle: 'rgba(107, 114, 128, 0.12)', // gray-500/12
      text: '#9ca3af',     // gray-400
      border: '#4b5563',   // gray-600
      icon: '#6b7280',     // gray-500
    },
  },

  // Categorical / data-type accent colors — neutral palette for tagging,
  // grouping, or distinguishing entity types in the consuming app.
  dataType: {
    blue: {
      base: '#3b82f6',     // blue-500
      subtle: 'rgba(59, 130, 246, 0.12)', // blue-500/12
      text: '#e0f2fe',     // sky-200
      icon: '#60a5fa',     // blue-400
    },
    purple: {
      base: '#a855f7',     // purple-500
      subtle: 'rgba(168, 85, 247, 0.12)',
      text: '#d8b4fe',     // purple-300
      icon: '#c084fc',     // purple-400
    },
    green: {
      base: '#22c55e',     // green-500
      subtle: 'rgba(34, 197, 94, 0.12)',
      text: '#86efac',     // green-300
      icon: '#4ade80',     // green-400
    },
    yellow: {
      base: '#eab308',     // yellow-500
      subtle: 'rgba(234, 179, 8, 0.12)',
      text: '#fde047',     // yellow-300
      icon: '#facc15',     // yellow-400
    },
    orange: {
      base: '#f97316',     // orange-500
      subtle: 'rgba(249, 115, 22, 0.12)',
      text: '#fdba74',     // orange-300
      icon: '#fb923c',     // orange-400
    },
    default: {
      base: '#6b7280',     // gray-500
      subtle: 'rgba(107, 114, 128, 0.12)',
      text: '#d1d5db',     // gray-300
      icon: '#9ca3af',     // gray-400
    },
  },

  // Chart palette — 16 colors for multi-series charts
  chart: {
    series: [
      '#60a5fa',  // blue-400
      '#a78bfa',  // violet-400
      '#f472b6',  // pink-400
      '#fbbf24',  // amber-400
      '#34d399',  // emerald-400
      '#22d3ee',  // cyan-400
      '#f87171',  // red-400
      '#818cf8',  // indigo-400
      '#2dd4bf',  // teal-400
      '#fb923c',  // orange-400
      '#a3e635',  // lime-400
      '#c084fc',  // violet-400
      '#38bdf8',  // sky-400
      '#fb7185',  // rose-400
      '#facc15',  // yellow-400
      '#94a3b8',  // slate-400
    ] as const,
    grid: '#374151',       // gray-700  — CartesianGrid stroke
    axis: '#9ca3af',       // gray-400  — axis tick labels
    pieSeparator: '#1f2937', // gray-800 — pie chart cell stroke
    pass: '#86efac',       // green-300  — pass/success metric
    fail: '#fca5a5',       // red-300    — fail/error metric
    coverage: '#60a5fa',   // blue-400   — coverage line
    target: '#a78bfa',     // violet-400 — target/threshold line
  },

  // Interactive element colors
  interactive: {
    focus: '#3b82f6',      // blue-500  — focus rings
    focusRing: 'rgba(59, 130, 246, 0.5)', // blue-500/50
    hover: '#374151',      // gray-700  — hover state background
    active: '#4b5563',     // gray-600  — pressed state
    selected: '#1e3a5f',   // blue-dark — selected item background
    selectedText: '#93c5fd', // blue-300 — selected item text
  },

  // Scrollbar
  scrollbar: {
    track: '#1f2937',      // gray-800
    thumb: '#4b5563',      // gray-600
    thumbHover: '#6b7280', // gray-500
  },
} as const;

// ─── Spacing ─────────────────────────────────────────────────────────────────

export const spacing = {
  none: '0',             // 0px
  '3xs': '0.125rem',    // 2px   — fine detail, badge padding
  '2xs': '0.25rem',     // 4px   — tight inner spacing
  xs: '0.375rem',       // 6px   — compact padding
  sm: '0.5rem',         // 8px   — standard inner padding (most used)
  md: '0.75rem',        // 12px  — component padding
  lg: '1rem',           // 16px  — section padding, comfortable gaps
  xl: '1.5rem',         // 24px  — section gaps, page padding
  '2xl': '2rem',        // 32px  — large section spacing
  '3xl': '3rem',        // 48px  — major section breaks
  '4xl': '4rem',        // 64px  — page-level spacing
} as const;

// ─── Typography ──────────────────────────────────────────────────────────────

export const typography = {
  fontFamily: {
    sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
    mono: 'SFMono-Regular, Consolas, "Liberation Mono", Menlo, Courier, monospace',
  },

  // Heading tier — page titles and section headers
  heading: {
    '3xl': { size: '1.875rem', weight: 700, leading: '2.25rem' }, // 30px — display/hero
    '2xl': { size: '1.5rem',   weight: 600, leading: '2rem' },    // 24px — page title (H1)
    xl:    { size: '1.25rem',  weight: 600, leading: '1.75rem' },  // 20px — section heading
    lg:    { size: '1.125rem', weight: 600, leading: '1.75rem' },  // 18px — section heading (H2)
    md:    { size: '1rem',     weight: 600, leading: '1.5rem' },   // 16px — sub-heading (H3)
    sm:    { size: '0.875rem', weight: 600, leading: '1.25rem' },  // 14px — minor heading
  },

  // Label tier — UI controls, form labels, navigation
  label: {
    lg: { size: '0.875rem', weight: 500, leading: '1.25rem' },  // 14px — primary labels
    md: { size: '0.875rem', weight: 500, leading: '1.25rem' },  // 14px — standard labels (most used)
    sm: { size: '0.75rem',  weight: 500, leading: '1rem' },     // 12px — secondary labels, badges
  },

  // Body tier — paragraphs, descriptions, content
  body: {
    lg: { size: '1rem',     weight: 400, leading: '1.5rem' },   // 16px — large body
    md: { size: '0.875rem', weight: 400, leading: '1.25rem' },  // 14px — standard body
    sm: { size: '0.75rem',  weight: 400, leading: '1rem' },     // 12px — small body, captions
  },

  // Table header tier
  tableHeader: {
    size: '0.75rem',       // 12px
    weight: 500,
    leading: '1rem',
    tracking: '0.05em',    // tracking-wider
    transform: 'uppercase' as const,
  },

  // Metric/data display tier
  metric: {
    '5xl': { size: '3rem',   weight: 700, leading: '1' },   // 48px — hero metrics
    '2xl': { size: '1.5rem', weight: 700, leading: '2rem' }, // 24px — card metrics
  },
} as const;

// ─── Border Radius ───────────────────────────────────────────────────────────

export const borderRadius = {
  none: '0',
  sm: '0.125rem',        // 2px
  md: '0.375rem',        // 6px   — most used (rounded-md)
  lg: '0.5rem',          // 8px   — second most used (rounded-lg)
  xl: '0.75rem',         // 12px
  '2xl': '1rem',         // 16px
  round: '9999px',       // pill shapes, avatars
} as const;

// ─── Shadows ─────────────────────────────────────────────────────────────────

export const shadows = {
  none: 'none',
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
  focus: '0 0 0 3px rgba(59, 130, 246, 0.5)',  // blue focus ring shadow
} as const;

// ─── Transitions ─────────────────────────────────────────────────────────────

export const transitions = {
  fast: '150ms ease-in-out',   // micro-interactions (hover, focus)
  base: '200ms ease-in-out',   // standard transitions (most used)
  slow: '300ms ease-in-out',   // layout shifts, panels
  spring: '1000ms ease-out',   // animated counters, metric reveals
} as const;

// ─── Z-Index ─────────────────────────────────────────────────────────────────

export const zIndex = {
  base: 0,
  dropdown: 10,       // dropdowns, inline popovers
  sticky: 20,         // sticky headers, table headers
  fixed: 30,          // fixed sidebars, navigation
  modalBackdrop: 40,  // modal overlay backgrounds
  modal: 50,          // primary modals, tooltips
  popover: 60,        // nested modals, popovers over modals
  tooltip: 70,        // tooltip layer
  toast: 80,          // toast notifications (always on top)
} as const;

// ─── Breakpoints ─────────────────────────────────────────────────────────────

export const breakpoints = {
  sm: '640px',         // mobile landscape → tablet portrait
  md: '768px',         // tablet portrait → tablet landscape
  lg: '1024px',        // tablet landscape → desktop
  xl: '1280px',        // desktop → wide desktop
  '2xl': '1536px',     // wide desktop → ultra-wide
} as const;

// ─── Opacity ─────────────────────────────────────────────────────────────────

export const opacity = {
  transparent: 0,
  disabled: 0.5,       // disabled elements (most used)
  overlay: 0.5,        // backdrop overlays
  spinnerTrack: 0.25,  // spinner background ring
  spinnerFill: 0.75,   // spinner foreground ring
  full: 1,
} as const;

// ─── Convenience Re-export ───────────────────────────────────────────────────

const tokens = {
  colors,
  spacing,
  typography,
  borderRadius,
  shadows,
  transitions,
  zIndex,
  breakpoints,
  opacity,
} as const;

export default tokens;
