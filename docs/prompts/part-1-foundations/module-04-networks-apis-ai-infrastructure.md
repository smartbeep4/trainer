# Build Module 4: Networks, APIs, and AI Infrastructure

## Mission

Build out Module 4 to cover how AI services are delivered over networks. This practical module teaches HTTP/REST fundamentals, AI API patterns (streaming, rate limiting, token counting), and the decision framework for local vs cloud AI. Learners should leave able to integrate AI APIs confidently.

**Context**: With data structures and algorithms covered, learners now need to understand how to actually access and use AI services. This is where theory meets practical integration.

## Source Material

### Primary Content

- `/mnt/c/Users/simon/Code/trainer/modules/04-networks-apis-ai-infrastructure.md`

### Tone Reference

- `/mnt/c/Users/simon/Code/trainer/modules/01-developer-mental-model.md` - Gold standard for tone and style

### Reference Documents

- `/mnt/c/Users/simon/Code/trainer/docs/COURSE_OUTLINE.md` - Module specifications
- `/mnt/c/Users/simon/Code/trainer/docs/SITE_STRUCTURE.md` - Component patterns

## Critical: Understanding "Educational Prose"

### Wrong Approach

```markdown
## API Authentication

- Use Bearer tokens in Authorization header
- Store keys in environment variables
- Never commit keys to version control
- Rotate keys periodically
```

### Correct Approach

```markdown
## API Authentication

Every AI API call needs to prove who you are. This happens through authentication
tokens—long strings that identify your account. You include this token in the
Authorization header of every request, and the API provider checks it before
processing your request.

The pattern looks like this: `Authorization: Bearer sk-...`. That "Bearer" prefix
tells the server you're providing a token (as opposed to other auth schemes).
The token itself is your secret—treat it like a password. Store it in environment
variables, never in code. Rotate it if it might have been exposed.
```

## Module Specifications

### Metadata

- **Title**: Networks, APIs, and AI Infrastructure
- **Part**: 1 - Foundations
- **Duration**: 1 hour 15 minutes
- **Difficulty**: Beginner
- **Prerequisites**: Module 3 (Algorithms)
- **Previous Module**: Module 3 - Algorithms That Power AI Systems
- **Next Module**: Module 5 - Databases and Data Management for AI

### Learning Objectives

1. Understand how AI services are delivered over networks
2. Master API concepts essential for AI integration
3. Recognize infrastructure patterns behind AI applications
4. Make informed decisions about local vs cloud AI

### Section Breakdown

#### Section 1: The Network Layer of AI (10 min)

- AI as a service over the internet
- Why most AI interactions are API calls
- The client-server model for AI
- What happens when you call an AI API

#### Section 2: HTTP and REST Fundamentals (15 min)

- HTTP request/response cycle
- Methods (POST dominates for AI)
- Headers that matter (Authorization, Content-Type)
- Status codes and error handling
- JSON as the lingua franca

#### Section 3: AI API Patterns (20 min)

- Common AI API structures (OpenAI, Anthropic, etc.)
- Request anatomy: model, messages, parameters
- Response anatomy: content, usage, metadata
- Streaming responses (Server-Sent Events)
- Why streaming matters for UX

#### Section 4: Working with AI API Responses (15 min)

- Parsing responses correctly
- Handling errors gracefully
- Rate limiting and backoff strategies
- Token counting and cost tracking
- Caching strategies

#### Section 5: Local vs. Cloud AI (10 min)

- When cloud makes sense (most cases)
- When local makes sense (privacy, cost, latency)
- Hybrid approaches
- The hardware question

#### Section 6: Performance Optimization (5 min)

- Latency sources and how to address them
- Batching requests
- Connection reuse
- Monitoring and observability

## Required Diagrams

### 1. AI API Request Flow

Sequence diagram showing: Client -> Request with auth -> AI Provider -> Model Inference -> Response stream -> Client.

### 2. Streaming vs Batch Comparison

Side-by-side timing diagrams showing user experience with streaming (tokens appear immediately) vs batch (wait for complete response).

### 3. Token Cost Calculator

Flowchart showing: Input tokens + Output tokens -> Pricing tier -> Cost, with example calculations.

### 4. Local vs Cloud Decision Matrix

Decision tree helping choose between local and cloud based on privacy, cost, latency, and capability requirements.

### 5. Rate Limiting and Backoff

Diagram showing exponential backoff pattern: Request -> 429 -> Wait 1s -> Retry -> 429 -> Wait 2s -> Retry -> Success.

## Knowledge Check Questions

### Question 1

**Why do most AI APIs use POST requests rather than GET?**

- A) POST is faster than GET
- B) POST can include a request body for complex prompts and parameters
- C) GET doesn't work with HTTPS
- D) POST is required for streaming responses

**Correct**: B
**Explanation**: AI requests typically include substantial data (prompts, conversation history, parameters) that doesn't fit in URL query strings. POST requests allow sending this data in the request body.

### Question 2

**What is Server-Sent Events (SSE) used for in AI APIs?**

- A) Sending multiple requests at once
- B) Streaming response tokens to the client as they're generated
- C) Authenticating requests
- D) Compressing response data

**Correct**: B
**Explanation**: SSE enables the server to push tokens to the client as they're generated, providing a responsive user experience where text appears progressively rather than all at once after a long wait.

### Question 3

**What is exponential backoff used for when calling AI APIs?**

