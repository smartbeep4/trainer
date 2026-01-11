# Build Module 14: Prompt Engineering Mastery

## Mission

Build out Module 14 to provide mastery-level prompt engineering skills. Move beyond basics to cover Chain-of-Thought, Chain-of-Verification, Tree-of-Thoughts, and systematic optimization. Learners should understand why techniques work, not just how to use them.

**Context**: Learners have foundational AI knowledge and safety awareness. This module provides the prompting skills needed for effective AI use and forms the foundation for building agents in subsequent modules.

## Source Material

### Primary Content

- `/mnt/c/Users/simon/Code/trainer/modules/14-prompt-engineering-mastery.md`

### Tone Reference

- `/mnt/c/Users/simon/Code/trainer/modules/01-developer-mental-model.md` - Gold standard for tone and style

### Reference Documents

- `/mnt/c/Users/simon/Code/trainer/docs/COURSE_OUTLINE.md` - Module specifications

## Critical: Understanding "Educational Prose"

### Wrong Approach

```markdown
## Chain-of-Thought Prompting

- Add "Let's think step by step" to prompts
- Model shows reasoning
- Improves accuracy on math and logic
- Works better on larger models
```

### Correct Approach

```markdown
## Chain-of-Thought: Why Showing Work Helps

Ask a standard LLM "What is 23 x 47?" and it might just output "1081" - correct, but
how? If you instead ask it to "think step by step," something interesting happens.
The model writes out: "23 x 47. First, 23 x 40 = 920. Then, 23 x 7 = 161. Finally,
920 + 161 = 1081."

This is not just cosmetic. When models show their work, they make fewer errors on
complex problems. Why? Because intermediate tokens serve as "scratch space" - the
model uses its own output as working memory. Without chain-of-thought, the model
computes the entire answer in a single forward pass. With it, each step builds on
the previous one, and errors become visible rather than hidden.

The technique works because training data contains more correct answers that show
reasoning than correct answers alone. Educational content, technical documentation,
and mathematical proofs all demonstrate step-by-step thinking. When you prompt for
reasoning steps, you prime the model to match those patterns.
```

## Module Specifications

### Metadata

- **Title**: Prompt Engineering Mastery
- **Part**: 3 - Safe Use & Agentic
- **Duration**: 2 hours
- **Difficulty**: Intermediate
- **Prerequisites**: Module 13 (Safe and Responsible AI Use)
- **Previous Module**: Module 13 - Safe and Responsible AI Use
- **Next Module**: Module 15 - AI Agents: Concepts and Architecture

### Learning Objectives

1. Apply advanced prompting techniques to achieve reliable, consistent outputs
2. Understand underlying principles that make prompts effective
3. Implement Chain-of-Thought, Chain-of-Verification, and Tree-of-Thoughts patterns
4. Design prompts for complex, multi-step tasks
5. Systematically optimize prompts through testing and iteration
6. Build a personal library of prompt patterns for common scenarios

### Section Breakdown

#### Section 1: Prompt Engineering Principles (15 min)

- Prompts as programming: the right mental model
- Why subtle wording changes matter
- Anatomy of effective prompts (context, instruction, format, constraints)
- Prompt engineering mindset: precision, experimentation, verification

#### Section 2: Foundational Techniques (20 min)

- Clear instructions and specificity
- Providing context effectively
- Role assignment and persona
- Few-shot learning with examples
- Output format specification
- Chain breaking for complex tasks

#### Section 3: Chain-of-Thought Prompting (20 min)

- What CoT is and why it works
- Zero-shot CoT ("Let's think step by step")
- Structured CoT with explicit frameworks
- CoT with few-shot examples
- When CoT helps vs. when it is overkill

#### Section 4: Chain-of-Verification (15 min)

- The hallucination problem
- Basic CoV pattern: generate, verify, revise
- Self-consistency checking
- Fact-checking prompts
- Limitations of model self-verification

#### Section 5: Reflection and Self-Correction (15 min)

- Beyond verification: quality critique
- Self-critique patterns
- Iterative refinement
- Role-based critique (multiple perspectives)
- "What could go wrong" technique
- Diminishing returns on reflection

#### Section 6: Tree-of-Thoughts and Beyond (15 min)

- From chains to trees: exploring multiple paths
- Basic ToT structure
- When ToT is valuable (complex problems, multiple approaches)
- Pruning strategies
- Combining techniques (CoT + CoV + ToT)
- Cost considerations

#### Section 7: Practical Prompt Optimization (15 min)

- Systematic testing with test cases
- Versioning prompts like code
- A/B testing approaches
- Iteration workflow
- Common improvements when prompts underperform
- Edge case handling

#### Section 8: Prompt Patterns Library (5 min)

