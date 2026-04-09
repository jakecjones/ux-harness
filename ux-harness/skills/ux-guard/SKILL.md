---
name: ux-guard
description: >
  Review new or modified files against the 8 UX Harness rules. Checks file length,
  Tailwind-only styling, strong types, Component → Hook → Service → API layering,
  design system token usage, test file existence, and Storybook duplication. Outputs a
  violation report with severity and fix suggestions. The micro lens — checks
  individual files. For codebase-wide health reports use ux-audit. Works on any
  React/Tailwind frontend codebase. Triggers on: "ux-guard", "check this against
  the standard", "review this file", "does this pass the harness", or before any
  PR or commit.
argument-hint: "[file-path, --staged, or --diff]"
---

# UX Guard

Review files against the 8 UX Harness rules. The micro lens.

**Announce at start:** "Running UX Harness guard check..."

---

## Step 1: Load Context

Run `ux-prime` to load:
- Design system tokens (to verify token usage)
- Storybook inventory (to check for duplication)
- The 8 rules

---

## Step 2: Determine Scope

What files to check:
- If user specifies a file → check that file
- If user says "check my changes" or passes `--staged` → run `git diff --name-only --cached` to get staged files
- If user says "check this PR" or passes `--diff` → run `git diff main...HEAD --name-only`
- Only check `.ts` and `.tsx` files in `src/`

---

## Step 3: Check Each Rule

For each file in scope, run these checks:

### Rule 1: One Responsibility Per File
- Count lines (excluding blank lines and comments)
- **WARN** if > 150 lines
- **FAIL** if > 200 lines
- Exception: design system tokens file is exempt

### Rule 2: Tailwind Only (Semantic Token Classes)
- Search for `style={{` → **FAIL** (inline styles)
- Search for `.module.css` imports → **FAIL** (CSS modules)
- Search for `styled.` or `@emotion` → **FAIL** (CSS-in-JS)
- Search for `bg-[`, `text-[`, `w-[`, `h-[`, `p-[`, `m-[` → **FAIL** (arbitrary values — use token classes)
- Search for **raw Tailwind color classes** that bypass the semantic token system → **WARN**:
  - `bg-blue-`, `bg-red-`, `bg-green-`, `bg-gray-`, `bg-slate-`, etc. → Should be `bg-background-*`
  - `text-blue-`, `text-red-`, `text-green-`, `text-gray-`, etc. → Should be `text-text-*`
  - `border-blue-`, `border-red-`, `border-gray-`, etc. → Should be `border-border-*`
- For each violation, suggest the semantic alternative from the token system:
  - `bg-blue-500` → `bg-background-primary`
  - `text-gray-500` → `text-text-weak`
  - `border-gray-200` → `border-border-default`
  - `bg-red-100` → `bg-background-criticalSubtle`
  - `text-green-600` → `text-text-success`

### Rule 3: Componentize Everything
- In `.tsx` files, search for ternary expressions or `&&` in JSX that span 5+ lines
- **WARN** for each one: "Consider extracting this conditional into a separate component"
- Search for JSX return blocks over 50 lines → **WARN**: "This return block is large — consider breaking into composed sub-components"

### Rule 4: Strong Types
- Search for `: any` → **FAIL** if in business logic, **WARN** if at API boundary
- Search for `as any` → **FAIL** always
- Search for missing return types on exported functions → **WARN**
- Search for inline prop types (not using a named interface) → **WARN**

### Rule 5: Component → Hook → Service → API
- In `.tsx` files, search for `fetch(`, `axios.`, `.get(`, `.post(` → **FAIL** (direct API call in component)
- In hook files, search for `fetch(`, `axios.` → **WARN** (should be in service layer)
- Check if the file imports from the correct layer

### Rule 6: Design System File First (Semantic Tokens + Storybook Spacing)
- In `.tsx` files, check for hardcoded color hex values → **FAIL**: "Use a semantic token class instead"
- Check for hardcoded pixel values in Tailwind arbitrary syntax → **WARN**
- Check for **non-semantic Tailwind color usage** → **WARN**: classes like `bg-gray-50`, `text-blue-700` should be semantic (`bg-background-weak`, `text-text-primary`)
- Build a map of semantic equivalents from the tokens loaded by ux-prime and suggest the correct class for each violation
- Check spacing: if named spacing scale is wired (tokens define xs→4xl), then `p-4`, `gap-2` → **WARN**: "Use named spacing (`p-lg`, `gap-sm`) instead of numeric"; `p-[23px]` → **FAIL**

