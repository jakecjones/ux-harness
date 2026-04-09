---
name: ux-swarm
description: >
  Coordinate multiple Claude Code sessions as an agent team to parallelize UX Harness work.
  Supports 4 modes: audit, migrate, build, review. Dispatches specialized ux- agents
  for token auditing, component extraction, story generation, accessibility checks,
  icon cleanup, and style migration.
argument-hint: "[--mode=audit|migrate|build|review] [--full] [prompt]"
disable-model-invocation: true
---

# UX Swarm Orchestration

Coordinate multiple Claude Code sessions as an agent team to parallelize UX Harness work. You are the **team lead**. Your job is to decompose the objective, spawn specialized ux- teammates, assign tasks with file ownership, coordinate to completion, and shut down cleanly.

## Arguments

`$ARGUMENTS` — The user's objective. May include flags:

- `--mode=<audit|migrate|build|review>` — Explicit mode selection
- `--full` — Force Tier 3 full orchestration (plan-first, wave execution, quality gates)

## Model Policy

**All agents use `model: "opus"`.** Lead and every teammate. No exceptions.

## Session Health Monitor

*Context window exhaustion causes silent state loss in long-running swarms. Check session health before every wave.*

- [ ] **Condition: Session > 150 messages OR > 2 hours OR lead responses feel sluggish** → *Trigger Context Handoff*
- [ ] **Condition: Session is fresh** → *Continue normally*

### Context Handoff

1. **PAUSE** orchestration. Do not spawn the next wave.
2. **Auto-Checkpoint:** Save current swarm state to `./ai_docs/ux-harness/swarm-checkpoint-N.md` including:
   - Team composition and agent statuses
   - Completed tasks (with file paths and summaries)
   - In-progress tasks and their current state
   - Pending tasks and dependency graph
   - Token mapping decisions made during execution
   - Migration progress metrics
3. **Shut down all active agents** cleanly.
4. **Handoff:** Run the `ux-whats-next` skill.
5. **Instruct User:** *"We are approaching context limits for this swarm session. I have saved our state and shut down active agents. Please start a fresh chat session and attach `whats-next.md` to resume the swarm."*

🛑 **STOP orchestration entirely until resumed in a new session.**

---

## Phase 0: Parse and Classify

### 0a. Parse Flags

Extract flags from `$ARGUMENTS`:

```
mode      = --mode value, or auto-detect from prompt
full      = --full flag present (boolean)
remaining = prompt text after flags are removed
```

### 0b. Auto-Detect Mode

If no `--mode` flag, classify from prompt keywords:

| Signal | Mode |
|--------|------|
| "audit", "score", "health", "check", "assess", "onboard" | `audit` |
| "migrate", "convert", "move", "upgrade", "refactor", "cleanup" | `migrate` |
| "build", "create", "scaffold", "new component", "compose" | `build` |
| "review", "guard", "validate", "story", "stories", "storybook" | `review` |

### 0c. Assess Complexity Tier

| Tier | Trigger | Behavior |
|------|---------|----------|
| **1** | Single component or page, 1-2 clear tasks | 2-3 agents, simple coordination, no plan phase |
| **2** | Multi-component work, 3-5 tasks, one page | Mode-specific team, task dependencies |
| **3** | `--full` flag OR whole-app migration OR 6+ tasks | Plan-first, wave execution, quality gates |

---

## Phase 1: Analyze and Decompose

Before creating any agents:

1. **Run `ux-prime`** to load the design system context (tokens, Storybook inventory, tier map).
2. **Identify independent workstreams** — What components/pages can be worked on in parallel with no shared files?
3. **Identify dependencies** — What must complete first? (e.g., tokens before components, shared components before pages)
4. **Determine team size** — Minimum agents for meaningful parallelism. Typical: 2-5 agents.
5. **Enforce file ownership** — No two teammates touch the same file. Split by component, page, or layer.
6. **Name agents descriptively** — Role-based names from the agent roster below. Not `agent-1`.

### Tier 3 Only: Plan-First Workflow

At Tier 3, before spawning any agents:

1. Run `ux-audit` to establish the baseline health score
2. Draft a migration plan with: component inventory, dependency graph, wave assignments, file ownership map
3. Present the plan to the user for approval
4. Only spawn the team after the plan is approved

---

## Phase 2: Mode-Specific Team Composition

### Mode: `audit`

Parallel assessment from multiple angles. Each agent audits a different concern.

**Team structure:**
- `ux-token-auditor` — Scans all files for raw Tailwind color/spacing classes vs. semantic tokens. Reports adoption percentage and violation list.
- `ux-accessibility-auditor` — Checks every component for aria labels, keyboard navigation, contrast ratios, focus management.
- Lead synthesizes into a unified audit report with health score.

