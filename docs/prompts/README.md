# Module Build-Out Prompts

This directory contains orchestration prompts for building out each of the 23 modules in the Developer of Tomorrow course. Each prompt guides a Sonnet agent to transform the raw module content into polished, interactive educational material.

## Directory Structure

```
prompts/
├── README.md                          # This file
├── part-1-foundations/                # Modules 1-6: CS fundamentals for AI
│   ├── module-01-developer-mental-model.md
│   ├── module-02-data-structures-ai-era.md
│   ├── module-03-algorithms-ai-systems.md
│   ├── module-04-networks-apis-ai-infrastructure.md
│   ├── module-05-databases-data-management-ai.md
│   └── module-06-security-fundamentals-ai.md
├── part-2-deep-dive/                  # Modules 7-12: How AI works
│   ├── module-07-journey-to-modern-ai.md
│   ├── module-08-transformer-revolution.md
│   ├── module-09-training-finetuning-rlhf.md
│   ├── module-10-tokens-embeddings-internals.md
│   ├── module-11-diffusion-multimodal-ai.md
│   └── module-12-reasoning-models-frontiers.md
├── part-3-agentic/                    # Modules 13-19: Safe use and agents
│   ├── module-13-safe-responsible-ai-use.md
│   ├── module-14-prompt-engineering-mastery.md
│   ├── module-15-ai-agents-architecture.md
│   ├── module-16-tool-use-function-calling.md
│   ├── module-17-multi-agent-orchestration.md
│   ├── module-18-framework-deep-dive.md
│   └── module-19-real-world-workflow-integration.md
└── part-4-capstone/                   # Modules 20-23: Projects and future
    ├── module-20-capstone-project.md
    ├── module-21-advanced-evaluating-ai.md
    ├── module-22-advanced-local-open-models.md
    └── module-23-future-ai-career.md
```

## Purpose

These prompts serve as detailed instructions for AI agents (primarily Claude Sonnet) to build out complete module implementations. Each prompt includes:

1. **Mission Statement**: Clear goal and context
2. **Source Material References**: Paths to existing content and tone models
3. **Writing Style Guidance**: Examples of correct vs incorrect prose
4. **Section Specifications**: Detailed breakdown with time estimates
5. **Diagram Requirements**: 4-5 Mermaid diagrams per module
6. **Knowledge Check Questions**: 4-5 questions with explanations
7. **Hands-On Exercise**: 45-60 minute practical lab
8. **References Section**: Curated learning resources
9. **Completion Checklist**: Success criteria
10. **Anti-Patterns**: What to avoid

## Usage

To build out a module, provide the relevant prompt to a capable AI assistant:

```bash
# Example workflow
1. Read the prompt file for the target module
2. Provide to Claude Sonnet or similar
3. Agent reads source material and reference files
4. Agent produces complete module build-out
5. Review and iterate as needed
```

## Key Principles

### Educational Prose Style

All modules must use flowing, conversational prose rather than bulleted lists:

**Wrong**:

```markdown
## Hash Tables

- O(1) average lookup
- Uses hash functions
- Good for key-value storage
```

**Correct**:

```markdown
## Hash Tables

Hash tables solve a fundamental problem: how do you find something in a massive
collection without searching through everything? The answer is elegant: compute
where it should be stored, then go directly there. This gives you O(1) average-case
lookup, meaning that finding an item takes the same time whether you have ten
items or ten million.
```

### Tone Model

Module 1 serves as the gold standard for tone and style. All prompts reference it for:

- Conversational but authoritative voice
- Real-world examples and analogies
- Building intuition before definitions
- Connecting concepts to practical application

### Diagram Standards

Each module includes 4-5 Mermaid diagrams that:

- Illustrate concepts visually
- Support both light and dark themes
- Use consistent color coding (green for success, blue for primary, orange for warning)
- Are referenced and explained in surrounding prose

## Special Cases

### Module 20: Capstone Project

This module uses a different template focused on:

- Project selection guidance
- Planning and architecture phases
- Implementation strategies
- Documentation and demo requirements
- Mentorship tone rather than lecture

### Module 23: Future and Career

This concluding module adapts the template for:

- Forward-looking, inspirational content
- Reflection questions instead of traditional quiz
- Career development roadmap
- Course journey wrap-up

## Quality Checklist

Each completed module should:

- [ ] Use prose paragraphs, not bulleted lists for main content
- [ ] Include 4-5 working Mermaid diagrams
- [ ] Have 4-5 knowledge check questions with explanations
- [ ] Provide a 45-60 minute hands-on exercise
- [ ] Include 10-15 curated references
- [ ] Match Module 1's tone and style
- [ ] Be mobile-responsive
- [ ] Pass all technical accuracy checks

## Contributing

When creating new prompts or updating existing ones:

1. Follow the established template structure
2. Reference the COURSE_OUTLINE.md for accurate specifications
3. Ensure consistency with existing modules
4. Test prompts with actual agent execution
5. Update this README if structure changes
