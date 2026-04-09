---
name: ux-migrate
description: >
  Plan and execute a full-page or feature-area migration to the UX Harness standard.
  Scans an entire page directory, produces a migration plan with file-by-file target
  states and extraction order, writes characterization tests for the whole page, then
  orchestrates multiple ux-refactor calls incrementally. Produces a before/after
  migration report. For single-file cleanup use ux-refactor. Works on any React/Tailwind
  frontend codebase. Triggers on: "migrate this page", "ux-migrate", "bring this
  page up to standard", "decompose this feature", or any multi-file tech debt request
  targeting an entire page or feature area.
argument-hint: "[page-directory-path]"
---

# UX Migrate

Plan and execute a full-page migration to the UX Harness standard. This is the
orchestration skill — it coordinates multiple `ux-refactor` calls with a plan.

**Announce at start:** "Planning page migration to UX Harness standard..."

---

## Step 1: Load Context

Run `ux-prime` to load:
- Storybook inventory
- Design system tokens
- The 8 rules

---

## Step 2: Storybook-First Check

**Before scanning or planning anything, check if Storybook already has what you need.**

Using the Storybook lookup table from `ux-prime`, for each file in the target directory:

1. **Read the file** and identify the main UI patterns it renders (sidebar, card grid, data table, form, modal, header, nav, metric card, etc.)
2. **Search the Storybook lookup** — compare the file's JSX structure, Tailwind classes, icons, layout patterns, and element hierarchy against every Storybook component's full element snapshot (classes, props, icons, sub-components, keywords).
3. **For each match found**, report:
   ```
   STORYBOOK MATCH: [filename]:[lines] renders a [pattern] that matches [ComponentName] in Storybook
     Story: [story file path] → stories: [variant list]
     Source: [component source path]
     Import: [import path]
     Props needed: { [mapped props from the Storybook component's interface] }
     Current code uses: [classes found in this file]
     Storybook uses: [classes from the Storybook lookup for this component]
     Recommendation: REPLACE raw JSX with <ComponentName ... /> import
   ```
4. **For partial matches** (similar structure but different classes, missing props, or extra elements), report:
   ```
   PARTIAL MATCH: [filename]:[lines] resembles [ComponentName] but differs:
     - Classes: file uses [X] where Storybook uses [Y]
     - Props: file passes [X] but component expects [Y]
     - Structure: file has [extra/missing element]
     Recommendation: Evaluate if [ComponentName] can cover this case, or if the differences are intentional
   ```
5. **For class mismatches with no component match** — even when there's no full component match, compare individual class patterns against the Storybook Style Reference. Flag any classes that diverge from established patterns:
   ```
   STYLE DRIFT: [filename]:[line] uses [bg-gray-800] but Storybook uses [bg-bg-default] for this pattern
   ```

🛑 **PROGRESSIVE DISCLOSURE GATE:** Present Storybook matches to the user BEFORE proceeding to the scan. "Found 3 Storybook components that match patterns in this page. Want to replace these with imports before planning the full migration?" This avoids migrating code that should just be deleted and replaced with an import.

If the user approves Storybook replacements:
1. Replace the raw JSX blocks with the Storybook component imports
2. Map existing props/data to the component's props interface (as documented in the Storybook lookup)
3. Match the Storybook component's class patterns — use the same backgrounds, text colors, borders, spacing, radius, and transitions
4. Run tests to verify the replacement works
5. Then proceed to Step 3 (scan) on what remains

---

## Step 3: Scan the Remaining Page Directory

Read every file in the target page directory. For each file, collect:

| File | Lines | `any` count | Direct API calls | Has test? |
|------|-------|-------------|------------------|-----------|
| PageName.tsx | X | Y | yes/no | yes/no |
| component1.tsx | X | Y | yes/no | yes/no |
| ... | ... | ... | ... | ... |

Also collect:
- Total file count
- Total line count across all files
- Files over 150 lines
- Files over 200 lines
- Shared state patterns (context, Redux, prop drilling)
- Import graph (which files import which)

## 🔀 [ROUTER] Migration Scope

**Based on the scan, select EXACTLY ONE path.**

- [ ] **Path A: Light migration** — Total lines < 500, 1-3 files, mostly cleanup → Use `ux-refactor` on each file directly.
- [ ] **Path B: Standard migration** — Total lines 500-2000, 3-10 files → Full 4-phase migration plan.
- [ ] **Path C: Major migration** — Total lines 2000+, 10+ files → Full 4-phase plan with session health monitoring and phase checkpoints.