**Storybook style enforcement** (uses the Storybook Style Reference from `ux-prime` Step 3e):
Compare every class in the file against the established patterns from Storybook. Check ALL elements, not just spacing:
- **Backgrounds**: File uses `bg-gray-800` but Storybook uses `bg-bg-default` for containers → **WARN**
- **Text colors**: File uses `text-white` but Storybook uses `text-tx-strong` for headings → **WARN**
- **Borders**: File uses `border-gray-600` but Storybook uses `border-bd-default` → **WARN**
- **Spacing**: File uses `p-3` but similar Storybook components use `p-5` → **WARN**
- **Radius**: File uses `rounded-md` on a card but Storybook cards use `rounded-xl` → **WARN**
- **Typography**: File uses `text-base` where Storybook uses `text-sm font-medium` for the same element type → **WARN**
- **Icons**: File sizes icons `w-6 h-6` but Storybook uses `w-4 h-4` / `w-5 h-5` → **WARN**
- **Transitions**: File has no transition but Storybook interactive elements use `transition-colors` → **WARN**
- **Layout**: File uses ad-hoc flexbox where Storybook has an established container pattern → **WARN**

For each warning, cite the specific Storybook component and story that establishes the pattern:
  `→ Storybook reference: MetricCard (Widget Garage/Metric Card) uses bg-bg-default, rounded-xl, p-5`

### Rule 7: TDD
- For each new `.tsx` or `.ts` file, check if a corresponding `.test.tsx` or `.test.ts` exists
- **WARN** if no test file exists
- Note: this check is for existence, not quality

### Rule 8: Reduce, Reuse, Recycle (Storybook Lookup)
- **Name matching**: Compare the component name and file name against every Storybook component name and keyword list. If a match is found → **WARN**: "`[ComponentName]` already exists in Storybook at `[import path]` (story: `[story file]`). Use it."
- **Pattern matching**: Read the file's JSX structure and compare against Storybook components' full element snapshots — classes, props, icons, layout, everything. If the file renders a UI pattern (nav items in a sidebar, card with header/body/footer, data table with rows) that matches a Storybook component → **WARN**: "This renders a [pattern] that matches `[ComponentName]` in Storybook. Import it instead of re-implementing."
- **Style matching**: If this file's classes diverge from the Storybook component it resembles across ANY element (backgrounds, text, borders, spacing, radius, typography, icons, transitions), flag each divergence: **WARN**: "Style drift from Storybook `[ComponentName]`: file uses `[X]`, Storybook uses `[Y]`"
- Check for duplicate utility functions that already exist in `src/utils/`

---

## Step 4: Produce the Report

**Run all checks with actual grep/search commands. Do NOT guess at results.**

```
UX Harness Guard Report
════════════════════════

Files checked: [count]

[filename.tsx]
  ✗ FAIL  Rule 1: 247 lines (200 hard cap)
  ✗ FAIL  Rule 4: `as any` on line 58
  ⚠ WARN  Rule 3: Conditional JSX block on lines 120-145
  ⚠ WARN  Rule 7: No test file found
  ✓ PASS  Rule 2: Tailwind only
  ✓ PASS  Rule 5: No direct API calls
  ✓ PASS  Rule 6: Design system tokens used
  ✓ PASS  Rule 8: No Storybook duplication

[filename2.tsx]
  ✓ PASS  All rules

Summary:
  FAIL: [count] violations across [count] files
  WARN: [count] warnings across [count] files
  PASS: [count] files fully compliant

Suggested fixes:
  1. [filename.tsx] line 58: Replace `as any` with proper type
  2. [filename.tsx]: Extract lines 120-145 into a separate component
  3. [filename.tsx]: Add test file [filename.test.tsx]
```

---

## Severity Definitions

| Severity | Meaning | Action |
|----------|---------|--------|
| **FAIL** | Hard rule violation — must be fixed before merge | Block PR |
| **WARN** | Soft violation — should be fixed, not blocking | Fix if possible |
| **PASS** | Rule satisfied | No action |

---

## Key Principles

- **Evidence-based** — every FAIL/WARN cites a specific line number and pattern
- **Non-destructive** — this skill only reads and reports, never modifies code
- **Actionable** — every violation includes a suggested fix
- **Honest** — report what the grep finds, don't assume
