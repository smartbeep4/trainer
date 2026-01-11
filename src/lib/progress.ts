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
  version: 1 | 2; // v2 adds annotations
  exportedAt: string;
  progress?: ProgressState;
  quizStates?: Record<string, unknown>;
  annotations?: unknown[]; // Annotation objects from notes.ts
  includes: {
    progress: boolean;
    quizzes: boolean;
    annotations: boolean;
  };
}

export type ExportType = "all" | "progress" | "annotations";

// Maximum URL length to stay safe across browsers
const MAX_URL_LENGTH = 8000;

/**
 * Collect all progress data for export
 */
export function collectExportData(type: ExportType = "all"): ExportData {
  const progress = getProgress();
  const quizStates: Record<string, unknown> = {};
  let annotations: unknown[] = [];

  if (isStorageAvailable()) {
    // Collect quiz states
    if (type === "all" || type === "progress") {
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

    // Collect annotations
    if (type === "all" || type === "annotations") {
      try {
        const annotationsJson = localStorage.getItem("dot-annotations");
        if (annotationsJson) {
          annotations = JSON.parse(annotationsJson);
        }
      } catch {
        // Skip if malformed
      }
    }
  }

  const data: ExportData = {
    version: 2,
    exportedAt: new Date().toISOString(),
    includes: {
      progress: type === "all" || type === "progress",
      quizzes: type === "all" || type === "progress",
      annotations: type === "all" || type === "annotations",
    },
  };

  if (type === "all" || type === "progress") {
    data.progress = progress;
    data.quizStates = quizStates;
  }

  if (type === "all" || type === "annotations") {
    data.annotations = annotations;
  }

  return data;
}

/**
 * Calculate the URL length for a given export
 */
export function calculateExportUrlLength(data: ExportData): number {
  const encoded = encodeProgressData(data);
  const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
  return `${baseUrl}/progress?import=${encoded}`.length;
}

/**
 * Check if data fits in URL and get size info
 */
export interface ExportSizeInfo {
  totalSize: number;
  fitsInUrl: boolean;
  progressOnlySize: number;
  annotationsOnlySize: number;
  progressFits: boolean;
  annotationsFits: boolean;
}

export function getExportSizeInfo(): ExportSizeInfo {
  const allData = collectExportData("all");
  const progressData = collectExportData("progress");
  const annotationsData = collectExportData("annotations");

  const totalSize = calculateExportUrlLength(allData);
  const progressOnlySize = calculateExportUrlLength(progressData);
  const annotationsOnlySize = calculateExportUrlLength(annotationsData);

  return {
    totalSize,
    fitsInUrl: totalSize <= MAX_URL_LENGTH,
    progressOnlySize,
    annotationsOnlySize,
    progressFits: progressOnlySize <= MAX_URL_LENGTH,
    annotationsFits: annotationsOnlySize <= MAX_URL_LENGTH,
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

    // Handle v1 format (upgrade to v2 structure)
    if (data.version === 1) {
      return {
        version: 2,
        exportedAt: data.exportedAt,
        progress: data.progress,
        quizStates: data.quizStates,
        includes: {
          progress: true,
          quizzes: true,
          annotations: false,
        },
      } as ExportData;
    }

    // Validate v2 structure
    if (data.version === 2 && data.includes) {
      return data as ExportData;
    }

    return null;
  } catch {
    return null;
  }
}

/**
 * Generate a shareable URL with progress data
 */
export function generateShareUrl(type: ExportType = "all"): string {
  const data = collectExportData(type);
  const encoded = encodeProgressData(data);
  const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
  return `${baseUrl}/progress?import=${encoded}`;
}

/**
 * Import options for selective import
 */
export interface ImportOptions {
  progress?: boolean;
  annotations?: boolean;
}

/**
 * Import progress data with selective import support
 */
export function importProgressData(
  data: ExportData,
  options?: ImportOptions
): boolean {
  if (!isStorageAvailable()) {
    return false;
  }

  // Determine what to import based on options and what's available
  const importProgress =
    (options?.progress ?? true) && data.includes.progress && data.progress;
  const importAnnotations =
    (options?.annotations ?? true) &&
    data.includes.annotations &&
    data.annotations;

  try {
    // Import progress and quiz states
    if (importProgress) {
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
      if (data.quizStates) {
        for (const [key, value] of Object.entries(data.quizStates)) {
          localStorage.setItem(key, JSON.stringify(value));
        }
      }
    }

    // Import annotations
    if (importAnnotations && data.annotations) {
      localStorage.setItem("dot-annotations", JSON.stringify(data.annotations));
      window.dispatchEvent(new CustomEvent("annotations-updated"));
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
