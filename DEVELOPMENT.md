# Development Guide

This document covers the development workflow, architecture decisions, and Phase 1 framework details for the Developer of Tomorrow course platform.

## Phase 1 Framework Overview

Phase 1 delivers a fully deployable application framework with all infrastructure, components, layouts, and systems in place. This provides the scaffolding for Phase 2 content integration.

### What Phase 1 Includes

- Astro project configuration with React islands architecture
- Design system with Tailwind CSS and dark mode support
- Core layouts (BaseLayout, LessonLayout)
- Shared components (Header, Footer, Sidebar, Breadcrumbs, Table of Contents)
- React interactive components (Quiz, ProgressTracker, ThemeToggle, MobileMenu)
- MDX component library (Tip, Warning, Info, Exercise, Definition, CalloutBox)
- Content collections with Zod schema validation
- Progress tracking system (localStorage-based)
- Mermaid diagram support
- Module 1 as complete sample content
- Test suite (Vitest unit tests, Playwright E2E tests)
- Deployment configuration (render.yaml)

## Architecture

### Islands Architecture

The project uses Astro's islands architecture for optimal performance:

```
Page (Static HTML)
  |
  +-- Header
  |     +-- ThemeToggle (client:load)
  |     +-- MobileMenu (client:load)
  |
  +-- Content (Static MDX)
  |     +-- Quiz (client:visible)
  |
  +-- Sidebar
  |     +-- ProgressTracker (client:load)
  |
  +-- Footer (Static)
```

**Hydration Strategies:**

- `client:load` - Immediately hydrate (ThemeToggle, MobileMenu, ProgressTracker)
- `client:visible` - Hydrate when visible (Quiz, Mermaid diagrams)
- No directive - Static HTML only

### Directory Structure

```
src/
  components/
    astro/            # Static Astro components
      Header.astro
      Footer.astro
      Sidebar.astro
      Breadcrumbs.astro
      TableOfContents.astro
      LessonNavigation.astro
    react/            # Interactive React islands
      ThemeToggle.tsx
      MobileMenu.tsx
      ProgressTracker.tsx
      Quiz.tsx
    mdx/              # MDX content components
      Tip.astro
      Warning.astro
      Info.astro
      Exercise.astro
      Definition.astro
      CalloutBox.astro

  content/
    modules/          # MDX module content
      developer-mental-model.mdx
    config.ts         # Collection schema

  layouts/
    BaseLayout.astro  # HTML wrapper, meta, theme script
    LessonLayout.astro # Module page layout

  lib/
    course-data.ts    # Course structure, navigation
    progress.ts       # Progress tracking utilities
    theme.ts          # Theme management
    quiz.ts           # Quiz state management

  pages/
    index.astro       # Homepage
    progress.astro    # Progress dashboard
    404.astro         # Not found page
    module/
      [...slug].astro # Dynamic module routes

  styles/
    global.css        # Tailwind layers, custom utilities
```

### Data Flow

**Progress Tracking:**

```
User Action -> lib/progress.ts -> localStorage ("dot-progress")
                     |
                     v
              ProgressTracker.tsx (UI update)
```

**Theme Management:**

```
Page Load -> Inline Script (BaseLayout.astro) -> Apply theme (prevent FOUC)
                     |
                     v
              ThemeToggle.tsx -> localStorage ("dot-theme")
```

**Quiz State:**

```
Quiz Component -> lib/quiz.ts -> localStorage ("dot-quiz-{module}-{quiz}")
                      |
                      v
               lib/progress.ts (save score)
```

## Development Workflow

### Commands

```bash
# Development
npm run dev           # Start dev server at localhost:4321
npm run build         # Type check + build for production
npm run preview       # Preview production build locally

# Testing
npm run test          # Run Vitest unit tests
npm run test:e2e      # Run Playwright E2E tests
npm run test:ui       # Vitest with UI

# Code Quality
npm run lint          # Run ESLint
npm run format        # Format with Prettier
npm run check         # Astro type checking
```

### Adding a New Module

1. Create MDX file in `src/content/modules/{slug}.mdx`
2. Add frontmatter matching schema:

```mdx
---
title: "Module Title"
moduleNumber: 2
description: "Brief description"
duration: "1h 30m"
difficulty: "Intermediate"
part: 1
partTitle: "Foundations"
objectives:
  - "Objective 1"
  - "Objective 2"
prerequisites:
  - "Previous module"
quiz:
  id: "module-2-quiz"
  passingScore: 70
  questions:
    - id: "q1"
      type: "multiple-choice"
      question: "Question text?"
      options:
        - { id: "a", text: "Option A" }
        - { id: "b", text: "Option B" }
      correctAnswer: "a"
      explanation: "Why A is correct"
---

# Module Content

Your content here...
```

