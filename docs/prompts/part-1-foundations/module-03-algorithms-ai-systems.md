# Build Module 3: Algorithms That Power AI Systems

## Mission

Build out Module 3 to connect classical algorithm concepts with their AI applications. This module shows how fundamental algorithmic ideas—search, optimization, sampling—form the computational backbone of modern AI. Learners should leave understanding gradient descent intuitively and knowing how generation parameters affect outputs.

**Context**: After data structures (Module 2), learners need to understand the algorithms that operate on those structures. This completes the computational foundation before moving to networking and APIs.

## Source Material

### Primary Content

- `/mnt/c/Users/simon/Code/trainer/modules/03-algorithms-ai-systems.md`

### Tone Reference

- `/mnt/c/Users/simon/Code/trainer/modules/01-developer-mental-model.md` - Gold standard for tone and style

### Reference Documents

- `/mnt/c/Users/simon/Code/trainer/docs/COURSE_OUTLINE.md` - Module specifications
- `/mnt/c/Users/simon/Code/trainer/docs/SITE_STRUCTURE.md` - Component patterns

## Critical: Understanding "Educational Prose"

### Wrong Approach

```markdown
## Gradient Descent

- Algorithm to minimize loss functions
- Uses derivatives to find direction of steepest descent
- Learning rate controls step size
- Can get stuck in local minima
```

### Correct Approach

```markdown
## Gradient Descent

Imagine you're blindfolded on a hilly landscape and need to reach the lowest point.
You can feel the slope under your feet. The obvious strategy: always step downhill.
Take a step, feel the new slope, step downhill again. Eventually, you'll reach a
valley. This is gradient descent.

The "gradient" is the slope—mathematically, it's the derivative of your position
with respect to height. The algorithm computes which direction is downhill, takes
a step, and repeats. In machine learning, the landscape is defined by a loss function
that measures how wrong your model is. Lower is better. The algorithm finds parameters
that minimize wrongness.
```

## Module Specifications

### Metadata

- **Title**: Algorithms That Power AI Systems
- **Part**: 1 - Foundations
- **Duration**: 1 hour 30 minutes
- **Difficulty**: Beginner-Intermediate
- **Prerequisites**: Module 2 (Data Structures)
- **Previous Module**: Module 2 - Data Structures for the AI Era
- **Next Module**: Module 4 - Networks, APIs, and AI Infrastructure

### Learning Objectives

1. Understand algorithmic foundations that make AI possible
2. Recognize gradient descent as the core optimization algorithm
3. Grasp search and optimization in AI contexts
4. Connect classical algorithms to modern AI implementations
5. Control generation behavior through sampling parameters

### Section Breakdown

#### Section 1: Algorithms in the Age of AI (10 min)

- Classical algorithms still matter in AI systems
- New algorithmic challenges AI introduces
- The shift from exact to approximate
- Preview of the module's journey

#### Section 2: Search Algorithms (20 min)

- Breadth-first and depth-first search in AI
- Best-first search and heuristics
- A\* and informed search
- Beam search for text generation
- The exploration-exploitation tradeoff

#### Section 3: Optimization Fundamentals (20 min)

- What is optimization?
- Local vs global optima
- The landscape metaphor
- Why optimization is central to ML
- Gradient-free methods (briefly)

#### Section 4: Gradient Descent Deep Dive (20 min)

- The blindfolded hiker analogy
- Computing gradients (intuition, not math)
- Learning rate and why it matters
- Stochastic gradient descent and batches
- Modern optimizers (Adam, AdamW) mentioned
- Backpropagation intuition

#### Section 5: Sampling and Generation (15 min)

- Deterministic vs stochastic outputs
- Temperature parameter explained
- Top-p (nucleus) sampling
- Top-k sampling
- Combining parameters
- When to use which settings

#### Section 6: Putting It Together (5 min)

- How algorithms combine in practice
- The training loop
- The inference loop
- Performance considerations

## Required Diagrams

### 1. Gradient Descent Visualization

3D surface with a ball rolling down toward minimum, showing gradient direction and step size.

### 2. Beam Search Tree

Tree showing how beam search explores multiple paths simultaneously, pruning at each level.

### 3. Sampling Distribution (Temperature Effects)

Probability distributions showing how temperature flattens or sharpens the distribution.

### 4. ANN vs Exact Search Trade-offs

Diagram comparing approximate nearest neighbor (fast, less accurate) vs exact search (slow, perfect).

### 5. Training vs Inference Loop

Side-by-side flowcharts showing the training loop (forward pass, loss, backward pass, update) vs inference loop.

## Knowledge Check Questions

### Question 1

**What is the primary purpose of gradient descent in machine learning?**

- A) To search through a database of examples
- B) To find parameter values that minimize a loss function
- C) To generate random samples
- D) To tokenize input text

**Correct**: B
**Explanation**: Gradient descent iteratively adjusts model parameters to minimize the loss function, which measures how wrong the model's predictions are.

### Question 2

**What does increasing the temperature parameter do during text generation?**

- A) Makes the model run faster
- B) Increases randomness by flattening the probability distribution
- C) Makes the model more deterministic
- D) Increases the context window size

**Correct**: B
**Explanation**: Higher temperature flattens the probability distribution, making all tokens more equally likely and thus outputs more random and creative.

### Question 3

**What is beam search used for in AI systems?**

- A) Training neural networks
- B) Computing gradients
- C) Exploring multiple generation paths and keeping the best candidates
- D) Tokenizing input text

**Correct**: C
**Explanation**: Beam search maintains multiple candidate sequences during generation, exploring different paths and ultimately selecting the highest-scoring complete sequence.

### Question 4

