import { useState, useEffect } from "react";

interface ExercisePart {
  id: string;
  title: string;
  duration: string;
  instructions: string[];
  observePrompt?: string;
}

interface SuccessCriterion {
  id: string;
  text: string;
}

interface HandsOnExerciseProps {
  moduleSlug: string;
  exerciseId: string;
  title: string;
  objective: string;
  totalTime: string;
  setupInstructions?: string[];
  parts: ExercisePart[];
  successCriteria: SuccessCriterion[];
}

interface ExerciseState {
  completedParts: string[];
  completedCriteria: string[];
  notes: Record<string, string>;
  startedAt?: string;
  completedAt?: string;
}

function getStorageKey(moduleSlug: string, exerciseId: string): string {
  return `dot-exercise-${moduleSlug}-${exerciseId}`;
}

function getExerciseState(
  moduleSlug: string,
  exerciseId: string
): ExerciseState {
  if (typeof window === "undefined") {
    return { completedParts: [], completedCriteria: [], notes: {} };
  }

  try {
    const stored = localStorage.getItem(getStorageKey(moduleSlug, exerciseId));
    if (!stored) {
      return { completedParts: [], completedCriteria: [], notes: {} };
    }
    return JSON.parse(stored);
  } catch {
    return { completedParts: [], completedCriteria: [], notes: {} };
  }
}

function saveExerciseState(
  moduleSlug: string,
  exerciseId: string,
  state: ExerciseState
): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    localStorage.setItem(
      getStorageKey(moduleSlug, exerciseId),
      JSON.stringify(state)
    );
  } catch (error) {
    console.error("Failed to save exercise state:", error);
  }
}

