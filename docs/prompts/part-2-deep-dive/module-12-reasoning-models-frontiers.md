# Build Module 12: Reasoning Models and Current Frontiers

## Mission

Build out Module 12 to cover the cutting edge: reasoning models, chain-of-thought, test-time compute, and current research frontiers. This module closes Part 2 by looking at where AI is heading, what problems remain unsolved, and what might come next.

**Context**: This concludes Part 2 (AI/ML Deep Dive). Learners have deep technical understanding and are ready to explore frontiers before moving to practical application in Part 3.

## Source Material

### Primary Content

- `/mnt/c/Users/simon/Code/trainer/modules/12-reasoning-models-frontiers.md`

### Tone Reference

- `/mnt/c/Users/simon/Code/trainer/modules/01-developer-mental-model.md` - Gold standard for tone and style

### Reference Documents

- `/mnt/c/Users/simon/Code/trainer/docs/COURSE_OUTLINE.md` - Module specifications

## Critical: Understanding "Educational Prose"

### Wrong Approach

```markdown
## Chain-of-Thought

- Prompting technique for reasoning
- "Let's think step by step"
- Improves accuracy on math/logic
- Works better on larger models
```

### Correct Approach

```markdown
## Chain-of-Thought: Thinking Out Loud

Ask a standard LLM "What is 23 x 47?" and it might just output "1081"—correct,
but how? If you instead ask it to "think step by step," something interesting
happens. The model writes out: "23 x 47. First, 23 x 40 = 920. Then, 23 x 7 = 161.
920 + 161 = 1081." The answer is the same, but the process is visible.

This isn't just cosmetic. When models show their work, they make fewer errors on
complex problems. The intermediate tokens serve as "scratch space"—the model can
use its own output as working memory. Without chain-of-thought, the model has to
compute the entire answer in a single forward pass. With it, each step builds on
the previous one.
```

## Module Specifications

### Metadata

- **Title**: Reasoning Models and Current Frontiers
- **Part**: 2 - AI/ML Deep Dive
- **Duration**: 1 hour 30 minutes
- **Difficulty**: Advanced
- **Prerequisites**: Module 11 (Multimodal)
- **Previous Module**: Module 11 - Diffusion Models and Multimodal AI
- **Next Module**: Module 13 - Safe and Responsible AI Use (Part 3 begins)

### Learning Objectives

1. Understand evolution toward reasoning-focused models
2. Grasp how Chain-of-Thought and related techniques work
3. Recognize current frontiers of AI capability
4. Appreciate open questions and active research

### Section Breakdown

#### Section 1: The Reasoning Challenge (15 min)

- Why reasoning is hard for LLMs
- Pattern matching vs logical deduction
- The gap between generation and reasoning
- Why this matters

#### Section 2: Chain-of-Thought Revolution (15 min)

- The discovery and its impact
- Why showing work helps
- Variations: zero-shot, few-shot CoT
- Limitations and failure modes

#### Section 3: Reasoning Models and Test-Time Compute (pioneered by o1 and successors) (20 min)

- Test-time compute scaling
- Hidden reasoning traces
- How o1-style models differ
- Performance on hard problems
- Cost and latency implications

#### Section 4: Evaluation and Benchmarks (15 min)

- The benchmark treadmill
- Key reasoning benchmarks (GSM8K, MATH, ARC)
- Benchmark saturation problem
- What benchmarks miss
- Evaluation as unsolved problem

#### Section 5: Current Research Frontiers (20 min)

- Mixture of Experts (MoE)
- Context length scaling
- Multimodal reasoning
- Agent architectures
- Constitutional AI and alignment
- What's being worked on now

#### Section 6: The Road Ahead (5 min)

- What we know we don't know
- Predictions with appropriate uncertainty
- How to stay current
- Preparing for Part 3

## Required Diagrams

### 1. Chain-of-Thought Comparison

Side-by-side: Direct answer (wrong) vs CoT (correct with steps shown).

### 2. Reasoning Model Architecture

Showing: Input -> Extended thinking time -> Hidden reasoning -> Final output.

### 3. Benchmark Saturation Graph

Line graph showing benchmark scores over time approaching ceiling.

### 4. Mixture of Experts Visualization

Diagram showing routing to specialized expert sub-networks.

### 5. Capability Frontier Map

2D plot with different capabilities (reasoning, creativity, knowledge) and current state.

## Knowledge Check Questions

### Question 1

**Why does chain-of-thought prompting improve reasoning performance?**

- A) It uses more tokens
- B) Intermediate steps serve as working memory, allowing the model to build on its own output
- C) It triggers special reasoning circuits
- D) It's a form of fine-tuning

**Correct**: B
**Explanation**: When models generate intermediate steps, each step can inform the next. This effectively expands working memory—instead of computing the answer in one forward pass, the model breaks the problem down and reasons step by step.

### Question 2

**What is "test-time compute scaling" as used in reasoning models like o1?**

- A) Training models longer
- B) Using more compute during inference to improve answer quality
- C) Scaling the model size
- D) Reducing latency

**Correct**: B
**Explanation**: Unlike training-time scaling, test-time compute scaling uses more computation during inference. Models like o1 "think longer" on hard problems, trading latency and cost for improved accuracy on complex reasoning tasks.

### Question 3

**What is the "benchmark saturation" problem?**

- A) Too many benchmarks exist
- B) Models approach or exceed human performance, making benchmarks less useful for measuring progress
- C) Benchmarks are too hard
- D) Models memorize benchmark answers

**Correct**: B
**Explanation**: When models saturate benchmarks (scoring near 100%), the benchmarks no longer differentiate capabilities or measure progress. This drives constant creation of harder benchmarks, but the treadmill continues.