3. Update `src/lib/course-data.ts` to include the new module in the appropriate part.

### Creating Components

**Astro Component (Static):**

```astro
---
interface Props {
  title: string;
  variant?: "default" | "highlight";
}

const { title, variant = "default" } = Astro.props;
---

<div class:list={["base-class", { highlight: variant === "highlight" }]}>
  <h2>{title}</h2>
  <slot />
</div>
```

**React Island (Interactive):**

```tsx
import { useState } from "react";

interface MyComponentProps {
  initialValue: number;
}

export default function MyComponent({ initialValue }: MyComponentProps) {
  const [count, setCount] = useState(initialValue);

  return <button onClick={() => setCount((c) => c + 1)}>Count: {count}</button>;
}
```

Usage in Astro:

```astro
---
import MyComponent from "@/components/react/MyComponent";
---

<MyComponent client:visible initialValue={0} />
```

### MDX Components

MDX components are auto-imported via `src/content/config.ts`. Available components:

- `<Tip>` - Green callout for tips
- `<Warning>` - Amber callout for warnings
- `<Info>` - Blue callout for information
- `<Exercise>` - Purple callout for exercises
- `<Definition term="Term">` - Definition box
- `<CalloutBox type="tip|warning|info|exercise">` - Generic callout

## Testing

### Unit Tests (Vitest)

Tests are in `src/__tests__/`. Run with `npm run test`.

**Test Files:**

- `course-data.test.ts` - Course structure and navigation
- `progress.test.ts` - Progress tracking with localStorage mock
- `theme.test.ts` - Theme management
- `quiz.test.ts` - Quiz logic and scoring

**Testing localStorage:**

```typescript
let mockStore: Record<string, string> = {};

const localStorageMock = {
  getItem: vi.fn((key: string) => mockStore[key] || null),
  setItem: vi.fn((key: string, value: string) => {
    mockStore[key] = value;
  }),
  removeItem: vi.fn((key: string) => {
    delete mockStore[key];
  }),
  clear: vi.fn(() => {
    mockStore = {};
  }),
};

beforeEach(() => {
  mockStore = {};
  vi.clearAllMocks();
});
```

### E2E Tests (Playwright)

Tests are in `tests/e2e/`. Run with `npm run test:e2e`.

**Test Coverage:**

- Navigation (homepage, module pages, breadcrumbs)
- Dark mode toggle and persistence
- Quiz functionality
- Progress tracking
- Responsive design
- 404 page

## Deployment

### Render.com

The `render.yaml` file provides infrastructure-as-code deployment:

```yaml
services:
  - type: web
    name: developer-of-tomorrow
    runtime: static
    buildCommand: npm ci && npm run build
    staticPublishPath: ./dist
```

**Security Headers Configured:**

- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- X-XSS-Protection: 1; mode=block
- Referrer-Policy: strict-origin-when-cross-origin
- Permissions-Policy: Restrictive policy

**Caching:**

- Static assets: 1 year (immutable)
- HTML: no-cache (must-revalidate)

### Manual Deployment

```bash
npm ci
npm run build
# Upload dist/ to any static hosting
```

## Performance Considerations

### Bundle Size

The main JavaScript bundles:

- React runtime: ~44KB gzipped
- Mermaid (lazy-loaded): ~170KB gzipped per diagram type
- KaTeX (for math): ~78KB gzipped

### Optimization Strategies

1. **Lazy load Mermaid** - Only loads when diagrams are visible
2. **Code split by diagram type** - Each Mermaid diagram type is a separate chunk
3. **Prefetching** - Astro prefetches links on hover/viewport
4. **Static generation** - All pages are pre-rendered HTML

### Monitoring Bundle Size

```bash
npm run build
# Check dist/_astro/ for chunk sizes
```

## Troubleshooting

### Common Issues

**Build fails with "Cannot find module":**

- Check import paths use `@/` alias correctly
- Run `npm install` to ensure dependencies

**Tests fail with localStorage errors:**

- Ensure mock is set up before imports
- Reset mock store in `beforeEach`

**Dark mode flashes on load:**

- Theme script must be inline in `<head>` before any content
- Check `BaseLayout.astro` inline script is present

**MDX components not rendering:**

- Verify components are exported from `src/content/config.ts`
- Check component file exists in `src/components/mdx/`

## Phase 2 Planning

Phase 2 will focus on content integration:

1. Convert all 23 modules from Markdown to MDX
2. Create quiz data for each module
3. Add diagrams (Mermaid) where appropriate
4. Integrate math rendering (KaTeX) where needed
5. Add code examples with syntax highlighting
6. Implement search functionality
7. Add analytics (optional)

---

For more information, see the documentation in `/docs/`.
