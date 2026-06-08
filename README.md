# Developer of Tomorrow: Mastering AI in Your Technical Workflow

A free, interactive online course teaching technical professionals how to effectively integrate AI into their daily workflows.

**Live course**: [Visit the course](https://developer-of-tomorrow.onrender.com)

## About This Project

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

## AI-Assisted Development Approach

This entire project was built using a structured AI-assisted workflow that demonstrates prompt engineering principles in practice. The approach leverages multiple specialized AI agents working in concert to transform ideas into production code.

### Three-Phase Development Strategy

#### Phase 1: Ideation and Project Definition

- **Agent**: Thinking AI (extended reasoning)
- **Process**: Collaborate with an AI model using extended thinking to fully explore and develop the project concept
- **Output**: Comprehensive markdown document describing the complete project, architecture, content structure, and implementation requirements
- **Value**: Ensures conceptual clarity and comprehensive requirements before development begins

#### Phase 2: Architecture Planning

- **Agent**: Architecture Agent
- **Process**: Feed the project definition markdown into a specialized architecture agent that designs the complete technical and content structure
- **Output**: Series of detailed markdown files, each serving as specific instructions for implementation tasks
- **Value**: Transforms high-level concepts into concrete, actionable development plans with clear success criteria

#### Phase 3: Implementation

- **Agent**: Multi-Agent Orchestrator
- **Process**: Use an orchestrator agent to delegate work to specialized implementation agents (code generation, testing, documentation, etc.)
- **Agents Used**:
  - Code generation agents for writing actual code
  - Test architecture specialists for creating test suites
  - Documentation writers for creating README files and inline comments
  - Code reviewers for ensuring quality standards
  - Security auditors for vulnerability detection
  - Performance optimizers for efficiency
- **Output**: Complete, tested, documented implementation
- **Value**: Enables parallel work streams and leverages specialized AI expertise for different aspects of development

### Why This Approach Works

1. **Separation of Concerns**: Each phase has a clear purpose and output
2. **Quality Control**: Specialized agents bring expertise to specific domains
3. **Efficiency**: Parallel work across multiple agents accelerates development
4. **Auditability**: Clear handoff points between phases make the process transparent
5. **Scalability**: Can handle projects of varying complexity by adding more specialized agents

### Key Principles

- **Explicit Instructions**: Each phase produces clear, written instructions rather than relying on implicit understanding
- **Iterative Refinement**: Agents can be re-run with refined instructions if output doesn't meet expectations
- **Human Oversight**: Developers review and approve output at each phase before moving forward
- **Best-in-Class Tools**: Uses Claude AI models with extended thinking, tool use, and multi-agent capabilities

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

## Documentation

For detailed information, see:

- **[Full Course Documentation](./docs/README.md)** - Complete overview of the course structure, content, and philosophy
- **[Tech Stack Details](./docs/TECH_STACK.md)** - In-depth technical architecture and setup
- **[Course Outline](./docs/COURSE_OUTLINE.md)** - All 23 modules and learning objectives
- **[Site Structure](./docs/SITE_STRUCTURE.md)** - Project file organization and conventions
- **[Capstone Project](./docs/CAPSTONE.md)** - Capstone project overview and requirements

## Course Structure

The course spans **23 modules** across **4 parts**, totaling approximately **35 hours of instruction** plus capstone project time. See the [full course outline](./docs/COURSE_OUTLINE.md) for details.

## Key Features

- **Progress Tracking** - Browser-based progress stored in localStorage
- **Interactive Quizzes** - Multiple-choice and code-completion questions with immediate feedback
- **Dark Mode** - System preference detection with manual toggle
- **Global Search** - Cmd/Ctrl+K search across all modules, headings, and content (powered by Fuse.js)
- **Responsive Design** - Mobile-first approach with touch-friendly interactions

## Deployment

### Render.com (Recommended)

1. Connect your GitHub repository to Render
2. Create a new **Static Site**
3. Configure build settings:
   - **Build Command**: `npm ci && npm run build`
   - **Publish Directory**: `dist`
4. Set environment variable: `NODE_VERSION=20`

See [Full Documentation](./docs/README.md#deployment) for alternative hosting options.

## Contributing

This is an open educational resource. We welcome contributions to:

- Fix bugs or improve existing content
- Add new topics or modules
- Improve accessibility and performance
- Enhance interactive components

See [CONTRIBUTING](./CONTRIBUTING.md) (coming soon) for contribution guidelines.

## License

- **Course Content**: [Creative Commons BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/)
  - Attribution required, non-commercial use only, must share alike
- **Code**: MIT License

## Acknowledgments

This course draws from the work of many researchers, educators, and practitioners in the AI/ML community, including:

- Anthropic, OpenAI, Google DeepMind documentation and research
- Academic papers cited throughout modules
- Open-source projects and community contributions

---

**Built with care for the developer community using AI-assisted development practices.**
