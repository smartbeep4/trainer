import { useState, useEffect } from "react";
import {
  generateShareUrl,
  getImportDataFromUrl,
  importProgressData,
  type ExportData,
} from "@/lib/progress";

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

  useEffect(() => {
    if (variant === "import-check") {
      const data = getImportDataFromUrl();
      if (data) {
        setImportData(data);
      }
    }
  }, [variant]);

  const handleGenerateUrl = () => {
    const url = generateShareUrl();
    setShareUrl(url);
    setShowExportModal(true);
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

    const success = importProgressData(importData);
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
    const modulesCount = importData.progress.completedModules?.length || 0;
    const quizzesCount = Object.keys(
      importData.progress.quizScores || {}
    ).length;

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
                  Import Progress
                </h3>
              </div>

              <p className="mb-4 text-sm text-neutral-600 dark:text-neutral-400">
                Would you like to import this saved progress? This will{" "}
                <strong className="text-neutral-900 dark:text-neutral-100">
                  overwrite
                </strong>{" "}
                any progress currently saved in this browser.
              </p>

              <div className="mb-6 rounded-lg bg-neutral-50 p-4 dark:bg-dark-elevated">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-neutral-600 dark:text-neutral-400">
                      Modules completed
                    </span>
                    <span className="font-medium text-neutral-900 dark:text-neutral-100">
                      {modulesCount}
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

              <div className="flex gap-3">
                <button
                  onClick={handleCancelImport}
                  className="flex-1 rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50 dark:border-dark-border dark:bg-dark-surface dark:text-neutral-300 dark:hover:bg-dark-elevated"
                >
                  Cancel
                </button>
                <button
                  onClick={handleImport}
                  className="flex-1 rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600"
                >
                  Import Progress
                </button>
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
          Share Progress
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

              <p className="mb-4 text-sm text-neutral-600 dark:text-neutral-400">
                Copy this URL and open it in another browser or device to
                restore your progress there.
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
                This URL contains your complete progress including completed
                modules and quiz scores. Keep it private if you don&apos;t want
                others to see your progress.
              </p>
            </div>
          </div>
        )}
      </>
    );
  }

  return null;
}
