# ux-harness

LLM-first design system and component standard for React/Tailwind frontends. Provides 11 skills and 5 specialized agents that cover the full UI component lifecycle: context loading, building, auditing, migrating, and orchestration.

## Install

```
/plugin install ux-harness@testops-claude-marketplace
```

## Skills

| Skill | Purpose |
|-------|---------|
| ux-prime | Load design system context (tokens, Storybook inventory, 8 rules) |
| ux-guard | Pre-commit rule enforcement |
| ux-audit | Codebase health scoring with semantic token adoption rate |
| ux-component-builder | Scaffold new components to standard |
| ux-refactor | Single-file cleanup to standard |
| ux-migrate | Full-page migration orchestration |
| ux-story-writer | Generate Storybook stories for promotion |
| ux-workflow | Phase router (Assess → Token → Build → Validate) |
| ux-whats-next | Session handoff for multi-session migrations |
| ux-polish | Storybook reuse check + section-level + visual style verification |
| ux-swarm | Multi-agent orchestration for parallel UX work |

## Agents

Specialized agents dispatched by `ux-swarm` for parallel work:

| Agent | Role |
|-------|------|
| ux-token-auditor | Scan for raw Tailwind vs. semantic token usage |
| ux-accessibility-auditor | WCAG 2.1 AA compliance checking |
| ux-component-extractor | Extract repeated patterns into reusable components |
| ux-style-migrator | Convert raw Tailwind to semantic tokens |
| ux-test-writer | Write component tests with token assertions |

## Storybook Sections

The design system is organized into four Storybook sections. Skills check code against all of them:

| Section | What it establishes | Stories |
|---------|-------------------|---------|
| Foundations | Color palette, typography scale, icon conventions, spacing scale, borders & shadows | Colors, Typography, Icons, Spacing, Borders & Shadows |
| Components | Reusable atomic/molecular UI elements | Buttons, Inputs, Cards, Tabs, Badges & Tags, Skeleton Loaders |
| Widget Garage | Composed widgets combining components into higher-order patterns | MetricCard, BlueprintCard, SideNav, CoverageTrends, ProjectNOS, QuickAutomate, QuickRunBlueprint, QuickStartChat |
| Page Examples | Full-page layouts showing how widgets and components compose into screens | Card Grid, Table Page, Detail Page, Workspace, Activity Timeline |

## Prerequisites

- A React/Tailwind frontend codebase
- A design tokens file at `src/design-system/tokens.ts` (or run `ux-audit` to assess gaps)

## The 8 Rules

1. One responsibility per file. 150-line soft cap, 200 hard cap.
2. Tailwind only. Use semantic token classes (`bg-background-primary`) not raw Tailwind (`bg-blue-500`).
3. Componentize everything. Conditionals become components.
4. Strong types. No `any` in business logic.
5. Component > Hook > Service > API. No skipping layers.
6. Design system first. Semantic token classes only.
7. TDD everywhere. Tests before implementation.
8. Reduce, reuse, recycle. Search Storybook first.

## First Target

[Carvana.TestLane](https://github.com/CVNA-Horizontals/Carvana.TestLane) — Jira epic [QE-2125](https://jira.carvana.com/browse/QE-2125).