**Why is stochastic gradient descent (SGD) preferred over computing the gradient on the entire dataset?**

- A) It produces more accurate gradients
- B) It's computationally feasible for large datasets and provides useful noise
- C) It eliminates the need for a learning rate
- D) It only works with certain types of models

**Correct**: B
**Explanation**: Computing gradients on the entire dataset (batch gradient descent) is prohibitively expensive for large datasets. SGD approximates the gradient using small batches, which is computationally tractable and the noise can help escape local minima.

### Question 5

**What trade-off does approximate nearest neighbor (ANN) search make?**

- A) Speed for memory usage
- B) Accuracy for speed—it may miss the true nearest neighbors but runs much faster
- C) Memory for accuracy
- D) Training time for inference time

**Correct**: B
**Explanation**: ANN algorithms like HNSW and IVF sacrifice perfect accuracy for dramatically improved search speed, returning approximate (usually very good) nearest neighbors instead of guaranteed exact matches.

## Hands-On Exercise: Generation Parameters Lab

### Objective

Develop intuition for how temperature, top_p, and top_k affect AI text generation through systematic experimentation.

### Duration

45-60 minutes

### Prerequisites

- API access to an LLM (OpenAI, Anthropic, or open model)
- Python with requests or SDK installed

### Structure

**Part 1: Temperature Exploration (15 min)**

- Use the same prompt with temperature = 0.0, 0.3, 0.7, 1.0, 1.5
- Document differences in output
- Identify when high vs low temperature is appropriate
- Note the reproducibility at temperature 0

**Part 2: Top-p (Nucleus Sampling) (15 min)**

- Fix temperature at 1.0, vary top_p: 0.1, 0.5, 0.9, 1.0
- Observe how outputs change
- Compare to temperature effects
- Identify use cases for low vs high top_p

**Part 3: Top-k Sampling (10 min)**

- Experiment with top_k values: 1, 10, 50, 100
- Compare to top_p behavior
- Note when top_k vs top_p is preferred

**Part 4: Combined Parameters (15 min)**

- Create a test matrix of parameter combinations
- Find settings for: creative writing, factual Q&A, code generation
- Document your recommended settings per use case
- Identify problematic combinations

### Success Criteria

- [ ] Tested temperature across at least 4 values
- [ ] Tested top_p across at least 4 values
- [ ] Tested top_k across at least 3 values
- [ ] Documented observable differences
- [ ] Created recommended settings for 3 use cases
- [ ] Identified trade-offs between creativity and reliability

## References

### Foundational Resources

1. **"Gradient Descent, How Neural Networks Learn"** - 3Blue1Brown - Visual intuition for gradient descent
2. **"Neural Networks and Deep Learning"** - Michael Nielsen - Free online book with interactive visualizations
3. **"The Hundred-Page Machine Learning Book"** - Andriy Burkov - Concise algorithm explanations

### Technical Papers

4. **"Adam: A Method for Stochastic Optimization"** - Kingma & Ba (2014) - The Adam optimizer
5. **"The Curious Case of Neural Text Degeneration"** - Holtzman et al. (2019) - Nucleus sampling (top-p)

### Practical Resources

6. **OpenAI Tokenizer** - platform.openai.com/tokenizer - Visualize tokenization
7. **Hugging Face Transformers Documentation** - Generation parameters explained
8. **LLM Visualization** - bbycroft.net/llm - Interactive transformer visualization

### Deep Dives

9. **"Backpropagation"** - Distill.pub - Interactive backpropagation explanation
10. **"Why Momentum Really Works"** - Distill.pub - Optimizer intuition

## Tone Examples

### Building Intuition

```markdown
Imagine you're blindfolded on a hilly landscape and need to reach the lowest point.
You can feel the slope under your feet. The obvious strategy: always step downhill.
Take a step, feel the new slope, step downhill again. Eventually, you'll reach a
valley. This is gradient descent.
```

### Explaining Parameters

```markdown
Temperature controls how "peaked" the probability distribution is. At temperature 0,
the model always picks the most likely token—deterministic, boring, but reliable.
At temperature 1, it samples according to the raw probabilities—varied and creative.
At temperature 2, even unlikely tokens get picked—chaotic and often nonsensical.
```

### Connecting to Practice

```markdown
When you call an LLM API with temperature=0.7 and top_p=0.9, you're configuring
these sampling algorithms. The model doesn't generate a single answer; it generates
a probability distribution over all possible next tokens. These parameters decide
how to sample from that distribution.
```

## Completion Checklist

- [ ] All six sections written in flowing prose
- [ ] Each section matches specified time estimate
- [ ] All five diagrams render correctly in Mermaid
- [ ] Five knowledge check questions with explanations
- [ ] Hands-on exercise is complete with experimental design
- [ ] References section includes 10+ resources
- [ ] Gradient descent explained intuitively (no heavy math)
- [ ] Generation parameters thoroughly covered
- [ ] Clear connection between training algorithms and inference
- [ ] Code examples for API calls with parameters

## Anti-Patterns to Avoid

1. **Heavy math**: Use intuition and analogies, not equations
2. **Bullet list syndrome**: Prose paragraphs for explanations
3. **Missing the "so what"**: Always connect to AI applications
4. **Skipping sampling**: Generation parameters are crucial practical knowledge
5. **Abstract examples**: Use real prompts and outputs
6. **Ignoring trade-offs**: Every algorithm choice involves trade-offs

## Success Looks Like

After completing this module, learners should:

- Understand gradient descent at an intuitive level
- Know what happens when they set temperature, top_p, top_k
- Recognize search algorithms in AI contexts
- Understand the training-inference distinction
- Be ready to learn about how AI services are delivered (Module 4)