**Spawn prompt additions for audit teammates:**
```
You are a UX Harness audit agent. Your focus area: [SPECIFIC CONCERN]

Instructions:
1. Run `ux-prime` to load design system context
2. Scan all files in src/ for your concern area
3. Report findings as: file:line, issue, severity (critical/warning/info)
4. Calculate a score for your concern area (0-100)
5. Message the team lead with your structured findings when complete
```

### Mode: `migrate`

Parallel component/page migration across independent file sets.

**Pre-migration gate:**
Before spawning migration teammates:
1. Run `ux-audit` to establish baseline score
2. Run `ux-guard` to verify token foundation is solid
3. If tokens are missing or `ux-guard` fails: report to user. Do not spawn migration agents.
4. If foundation is solid: proceed to spawn team

**Team structure:**
- `ux-style-migrator` agents (one per page/section) — Each owns a set of files and migrates raw Tailwind → semantic tokens, extracts repeated patterns into components.
- `ux-component-extractor` (one per shared component being created) — Extracts duplicated UI patterns into reusable Storybook components in the appropriate section (Components for atomic elements, Widget Garage for composed patterns). Foundations is for design primitives only — don't extract page patterns there.
- `ux-test-writer` — Writes/updates tests for migrated components.
- Lead calls `ux-story-writer` to **draft** Storybook stories for newly migrated components. **Does NOT write to disk — drafts require human approval before writing.**

**Spawn prompt template for migration teammates:**
```
You are a UX Harness migration agent. You own these files (ONLY modify these):
{FILE_LIST}

Design system context:
- Token file: {TOKEN_PATH}
- Semantic categories: background, text, border, icon, spacing
- Named spacing scale: xs=4, sm=8, md=16, lg=24, xl=32, 2xl=48

Instructions:
1. Run `ux-prime` to load full context
2. For each file you own:
   a. Replace raw Tailwind color classes with semantic tokens (bg-blue-500 → bg-background-primary)
   b. Replace numeric spacing with named spacing (gap-2 → gap-sm, p-4 → p-lg)
   c. Extract repeated class patterns into component abstractions
   d. Ensure all interactive elements have proper aria labels
3. Run `ux-guard` on your changed files before reporting complete
4. If blocked on a shared component, message the team lead
5. Report: files changed, classes converted, violations fixed, issues found
```

**After each wave:**
1. Run `ux-guard` on all changed files
2. Run `ux-polish` on all changed files — verify style matches Storybook. Fix drift before next wave.
3. If guard or polish fails: create fix tasks before next wave
4. Run `ux-audit` to measure score delta
5. **Session Health Re-check** before spawning next wave

### Mode: `build`

Parallel creation of new components, pages, or features.

**Team structure:**
- `ux-component-extractor` agents — Each builds a new component from the design spec
- `ux-test-writer` — Writes tests for each new component
- Lead coordinates prop contracts between components and calls `ux-story-writer` to **draft** stories for approval

**Spawn prompt template for build teammates:**
```
You are a UX Harness build agent creating: {COMPONENT_NAME}

Design spec:
{DESIGN_DETAILS}

Instructions:
1. Run `ux-prime` to load design system context
2. Use `ux-component-builder` patterns: semantic tokens only, named spacing only, proper aria labels
3. Place in the correct Storybook section: atomic elements → Components, composed widgets → Widget Garage, page layouts → Page Examples. Never place extracted patterns in Foundations (design primitives only).
4. Export from the appropriate barrel file
5. Run `ux-guard` on your new files before reporting complete
6. Message the team lead with: component path, props contract, Storybook section, any questions

Files you own (ONLY create/modify these): {FILE_LIST}
```

### Mode: `review`

Multi-perspective design system review of changed files.

**Team structure:**
- `ux-token-auditor` — Reviews all class usage for semantic token compliance
- `ux-accessibility-auditor` — Reviews all components for a11y compliance
- Lead calls `ux-story-writer` to check Storybook coverage for all changed components. **Drafts missing stories for approval — does NOT auto-write.**

**Review flow:**
1. Gather changed files: `git diff --name-only main...HEAD`
2. Spawn reviewers in parallel, each receiving the changed file list
3. Synthesize findings into a unified report:

```
## Critical
[Must fix — broken a11y, missing tokens, inline SVGs]

## Important
[Should fix — raw Tailwind colors, missing stories, inconsistent spacing]

## Minor
[Consider — naming conventions, story organization, tier classification]
```

Verdict: Any Critical = FAIL. Only Important = WARN. Only Minor or none = PASS.

---

## Phase 3: Create Team and Tasks

