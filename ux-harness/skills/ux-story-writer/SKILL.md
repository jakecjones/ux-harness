---
name: ux-story-writer
description: >
  Generate a Storybook story file for a component being promoted to the design system.
  Reads the component's props interface and JSDoc comments, determines the correct
  Storybook section (Components for atomic elements, Widget Garage for composed
  patterns, Page Examples for layouts), and generates a .stories.tsx file with
  Default, Variants, and edge-state stories (Empty/Error/Disabled). The section
  determines the meta.title prefix (e.g., `title: 'Components/Button'` or
  `title: 'Widget Garage/MetricCard'`). Follows the UX Harness story convention:
  autodocs tag, typed argTypes, controls for every prop. Works on any React/Tailwind
  frontend codebase with Storybook. Triggers on: "add to storybook", "write a
  story", "ux-story-writer", "promote this component", "create a story for", or
  called automatically by ux-component-builder.
argument-hint: "[component-path or component-name]"
---

# UX Story Writer

Generate a Storybook story file that promotes a component into Storybook.

**Announce at start:** "Writing Storybook story for component promotion..."

---

## Step 1: Load Context

Run `ux-prime` to load:
- Current Storybook inventory (to avoid duplicate stories)
- Design system tokens (for any token-aware story examples)

---

## Step 2: Read the Component

Read the target component file completely. Extract:

1. **Component name** — from the export
2. **Props interface** — all properties with types and JSDoc comments
3. **Import path** — where the component lives (for the story import)
4. **Default prop values** — any defaults in the destructured params
5. **Composition depth** — does it import other components?
   - Imports 0 custom components → atomic element
   - Imports 1-3 custom components → composed pattern
   - Imports 4+ custom components or manages state → complex widget or page layout

If the component has a separate `.types.ts` file, read that too.

🛑 **PROGRESSIVE DISCLOSURE GATE:** Present the extracted component info and proposed section to the user before drafting the story. "Detected Button as a Components-level element with 4 props (variant, size, disabled, children). Will draft story for `src/stories/design-system/components/Button.stories.tsx` — you'll review before it's written."

---

## Step 3: Determine Storybook Section

Based on composition depth and purpose from Step 2:

| Section | Criteria | Example | meta.title prefix |
|---------|----------|---------|--------------------|
| Components | Atomic/molecular UI element, reusable primitive | Button, Badge, Input, Card, Tabs | `Components/Button` |
| Widget Garage | Composed widget combining multiple components | MetricCard, BlueprintCard, SideNav | `Widget Garage/MetricCard` |
| Page Examples | Full page layout showing composition patterns | CardGridPage, TablePage, DetailPage | `Page Examples/Card Grid` |

**Note:** Foundations (Colors, Typography, Icons, Spacing, Borders & Shadows) documents design primitives — don't place extracted components there.

The section determines the story file location:
- `src/stories/design-system/components/ComponentName.stories.tsx`
- `src/stories/design-system/widget-garage/ComponentName.stories.tsx`
- `src/stories/design-system/page-examples/ComponentName.stories.tsx`

---

## Step 4: Draft the Story File (DO NOT WRITE YET)

**Draft the story in context only. Do NOT write it to disk until the user approves in Step 5.**

Follow this template exactly. Adapt for the specific component's props.

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { ComponentName } from '@components/[path]/ComponentName';

const meta: Meta<typeof ComponentName> = {
  title: '[Tier]/ComponentName',
  component: ComponentName,
  tags: ['autodocs'],
  argTypes: {
    // One entry per prop from the interface
    // Use 'select' for union types
    // Use 'boolean' for boolean props
    // Use 'text' for string props
    // Use 'number' for number props
    // Use 'object' for complex props (with sensible default)
    // Include description from JSDoc comment
  },
  args: {
    // Default args that apply to all stories
    // Use the component's own default values
  },
};

export default meta;
type Story = StoryObj<typeof ComponentName>;

/** Default state — the most common usage with sensible props */
export const Default: Story = {
  args: {
    // Minimal props for the most common use case
  },
};

