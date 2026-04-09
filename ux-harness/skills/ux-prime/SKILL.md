---
name: ux-prime
description: >
  Load the UX Harness context — design system tokens and Storybook inventory.
  This is the foundation skill that all other ux- skills depend on. It reads the
  design system tokens file and scans Storybook story files to build a structured
  inventory of available tokens, Storybook components, their props, and their tier
  (Foundations/Components/Widget Garage/Page Examples). Works on any React/Tailwind frontend codebase that
  follows the UX Harness standard. Triggers on: internal dependency only — not
  called directly by users.
user-invokable: false
---

# UX Prime

Load the UX Harness context for the current codebase. This skill is the foundation
that all other `ux-` skills call before doing their work.

**Announce at start:** "Loading UX Harness context..."

---

## Step 1: Detect the Design System

Look for the design system tokens file. Search in this order:

1. `src/design-system/tokens.ts`
2. `src/design-system/tokens.js`
3. `src/styles/theme.ts`
4. `src/styles/theme.js`
5. `src/theme.ts`

If found, read it completely. Extract:
- All color tokens organized by semantic category (background, text, border, icon, dataType, brand)
- Spacing scale (named: xs → 4xl)
- Border radius values (named: sm → round)
- Typography tiers (heading, label, body) with font families (sans, mono)
- Shadow definitions
- Transition speeds (fast, base, slow)
- Breakpoints
- Z-index scale

If NOT found, report: "No design system tokens file detected. This codebase has
not adopted the UX Harness standard yet. Run `ux-audit` to assess alignment gaps."

---

## Step 2: Validate Token Structure

If a tokens file was found, verify structural integrity:

### Required categories (semantic architecture)
Check that the file exports these token categories with **semantic naming**:
- `colors` — must exist with these sub-categories:
  - `colors.background` — must have `default`, `primary`, `critical`, `success`, `warning`, `disabled`
  - `colors.text` — must have `default`, `strong`, `weak`, `primary`, `disabled`
  - `colors.border` — must have `default`, `primary`
  - `colors.icon` — must have `default`, `primary`
  - `colors.brand` — must have `primary`
  - `colors.dataType` (TestLane-specific) — optional, each entry has `base`, `subtle`, `text`
- `spacing` — must exist with named scale (`xs` through `4xl`), not numeric keys
- `typography` — must exist with:
  - `fontFamily` containing `sans` and `mono`
  - `heading` tier (structured: `{ size, weight, leading }`)
  - `body` tier
  - `label` tier
- `borderRadius` — must exist with named scale
- `shadows` — must exist
- `transitions` — must exist with named speeds (`fast`, `base`, `slow`)
- `zIndex` — must exist

### Semantic naming checks
- Color tokens use **intent-based names** (e.g., `background.primary`, `text.weak`), NOT appearance names (e.g., `blue-500`, `gray-200`)
- Consistent variant names across color categories (`default`, `strong`, `weak`, `primary`, `critical`, `success`, `warning`, `disabled`)
- No raw color names (`red`, `blue`, `green`) as top-level keys — only semantic roles
- Spacing uses named scale (`xs`, `sm`, `md`, `lg`, `xl`) not numeric (`1`, `2`, `4`, `8`)

### Structural checks
- File uses `as const` assertions on all exports
- No duplicate keys within any token category
- Color values are valid hex (`#` prefix, 3/6/8 chars) or CSS-named
- Spacing values are valid CSS units (`rem`, `px`, `em`)
- No `any` types in the file

### Report issues
```
Token Validation:
  ✓ colors.background — 18 tokens, semantic names, all valid hex
  ✓ colors.text — 12 tokens, semantic names, all valid hex
  ✓ colors.border — 8 tokens, semantic names
  ✓ colors.icon — 10 tokens, semantic names
  ✓ colors.dataType — 4 entities (customer, vehicle, purchase, starData)
  ✓ spacing — 9 named scale values (none → 4xl)
  ✓ typography — heading/label/body tiers, sans + mono families
  ⚠ transitions — missing 'slow' speed variant
  ✗ borderRadius — uses numeric keys instead of named scale
```

