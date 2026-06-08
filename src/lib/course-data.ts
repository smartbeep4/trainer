/**
 * Course structure data for navigation and progress tracking.
 *
 * ⚠️ DUPLICATION WARNING:
 * This file contains a hand-maintained copy of module metadata.
 * The source of truth is the MDX frontmatter in src/content/modules/*.mdx
 * (validated by the content collection schema in src/content/config.ts).
 *
 * When adding/editing modules:
 * 1. Update the MDX frontmatter first.
 * 2. Keep this file in sync (title, duration, difficulty, part, description).
 * 3. Run `npm run build` or `npm run check` — the duplication guard test
 *    + getStaticPaths will catch most mismatches at build time.
 *
 * Long-term: consider deriving this data at build time from the collection.
 */

export interface Module {
  id: number;
  slug: string;
  title: string;
  duration: string;
  difficulty:
    | "Beginner"
    | "Beginner-Intermediate"
    | "Intermediate"
    | "Intermediate-Advanced"
    | "Advanced";
  part: number;
  partTitle: string;
  description: string;
}

export interface Part {
  number: number;
  title: string;
  description: string;
  duration: string;
  modules: Module[];
}

export const parts: Part[] = [
  {
    number: 1,
    title: "Foundations",
    description: "Build essential computer science and AI fundamentals",
    duration: "~7.5 hours",
    modules: [
      {
        id: 1,
        slug: "developer-mental-model",
        title: "The Developer's Mental Model for AI",
        duration: "1h 15m",
        difficulty: "Beginner",
        part: 1,
        partTitle: "Foundations",
        description:
          "Understand AI as a sophisticated tool, not magic or replacement",
      },
      {
        id: 2,
        slug: "data-structures-ai-era",
        title: "Data Structures for the AI Era",
        duration: "1h 30m",
        difficulty: "Beginner",
        part: 1,
        partTitle: "Foundations",
        description:
          "How data structures underpin AI systems, embeddings as fundamental representation",
      },
      {
        id: 3,
        slug: "algorithms-ai-systems",
        title: "Algorithms That Power AI Systems",
        duration: "1h 30m",
        difficulty: "Beginner-Intermediate",
        part: 1,
        partTitle: "Foundations",
        description:
          "Gradient descent, search algorithms, and optimization in AI contexts",
      },
      {
        id: 4,
        slug: "networks-apis-ai-infrastructure",
        title: "Networks, APIs, and AI Infrastructure",
        duration: "1h 15m",
        difficulty: "Beginner",
        part: 1,
        partTitle: "Foundations",
        description:
          "How AI services are delivered, API patterns, local vs cloud",
      },
      {
        id: 5,
        slug: "databases-data-management-ai",
        title: "Databases and Data Management for AI",
        duration: "1h 30m",
        difficulty: "Intermediate",
        part: 1,
        partTitle: "Foundations",
        description:
          "Vector databases, RAG architecture, data pipelines for AI",
      },
      {
        id: 6,
        slug: "security-fundamentals-ai",
        title: "Security Fundamentals for AI Applications",
        duration: "1h 15m",
        difficulty: "Intermediate",
        part: 1,
        partTitle: "Foundations",
        description: "Prompt injection, API security, data privacy in AI",
      },
    ],
  },
  {
    number: 2,
    title: "AI/ML Deep Dive",
    description: "Understand how modern AI actually works",
    duration: "~9.5 hours",
    modules: [
      {
        id: 7,
        slug: "journey-to-modern-ai",
        title: "The Journey to Modern AI",
        duration: "1h 30m",
        difficulty: "Intermediate",
        part: 2,
        partTitle: "AI/ML Deep Dive",
        description:
          "From perceptrons to transformers, the history that matters",
      },
      {
        id: 8,
        slug: "transformer-revolution",
        title: "The Transformer Revolution",
        duration: "2h",
        difficulty: "Advanced",
        part: 2,
        partTitle: "AI/ML Deep Dive",
        description: "Attention mechanism, multi-head attention, scaling laws",
      },
      {
        id: 9,
        slug: "training-finetuning-rlhf",
        title: "Training, Fine-Tuning, and RLHF",
        duration: "1h 45m",
        difficulty: "Advanced",
        part: 2,
        partTitle: "AI/ML Deep Dive",
        description: "Pre-training, fine-tuning, RLHF, and alignment",
      },
      {
        id: 10,
        slug: "tokens-embeddings-internals",
        title: "Tokens, Embeddings, and Model Internals",
        duration: "1h 30m",
        difficulty: "Intermediate",
        part: 2,
        partTitle: "AI/ML Deep Dive",
        description: "How text becomes numbers, tokenization, embedding spaces",
      },
      {
        id: 11,
        slug: "diffusion-multimodal-ai",
        title: "Diffusion Models and Multimodal AI",
        duration: "1h 30m",
        difficulty: "Intermediate-Advanced",
        part: 2,
        partTitle: "AI/ML Deep Dive",
        description: "Image generation, vision-language models, unified AI",
      },
      {
        id: 12,
        slug: "reasoning-models-frontiers",
        title: "Reasoning Models and Current Frontiers",
        duration: "1h 30m",
        difficulty: "Advanced",
        part: 2,
        partTitle: "AI/ML Deep Dive",
        description: "Chain-of-Thought, reasoning models, active research",
      },
    ],
  },
  {
    number: 3,
    title: "Safe Use & Agentic Workflows",
    description: "Responsible application and advanced integration",
    duration: "~10.5 hours",
    modules: [
      {
        id: 13,
        slug: "safe-responsible-ai-use",
        title: "Safe and Responsible AI Use",
        duration: "1h 45m",
        difficulty: "Intermediate",
        part: 3,
        partTitle: "Safe Use & Agentic Workflows",
        description: "Safety considerations, risks, responsible development",
      },
      {
        id: 14,
        slug: "prompt-engineering-mastery",
        title: "Prompt Engineering Mastery",
        duration: "2h",
        difficulty: "Intermediate",
        part: 3,
        partTitle: "Safe Use & Agentic Workflows",
        description:
          "Advanced prompting techniques, CoT, CoV, Tree-of-Thoughts",
      },
      {
        id: 15,
        slug: "ai-agents-architecture",
        title: "AI Agents - Concepts and Architecture",
        duration: "1h 45m",
        difficulty: "Advanced",
        part: 3,
        partTitle: "Safe Use & Agentic Workflows",
        description: "Agent loop, planning, memory systems, observability",
      },
      {
        id: 16,
        slug: "tool-use-function-calling",
        title: "Tool Use and Function Calling",
        duration: "1h 30m",
        difficulty: "Intermediate",
        part: 3,
        partTitle: "Safe Use & Agentic Workflows",
        description: "Function calling, tool design, error handling",
      },
      {
        id: 17,
        slug: "multi-agent-orchestration",
        title: "Multi-Agent Systems and Orchestration",
        duration: "1h 45m",
        difficulty: "Advanced",
        part: 3,
        partTitle: "Safe Use & Agentic Workflows",
        description: "Multi-agent patterns, communication, orchestration",
      },
      {
        id: 18,
        slug: "framework-deep-dive",
        title: "Framework Deep Dive - LangChain and Alternatives",
        duration: "1h 30m",
        difficulty: "Intermediate",
        part: 3,
        partTitle: "Safe Use & Agentic Workflows",
        description: "LangChain, LangGraph, alternative frameworks",
      },
      {
        id: 19,
        slug: "real-world-workflow-integration",
        title: "Real-World Workflow Integration",
        duration: "1h 30m",
        difficulty: "Intermediate",
        part: 3,
        partTitle: "Safe Use & Agentic Workflows",
        description: "AI in developer workflows, code review, documentation",
      },
    ],
  },
  {
    number: 4,
    title: "Capstone & Advanced",
    description: "Synthesis and future directions",
    duration: "~7.5 hours + project",
    modules: [
      {
        id: 20,
        slug: "capstone-project",
        title: "Capstone Project",
        duration: "4-8h",
        difficulty: "Advanced",
        part: 4,
        partTitle: "Capstone & Advanced",
        description: "Build a production-ready AI-powered application",
      },
      {
        id: 21,
        slug: "advanced-evaluating-ai",
        title: "Advanced Topics - Evaluating and Benchmarking AI",
        duration: "1h 15m",
        difficulty: "Advanced",
        part: 4,
        partTitle: "Capstone & Advanced",
        description: "Evaluation strategies, benchmarks, LLM-as-judge",
      },
      {
        id: 22,
        slug: "advanced-local-open-models",
        title: "Advanced Topics - Local and Open Models",
        duration: "1h 15m",
        difficulty: "Intermediate",
        part: 4,
        partTitle: "Capstone & Advanced",
        description: "Open model ecosystem, running locally, optimization",
      },
      {
        id: 23,
        slug: "future-ai-career",
        title: "The Future of AI and Your Career",
        duration: "1h",
        difficulty: "Intermediate",
        part: 4,
        partTitle: "Capstone & Advanced",
        description:
          "Emerging trends, skills for the AI era, continuous learning",
      },
    ],
  },
];

