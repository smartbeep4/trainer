# Site Structure and UX Specification

This document defines the navigation, layout, and user experience patterns for the Developer of Tomorrow course platform.

---

## Design Philosophy

### Core Principles

1. **Content-first**: Every design decision supports learning; decoration is minimal
2. **Progressive disclosure**: Complex information revealed as needed
3. **Clear navigation**: Always know where you are and where to go next
4. **Consistent patterns**: Same interactions work the same way everywhere
5. **Accessible by default**: WCAG 2.1 AA compliant from the start

### Visual Identity

| Element          | Specification                                |
| ---------------- | -------------------------------------------- |
| Primary color    | Blue (#3b82f6) - trust, technology           |
| Accent color     | Orange (#ed7410) - warmth, attention         |
| Success color    | Green (#22c55e) - progress, completion       |
| Dark background  | Near-black (#0f0f10) - reduced eye strain    |
| Light background | White (#ffffff) - clean, professional        |
| Primary font     | Inter Variable - readable, modern            |
| Code font        | JetBrains Mono - developer-friendly          |
| Border radius    | 8px default, 12px cards, 16px modals         |
| Spacing scale    | 4px base unit (4, 8, 12, 16, 24, 32, 48, 64) |

---

## Site Map

```
/                           Homepage
├── /syllabus               Full course syllabus
├── /progress               Personal progress dashboard
├── /glossary               Technical terms glossary
├── /about                  About the course
└── /[part]/[module]/[lesson]   Dynamic lesson routes

Example lesson URL:
/foundations/developer-mental-model/ai-as-power-tool
```

---

## Page Layouts

### Homepage Layout

```
┌─────────────────────────────────────────────────────────────┐
│ Header                                              [Theme] │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│                    HERO SECTION                             │
│         Developer of Tomorrow                               │
│         Master AI in Your Technical Workflow                │
│         [Start Learning]  [View Syllabus]                   │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│                  COURSE STATS                               │
│     23 Modules  •  35+ Hours  •  Free Forever               │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│                  PART OVERVIEW                              │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌───────┐ │
│  │ Part 1      │ │ Part 2      │ │ Part 3      │ │Part 4 │ │
│  │ Foundations │ │ Deep Dive   │ │ Agentic     │ │Capston│ │
│  │ 6 modules   │ │ 6 modules   │ │ 7 modules   │ │4 mod  │ │
│  └─────────────┘ └─────────────┘ └─────────────┘ └───────┘ │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│                  TARGET AUDIENCE                            │
│  For engineers, analysts, and developers with...            │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│                  WHAT YOU'LL LEARN                          │
│  Feature cards with icons                                   │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│ Footer                                                      │
└─────────────────────────────────────────────────────────────┘
```

### Lesson Layout (Two-Column)

````
┌──────────────────────────────────────────────────────────────┐
│ Header                              [Search] [Progress] [Th] │
├────────────────────────┬─────────────────────────────────────┤
│                        │ ┌─────────────────────────────────┐ │
│ SIDEBAR                │ │ Breadcrumbs: Part > Module > L  │ │
│                        │ ├─────────────────────────────────┤ │
│ Part 1: Foundations    │ │                                 │ │
│ ├ Module 1 ✓           │ │ LESSON TITLE                    │ │
│ │ ├ Lesson 1 ✓         │ │                                 │ │
│ │ ├ Lesson 2 ✓         │ │ Time: 15 min | Difficulty: Int  │ │
│ │ └ Lesson 3 ●         │ │                                 │ │
│ ├ Module 2             │ │ ┌─────────────────────────────┐ │ │
│ │ ├ Lesson 1           │ │ │ Learning Objectives         │ │ │
│ │ ├ Lesson 2           │ │ │ • Objective 1               │ │ │
│ │ └ Lesson 3           │ │ │ • Objective 2               │ │ │
│ └ ...                  │ │ └─────────────────────────────┘ │ │
│                        │ │                                 │ │
│ Part 2: Deep Dive      │ │ CONTENT                         │ │
│ └ ...                  │ │                                 │ │
│                        │ │ Lorem ipsum dolor sit amet...   │ │
│ [Collapse ◀]           │ │                                 │ │
│                        │ │ ## Section Heading              │ │
│                        │ │                                 │ │
│                        │ │ More content...                 │ │
│                        │ │                                 │ │
│                        │ │ ┌─────────────────────────────┐ │ │
│                        │ │ │ 💡 TIP                       │ │ │
│                        │ │ │ Helpful information here     │ │ │
│                        │ │ └─────────────────────────────┘ │ │
│                        │ │                                 │ │
│                        │ │ ```python                       │ │
│                        │ │ # Code example                  │ │
│                        │ │ ```                             │ │
│                        │ │                                 │ │
│                        │ │ ┌─────────────────────────────┐ │ │
│                        │ │ │ MERMAID DIAGRAM             │ │ │
│                        │ │ └─────────────────────────────┘ │ │
│                        │ │                                 │ │
│                        │ │ ┌─────────────────────────────┐ │ │
│                        │ │ │ KNOWLEDGE CHECK              │ │ │
│                        │ │ │ Quiz component               │ │ │
│                        │ │ └─────────────────────────────┘ │ │
│                        │ │                                 │ │
│                        │ │ ┌─────────────────────────────┐ │ │
│                        │ │ │ [Mark Complete] [Next →]    │ │ │
│                        │ │ └─────────────────────────────┘ │ │
│                        │ │                                 │ │
│                        │ └─────────────────────────────────┘ │
├────────────────────────┴─────────────────────────────────────┤
│ Footer                                                       │
└──────────────────────────────────────────────────────────────┘
````

### Mobile Layout

```
┌──────────────────────┐
│ [☰] Header    [🔍][◐]│
├──────────────────────┤
│ Progress: 45%        │
│ [================---]│
├──────────────────────┤
│                      │
│ Breadcrumbs          │
│                      │
│ LESSON TITLE         │
│                      │
│ Time | Difficulty    │
│                      │
│ Learning Objectives  │
│ • Objective 1        │
│ • Objective 2        │
│                      │
│ CONTENT              │
│                      │
│ Lorem ipsum...       │
│                      │
│ [Mark Complete]      │
│                      │
│ ← Previous | Next →  │
│                      │
├──────────────────────┤
│ Footer               │
└──────────────────────┘

Mobile Menu (Slide-out):
┌──────────────────────┐
│ [✕] Course Menu      │
├──────────────────────┤
│ Progress Dashboard   │
│ Full Syllabus        │
│ ──────────────────── │
│ Part 1: Foundations  │
│   ├ Module 1 ✓       │
│   │ • Lesson 1 ✓     │
│   │ • Lesson 2 ●     │
│   └ Module 2         │
│     • Lesson 1       │
│ ──────────────────── │
│ Part 2: Deep Dive    │
│   ...                │
└──────────────────────┘
```

---

## Navigation Components

### Header

```tsx
<Header>
  <Logo /> // Links to homepage
  <NavLinks>
    <Link to="/syllabus">Syllabus</Link>
    <Link to="/progress">My Progress</Link>
  </NavLinks>
  <Actions>
    <SearchButton /> // Opens search modal (Cmd+K)
    <ThemeToggle /> // Light/Dark/System
    <MobileMenuButton /> // Mobile only
  </Actions>
</Header>
```

**Behavior**:

- Sticky on scroll (desktop)
- Collapses to hamburger on mobile (<768px)
- Search opens modal with Cmd/Ctrl+K

### Sidebar (Desktop)

```tsx
<Sidebar>
  <ProgressSummary>
    <CircularProgress value={45} />
    <Text>45% Complete</Text>
  </ProgressSummary>
  <CourseNav>
    {parts.map((part) => (
      <CollapsibleSection key={part.id} defaultOpen={isCurrentPart}>
        <PartHeader>{part.title}</PartHeader>
        {part.modules.map((module) => (
          <ModuleGroup key={module.id}>
            <ModuleTitle>{module.title}</ModuleTitle>
            {module.lessons.map((lesson) => (
              <LessonLink
                isCompleted={isCompleted(lesson)}
                isCurrent={isCurrent(lesson)}
              >
                {lesson.title}
              </LessonLink>
            ))}
          </ModuleGroup>
        ))}
      </CollapsibleSection>
    ))}
  </CourseNav>
  <CollapseToggle /> // Minimizes sidebar
</Sidebar>
```

**States**:

- ✓ Completed (green checkmark)
- ● Current (blue dot, bold text)
- ○ Not started (gray, lighter text)

**Behavior**:

- Collapsible sections with smooth animation
- Auto-scrolls to current lesson
- Collapse toggle minimizes to icons only
- Remembers state in localStorage

### Breadcrumbs

```
Part 1: Foundations > Module 1: Mental Model > Lesson 3: AI as Power Tool
```

Each segment is a clickable link. Truncates on mobile.

---

## Interactive Components

### Quiz Component

```tsx
<Quiz
  quizId="module-01-check-1"
  moduleSlug="developer-mental-model"
  questions={[
    {
      id: "q1",
      type: "multiple-choice",
      question: "What is the most accurate description of LLMs?",
      options: [
        { id: "a", text: "Databases of facts" },
        { id: "b", text: "Sophisticated token predictors" },
        { id: "c", text: "Human-like reasoners" },
        { id: "d", text: "Simple autocomplete" },
      ],
      correctAnswer: "b",
      explanation: "Modern LLMs predict the most likely next tokens...",
    },
  ]}
  passingScore={70}
/>
```

**States**:

1. **Unanswered**: Question displayed, options selectable
2. **Answered**: Selected option highlighted
3. **Submitted**: Correct/incorrect shown with explanation
4. **Completed**: Score summary, retry option if failed

**Behavior**:

- Progress saved to localStorage after each question
- Shows explanation after each answer
- Celebrates passing with confetti animation
- Allows retry with shuffled options

### Progress Tracker

```tsx
<ProgressTracker variant="header" />  // Compact progress bar
<ProgressTracker variant="sidebar" /> // Progress with stats
<ProgressTracker variant="dashboard" /> // Full progress page
```

**Data Structure** (localStorage):

```json
{
  "completedLessons": ["m01-l01", "m01-l02"],
  "completedModules": ["module-01"],
  "quizScores": {
    "module-01-check-1": 85,
    "module-01-check-2": 100
  },
  "lastVisited": "m01-l03",
  "startedAt": "2024-01-15T10:30:00Z",
  "totalTimeSpent": 120
}
```

### Theme Toggle

```tsx
<ThemeToggle initialTheme="system" />
```

**Options**:

- ☀️ Light
- 🌙 Dark
- 💻 System (follows OS preference)

**Behavior**:

- Instant switch with smooth transition
- Persists to localStorage
- No flash on page load (script in `<head>`)

### Search Modal

```tsx
<SearchModal /> // Triggered by Cmd+K
```

**Features**:

- Global keyboard shortcut
- Searches titles, headings, content
- Instant results as you type
- Keyboard navigation (↑↓ to select, Enter to go)
- Recent searches
- Filter by part/module

---

## Callout Components

### Tip

```astro
<Tip title="Pro Move">
  When prompting for code, always specify the language and version.
</Tip>
```

**Styling**: Green left border, green background tint, lightbulb icon

### Warning

```astro
<Warning title="Important">
  Never paste API keys directly into prompts.
</Warning>
```

**Styling**: Yellow/amber left border, amber background tint, alert icon

### Info

```astro
<Info>
  This concept will be explored in depth in Module 8.
</Info>
```

**Styling**: Blue left border, blue background tint, info icon

### Exercise

```astro
<Exercise title="Try It Yourself">
  1. Open your terminal
  2. Run the following command...
</Exercise>
```

**Styling**: Purple left border, purple background tint, collapsible, code icon

### Definition

```astro
<Definition term="Embedding">
  A dense vector representation of data that captures semantic meaning.
</Definition>
```

**Styling**: Gray border, term in bold, appears in glossary automatically

---

## Progress Dashboard

### Overview Section

```
┌─────────────────────────────────────────────────────────────┐
│ Your Progress                                               │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────────┐   Overall Progress                    │
│  │                  │                                       │
│  │      45%         │   12 of 23 modules completed          │
│  │                  │   48 of 80 lessons completed          │
│  │   ██████████░░░░ │   ~17.5 hours completed               │
│  │                  │                                       │
│  └──────────────────┘                                       │
│                                                             │
│  [Continue Learning: Module 3, Lesson 2 →]                  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Part Progress Cards

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  ┌─────────────────┐  ┌─────────────────┐                   │
│  │ Part 1         ✓│  │ Part 2          │                   │
│  │ Foundations     │  │ Deep Dive       │                   │
│  │ ██████████████  │  │ ████████░░░░░░  │                   │
│  │ 6/6 complete    │  │ 3/6 complete    │                   │
│  └─────────────────┘  └─────────────────┘                   │
│                                                             │
│  ┌─────────────────┐  ┌─────────────────┐                   │
│  │ Part 3          │  │ Part 4          │                   │
│  │ Agentic         │  │ Capstone        │                   │
│  │ ░░░░░░░░░░░░░░  │  │ ░░░░░░░░░░░░░░  │                   │
│  │ 0/7 complete    │  │ 0/4 complete    │                   │
│  └─────────────────┘  └─────────────────┘                   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Quiz Scores Section

```
┌─────────────────────────────────────────────────────────────┐
│ Quiz Performance                                            │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Module 1: Mental Model     ████████████████████  100%     │
│  Module 2: Data Structures  ██████████████░░░░░░   85%     │
│  Module 3: Algorithms       Not attempted yet              │
│  ...                                                        │
│                                                             │
│  Average Score: 92%                                         │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Responsive Breakpoints

| Breakpoint | Width       | Layout Changes                                        |
| ---------- | ----------- | ----------------------------------------------------- |
| Mobile     | <640px      | Single column, hamburger menu, stacked cards          |
| Tablet     | 640-1023px  | Single column, persistent header, collapsible sidebar |
| Desktop    | 1024-1279px | Two column, sidebar visible, compact header           |
| Large      | ≥1280px     | Two column, wider content area, full header           |

---

## Animation Guidelines

### Micro-interactions

- **Button hover**: Scale 1.02, 150ms ease-out
- **Card hover**: Shadow increase, border color change, 200ms
- **Checkbox**: Spring animation on check, 300ms
- **Sidebar collapse**: Width transition, 200ms ease-in-out

### Page Transitions

- **Route change**: Fade in, 150ms
- **Modal open**: Scale from 0.95, fade in, 200ms
- **Modal close**: Scale to 0.95, fade out, 150ms

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Accessibility Checklist

### Keyboard Navigation

- [ ] All interactive elements focusable
- [ ] Visible focus indicators
- [ ] Logical tab order
- [ ] Skip link to main content
- [ ] Escape closes modals
- [ ] Arrow keys navigate menus

### Screen Readers

- [ ] Semantic HTML structure
- [ ] ARIA labels for icons/buttons
- [ ] Live regions for dynamic content
- [ ] Alt text for all images
- [ ] Diagram descriptions in prose

### Visual

- [ ] 4.5:1 contrast for text
- [ ] 3:1 contrast for UI elements
- [ ] Don't rely on color alone
- [ ] Resize to 200% without loss
- [ ] 44px minimum touch targets (mobile)

---

## SEO and Meta

### Page Title Format

```
{Lesson Title} | {Module Title} | Developer of Tomorrow
```

### Meta Tags

```html
<meta name="description" content="{lesson.description}" />
<meta property="og:title" content="{title}" />
<meta property="og:description" content="{description}" />
<meta property="og:image" content="/og-image.png" />
<meta property="og:type" content="article" />
<meta name="twitter:card" content="summary_large_image" />
```

### Structured Data

```json
{
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "Developer of Tomorrow: Mastering AI in Your Technical Workflow",
  "description": "A free course for technical professionals...",
  "provider": {
    "@type": "Organization",
    "name": "Developer of Tomorrow"
  },
  "hasCourseInstance": {
    "@type": "CourseInstance",
    "courseMode": "online",
    "courseWorkload": "PT35H"
  }
}
```

---

## Performance Requirements

### Core Web Vitals Targets

| Metric | Target | Measurement              |
| ------ | ------ | ------------------------ |
| LCP    | <2.5s  | Largest Contentful Paint |
| FID    | <100ms | First Input Delay        |
| CLS    | <0.1   | Cumulative Layout Shift  |
| TTFB   | <800ms | Time to First Byte       |

### Asset Loading Strategy

1. **Critical CSS**: Inlined in `<head>`
2. **Fonts**: Preloaded, WOFF2 format, display: swap
3. **Images**: Lazy loaded, srcset for responsive
4. **JavaScript**: Deferred, split by route
5. **Search index**: Loaded on-demand when modal opens

### Caching Strategy

```
/assets/*     max-age=31536000, immutable
/*.js         max-age=31536000, immutable (hashed filenames)
/*.css        max-age=31536000, immutable (hashed filenames)
/*.html       max-age=0, must-revalidate
/api/*        max-age=3600
```

---

## Error States

### 404 Page

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│                       🔍                                    │
│                                                             │
│              Page Not Found                                 │
│                                                             │
│     The lesson you're looking for doesn't exist.           │
│     It may have been moved or renamed.                     │
│                                                             │
│     [Go to Homepage]  [Browse Syllabus]                    │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Empty Progress State

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│                       🚀                                    │
│                                                             │
│              Ready to Begin?                                │
│                                                             │
│     You haven't started any lessons yet.                   │
│     Let's change that!                                      │
│                                                             │
│     [Start with Module 1]                                   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Quiz Error State

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│              ⚠️ Quiz Unavailable                            │
│                                                             │
│     We couldn't load the quiz questions.                   │
│     This might be a temporary issue.                       │
│                                                             │
│     [Try Again]  [Skip for Now]                            │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Implementation Priority

### Phase 1: Core Navigation

1. Header with logo, nav links, theme toggle
2. Basic page layouts (homepage, lesson)
3. Routing structure
4. Footer

### Phase 2: Lesson Experience

1. Sidebar with progress indicators
2. Breadcrumbs
3. Lesson content rendering
4. Next/previous navigation
5. Mark complete functionality

### Phase 3: Interactivity

1. Quiz component
2. Progress tracking (localStorage)
3. Search modal
4. Theme persistence

### Phase 4: Polish

1. Animations and transitions
2. Mobile responsive refinement
3. Error states
4. Loading states
5. Accessibility audit

---

This specification provides the foundation for building a cohesive, delightful learning experience that mirrors the UX quality of platforms like Udemy while maintaining the simplicity of a static site.