If critical issues found (missing required categories, no `as const`, non-semantic naming), append
to the context: `⚠ Token file has structural issues — see validation above.`

---

## Step 3: Detect the Storybook Design System (Deep Parse)

Look for Storybook story files. Search in this order:

1. `src/stories/**/*.stories.tsx`
2. `src/stories/**/*.stories.ts`
3. `src/**/*.stories.tsx` (fallback — stories colocated with components)

If found, build a **deep Storybook inventory** by reading each story file completely.

### 3a. Extract Metadata from Each Story

For each story file, **read the full file** and extract:

- **Component name** (from the `title` field in the meta export)
- **Section** (from the first segment of the title path, e.g., `title: 'Components/Button'` → section = `Components`, `title: 'Widget Garage/MetricCard'` → section = `Widget Garage`)
- **Component import path** (the actual `import { X } from './X'` line — resolve to absolute path)
- **Props interface** (from `argTypes` in meta, AND by reading the imported component's TypeScript interface/type)
- **Story variants** (names of all exported stories: Default, WithIcon, ErrorState, Collapsed, etc.)
- **Tailwind classes used in story decorators** (to understand the component's visual context)

### 3b. Build the Storybook Lookup Table

From the parsed stories, build a structured lookup that downstream skills can query. This is the **single source of truth** for what "compliant" looks like — every class, every prop, every pattern.

For each component found in Storybook, extract **everything**:

```typescript
// Conceptual structure — this lives in context, not a file
StorybookLookup = {
  "SideNav": {
    storyFile: "src/stories/design-system/widget-garage/SideNav.stories.tsx",
    storyCategory: "Widget Garage",                    // from meta.title
    componentSource: "src/components/layout/SideNav.tsx", // where the component actually lives
    stories: ["Default", "Collapsed", "WithBadges"],   // exported story names

    // --- FULL ELEMENT SNAPSHOT (everything from the story + component file) ---
    props: {                                           // TypeScript interface from component
      items: "NavItem[]",
      collapsed: "boolean",
      onNavigate: "(path: string) => void"
    },
    classes: {                                         // ALL Tailwind classes used, grouped
      background: ["bg-bg-page", "bg-bg-default", "bg-bg-elevated"],
      text: ["text-tx-strong", "text-tx-primary", "text-tx-weak"],
      border: ["border-bd-default", "border-bd-weak"],
      spacing: ["p-4", "py-2", "px-3", "gap-1"],
      layout: ["flex", "flex-col", "items-center", "w-64", "min-h-screen"],
      interactive: ["hover:bg-bg-elevated", "transition-colors"],
      typography: ["text-sm", "font-medium", "text-xs"],
      radius: ["rounded-lg", "rounded-md"],
      other: ["overflow-hidden", "cursor-pointer"]
    },
    icons: ["LayoutDashboard", "Bot", "BarChart3", "Settings"],  // lucide imports
    iconSizing: "w-4 h-4",                           // how this component sizes icons
    subComponents: ["NavItem", "NavGroup"],            // child components used
    decoratorClasses: ["min-h-screen", "bg-bg-page", "flex"],  // from story decorator wrapper
    keywords: ["nav", "sidebar", "navigation", "menu", "drawer"]
  },
  "MetricCard": {
    storyFile: "src/stories/design-system/widget-garage/MetricCard.stories.tsx",
    storyCategory: "Widget Garage",
    componentSource: "src/components/common/MetricCard.tsx",
    stories: ["Healthy", "Warning", "NoData", "Loading"],

    props: {
      name: "string",
      type: "'service' | 'team'",
      passRate: "number",
      coverage: "number"
    },
    classes: {
      background: ["bg-bg-default", "bg-bg-elevated"],
      text: ["text-tx-strong", "text-tx-primary", "text-tx-weak", "text-status-critical-text"],
      border: ["border-bd-default"],
      spacing: ["p-5", "gap-3", "space-y-2"],
      layout: ["flex", "items-center", "justify-between", "w-full"],
      interactive: ["hover:border-bd-primary", "transition-all"],
      typography: ["text-sm", "font-semibold", "text-2xl"],
      radius: ["rounded-xl"],
      other: ["shadow-sm"]
    },
    icons: ["Activity", "Percent"],
    iconSizing: "w-5 h-5",
    subComponents: ["CircleGauge", "CardSkeleton"],
    decoratorClasses: ["min-h-screen", "bg-bg-page", "p-8", "flex", "items-start", "justify-center"],
    keywords: ["metric", "card", "gauge", "stats", "dashboard", "kpi"]
  }
  // ... every component in Storybook
}
```

### 3c. Extract Keywords for Fuzzy Matching

For each Storybook component, derive `keywords` by:
1. Splitting the component name by PascalCase (`MetricCard` → `["metric", "card"]`)
2. Adding semantic role words from the props (e.g., `passRate` → `"rate"`, `"metric"`)
3. Adding common synonyms (e.g., `SideNav` → `["sidebar", "drawer", "menu"]`)
4. Adding the story category name (e.g., `"Widget Garage"` → `"widget"`)

These keywords enable downstream skills to match raw JSX blocks against Storybook components even when names don't match exactly.

### 3d. Read the Actual Component File

For each story's imported component, **also read the component source file** and extract:
- The full TypeScript props interface (every prop name, type, and default value)
- **Every Tailwind class** used in the component's JSX — backgrounds, text colors, borders, spacing, layout, radius, shadows, transitions, typography, sizing, everything
- Any sub-components it imports
- Icon imports and how they're sized
- Event handlers and interactive patterns

This is critical — the story shows how to USE the component, but the component file shows the ACTUAL implementation. Both go into the lookup.

### 3e. Build the Storybook Section Map

After parsing all stories, organize them by their **high-level Storybook section** (derived from the `title` field in each story's meta). Each section establishes a different layer of the design system:

```
StorybookSectionMap = {
  "Foundations": {
    purpose: "Design primitives — the raw building blocks every other section depends on",
    stories: {
      "Colors": { storyFile: "...", documents: "Full color palette — semantic bg-*, text-*, border-* classes" },
      "Typography": { storyFile: "...", documents: "Font scale, weights, line heights" },
      "Icons": { storyFile: "...", documents: "Lucide icon set, sizing conventions, accessibility" },
      "Spacing": { storyFile: "...", documents: "Named spacing scale (xs→4xl), padding/gap conventions" },
      "Borders & Shadows": { storyFile: "...", documents: "Border tokens, radius scale, shadow definitions" }
    },
    establishes: ["color palette", "spacing scale", "typography scale", "icon conventions", "radius scale", "shadow definitions"]
  },
  "Components": {
    purpose: "Reusable atomic and molecular UI elements built on Foundations",
    stories: {
      "Buttons": { storyFile: "...", componentSource: "...", props: {...}, classes: {...} },
      "Inputs": { storyFile: "...", componentSource: "...", props: {...}, classes: {...} },
      "Cards": { storyFile: "...", componentSource: "...", props: {...}, classes: {...} },
      "Tabs": { storyFile: "...", componentSource: "...", props: {...}, classes: {...} },
      "Badges": { storyFile: "...", componentSource: "...", props: {...}, classes: {...} },
      "Skeleton Loaders": { storyFile: "...", componentSource: "...", props: {...}, classes: {...} }
    },
    establishes: ["button variants", "input patterns", "card structure", "tab conventions", "badge styles", "loading skeletons"]
  },
  "Widget Garage": {
    purpose: "Composed widgets that combine Components into higher-order patterns",
    stories: {
      "MetricCard": { storyFile: "...", componentSource: "...", props: {...}, classes: {...}, subComponents: [...] },
      "BlueprintCard": { storyFile: "...", componentSource: "...", props: {...}, classes: {...}, subComponents: [...] },
      "SideNav": { storyFile: "...", componentSource: "...", props: {...}, classes: {...}, subComponents: [...] },
      // ... all Widget Garage entries
    },
    establishes: ["widget composition patterns", "data display conventions", "navigation patterns", "dashboard building blocks"]
  },
  "Page Examples": {
    purpose: "Full-page layouts showing how Widgets and Components compose into screens",
    stories: {
      "Card Grid": { storyFile: "...", layoutPatterns: ["grid", "responsive columns", "gap patterns"] },
      "Table Page": { storyFile: "...", layoutPatterns: ["table structure", "header/body/footer", "pagination"] },
      "Detail Page": { storyFile: "...", layoutPatterns: ["sidebar + content", "breadcrumbs", "sections"] },
      "Workspace": { storyFile: "...", layoutPatterns: ["multi-panel", "resizable", "tab-driven"] },
      "Activity Timeline": { storyFile: "...", layoutPatterns: ["vertical list", "timestamps", "grouping"] }
    },
    establishes: ["page layout conventions", "grid systems", "responsive patterns", "page-level spacing"]
  }
}
```

**Section detection logic:**
1. Parse the `title` field from each story's meta (e.g., `title: 'Widget Garage/MetricCard'` → section = `Widget Garage`)
2. Group all stories under their detected section
3. If a section name doesn't match the known sections above, create a new section entry with `purpose: "Custom section — review contents"`
4. For Foundations stories: extract the design primitives they document (color swatches, spacing demo values, etc.)
5. For Components/Widget Garage stories: use the full StorybookLookup entry (classes, props, icons, etc.)
6. For Page Examples: focus on layout patterns, grid structures, and how widgets are composed into pages

This map lets downstream skills understand **what layer of the design system** each component belongs to and what conventions each layer establishes.

### 3f. Build the Storybook Style Reference

After parsing all Storybook components, build a **style reference** that captures the established patterns across every element type:

```
Storybook Style Reference (derived from actual story + component code):

  Background patterns:
    - Page backgrounds: bg-bg-page (#111827)
    - Container backgrounds: bg-bg-default, bg-bg-elevated
    - Interactive hover: hover:bg-bg-elevated
    - Status: bg-status-critical-bg, bg-status-success-bg, bg-status-warning-bg

  Text patterns:
    - Headers: text-tx-header, text-tx-strong
    - Body: text-tx-primary, text-tx-weak
    - Status: text-status-critical-text, text-status-success-text
    - Interactive: text-tx-primary (links, actions)

  Border patterns:
    - Default borders: border-bd-default
    - Subtle: border-bd-weak
    - Interactive hover: hover:border-bd-primary

  Spacing patterns:
    - Widget containers: p-5, p-4 (inner padding)
    - Page wrappers: p-8
    - Child gaps: gap-1, gap-3, space-y-2
    - Nav items: py-2 px-3

  Layout patterns:
    - Cards: flex flex-col, rounded-xl, shadow-sm
    - Pages: min-h-screen bg-bg-page
    - Centering: flex items-center justify-center
    - Grids: grid grid-cols-2 gap-4

  Typography patterns:
    - Headings: text-2xl font-bold, text-lg font-semibold
    - Labels: text-sm font-medium
    - Captions: text-xs text-tx-weak

  Icon patterns:
    - Standard size: w-4 h-4 (small), w-5 h-5 (medium)
    - Color: inherits from parent text color
    - Source: lucide-react

  Radius patterns:
    - Cards/panels: rounded-xl
    - Buttons/inputs: rounded-lg, rounded-md
    - Badges/tags: rounded-full

  Transition patterns:
    - Color transitions: transition-colors
    - All transitions: transition-all
    - Duration: duration-200
```

This reference is the **ground truth** — it's what Storybook says the design system looks like in practice. Downstream skills use it to verify that new or migrated code matches these established patterns.

If NO story files found, report: "No Storybook stories detected. This codebase has
stories to be written. Run `ux-story-writer` to start populating the design system."

---

## Step 4: Detect Storybook Configuration

Check for `.storybook/` directory at the repo root. Report:
- `.storybook/main.ts` exists? (Storybook is configured)
- `.storybook/preview.ts` exists? (Global decorators set up)
- `.storybook/theme.ts` exists? (Custom theme applied)
- `package.json` has `storybook` script? (Can run Storybook)

---

## Step 5: Output the Context

Present the loaded context in this structure:

```
## UX Harness Context

### Design System Tokens
- File: [path]
- Validation: [PASS / WARN / FAIL — summary]
- Colors:
  - background: [list semantic variant names] (e.g., default, primary, critical, success...)
  - text: [list semantic variant names]
  - border: [list semantic variant names]
  - icon: [list semantic variant names]
  - dataType: [list entity names] (e.g., customer, vehicle, purchase, starData)
  - brand: [list names]
- Spacing: [named scale, e.g., none → xs → sm → md → lg → xl → 2xl → 3xl → 4xl]
- Radius: [named scale, e.g., none → sm → md → lg → xl → 2xl → round]
- Typography: heading (3xl–sm), label (lg–sm), body (lg–sm), fonts: [sans, mono]
- Shadows: [list names]
- Transitions: [fast, base, slow]
- Z-Index: [list layers]

### Storybook Section Map
High-level organizational structure — what each section establishes:

#### Foundations ([N] stories)
- Purpose: Design primitives — color palette, typography scale, icon conventions, spacing scale, borders & shadows
- Establishes: [list of design primitives this section documents]
- Stories: [list each Foundation story and what it documents]

#### Components ([N] stories)
- Purpose: Reusable atomic/molecular UI elements built on Foundations
- Establishes: [list of component patterns — button variants, input patterns, card structures, etc.]
- Components: [list each with source path, props summary, class categories]

#### Widget Garage ([N] stories)
- Purpose: Composed widgets combining Components into higher-order patterns
- Establishes: [list of widget patterns — data display, navigation, dashboard blocks, etc.]
- Widgets: [list each with source path, props summary, sub-components, class categories]

#### Page Examples ([N] stories)
- Purpose: Full-page layouts showing how Widgets and Components compose into screens
- Establishes: [list of layout conventions — grid systems, responsive patterns, page spacing]
- Pages: [list each with layout patterns used]

### Storybook Lookup Table
For each component in Storybook, listed by section:

**Foundations:**
- [Name] — story: `[story file]` — what it documents

**Components:**
- [ComponentName] — `[source path]` — props: `{ [full interface] }`
  - Stories: [list]
  - Classes: bg=[list], text=[list], border=[list], spacing=[list], layout=[list], radius=[list]
  - Icons: [lucide imports] sized [pattern]
  - Keywords: [list]

**Widget Garage:**
- [ComponentName] — `[source path]` — props: `{ [full interface] }`
  - Stories: [list]
  - Classes: bg=[list], text=[list], border=[list], spacing=[list], layout=[list], radius=[list]
  - Icons: [lucide imports] sized [pattern]
  - Sub-components: [list]
  - Keywords: [list]

**Page Examples:**
- [PageName] — story: `[story file]` — layout patterns used

### Storybook Style Reference
- Backgrounds: [classes observed across all stories]
- Text: [classes observed across all stories]
- Borders: [classes observed across all stories]
- Spacing: [classes observed across all stories]
- Layout: [classes observed across all stories]
- Typography: [classes observed across all stories]
- Icons: [lucide icons used, sizing pattern]
- Radius: [classes observed across all stories]
- Transitions: [classes observed across all stories]

### Storybook Status
- Configuration: [yes/no]
- Custom theme: [yes/no]
- Total stories: [count]

### Gaps
- [Any missing pieces noted during detection]
```

---

## Rules Reminder

When another `ux-` skill calls `ux-prime`, append these rules to the context
so the calling skill has them available:

1. One responsibility per file. 150-line soft cap, 200-line hard cap. Design system file exempt.
2. Tailwind only. No arbitrary values. Use semantic token classes (`bg-background-primary`) not raw Tailwind (`bg-blue-500`) or hex escapes (`bg-[#0284c7]`).
3. Componentize everything. If a JSX block has a conditional, it's probably a component.
4. Strong types. No `any` in business logic. Boundary `any` narrowed within 3 lines.
5. Component → Hook → Service → API. No skipping layers.
6. Design system file first. Read tokens before writing any component. Use semantic classes only.
7. TDD everywhere. Tests before implementation for new code.
8. Reduce, reuse, recycle. Search Storybook before creating anything new.
