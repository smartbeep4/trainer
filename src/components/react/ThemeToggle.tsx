import { useState, useEffect } from "react";
import {
  getTheme,
  setTheme,
  onSystemThemeChange,
  type Theme,
} from "@/lib/theme";

const themes: { value: Theme; icon: JSX.Element; label: string }[] = [
  {
    value: "light",
    label: "Light",
    icon: (
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
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2" />
        <path d="M12 20v2" />
        <path d="m4.93 4.93 1.41 1.41" />
        <path d="m17.66 17.66 1.41 1.41" />
        <path d="M2 12h2" />
        <path d="M20 12h2" />
        <path d="m6.34 17.66-1.41 1.41" />
        <path d="m19.07 4.93-1.41 1.41" />
      </svg>
    ),
  },
  {
    value: "dark",
    label: "Dark",
    icon: (
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
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
      </svg>
    ),
  },
  {
    value: "system",
    label: "System",
    icon: (
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
        <rect width="20" height="14" x="2" y="3" rx="2" />
        <line x1="8" x2="16" y1="21" y2="21" />
        <line x1="12" x2="12" y1="17" y2="21" />
      </svg>
    ),
  },
];

export default function ThemeToggle() {
  const [currentTheme, setCurrentTheme] = useState<Theme>("system");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setCurrentTheme(getTheme());

    // Listen for system theme changes
    const cleanup = onSystemThemeChange(() => {
      // Force re-render when system theme changes
      setCurrentTheme(getTheme());
    });

    return cleanup;
  }, []);

  const handleThemeChange = (theme: Theme) => {
    setTheme(theme);
    setCurrentTheme(theme);
    setIsOpen(false);
  };

  const currentThemeData =
    themes.find((t) => t.value === currentTheme) || themes[2];

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-9 w-9 items-center justify-center rounded-lg text-neutral-600 transition-colors hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-dark-elevated"
        aria-label={`Theme: ${currentThemeData.label}. Click to change.`}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {currentThemeData.icon}
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* Dropdown */}
          <div
            className="absolute right-0 top-full z-50 mt-2 w-36 rounded-lg border border-neutral-200 bg-white py-1 shadow-lg dark:border-dark-border dark:bg-dark-surface"
            role="menu"
          >
            {themes.map((theme) => (
              <button
                key={theme.value}
                type="button"
                onClick={() => handleThemeChange(theme.value)}
                className={`flex w-full items-center gap-2 px-3 py-2 text-sm transition-colors ${
                  currentTheme === theme.value
                    ? "bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-300"
                    : "text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-dark-elevated"
                }`}
                role="menuitem"
              >
                {theme.icon}
                <span>{theme.label}</span>
                {currentTheme === theme.value && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="ml-auto h-4 w-4"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
