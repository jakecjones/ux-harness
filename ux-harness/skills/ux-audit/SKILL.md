---
name: ux-audit
description: >
  Scan a component, page, feature area, or the entire codebase and produce a health
  report against the UX Harness standard. Reports on file health, type health, style
  health, architecture health, test health, and Storybook health. Produces a scorecard
  with overall compliance percentage, per-rule breakdown, top 10 worst offenders, and
  trend comparison. Saves reports to ai_docs/audits/. The macro lens — for individual
  file checks use ux-guard. Works on any React/Tailwind frontend codebase. Triggers
  on: "ux-audit", "audit this page", "codebase health check", "how healthy is this",
  "how far are we from the standard", "compliance report", or any broad quality
  assessment request.
argument-hint: "[scope: component-path, page-path, feature-name, or 'full']"
---

# UX Audit

Scan a codebase scope and produce a health report. The macro lens.

**Announce at start:** "Running UX Harness audit..."

---

## Step 1: Load Context

Run `ux-prime` to load:
- Design system tokens
- Storybook inventory
- The 8 rules

---

## 🔀 [ROUTER] Scope Selection

**Determine the audit scope. Select EXACTLY ONE.**

- [ ] **Component** — User specified a component directory → Scan that directory only
- [ ] **Page** — User specified a page directory (`src/pages/PageName/`) → Scan that page and its components
- [ ] **Feature** — User specified a feature area (e.g., "all TestBot-related files") → Identify and scan all related files
- [ ] **Full codebase** — User said "full", "everything", or "codebase" → Scan all of `src/`

🛑 **PROGRESSIVE DISCLOSURE GATE:** Confirm scope with the user before scanning. "Auditing the TestBot page (src/pages/TestBot/ — 8 files). Correct?"

---

## 🔀 [ROUTER] Session Health Monitor (Full Codebase Only)

If scope is full codebase:

- [ ] **Condition: More than 200 source files** → Scan in batches by directory. Report after each batch.
- [ ] **Condition: Session > 100 messages** → Save partial audit to `ai_docs/audits/` and recommend continuing in a fresh session.

---

## Step 2: Collect Metrics

For the target scope, collect data across 6 health dimensions:

### File Health
- Total `.ts` and `.tsx` files
- Files over 150 lines (count and list)
- Files over 200 lines (count and list)
- Average file length
- Top 10 longest files with line counts

### Type Health
- Total `: any` occurrences
- Total `as any` occurrences
- Files with most `any` usage (top 10)
- Percentage of files with zero `any`

### Style Health
- CSS module imports (count)
- Inline style objects (count)
- Styled-components/Emotion usage (count)
- Tailwind arbitrary values — `bg-[`, `text-[`, `w-[`, etc. (count)
- Hardcoded color hex values in JSX (count)
- **Non-semantic Tailwind color usage** — raw Tailwind classes like `bg-blue-500`, `text-gray-600`, `border-red-200` that should be semantic token classes like `bg-background-primary`, `text-text-weak`, `border-border-critical` (count and top 10 offenders)
- **Semantic token adoption rate** — percentage of color classes that use the semantic token system vs. raw Tailwind defaults. This is the key migration metric over time.

### Architecture Health
- Components with direct `fetch()` or `axios` calls (count and list)
- Components importing from service layer correctly (count)
- Hooks directory usage (files in `src/hooks/`)
- Services directory usage (files in `src/services/`)

### Test Health
- Total test files
- Components without test files (count and list)
- Hooks without test files
- Services without test files
- Test-to-source ratio

### Storybook Health
- Components in Storybook (story count by section: Foundations, Components, Widget Garage, Page Examples)
- Components used in 3+ places without a story (candidates)

**Run actual grep/search commands for each metric. Do NOT estimate or guess.**

---

## Step 3: Score Each Rule

For each rule, calculate a compliance percentage:

| Rule | Metric | Formula |
|------|--------|---------|
| 1. Line cap | Files under 150 lines | compliant files / total files |
| 2. Tailwind only | Files with zero style violations | clean files / total tsx files |
| 3. Componentize | Files with no JSX blocks > 50 lines | clean files / total tsx files |
| 4. Strong types | Files with zero `any` | clean files / total files |
| 5. Layer separation | Components with no direct API calls | clean components / total components |
| 6. Design system | Files using only semantic token classes (no raw Tailwind colors, no hardcoded hex) | clean files / total tsx files |
| 7. TDD | Files with corresponding tests | tested files / total files |
| 8. Reuse | Storybook component coverage | Storybook stories / reusable component candidates |

**Overall compliance** = average of all 8 rule scores

---

## Step 4: Produce the Report

```markdown
# UX Harness Audit Report
**Scope:** [scope description]
**Date:** [date]
**Overall Compliance:** [X]%

## Scorecard

| Rule | Score | Status |
|------|-------|--------|
| 1. One Responsibility (line cap) | [X]% | [green/yellow/red] |
| 2. Tailwind Only | [X]% | [green/yellow/red] |
| 3. Componentize Everything | [X]% | [green/yellow/red] |
| 4. Strong Types | [X]% | [green/yellow/red] |
| 5. Layer Separation | [X]% | [green/yellow/red] |
| 6. Design System First | [X]% | [green/yellow/red] |
| 7. TDD | [X]% | [green/yellow/red] |
| 8. Reduce, Reuse, Recycle | [X]% | [green/yellow/red] |

Status: 90%+ = green, 60-89% = yellow, <60% = red

## File Health
- Total files: [count]
- Under 150 lines: [count] ([%])
- Over 200 lines: [count] ([%])
- Average length: [lines]
- Longest: [filename] at [lines] lines

## Type Health
- Total `any`: [count] across [count] files
- Files with zero `any`: [count] ([%])
- Top offenders:
  1. [filename] — [count] occurrences
  2. ...

## Style Health
- CSS modules: [count]
- Inline styles: [count]
- Arbitrary Tailwind values: [count]
- Hardcoded hex colors: [count]
- Non-semantic Tailwind color classes: [count] (e.g., bg-blue-500 instead of bg-background-primary)
- **Semantic token adoption: [X]%** (semantic color classes / total color classes)

## Architecture Health
- Components with direct API calls: [count]
- Components following hook pattern: [count] ([%])

## Test Health
- Test files: [count]
- Source files without tests: [count] ([%])
- Test-to-source ratio: [ratio]

## Storybook Health
- Components in Storybook: [count]
- Candidates missing stories: [count]

## Top 10 Worst Offenders
1. [filename] — [primary violation] — [lines] lines, [any count] `any`
2. ...

## Recommended Next Steps
1. [Highest impact improvement]
2. [Second priority]
3. [Third priority]
```

Save to `ai_docs/audits/YYYY-MM-DD-ux-audit-[scope].md`.

---

## Step 5: Trend Comparison (Optional)

If a previous audit exists in `ai_docs/audits/`:
- Compare overall compliance scores
- Highlight improvements and regressions
- Note which rules improved and which didn't

```
Trend since last audit ([date]):
  Overall: [X]% → [Y]% ([+/-Z]%)
  Rule 4 (Strong Types): 34% → 41% (+7%) — improving
  Rule 7 (TDD): 21% → 21% (0%) — no change
```

---

## Key Principles

- **Non-destructive** — this skill only reads and reports, never modifies code
- **Honest numbers** — don't round up or sugarcoat. 34% is 34%.
- **Evidence-based** — every number comes from an actual grep/search, not estimation
- **Actionable** — every report ends with prioritized next steps
- **Comparable** — reports use consistent format so trends are trackable
