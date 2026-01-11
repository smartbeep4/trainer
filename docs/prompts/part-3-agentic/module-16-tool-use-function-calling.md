# Build Module 16: Tool Use and Function Calling

## Mission

Build out Module 16 to provide mastery of how LLMs interact with external tools and systems. Cover the function calling protocol, tool design principles, execution patterns, and production considerations. This module bridges prompt engineering skills with practical agent implementation.

**Context**: Learners have completed prompt engineering (Module 14) and understand agent concepts (Module 15). This module provides the concrete implementation skills for enabling LLMs to take actions in the world through tools.

## Source Material

### Primary Content

- `/mnt/c/Users/simon/Code/trainer/modules/16-tool-use-function-calling.md`

### Tone Reference

- `/mnt/c/Users/simon/Code/trainer/modules/01-developer-mental-model.md` - Gold standard for tone and style

### Reference Documents

- `/mnt/c/Users/simon/Code/trainer/docs/COURSE_OUTLINE.md` - Module specifications

## Critical: Understanding "Educational Prose"

### Wrong Approach

```markdown
## Function Calling

- Define tool schema with JSON
- Model decides when to call tools
- Execute tool and return results
- Model generates final response
```

### Correct Approach

```markdown
## Function Calling: Giving LLMs Hands

Language models are powerful but fundamentally constrained. They cannot access
real-time information, perform precise calculations, or interact with systems.
These are not bugs to be fixed with more training. They are fundamental to what
a language model is: a system that predicts text based on patterns in training
data.

Tools solve this by giving LLMs the ability to take actions in the world. Without
tools, the LLM is a brain in a jar - incredibly capable at processing and
generating language, but isolated from external reality. With tools, the LLM
gains the ability to read from external sources, write to external systems,
execute computations, and control other systems.

The function calling protocol is how this works in practice. You define available
tools with their schemas. The model decides when to call tools and with what
arguments. You execute the tool and return results. The model incorporates
results into its response. This transforms LLMs from passive text generators
into active agents that can accomplish tasks.
```

## Module Specifications

### Metadata

- **Title**: Tool Use and Function Calling
- **Part**: 3 - Safe Use & Agentic
- **Duration**: 1 hour 30 minutes
- **Difficulty**: Intermediate-Advanced
- **Prerequisites**: Module 15 (AI Agents - Concepts and Architecture)
- **Previous Module**: Module 15 - AI Agents: Concepts and Architecture
- **Next Module**: Module 17 - Multi-Agent Systems and Orchestration

### Learning Objectives

1. Understand how LLMs interact with external tools and why this matters
2. Master function calling API patterns across major providers
3. Design effective tool schemas with clear descriptions and appropriate constraints
4. Handle tool execution errors gracefully with retries and fallbacks
5. Implement both sequential and parallel tool execution patterns
6. Apply production considerations: security, rate limiting, and cost management

### Section Breakdown

#### Section 1: Why Tools Matter (10 min)

- The limitation problem: what LLMs cannot do alone
- Tools as capability extensions
- The tool use mental model
- Common tool categories
- Why this matters for developers

#### Section 2: Function Calling Mechanics (20 min)

- The function calling protocol
- Tool definition anatomy
- OpenAI function calling pattern
- Anthropic tool use pattern
- The tool execution loop
- Tool choice control
- Parallel vs sequential tool calls

#### Section 3: Tool Design Principles (20 min)

- The description is everything
- Atomic actions vs god tools
- Parameter design and constraints
- Error handling in schema design
- Composable tool sets
- Documentation patterns

#### Section 4: Execution Patterns (20 min)

- The execution loop implementation
- Error handling strategies
- Retry patterns with backoff
- Parallel execution
- Result formatting
- State management across tool calls

#### Section 5: Production Considerations (15 min)

- Security fundamentals: input validation, scope limitation
- Action confirmation for destructive operations
- Rate limiting
- Cost management
- Monitoring and observability
- Graceful degradation

#### Section 6: Building Your Toolkit (5 min)

- Common tool patterns
- Tool composition
- Starting your toolkit: phases of implementation

## Required Diagrams

### 1. Tool Execution Flow

