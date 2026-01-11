import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  getProgress,
  saveProgress,
  markLessonComplete,
  markModuleComplete,
  isLessonComplete,
  isModuleComplete,
  saveQuizScore,
  getQuizScore,
  getCompletionPercentage,
  resetProgress,
  collectExportData,
  encodeProgressData,
  decodeProgressData,
  importProgressData,
  type ExportData,
} from "../lib/progress";

// Mock localStorage
let mockStore: Record<string, string> = {};

const localStorageMock = {
  getItem: vi.fn((key: string) => mockStore[key] || null),
  setItem: vi.fn((key: string, value: string) => {
    mockStore[key] = value;
  }),
  removeItem: vi.fn((key: string) => {
    delete mockStore[key];
  }),
  clear: vi.fn(() => {
    mockStore = {};
  }),
  key: vi.fn((index: number) => Object.keys(mockStore)[index] || null),
  get length() {
    return Object.keys(mockStore).length;
  },
};

Object.defineProperty(global, "localStorage", {
  value: localStorageMock,
  writable: true,
});

describe("Progress Module", () => {
  beforeEach(() => {
    mockStore = {};
    vi.clearAllMocks();
  });

  describe("getProgress", () => {
    it("returns default progress when localStorage is empty", () => {
      const progress = getProgress();
      expect(progress.completedLessons).toEqual([]);
      expect(progress.completedModules).toEqual([]);
      expect(progress.quizScores).toEqual({});
    });

    it("returns saved progress from localStorage", () => {
      const savedProgress = {
        completedLessons: ["lesson-1"],
        completedModules: ["module-1"],
        quizScores: { "quiz-1": 85 },
        lastVisited: "lesson-1",
        startedAt: "2024-01-01",
        totalTimeSpent: 60,
      };
      mockStore["dot-progress"] = JSON.stringify(savedProgress);

      const progress = getProgress();
      expect(progress.completedLessons).toEqual(["lesson-1"]);
      expect(progress.completedModules).toEqual(["module-1"]);
      expect(progress.quizScores).toEqual({ "quiz-1": 85 });
    });
  });

  describe("saveProgress", () => {
    it("saves progress to localStorage", () => {
      saveProgress({ completedLessons: ["lesson-1"] });
      expect(localStorageMock.setItem).toHaveBeenCalled();
    });
  });

  describe("markLessonComplete", () => {
    it("adds lesson to completed list", () => {
      markLessonComplete("lesson-1");
      expect(localStorageMock.setItem).toHaveBeenCalled();
    });

    it("does not duplicate lessons", () => {
      const progress = {
        completedLessons: ["lesson-1"],
        completedModules: [],
        quizScores: {},
        lastVisited: "",
        startedAt: "",
        totalTimeSpent: 0,
      };
      mockStore["dot-progress"] = JSON.stringify(progress);

      markLessonComplete("lesson-1");
      // Since lesson-1 is already completed, it should not be added again
      // The function checks before adding
      const savedData = JSON.parse(mockStore["dot-progress"]);
      expect(
        savedData.completedLessons.filter((l: string) => l === "lesson-1")
          .length
      ).toBe(1);
    });
  });

  describe("isLessonComplete", () => {
    it("returns true for completed lessons", () => {
      const progress = {
        completedLessons: ["lesson-1"],
        completedModules: [],
        quizScores: {},
        lastVisited: "",
        startedAt: "",
        totalTimeSpent: 0,
      };
      mockStore["dot-progress"] = JSON.stringify(progress);

      expect(isLessonComplete("lesson-1")).toBe(true);
    });

    it("returns false for incomplete lessons", () => {
      expect(isLessonComplete("lesson-999")).toBe(false);
    });
  });

  describe("markModuleComplete", () => {
    it("adds module to completed list", () => {
      markModuleComplete("module-1");
      expect(localStorageMock.setItem).toHaveBeenCalled();
    });
  });

  describe("isModuleComplete", () => {
    it("returns true for completed modules", () => {
      const progress = {
        completedLessons: [],
        completedModules: ["module-1"],
        quizScores: {},
        lastVisited: "",
        startedAt: "",
        totalTimeSpent: 0,
      };
      mockStore["dot-progress"] = JSON.stringify(progress);

      expect(isModuleComplete("module-1")).toBe(true);
    });
  });

  describe("quizScores", () => {
    it("saves and retrieves quiz scores", () => {
      saveQuizScore("quiz-1", 90);
      expect(localStorageMock.setItem).toHaveBeenCalled();
    });

    it("returns undefined for untaken quizzes", () => {
      expect(getQuizScore("quiz-999")).toBeUndefined();
    });
  });

  describe("getCompletionPercentage", () => {
    it("returns 0 when no modules completed", () => {
      expect(getCompletionPercentage(23)).toBe(0);
    });

    it("calculates correct percentage", () => {
      const progress = {
        completedLessons: [],
        completedModules: ["m1", "m2", "m3"],
        quizScores: {},
        lastVisited: "",
        startedAt: "",
        totalTimeSpent: 0,
      };
      mockStore["dot-progress"] = JSON.stringify(progress);

      expect(getCompletionPercentage(10)).toBe(30);
    });

    it("returns 0 when total is 0", () => {
      expect(getCompletionPercentage(0)).toBe(0);
    });
  });

  describe("resetProgress", () => {
    it("removes progress from localStorage", () => {
      resetProgress();
      expect(localStorageMock.removeItem).toHaveBeenCalledWith("dot-progress");
    });
  });

  describe("Export/Import", () => {
    describe("collectExportData", () => {
      it("collects progress and quiz states", () => {
        const progress = {
          completedLessons: ["lesson-1"],
          completedModules: ["module-1"],
          quizScores: { "quiz-1": 85 },
          lastVisited: "lesson-1",
          startedAt: "2024-01-01",
          totalTimeSpent: 60,
        };
        mockStore["dot-progress"] = JSON.stringify(progress);
        mockStore["dot-quiz-module-1-quiz-1"] = JSON.stringify({
          answers: { q1: "a" },
          submitted: true,
          score: 85,
        });

        const data = collectExportData();

        expect(data.version).toBe(1);
        expect(data.progress.completedModules).toEqual(["module-1"]);
        expect(data.quizStates["dot-quiz-module-1-quiz-1"]).toBeDefined();
      });
    });

    describe("encodeProgressData / decodeProgressData", () => {
      it("round-trips data correctly", () => {
        const testData: ExportData = {
          version: 1,
          exportedAt: "2024-01-01T00:00:00.000Z",
          progress: {
            completedLessons: ["lesson-1", "lesson-2"],
            completedModules: ["module-1"],
            quizScores: { "quiz-1": 90 },
            lastVisited: "lesson-2",
            startedAt: "2024-01-01",
            totalTimeSpent: 120,
          },
          quizStates: {
            "dot-quiz-module-1-quiz-1": { score: 90, submitted: true },
          },
        };

        const encoded = encodeProgressData(testData);
        const decoded = decodeProgressData(encoded);

        expect(decoded).not.toBeNull();
        expect(decoded?.version).toBe(1);
        expect(decoded?.progress.completedModules).toEqual(["module-1"]);
        expect(decoded?.progress.quizScores["quiz-1"]).toBe(90);
      });

      it("returns null for invalid encoded data", () => {
        expect(decodeProgressData("invalid-base64!@#$")).toBeNull();
      });

      it("returns null for missing version", () => {
        const invalidData = { progress: {} };
        const encoded = encodeProgressData(invalidData as ExportData);
        expect(decodeProgressData(encoded)).toBeNull();
      });
    });

    describe("importProgressData", () => {
      it("imports progress and quiz states", () => {
        // Setup existing data that should be overwritten
        mockStore["dot-progress"] = JSON.stringify({ completedModules: [] });
        mockStore["dot-quiz-old-quiz"] = JSON.stringify({ score: 50 });

        const importData: ExportData = {
          version: 1,
          exportedAt: "2024-01-01T00:00:00.000Z",
          progress: {
            completedLessons: ["lesson-1"],
            completedModules: ["module-1", "module-2"],
            quizScores: { "quiz-1": 95 },
            lastVisited: "lesson-1",
            startedAt: "2024-01-01",
            totalTimeSpent: 180,
          },
          quizStates: {
            "dot-quiz-module-1-quiz-1": { score: 95, submitted: true },
          },
        };

        const result = importProgressData(importData);

        expect(result).toBe(true);
        expect(localStorageMock.setItem).toHaveBeenCalledWith(
          "dot-progress",
          expect.any(String)
        );
      });
    });
  });
});
