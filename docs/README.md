# Developer of Tomorrow: Mastering AI in Your Technical Workflow

A free, interactive online course teaching technical professionals how to effectively integrate AI into their daily workflows.

## Overview

This course is designed for engineers, analysts, and developers with real-world technical experience who want to:

- **Remove the mystery** around AI and understand how it actually works
- **Build confidence** integrating AI tools into their professional workflow
- **Master practical skills** from prompt engineering to building agentic systems
- **Develop critical judgment** about when and how to use AI responsibly

### Course Philosophy

- **AI is a power tool**: We teach safe, effective use including risks and limitations
- **Token prediction, not magic**: Modern LLMs are sophisticated pattern matchers, not rational thinkers
- **Honest about controversy**: We don't shy away from misalignment risks, safety concerns, or hype
- **Practical over theoretical**: Balance accessible rigor with hands-on application

## Tech Stack

| Technology       | Purpose                                             |
| ---------------- | --------------------------------------------------- |
| **Astro**        | Static site generation with islands architecture    |
| **MDX**          | Markdown with embedded React components             |
| **Tailwind CSS** | Utility-first styling with dark mode                |
| **React**        | Interactive components (quizzes, progress tracking) |
| **Mermaid**      | Diagrams as code                                    |

### Why This Stack?

1. **Zero runtime cost** - Pure static output for Render.com free tier
2. **Minimal JavaScript** - Only hydrates interactive islands (quizzes, progress)
3. **Content-first** - MDX lets authors focus on writing, not code
4. **Performance** - Target Lighthouse score >90, LCP <2.5s

## Project Structure

```
developer-of-tomorrow/
├── public/                    # Static assets
│   ├── fonts/                 # Inter, JetBrains Mono
│   └── images/                # Logos, module images
├── src/
│   ├── components/
│   │   ├── react/             # Interactive islands
│   │   ├── astro/             # Static components
│   │   └── mdx/               # MDX-specific components
│   ├── content/lessons/       # Course content (MDX)
│   ├── data/                  # JSON data files
│   ├── lib/                   # Utility functions
│   ├── pages/                 # Route pages
│   └── styles/                # Global CSS
├── astro.config.mjs
├── tailwind.config.mjs
└── package.json
```

## Quick Start

### Prerequisites

- Node.js 20+
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/your-org/developer-of-tomorrow.git
cd developer-of-tomorrow

# Install dependencies
npm install

# Start development server
npm run dev
```

The site will be available at `http://localhost:4321`

### Available Commands

| Command           | Description                      |
| ----------------- | -------------------------------- |
| `npm run dev`     | Start development server         |
| `npm run build`   | Build for production             |
| `npm run preview` | Preview production build locally |
| `npm run lint`    | Run ESLint                       |
| `npm run format`  | Format with Prettier             |

## Deployment

### Render.com (Recommended)

1. Connect your GitHub repository to Render
2. Create a new **Static Site**
3. Configure build settings:
   - **Build Command**: `npm ci && npm run build`
   - **Publish Directory**: `dist`
4. Set environment variable: `NODE_VERSION=20`

The included `render.yaml` provides infrastructure-as-code configuration:

```yaml
services:
  - type: web
    name: developer-of-tomorrow
    runtime: static
    buildCommand: npm ci && npm run build
    staticPublishPath: ./dist
    envVars:
      - key: NODE_VERSION
        value: 20
```

### Alternative Deployments

The static output works on any static hosting:

- **Vercel**: `npx vercel`
- **Netlify**: Drag `dist/` folder to Netlify dashboard
- **GitHub Pages**: Use GitHub Actions workflow
- **Cloudflare Pages**: Connect repository, set build command

## Course Structure

The course spans **23 modules** across **4 parts**, totaling approximately **35 hours of instruction** plus capstone project time.

### Part 1: Foundations (~7.5 hours)

Build essential CS and AI fundamentals

| Module                                   | Duration | Topics                             |
| ---------------------------------------- | -------- | ---------------------------------- |
| 1. Developer's Mental Model for AI       | 1h 15m   | AI as power tool, token prediction |
| 2. Data Structures for the AI Era        | 1h 30m   | Embeddings, vector spaces          |
| 3. Algorithms That Power AI              | 1h 30m   | Gradient descent, sampling         |
| 4. Networks, APIs, and AI Infrastructure | 1h 15m   | AI API patterns, streaming         |
| 5. Databases for AI                      | 1h 30m   | Vector databases, RAG              |
| 6. Security Fundamentals                 | 1h 15m   | Prompt injection, data privacy     |

### Part 2: AI/ML Deep Dive (~9.5 hours)

Understand how modern AI actually works

