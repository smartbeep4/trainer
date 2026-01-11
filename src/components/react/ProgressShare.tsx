import { useState, useEffect } from "react";
import {
  generateShareUrl,
  getImportDataFromUrl,
  importProgressData,
  getExportSizeInfo,
  type ExportData,
  type ExportType,
  type ExportSizeInfo,
  type ImportOptions,
} from "@/lib/progress";
import { parts } from "@/lib/course-data";

interface ProgressShareProps {
  variant: "export" | "import-check";
}

export default function ProgressShare({ variant }: ProgressShareProps) {
  const [shareUrl, setShareUrl] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [importData, setImportData] = useState<ExportData | null>(null);
  const [importStatus, setImportStatus] = useState<
    "pending" | "success" | "error" | null
  >(null);
  const [viewMode, setViewMode] = useState(false);
  const [sizeInfo, setSizeInfo] = useState<ExportSizeInfo | null>(null);
  const [exportType, setExportType] = useState<ExportType>("all");
  const [importOptions, setImportOptions] = useState<ImportOptions>({
    progress: true,
    annotations: true,
  });

  useEffect(() => {
    if (variant === "import-check") {
      const data = getImportDataFromUrl();
      if (data) {
        setImportData(data);
        // Set default import options based on what's available
        setImportOptions({
          progress: data.includes.progress,
          annotations: data.includes.annotations,
        });
      }
    }
  }, [variant]);

  const handleGenerateUrl = () => {
    const info = getExportSizeInfo();
    setSizeInfo(info);

    // Determine best export type
    let type: ExportType = "all";
    if (!info.fitsInUrl) {
      if (info.progressFits) {
        type = "progress";
      } else if (info.annotationsFits) {
        type = "annotations";
      }
    }
    setExportType(type);

    const url = generateShareUrl(type);
    setShareUrl(url);
    setShowExportModal(true);
    setCopied(false);
  };

  const handleExportTypeChange = (type: ExportType) => {
    setExportType(type);
    const url = generateShareUrl(type);
    setShareUrl(url);
    setCopied(false);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = shareUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleImport = () => {
    if (!importData) return;

    const success = importProgressData(importData, importOptions);
    if (success) {
      setImportStatus("success");
      // Clear the URL parameter and reload after a short delay
      setTimeout(() => {
        window.history.replaceState({}, "", "/progress");
        window.location.reload();
      }, 1500);
    } else {
      setImportStatus("error");
    }
  };

  const handleCancelImport = () => {
    // Clear the URL parameter without importing
    window.history.replaceState({}, "", "/progress");
    setImportData(null);
  };

  // Import confirmation dialog
  if (variant === "import-check" && importData) {
    const exportDate = new Date(importData.exportedAt);
    const modulesCount = importData.progress?.completedModules?.length || 0;
    const quizzesCount = Object.keys(
      importData.progress?.quizScores || {}
    ).length;
    const completedModules = importData.progress?.completedModules || [];
    const quizScores = importData.progress?.quizScores || {};
    const annotationsCount = importData.annotations?.length || 0;

    // Calculate completion percentage
    const totalModules = parts.reduce((acc, p) => acc + p.modules.length, 0);
    const completionPercentage = Math.round(
      (modulesCount / totalModules) * 100
    );

    // Get average quiz score
    const quizScoreValues = Object.values(quizScores);
    const avgQuizScore =
      quizScoreValues.length > 0
        ? Math.round(
            quizScoreValues.reduce((a, b) => a + b, 0) / quizScoreValues.length
          )
        : 0;

    // What's included in this import
    const hasProgress = importData.includes.progress;
    const hasAnnotations = importData.includes.annotations;

    // View mode - detailed progress breakdown
    if (viewMode) {
      return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-xl dark:border-dark-border dark:bg-dark-surface">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-neutral-200 p-4 dark:border-dark-border">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setViewMode(false)}
                  className="rounded-lg p-1 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600 dark:hover:bg-dark-elevated dark:hover:text-neutral-300"
                >
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
                    <path d="m15 18-6-6 6-6" />
                  </svg>
                </button>
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                  Shared Progress Details
                </h3>
              </div>
              <button
                onClick={handleCancelImport}
                className="rounded-lg p-1 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600 dark:hover:bg-dark-elevated dark:hover:text-neutral-300"
              >
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
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Summary stats */}
            <div className="grid grid-cols-3 gap-4 border-b border-neutral-200 p-4 dark:border-dark-border">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                  {completionPercentage}%
                </div>
                <div className="text-xs text-neutral-500">Complete</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                  {modulesCount}/{totalModules}
                </div>
                <div className="text-xs text-neutral-500">Modules</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                  {avgQuizScore}%
                </div>
                <div className="text-xs text-neutral-500">Avg Quiz Score</div>
              </div>
            </div>

            {/* Scrollable content */}
            <div className="max-h-[50vh] overflow-y-auto p-4">
              {parts.map((part) => {
                const partModules = part.modules;
                const completedInPart = partModules.filter((m) =>
                  completedModules.includes(m.slug)
                );

                return (
                  <div key={part.number} className="mb-6 last:mb-0">
                    <div className="mb-2 flex items-center justify-between">
                      <h4 className="font-medium text-neutral-900 dark:text-neutral-100">
                        Part {part.number}: {part.title}
                      </h4>
                      <span className="text-sm text-neutral-500">
                        {completedInPart.length}/{partModules.length}
                      </span>
                    </div>
                    <div className="space-y-1">
                      {partModules.map((module) => {
                        const isCompleted = completedModules.includes(
                          module.slug
                        );
                        const quizScore = quizScores[module.slug];

                        return (
                          <div
                            key={module.slug}
                            className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm ${
                              isCompleted
                                ? "bg-success-50 dark:bg-success-900/20"
                                : "bg-neutral-50 dark:bg-dark-elevated"
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              {isCompleted ? (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="h-4 w-4 text-success-600 dark:text-success-400"
                                >
                                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                  <path d="m9 11 3 3L22 4" />
                                </svg>
                              ) : (
                                <div className="h-4 w-4 rounded-full border-2 border-neutral-300 dark:border-neutral-600" />
                              )}
                              <span
                                className={
                                  isCompleted
                                    ? "text-success-700 dark:text-success-300"
                                    : "text-neutral-600 dark:text-neutral-400"
                                }
                              >
                                {module.title}
                              </span>
                            </div>
                            {quizScore !== undefined && (
                              <span
                                className={`text-xs font-medium ${
                                  quizScore >= 70
                                    ? "text-success-600 dark:text-success-400"
                                    : "text-amber-600 dark:text-amber-400"
                                }`}
                              >
                                Quiz: {quizScore}%
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer with import option */}
            <div className="border-t border-neutral-200 p-4 dark:border-dark-border">
              <div className="flex gap-3">
                <button
                  onClick={handleCancelImport}
                  className="flex-1 rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50 dark:border-dark-border dark:bg-dark-surface dark:text-neutral-300 dark:hover:bg-dark-elevated"
                >
                  Close
                </button>
                <button
                  onClick={handleImport}
                  className="flex-1 rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600"
                >
                  Import This Progress
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
        <div className="w-full max-w-md rounded-xl border border-neutral-200 bg-white p-6 shadow-xl dark:border-dark-border dark:bg-dark-surface">
          {importStatus === "success" ? (
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-success-100 dark:bg-success-900/30">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-success-600 dark:text-success-400"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <path d="m9 11 3 3L22 4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                Progress Imported
              </h3>
              <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                Your progress has been restored. Reloading...
              </p>
            </div>
          ) : importStatus === "error" ? (
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-red-600 dark:text-red-400"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="15" y1="9" x2="9" y2="15" />
                  <line x1="9" y1="9" x2="15" y2="15" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                Import Failed
              </h3>
              <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                There was an error importing your progress. Please try again.
              </p>
              <button
                onClick={handleCancelImport}
                className="mt-4 rounded-lg bg-neutral-100 px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-200 dark:bg-dark-elevated dark:text-neutral-300 dark:hover:bg-dark-border"
              >
                Close
              </button>
            </div>
          ) : (
            <>
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900/30">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5 text-primary-600 dark:text-primary-400"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                  Shared Progress
                </h3>
              </div>

              <p className="mb-4 text-sm text-neutral-600 dark:text-neutral-400">
                Someone shared their course data with you. You can view it or
                import it to your browser.
              </p>

              <div className="mb-4 rounded-lg bg-neutral-50 p-4 dark:bg-dark-elevated">
                <div className="space-y-2 text-sm">
                  {hasProgress && (
                    <>
                      <div className="flex justify-between">
                        <span className="text-neutral-600 dark:text-neutral-400">
                          Modules completed
                        </span>
                        <span className="font-medium text-neutral-900 dark:text-neutral-100">
                          {modulesCount} of {totalModules}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-600 dark:text-neutral-400">
                          Quizzes taken
                        </span>
                        <span className="font-medium text-neutral-900 dark:text-neutral-100">
                          {quizzesCount}
                        </span>
                      </div>
                    </>
                  )}
                  {hasAnnotations && (
                    <div className="flex justify-between">
                      <span className="text-neutral-600 dark:text-neutral-400">
                        Notes & bookmarks
                      </span>
                      <span className="font-medium text-neutral-900 dark:text-neutral-100">
                        {annotationsCount}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-neutral-600 dark:text-neutral-400">
                      Exported on
                    </span>
                    <span className="font-medium text-neutral-900 dark:text-neutral-100">
                      {exportDate.toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Import options when both are available */}
              {hasProgress && hasAnnotations && (
                <div className="mb-4 space-y-2">
                  <p className="text-xs font-medium text-neutral-700 dark:text-neutral-300">
                    Select what to import:
                  </p>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={importOptions.progress}
                      onChange={(e) =>
                        setImportOptions({
                          ...importOptions,
                          progress: e.target.checked,
                        })
                      }
                      className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-sm text-neutral-700 dark:text-neutral-300">
                      Progress & quiz scores
                    </span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={importOptions.annotations}
                      onChange={(e) =>
                        setImportOptions({
                          ...importOptions,
                          annotations: e.target.checked,
                        })
                      }
                      className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-sm text-neutral-700 dark:text-neutral-300">
                      Notes & bookmarks
                    </span>
                  </label>
                </div>
              )}

              <div className="space-y-2">
                <div className="flex gap-3">
                  {hasProgress && (
                    <button
                      onClick={() => setViewMode(true)}
                      className="flex-1 rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50 dark:border-dark-border dark:bg-dark-surface dark:text-neutral-300 dark:hover:bg-dark-elevated"
                    >
                      View Progress
                    </button>
                  )}
                  <button
                    onClick={handleImport}
                    disabled={
                      !importOptions.progress && !importOptions.annotations
                    }
                    className="flex-1 rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700 disabled:opacity-50 dark:bg-primary-500 dark:hover:bg-primary-600"
                  >
                    Import
                  </button>
                </div>
                <button
                  onClick={handleCancelImport}
                  className="w-full rounded-lg px-4 py-2 text-sm text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
                >
                  Cancel
                </button>
                <p className="text-center text-xs text-neutral-500 dark:text-neutral-500">
                  Importing will overwrite your current data
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  // Export button variant
  if (variant === "export") {
    return (
      <>
        <button
          onClick={handleGenerateUrl}
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-dark-elevated dark:hover:text-neutral-100"
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
            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
            <polyline points="16 6 12 2 8 6" />
            <line x1="12" y1="2" x2="12" y2="15" />
          </svg>
          Share/Save Progress
        </button>

        {/* Export Modal */}
        {showExportModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-lg rounded-xl border border-neutral-200 bg-white p-6 shadow-xl dark:border-dark-border dark:bg-dark-surface">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900/30">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5 text-primary-600 dark:text-primary-400"
                    >
                      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                      <polyline points="16 6 12 2 8 6" />
                      <line x1="12" y1="2" x2="12" y2="15" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                    Share Your Progress
                  </h3>
                </div>
                <button
                  onClick={() => setShowExportModal(false)}
                  className="rounded-lg p-1 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600 dark:hover:bg-dark-elevated dark:hover:text-neutral-300"
                >
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
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              {/* Size warning when data is too large */}
              {sizeInfo && !sizeInfo.fitsInUrl && (
                <div className="mb-4 rounded-lg border border-amber-200 bg-amber-50 p-3 dark:border-amber-800 dark:bg-amber-900/20">
                  <p className="text-sm text-amber-800 dark:text-amber-200">
                    Your complete data is too large for a single URL. Please
                    choose what to include:
                  </p>
                  <div className="mt-2 flex gap-2">
                    {sizeInfo.progressFits && (
                      <button
                        onClick={() => handleExportTypeChange("progress")}
                        className={`rounded-md px-3 py-1 text-sm ${
                          exportType === "progress"
                            ? "bg-amber-200 text-amber-900 dark:bg-amber-800 dark:text-amber-100"
                            : "bg-amber-100 text-amber-700 hover:bg-amber-200 dark:bg-amber-900/50 dark:text-amber-300"
                        }`}
                      >
                        Progress only
                      </button>
                    )}
                    {sizeInfo.annotationsFits && (
                      <button
                        onClick={() => handleExportTypeChange("annotations")}
                        className={`rounded-md px-3 py-1 text-sm ${
                          exportType === "annotations"
                            ? "bg-amber-200 text-amber-900 dark:bg-amber-800 dark:text-amber-100"
                            : "bg-amber-100 text-amber-700 hover:bg-amber-200 dark:bg-amber-900/50 dark:text-amber-300"
                        }`}
                      >
                        Notes only
                      </button>
                    )}
                  </div>
                </div>
              )}

              <p className="mb-4 text-sm text-neutral-600 dark:text-neutral-400">
                Copy this URL and open it in another browser or device to
                restore your{" "}
                {exportType === "all"
                  ? "progress"
                  : exportType === "progress"
                    ? "progress"
                    : "notes and bookmarks"}
                .
              </p>

              <div className="mb-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    readOnly
                    value={shareUrl}
                    className="flex-1 truncate rounded-lg border border-neutral-300 bg-neutral-50 px-3 py-2 text-sm text-neutral-900 dark:border-dark-border dark:bg-dark-elevated dark:text-neutral-100"
                  />
                  <button
                    onClick={handleCopy}
                    className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                      copied
                        ? "bg-success-100 text-success-700 dark:bg-success-900/30 dark:text-success-400"
                        : "bg-primary-600 text-white hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600"
                    }`}
                  >
                    {copied ? (
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
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                          <path d="m9 11 3 3L22 4" />
                        </svg>
                        Copied
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
                          <rect
                            x="9"
                            y="9"
                            width="13"
                            height="13"
                            rx="2"
                            ry="2"
                          />
                          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                        </svg>
                        Copy
                      </>
                    )}
                  </button>
                </div>
              </div>

              <p className="text-xs text-neutral-500 dark:text-neutral-500">
                This URL contains your{" "}
                {exportType === "all"
                  ? "complete progress including modules, quiz scores, and notes"
                  : exportType === "progress"
                    ? "progress including completed modules and quiz scores"
                    : "notes and bookmarks"}
                . Keep it private if you don&apos;t want others to see your
                progress.
              </p>
            </div>
          </div>
        )}
      </>
    );
  }

  return null;
}