- A) Speeding up requests
- B) Compressing request data
- C) Handling rate limiting by waiting progressively longer between retries
- D) Authenticating multiple users

**Correct**: C
**Explanation**: When you hit rate limits (429 errors), exponential backoff means waiting 1 second, then 2 seconds, then 4 seconds between retries—preventing overwhelming the API while eventually getting your request through.

### Question 4

**Why is token counting important when using AI APIs?**

- A) Tokens are used for authentication
- B) Input and output tokens directly determine API costs
- C) More tokens mean faster responses
- D) Token counts affect model accuracy

**Correct**: B
**Explanation**: AI API pricing is typically based on token count—both input tokens (your prompt and context) and output tokens (the model's response). Understanding and optimizing token usage directly impacts costs.

### Question 5

**When might local AI inference be preferred over cloud APIs?**

- A) When you need the largest, most capable models
- B) When you have strict data privacy requirements and cannot send data to external servers
- C) When you need the lowest possible cost per request
- D) When you want the simplest integration

**Correct**: B
**Explanation**: Local inference keeps data on your own infrastructure, never sending it to external providers. This is crucial for sensitive data, regulated industries, or air-gapped environments where data cannot leave your network.

## Hands-On Exercise: AI API Integration Project

### Objective

Build a complete AI API integration with proper error handling, streaming, rate limiting, and token tracking.

### Duration

45-60 minutes

### Prerequisites

- Python 3.8+
- API key for OpenAI, Anthropic, or similar
- requests library (or httpx for async)

### Structure

**Part 1: Basic Integration (15 min)**

- Make a simple API call
- Parse the response correctly
- Handle basic errors (invalid key, malformed request)
- Log the request/response cycle

**Part 2: Streaming Implementation (15 min)**

- Implement streaming response handling
- Display tokens as they arrive
- Handle stream interruption gracefully
- Compare UX to non-streaming

**Part 3: Production Hardening (15 min)**

- Implement exponential backoff for rate limits
- Add token counting and cost tracking
- Implement request timeout handling
- Add retry logic for transient errors

**Part 4: Integration Testing (15 min)**

- Test with various failure modes
- Verify rate limit handling works
- Confirm cost tracking accuracy
- Document edge cases discovered

### Success Criteria

- [ ] Successfully made authenticated API calls
- [ ] Implemented streaming with progressive display
- [ ] Exponential backoff works correctly
- [ ] Token usage is tracked accurately
- [ ] Errors are handled gracefully with useful messages
- [ ] Code is production-ready (not just a demo)

## References

### Official Documentation

1. **OpenAI API Reference** - platform.openai.com/docs/api-reference
2. **Anthropic API Reference** - docs.anthropic.com/claude/reference
3. **Google AI API Reference** - ai.google.dev/docs

### Technical Resources

4. **MDN HTTP Guide** - developer.mozilla.org/en-US/docs/Web/HTTP
5. **Server-Sent Events Specification** - html.spec.whatwg.org/multipage/server-sent-events.html

### Best Practices

6. **API Security Best Practices** - OWASP guidelines
7. **Rate Limiting Patterns** - Cloud provider documentation

### Tools

8. **tiktoken** - OpenAI's token counting library
9. **httpx** - Modern async HTTP client for Python
10. **Postman/Insomnia** - API testing tools

## Tone Examples

### Explaining Practical Concepts

```markdown
Every AI API call needs to prove who you are. This happens through authentication
tokens—long strings that identify your account. You include this token in the
Authorization header of every request, and the API provider checks it before
processing your request.
```

### Showing Real Patterns

```markdown
When the API returns a 429 (Too Many Requests), don't immediately retry. That's
the API telling you to slow down. Instead, implement exponential backoff: wait
1 second, retry, wait 2 seconds, retry, wait 4 seconds. Each failure doubles
the wait time, up to some maximum. This pattern respects the API's limits while
eventually getting your request through.
```

### Making Decisions Concrete

```markdown
Should you run AI locally or use cloud APIs? For most developers, cloud APIs
are the right choice—you get access to the most capable models without worrying
about hardware. Local makes sense when: you can't send data to external servers
(privacy/regulation), you're making thousands of requests and need to optimize
cost, or you need offline capability.
```

## Completion Checklist

- [ ] All six sections written in flowing prose
- [ ] Each section matches specified time estimate
- [ ] All five diagrams render correctly in Mermaid
- [ ] Five knowledge check questions with explanations
- [ ] Hands-on exercise produces working, production-quality code
- [ ] References section includes 10+ resources
- [ ] Streaming thoroughly explained and demonstrated
- [ ] Rate limiting and backoff covered with examples
- [ ] Token counting and cost tracking explained
- [ ] Code examples use real API patterns

## Anti-Patterns to Avoid

1. **Toy examples**: Code should be production-ready, not demo-quality
2. **Skipping error handling**: Real integrations must handle failures
3. **Ignoring streaming**: It's essential for good UX
4. **No cost awareness**: Token counting matters for real applications
5. **Abstract networking**: Be specific about HTTP, headers, status codes
6. **Missing security**: API key handling must be covered properly

## Success Looks Like

After completing this module, learners should:

- Be able to integrate any AI API confidently
- Understand streaming and implement it correctly
- Handle rate limiting and errors gracefully
- Track costs and optimize token usage
- Make informed local vs cloud decisions
- Be ready to learn about data storage for AI (Module 5)
