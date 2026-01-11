# Build Module 15: AI Agents - Concepts and Architecture

## Mission

Build out Module 15 to provide deep understanding of what makes AI systems "agentic" and how to architect them effectively. Cover the agent loop, planning and reasoning, memory systems, observability, and safety - building the conceptual foundation for practical agent implementation.

**Context**: Learners have mastered prompting (Module 14) and are ready to understand how those skills combine with tools and autonomy to create agents. This module is conceptual and architectural; Modules 16-17 cover implementation details.

## Source Material

### Primary Content

- `/mnt/c/Users/simon/Code/trainer/modules/15-ai-agents-architecture.md`

### Tone Reference

- `/mnt/c/Users/simon/Code/trainer/modules/01-developer-mental-model.md` - Gold standard for tone and style

### Reference Documents

- `/mnt/c/Users/simon/Code/trainer/docs/COURSE_OUTLINE.md` - Module specifications

## Critical: Understanding "Educational Prose"

### Wrong Approach

```markdown
## The Agent Loop

- Perceive environment
- Reason about goal
- Take action
- Observe result
- Repeat until done
```

### Correct Approach

```markdown
## The Agent Loop: Perceive, Reason, Act

You have used chatbots. You ask a question, you get an answer. The conversation ends,
or you ask another question. The AI is reactive - it responds to your prompts but
does not take initiative.

An AI agent is fundamentally different. It pursues goals over time, makes decisions
about what actions to take, observes the results, and adjusts accordingly. The shift
from chatbot to agent is the shift from "answer my question" to "accomplish this task."

Consider the difference. A chatbot interaction: "How do I create a Git branch?"
yields "Use git checkout -b branch-name." An agent interaction: "Fix the authentication
bug" triggers reading code files, identifying the bug, writing the fix, running tests,
creating a branch, committing changes, and opening a PR. The agent takes a high-level
goal and autonomously executes multiple steps to achieve it.

At its core, every agent follows a simple loop: perceive the environment, reason about
what to do, take action, update history, check if done. This loop repeats until the
goal is achieved, a termination condition is met, or resources are exhausted.
```

## Module Specifications

### Metadata

- **Title**: AI Agents - Concepts and Architecture
- **Part**: 3 - Safe Use & Agentic
- **Duration**: 1 hour 45 minutes
- **Difficulty**: Advanced
- **Prerequisites**: Module 14 (Prompt Engineering Mastery)
- **Previous Module**: Module 14 - Prompt Engineering Mastery
- **Next Module**: Module 16 - Tool Use and Function Calling

### Learning Objectives

1. Understand what makes an AI system "agentic" and how agents differ from chatbots
2. Recognize and design core components of agent architectures
3. Grasp how agents plan, reason, and decompose complex tasks
4. Understand memory systems that enable agents to maintain context
5. Implement observability practices for debugging and monitoring agents
6. Apply safety principles specific to agentic systems

### Section Breakdown

#### Section 1: What is an AI Agent? (15 min)

- Beyond chatbots: the agentic spectrum (levels 0-5)
- Characteristics: goal-directed, environmental interaction, autonomy, feedback loops
- Why agents now: LLM reasoning, tool use, extended context, retrieval
- The agent opportunity and new challenges

#### Section 2: Core Agent Architecture (20 min)

- The agent loop: perceive, reason, act, update, evaluate
- LLM as agent brain: intent understanding, planning, tool selection, error recovery
- System prompts for agents (identity, capabilities, guidelines, constraints)
- Tool integration architecture
- Basic agent loop implementation

#### Section 3: Planning and Reasoning (20 min)

- Task decomposition: top-down and bottom-up
- Planning strategies: upfront, reactive, hybrid
- Goal-directed behavior and progress assessment
- Handling errors and failures: classification and recovery
- Reasoning traces for transparency

#### Section 4: Memory Systems (20 min)

- Why agents need memory
- Short-term memory: the context window
- Working memory: the scratchpad (goals, plans, findings, failures)
- Long-term memory: vector databases and retrieval
- Context construction from multiple memory sources
- Memory best practices

#### Section 5: Agent Observability (15 min)

- Why observability matters for agents
- Three pillars: tracing, logging, metrics
- Key metrics to track (success rate, steps, duration, costs)
- Debugging agent failures systematically
- Observability infrastructure and tools

#### Section 6: Safety in Agentic Systems (10 min)

- Amplified risks: hallucination becomes wrong action, prompt injection becomes hijacking
- Sandboxing agent actions (file system, command execution)
- Permission systems (always, never, with_confirmation)
- Rate limiting and resource controls
- Fail-safes and human oversight

#### Section 7: Agent Design Patterns (5 min)