/** All visual variants side by side */
export const Variants: Story = {
  render: () => (
    // Render all meaningful visual variations in a flex row/grid
    // Use semantic Tailwind classes only: bg-background-*, text-text-*, border-border-*
    // Use named spacing: gap-sm, gap-md, p-lg — never numeric (gap-2, p-4)
    // Example wrapper: <div className="flex gap-lg p-xl bg-background-default">
  ),
};

/** Empty state — what it looks like with no data */
export const Empty: Story = {
  args: {
    // Props that trigger the empty state
  },
};

/** Error state — what it looks like when something goes wrong */
export const Error: Story = {
  args: {
    // Props that trigger the error state
  },
};

/** Disabled state — if the component supports it */
export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
```

---

## Story Generation Rules

### Required stories (every component gets these):

| Story | When to include |
|-------|-----------------|
| `Default` | Always — the first thing anyone sees |
| `Variants` | Always — shows all visual modes side by side |

### Conditional stories (include when applicable):

| Story | When to include |
|-------|-----------------|
| `Empty` | Component can receive empty data (empty array, null, undefined) |
| `Error` | Component has an error prop or error state |
| `Disabled` | Component has a disabled prop |
| `Loading` | Component has a loading/skeleton state |

### argTypes rules:

- Every prop in the interface gets an argType entry
- Union type props (`'primary' | 'secondary'`) → `control: 'select'`
- Boolean props → `control: 'boolean'`
- String props → `control: 'text'`
- Number props → `control: 'number'`
- Callback props (`onClick`, `onChange`) → `action: 'clicked'` / `action: 'changed'`
- Complex object props → `control: 'object'` with a sensible default
- Every argType includes a `description` from the JSDoc comment

### File rules:

- Story file must be under 150 lines (the standard applies here too)
- Use only semantic Tailwind classes in story render functions — `bg-background-default` not `bg-gray-100`, `gap-lg` not `gap-4`
- No raw Tailwind color classes (`bg-blue-500`, `text-gray-600`) — use semantic token classes only
- Import the component from its actual location using `@` aliases
- `tags: ['autodocs']` is mandatory — this enables auto-generated docs

---

## Step 5: Human Approval Gate

🛑 **HARD GATE: Nothing gets written to Storybook without explicit human approval.**

Present the full drafted story to the user:

```
📝 Story draft for [ComponentName] ([Tier]):

File: src/stories/[Tier]/ComponentName.stories.tsx
Stories: Default, Variants, [Empty], [Error], [Disabled], [Loading]
Props covered: [list all props with argTypes]

[Show the complete story code]

Write this to Storybook? (yes / no / edit)
```

- **"yes"** → Write the file to disk. Proceed to Step 6.
- **"no"** → Do NOT write. Report "Story draft discarded — not added to Storybook." and stop.
- **"edit"** or any feedback → Revise the draft based on feedback. Present again. Do NOT write until the user says "yes."

**For the LLM:** This is a behavioral guardrail — you MUST wait for explicit approval. Do NOT auto-write. Do NOT assume approval from silence. Do NOT skip this gate even if called by another skill (ux-component-builder, ux-swarm, ux-migrate). The user always gets final say on what enters Storybook.

---

## Step 6: Verify

**Evidence before claims.** After writing the story:

1. Check that the story file is under 150 lines — run `wc -l`, read the output
2. Check that the section is correct (Components / Widget Garage / Page Examples)
3. Check that all props have argTypes — compare prop count vs argType count
4. Check that Default and Variants stories exist
5. Confirm the file is in the correct `src/stories/design-system/[section]/` directory

---

## Step 7: Report

Tell the user what was created:

```
Promoted [ComponentName] to Storybook as a [Tier].

Created: src/stories/[Tier]/ComponentName.stories.tsx
Stories: Default, Variants, [Empty], [Error], [Disabled], [Loading]
Props covered: [list all props with argTypes]

Run `npm run storybook` to see it in the design system.
```
