# Build Module 20: Capstone Project

## Mission

Build out Module 20 as the culminating project experience where learners synthesize all course learning into a complete AI application. This is not a teaching module but a guided project framework. Cover project selection, planning, implementation strategy, documentation requirements, and evaluation criteria. Learners should emerge with a portfolio-worthy AI application.

**Context**: Learners have completed Parts 1-3 (23 modules of foundational and practical AI knowledge). This module challenges them to demonstrate mastery through building, not just learning. It bridges education to real-world application.

## Source Material

### Primary Content

- `/mnt/c/Users/simon/Code/trainer/modules/20-capstone-project.md`

### Tone Reference

- `/mnt/c/Users/simon/Code/trainer/modules/01-developer-mental-model.md` - Gold standard for tone and style

### Reference Documents

- `/mnt/c/Users/simon/Code/trainer/docs/COURSE_OUTLINE.md` - Module specifications
- `/mnt/c/Users/simon/Code/trainer/docs/CAPSTONE.md` - Detailed project specifications

## Critical: Understanding the Capstone Difference

### Wrong Approach

```markdown
## Capstone Project

- Choose a project
- Build it
- Submit documentation
- Get evaluated
```

### Correct Approach

```markdown
## The Capstone Challenge

This is not a tutorial to follow. This is not a toy example. This is a real project
that solves a real problem, built to a professional standard.

Throughout this course, you learned concepts: how transformers work, how to prompt
effectively, how agents reason, how to build safely. Concepts matter, but what
separates knowledge from mastery is application.

The capstone forces you to make trade-offs (you cannot implement everything perfectly),
handle ambiguity (real problems are not well-specified), debug complexity (when your
agent fails on the 37th step, you must diagnose why), and ship something (a perfect
design that never ships is worthless; a working system with rough edges is valuable).

This is as close as a course can get to real-world software engineering with AI.
```

## Module Specifications

### Metadata

- **Title**: Capstone Project
- **Part**: 4 - Capstone & Advanced
- **Duration**: 4-8 hours (self-paced)
- **Difficulty**: Advanced
- **Prerequisites**: All of Parts 1-3 (Modules 1-19)
- **Previous Module**: Module 19 - Real-World Workflow Integration
- **Next Module**: Module 21 - Advanced: Evaluating AI Systems

### Learning Objectives

1. Synthesize course learning into a complete, production-ready AI application
2. Make informed architectural decisions and justify technical choices
3. Navigate real-world challenges including error handling, safety measures, and trade-offs
4. Document work professionally for technical audiences
5. Present projects effectively through demonstration and reflection

### Section Breakdown

#### Section 1: Capstone Overview (10 min)

- What the capstone project is and is not
- Why this matters for skill development
- Project options and complexity levels
- Deliverables required
- Evaluation approach
- Timeline and effort expectations

#### Section 2: Choosing Your Project (15 min)

- Decision framework for project selection
- Interest, skills, learning goals, time available
- Project option summaries
- Quick comparison matrix
- Making your choice

#### Section 3: Planning Phase (20 min)

- Why planning matters (resist the urge to code immediately)
- Defining success criteria
- Architecture decisions template
- Scope management (in scope, out of scope, stretch goals)
- Milestones and time estimates
- Risk assessment and mitigation

#### Section 4: Implementation Strategy (30 min)

- Start small, iterate
- Vertical slices over horizontal layers
- The 80/20 rule for AI projects
- Development best practices (version control, environment, API keys, costs)
- Error handling strategies
- Common pitfalls and how to avoid them
- Getting unstuck

#### Section 5: Documentation and Demo (20 min)

- README structure (what, how, features, limitations, future)
- Architecture document components
- Demo video structure and tips
- Reflection essay prompts
- Documentation checklist

#### Section 6: Submission and Next Steps (5 min)

- Submission process and checklist
- What comes after the capstone
- Evaluation rubric
- Final motivational guidance

## Required Diagrams

### 1. Project Selection Decision Tree

Flowchart: Document work? -> Exploration vs Structure -> Research Assistant or Knowledge Base. Code analysis? -> Code Review Agent. Infrastructure? -> Agent Platform. Own idea? -> Custom Proposal.

### 2. Implementation Iteration Flow

