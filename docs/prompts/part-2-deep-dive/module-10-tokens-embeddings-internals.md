# Build Module 10: Tokens, Embeddings, and Model Internals

## Mission

Build out Module 10 to explain the mechanics of how text becomes numbers and flows through models. Cover tokenization, embedding lookup, and model internals with enough depth for learners to debug tokenization issues and understand model behavior.

**Context**: Learners understand architecture (Module 8) and training (Module 9). Now they need to understand the data flow—how text transforms into numbers that models can process.

## Source Material

### Primary Content

- `/mnt/c/Users/simon/Code/trainer/modules/10-tokens-embeddings-internals.md`

### Tone Reference

- `/mnt/c/Users/simon/Code/trainer/modules/01-developer-mental-model.md` - Gold standard for tone and style

### Reference Documents

- `/mnt/c/Users/simon/Code/trainer/docs/COURSE_OUTLINE.md` - Module specifications

## Critical: Understanding "Educational Prose"

### Wrong Approach

```markdown
## BPE Tokenization

- Starts with characters
- Merges frequent pairs
- Builds subword vocabulary
- Example: "unhappy" -> ["un", "happy"]
```

### Correct Approach

```markdown
## BPE: Building a Vocabulary from Scratch

Byte Pair Encoding starts with a simple question: if you had to represent any
text with a fixed vocabulary, how would you build that vocabulary?

Start with individual characters—you can always represent any text character by
character. But that's inefficient: "the" would be three tokens, "information"
would be eleven. So BPE looks at training data and asks: which pairs of tokens
appear together most frequently? Merge those into a single new token.

After enough merges, common words like "the" become single tokens, while rare
words get split into pieces. "Unhappiness" might become ["un", "happiness"],
while "running" stays whole because it's common. The algorithm finds the sweet
spot between vocabulary size and sequence length.
```

## Module Specifications

### Metadata

- **Title**: Tokens, Embeddings, and Model Internals
- **Part**: 2 - AI/ML Deep Dive
- **Duration**: 1 hour 30 minutes
- **Difficulty**: Intermediate
- **Prerequisites**: Module 9 (Training)
- **Previous Module**: Module 9 - Training, Fine-Tuning, and RLHF
- **Next Module**: Module 11 - Diffusion Models and Multimodal AI

### Learning Objectives

1. Understand how text becomes numbers (tokenization)
2. Grasp the embedding process and what embeddings represent
3. Recognize how model weights encode knowledge
4. Explore model internals through interpretability tools

### Section Breakdown

#### Section 1: The Tokenization Process (20 min)

- Why tokenization exists
- Character, word, and subword approaches
- BPE algorithm explained
- SentencePiece and variations
- Tokenization artifacts and quirks

#### Section 2: Vocabulary and Token IDs (15 min)

- What a vocabulary is
- Special tokens (BOS, EOS, PAD)
- Unknown token handling
- Vocabulary size trade-offs
- Different tokenizers for different models

#### Section 3: From Tokens to Embeddings (20 min)

- The embedding matrix
- Lookup operation
- What embedding dimensions represent
- Contextual vs static embeddings
- Position information

#### Section 4: Inside the Model: Weights and Computation (20 min)

- What model weights are
- How layers transform embeddings
- Residual stream concept
- The forward pass traced
- Memory and compute requirements

#### Section 5: Interpretability and Understanding (10 min)

- What we know about model internals
- Attention pattern analysis
- Probing classifiers
- Mechanistic interpretability
- What remains mysterious

#### Section 6: Practical Token Engineering (5 min)

- Token counting for cost estimation
- Prompt optimization for tokens
- Debugging tokenization issues
- Cross-tokenizer considerations

## Required Diagrams

### 1. BPE Tokenization Process

Step-by-step showing: Text -> Characters -> Merge pairs -> Subword vocabulary.

### 2. Embedding Space Projection

3D visualization of word embeddings with clusters labeled.

### 3. Token Through Transformer

Vertical flow showing a token's journey through: Embedding lookup -> Layers 1-N -> Output probabilities.

### 4. Context Window Visualization

Diagram showing token positions, context window limits, and truncation.

### 5. Attention Pattern Examples

Heat maps showing different attention patterns (diagonal, vertical, specific tokens).

## Knowledge Check Questions

### Question 1

**What is the main purpose of tokenization?**

- A) To compress text for storage
- B) To convert text into a sequence of integers that models can process
- C) To improve text readability
- D) To encrypt sensitive data

**Correct**: B
**Explanation**: Models work with numbers, not text. Tokenization converts text into integer token IDs that can be looked up in an embedding matrix and processed by the model.

### Question 2

**Why do most modern LLMs use subword tokenization (like BPE) rather than word-based tokenization?**

- A) It's faster to compute
- B) It handles rare words by splitting them into known pieces, while keeping common words whole
- C) It produces smaller file sizes
- D) It's required by the transformer architecture

**Correct**: B
**Explanation**: Word tokenization requires a huge vocabulary and can't handle unknown words. Character tokenization creates very long sequences. Subword tokenization is the sweet spot—common words are single tokens, rare words are split into known subwords.

### Question 3

**What is an embedding matrix?**

