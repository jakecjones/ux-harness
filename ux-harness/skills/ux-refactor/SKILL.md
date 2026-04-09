---
name: ux-refactor
description: >
  Refactor a single file to meet the UX Harness standard. Analyzes the target file
  for violations (line count, any types, inline styles, direct API calls, conditional
  JSX blocks), writes characterization tests FIRST to lock in current behavior, then
  extracts components, hooks, and services incrementally. Verifies tests pass after
  each extraction. For full-page migration use ux-migrate. Works on any React/Tailwind
  frontend codebase. Triggers on: "refactor this", "clean up this file", "this file
  is too long", "ux-refactor", "bring this to standard", or any single-file tech
  debt request.
argument-hint: "[file-path]"
---

# UX Refactor

Refactor a single file to the UX Harness standard. Characterization tests first,
then incremental extraction.

**Announce at start:** "Refactoring to UX Harness standard..."

---

## Step 1: Load Context

Run `ux-prime` to load:
- Storybook inventory (to reuse existing components during extraction)
- Design system tokens
- The 8 rules

---

## Step 2: Storybook-First Check

**Before analyzing violations, check if Storybook already has what this file is building.**

1. **Read the file** and identify what UI it renders.
2. **Search the Storybook lookup table** (from `ux-prime`) — compare the file's JSX structure, Tailwind classes, icons, and layout against every Storybook component's full element snapshot.
3. **For each match**:
   ```
   STORYBOOK MATCH: This file renders a [pattern] that matches [ComponentName] in Storybook
     Story: [story file] → stories: [variant list]
     Source: [component source path]
     Import: [import path]
     Props: { [mapped props] }
     Recommendation: Replace [lines X-Y] with <ComponentName ... />
   ```
4. **For all elements**: Compare this file's class usage against the Storybook Style Reference. Flag every divergence — not just spacing, but backgrounds, text colors, borders, radius, typography, transitions, icon sizing, everything:
   ```
   STYLE DRIFT:
     - Line 12: bg-gray-800 → Storybook uses bg-bg-default
     - Line 18: text-white → Storybook uses text-tx-strong
     - Line 25: rounded-md → Storybook cards use rounded-xl
     - Line 30: w-6 h-6 icon → Storybook sizes icons w-4 h-4
     - Line 45: p-3 → Similar Storybook components use p-5
   ```

Present Storybook matches to the user before proceeding. If the file is largely a re-implementation of a Storybook component, the "refactor" is replacing it with an import — not migrating classes.

---

## Step 3: Analyze the File

Read the target file completely. Produce a violation report:

| Rule | Status | Details |
|------|--------|---------|
| 1. Line cap | [lines]/150 | Over/under |
| 2. Tailwind only | [violations] | List any inline styles, CSS imports, arbitrary values |
| 3. Componentize | [count] | Conditional JSX blocks that should be components |
| 4. Strong types | [count] | `any` occurrences |
| 5. Layer separation | [violations] | Direct API calls, business logic in component |
| 6. Design system | [violations] | Non-semantic color classes (raw Tailwind or hardcoded hex), hardcoded values not from tokens |
| 7. Tests exist | [yes/no] | Does a test file exist for this file? |
| 8. Reuse | [opportunities] | Existing Storybook components that could replace inline code |

## 🔀 [ROUTER] Refactor Scope

**Based on the analysis, select EXACTLY ONE path.**

- [ ] **Path A: Minor cleanup** — File is under 200 lines, 1-2 violations → Fix inline, no extraction needed.
- [ ] **Path B: Standard refactor** — File is 200-500 lines, multiple violations → Extract services → hooks → components.
- [ ] **Path C: Major decomposition** — File is 500+ lines → This is a mini-migration. Plan the extraction before executing.

🛑 **PROGRESSIVE DISCLOSURE GATE:** Present the violation report and selected path to the user before making any changes. "This file has 312 lines, 4 `any` types, and 2 direct API calls. Recommending Path B: standard refactor. Proceed?"

---

## Step 4: Write Characterization Tests

**BEFORE making any code changes**, write tests that capture the current behavior.

These are NOT TDD tests (those come later for new components). These are
**characterization tests** — they lock in what the code does today so you can
verify the refactor didn't break anything.

```typescript
describe('ComponentName (characterization)', () => {
  it('renders the main content', () => {
    // Capture what renders with typical props
  });

  it('handles [key interaction 1]', () => {
    // Capture current behavior
  });

  it('handles [key interaction 2]', () => {
    // Capture current behavior
  });

  it('handles error state', () => {
    // Capture current error handling
  });
});
```

**Rules for characterization tests:**
- Test observable behavior, not implementation
- Cover every major render path in the file
- Cover every user interaction the component handles
- These tests must PASS against the current code before any refactoring begins

**Run the tests. Paste the output. They must ALL PASS against current code.**

🛑 **PROGRESSIVE DISCLOSURE GATE:** Do not proceed to extraction until characterization tests pass. "Characterization tests: 4/4 passing. Safe to start extraction."

---

## Step 5: Plan the Extraction

Based on the analysis, create an extraction plan:

```
1. Extract [BusinessLogic] → useComponentName.ts (Rule 5)
2. Extract [APICall] → componentService.ts (Rule 5)
3. Extract [ConditionalBlock1] → SubComponent1.tsx (Rule 3)
4. Extract [ConditionalBlock2] → SubComponent2.tsx (Rule 3)
5. Replace [InlineStyle] → Tailwind class (Rule 2)
6. Type [anyVariable] → proper type (Rule 4)
7. Replace [HardcodedColor] → token reference (Rule 6)
```

Order matters:
1. **Services first** — extract API calls and data transformations
2. **Hooks second** — extract state management and business logic
3. **Components third** — extract JSX blocks into sub-components
4. **Cleanup last** — fix types, styles, token references

---

## Step 6: Execute Incrementally

For each extraction step:

1. Make the extraction
2. **Run the characterization tests** — execute the command, read the output
3. If tests pass → continue
4. If tests fail → revert and investigate

**After each extraction, check:**
- Is the new file under 150 lines?
- Is the original file shrinking?
- Does the new file follow all 8 rules?

---

## Step 7: Promote Reusable Components

After extraction, check each new component:
- Is it generic enough to be reused elsewhere?
- Does a similar component already exist in Storybook?

If reusable and not already in Storybook → ask the user if it should be promoted
→ call `ux-story-writer`.

---

## Step 8: Final Verification

**Evidence before claims.** After all extractions:

1. **Run characterization tests** — execute, paste output, count passes
2. **Check line counts** — `wc -l` on original and all new files
3. **Check for `any`** — grep all modified/new files
4. **Check Tailwind usage** — grep for arbitrary values
5. **Verify layer separation** — no direct API calls in components
6. **Storybook style check** — compare every changed file's classes against the Storybook Style Reference. Does the refactored component use the same backgrounds, text colors, borders, spacing, radius, typography, icon sizing, and transitions as similar Storybook components? Flag any drift. If calling `ux-polish` is warranted, recommend it.

Report the results:

```
Refactored [filename]:
  Before: [X] lines, [Y] any types, [Z] violations
  After:  [X] lines, [Y] any types, [Z] violations
  Extracted: [list of new files created]
  Tests: [X/X passing — command output attached]
  Storybook style match: [N/N patterns match — drift list if any]
```

🛑 **Do NOT claim "all tests pass" without running them in this session. Evidence before assertions.**