1. **Create the team** using `TeamCreate` with a descriptive name (e.g., `ux-dashboard-migration`, `ux-audit-full`, `ux-component-build`).

2. **Create all tasks** using `TaskCreate` with:
   - Clear `subject` in imperative form (e.g., "Migrate Dashboard cards to semantic tokens")
   - Detailed `description` with: file paths, token mappings, acceptance criteria
   - `activeForm` in present continuous (e.g., "Migrating Dashboard cards")

3. **Set dependencies** with `addBlockedBy` for tasks that require other tasks' outputs.

### Tier 3: Wave Execution

Organize tasks into dependency-aware waves:

- **Wave 1**: Shared components and token foundation work — no dependencies
- **Wave 2**: Page-level components that import Wave 1 outputs
- **Wave 3**: Integration, stories, and tests
- **Wave N**: Continue until all tasks complete

**Post-Wave Checkpointing:** After every wave, save progress to `./ai_docs/ux-harness/swarm-state.md` with: completed files, migration metrics, key decisions, drift discovered.

---

## Phase 4: Spawn and Assign

Spawn teammates using the `Task` tool with `team_name` parameter.

**All teammates:**
- `model: "opus"` — mandatory, no exceptions
- `subagent_type: "general-purpose"`
- `run_in_background: true`

**All teammate spawn prompts include:**
```
Begin by reading the project's CLAUDE.md for context and coding standards.
Then run `ux-prime` to load the design system context.
Then work on your assigned task.
```

After spawning, assign tasks using `TaskUpdate` with `owner` set to the agent's name.

---

## Phase 5: Coordinate

As team lead:

- **Route information**: When a migrator finishes a shared component, notify dependent agents with the component path and props contract.
- **Enforce token consistency**: If two agents make different token mapping decisions for similar patterns, resolve the conflict and broadcast the decision.
- **Track migration metrics**: Maintain running counts of classes converted, violations fixed, stories drafted.
- **Handle drift**: If an agent discovers tokens missing from the token file, pause that agent and create a token-addition task.
- **Prefer direct messages**: Use `SendMessage` with `type: "message"` to specific agents.
- **Don't implement**: As team lead, coordinate only. Assign implementation to teammates.

---

## Phase 6: Verify and Shutdown

Before declaring the swarm complete:

1. **Verify all tasks completed** — `TaskList` shows every task `completed`
2. **Run `ux-guard`** on all files changed during the swarm
3. **Run `ux-polish`** on all files changed during the swarm — verify every migrated/built component visually matches Storybook's established style across all 10 element categories (backgrounds, text, borders, spacing, radius, typography, icons, transitions, hover states, layout). **Present drift report to user and fix before proceeding.**
4. **Run `ux-audit`** and compare to baseline score (must improve or hold)
5. **Verify story coverage** — Every new/changed component has a Storybook story **drafted** (pending user approval)
6. **Shut down teammates** — `SendMessage` with `type: "shutdown_request"` to each agent
7. **Clean up team** — `TeamDelete` after all teammates shut down
8. **Report results** — Summary: files migrated, classes converted, style match score, health score delta, stories drafted (pending approval), remaining work

---

## Agent Roster

These are the specialized agent roles available for ux-swarm. Each has a dedicated agent definition in `agents/`.

| Agent | Role | Used in Modes |
|-------|------|---------------|
| `ux-token-auditor` | Scan for raw Tailwind vs. semantic token usage | audit, review |
| `ux-accessibility-auditor` | Check a11y compliance (aria, keyboard, contrast) | audit, review |
| `ux-component-extractor` | Extract repeated patterns into reusable components | migrate, build |
| `ux-style-migrator` | Convert raw Tailwind to semantic tokens | migrate |
| `ux-test-writer` | Write/update component tests | migrate, build |

**Note:** Storybook story drafting is handled by the `ux-story-writer` skill (called by the lead), not a dedicated agent.

## Rules

- **Storybook writes require human approval**: No agent writes a story file to disk without explicit user confirmation. Story agents draft and present — the user decides what enters Storybook. This is non-negotiable.
- **Honest completion**: Never mark a task completed unless it genuinely meets acceptance criteria. Partial work stays `in_progress`.
- **Token consistency**: All agents use the same token mapping. Conflicts are resolved by the lead, not individual agents.
- **File ownership**: Two teammates never edit the same file. Split work to prevent overwrites.
- **Guard before done**: Every agent runs `ux-guard` on their changed files before reporting complete.
- **Metrics always**: Every wave reports: classes converted, violations fixed, stories drafted, score delta.
- **Clean shutdown**: Always shut down teammates and clean up the team.
- **Session awareness**: Monitor session health between waves. A checkpoint is cheap; losing context is expensive.