| Module                         | Duration | Topics                            |
| ------------------------------ | -------- | --------------------------------- |
| 7. Journey to Modern AI        | 1h 30m   | Perceptrons to transformers       |
| 8. The Transformer Revolution  | 2h       | Self-attention, scaling laws      |
| 9. Training, Fine-Tuning, RLHF | 1h 45m   | Pre-training, alignment           |
| 10. Tokens and Embeddings      | 1h 30m   | Tokenization, model internals     |
| 11. Diffusion and Multimodal   | 1h 30m   | Image generation, vision-language |
| 12. Reasoning and Frontiers    | 1h 30m   | Chain-of-Thought, MoE             |

### Part 3: Safe Use & Agentic Workflows (~10.5 hours)

Apply AI responsibly in real workflows

| Module                            | Duration | Topics                       |
| --------------------------------- | -------- | ---------------------------- |
| 13. Safe and Responsible AI Use   | 1h 45m   | Hallucination, bias, ethics  |
| 14. Prompt Engineering Mastery    | 2h       | CoT, CoV, Tree-of-Thoughts   |
| 15. AI Agents - Architecture      | 1h 45m   | Agent loop, memory, planning |
| 16. Tool Use and Function Calling | 1h 30m   | JSON schema, error handling  |
| 17. Multi-Agent Systems           | 1h 45m   | Orchestration, communication |
| 18. Framework Deep Dive           | 1h 30m   | LangChain, LlamaIndex        |
| 19. Workflow Integration          | 1h 30m   | Code review, documentation   |

### Part 4: Capstone & Advanced (~7.5 hours + project)

Synthesize learning into real projects

| Module                      | Duration | Topics                      |
| --------------------------- | -------- | --------------------------- |
| 20. Capstone Project        | 4-8h     | Hands-on project            |
| 21. Evaluating AI           | 1h 15m   | Benchmarks, LLM-as-judge    |
| 22. Local and Open Models   | 1h 15m   | Ollama, quantization        |
| 23. Future of AI and Career | 1h       | Trends, continuous learning |

## Features

### Progress Tracking

- Browser-based progress stored in localStorage
- Visual progress indicators on sidebar and cards
- Resume from last visited lesson

### Interactive Quizzes

- Multiple-choice and code-completion questions
- Immediate feedback with explanations
- Progress saved per module

### Dark Mode

- System preference detection
- Manual toggle with persistence
- Smooth transitions

### Search

- Cmd/Ctrl+K global search
- Searches titles, headings, and content
- Instant results with Fuse.js

### Responsive Design

- Mobile-first approach
- Collapsible sidebar navigation
- Touch-friendly interactions

## Content Guidelines

### Writing Style

- Professional but approachable
- Explain complex topics simply without condescension
- Use concrete examples and analogies
- Be honest about limitations and uncertainties

### Module Structure

Each module follows a consistent pattern:

1. **Learning Objectives** (3-5 bullet points)
2. **Engaging Introduction** with real-world relevance
3. **Core Content** broken into sections
4. **Diagrams** (Mermaid) for key concepts
5. **Knowledge Checks** (3-5 questions)
6. **Hands-on Exercise**
7. **Summary and Key Takeaways**
8. **References** to authoritative sources

### Code Examples

- Python for ML/AI code
- TypeScript for web development
- Always explain what code does
- Include expected outputs

## Contributing

### Adding Content

1. Create a new MDX file in `src/content/lessons/`
2. Use the frontmatter schema (see `src/content/config.ts`)
3. Import MDX components as needed
4. Add quiz data to `src/data/quizzes/`

### Component Development

1. React components go in `src/components/react/`
2. Use `client:` directives for hydration strategy
3. Follow existing TypeScript interfaces
4. Test on mobile and desktop

### Style Updates

1. Modify `tailwind.config.mjs` for design tokens
2. Update `src/styles/global.css` for utilities
3. Ensure dark mode compatibility
4. Test accessibility (4.5:1 contrast minimum)

## Accessibility

This course targets **WCAG 2.1 AA** compliance:

- Keyboard navigation for all interactive elements
- Screen reader compatible
- Color contrast 4.5:1 for text, 3:1 for UI
- Alt text for all images and diagrams
- Respects `prefers-reduced-motion`

## Performance Targets

| Metric                   | Target |
| ------------------------ | ------ |
| Lighthouse Performance   | >90    |
| First Contentful Paint   | <1.5s  |
| Largest Contentful Paint | <2.5s  |
| Cumulative Layout Shift  | <0.1   |
| Bundle Size              | <200KB |

## License

This course content is released under [Creative Commons BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/).

- **BY**: Attribution required
- **NC**: Non-commercial use only
- **SA**: Share-alike (derivatives must use same license)

The code (components, configuration) is released under the MIT License.

## Acknowledgments

This course draws from the work of many researchers, educators, and practitioners in the AI/ML community. Key references include:

- Anthropic, OpenAI, Google DeepMind documentation and research
- Academic papers cited throughout modules
- Open-source projects and community contributions

---

**Built with care for the developer community.**
