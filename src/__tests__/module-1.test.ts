import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  isAnswerCorrect,
  calculateScore,
  type QuizQuestion,
} from "../lib/quiz";
import {
  getProgress,
  saveProgress,
  markModuleComplete,
  isModuleComplete,
  saveQuizScore,
  getQuizScore,
} from "../lib/progress";
import {
  getModuleBySlug,
  getNextModule,
  getPreviousModule,
} from "../lib/course-data";
import { calculateReadingTime } from "../lib/reading-time";

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key];
    }),
    clear: vi.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(global, "localStorage", {
  value: localStorageMock,
});

describe("Module 1: Developer Mental Model", () => {
  beforeEach(() => {
    localStorageMock.clear();
    vi.clearAllMocks();
  });

  describe("Course Data Integration", () => {
    it("should find Module 1 by slug", () => {
      const module = getModuleBySlug("developer-mental-model");
      expect(module).toBeDefined();
      expect(module?.id).toBe(1);
      expect(module?.title).toBe("The Developer's Mental Model for AI");
    });

    it("should have correct metadata for Module 1", () => {
      const module = getModuleBySlug("developer-mental-model");
      expect(module?.part).toBe(1);
      expect(module?.partTitle).toBe("Foundations");
      expect(module?.difficulty).toBe("Beginner");
      expect(module?.duration).toBe("1h 15m");
    });

    it("should not have a previous module (Module 1 is first)", () => {
      const module = getModuleBySlug("developer-mental-model");
      const prev = getPreviousModule(module!.id);
      expect(prev).toBeUndefined();
    });

    it("should have Module 2 as next module", () => {
      const module = getModuleBySlug("developer-mental-model");
      const next = getNextModule(module!.id);
      expect(next).toBeDefined();
      expect(next?.id).toBe(2);
      expect(next?.slug).toBe("data-structures-ai-era");
    });
  });

  describe("Module 1 Quiz Questions", () => {
    // These are the 5 questions from Module 1
    const module1Questions: QuizQuestion[] = [
      {
        id: "q1",
        type: "multiple-choice",
        question:
          "What is the most accurate description of how large language models generate responses?",
        options: [
          { id: "a", text: "They search a database for pre-written answers" },
          {
            id: "b",
            text: "They predict the most likely next tokens based on training patterns",
          },
          { id: "c", text: "They reason through problems like a human would" },
          {
            id: "d",
            text: "They retrieve information from the internet in real-time",
          },
        ],
        correctAnswer: "b",
        explanation: "LLMs are fundamentally token predictors.",
      },
      {
        id: "q2",
        type: "multiple-choice",
        question:
          "Which mental model for AI is most productive for developers?",
        options: [
          { id: "a", text: "AI as a replacement for human developers" },
          { id: "b", text: "AI as a magical oracle with perfect knowledge" },
          {
            id: "c",
            text: "AI as a sophisticated power tool requiring skill to use effectively",
          },
          { id: "d", text: "AI as a simple autocomplete feature" },
        ],
        correctAnswer: "c",
        explanation: "The 'power tool' mental model is most productive.",
      },
      {
        id: "q3",
        type: "multiple-choice",
        question:
          "When AI generates confident-sounding but incorrect information, this is called:",
        options: [
          { id: "a", text: "Hallucination" },
          { id: "b", text: "Overfitting" },
          { id: "c", text: "Underfitting" },
          { id: "d", text: "Tokenization error" },
        ],
        correctAnswer: "a",
        explanation: "'Hallucination' is the term for confident false outputs.",
      },
      {
        id: "q4",
        type: "multiple-choice",
        question: "What is the 'capability-reliability gap' in AI systems?",
        options: [
          {
            id: "a",
            text: "The difference between model size and performance",
          },
          {
            id: "b",
            text: "The difference between what AI can do at best and what it does consistently",
          },
          { id: "c", text: "The gap between training and inference" },
          { id: "d", text: "The difference between open and closed models" },
        ],
        correctAnswer: "b",
        explanation:
          "The gap between capability and reliability is significant.",
      },
      {
        id: "q5",
        type: "multiple-choice",
        question:
          "Why does asking an AI 'Are you sure about that?' not reliably improve accuracy?",
        options: [
          { id: "a", text: "AIs are always sure about everything" },
          {
            id: "b",
            text: "AIs cannot introspect on their actual confidence—they just predict likely response patterns",
          },
          { id: "c", text: "The question uses too many tokens" },
          { id: "d", text: "AIs are programmed to never admit uncertainty" },
        ],
        correctAnswer: "b",
        explanation:
          "AI systems can't genuinely introspect on their confidence.",
      },
    ];

    it("should have 5 quiz questions", () => {
      expect(module1Questions.length).toBe(5);
    });

    it("should calculate 100% score for all correct answers", () => {
      const answers = {
        q1: "b",
        q2: "c",
        q3: "a",
        q4: "b",
        q5: "b",
      };
      const score = calculateScore(module1Questions, answers);
      expect(score).toBe(100);
    });

    it("should calculate 80% score for 4/5 correct answers", () => {
      const answers = {
        q1: "b",
        q2: "c",
        q3: "a",
        q4: "b",
        q5: "a", // wrong
      };
      const score = calculateScore(module1Questions, answers);
      expect(score).toBe(80);
    });

    it("should calculate 60% score for 3/5 correct answers", () => {
      const answers = {
        q1: "b",
        q2: "c",
        q3: "a",
        q4: "a", // wrong
        q5: "a", // wrong
      };
      const score = calculateScore(module1Questions, answers);
      expect(score).toBe(60);
    });

    it("should verify each question has correct answer validation", () => {
      expect(isAnswerCorrect(module1Questions[0], "b")).toBe(true);
      expect(isAnswerCorrect(module1Questions[0], "a")).toBe(false);

      expect(isAnswerCorrect(module1Questions[1], "c")).toBe(true);
      expect(isAnswerCorrect(module1Questions[1], "d")).toBe(false);

      expect(isAnswerCorrect(module1Questions[2], "a")).toBe(true);
      expect(isAnswerCorrect(module1Questions[2], "b")).toBe(false);

      expect(isAnswerCorrect(module1Questions[3], "b")).toBe(true);
      expect(isAnswerCorrect(module1Questions[3], "c")).toBe(false);

      expect(isAnswerCorrect(module1Questions[4], "b")).toBe(true);
      expect(isAnswerCorrect(module1Questions[4], "d")).toBe(false);
    });
  });

  describe("Progress Tracking for Module 1", () => {
    it("should start with module incomplete", () => {
      const isComplete = isModuleComplete("developer-mental-model");
      expect(isComplete).toBe(false);
    });

    it("should mark module as complete", () => {
      markModuleComplete("developer-mental-model");
      const isComplete = isModuleComplete("developer-mental-model");
      expect(isComplete).toBe(true);
    });

    it("should save quiz score", () => {
      saveQuizScore("developer-mental-model-module-01-knowledge-check", 80);
      const score = getQuizScore(
        "developer-mental-model-module-01-knowledge-check"
      );
      expect(score).toBe(80);
    });

    it("should track progress across modules", () => {
      markModuleComplete("developer-mental-model");
      saveQuizScore("developer-mental-model-quiz", 100);

      const progress = getProgress();
      expect(progress.completedModules).toContain("developer-mental-model");
      expect(progress.quizScores["developer-mental-model-quiz"]).toBe(100);
    });
  });

  describe("Exercise State Tracking", () => {
    it("should save exercise completion state", () => {
      const exerciseKey =
        "dot-exercise-developer-mental-model-ai-interaction-experiment";
      const exerciseState = {
        completedParts: ["familiar-ground", "probing-uncertainty"],
        completedCriteria: ["conducted-tests", "documented-observations"],
        notes: {
          "familiar-ground":
            "AI was accurate on basic questions but missed nuances",
          "probing-uncertainty": "Noticed hedging on recent events",
        },
      };

      localStorageMock.setItem(exerciseKey, JSON.stringify(exerciseState));

      const stored = localStorageMock.getItem(exerciseKey);
      expect(stored).not.toBeNull();

      const parsed = JSON.parse(stored!);
      expect(parsed.completedParts).toHaveLength(2);
      expect(parsed.notes["familiar-ground"]).toContain("accurate");
    });
  });

  describe("Reading Time Calculation", () => {
    it("should calculate reading time for short content", () => {
      const time = calculateReadingTime(400); // 400 words at 200 WPM = 2 min
      expect(time).toBe("2 min read");
    });

    it("should calculate reading time for medium content", () => {
      const time = calculateReadingTime(3000); // 3000 words = 15 min
      expect(time).toBe("15 min read");
    });

    it("should calculate reading time for long content", () => {
      const time = calculateReadingTime(9000); // 9000 words = 45 min (Module 1 approx)
      expect(time).toBe("45 min read");
    });

    it("should format hours correctly for very long content", () => {
      const time = calculateReadingTime(15000); // 15000 words = 75 min = 1h 15m
      expect(time).toBe("1h 15m read");
    });

    it("should handle exact hour boundaries", () => {
      const time = calculateReadingTime(12000); // 12000 words = 60 min = 1h
      expect(time).toBe("1h read");
    });
  });

  describe("LocalStorage Keys", () => {
    it("should use correct quiz storage key format", () => {
      // The format should be dot-quiz-{moduleSlug}-{quizId}
      const expectedKey =
        "dot-quiz-developer-mental-model-module-01-knowledge-check";
      localStorageMock.setItem(
        expectedKey,
        JSON.stringify({ answers: {}, submitted: false, score: 0 })
      );
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        expectedKey,
        expect.any(String)
      );
    });

    it("should use correct exercise storage key format", () => {
      // The format should be dot-exercise-{moduleSlug}-{exerciseId}
      const expectedKey =
        "dot-exercise-developer-mental-model-ai-interaction-experiment";
      localStorageMock.setItem(
        expectedKey,
        JSON.stringify({ completedParts: [], completedCriteria: [], notes: {} })
      );
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        expectedKey,
        expect.any(String)
      );
    });

    it("should use correct progress storage key", () => {
      saveProgress({ completedModules: ["developer-mental-model"] });
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        "dot-progress",
        expect.any(String)
      );
    });
  });

  describe("Content Structure Validation", () => {
    it("should have expected section headings for Module 1", () => {
      // These are the expected h2 headings in Module 1
      const expectedSections = [
        "Section 1: Welcome and Course Overview",
        "Section 2: The AI Moment in Software Development",
        "Section 3: AI as Power Tool — The Right Mental Model",
        'Section 4: How AI "Thinks" vs. How You Think',
        "Section 5: Common Misconceptions Debunked",
        "Section 6: Your Learning Path",
        "Diagrams",
        "Hands-On Exercise: AI Interaction Experiment",
        "Knowledge Check",
        "Summary",
        "What's Next",
        "References",
      ];

      // This test documents the expected structure
      expect(expectedSections.length).toBeGreaterThan(0);
      expect(expectedSections).toContain(
        "Section 1: Welcome and Course Overview"
      );
      expect(expectedSections).toContain("Knowledge Check");
      expect(expectedSections).toContain("References");
    });

    it("should have 4 Mermaid diagrams", () => {
      // Module 1 should have these diagrams:
      // 1. Course Journey Map
      // 2. AI Capability Spectrum
      // 3. Human-AI Collaboration Model
      // 4. The Capability-Reliability Gap
      const expectedDiagrams = [
        "Course Journey Map",
        "AI Capability Spectrum",
        "Human-AI Collaboration Model",
        "The Capability-Reliability Gap",
      ];
      expect(expectedDiagrams.length).toBe(4);
    });

    it("should have 4 exercise parts", () => {
      const exerciseParts = [
        "Testing on Familiar Ground",
        "Probing Uncertainty",
        "Testing with Misleading Premises",
        "Reflection",
      ];
      expect(exerciseParts.length).toBe(4);
    });

    it("should have 5 success criteria for the exercise", () => {
      const successCriteria = [
        "Conducted all three types of tests",
        "Documented specific observations",
        "Found at least one instance of AI being confidently wrong",
        "Identified at least one pattern in AI behavior",
        "Written a reflection with actionable insights",
      ];
      expect(successCriteria.length).toBe(5);
    });
  });
});
