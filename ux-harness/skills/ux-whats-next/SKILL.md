---
name: ux-whats-next
description: Create handoff document for continuing UX Harness work in a fresh context
---

# UX Harness Context Handoff

**Output:** `./ai_docs/ux-harness/whats-next.md`

Create a comprehensive, detailed handoff document that captures all UX Harness context from the current session. This allows continuing design system migration or component work in a fresh context with zero information loss.

## Instructions

**PRIORITY: Comprehensive detail and precision over brevity.** The goal is to enable a fresh Claude instance to pick up exactly where you left off — knowing what tokens exist, what components were migrated, what's still raw Tailwind, and what the next move is.

Before writing, gather current state by running:
1. `ux-prime` — to capture the current token and Storybook inventory
2. `ux-audit` (silently, summary only) — to capture the current health score
3. `git status --porcelain` — to capture uncommitted work
4. `ls ai_docs/ux-harness/ ai_docs/migrations/ 2>/dev/null` — to capture existing artifacts

Then write the handoff document covering these sections:

### 1. Original Task
What was initially requested — the scope of the design system work. Be precise about which codebase, which pages/components, which Jira tickets.

### 2. Design System State
Current snapshot of the UX Harness foundation:
- Token file location and completeness (which categories exist, which are missing)
- Tailwind config wiring status (are tokens plumbed into `tailwind.config.ts`?)
- Storybook section summary (story counts per section: Foundations, Components, Widget Garage, Page Examples)
- Current `ux-audit` health score and rule-by-rule breakdown
- Known drift between tokens and component usage

### 3. Work Completed
Everything accomplished in this session:
- Components migrated (with before/after class changes)
- Stories written or updated
- Token categories added or modified
- Files created, modified, or deleted (with paths)
- `ux-guard` violations fixed
- Decisions made and reasoning (e.g., "chose `background.primary` over `surface.default` because...")

### 4. Work Remaining
Specific, actionable next steps:
- Components still needing migration (list with file paths)
- Stories still missing (components without Storybook coverage)
- Token categories still needed
- `ux-guard` violations still outstanding
- Pages not yet assessed
- Dependencies or ordering (e.g., "migrate SharedHeader before page-level components that import it")

### 5. Migration Progress
If this is part of a multi-session migration:
- Which pages/sections are complete vs. in-progress vs. not started
- Percentage of raw Tailwind classes converted to semantic tokens
- Percentage of components with Storybook stories
- Storybook coverage (what percentage of reusable components have stories, by section)

### 6. Critical Context
Essential knowledge for continuing:
- Non-obvious token mapping decisions (what maps to what and why)
- Components that can't be migrated yet and why (dependencies, design ambiguity)
- Gotchas discovered (e.g., "dark mode classes need special handling in X component")
- Custom Tailwind utilities that conflict with semantic tokens
- Environment or config details (Tailwind version, Storybook version, build quirks)

### 7. Current State
Exact state right now:
- Which workflow phase you're in (Assess/Token/Build/Validate)
- What's committed vs. uncommitted
- Any temporary workarounds in place
- Open questions for the user or design team

## Output Format

Write to `./ai_docs/ux-harness/whats-next.md` using this structure:

```xml
<original_task>
[The specific UX Harness task — codebase, scope, Jira tickets]
</original_task>

<design_system_state>
[Token file: path, completeness]
[Tailwind wiring: status]
[Storybook: Foundations/Components/Widget Garage/Page Examples counts]
[Health score: N/100, rule breakdown]
[Drift: summary]
</design_system_state>

<work_completed>
[Components migrated, stories written, tokens added, files changed]
[Decisions made and reasoning]
</work_completed>

<work_remaining>
[Components to migrate with file paths]
[Stories to write]
[Token gaps]
[Outstanding violations]
[Ordering/dependencies]
</work_remaining>

<migration_progress>
[Pages: complete/in-progress/not-started]
[Semantic token adoption: N%]
[Storybook coverage: N%]
[Storybook section coverage: N%]
</migration_progress>

<critical_context>
[Token mapping decisions]
[Migration blockers]
[Gotchas and workarounds]
[Environment details]
</critical_context>

<current_state>
[Workflow phase]
[Commit status]
[Temporary workarounds]
[Open questions]
</current_state>
```
