---
name: ux-component-builder
description: >
  Scaffold a new component following the UX Harness standard. Calls ux-prime first
  to search Storybook for existing components (reduce, reuse, recycle). If a new
  component is needed, scaffolds: test file FIRST (TDD), component file (150-line
  cap, Tailwind only, strong types), types file, and hook for business logic. All
  files reference design system tokens. Optionally promotes to Storybook via
  ux-story-writer. Works on any React/Tailwind frontend codebase. Triggers on:
  "build a component", "create a component", "scaffold a component", "new component",
  "ux-component-builder", or any request to create UI elements.
argument-hint: "[component-name or description]"
---

# UX Component Builder

Scaffold a new component following every UX Harness rule. Test first, build second,
reuse always.

**Announce at start:** "Building component with UX Harness standard..."

---

## Step 1: Load Context

Run `ux-prime` to load:
- Design system tokens (colors, spacing, typography, etc.)
- Storybook inventory (existing components by tier)
- The 8 engineering rules

---

## Step 2: Search Before Create (Rule 8)

Before writing ANY code, search Storybook using these concrete strategies:

### 2a: Name match
Search story file names and component titles for the requested component name
or synonyms (e.g., "card" also matches "tile", "panel").

### 2b: Prop shape match
If the user described what the component should accept (e.g., "a card with a title
and a metric value"), search existing component argTypes for matching prop shapes.

### 2c: Tier scan
Scan the appropriate tier based on the request:
- Simple UI element → search Components section
- Composed widget → search Widget Garage section
- Page layout → search Page Examples section

### 2d: Keyword search in JSDoc
Search component JSDoc comments and story descriptions for keywords from the request.

## 🔀 [ROUTER] Reuse Decision

**Based on search results, select EXACTLY ONE path.**

- [ ] **Path A: Exact match** — An existing Storybook component does exactly what's needed → *Use it. Report the import path and stop.*
- [ ] **Path B: Partial match** — An existing component covers 80%+ of the need → *Recommend extending or composing with it. Present the gap to the user.*
- [ ] **Path C: No match** — Nothing in Storybook fits → *Proceed to scaffold a new component.*

🛑 **PROGRESSIVE DISCLOSURE GATE:** Present search results and your recommendation to the user before proceeding. Wait for confirmation.

```
Storybook search results:
  ✓ Found MetricsCard (Widget Garage) — similar prop shape, but missing trend indicator
  ✗ No exact match

Recommendation: Extend MetricsCard with a trend prop, or scaffold a new TrendCard.
Your call — extend or build new?
```

---

## Step 3: SLC Checkpoint

Before scaffolding, ask yourself: **Is this the simplest version that's complete?**

- Do we need a hook, or is this purely presentational?
- Do we need a types file, or do the props fit in 5 lines?
- Do we need all the states (empty, error, disabled), or is this a simple atom?

**Don't gold-plate.** Build what's needed now. Extend later when the need is real.

---

## Step 4: Determine Component Scope

1. **What Storybook section does this belong in?**
   - **Components** — A reusable atomic/molecular UI element (button, input, badge, card, tabs, skeleton loader)
   - **Widget Garage** — A composed widget that combines multiple components (MetricCard, BlueprintCard, SideNav)
   - **Page Examples** — A full page layout showing how widgets compose into screens (card grid, table page, detail page)

2. **Does it need business logic?**
   - Yes → Will need a custom hook (`useComponentName.ts`)
   - No → Component only, no hook

3. **Does it need API data?**
   - Yes → Will need a hook AND a service method
   - No → Component and optional hook only

4. **Does it need its own types file?**
   - Props interface has more than 5 properties → Yes, separate types file
   - Simple props → Inline in the component file is fine

---

## Step 5: Write the Test FIRST (Rule 7)

**Always write the test file before the component file.**

Create `ComponentName.test.tsx`:

```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ComponentName } from './ComponentName';

describe('ComponentName', () => {
  it('renders with default props', () => {
    render(<ComponentName />);
    // Assert the component renders its primary content
  });

  it('handles [primary interaction]', async () => {
    const user = userEvent.setup();
    const onAction = jest.fn();
    render(<ComponentName onAction={onAction} />);
    // Assert interaction behavior
  });

  it('renders empty state', () => {
    render(<ComponentName data={[]} />);
    // Assert empty state is shown
  });

  it('renders error state', () => {
    render(<ComponentName error="Something went wrong" />);
    // Assert error state is shown
  });
});
```

**Test rules:**
- Behavior tests only (Testing Library). Test what the user sees, not implementation.
- Every component gets: default render, primary interaction, empty state, error state.
- No snapshot tests unless explicitly requested.
- Tests must fail before the component is written. That's TDD.

**Run the tests. They must FAIL. If they pass, you're testing existing behavior — fix the test.**

---

## Step 6: Write the Types (Rule 4)

If the component needs a separate types file, create `ComponentName.types.ts`:

```typescript
export interface ComponentNameProps {
  /** Brief description of this prop */
  variant?: 'primary' | 'secondary' | 'ghost';
  /** Brief description of this prop */
  size?: 'sm' | 'md' | 'lg';
  /** Brief description of this prop */
  disabled?: boolean;
  /** Callback when [action] occurs */
  onAction?: () => void;
  /** Content to render inside the component */
  children: React.ReactNode;
}
```

**Type rules:**
- No `any`. Ever. In any file created by this skill.
- All props get JSDoc comments — these feed Storybook's autodocs.
- Use union types for variants, not `string`.
- Use `React.ReactNode` for children, not `any` or `string`.
- Export the interface — other components may extend it.

---

## Step 7: Write the Hook (Rule 5)

If business logic is needed, create `useComponentName.ts`:

```typescript
import { useState, useCallback } from 'react';
// import from service layer if API calls needed
// import { featureService } from '@services/featureService';

interface UseComponentNameReturn {
  // Typed return value — no any
}

export const useComponentName = (): UseComponentNameReturn => {
  // State, callbacks, effects — all business logic lives here
  // Component file only calls this hook, never contains logic directly
};
```

**Hook rules:**
- All state management lives in the hook, not the component.
- API calls go through a service module, not directly in the hook.
- Return type is explicitly typed — no inference for public APIs.
- Hook file must be under 150 lines. If it's longer, split the logic.

---

## Step 8: Write the Component (Rules 1, 2, 3, 6)

Create `ComponentName.tsx`:

```typescript
import { ComponentNameProps } from './ComponentName.types';
// import { useComponentName } from './useComponentName';

export const ComponentName: React.FC<ComponentNameProps> = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  onAction,
  children,
}) => {
  // const { ... } = useComponentName();

  return (
    <div className="flex items-center gap-sm rounded-md bg-background-default p-lg">
      {children}
    </div>
  );
};
```

**Component rules:**
- **≤150 lines.** If approaching 150, extract sub-components.
- **Tailwind only.** No `style={{}}`, no CSS imports. Only Tailwind classes from the design system.
- **Semantic token classes only.** Use `bg-background-primary` not `bg-[#0284c7]` or `bg-blue-500`. Use `text-text-weak` not `text-gray-500`. Every color class must come from the semantic token system.
- **No business logic.** Logic lives in hooks. Components just render and call hooks.
- **Sensible defaults.** Every prop should work without being passed if possible.
- **Composition over configuration.** If a component has more than 5 visual modes, break it into composed sub-components.
- **If a JSX block has a conditional, extract it.** `{isError ? <ErrorState /> : <Content />}` is fine. 10 lines of conditional JSX is not — make it a component.

---

## Step 9: Verify

**Evidence before claims.** Run these commands and read the output before claiming completion.

1. **Run the tests.** Execute the test command. Paste the output. Count passes/failures.
   - If any test fails → fix it. Do not proceed.
2. **Check line counts.** `wc -l` on every new file. All must be under 150 (200 hard cap).
3. **Check for `any`.** `grep -n ': any\|as any' [files]`. Must be zero.
4. **Check for arbitrary Tailwind values.** `grep -n 'bg-\[\|text-\[\|w-\[\|h-\[' [files]`. Must be zero.
5. **Check for non-semantic color classes.** `grep -n 'bg-blue-\|bg-red-\|bg-green-\|bg-gray-\|text-blue-\|text-red-\|text-green-\|text-gray-\|border-blue-\|border-red-\|border-gray-' [files]`. Must be zero — use semantic token classes instead.
6. **Verify the Component → Hook → Service chain.** No layer skipping.

🛑 **Do NOT claim "tests pass" without running them. Do NOT claim "no any types" without grepping. Evidence before assertions.**

---

## Step 10: Promote to Storybook (Optional — Requires Approval)

🛑 **HARD GATE: Do NOT auto-promote to Storybook. Ask the user first.**

```
Component [ComponentName] is ready. Should it be added to Storybook?
  - "yes" → I'll draft a story for your review (you'll approve before it's written)
  - "no" → Component stays page-specific, no story created
```

**Wait for explicit "yes" before calling `ux-story-writer`.** Do NOT assume. Do NOT auto-call.

If yes → Run `ux-story-writer`, which will draft the story and present it for a second approval before writing to disk. Two gates: one here (should we make a story?) and one in `ux-story-writer` (does this story look right?).

If no → Component is page-specific and doesn't need a story. Done.

---

## File Structure Summary

A complete component scaffold looks like:

```
src/components/[feature]/ComponentName/
  ComponentName.test.tsx      ← written FIRST
  ComponentName.types.ts      ← if props > 5 properties
  useComponentName.ts         ← if business logic needed
  ComponentName.tsx           ← written LAST
```

Or for Storybook components:

```
src/components/common/ComponentName/
  ComponentName.test.tsx
  ComponentName.types.ts
  useComponentName.ts
  ComponentName.tsx
src/stories/[Tier]/
  ComponentName.stories.tsx   ← via ux-story-writer
```