🛑 **PROGRESSIVE DISCLOSURE GATE:** Present the scan results and selected path to the user. "This page has 3,492 total lines across 8 files. Largest file is DataCardBody.tsx at 3,492 lines. Recommending Path C: major migration with checkpoints. Proceed?"

---

## 🔀 [ROUTER] Session Health Monitor

**Check before every phase.**

- [ ] **Condition: Session > 100 messages OR phase took > 30 minutes** → *Trigger Context Checkpoint*
- [ ] **Condition: Session is fresh** → *Continue normally*

### Context Checkpoint

1. **PAUSE** migration. Do not start the next phase.
2. Save current state to `ai_docs/migrations/YYYY-MM-DD-migrate-[pagename]-checkpoint.md`:
   - Completed phases and files
   - Pending phases and files
   - Characterization test status
   - Any discoveries or issues
3. Tell the user: "Session is getting long. I've saved migration progress. You can continue in a fresh session by referencing the checkpoint file."

---

## Step 4: Produce the Migration Plan

Create a structured plan:

```markdown
# Migration Plan: [PageName]

## Current State
- Files: [count]
- Total lines: [count]
- Files over 150 lines: [count]
- Files over 200 lines: [count]
- Total `any` types: [count]
- Files with direct API calls: [count]
- Test coverage: [X/Y files have tests]

## Target State
- Estimated files after migration: [count]
- All files under 150 lines
- Zero `any` in business logic
- All API calls in service layer
- All business logic in hooks
- Tests for every file

## Migration Order

### Phase 1: Services (extract API calls)
1. [filename] → extract [apiCall] → [newServiceFile].ts
2. ...

### Phase 2: Hooks (extract business logic)
1. [filename] → extract [stateLogic] → [newHookFile].ts
2. ...

### Phase 3: Components (extract JSX blocks)
1. [filename] → extract [conditionalBlock] → [newComponentFile].tsx
2. ...

### Phase 4: Cleanup (types, styles, semantic tokens)
1. [filename] → replace [any] with [ProperType]
2. [filename] → replace [inlineStyle] with [tailwindClass]
3. [filename] → replace [rawTailwindColor] with [semanticTokenClass]
4. [filename] → replace [numericSpacing] with [namedSpacing]
5. ...

## High-Risk Areas
- [area]: [why it's risky, what could break]

## Dependencies
- [file A] must be refactored before [file B] because [reason]
```

Save to `ai_docs/migrations/YYYY-MM-DD-migrate-[pagename].md`.

🛑 **PROGRESSIVE DISCLOSURE GATE:** Present the plan to the user. **Get explicit approval before executing.** "Migration plan ready. 4 phases, estimated ~25 new files. Ready to proceed?"

---

## Step 5: Write Characterization Tests

Before any code changes, write characterization tests for the entire page:

1. **Page-level tests** — does the page render? Can the user navigate it?
2. **Component-level tests** — for each major component in the page
3. **Integration tests** — key user flows through the page

**Run all tests. Paste the output. They must ALL PASS against current code.**

🛑 **PROGRESSIVE DISCLOSURE GATE:** Do not proceed to execution until characterization tests pass. "Characterization tests: 12/12 passing. Safe to start migration."

---

## Step 6: Execute the Plan

For each phase, in order:

### Phase 1: Services
For each API call extraction:
1. Create the service file with typed methods
2. Update the component/hook to call the service
3. **Run characterization tests** → execute command, read output, must pass

**Checkpoint:** Save progress after Phase 1. Re-check session health.

### Phase 2: Hooks
For each business logic extraction:
1. Create the hook file
2. Move state and effects from the component to the hook
3. Update the component to call the hook
4. **Run characterization tests** → must pass

**Checkpoint:** Save progress after Phase 2. Re-check session health.

### Phase 3: Components
For each JSX extraction:
1. Call `ux-refactor` on the specific file
2. Verify the extraction
3. **Run characterization tests** → must pass
4. Check if the new component is reusable → consider Storybook promotion

**Checkpoint:** Save progress after Phase 3. Re-check session health.

### Phase 4: Cleanup
For each type/style fix:
1. Replace `any` with proper types
2. Replace inline styles with Tailwind classes
3. Replace hardcoded hex values with semantic token classes
4. Convert raw Tailwind color classes to semantic token classes:
   - `bg-blue-500` → `bg-background-primary`
   - `text-gray-500` → `text-text-weak`
   - `border-red-200` → `border-border-critical`
   - Use the token map from `ux-prime` context for correct mappings
