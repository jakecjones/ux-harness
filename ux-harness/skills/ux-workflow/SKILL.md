---
name: ux-workflow
description: >
  Enforce the UX Harness development workflow (Assess → Token → Build → Validate).
  Auto-detects current phase from codebase artifacts and routes to the correct ux- skill.
  Use this as the entry point for any design system migration or component work.
argument-hint: "[--all | --phase <n> | --reset]"
---

# UX Harness Workflow

**For ANY non-trivial design system work (migrations, new components, token updates, multi-file refactors), follow all 4 phases in order. Do NOT skip phases. Do NOT build components before Phase 3.**

**Trivial tasks** (single class swap, one-off style fix, typo in a story) are exempt.

| Phase | What | Skill | Gate |
|-------|------|-------|------|
| 1. Assess | Understand the current state | `ux-prime` then `ux-audit` | Hard — user confirms |
| 2. Token | Establish or verify the design foundation | `ux-guard` (verify token structure + non-semantic class usage) | Hard — user approves |
| 3. Build | Create or migrate components | Route: new → `ux-component-builder` / migrate → `ux-migrate` / refactor → `ux-refactor` | None |
| 4. Validate | Review and document | `ux-guard` (pre-commit) + `ux-story-writer` (Storybook coverage) | None — present findings |

## How This Skill Works (Progressive Disclosure)

When invoked, detect the current phase and show ONLY that phase's guidance. Do NOT show all phases unless the user passes `--all`.

### Flag Handling

- `--all` → Display the full overview table above and ALL phase sections below, then stop.
- `--phase <n>` → Jump directly to that phase's section.
- `--reset` → Treat as Phase 1 regardless of existing artifacts.
- No flags → Auto-detect phase (see below).

### Phase Auto-Detection

Check artifacts in this order:

1. Run `ux-prime` silently to load context (tokens file location, Storybook inventory).
2. Check for design system artifacts:
   - Does `src/design-system/tokens.ts` (or equivalent) exist and contain semantic categories?
   - Does `.storybook/` exist with stories?
   - Are there `ai_docs/ux-harness/` or `ai_docs/migrations/` docs?
   - Run `git status --porcelain` for working tree changes.
3. Apply these rules:
   - If tokens file exists AND stories exist AND `git status` shows component changes → **Phase 4 (Validate)**
   - If tokens file exists AND stories exist AND no working tree changes → **Phase 3 (Build)**
   - If tokens file exists but Storybook is empty or components use non-semantic classes → **Phase 2 (Token)**
   - If no tokens file OR no `ux-prime` context loads → **Phase 1 (Assess)**

### Display Format

Show the detected phase section below. End with a one-line teaser of what comes next.

Example output:
```
📍 You're in **Phase 1: Assess**

[Phase 1 guidance here]

↳ Next: Phase 2 will verify your token foundation.
```

---

## Phase 1: Assess

**Goal:** Fully understand the codebase's current design system state before making changes.

**Run:** `ux-prime` to load context, then `ux-audit` for the health report. If `ux-prime` finds no tokens file or Storybook, the audit will surface that as the top gap.

**Stay in Phase 1 until you can articulate:**
- What tokens exist (or don't)
- What components exist across Storybook sections (Foundations, Components, Widget Garage, Page Examples)
- What the current health score is (from `ux-audit`)
- What rules are being violated

**Artifact:** Audit report in `ai_docs/ux-harness/`.

**Gate:** Assessment artifact must exist before proceeding. Confirm with user that the current state is understood.

↳ Next: Phase 2 will verify your token foundation.

---

## Phase 2: Token

**Goal:** Ensure the design system foundation is solid before building on it.

**Run:** `ux-guard` — Verifies token file structure (semantic categories, named spacing, consistent variants) and checks that components use semantic token classes rather than raw Tailwind (e.g., `bg-bg-page` not `bg-gray-900`).

**Fix any issues found before proceeding.** Common Phase 2 work:
- Creating `src/design-system/tokens.ts` from the example template
- Wiring tokens into `tailwind.config.ts`
- Resolving non-semantic class usage (components using raw Tailwind instead of token classes)

**Artifact:** Clean `ux-guard` pass.

**Gate:** Check must pass AND user must confirm "foundation approved" before proceeding.

↳ Next: Phase 3 will build or migrate components on your verified foundation.

---

## Phase 3: Build

**Goal:** Create or migrate components using the verified token foundation.

**Routing — detect work type from user's message:**
- New component → `ux-component-builder`
- Migrate existing page/component → `ux-migrate`
- Clean up single file → `ux-refactor`

Reference the specific audit findings or migration plan from earlier phases.

**No gate.** Once build work completes, flow directly into Phase 4.

↳ Next: Phase 4 validates your work automatically.

---

## Phase 4: Validate

**Goal:** Verify the work meets UX Harness standards and has Storybook coverage.

**Commands (run in sequence):**
1. `ux-guard` — Pre-commit check on all changed files. Must pass clean.
2. `ux-polish` — Verify all changed files visually match Storybook's established style across all 10 element categories. Fix drift before continuing.
3. `ux-story-writer` — Draft Storybook stories for new/changed components. **Requires human approval before writing.**
4. `ux-audit` — Re-score to confirm health improved.

**Present findings to user.** If `ux-guard` or `ux-polish` fails, fix violations and re-run Phase 4.

---

## Red Flags

If you (LLM) catch yourself thinking any of these — STOP and redirect to the correct phase.

| Thought | What to do instead |
|---------|--------------------|
| "I'll just swap these classes" | If it touches >1 component, start Phase 1. |
| "The tokens look fine" | You haven't run `ux-guard` yet. Phase 2. |
| "I'll build the component first, add stories later" | Stories are Phase 4, but tokens are Phase 2. Don't skip. |
| "I know what this codebase looks like" | You haven't run `ux-prime`. Phase 1. |
| "Let me just migrate this whole page" | Run `ux-audit` first to understand scope. Phase 1. |
| "I'll check my own work" | Self-review is not review. Phase 4 runs `ux-guard`. |

**For the LLM:** These are behavioral guardrails — you must comply.
**For the user:** These are recommendations with reasoning — you can override if you insist, but phases prevent rework.

---

## Phase Verification Checklist

Before building ANY components, confirm:
1. ✅ Assessment artifact exists in `ai_docs/ux-harness/` (Phase 1 complete)
2. ✅ `ux-guard` passes clean on token foundation (Phase 2 complete)

After building, confirm:
3. ✅ `ux-guard` passes on all changed files (Phase 4)
4. ✅ Storybook stories exist for new/changed components (Phase 4)
5. ✅ `ux-audit` health score improved or held steady (Phase 4)
