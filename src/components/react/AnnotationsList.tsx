import { useState, useEffect } from "react";
import {
  getAnnotations,
  deleteAnnotation,
  removeBookmark,
  removeNote,
  type Annotation,
} from "@/lib/notes";
import { parts } from "@/lib/course-data";

type FilterType = "all" | "bookmarks" | "notes";

export default function AnnotationsList() {
  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const [filter, setFilter] = useState<FilterType>("all");
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const loadAnnotations = () => {
    setAnnotations(getAnnotations());
  };

  useEffect(() => {
    loadAnnotations();

    const handleUpdate = () => loadAnnotations();
    window.addEventListener("annotations-updated", handleUpdate);
    return () =>
      window.removeEventListener("annotations-updated", handleUpdate);
  }, []);

  // Get module title from slug
  const getModuleTitle = (slug: string): string => {
    for (const part of parts) {
      const module = part.modules.find((m) => m.slug === slug);
      if (module) return module.title;
    }
    return slug;
  };

  // Filter annotations
  const filteredAnnotations = annotations.filter((a) => {
    if (filter === "all") return true;
    if (filter === "bookmarks")
      return a.type === "bookmark" || a.type === "both";
    if (filter === "notes") return a.type === "note" || a.type === "both";
    return true;
  });

  // Group by module
  const groupedByModule = filteredAnnotations.reduce(
    (acc, annotation) => {
      if (!acc[annotation.moduleSlug]) {
        acc[annotation.moduleSlug] = [];
      }
      acc[annotation.moduleSlug].push(annotation);
      return acc;
    },
    {} as Record<string, Annotation[]>
  );

  const handleDelete = (annotation: Annotation) => {
    if (confirmDelete === annotation.id) {
      deleteAnnotation(annotation.id);
      setConfirmDelete(null);
    } else {
      setConfirmDelete(annotation.id);
      // Auto-clear confirmation after 3 seconds
      setTimeout(() => setConfirmDelete(null), 3000);
    }
  };

  const handleRemoveBookmarkOnly = (id: string) => {
    removeBookmark(id);
  };

  const handleRemoveNoteOnly = (id: string) => {
    removeNote(id);
  };

  const navigateToAnnotation = (annotation: Annotation) => {
    // Navigate to the module with a hash to scroll to the element
    window.location.href = `/module/${annotation.moduleSlug}#annotation-${annotation.elementIndex}`;
  };

  const bookmarkCount = annotations.filter(
    (a) => a.type === "bookmark" || a.type === "both"
  ).length;
  const noteCount = annotations.filter(
    (a) => a.type === "note" || a.type === "both"
  ).length;

  if (annotations.length === 0) {
    return (
      <div className="rounded-xl border border-neutral-200 bg-white p-6 dark:border-dark-border dark:bg-dark-surface">
        <h2 className="mb-4 text-lg font-semibold text-neutral-900 dark:text-neutral-100">
          Notes & Bookmarks
        </h2>
        <div className="py-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100 dark:bg-dark-elevated">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 text-neutral-400"
            >
              <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
            </svg>
          </div>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            No bookmarks or notes yet
          </p>
          <p className="mt-1 text-xs text-neutral-500">
            Hover over any line in a lesson and click to add annotations
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-neutral-200 bg-white dark:border-dark-border dark:bg-dark-surface">
      <div className="border-b border-neutral-200 p-4 dark:border-dark-border">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
            Notes & Bookmarks
          </h2>
          <div className="flex items-center gap-2 text-sm">
            <span className="flex items-center gap-1 text-blue-600 dark:text-blue-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
              </svg>
              {bookmarkCount}
            </span>
            <span className="flex items-center gap-1 text-green-600 dark:text-green-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
              </svg>
              {noteCount}
            </span>
          </div>
        </div>

        {/* Filter tabs */}
        <div className="mt-3 flex gap-1">
          {(["all", "bookmarks", "notes"] as const).map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`rounded-md px-3 py-1 text-sm font-medium transition-colors ${
                filter === type
                  ? "bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400"
                  : "text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-dark-elevated"
              }`}
            >
              {type === "all"
                ? "All"
                : type === "bookmarks"
                  ? "Bookmarks"
                  : "Notes"}
            </button>
          ))}
        </div>
      </div>

      <div className="max-h-96 overflow-y-auto">
        {Object.entries(groupedByModule).map(
          ([moduleSlug, moduleAnnotations]) => (
            <div
              key={moduleSlug}
              className="border-b border-neutral-100 last:border-b-0 dark:border-dark-border"
            >
              <div className="bg-neutral-50 px-4 py-2 dark:bg-dark-elevated">
                <a
                  href={`/module/${moduleSlug}`}
                  className="text-sm font-medium text-neutral-900 hover:text-primary-600 dark:text-neutral-100 dark:hover:text-primary-400"
                >
                  {getModuleTitle(moduleSlug)}
                </a>
              </div>
              <div className="divide-y divide-neutral-100 dark:divide-dark-border">
                {moduleAnnotations.map((annotation) => (
                  <div
                    key={annotation.id}
                    className="group flex items-start gap-3 px-4 py-3 hover:bg-neutral-50 dark:hover:bg-dark-elevated"
                  >
                    {/* Type indicator */}
                    <div className="mt-0.5 flex-shrink-0">
                      {annotation.type === "both" ? (
                        <div className="flex h-5 w-5 items-center justify-center rounded bg-purple-100 dark:bg-purple-900/30">
                          <span className="text-xs font-bold text-purple-600 dark:text-purple-400">
                            2
                          </span>
                        </div>
                      ) : annotation.type === "bookmark" ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-5 w-5 text-blue-500"
                        >
                          <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-5 w-5 text-green-500"
                        >
                          <path d="M12 20h9" />
                          <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
                        </svg>
                      )}
                    </div>

                    {/* Content */}
                    <div className="min-w-0 flex-1">
                      <button
                        onClick={() => navigateToAnnotation(annotation)}
                        className="block text-left text-sm text-neutral-600 hover:text-primary-600 dark:text-neutral-400 dark:hover:text-primary-400"
                      >
                        <span className="line-clamp-2">
                          {annotation.elementText}
                          {annotation.elementText.length >= 100 && "..."}
                        </span>
                      </button>
                      {annotation.noteText && (
                        <div className="mt-1.5 rounded-md bg-green-50 px-2 py-1.5 text-sm text-green-800 dark:bg-green-900/20 dark:text-green-300">
                          {annotation.noteText}
                        </div>
                      )}
                      <div className="mt-1 text-xs text-neutral-400">
                        {new Date(annotation.updatedAt).toLocaleDateString()}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-shrink-0 items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                      {annotation.type === "both" && (
                        <>
                          <button
                            onClick={() =>
                              handleRemoveBookmarkOnly(annotation.id)
                            }
                            className="rounded p-1 text-neutral-400 hover:bg-neutral-100 hover:text-blue-600 dark:hover:bg-dark-border dark:hover:text-blue-400"
                            title="Remove bookmark"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-4 w-4"
                            >
                              <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
                              <line x1="15" y1="9" x2="9" y2="15" />
                              <line x1="9" y1="9" x2="15" y2="15" />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleRemoveNoteOnly(annotation.id)}
                            className="rounded p-1 text-neutral-400 hover:bg-neutral-100 hover:text-green-600 dark:hover:bg-dark-border dark:hover:text-green-400"
                            title="Remove note"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-4 w-4"
                            >
                              <path d="M3 6h18" />
                              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                            </svg>
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => handleDelete(annotation)}
                        className={`rounded p-1 transition-colors ${
                          confirmDelete === annotation.id
                            ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                            : "text-neutral-400 hover:bg-neutral-100 hover:text-red-600 dark:hover:bg-dark-border dark:hover:text-red-400"
                        }`}
                        title={
                          confirmDelete === annotation.id
                            ? "Click again to confirm"
                            : "Delete"
                        }
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-4 w-4"
                        >
                          <path d="M3 6h18" />
                          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