Sequence diagram showing: User -> Application -> LLM (with tool definitions) -> Tool Call request -> Tool System execution -> Result back to LLM -> Final response to User.

### 2. Tool Decision Tree

Flowchart: Receive Message -> Tools Available? -> Task Requires Tool? -> Select Best Tool -> Format Tool Call -> Execute Tool -> Success? -> Retry or Return Error -> More Tools Needed? -> Generate Final Response.

### 3. Security Layers

Layered diagram showing: Incoming Tool Request -> Validation Layer (schema, sanitization, permission) -> Control Layer (rate limiting, budget, scope) -> Execution Layer (sandbox, timeout, error handling) -> Audit Layer (logging, monitoring, alerting).

### 4. Parallel vs Sequential Execution

Side-by-side comparison: Sequential (Tool 1 -> Tool 2 -> Tool 3 -> Results) vs Parallel (Tool 1, Tool 2, Tool 3 all pointing to Results simultaneously).

### 5. Tool Schema Anatomy

Annotated diagram of a tool definition showing: name, description (with "when to use" notes), parameters object with properties, types, descriptions, enums, and required array.

## Knowledge Check Questions

### Question 1

**What is the primary purpose of the tool description field in a tool definition?**

- A) To document the tool for developers
- B) To help the model decide when to use the tool and how to call it correctly
- C) To validate the tool's response format
- D) To set rate limits on tool usage

**Correct**: B
**Explanation**: The description is critical for the model's decision-making. It reads the description to understand when the tool should be used, what it does, and how to format requests. A poor description leads to the model using wrong tools or failing to use tools when appropriate. While descriptions also serve as documentation, their primary function is guiding model behavior.

### Question 2

**When a model requests multiple tool calls simultaneously, what is the recommended approach?**

- A) Execute them one at a time in order received
- B) Reject multiple tool calls and ask for one at a time
- C) Execute independent tools in parallel, dependent tools sequentially
- D) Always execute all tools in parallel regardless of dependencies

**Correct**: C
**Explanation**: Independent tool calls (like getting weather for different cities) should be parallelized for efficiency. However, if tools have dependencies (tool B needs output from tool A), they must be executed sequentially. Blindly parallelizing everything can cause failures when dependencies exist; blindly serializing everything wastes time. Understanding the dependency graph is key.

### Question 3

**Which security practice is MOST important for tools that can modify data?**

- A) Rate limiting
- B) Logging all calls
- C) Input validation and scope restriction
- D) Caching responses

**Correct**: C
**Explanation**: While all options are valuable, input validation and scope restriction are most critical for write operations. A model might generate malicious or malformed input (whether through prompt injection or errors). Validating inputs and restricting tools to operate only within appropriate scope prevents data corruption, unauthorized access, and security breaches. Rate limiting and logging are important but do not prevent bad data from being written.

### Question 4

**What should a tool return when it encounters an error?**

- A) An empty response
- B) A structured error object with type, message, and suggested action
- C) The exception stack trace
- D) A boolean false

**Correct**: B
**Explanation**: The model needs actionable information to respond appropriately to users. A structured error with type (what went wrong), message (human-readable explanation), and suggestion (what to do next) enables the model to communicate effectively. Empty responses confuse the model; stack traces are too technical and may leak sensitive info; booleans provide no context for recovery.

### Question 5

**Why is the "atomic actions" principle important in tool design?**

- A) It makes tools run faster
- B) Atomic tools are easier for models to understand, safer to execute, and more composable
- C) It reduces the number of API calls
- D) It prevents rate limiting

**Correct**: B
**Explanation**: Each tool should do one thing well. Atomic tools are easier for the model to understand (clear purpose), safer (limited blast radius if something goes wrong), easier to test, and more composable (can be combined in flexible ways). "God tools" that do everything are confusing for models and dangerous when they go wrong.

## Hands-On Exercise: Build a Tool-Using Agent

### Objective

Build a simple agent that uses tools to answer questions about weather and perform calculations, implementing proper error handling and the full tool execution loop.

### Duration

45-60 minutes

### Prerequisites

- Python 3.8+
- API access to Claude or OpenAI
- Basic understanding of async Python

### Structure

**Part 1: Define Your Tools (10 min)**

