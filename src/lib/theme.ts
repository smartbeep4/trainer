/**
 * Theme management utilities
 */

export type Theme = "light" | "dark" | "system";

const STORAGE_KEY = "dot-theme";

/**
 * Get the current theme preference
 */
export function getTheme(): Theme {
  if (typeof window === "undefined") {
    return "system";
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
    if (stored && ["light", "dark", "system"].includes(stored)) {
      return stored;
    }
  } catch {
    // localStorage not available
  }

  return "system";
}

/**
 * Save theme preference
 */
export function setTheme(theme: Theme): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    localStorage.setItem(STORAGE_KEY, theme);
    applyTheme(theme);
  } catch {
    // localStorage not available
  }
}

/**
 * Apply theme to document
 */
export function applyTheme(theme: Theme): void {
  if (typeof window === "undefined") {
    return;
  }

  const root = document.documentElement;
  const isDark =
    theme === "dark" ||
    (theme === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  if (isDark) {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
}

/**
 * Initialize theme on page load (prevents FOUC)
 * This should be called in a script tag in the head
 */
export function initTheme(): void {
  const theme = getTheme();
  applyTheme(theme);
}

/**
 * Get the resolved theme (light or dark, never system)
 */
export function getResolvedTheme(): "light" | "dark" {
  const theme = getTheme();

  if (theme === "system") {
    if (typeof window === "undefined") {
      return "light";
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  return theme;
}

/**
 * Listen for system theme changes
 */
export function onSystemThemeChange(
  callback: (isDark: boolean) => void
): () => void {
  if (typeof window === "undefined") {
    return () => {};
  }

  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const handler = (e: MediaQueryListEvent) => {
    if (getTheme() === "system") {
      applyTheme("system");
      callback(e.matches);
    }
  };

  mediaQuery.addEventListener("change", handler);
  return () => mediaQuery.removeEventListener("change", handler);
}
