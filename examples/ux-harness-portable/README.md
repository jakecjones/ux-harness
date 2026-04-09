# UX Harness Portable — Design System & Storybook

A portable, framework-agnostic snapshot of a dark-mode design system: semantic tokens, foundations, generic components, and composed widget patterns. Drop this directory into any React + Tailwind project that needs a starting point for visual language.

## What's Inside

```
ux-harness-portable/
  design-system/
    tokens.ts              # Semantic design tokens (colors, spacing, typography, shadows)
  stories/design-system/
    foundations/            # 5 stories — Colors, Typography, Icons, Spacing, Borders & Shadows
    components/             # 6 stories — Buttons, Cards, Inputs, Tabs, Badges, Skeleton Loaders
    widget-garage/          # 8 stories — generic composed widgets (cards, charts, nav, chat)
    page-examples/          # 5 stories — full-page layout patterns
  .storybook/
    main.ts                 # Storybook config (story globs, addons)
    preview.ts              # Global decorators, theme, viewport settings
```

## Design Tokens

`design-system/tokens.ts` defines the semantic token system. Use these instead of raw Tailwind colors:

| Category | Example Classes |
|----------|----------------|
| Background | `bg-bg-default`, `bg-bg-page`, `bg-bg-elevated` |
| Text | `text-tx-strong`, `text-tx-default`, `text-tx-weak` |
| Border | `border-bd-default`, `border-bd-primary` |
| Status | `bg-status-critical-bg`, `text-status-success-text` |
| Brand | `bg-brand-primary`, `hover:bg-brand-primary-hover` |
| Interactive | `hover:bg-interactive-hover`, `focus:ring-interactive-focus-ring` |
| Categorical | `bg-dt-blue-subtle`, `text-dt-purple-text` |

## Storybook Sections

| Section | Stories | What It Establishes |
|---------|---------|---------------------|
| Foundations | 5 | Color palette, type scale, icon conventions, spacing scale, border/shadow tokens |
| Components | 6 | Button variants, card patterns, input states, tab styles, badge types, loading skeletons |
| Widget Garage | 8 | Composed generic widgets — metric displays, side nav, category cards, chat composer, install card, trend chart |
| Page Examples | 5 | Full-page layout patterns — grids, tables, detail views, workspaces, timelines |

## Usage

To run Storybook with these stories, copy `.storybook/` to your project root and `stories/` to your `src/` directory, then:

```bash
npm run storybook
```

Requires: `@storybook/react`, `@storybook/addon-essentials`, React 19, Tailwind CSS v4.

The consuming project must wire the token values from `design-system/tokens.ts` into its Tailwind config so the `bg-bg-*`, `text-tx-*`, `bg-status-*`, `bg-dt-*`, and `bg-brand-*` class families resolve.
