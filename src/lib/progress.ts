/**
 * Progress tracking utilities for localStorage persistence
 */

export interface ProgressState {
  completedLessons: string[];
  completedModules: string[];
  quizScores: Record<string, number>;
  lastVisited: string;
  startedAt: string;
  totalTimeSpent: number; // in minutes
}

const STORAGE_KEY = "dot-progress";

const defaultProgress: ProgressState = {
  completedLessons: [],
  completedModules: [],
  quizScores: {},
  lastVisited: "",
  startedAt: "",
  totalTimeSpent: 0,
};

/**
 * Check if localStorage is available
 */
export function isStorageAvailable(): boolean {
  try {
    const test = "__storage_test__";
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch {
    return false;
  }
}

/**
 * Get the current progress state from localStorage
 */
export function getProgress(): ProgressState {
  if (!isStorageAvailable()) {
    return defaultProgress;
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return defaultProgress;
    }
    return { ...defaultProgress, ...JSON.parse(stored) };
  } catch {
    return defaultProgress;
  }
}

/**
 * Save progress state to localStorage
 */
export function saveProgress(progress: Partial<ProgressState>): void {
  if (!isStorageAvailable()) {
    return;
  }

  try {
    const current = getProgress();
    const updated = { ...current, ...progress };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error("Failed to save progress:", error);
  }
}

/**
 * Mark a lesson as completed
 */
export function markLessonComplete(lessonSlug: string): void {
  const progress = getProgress();
  if (!progress.completedLessons.includes(lessonSlug)) {
    saveProgress({
      completedLessons: [...progress.completedLessons, lessonSlug],
    });
  }
}

/**
 * Check if a lesson is completed
 */
export function isLessonComplete(lessonSlug: string): boolean {
  const progress = getProgress();
  return progress.completedLessons.includes(lessonSlug);
}

/**
 * Mark a module as completed
 */
export function markModuleComplete(moduleSlug: string): void {
  const progress = getProgress();
  if (!progress.completedModules.includes(moduleSlug)) {
    saveProgress({
      completedModules: [...progress.completedModules, moduleSlug],
    });
  }
}

/**
 * Check if a module is completed
 */
export function isModuleComplete(moduleSlug: string): boolean {
  const progress = getProgress();
  return progress.completedModules.includes(moduleSlug);
}

/**
 * Save a quiz score
 */
export function saveQuizScore(quizId: string, score: number): void {
  const progress = getProgress();
  saveProgress({
    quizScores: { ...progress.quizScores, [quizId]: score },
  });
}

/**
 * Get a quiz score (returns undefined if not taken)
 */
export function getQuizScore(quizId: string): number | undefined {
  const progress = getProgress();
  return progress.quizScores[quizId];
}

/**
 * Update last visited lesson
 */
export function updateLastVisited(lessonSlug: string): void {
  const progress = getProgress();
  const updates: Partial<ProgressState> = {
    lastVisited: lessonSlug,
  };

  // Set startedAt if this is the first visit
  if (!progress.startedAt) {
    updates.startedAt = new Date().toISOString();
  }

  saveProgress(updates);
}

/**
 * Get overall completion percentage
 */
export function getCompletionPercentage(totalModules: number): number {
  const progress = getProgress();
  if (totalModules === 0) return 0;
  return Math.round((progress.completedModules.length / totalModules) * 100);
}

/**
 * Reset all progress (use with caution)
 */
export function resetProgress(): void {
  if (!isStorageAvailable()) {
    return;
  }

  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Failed to reset progress:", error);
  }
}
