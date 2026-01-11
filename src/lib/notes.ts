/**
 * Notes and bookmarks storage utilities
 */

export interface Annotation {
  id: string; // Unique ID: moduleSlug:elementIndex
  moduleSlug: string;
  elementIndex: number; // Position of the element in the content
  elementText: string; // First ~100 chars of the element for context
  type: "bookmark" | "note" | "both";
  noteText?: string; // Only for notes
  createdAt: string;
  updatedAt: string;
}

const STORAGE_KEY = "dot-annotations";

/**
 * Check if localStorage is available
 */
function isStorageAvailable(): boolean {
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
 * Get all annotations from localStorage
 */
export function getAnnotations(): Annotation[] {
  if (!isStorageAvailable()) {
    return [];
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return [];
    }
    return JSON.parse(stored);
  } catch {
    return [];
  }
}

/**
 * Get annotations for a specific module
 */
export function getModuleAnnotations(moduleSlug: string): Annotation[] {
  return getAnnotations().filter((a) => a.moduleSlug === moduleSlug);
}

/**
 * Get a specific annotation by ID
 */
export function getAnnotation(id: string): Annotation | undefined {
  return getAnnotations().find((a) => a.id === id);
}

/**
 * Save an annotation (creates or updates)
 */
export function saveAnnotation(annotation: Annotation): void {
  if (!isStorageAvailable()) {
    return;
  }

  try {
    const annotations = getAnnotations();
    const existingIndex = annotations.findIndex((a) => a.id === annotation.id);

    if (existingIndex >= 0) {
      annotations[existingIndex] = {
        ...annotation,
        updatedAt: new Date().toISOString(),
      };
    } else {
      annotations.push(annotation);
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(annotations));

    // Dispatch custom event for reactivity
    window.dispatchEvent(new CustomEvent("annotations-updated"));
  } catch (error) {
    console.error("Failed to save annotation:", error);
  }
}

/**
 * Add a bookmark to an element
 */
export function addBookmark(
  moduleSlug: string,
  elementIndex: number,
  elementText: string
): Annotation {
  const id = `${moduleSlug}:${elementIndex}`;
  const existing = getAnnotation(id);
  const now = new Date().toISOString();

  const annotation: Annotation = existing
    ? {
        ...existing,
        type: existing.type === "note" ? "both" : "bookmark",
        updatedAt: now,
      }
    : {
        id,
        moduleSlug,
        elementIndex,
        elementText: elementText.slice(0, 100),
        type: "bookmark",
        createdAt: now,
        updatedAt: now,
      };

  saveAnnotation(annotation);
  return annotation;
}

/**
 * Add or update a note on an element
 */
export function addNote(
  moduleSlug: string,
  elementIndex: number,
  elementText: string,
  noteText: string
): Annotation {
  const id = `${moduleSlug}:${elementIndex}`;
  const existing = getAnnotation(id);
  const now = new Date().toISOString();

  const annotation: Annotation = existing
    ? {
        ...existing,
        type: existing.type === "bookmark" ? "both" : "note",
        noteText,
        updatedAt: now,
      }
    : {
        id,
        moduleSlug,
        elementIndex,
        elementText: elementText.slice(0, 100),
        type: "note",
        noteText,
        createdAt: now,
        updatedAt: now,
      };

  saveAnnotation(annotation);
  return annotation;
}

/**
 * Remove a bookmark from an element
 */
export function removeBookmark(id: string): void {
  if (!isStorageAvailable()) {
    return;
  }

  try {
    const annotations = getAnnotations();
    const existing = annotations.find((a) => a.id === id);

    if (!existing) return;

    if (existing.type === "both") {
      // Keep the note, just remove bookmark status
      existing.type = "note";
      existing.updatedAt = new Date().toISOString();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(annotations));
    } else if (existing.type === "bookmark") {
      // Remove entirely
      const filtered = annotations.filter((a) => a.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    }

    window.dispatchEvent(new CustomEvent("annotations-updated"));
  } catch (error) {
    console.error("Failed to remove bookmark:", error);
  }
}

/**
 * Remove a note from an element
 */
export function removeNote(id: string): void {
  if (!isStorageAvailable()) {
    return;
  }

  try {
    const annotations = getAnnotations();
    const existing = annotations.find((a) => a.id === id);

    if (!existing) return;

    if (existing.type === "both") {
      // Keep the bookmark, just remove note
      existing.type = "bookmark";
      delete existing.noteText;
      existing.updatedAt = new Date().toISOString();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(annotations));
    } else if (existing.type === "note") {
      // Remove entirely
      const filtered = annotations.filter((a) => a.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    }

    window.dispatchEvent(new CustomEvent("annotations-updated"));
  } catch (error) {
    console.error("Failed to remove note:", error);
  }
}

/**
 * Delete an annotation entirely
 */
export function deleteAnnotation(id: string): void {
  if (!isStorageAvailable()) {
    return;
  }

  try {
    const annotations = getAnnotations();
    const filtered = annotations.filter((a) => a.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    window.dispatchEvent(new CustomEvent("annotations-updated"));
  } catch (error) {
    console.error("Failed to delete annotation:", error);
  }
}

/**
 * Get bookmarks only
 */
export function getBookmarks(): Annotation[] {
  return getAnnotations().filter(
    (a) => a.type === "bookmark" || a.type === "both"
  );
}

/**
 * Get notes only
 */
export function getNotes(): Annotation[] {
  return getAnnotations().filter((a) => a.type === "note" || a.type === "both");
}

/**
 * Calculate approximate size of annotations data in bytes
 */
export function getAnnotationsSize(): number {
  const annotations = getAnnotations();
  return new Blob([JSON.stringify(annotations)]).size;
}

/**
 * Export annotations data
 */
export function exportAnnotations(): Annotation[] {
  return getAnnotations();
}

/**
 * Import annotations (merges with existing, newer wins)
 */
export function importAnnotations(
  annotations: Annotation[],
  overwrite: boolean = false
): void {
  if (!isStorageAvailable()) {
    return;
  }

  try {
    if (overwrite) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(annotations));
    } else {
      // Merge: newer annotations win
      const existing = getAnnotations();
      const merged = [...existing];

      for (const imported of annotations) {
        const existingIndex = merged.findIndex((a) => a.id === imported.id);
        if (existingIndex >= 0) {
          // Keep the newer one
          if (imported.updatedAt > merged[existingIndex].updatedAt) {
            merged[existingIndex] = imported;
          }
        } else {
          merged.push(imported);
        }
      }

      localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
    }

    window.dispatchEvent(new CustomEvent("annotations-updated"));
  } catch (error) {
    console.error("Failed to import annotations:", error);
  }
}

/**
 * Clear all annotations
 */
export function clearAnnotations(): void {
  if (!isStorageAvailable()) {
    return;
  }

  try {
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new CustomEvent("annotations-updated"));
  } catch (error) {
    console.error("Failed to clear annotations:", error);
  }
}