- Essential patterns: Role-Task-Format, Few-Shot CoT
- Structured analysis pattern
- Generate-Critique-Revise pattern
- Domain-specific adaptations
- Building your personal library

## Required Diagrams

### 1. Prompt Engineering Techniques Hierarchy

Tree diagram showing: Foundational (clear instructions, context, roles, few-shot, format) -> Reasoning (CoT, zero-shot CoT, structured reasoning) -> Verification (CoV, self-consistency, reflection) -> Exploration (ToT, branch evaluation, pruning).

### 2. Chain-of-Thought Flow

Linear flow comparing: Problem -> Direct Prompt -> Direct Answer (risky) vs. Problem -> "Step by step" prompt -> Step 1 -> Step 2 -> Step 3 -> Conclusion -> Final Answer (more reliable).

### 3. Chain-of-Verification Process

Flow: Initial Query -> Generate Response -> Generate Verification Questions -> Answer Questions -> Check for Inconsistencies -> If yes, Revise -> Final Response.

### 4. Tree-of-Thoughts Structure

Tree diagram: Problem -> Generate Approaches (A, B, C, D) -> Evaluate each (scores) -> Prune low scores -> Develop top 2 -> Compare -> Select best -> Detailed solution.

### 5. Prompt Optimization Cycle

Circular flow: Initial Prompt -> Test Against Cases -> Identify Failures -> Analyze Why -> Modify Prompt -> Test Again -> Good Enough? -> If no, continue cycle -> If yes, Document & Deploy.

## Knowledge Check Questions

### Question 1

**What is the primary reason Chain-of-Thought prompting improves accuracy on complex reasoning tasks?**

- A) It makes the model work harder
- B) It uses more tokens, giving the model more context
- C) Training data contains more correct answers that show reasoning steps
- D) It forces the model to check its work

**Correct**: C
**Explanation**: CoT works because training data (educational content, technical documentation) frequently includes correct answers with reasoning steps shown. When you prompt for step-by-step thinking, you prime the model to match those patterns, which are statistically more likely to lead to correct conclusions than patterns where only final answers appear.

### Question 2

**When is Chain-of-Verification LEAST useful?**

- A) When generating factual technical documentation
- B) When solving multi-step math problems
- C) When lives or large sums of money depend on accuracy
- D) When writing code that will be reviewed by humans

**Correct**: C
**Explanation**: CoV has inherent limitations because it is the same model verifying itself. For critical applications where accuracy is life-or-death or involves significant financial risk, you must verify outputs against authoritative external sources, not rely on model self-verification. CoV reduces hallucinations but cannot eliminate them.

### Question 3

**Which component is most important for consistent, structured outputs?**

- A) Polite language ("please", "thank you")
- B) Explicit output format specification
- C) Multiple examples of unrelated tasks
- D) Warnings about bad outputs

**Correct**: B
**Explanation**: Specifying the output format (JSON structure, markdown sections, specific fields) is crucial for consistent, parseable outputs. Models respond well to explicit structure. Politeness does not affect output quality, unrelated examples add noise, and warnings are meaningless to models.

### Question 4

**Tree-of-Thoughts is most valuable for which type of task?**

- A) Simple fact retrieval
- B) Complex problems with multiple viable solution approaches
- C) Generating short, concise summaries
- D) Tasks requiring maximum speed

**Correct**: B
**Explanation**: ToT shines when problems have multiple potential approaches that need exploration and evaluation. It is overkill for simple tasks, counterproductive for tasks requiring conciseness, and too slow for latency-critical applications. Use ToT selectively for complex, high-value problems where exploring solution spaces justifies the computational cost.

### Question 5

**What is the most effective way to improve an underperforming prompt?**

- A) Make it longer and more detailed
- B) Add more polite language
- C) Test against diverse inputs, identify failure patterns, make targeted improvements
- D) Repeat the same instruction multiple times

**Correct**: C
**Explanation**: Prompt optimization is empirical. The systematic approach is: test against diverse inputs, identify where and why it fails, hypothesize improvements, implement changes, and test again. Simply making prompts longer or repeating instructions does not address underlying issues.

## Hands-On Exercise: Prompt Engineering Challenge

### Objective

Apply multiple prompt engineering techniques to progressively challenging tasks. Compare approaches and evaluate which techniques work best for each scenario.

### Duration

60-90 minutes

### Prerequisites

- Access to an AI assistant (Claude, ChatGPT, or similar)
- Text editor for documenting prompts and results

### Structure

**Part 1: Code Generation Comparison (20 min)**

- Write three prompts for generating email validation function
- Attempt 1: Basic prompt
- Attempt 2: Add role, context, output format
- Attempt 3: Add few-shot examples
- Document how outputs differ
- Identify which approach produced best results and why

