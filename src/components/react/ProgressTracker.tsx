import { useState, useEffect } from "react";
import {
  getProgress,
  isModuleComplete,
  getCompletionPercentage,
  type ProgressState,
} from "@/lib/progress";
import { courseStats } from "@/lib/course-data";

interface ProgressTrackerProps {
  variant: "header" | "sidebar" | "lesson" | "dashboard";
  moduleSlug?: string;
}

export default function ProgressTracker({
  variant,
  moduleSlug,
}: ProgressTrackerProps) {
  const [progress, setProgress] = useState<ProgressState | null>(null);
  const [percentage, setPercentage] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const loadProgress = () => {
      const currentProgress = getProgress();
      setProgress(currentProgress);
      setPercentage(getCompletionPercentage(courseStats.totalModules));

      if (moduleSlug) {
        setIsComplete(isModuleComplete(moduleSlug));
      }
    };

    loadProgress();

    // Listen for storage events (in case progress changes in another tab)
    const handleStorage = (e: StorageEvent) => {
      if (e.key === "dot-progress") {
        loadProgress();
      }
    };

    window.addEventListener("storage", handleStorage);

    // Also listen for custom progress update events
    const handleProgressUpdate = () => loadProgress();
    window.addEventListener("progress-updated", handleProgressUpdate);

    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("progress-updated", handleProgressUpdate);
    };
  }, [moduleSlug]);

  if (variant === "header") {
    return (
      <div className="flex items-center gap-2">
        <div className="h-2 w-24 overflow-hidden rounded-full bg-neutral-200 dark:bg-dark-elevated">
          <div
            className="h-full rounded-full bg-primary-500 transition-all duration-300"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <span className="text-xs font-medium text-neutral-600 dark:text-[#c9d1d9]">
          {percentage}%
        </span>
      </div>
    );
  }

  if (variant === "lesson") {
    if (isComplete) {
      return (
        <div className="flex items-center gap-2 rounded-lg bg-success-50 px-4 py-2 text-success-700 dark:bg-success-900/20 dark:text-success-300">
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
          <span className="text-sm font-medium">Module completed</span>
        </div>
      );
    }

    return (
      <div className="flex items-center gap-3 rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 dark:border-dark-border dark:bg-dark-surface">
        <div className="flex-1">
          <div className="mb-1 flex items-center justify-between">
            <span className="text-sm font-medium text-neutral-900 dark:text-[#e6edf3]">
              Course Progress
            </span>
            <span className="text-sm text-neutral-600 dark:text-[#c9d1d9]">
              {progress?.completedModules.length || 0} of{" "}
              {courseStats.totalModules} modules
            </span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-neutral-200 dark:bg-dark-elevated">
            <div
              className="h-full rounded-full bg-primary-500 transition-all duration-300"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      </div>
    );
  }

  if (variant === "dashboard") {
    const hoursCompleted = progress
      ? Math.round((percentage / 100) * 35 * 10) / 10
      : 0;

    return (
      <div className="rounded-xl border border-neutral-200 bg-white p-6 dark:border-dark-border dark:bg-dark-surface">
        <h2 className="mb-4 text-lg font-semibold text-neutral-900 dark:text-[#e6edf3]">
          Your Progress
        </h2>

        {/* Main progress circle */}
        <div className="mb-6 flex items-center gap-6">
          <div className="relative h-32 w-32">
            <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
              {/* Background circle */}
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="currentColor"
                strokeWidth="10"
                className="text-neutral-200 dark:text-dark-elevated"
              />
              {/* Progress circle */}
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="currentColor"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={`${percentage * 2.51} 251`}
                className="text-primary-500 transition-all duration-500"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold text-neutral-900 dark:text-[#e6edf3]">
                {percentage}%
              </span>
            </div>
          </div>

          <div className="flex-1 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-neutral-600 dark:text-[#c9d1d9]">
                Modules completed
              </span>
              <span className="font-medium text-neutral-900 dark:text-[#e6edf3]">
                {progress?.completedModules.length || 0} /{" "}
                {courseStats.totalModules}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-neutral-600 dark:text-[#c9d1d9]">
                Estimated time
              </span>
              <span className="font-medium text-neutral-900 dark:text-[#e6edf3]">
                ~{hoursCompleted} hours done
              </span>
            </div>
            {progress?.lastVisited && (
              <div className="flex justify-between text-sm">
                <span className="text-neutral-600 dark:text-[#c9d1d9]">
                  Continue from
                </span>
                <a
                  href={`/module/${progress.lastVisited}`}
                  className="font-medium text-primary-600 hover:underline dark:text-primary-400"
                >
                  Resume
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-lg bg-neutral-50 p-3 dark:bg-dark-elevated">
            <div className="text-2xl font-bold text-neutral-900 dark:text-[#e6edf3]">
              {Object.keys(progress?.quizScores || {}).length}
            </div>
            <div className="text-xs text-neutral-600 dark:text-[#c9d1d9]">
              Quizzes completed
            </div>
          </div>
          <div className="rounded-lg bg-neutral-50 p-3 dark:bg-dark-elevated">
            <div className="text-2xl font-bold text-neutral-900 dark:text-[#e6edf3]">
              {Object.values(progress?.quizScores || {}).length > 0
                ? Math.round(
                    Object.values(progress?.quizScores || {}).reduce(
                      (a, b) => a + b,
                      0
                    ) / Object.values(progress?.quizScores || {}).length
                  )
                : 0}
              %
            </div>
            <div className="text-xs text-neutral-600 dark:text-[#c9d1d9]">
              Average quiz score
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default/sidebar variant
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-neutral-900 dark:text-[#e6edf3]">
          Progress
        </span>
        <span className="text-neutral-600 dark:text-[#c9d1d9]">
          {percentage}%
        </span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-neutral-200 dark:bg-dark-elevated">
        <div
          className="h-full rounded-full bg-primary-500 transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="text-xs text-neutral-500 dark:text-[#8b949e]">
        {progress?.completedModules.length || 0} of {courseStats.totalModules}{" "}
        modules
      </div>
    </div>
  );
}