- A) A database of word definitions
- B) A lookup table where each row is the vector representation for a token ID
- C) A list of tokenization rules
- D) The output layer of a model

**Correct**: B
**Explanation**: The embedding matrix is a 2D array where rows correspond to token IDs and columns to embedding dimensions. Looking up token ID 42 means retrieving row 42 as that token's vector representation.

### Question 4

**Why does "ChatGPT" might tokenize differently than "chatgpt"?**

- A) The model has a case preference
- B) Tokenizers are case-sensitive; different cases produce different token sequences
- C) Uppercase uses more memory
- D) There's a bug in the tokenizer

**Correct**: B
**Explanation**: Most tokenizers are case-sensitive. "ChatGPT" and "chatgpt" are different byte sequences, so they may map to different token sequences. This affects token counts and can impact model behavior.

### Question 5

**What is the "residual stream" in transformer analysis?**

- A) A type of training data
- B) The main path of information flow through the model, with layers adding to it
- C) The attention mechanism
- D) A debugging tool

**Correct**: B
**Explanation**: The residual stream is a conceptual framework: each layer's output adds to a running representation. Information flows through residual connections, with each layer (attention, MLP) contributing modifications to this stream.

## Hands-On Exercise: Tokenization and Embedding Explorer

### Objective

Explore tokenization behaviors across different models and examine embedding spaces.

### Duration

45-60 minutes

### Prerequisites

- Python 3.8+
- tiktoken, transformers, sentence-transformers

### Structure

**Part 1: Tokenizer Comparison (15 min)**

- Load tokenizers from different models (GPT-4, Claude, Llama)
- Tokenize the same text with each
- Compare token counts and splits
- Find surprising differences

**Part 2: Finding Tokenization Artifacts (15 min)**

- Test edge cases (numbers, code, Unicode)
- Find examples where tokenization seems wrong
- Understand why artifacts occur
- Document implications for prompt design

**Part 3: Embedding Extraction (15 min)**

- Extract embeddings from a transformer
- Examine layer-by-layer changes
- Compare early vs late layer representations
- Visualize with dimensionality reduction

**Part 4: Practical Applications (15 min)**

- Build a token counter for cost estimation
- Implement chunking that respects token limits
- Test context window boundaries
- Document best practices

### Success Criteria

- [ ] Compared at least 3 tokenizers
- [ ] Found tokenization artifacts
- [ ] Extracted and visualized embeddings
- [ ] Built working token counter
- [ ] Documented surprising findings

## References

### Tokenization

1. **"Neural Machine Translation of Rare Words with Subword Units"** - BPE paper
2. **"SentencePiece"** - Kudo et al. - Alternative tokenization approach
3. **tiktoken** - OpenAI's fast tokenizer library
4. **Tokenizer Playground** - Hugging Face - Interactive tokenizer comparison

### Embeddings

5. **"Efficient Estimation of Word Representations"** - Word2Vec paper
6. **"Contextual Word Representations"** - ELMo paper
7. **Embedding Projector** - TensorFlow visualization tool

### Interpretability

8. **"A Mathematical Framework for Transformer Circuits"** - Anthropic
9. **TransformerLens** - Neel Nanda's library
10. **"In-context Learning and Induction Heads"** - Anthropic

## Tone Examples

### Explaining Mechanics

```markdown
Byte Pair Encoding starts with a simple question: if you had to represent any
text with a fixed vocabulary, how would you build that vocabulary? Start with
characters, then merge the most frequent pairs. After enough merges, common
words become single tokens while rare words split into pieces.
```

### Debugging Mindset

```markdown
When your prompt costs more tokens than expected, don't guess—check the actual
tokenization. "Hello world" might be 2 tokens in one model and 3 in another.
Code often tokenizes poorly: "def fibonacci(n):" could be 6 tokens, while
"function fibonacci(n) {" might be 8. Always verify with the actual tokenizer.
```

### Connecting to Practice

```markdown
Understanding tokenization saves money. A prompt that's 100 tokens in GPT-4's
tokenizer might be 130 tokens in another model's tokenizer. When you're making
millions of API calls, this difference adds up. Learn to think in tokens, not
words.
```

## Completion Checklist

- [ ] All six sections written in flowing prose
- [ ] Each section matches specified time estimate
- [ ] All five diagrams render correctly in Mermaid
- [ ] Five knowledge check questions with explanations
- [ ] Hands-on exercise explores real tokenization
- [ ] References section includes 10+ resources
- [ ] BPE explained intuitively
- [ ] Embedding lookup made concrete
- [ ] Practical token engineering covered
- [ ] Interpretability introduced appropriately

## Anti-Patterns to Avoid

1. **Too abstract**: Use concrete examples and actual tokenizations
2. **Ignoring artifacts**: Tokenization quirks matter in practice
3. **Skipping the numbers**: Show actual token IDs and embeddings
4. **No practical application**: Connect to cost, debugging, optimization
5. **Too much interpretability**: Brief introduction, not deep dive
6. **Missing cross-model differences**: Tokenizers vary significantly

## Success Looks Like

After completing this module, learners should:

- Understand how text becomes model input
- Be able to debug tokenization issues
- Know what embeddings represent
- Have basic intuition for model internals
- Be ready to learn about multimodal systems (Module 11)
