/**
 * Quiz state management utilities
 */

export interface QuizQuestion {
  id: string;
  type: "multiple-choice" | "multiple-select" | "true-false";
  question: string;
  options: { id: string; text: string }[];
  correctAnswer: string | string[];
  explanation: string;
}

export interface QuizProps {
  quizId: string;
  moduleSlug: string;
  questions: QuizQuestion[];
  passingScore?: number; // Default: 70%
  allowRetry?: boolean; // Default: true
}

export interface QuizState {
  answers: Record<string, string | string[]>;
  submitted: boolean;
  score: number;
  completedAt?: string;
}

/**
 * Get storage key for a quiz
 */
function getStorageKey(moduleSlug: string, quizId: string): string {
  return `dot-quiz-${moduleSlug}-${quizId}`;
}

/**
 * Get quiz state from localStorage
 */
export function getQuizState(
  moduleSlug: string,
  quizId: string
): QuizState | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const stored = localStorage.getItem(getStorageKey(moduleSlug, quizId));
    if (!stored) {
      return null;
    }
    return JSON.parse(stored);
  } catch {
    return null;
  }
}

/**
 * Save quiz state to localStorage
 */
export function saveQuizState(
  moduleSlug: string,
  quizId: string,
  state: QuizState
): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    localStorage.setItem(
      getStorageKey(moduleSlug, quizId),
      JSON.stringify(state)
    );
  } catch (error) {
    console.error("Failed to save quiz state:", error);
  }
}

/**
 * Clear quiz state (for retry)
 */
export function clearQuizState(moduleSlug: string, quizId: string): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    localStorage.removeItem(getStorageKey(moduleSlug, quizId));
  } catch (error) {
    console.error("Failed to clear quiz state:", error);
  }
}

/**
 * Check if an answer is correct
 */
export function isAnswerCorrect(
  question: QuizQuestion,
  userAnswer: string | string[]
): boolean {
  const correct = question.correctAnswer;

  if (Array.isArray(correct)) {
    if (!Array.isArray(userAnswer)) {
      return false;
    }
    // Check if arrays have same elements regardless of order
    return (
      correct.length === userAnswer.length &&
      correct.every((c) => userAnswer.includes(c))
    );
  }

  return userAnswer === correct;
}

/**
 * Calculate quiz score
 */
export function calculateScore(
  questions: QuizQuestion[],
  answers: Record<string, string | string[]>
): number {
  let correct = 0;

  for (const question of questions) {
    const userAnswer = answers[question.id];
    if (userAnswer && isAnswerCorrect(question, userAnswer)) {
      correct++;
    }
  }

  return Math.round((correct / questions.length) * 100);
}

/**
 * Check if quiz is passed
 */
export function isQuizPassed(
  score: number,
  passingScore: number = 70
): boolean {
  return score >= passingScore;
}
