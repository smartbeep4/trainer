import { describe, it, expect } from "vitest";
import {
  isAnswerCorrect,
  calculateScore,
  isQuizPassed,
  type QuizQuestion,
} from "../lib/quiz";

describe("Quiz Module", () => {
  const multipleChoiceQuestion: QuizQuestion = {
    id: "q1",
    type: "multiple-choice",
    question: "What is 2 + 2?",
    options: [
      { id: "a", text: "3" },
      { id: "b", text: "4" },
      { id: "c", text: "5" },
    ],
    correctAnswer: "b",
    explanation: "2 + 2 = 4",
  };

  const multipleSelectQuestion: QuizQuestion = {
    id: "q2",
    type: "multiple-select",
    question: "Select all prime numbers",
    options: [
      { id: "a", text: "2" },
      { id: "b", text: "3" },
      { id: "c", text: "4" },
      { id: "d", text: "5" },
    ],
    correctAnswer: ["a", "b", "d"],
    explanation: "2, 3, and 5 are prime numbers",
  };

  describe("isAnswerCorrect", () => {
    it("returns true for correct multiple choice answer", () => {
      expect(isAnswerCorrect(multipleChoiceQuestion, "b")).toBe(true);
    });

    it("returns false for incorrect multiple choice answer", () => {
      expect(isAnswerCorrect(multipleChoiceQuestion, "a")).toBe(false);
    });

    it("returns true for correct multiple select answer", () => {
      expect(isAnswerCorrect(multipleSelectQuestion, ["a", "b", "d"])).toBe(
        true
      );
    });

    it("returns true for correct multiple select answer in different order", () => {
      expect(isAnswerCorrect(multipleSelectQuestion, ["d", "a", "b"])).toBe(
        true
      );
    });

    it("returns false for incomplete multiple select answer", () => {
      expect(isAnswerCorrect(multipleSelectQuestion, ["a", "b"])).toBe(false);
    });

    it("returns false for wrong multiple select answer", () => {
      expect(isAnswerCorrect(multipleSelectQuestion, ["a", "b", "c"])).toBe(
        false
      );
    });

    it("returns false for multiple select with non-array answer", () => {
      expect(isAnswerCorrect(multipleSelectQuestion, "a")).toBe(false);
    });
  });

  describe("calculateScore", () => {
    const questions: QuizQuestion[] = [
      {
        id: "q1",
        type: "multiple-choice",
        question: "Q1",
        options: [
          { id: "a", text: "A" },
          { id: "b", text: "B" },
        ],
        correctAnswer: "a",
        explanation: "",
      },
      {
        id: "q2",
        type: "multiple-choice",
        question: "Q2",
        options: [
          { id: "a", text: "A" },
          { id: "b", text: "B" },
        ],
        correctAnswer: "b",
        explanation: "",
      },
      {
        id: "q3",
        type: "multiple-choice",
        question: "Q3",
        options: [
          { id: "a", text: "A" },
          { id: "b", text: "B" },
        ],
        correctAnswer: "a",
        explanation: "",
      },
      {
        id: "q4",
        type: "multiple-choice",
        question: "Q4",
        options: [
          { id: "a", text: "A" },
          { id: "b", text: "B" },
        ],
        correctAnswer: "b",
        explanation: "",
      },
    ];

    it("returns 100 for all correct answers", () => {
      const answers = {
        q1: "a",
        q2: "b",
        q3: "a",
        q4: "b",
      };
      expect(calculateScore(questions, answers)).toBe(100);
    });

    it("returns 0 for all incorrect answers", () => {
      const answers = {
        q1: "b",
        q2: "a",
        q3: "b",
        q4: "a",
      };
      expect(calculateScore(questions, answers)).toBe(0);
    });

    it("returns 50 for half correct answers", () => {
      const answers = {
        q1: "a",
        q2: "b",
        q3: "b",
        q4: "a",
      };
      expect(calculateScore(questions, answers)).toBe(50);
    });

    it("returns 75 for 3 out of 4 correct", () => {
      const answers = {
        q1: "a",
        q2: "b",
        q3: "a",
        q4: "a",
      };
      expect(calculateScore(questions, answers)).toBe(75);
    });

    it("handles missing answers as incorrect", () => {
      const answers = {
        q1: "a",
        q2: "b",
      };
      expect(calculateScore(questions, answers)).toBe(50);
    });
  });

  describe("isQuizPassed", () => {
    it("returns true for score at passing threshold", () => {
      expect(isQuizPassed(70, 70)).toBe(true);
    });

    it("returns true for score above passing threshold", () => {
      expect(isQuizPassed(85, 70)).toBe(true);
    });

    it("returns false for score below passing threshold", () => {
      expect(isQuizPassed(65, 70)).toBe(false);
    });

    it("uses default passing score of 70", () => {
      expect(isQuizPassed(70)).toBe(true);
      expect(isQuizPassed(69)).toBe(false);
    });

    it("handles custom passing scores", () => {
      expect(isQuizPassed(80, 80)).toBe(true);
      expect(isQuizPassed(79, 80)).toBe(false);
    });
  });
});
