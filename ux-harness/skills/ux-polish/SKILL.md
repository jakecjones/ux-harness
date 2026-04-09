---
name: ux-polish
description: >
  Verify migrated or newly built components match Storybook's established style
  and organizational structure. Checks against all four Storybook sections —
  Foundations (colors, typography, icons, spacing, borders), Components (buttons,
  inputs, cards, tabs, badges), Widget Garage (composed widgets), and Page Examples
  (layout conventions) — not just individual token matches. Primary goal is reuse
  from Storybook; secondary is style consistency for genuinely new code. Run after
  any migration, refactor, or build to catch drift before it ships. Triggers on:
  "ux-polish", "does this match storybook", "style check", "polish this",
  "does this look right", "visual check", or after any ux-migrate/ux-refactor/
  ux-component-builder completes.
argument-hint: "[file-path or directory or --staged or --diff]"
---

# UX Polish

Verify that code reuses Storybook components wherever possible and visually matches Storybook's established style where it doesn't. The primary goal is **reuse from Storybook** — don't reinvent what already exists. The secondary goal is style consistency for genuinely new code.

**Announce at start:** "Running Storybook polish check — looking for reuse opportunities and style drift..."

---

## Step 1: Load Storybook Context

Run `ux-prime` to load:
- The **Storybook Lookup Table** (every component's full class snapshot)
- The **Storybook Style Reference** (established patterns across all element types)
- The design system tokens

If `ux-prime` reports no Storybook detected, stop: "No Storybook found — can't verify style without a reference. Run `ux-audit` to assess gaps."

---

## Step 2: Determine Scope

What files to check:
- If user specifies a file or directory → check those files
- If `--staged` → check `git diff --name-only --cached`
- If `--diff` → check `git diff main...HEAD --name-only`
- Only check `.tsx` and `.jsx` files in `src/`

---

## Step 3: Reuse Check (Primary Goal)

**Before checking style, check if Storybook already has what this code is building.**

For each file in scope:

1. **Read the file** completely.
2. **Identify every UI pattern it renders** — cards, sidebars, tables, forms, headers, modals, metric widgets, badges, buttons, nav items, etc.
3. **For each pattern, search the Storybook Lookup** by:
   - Component name and keywords
   - JSX structure (element hierarchy, nesting)
   - Class patterns (similar backgrounds, borders, layout)
   - Props shape (does a Storybook component accept what this code is passing?)
4. **Report reuse opportunities**:

```
REUSE OPPORTUNITIES:
  [filename.tsx] line 24-45: Renders a metric card with gauge
    → MetricCard exists in Storybook (Widget Garage/Metric Card)
    → Import: @components/common/MetricCard
    → Props: { name, type, passRate, coverage }
    → Stories: Healthy, Warning, NoData, Loading
    → Recommendation: REPLACE 22 lines of JSX with <MetricCard ... />

  [filename.tsx] line 52-68: Renders a nav sidebar
    → SideNav exists in Storybook (Widget Garage/SideNav)
    → Import: @components/layout/SideNav
    → Recommendation: REPLACE with <SideNav items={...} />

  [filename.tsx] line 80-95: Renders a card container — no Storybook match
    → Proceed to style check (Step 4) for this block
```

**Every pattern that has a Storybook component should use that component, not reinvent it.** This is the most important check ux-polish does.

---

## Step 4: Section-Level Compliance

**Check the code against each high-level Storybook section — not just individual components, but the conventions each section establishes.**

Use the **Storybook Section Map** from `ux-prime` to verify compliance at every layer:

### Foundations Check
Does the code follow the design primitives established in the Foundations section?
- **Colors**: Are all `bg-*`, `text-*`, `border-*` classes from the Foundations/Colors palette? Flag any class not in the palette.
- **Typography**: Do heading sizes, weights, and line heights match Foundations/Typography? Is the font scale respected (not ad-hoc `text-[17px]`)?
- **Icons**: Are icons sourced from Lucide (per Foundations/Icons)? Are they sized per the established convention?
- **Spacing**: Does the code use the spacing scale from Foundations/Spacing? Flag any spacing value that isn't in the scale.
- **Borders & Shadows**: Do radius and shadow values match Foundations/Borders & Shadows?

### Components Check
Does the code use existing Components where applicable?
- For every button, input, card, tab, badge, or skeleton loader in the code — is it using the Storybook Component, or hand-rolling its own?
- If hand-rolling: is there a good reason (genuinely different from the Component), or should it be a reuse?
- Report: "Components section has [Button, Card, Badge, ...]. Your code renders [N] buttons — [X] use the Storybook Button, [Y] are custom."

### Widget Garage Check
Does the code use existing Widgets for composed patterns?
- For every dashboard card, metric display, navigation sidebar, or data widget — does a Widget Garage component already do this?
- Compare not just by name but by **structure**: Does the code render a card with a title, metric value, and gauge? That's MetricCard.
- Report: "Widget Garage has [MetricCard, BlueprintCard, SideNav, ...]. Your code contains [N] composed patterns — [X] match existing widgets."

### Page Examples Check
Does the code follow the page layout conventions from Page Examples?
- For pages/views: does the layout match an established Page Example pattern (Card Grid, Table Page, Detail Page, etc.)?
- Is the page-level spacing consistent with Page Examples (page padding, section gaps, responsive breakpoints)?
- Report: "Page Examples show [Card Grid, Table Page, ...]. Your layout most closely matches [X] — [differences noted]."

```
SECTION COMPLIANCE:
  Foundations:
    ✓ Colors — all classes in palette
    ⚠ Typography — text-[15px] not in type scale (line 42) → use text-sm
    ✓ Icons — all Lucide, correctly sized
    ✓ Spacing — all values in scale
    ✓ Borders & Shadows — matches

  Components:
    ⚠ 3 buttons rendered — 2 use Storybook Button, 1 is custom (line 67)
      → Custom button could be <Button variant="ghost" size="sm" />
    ✓ Cards use Storybook Card component
    ✓ Badges use Storybook Badge component

  Widget Garage:
    ✗ Lines 24-45 render a metric display → MetricCard exists
      → REPLACE with <MetricCard name={...} passRate={...} />
    ✓ SideNav is imported from Storybook

  Page Examples:
    ✓ Layout follows Card Grid pattern (grid-cols-3, gap-6, p-8)
```

---

## Step 5: Element-by-Element Style Check (for genuinely new code only)

For code that has **no Storybook component match** (Step 3 found nothing) and **no section-level issue** (Step 4 passed), fall back to the Storybook Style Reference for fine-grained visual consistency.

Compare every class in genuinely new code against the Storybook Style Reference. Check **all 10 element categories**:

### 1. Backgrounds
- What `bg-*` classes does this file use?
- What does the Storybook reference use for the same element role?
- Page backgrounds should be `bg-bg-page`. Containers should be `bg-bg-default` or `bg-bg-elevated`. Are they?

### 2. Text Colors
- Headers: is it `text-tx-header` / `text-tx-strong` like Storybook?
- Body: `text-tx-primary`?
- Muted/secondary: `text-tx-weak`?
- Status text: `text-status-critical-text`, `text-status-success-text`?

### 3. Borders
- Default borders: `border-bd-default`?
- Subtle borders: `border-bd-weak`?
- Interactive hover: `hover:border-bd-primary`?

### 4. Spacing
- Container padding: does it match similar Storybook components?
- Child gaps: does it match?
- Is the spacing consistent within the file? (no mixing `p-3` and `p-5` on the same type of element)

### 5. Border Radius
- Cards/panels: `rounded-xl` like Storybook?
- Buttons/inputs: `rounded-lg` or `rounded-md`?
- Badges/pills: `rounded-full`?

### 6. Typography
- Heading sizes and weights: match Storybook?
- Body text size: `text-sm`? `text-base`?
- Label/caption: `text-xs text-tx-weak`?
- Font weights: `font-semibold` for headings, `font-medium` for labels?

### 7. Icons
- Source: `lucide-react`?
- Sizing: `w-4 h-4` (small) or `w-5 h-5` (medium) like Storybook?
- Color: inherited from parent text (no explicit fill/stroke)?
- Accessibility: `aria-label` or `aria-hidden`?

### 8. Transitions
- Interactive elements have `transition-colors` or `transition-all`?
- Duration: `duration-200` like Storybook?
- Are hover effects smooth, not instant?

### 9. Hover/Focus States
- Using the same hover patterns as Storybook? (`hover:bg-bg-elevated`, not ad-hoc)
- Focus visible states present on interactive elements?
- Consistent with how Storybook components handle interaction?

### 10. Layout
- Flex/grid patterns match Storybook's approach for the same type of layout?
- Consistent centering approach (`flex items-center justify-center`)?
- Responsive considerations match?

---

## Step 6: Produce the Polish Report

```
UX Polish Report
════════════════

Files checked: [count]

═══ REUSE OPPORTUNITIES (replace, don't reinvent) ═══

  [filename.tsx] lines 24-45: metric card pattern → USE <MetricCard />
  [filename.tsx] lines 52-68: sidebar pattern → USE <SideNav />
  Total: [N] patterns could be replaced with Storybook imports
  Estimated lines removed: [N]

═══ SECTION COMPLIANCE ═══

  Foundations:
    ✓ Colors — all classes in palette
    ⚠ Typography — text-[15px] not in type scale (line 42) → use text-sm
    ✓ Icons — all Lucide, correctly sized
    ✓ Spacing — all values in scale
    ✓ Borders & Shadows — matches

  Components:
    ⚠ 3 buttons rendered — 2 use Storybook Button, 1 is custom (line 67)
    ✓ Cards use Storybook Card component

  Widget Garage:
    ✗ Lines 24-45 render metric display → MetricCard exists → REPLACE
    ✓ SideNav imported from Storybook

  Page Examples:
    ✓ Layout follows Card Grid pattern

═══ STYLE DRIFT (genuinely new code that doesn't match Storybook) ═══

  [filename.tsx] — Reference: Style Reference (aggregate)
    ⚠ Spacing: p-3 — Storybook widgets use p-5 → FIX
    ⚠ Radius: rounded-md — Storybook cards use rounded-xl → FIX
    ⚠ Icons: w-6 h-6 — Storybook uses w-5 h-5 → FIX
    ✗ Hover: no hover state — Storybook uses hover:border-bd-primary → ADD
    ✓ Backgrounds, Text, Borders, Typography, Transitions, Layout: match

  [filename2.tsx] — Reference: Style Reference (aggregate)
    ✓ All 10 categories match established patterns

Summary:
  🔄 Reuse: [N] patterns should be Storybook imports (not custom code)
  📐 Sections: [N/4] Storybook sections fully compliant
  ⚠ Drift: [N] style differences on genuinely new code
  ✓ Match: [N] files fully match Storybook style

Polish score: [N]% (reuse + section compliance + style match combined)
```

---

## Step 7: Offer to Fix

After presenting the report:

```
Found [N] reuse opportunities and [M] style drift issues.

Reuse fixes (replace custom code with Storybook imports):
  1. [filename.tsx] lines 24-45 → <MetricCard />
  2. [filename.tsx] lines 52-68 → <SideNav />

Style fixes (align new code with Storybook patterns):
  3. [filename.tsx] line 15: p-3 → p-5
  4. [filename.tsx] line 22: rounded-md → rounded-xl

Apply fixes? (yes / no / pick)
  - "yes" → Apply all reuse replacements and style fixes
  - "no" → Leave as-is
  - "pick" → Choose by number
```

**Wait for user decision.** Do NOT auto-fix.

---

## Key Principles

- **Reuse first, style second.** If Storybook has a component that does what your code does, use it. Don't reinvent.
- **Sections matter, not just components.** Storybook is organized into Foundations, Components, Widget Garage, and Page Examples. Each section establishes conventions — check against all of them, not just individual component matches.
- **Storybook is the reference.** If Storybook uses `rounded-xl` on cards, every card should use `rounded-xl`. Period.
- **All 10 categories matter.** Don't just check tokens — check spacing, radius, typography, icons, transitions, hover states, layout.
- **Match, don't invent.** If there's no Storybook precedent, flag as "novel — no reference" rather than guessing.
- **Non-destructive by default.** Report, offer fixes, wait for approval.
- **Run after every migration/refactor.** `ux-guard` catches rule violations. `ux-polish` catches "it works but doesn't reuse what's already there" and "it works but doesn't look right."