- When to use agents vs. traditional code
- Simple vs. complex agent designs
- Start simple heuristics
- Design principles: explicit over implicit, observation over assumption

## Required Diagrams

### 1. The Agent Loop

Flow diagram: Receive Goal -> Perceive Environment -> Reason & Plan -> Choose Action -> Execute Tool -> Observe Result -> Goal Complete? -> If no, back to Perceive -> If yes, Report Completion.

### 2. Agent Architecture Components

Layered diagram showing: LLM Brain at center, Memory Systems (short-term, working, long-term), Tool Layer (file ops, commands, APIs, search), Safety Layer (sandboxing, permissions, rate limits), connecting to User and Environment.

### 3. Memory System Architecture

Three-column diagram: Short-Term Memory (context window: messages, actions, immediate context) -> Working Memory (scratchpad: goals, plans, findings, failures) -> Long-Term Memory (vector store: codebase, past sessions, docs). All flow into Context Assembly -> LLM Reasoning.

### 4. Observability Stack

Vertical flow: Agent Execution (goal, planning, tools, reasoning, completion) -> Observability Layer (Tracing, Logging, Metrics) -> Storage (Trace Store, Log Store, Metrics DB) -> Analysis (Trace Viewer, Log Search, Dashboards).

### 5. Safety Layers

Sequential filter diagram: Incoming Request -> Input Validation -> Permission Check -> Sandboxing -> Rate Limiting -> Human Confirmation (if needed) -> Execute Action -> Audit Log. Each layer can Reject Request.

## Knowledge Check Questions

### Question 1

**What is the fundamental difference between a chatbot and an AI agent?**

- A) Agents use larger language models
- B) Agents pursue goals over multiple steps and take actions in their environment
- C) Agents have more training data
- D) Agents can process images and audio

**Correct**: B
**Explanation**: The key distinction is agency itself. Chatbots respond to prompts reactively - they answer questions but do not take initiative or execute multi-step plans. Agents pursue goals over time, make decisions about what actions to take, observe results, and adapt their behavior. They interact with their environment to accomplish tasks, not just generate text.

### Question 2

**Why do agents need multiple types of memory (short-term, working, long-term)?**

- A) To make them more expensive to run
- B) Each serves a distinct purpose: immediate context, structured task state, and persistent knowledge
- C) It is a marketing feature
- D) To slow down processing

**Correct**: B
**Explanation**: Each memory type serves a distinct purpose. Short-term memory (context window) holds immediate conversation and recent actions. Working memory (scratchpad) tracks structured task state - current goal, plan, findings, failed approaches. Long-term memory (retrieval systems) stores persistent knowledge that exceeds context limits. Together, they enable agents to maintain context, learn from attempts, and leverage accumulated knowledge.

### Question 3

**What is the most critical safety principle for production agents?**

- A) Use the largest possible model
- B) Give agents maximum permissions for flexibility
- C) Defense in depth: multiple layers of protection
- D) Trust the LLM's judgment completely

**Correct**: C
**Explanation**: Production agents require defense in depth. No single safety measure is sufficient. Sandboxing restricts what actions can affect. Permissions control what is allowed. Rate limits prevent runaway resource consumption. Human oversight catches what automated systems miss. Each layer catches failures that slip through others.

### Question 4

**When should you use a simple agent design vs. a complex multi-agent system?**

- A) Always use complex systems for better results
- B) Start with the simplest design that could work; add complexity only when simpler approaches fail
- C) Complex systems are always faster
- D) Simple agents cannot use tools

**Correct**: B
**Explanation**: Complexity has costs: harder debugging, higher latency, more failure modes, greater resource usage. Simple agents (single LLM, linear tool use) are easier to understand, debug, and maintain. Start simple: can a basic tool-using LLM accomplish the task? Only add planning, reflection, or multi-agent coordination when simpler approaches demonstrably fail.

### Question 5

**What is the role of observability in agent systems?**

- A) Making agents look professional
- B) Enabling debugging, understanding agent decisions, and monitoring for issues
- C) Slowing down execution for safety
- D) Reducing costs

**Correct**: B
**Explanation**: Without observability, debugging agents is guesswork. Why did the agent take 50 steps for a simple task? Where did it go wrong? What was it thinking when it made that decision? Tracing captures execution paths, logging records details at each step, and metrics show aggregate patterns. These answer critical questions when things go wrong.

## Hands-On Exercise: Build a Simple Agent

### Objective

Build a minimal but functional coding agent that can read files, make changes, and run tests. Demonstrate the core agent loop, tool integration, and basic observability.

### Duration

60-75 minutes

### Prerequisites

- Python 3.8+
- Access to an LLM API (Claude, OpenAI, or local model)
- A simple test project to work with

### Structure

**Part 1: Define Tools (15 min)**

