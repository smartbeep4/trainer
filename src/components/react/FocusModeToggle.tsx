import { useState, useEffect } from "react";

export default function FocusModeToggle() {
  const [isFocusMode, setIsFocusMode] = useState(false);

  useEffect(() => {
    // Check localStorage for saved preference
    const saved = localStorage.getItem("dot-focus-mode");
    if (saved === "true") {
      setIsFocusMode(true);
      document.documentElement.classList.add("focus-mode");
    }
  }, []);

  const toggleFocusMode = () => {
    const newState = !isFocusMode;
    setIsFocusMode(newState);

    if (newState) {
      document.documentElement.classList.add("focus-mode");
      localStorage.setItem("dot-focus-mode", "true");
    } else {
      document.documentElement.classList.remove("focus-mode");
      localStorage.setItem("dot-focus-mode", "false");
    }
  };

  return (
    <button
      onClick={toggleFocusMode}
      className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-neutral-100 dark:hover:bg-dark-elevated"
      title={isFocusMode ? "Exit focus mode" : "Enter focus mode"}
      aria-pressed={isFocusMode}
    >
      {isFocusMode ? (
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
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="M9 3v18" />
            <path d="M15 3v18" />
          </svg>
          <span className="hidden sm:inline">Show panels</span>
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
            <path d="M8 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3" />
            <path d="M16 3h3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-3" />
            <path d="M12 3v18" />
          </svg>
          <span className="hidden sm:inline">Focus mode</span>
        </>
      )}
    </button>
  );
}