Show progression: Minimal viable feature -> Test end-to-end -> Add next feature -> Test again -> Repeat until complete. Emphasize working software at each step.

### 3. Project Architecture Template

Generic diagram: User Input -> Application Layer -> AI Components (LLM, Embeddings, Vector DB) -> Tools/External Services -> Output. Show common integration points.

### 4. Evaluation Rubric Visualization

Tree structure: Total Points (100) -> Technical Implementation (40) -> Code Quality, Functionality, Error Handling, Testing. Documentation (25). Safety (15). Demo/Communication (20).

### 5. Development Timeline

Gantt-style: Planning (1 hr) -> Core Implementation (2-5 hrs) -> Error Handling (30 min) -> Testing (45 min) -> Documentation (1 hr) -> Demo (45 min) -> Reflection (30 min).

## Project Options Summary

### Option A: Intelligent Research Assistant

RAG-powered system for document Q&A with citations. Core skills: embeddings, retrieval, citation tracking. Medium complexity.

### Option B: Code Review Agent

Multi-file code analysis for bugs, security, style. Core skills: AST parsing, multi-file context, synthesis. High complexity.

### Option C: Personal Knowledge Base

Semantic knowledge management with auto-tagging and connection discovery. Core skills: incremental indexing, semantic search. Medium complexity.

### Option D: Custom Agent Platform

Configuration-driven agent creation with tool library and orchestration. Core skills: sandboxing, flexible configuration. High complexity.

### Option E: Custom Proposal

Learner-proposed project demonstrating 5+ module concepts. Requires written proposal with scope, architecture, safety considerations.

## Evaluation Rubric

### Technical Implementation (40 points)

- Core Functionality (15 pts): Does it work end-to-end?
- Code Quality (10 pts): Clean, organized, readable
- Error Handling (8 pts): Graceful failures, retries
- Testing (7 pts): Critical paths covered

### Documentation (25 points)

- README Clarity (8 pts): Setup and usage clear
- Architecture Doc (10 pts): Design decisions explained
- Code Comments (4 pts): Complex logic documented
- Reflection Essay (3 pts): Thoughtful self-assessment

### Safety and Responsibility (15 points)

- Safety Measures (8 pts): Input validation, scope limits
- Input Validation (4 pts): Prevents injection, malformed input
- Disclosure (3 pts): AI-generated content clearly marked

### Demo and Communication (20 points)

- Demo Quality (10 pts): Clear walkthrough, working system
- Technical Explanation (7 pts): Explains decisions well
- Professionalism (3 pts): Polished presentation

## Hands-On Exercise: The Capstone Itself

### Objective

Build a complete, production-quality AI application that demonstrates mastery of course concepts.

### Duration

4-8 hours (self-paced, recommended over multiple sessions)

### Prerequisites

- Completion of Modules 1-19
- API access (Claude, OpenAI, or local models)
- Development environment set up
- Time commitment secured

### Structure

**Phase 1: Planning (1 hour)**

- Select project from options A-E
- Define success criteria (5-7 concrete items)
- Sketch architecture and data flow
- Choose technology stack
- Identify risks and mitigations
- Create milestone schedule

**Phase 2: Core Implementation (2-5 hours)**

- Set up project structure and dependencies
- Build minimal end-to-end flow first
- Iterate: add feature, test, repeat
- Document decisions as you make them
- Track time and progress

**Phase 3: Robustness (30-60 minutes)**

- Add error handling for common failures
- Implement retry logic where appropriate
- Test edge cases
- Verify graceful degradation

**Phase 4: Testing (45 minutes)**

- Write tests for critical paths
- Test happy path, edge cases, error scenarios
- Document known limitations

**Phase 5: Documentation (1-2 hours)**

- Complete README with all sections
- Write architecture document
- Add code comments for complex logic
- Prepare demo script

**Phase 6: Demo and Reflection (45-60 minutes)**

- Record 5-10 minute demo video
- Write 500-1000 word reflection essay
- Final review and submission

### Success Criteria

- [ ] Project successfully runs end-to-end
- [ ] At least 3 major features implemented
- [ ] Error handling for common failures
- [ ] Tests for critical functionality
- [ ] README complete with setup instructions
- [ ] Architecture document explains design decisions
- [ ] Demo video shows working system
- [ ] Reflection essay addresses learning and challenges