- Create ReadFileTool with path validation and security checks
- Create WriteFileTool with allowed directory restrictions
- Create RunCommandTool with command allowlist
- Implement ToolResult dataclass for consistent results

**Part 2: Build Agent Core (20 min)**

- Implement SimpleAgent class with LLM, tools, and system prompt
- Build agent loop: generate response, check for tool calls, execute, continue
- Implement tool call parsing
- Add iteration limits and completion detection

**Part 3: Create System Prompt (10 min)**

- Define agent identity and role
- Specify tool usage format
- Establish behavioral guidelines
- Set constraints and safety rules

**Part 4: Add Observability (15 min)**

- Add logging for each agent action
- Track iteration count and tool calls
- Build trace collection for debugging
- Implement simple metrics (duration, steps, success)

**Part 5: Test and Iterate (15 min)**

- Test with simple tasks (read file, explain code)
- Test with multi-step tasks (read, modify, verify)
- Identify failure modes
- Document what works and what needs improvement

### Success Criteria

- [ ] Agent can read files and report contents
- [ ] Agent can make simple code modifications
- [ ] Agent respects directory restrictions
- [ ] Trace shows clear execution path
- [ ] Agent terminates appropriately (completion or max iterations)
- [ ] Error handling prevents crashes on tool failures

## References

### Foundational Concepts

1. **"ReAct: Synergizing Reasoning and Acting"** - Yao et al. (2022) - Reasoning + Acting pattern
2. **"Toolformer: Language Models Can Teach Themselves to Use Tools"** - Schick et al. (2023)
3. **"Chain-of-Thought Prompting Elicits Reasoning"** - Wei et al. (2022)

### Agent Architectures

4. **LangChain Agents Documentation** - Framework patterns for agents
5. **AutoGPT Architecture** - Autonomous agent design
6. **Claude Computer Use Documentation** - Anthropic's agent approach

### Memory and Retrieval

7. **"Generative Agents: Interactive Simulacra"** - Park et al. (2023) - Memory in agents
8. **Chroma Documentation** - Vector database for agent memory
9. **LlamaIndex Documentation** - RAG for agents

### Safety and Observability

10. **LangSmith Documentation** - Agent tracing and debugging
11. **"Red Teaming Language Models to Reduce Harms"** - Ganguli et al. (2022)
12. **OpenTelemetry for LLM Applications** - Observability standards

## Tone Examples

### Explaining Core Concepts

```markdown
At its core, every agent follows a simple loop. While not done: perceive the
environment, reason about what to do, take action, update history, check completion.
This loop repeats until the goal is achieved, a termination condition is met, or
resources are exhausted.

The language model is the reasoning engine. It performs intent understanding (parsing
goals into actionable understanding), planning (breaking complex goals into steps),
tool selection (matching tools to requirements), and error recovery (deciding what
to do when things go wrong).
```

### Connecting to Practice

```markdown
Memory is not optional decoration - without it, every action would start from scratch.
What have we tried? What worked? What do we know about this codebase? Agents need
multiple memory types because different information has different persistence needs.
Current conversation history fits in context. Structured task state belongs in working
memory. Codebase knowledge lives in long-term retrieval.
```

### Setting Expectations

```markdown
Agents add complexity. Use them when the benefits justify the costs. Good fit: multi-step
tasks with unpredictable paths, tasks requiring tool coordination, long-running processes
needing adaptation. Poor fit: simple deterministic workflows (use regular code), tasks
where every error is critical (use human oversight), high-frequency low-latency requirements.
```

## Completion Checklist

- [ ] All seven sections written in clear architectural prose
- [ ] Each section matches specified time estimate
- [ ] All five diagrams render correctly in Mermaid
- [ ] Five knowledge check questions with detailed explanations
- [ ] Hands-on exercise produces working agent with observability
- [ ] References section includes 12+ resources
- [ ] Agent loop explained with multiple examples
- [ ] Memory systems covered comprehensively
- [ ] Safety considerations integrated throughout
- [ ] Clear transition to Module 16 (Tool Use)

## Anti-Patterns to Avoid

1. **Overcomplicating early**: Start with simple agent patterns before multi-agent
2. **Skipping observability**: Without tracing, debugging is impossible
3. **Trusting without sandboxing**: Always restrict agent capabilities
4. **Ignoring context limits**: Memory management is essential
5. **Magic thinking**: Agents do not "understand" - they predict tokens
6. **No termination conditions**: Runaway agents waste resources

## Success Looks Like

After completing this module, learners should:

- Understand what makes systems agentic vs. reactive
- Be able to design basic agent architectures
- Know how to implement memory at multiple levels
- Have practical observability patterns
- Understand agent-specific safety concerns
- Be ready to implement tool use (Module 16)