### Question 4

**What is Mixture of Experts (MoE)?**

- A) Ensemble of multiple models
- B) Architecture where only a subset of parameters are activated for each input, enabling larger models
- C) A type of attention mechanism
- D) A training technique

**Correct**: B
**Explanation**: MoE uses routing to activate only relevant "expert" sub-networks for each input. This allows models with many more total parameters without proportional compute increase—you get scale benefits without paying for all parameters on every token.

### Question 5

**What's an open research problem in AI reasoning?**

- A) Text generation
- B) Image classification
- C) Reliable multi-step planning with verification—models still struggle with complex, long-horizon reasoning
- D) Sentiment analysis

**Correct**: C
**Explanation**: While models can solve individual problems, reliable multi-step planning—where each step must be correct and verified—remains challenging. Models make errors that compound, and verifying correctness mid-reasoning is hard.

## Hands-On Exercise: Reasoning Evaluation Lab

### Objective

Test reasoning models on challenging problems, compare approaches, and find failure modes.

### Duration

45-60 minutes

### Prerequisites

- API access to multiple models (GPT-4, Claude, o1/o1-mini if available)
- Python for structured testing

### Structure

**Part 1: CoT Comparison (15 min)**

- Test same problems with and without CoT
- Measure accuracy differences
- Document when CoT helps vs doesn't
- Find optimal CoT formulations

**Part 2: Reasoning Model Testing (15 min)**

- Test reasoning-optimized models (o1, etc.)
- Compare to standard models
- Note latency and cost differences
- Identify sweet spots

**Part 3: Finding Failure Modes (15 min)**

- Create problems designed to fool models
- Test multi-step reasoning limits
- Find consistent failure patterns
- Document limitations

**Part 4: Benchmark Your Own (15 min)**

- Create a mini-benchmark for your domain
- Test multiple models
- Document comparative performance
- Identify best model for your use case

### Success Criteria

- [ ] Compared CoT vs direct approaches
- [ ] Tested reasoning models on hard problems
- [ ] Found at least 3 failure modes
- [ ] Created domain-specific test
- [ ] Documented comparative findings
- [ ] Wrote recommendations

## References

### Reasoning Research

1. **"Chain-of-Thought Prompting Elicits Reasoning"** - Wei et al. (2022)
2. **"Let's Think Step by Step"** - Kojima et al. (2022) - Zero-shot CoT
3. **"Tree of Thoughts"** - Yao et al. (2023)
4. **OpenAI o1 Technical Report** - (2024)

### Benchmarks

5. **"GSM8K: Training Verifiers to Solve Math Word Problems"** - Cobbe et al.
6. **"MATH: Measuring Mathematical Problem Solving"** - Hendrycks et al.
7. **"ARC: A Challenge for Abstract Reasoning"** - Chollet

### Frontiers

8. **"Outrageously Large Neural Networks: The Sparsely-Gated MoE"** - Shazeer et al.
9. **"Constitutional AI"** - Anthropic
10. **State of AI Report** - Annual frontier overview

## Tone Examples

### Explaining Techniques

```markdown
Ask a standard LLM "What is 23 x 47?" and it might just output "1081"—correct,
but how? If you instead ask it to "think step by step," something interesting
happens. The model writes out intermediate calculations. The answer is the same,
but the process is visible—and more importantly, more reliable.
```

### Covering Frontiers

```markdown
Mixture of Experts is scale without proportional cost. Instead of activating all
70 billion parameters for every token, route each token to the most relevant
2 billion. You get the benefits of scale—more total knowledge, more specialization—
without paying for it all on every forward pass. It's how you build trillion-
parameter models that are actually usable.
```

### Appropriate Uncertainty

```markdown
Where is this all going? Honest answer: nobody knows. The pace of change makes
prediction unreliable. What we can say: reasoning capabilities are improving,
multimodal is becoming standard, and the gap between "impressive demo" and
"reliable production system" remains significant. Focus on what's real today
while staying alert to what's coming.
```

## Completion Checklist

- [ ] All six sections written in flowing prose
- [ ] Each section matches specified time estimate
- [ ] All five diagrams render correctly in Mermaid
- [ ] Five knowledge check questions with explanations
- [ ] Hands-on exercise tests real reasoning capabilities
- [ ] References section includes 10+ resources
- [ ] Chain-of-thought thoroughly explained
- [ ] Reasoning models (o1) covered appropriately
- [ ] Current frontiers surveyed without hype
- [ ] Clear transition to Part 3

## Anti-Patterns to Avoid

1. **Hype-driven**: Be excited but realistic
2. **Outdated frontiers**: This content ages fast—stay current
3. **Missing limitations**: Every technique has failure modes
4. **Speculation presented as fact**: Distinguish what's proven vs predicted
5. **Too academic**: Connect to practical implications
6. **Overwhelming detail**: Survey breadth, not exhaustive depth

## Success Looks Like

After completing this module, learners should:

- Understand why reasoning is hard and how CoT helps
- Know what reasoning models do differently
- Have realistic expectations about current capabilities
- Understand major research directions
- Be ready to apply knowledge in Part 3 (Safe Use & Agentic)

## Part 2 Wrap-up Note

This module concludes Part 2: AI/ML Deep Dive. Learners should feel they have:

- Historical context for AI development (Module 7)
- Deep understanding of transformers (Module 8)
- Knowledge of training and alignment (Module 9)
- Understanding of tokenization and internals (Module 10)
- Multimodal AI knowledge (Module 11)
- Awareness of current frontiers (Module 12)

The transition to Part 3 moves from "how it works" to "how to use it safely and effectively."