export default function HandsOnExercise({
  moduleSlug,
  exerciseId,
  title,
  objective,
  totalTime,
  setupInstructions,
  parts,
  successCriteria,
}: HandsOnExerciseProps) {
  const [state, setState] = useState<ExerciseState>({
    completedParts: [],
    completedCriteria: [],
    notes: {},
  });
  const [expandedParts, setExpandedParts] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load saved state on mount
  useEffect(() => {
    const saved = getExerciseState(moduleSlug, exerciseId);
    setState(saved);
    // Expand the first incomplete part by default
    const firstIncompletePart = parts.find(
      (p) => !saved.completedParts.includes(p.id)
    );
    if (firstIncompletePart) {
      setExpandedParts([firstIncompletePart.id]);
    } else if (parts.length > 0) {
      setExpandedParts([parts[0].id]);
    }
    setIsLoaded(true);
  }, [moduleSlug, exerciseId, parts]);

  // Save state when it changes
  useEffect(() => {
    if (isLoaded) {
      saveExerciseState(moduleSlug, exerciseId, state);
    }
  }, [state, moduleSlug, exerciseId, isLoaded]);

  const togglePartComplete = (partId: string) => {
    setState((prev) => {
      const isCompleted = prev.completedParts.includes(partId);
      const newCompletedParts = isCompleted
        ? prev.completedParts.filter((id) => id !== partId)
        : [...prev.completedParts, partId];

      // If this was the first completion, record start time
      const startedAt =
        prev.startedAt || (!isCompleted ? new Date().toISOString() : undefined);

      // If all parts are now complete, record completion time
      const completedAt =
        newCompletedParts.length === parts.length
          ? new Date().toISOString()
          : undefined;

      return {
        ...prev,
        completedParts: newCompletedParts,
        startedAt,
        completedAt,
      };
    });
  };

  const toggleCriterionComplete = (criterionId: string) => {
    setState((prev) => {
      const isCompleted = prev.completedCriteria.includes(criterionId);
      return {
        ...prev,
        completedCriteria: isCompleted
          ? prev.completedCriteria.filter((id) => id !== criterionId)
          : [...prev.completedCriteria, criterionId],
      };
    });
  };

  const updateNotes = (partId: string, notes: string) => {
    setState((prev) => ({
      ...prev,
      notes: { ...prev.notes, [partId]: notes },
    }));
  };

  const togglePartExpanded = (partId: string) => {
    setExpandedParts((prev) =>
      prev.includes(partId)
        ? prev.filter((id) => id !== partId)
        : [...prev, partId]
    );
  };

  const resetExercise = () => {
    setState({
      completedParts: [],
      completedCriteria: [],
      notes: {},
    });
    setExpandedParts([parts[0]?.id].filter(Boolean));
  };

  const progressPercent = Math.round(
    (state.completedParts.length / parts.length) * 100
  );
  const allPartsComplete = state.completedParts.length === parts.length;
  const allCriteriaComplete =
    state.completedCriteria.length === successCriteria.length;

  if (!isLoaded) {
    return (
      <div className="animate-pulse rounded-lg border border-neutral-200 bg-neutral-50 p-6 dark:border-dark-border dark:bg-dark-surface">
        <div className="h-6 w-1/3 rounded bg-neutral-200 dark:bg-dark-elevated" />
        <div className="mt-4 h-4 w-full rounded bg-neutral-200 dark:bg-dark-elevated" />
        <div className="mt-2 h-4 w-3/4 rounded bg-neutral-200 dark:bg-dark-elevated" />
      </div>
    );
  }

  return (
    <div className="my-8 overflow-hidden rounded-lg border border-purple-200 bg-white dark:border-purple-900/50 dark:bg-dark-surface">
      {/* Header */}
      <div className="border-b border-purple-200 bg-purple-50 px-6 py-4 dark:border-purple-900/50 dark:bg-purple-900/20">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5 text-purple-600 dark:text-purple-400"
              >
                <path d="m18 16 4-4-4-4" />
                <path d="m6 8-4 4 4 4" />
                <path d="m14.5 4-5 16" />
              </svg>
              <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-100">
                {title}
              </h3>
            </div>
            <p className="mt-1 text-sm text-purple-700 dark:text-purple-300">
              {objective}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-700 dark:bg-purple-900/50 dark:text-purple-300">
              {totalTime}
            </span>
            {allPartsComplete && (
              <span className="flex items-center gap-1 rounded-full bg-success-100 px-3 py-1 text-sm font-medium text-success-700 dark:bg-success-900/30 dark:text-success-300">
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
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                Complete
              </span>
            )}
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-xs text-purple-700 dark:text-purple-300">
            <span>Progress</span>
            <span>
              {state.completedParts.length} of {parts.length} parts
            </span>
          </div>
          <div className="mt-1 h-2 overflow-hidden rounded-full bg-purple-200 dark:bg-purple-900/50">
            <div
              className="h-full rounded-full bg-purple-600 transition-all duration-300 dark:bg-purple-400"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Setup instructions */}
      {setupInstructions && setupInstructions.length > 0 && (
        <div className="border-b border-neutral-200 bg-neutral-50 px-6 py-4 dark:border-dark-border dark:bg-dark-elevated">
          <h4 className="font-medium text-neutral-900 dark:text-neutral-100">
            Setup
          </h4>
          <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-neutral-600 dark:text-neutral-400">
            {setupInstructions.map((instruction, i) => (
              <li key={i}>{instruction}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Exercise parts */}
      <div className="divide-y divide-neutral-200 dark:divide-dark-border">
        {parts.map((part, index) => {
          const isCompleted = state.completedParts.includes(part.id);
          const isExpanded = expandedParts.includes(part.id);

          return (
            <div key={part.id} className="px-6 py-4">
              {/* Part header */}
              <button
                type="button"
                onClick={() => togglePartExpanded(part.id)}
                className="flex w-full items-start gap-3 text-left"
              >
                {/* Completion checkbox */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    togglePartComplete(part.id);
                  }}
                  className={`mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border-2 transition-colors ${
                    isCompleted
                      ? "border-success-500 bg-success-500 text-white"
                      : "border-neutral-300 hover:border-success-400 dark:border-neutral-600"
                  }`}
                  aria-label={
                    isCompleted ? "Mark as incomplete" : "Mark as complete"
                  }
                >
                  {isCompleted && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-3 w-3"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </button>

                {/* Part info */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`font-medium ${
                        isCompleted
                          ? "text-neutral-500 line-through dark:text-neutral-500"
                          : "text-neutral-900 dark:text-neutral-100"
                      }`}
                    >
                      Part {index + 1}: {part.title}
                    </span>
                    <span className="text-sm text-neutral-500">
                      ({part.duration})
                    </span>
                  </div>
                </div>

                {/* Expand/collapse icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`h-5 w-5 flex-shrink-0 text-neutral-400 transition-transform ${
                    isExpanded ? "rotate-180" : ""
                  }`}
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>

              {/* Part content (expandable) */}
              {isExpanded && (
                <div className="mt-4 pl-8">
                  {/* Instructions */}
                  <ol className="list-inside list-decimal space-y-2 text-sm text-neutral-700 dark:text-neutral-300">
                    {part.instructions.map((instruction, i) => (
                      <li key={i}>{instruction}</li>
                    ))}
                  </ol>

                  {/* Observe prompt */}
                  {part.observePrompt && (
                    <div className="mt-4 rounded-lg bg-neutral-100 p-3 text-sm dark:bg-dark-elevated">
                      <span className="font-medium text-neutral-900 dark:text-neutral-100">
                        Observe:{" "}
                      </span>
                      <span className="text-neutral-600 dark:text-neutral-400">
                        {part.observePrompt}
                      </span>
                    </div>
                  )}

                  {/* Notes field */}
                  <div className="mt-4">
                    <label
                      htmlFor={`notes-${part.id}`}
                      className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
                    >
                      Your notes (optional)
                    </label>
                    <textarea
                      id={`notes-${part.id}`}
                      value={state.notes[part.id] || ""}
                      onChange={(e) => updateNotes(part.id, e.target.value)}
                      placeholder="Record your observations here..."
                      rows={3}
                      className="mt-1 w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 dark:border-dark-border dark:bg-dark-elevated dark:text-neutral-100"
                    />
                  </div>

                  {/* Complete part button */}
                  <div className="mt-4">
                    <button
                      type="button"
                      onClick={() => togglePartComplete(part.id)}
                      className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                        isCompleted
                          ? "bg-success-100 text-success-700 hover:bg-success-200 dark:bg-success-900/30 dark:text-success-300"
                          : "bg-purple-100 text-purple-700 hover:bg-purple-200 dark:bg-purple-900/30 dark:text-purple-300"
                      }`}
                    >
                      {isCompleted ? (
                        <>
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
                            <path d="M20 6 9 17l-5-5" />
                          </svg>
                          Completed
                        </>
                      ) : (
                        <>
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
                            <circle cx="12" cy="12" r="10" />
                            <path d="m9 12 2 2 4-4" />
                          </svg>
                          Mark as complete
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Success criteria */}
      <div className="border-t border-neutral-200 bg-neutral-50 px-6 py-4 dark:border-dark-border dark:bg-dark-elevated">
        <h4 className="font-medium text-neutral-900 dark:text-neutral-100">
          Success Criteria
        </h4>
        <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
          Check off each criterion as you complete it:
        </p>
        <ul className="mt-3 space-y-2">
          {successCriteria.map((criterion) => {
            const isChecked = state.completedCriteria.includes(criterion.id);
            return (
              <li key={criterion.id}>
                <button
                  type="button"
                  onClick={() => toggleCriterionComplete(criterion.id)}
                  className="flex items-start gap-3 text-left"
                >
                  <span
                    className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border-2 transition-colors ${
                      isChecked
                        ? "border-success-500 bg-success-500 text-white"
                        : "border-neutral-300 hover:border-success-400 dark:border-neutral-600"
                    }`}
                  >
                    {isChecked && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-3 w-3"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </span>
                  <span
                    className={`text-sm ${
                      isChecked
                        ? "text-neutral-500 line-through"
                        : "text-neutral-700 dark:text-neutral-300"
                    }`}
                  >
                    {criterion.text}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        {/* Completion message */}
        {allPartsComplete && allCriteriaComplete && (
          <div className="mt-4 flex items-center gap-2 rounded-lg bg-success-100 p-3 text-success-700 dark:bg-success-900/30 dark:text-success-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <path d="m9 11 3 3L22 4" />
            </svg>
            <span className="font-medium">
              Excellent! You have completed this exercise.
            </span>
          </div>
        )}
      </div>

      {/* Reset button */}
      <div className="border-t border-neutral-200 px-6 py-3 dark:border-dark-border">
        <button
          type="button"
          onClick={resetExercise}
          className="text-sm text-neutral-500 hover:text-neutral-700 dark:text-neutral-500 dark:hover:text-neutral-300"
        >
          Reset exercise progress
        </button>
      </div>
    </div>
  );
}
