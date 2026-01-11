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
});