**Part 2: Debugging with CoT (20 min)**

- Given buggy code that returns wrong results
- Attempt without CoT: simple "what's wrong?" prompt
- Attempt with CoT: structured step-by-step trace
- Compare reasoning quality and diagnosis accuracy
- Document when CoT made a difference

**Part 3: System Design with ToT (25 min)**

- Design caching strategy for REST API
- Direct request: simple "design a caching strategy"
- ToT approach: generate 4 approaches, evaluate each, select and develop best
- Compare depth of analysis
- Evaluate whether ToT exploration was worth the extra effort

**Part 4: Build Your Pattern (15 min)**

- Create reusable prompt pattern for code review
- Specify what aspects to review
- Define structured output format
- Test on 2-3 code samples
- Refine based on results

### Success Criteria

- [ ] Attempted all four challenges
- [ ] Compared at least two approaches for each challenge
- [ ] Documented specific differences in outputs
- [ ] Created at least one reusable prompt pattern
- [ ] Reflected on which techniques work for which scenarios
- [ ] Identified practical applications for your work

## References

### Foundational Papers

1. **"Chain-of-Thought Prompting Elicits Reasoning"** - Wei et al. (2022) - The foundational CoT paper
2. **"Tree of Thoughts: Deliberate Problem Solving"** - Yao et al. (2023) - ToT introduction
3. **"Chain-of-Verification Reduces Hallucination"** - Dhuliawala et al., Meta (2023)
4. **"Reflexion: Language Agents with Verbal Reinforcement"** - Shinn et al. (2023)

### Official Guides

5. **Anthropic Prompt Engineering Guide** - Comprehensive prompting for Claude
6. **OpenAI Prompt Engineering Guide** - Official GPT prompting guidance
7. **Google AI Prompt Design Best Practices**

### Practical Resources

8. **Prompt Engineering Guide (DAIR.AI)** - Community-maintained comprehensive guide
9. **LangChain Prompt Templates** - Library of reusable patterns
10. **"Coaxing AI"** by Eugene Yan - Practical blog series on prompting

### Academic Extensions

11. **"Large Language Models Are Human-Level Prompt Engineers"** - Zhou et al. (2022)
12. **"Self-Consistency Improves Chain of Thought"** - Wang et al. (2022)

## Tone Examples

### Explaining Why Techniques Work

```markdown
Think of it this way: when you call a function in code, you provide parameters in a
specific format. The function does not guess what you mean - it processes exactly what
you give it. Prompts work similarly, but the "function" is a probabilistic token
predictor, not deterministic logic.

This creates both challenges (same prompt can produce different outputs) and
opportunities (iterative refinement can dramatically improve outputs). Your job is
to structure input to maximize the probability of useful output.
```

### Practical Guidance

```markdown
Your first prompt rarely works perfectly. Expect to iterate. This is not a failure
of the technique - it is the nature of working with probabilistic systems. Keep track
of what works: build a prompt repository organized by task type. Your experience will
differ from generic advice because your codebase, language, and domain are unique.
```

### Setting Realistic Expectations

```markdown
Tree-of-Thoughts is powerful but expensive. A simple question might require 10x the
tokens of a direct answer. Before using ToT, ask: does the complexity of this problem
justify the cost? For most routine tasks, simpler techniques work fine. Reserve ToT
for genuinely hard problems where exploring multiple approaches matters.
```

## Completion Checklist

- [ ] All eight sections written in clear, practical prose
- [ ] Each section matches specified time estimate
- [ ] All five diagrams render correctly in Mermaid
- [ ] Five knowledge check questions with detailed explanations
- [ ] Hands-on exercise compares multiple techniques systematically
- [ ] References section includes 12+ resources
- [ ] Each technique explained with "why it works" not just "how to use"
- [ ] Clear progression from foundational to advanced techniques
- [ ] Practical optimization workflow included
- [ ] Clear transition to Module 15 (AI Agents)

## Anti-Patterns to Avoid

1. **Magic words thinking**: Techniques work for reasons, not because of special phrases
2. **One-size-fits-all**: Different tasks need different approaches
3. **Ignoring costs**: Token usage and latency matter in practice
4. **Ritual without understanding**: Know why you are using each technique
5. **Overcomplicating simple tasks**: Start simple, add complexity when needed
6. **No verification habit**: Never trust outputs without review

## Success Looks Like

After completing this module, learners should:

- Understand why prompting techniques work, not just how to use them
- Know when to apply CoT, CoV, ToT vs. simpler approaches
- Have a systematic process for optimizing prompts
- Have started building a personal prompt pattern library
- Be ready to apply prompting skills to agent development (Module 15)