5. Convert numeric spacing to named spacing scale:
   - `gap-2` → `gap-sm`, `p-4` → `p-lg`, `gap-6` → `gap-xl`
6. **Run characterization tests** → must pass

---

## Step 7: Storybook Style Verification

🛑 **After all functional work is done, step back and verify the migrated code actually matches Storybook's established style.**

This is NOT just "are semantic tokens used" — it's "does this look like it belongs in the same app as the Storybook components." Compare every migrated file against the Storybook Style Reference from `ux-prime`:

### For each migrated component, check:

1. **Backgrounds** — Are the same `bg-bg-*` classes used as similar Storybook components? Is the page background `bg-bg-page`? Are cards `bg-bg-default` or `bg-bg-elevated`?
2. **Text colors** — Headers using `text-tx-header`/`text-tx-strong`? Body text using `text-tx-primary`? Weak/muted text using `text-tx-weak`?
3. **Borders** — Using `border-bd-default` where Storybook components do? Hover states using `hover:border-bd-primary`?
4. **Spacing** — Does the padding on cards/containers match similar Storybook components? Does the gap between children match?
5. **Radius** — Cards using `rounded-xl`? Buttons using `rounded-lg`? Badges using `rounded-full`? Match what Storybook uses.
6. **Typography** — Heading sizes match? Font weights match? Label/caption sizes match what Storybook establishes?
7. **Icons** — Sized `w-4 h-4` or `w-5 h-5` like Storybook? Using lucide-react? Color inherited from parent?
8. **Transitions** — Interactive elements have `transition-colors` or `transition-all` like Storybook components?
9. **Hover/focus states** — Using the same hover patterns as Storybook? (e.g., `hover:bg-bg-elevated`, not a custom hover color)
10. **Layout** — Flex/grid patterns match how Storybook components handle the same layout?

### Report style drift:

```
Storybook Style Verification:
  ✓ Dashboard/Card.tsx — backgrounds match (bg-bg-default), radius match (rounded-xl)
  ⚠ Dashboard/Header.tsx — uses text-lg where Storybook headers use text-2xl font-bold
  ⚠ Dashboard/MetricRow.tsx — gap-2 where similar Storybook widgets use gap-3
  ✗ Dashboard/Sidebar.tsx — uses rounded-md where Storybook SideNav uses rounded-lg

Style match score: 85% (17/20 patterns match Storybook)
```

**Fix any drift before finalizing.** The goal is that migrated code is visually indistinguishable from what's already in Storybook.

---

## Step 8: Migration Report

**Evidence before claims.** After completion, produce:

```markdown
# Migration Report: [PageName]

## Before
- Files: [count]
- Total lines: [count]
- Largest file: [name] at [lines] lines
- `any` types: [count]
- Files with direct API calls: [count]
- Test files: [count]

## After
- Files: [count]
- Total lines: [count]
- Largest file: [name] at [lines] lines
- `any` types: [count]
- Files with direct API calls: [count]
- Test files: [count]

## Storybook Replacements (Step 2)
- Raw JSX blocks replaced with Storybook component imports: [count]
- Components used: [list with import paths and story references]
- Style drift fixed: [count of class corrections to match Storybook patterns]

## Changes Made
- Services extracted: [count]
- Hooks extracted: [count]
- Components extracted: [count]
- Types fixed: [count]
- Styles fixed: [count]
- Raw Tailwind colors → semantic tokens: [count]
- Numeric spacing → named spacing: [count]

## New Storybook Components
- [list any components promoted to Storybook]

## Tests
- All characterization tests: [passing/failing — command output]
- New test files created: [count]
```

Save to `ai_docs/migrations/YYYY-MM-DD-migrate-[pagename]-report.md`.

---

## Key Principles

- **Never rewrite from scratch.** Extract incrementally.
- **Tests before changes.** Always. No exceptions.
- **Bottom-up order.** Services → Hooks → Components → Cleanup.
- **Verify after every step.** Run tests, read output. Evidence before claims.
- **Plan before execute.** Get approval on the plan first.
- **Checkpoint between phases.** Long migrations will exhaust context. Save state.
- **SLC approach.** Get each phase to "passing" before moving on. Don't gold-plate.
