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

/**
 * Export data structure for URL sharing
 */
export interface ExportData {
  version: 1;
  exportedAt: string;
  progress: ProgressState;
  quizStates: Record<string, unknown>;
}

/**
 * Collect all progress data for export
 */
export function collectExportData(): ExportData {
  const progress = getProgress();
  const quizStates: Record<string, unknown> = {};

  if (isStorageAvailable()) {
    // Collect all quiz states (keys starting with dot-quiz-)
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith("dot-quiz-")) {
        try {
          const value = localStorage.getItem(key);
          if (value) {
            quizStates[key] = JSON.parse(value);
          }
        } catch {
          // Skip malformed entries
        }
      }
    }
  }

  return {
    version: 1,
    exportedAt: new Date().toISOString(),
    progress,
    quizStates,
  };
}

/**
 * Encode export data to a URL-safe string
 */
export function encodeProgressData(data: ExportData): string {
  const json = JSON.stringify(data);
  // Use base64url encoding (URL-safe base64)
  const base64 = btoa(unescape(encodeURIComponent(json)));
  // Make URL-safe: replace + with -, / with _, remove =
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

/**
 * Decode URL-safe string back to export data
 */
export function decodeProgressData(encoded: string): ExportData | null {
  try {
    // Restore standard base64: replace - with +, _ with /
    let base64 = encoded.replace(/-/g, "+").replace(/_/g, "/");
    // Add back padding if needed
    while (base64.length % 4) {
      base64 += "=";
    }
    const json = decodeURIComponent(escape(atob(base64)));
    const data = JSON.parse(json);

    // Validate structure
    if (data.version !== 1 || !data.progress) {
      return null;
    }

    return data as ExportData;
  } catch {
    return null;
  }
}

/**
 * Generate a shareable URL with progress data
 */
export function generateShareUrl(): string {
  const data = collectExportData();
  const encoded = encodeProgressData(data);
  const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
  return `${baseUrl}/progress?import=${encoded}`;
}

/**
 * Import progress data, overwriting existing data
 */
export function importProgressData(data: ExportData): boolean {
  if (!isStorageAvailable()) {
    return false;
  }

  try {
    // Clear existing quiz states
    const keysToRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith("dot-quiz-")) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach((key) => localStorage.removeItem(key));

    // Import main progress
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data.progress));

    // Import quiz states
    for (const [key, value] of Object.entries(data.quizStates)) {
      localStorage.setItem(key, JSON.stringify(value));
    }

    return true;
  } catch (error) {
    console.error("Failed to import progress:", error);
    return false;
  }
}

/**
 * Check if URL has import data and extract it
 */
export function getImportDataFromUrl(): ExportData | null {
  if (typeof window === "undefined") {
    return null;
  }

  const params = new URLSearchParams(window.location.search);
  const encoded = params.get("import");

  if (!encoded) {
    return null;
  }

  return decodeProgressData(encoded);
}