## References

### Course Modules Referenced

1. **Module 4**: Networks and APIs - API integration and error handling
2. **Module 5**: Databases and Data Management - Vector databases and storage
3. **Module 6**: Security Fundamentals - Input validation and safety
4. **Module 10**: Tokens, Embeddings, and Internals - Embedding generation
5. **Module 13**: Safe and Responsible AI Use - Safety measures
6. **Module 14**: Prompt Engineering Mastery - Effective prompts
7. **Module 15**: AI Agents - Architecture - Agent design patterns
8. **Module 16**: Tool Use and Function Calling - Tool integration
9. **Module 17**: Multi-Agent Orchestration - Coordination patterns
10. **Module 19**: Real-World Workflow Integration - Production patterns

### External Resources

11. **Pinecone Learning Center** - RAG implementation guides
12. **LangChain RAG Documentation** - Retrieval pipeline patterns
13. **Chroma Documentation** - Vector database for local development
14. **Tree-sitter Documentation** - Code parsing for Code Review project
15. **LangGraph Documentation** - Agent orchestration patterns
16. **The Twelve-Factor App** - Production best practices

### Community and Support

17. **Course Discussion Forum** - Peer support and questions
18. **LangChain Discord** - Framework-specific help
19. **r/MachineLearning** - General AI development discussions
20. **Dev.to AI Tag** - Project write-ups and tutorials

## Tone Examples

### Empowering Challenge

```markdown
This capstone is challenging by design. You are building something real, not following
a tutorial. You will encounter problems without obvious solutions. You will make
trade-offs. You will ship something imperfect.

This is what real software engineering with AI looks like.

The goal is not perfection. The goal is to demonstrate that you can take a problem
and build a working solution, make reasonable technical decisions, handle errors and
edge cases, document your work professionally, and reflect on your learning.

If you can do these things, you have succeeded.
```

### Practical Guidance

```markdown
The temptation is to start coding immediately. Resist this urge.

Poor planning leads to scope creep, architectural dead-ends, missing critical features,
and wasted time rewriting components. Good planning leads to clear scope, solid
foundation, predictable progress, and fewer surprises.

Spend 20 minutes planning now to save 2 hours later.
```

### Motivational Support

```markdown
When you feel overwhelmed, remember: you do not have to be perfect. A working V1 with
rough edges is far better than a perfect design that is 70% complete. Ship something
that works.

You have learned everything you need. This course has prepared you. Trust your knowledge.
When you get stuck, review the relevant module.

The learning happens in the struggle. The moments when you are stuck and have to figure
something out are when you learn the most.
```

## Completion Checklist

- [ ] All six sections written in practical, empowering prose
- [ ] Project options clearly explained with complexity ratings
- [ ] Planning templates provided (success criteria, architecture, risks)
- [ ] Implementation strategy covers iterative development
- [ ] All five diagrams render correctly in Mermaid
- [ ] Evaluation rubric clearly detailed with point breakdown
- [ ] Documentation requirements specified with examples
- [ ] Motivational guidance throughout
- [ ] References include both course modules and external resources
- [ ] Transition to Module 21 (Advanced Evaluation) noted

## Anti-Patterns to Avoid

1. **Tutorial mode**: This is not a step-by-step guide - learners must make decisions
2. **Overwhelming scope**: Keep requirements achievable in 4-8 hours
3. **Perfectionism encouragement**: Emphasize shipping over perfection
4. **Missing safety**: Evaluation must include responsible AI considerations
5. **Isolation**: Encourage community engagement for support
6. **Missing failure guidance**: Address what to do when stuck

## Success Looks Like

After completing this module, learners should:

- Have selected and planned their capstone project
- Understand the implementation approach (iterative, test-driven)
- Know documentation and demo requirements
- Be ready to build confidently with clear success criteria
- Understand evaluation criteria and how to meet them
- Feel challenged but supported in their project journey

## Part 4 Introduction Note

This module begins Part 4: Capstone & Advanced. Learners transitioning from Part 3 should feel they have all the technical knowledge needed. Part 4 is about application, advanced topics, and future direction. The capstone is the practical culmination of Parts 1-3.