- Create tool definitions for weather service and calculator
- Write clear descriptions that help the model decide when to use each
- Define appropriate parameter schemas with constraints

**Part 2: Implement Tool Execution (15 min)**

- Create mock implementations of each tool
- Handle both success and error cases
- Return structured results

**Part 3: Build the Agent Loop (15 min)**

- Implement the main agent that handles the conversation
- Parse tool call requests from model responses
- Execute tools and continue the loop
- Handle completion detection

**Part 4: Add Error Handling (10 min)**

- Implement retry logic with backoff
- Handle tool failures gracefully
- Test with error scenarios

**Part 5: Test the System (5 min)**

- Test with various queries
- Verify multi-tool scenarios work
- Test error handling paths

### Success Criteria

- [ ] Defined at least 3 tools with proper schemas
- [ ] Implemented the tool execution loop
- [ ] Handled both success and error cases
- [ ] Tested with queries requiring multiple tool calls
- [ ] Added retry logic for transient failures
- [ ] The agent responds appropriately to unknown inputs

## References

### Official Documentation

1. **Anthropic Tool Use Guide** - Comprehensive guide to tool use with Claude
2. **OpenAI Function Calling Guide** - Official documentation for function calling
3. **JSON Schema Specification** - The schema language used for tool parameters

### Research and Analysis

4. **"Toolformer: Language Models Can Teach Themselves to Use Tools"** - Schick et al. (2023)
5. **"ReAct: Synergizing Reasoning and Acting in Language Models"** - Yao et al. (2022)
6. **"Gorilla: Large Language Model Connected with Massive APIs"** - Patil et al. (2023)

### Practical Guides

7. **LangChain Tools Documentation** - Framework patterns for tools
8. **Anthropic Cookbook** - Practical examples for tool use

### Security

9. **OWASP LLM Security Guidelines** - Security for LLM applications
10. **"Prompt Injection Attacks on LLMs"** - Understanding risks with tool use

## Tone Examples

### Explaining Core Concepts

```markdown
Think of tool use as giving an LLM hands to interact with the world. Without tools,
the LLM is a brain in a jar - incredibly capable at processing and generating
language, but isolated from external reality. With tools, the LLM gains the ability
to read from external sources, write to external systems, execute computations,
and control other systems. This transforms LLMs from passive text generators into
active agents that can accomplish tasks.
```

### Practical Guidance

```markdown
The description is everything. The model decides which tool to use based primarily
on descriptions. Poor descriptions lead to wrong tool choices or no tool use at
all. A bad description says "Search function." A good description says "Search
the web for current information. Use this when the user asks about recent events,
needs up-to-date facts, or asks questions about topics that may have changed since
your knowledge cutoff."
```

### Setting Expectations

```markdown
Never trust model-generated input. The model might generate malicious or malformed
input - whether through prompt injection or simple errors. Always validate inputs
against your schema. Restrict tool scope to what is actually needed. Require
confirmation for destructive actions. These are not optional safety measures -
they are essential for any production tool use system.
```

## Completion Checklist

- [ ] All six sections written in clear, practical prose
- [ ] Each section matches specified time estimate
- [ ] All five diagrams render correctly in Mermaid
- [ ] Five knowledge check questions with detailed explanations
- [ ] Hands-on exercise produces working tool-using agent
- [ ] References section includes 10+ resources
- [ ] Function calling protocol explained for multiple providers
- [ ] Tool design principles covered with examples
- [ ] Security considerations integrated throughout
- [ ] Clear transition to Module 17 (Multi-Agent Systems)

## Anti-Patterns to Avoid

1. **API-specific tunnel vision**: Cover patterns that work across providers
2. **Skipping security**: Tool use introduces real risks - address them
3. **God tool design**: Show why atomic tools are better
4. **Ignoring errors**: Error handling is critical for production
5. **Missing the loop**: Tool use is iterative - cover the full loop
6. **Theory without practice**: Include working code examples

## Success Looks Like

After completing this module, learners should:

- Understand how function calling works across providers
- Be able to design effective tool schemas
- Know how to implement robust tool execution loops
- Understand security implications of tool use
- Be ready to build multi-agent systems (Module 17)