/**
 * Get all modules as a flat array
 */
export function getAllModules(): Module[] {
  return parts.flatMap((part) => part.modules);
}

/**
 * Get a module by its slug
 */
export function getModuleBySlug(slug: string): Module | undefined {
  return getAllModules().find((m) => m.slug === slug);
}

/**
 * Get a module by its ID
 */
export function getModuleById(id: number): Module | undefined {
  return getAllModules().find((m) => m.id === id);
}

/**
 * Get next module
 */
export function getNextModule(currentId: number): Module | undefined {
  const modules = getAllModules();
  const index = modules.findIndex((m) => m.id === currentId);
  if (index === -1 || index === modules.length - 1) {
    return undefined;
  }
  return modules[index + 1];
}

/**
 * Get previous module
 */
export function getPreviousModule(currentId: number): Module | undefined {
  const modules = getAllModules();
  const index = modules.findIndex((m) => m.id === currentId);
  if (index <= 0) {
    return undefined;
  }
  return modules[index - 1];
}

/**
 * Get part by number
 */
export function getPartByNumber(partNumber: number): Part | undefined {
  return parts.find((p) => p.number === partNumber);
}

/**
 * Course statistics
 */
export const courseStats = {
  totalModules: 23,
  totalHours: "~35 hours",
  parts: 4,
};
