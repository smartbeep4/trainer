# Build Module 9: Training, Fine-Tuning, and RLHF

## Mission

Build out Module 9 to explain how language models go from blank slates to useful assistants. Cover the three-stage process: pre-training on massive data, fine-tuning for specific tasks, and RLHF for alignment. Make the "why" as clear as the "how."

**Context**: Learners understand transformer architecture (Module 8). Now they need to understand how these models acquire their capabilities through training and how they become helpful through alignment.

## Source Material

### Primary Content

- `/mnt/c/Users/simon/Code/trainer/modules/09-training-finetuning-rlhf.md`

### Tone Reference

- `/mnt/c/Users/simon/Code/trainer/modules/01-developer-mental-model.md` - Gold standard for tone and style

### Reference Documents

- `/mnt/c/Users/simon/Code/trainer/docs/COURSE_OUTLINE.md` - Module specifications

## Critical: Understanding "Educational Prose"

### Wrong Approach

```markdown
## RLHF Pipeline

1. Collect human preference data
2. Train reward model
3. Use PPO to optimize policy
4. Iterate
```

### Correct Approach

```markdown
## RLHF: Teaching Models What Humans Want

Pre-training teaches a model to predict text. Fine-tuning teaches it to follow
instructions. But neither teaches it what makes a response actually good. A model
can follow instructions while being rude, harmful, or unhelpful. This is where
RLHF comes in.

The core insight is simple: instead of showing the model correct outputs, show
it which outputs humans prefer. Given two responses to the same prompt, which
is better? Collect enough of these preferences, train a "reward model" to predict
them, then optimize the language model to generate responses the reward model
rates highly.
```

## Module Specifications

### Metadata

- **Title**: Training, Fine-Tuning, and RLHF
- **Part**: 2 - AI/ML Deep Dive
- **Duration**: 1 hour 45 minutes
- **Difficulty**: Advanced
- **Prerequisites**: Module 8 (Transformers)
- **Previous Module**: Module 8 - The Transformer Revolution
- **Next Module**: Module 10 - Tokens, Embeddings, and Model Internals

### Learning Objectives

1. Understand three-stage process of creating useful LLMs
2. Grasp how pre-training creates foundation capabilities
3. Recognize different fine-tuning approaches
4. Understand RLHF and why it matters for alignment

### Section Breakdown

#### Section 1: The Three Stages of LLM Development (10 min)

- Pre-training, fine-tuning, alignment
- Why each stage exists
- The capability-alignment distinction
- Overview of the pipeline

#### Section 2: Pre-Training: Building the Foundation (20 min)

- Next-token prediction at scale
- Training data sources (Common Crawl, etc.)
- Compute requirements
- What the model learns
- Emergent capabilities

#### Section 3: Fine-Tuning Fundamentals (20 min)

- Why pre-trained models need fine-tuning
- Supervised fine-tuning (SFT)
- Instruction tuning
- Domain adaptation
- The difference between capability and helpfulness

#### Section 4: Parameter-Efficient Fine-Tuning (15 min)

- The cost problem with full fine-tuning
- LoRA: Low-Rank Adaptation
- QLoRA and quantization
- Adapters and other approaches
- When to use which

#### Section 5: RLHF: Learning from Human Preferences (25 min)

- Why instruction-tuned models aren't enough
- Human preference data collection
- Training the reward model
- Policy optimization (PPO intuition)
- The feedback loop

#### Section 6: Constitutional AI and Alternatives (10 min)

- Constitutional AI approach
- Direct Preference Optimization (DPO)
- Other alignment methods
- Trade-offs between approaches

#### Section 7: Practical Considerations (5 min)

- When to fine-tune vs prompt
- Costs and infrastructure
- Evaluation challenges
- Ongoing iteration

## Required Diagrams

### 1. Three-Stage Pipeline

Flow showing: Pre-training (raw text) -> SFT (instruction data) -> RLHF (human preferences) -> Aligned model.

### 2. RLHF Training Loop

Circular diagram: Generate responses -> Human ranking -> Train reward model -> Optimize policy -> Generate responses.

### 3. LoRA Architecture

Showing original weights frozen, small adapter matrices trained alongside.

### 4. Fine-Tuning Decision Tree

Decision flow: Task specificity, data availability, compute budget leading to recommendation.

### 5. Reward Model Training

Flow: Prompt -> Model generates two responses -> Human chooses preferred -> Reward model learns preference.

## Knowledge Check Questions

### Question 1

**What is the primary objective during LLM pre-training?**

- A) Learning to follow instructions
- B) Predicting the next token in massive text corpora
- C) Maximizing human preferences
- D) Minimizing inference time

**Correct**: B
**Explanation**: Pre-training uses next-token prediction as its objective—the model learns to predict what text comes next. This simple objective, at scale, leads to learning grammar, facts, reasoning patterns, and more.

### Question 2

**Why is supervised fine-tuning (SFT) on instructions necessary after pre-training?**

- A) To reduce model size
- B) To teach the model to follow instructions and respond helpfully, rather than just continuing text
- C) To add new knowledge
- D) To speed up inference

**Correct**: B
**Explanation**: Pre-trained models are trained to continue text, not respond to requests. SFT on instruction-response pairs teaches the model that when given an instruction, it should produce a helpful response rather than just predicting likely continuations.

### Question 3

**What is the key advantage of LoRA over full fine-tuning?**

- A) It produces better results
- B) It trains much fewer parameters, reducing compute and storage costs dramatically
- C) It doesn't require any training data
- D) It works without a GPU

**Correct**: B
**Explanation**: LoRA freezes the original model weights and trains small "adapter" matrices (often <1% of parameters). This dramatically reduces memory, storage, and compute requirements while achieving comparable quality for many tasks.

### Question 4

**What problem does RLHF solve that instruction fine-tuning doesn't?**

- A) Teaching the model to generate text
- B) Teaching the model which responses humans actually prefer, not just which are "correct"
- C) Reducing model size
- D) Speeding up training

**Correct**: B
**Explanation**: Instruction tuning teaches the model to follow instructions, but a model can follow instructions while being unhelpful, verbose, or annoying. RLHF teaches the model which responses are actually preferred by humans, optimizing for quality beyond mere instruction-following.

### Question 5

**What is the role of the reward model in RLHF?**

- A) To generate responses
- B) To predict which responses humans would prefer, providing a training signal for the LLM
- C) To store training data
- D) To reduce inference cost

**Correct**: B
**Explanation**: The reward model is trained on human preference data to predict which responses humans would prefer. It then provides the training signal for the LLM—instead of humans rating every response, the reward model estimates preferences, making the process scalable.

## Hands-On Exercise: Fine-Tuning Experiment

### Objective

Experience the fine-tuning process by training a LoRA adapter on a small dataset and evaluating results.

### Duration

45-60 minutes

### Prerequisites

- Python 3.8+
- PEFT library, transformers, datasets
- GPU access (Colab free tier works)

### Structure

**Part 1: Setup and Data Preparation (10 min)**

- Load a small base model (e.g., phi-2 or tiny-llama)
- Prepare an instruction dataset
- Format data correctly

**Part 2: LoRA Configuration (15 min)**

- Configure LoRA parameters (rank, alpha, target modules)
- Understand what each parameter controls
- Set up training arguments

**Part 3: Training (15 min)**

- Run fine-tuning loop
- Monitor loss curves
- Understand what's being optimized

**Part 4: Evaluation (20 min)**

- Compare base model vs fine-tuned
- Test on held-out examples
- Measure improvement
- Identify failure cases

### Success Criteria

- [ ] Successfully loaded and prepared model
- [ ] Configured LoRA correctly
- [ ] Completed training without errors
- [ ] Observed loss decrease
- [ ] Compared outputs before/after
- [ ] Documented quality improvements

## References

### Training Papers

1. **"Language Models are Few-Shot Learners"** - Brown et al. (2020) - GPT-3 and in-context learning
2. **"Training language models to follow instructions"** - Ouyang et al. (2022) - InstructGPT/RLHF
3. **"LoRA: Low-Rank Adaptation"** - Hu et al. (2021) - Efficient fine-tuning
4. **"QLoRA"** - Dettmers et al. (2023) - Quantized LoRA

### Alignment Research

5. **"Constitutional AI"** - Anthropic (2022) - Self-improvement approach
6. **"Direct Preference Optimization"** - Rafailov et al. (2023) - Simpler alternative to PPO

### Practical Guides

7. **Hugging Face PEFT Documentation** - Parameter-efficient fine-tuning
8. **Hugging Face TRL Documentation** - Transformer Reinforcement Learning
9. **Axolotl** - Fine-tuning framework

### Background

10. **"Proximal Policy Optimization"** - Schulman et al. (2017) - The PPO algorithm

## Tone Examples

### Explaining the Why

```markdown
Pre-training teaches a model to predict text. Fine-tuning teaches it to follow
instructions. But neither teaches it what makes a response actually good. A model
can follow instructions while being rude, harmful, or unhelpful. This is where
RLHF comes in.
```

### Making Technical Accessible

```markdown
LoRA's insight is elegant: fine-tuning changes model weights, but most of the
change is low-rank—it can be approximated by the product of two small matrices.
Instead of updating 7 billion parameters, update two matrices with 10 million
parameters total. The math checks out, and the results are nearly as good.
```

### Connecting Concepts

```markdown
RLHF closes the loop. Pre-training gives the model capability. Fine-tuning gives
it direction. RLHF gives it judgment—the ability to distinguish better responses
from worse ones according to human values. Without this last step, you have a
powerful tool with no sense of quality.
```

## Completion Checklist

- [ ] All seven sections written in flowing prose
- [ ] Each section matches specified time estimate
- [ ] All five diagrams render correctly in Mermaid
- [ ] Five knowledge check questions with explanations
- [ ] Hands-on exercise provides real fine-tuning experience
- [ ] References section includes 10+ resources
- [ ] Three-stage pipeline clearly explained
- [ ] LoRA made intuitive
- [ ] RLHF explained with clear reasoning
- [ ] Practical guidance for when to fine-tune

## Anti-Patterns to Avoid

1. **Skipping motivation**: Explain why each stage exists
2. **Too much RL math**: PPO intuition, not equations
3. **Missing practical guidance**: When to fine-tune matters
4. **Ignoring costs**: Compute requirements are real constraints
5. **Abstract alignment talk**: Ground in concrete examples
6. **No connection to practice**: Link to real decisions developers make

## Success Looks Like

After completing this module, learners should:

- Understand the full pipeline from raw model to aligned assistant
- Know when fine-tuning makes sense vs prompting
- Understand LoRA well enough to use it
- Grasp why RLHF matters for alignment
- Be ready to learn about tokenization and embeddings (Module 10)
