import { useState, useEffect } from "react";
import { parts } from "@/lib/course-data";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close menu on route change
  useEffect(() => {
    const handleRouteChange = () => setIsOpen(false);
    document.addEventListener("astro:after-swap", handleRouteChange);
    return () =>
      document.removeEventListener("astro:after-swap", handleRouteChange);
  }, []);

  return (
    <>
      {/* Menu button - only visible on mobile */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="flex h-9 w-9 items-center justify-center rounded-lg text-neutral-600 transition-colors hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-dark-elevated md:hidden"
        aria-label="Open menu"
        aria-expanded={isOpen}
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
          <line x1="4" x2="20" y1="12" y2="12" />
          <line x1="4" x2="20" y1="6" y2="6" />
          <line x1="4" x2="20" y1="18" y2="18" />
        </svg>
      </button>

      {/* Mobile menu overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* Menu panel */}
          <div className="absolute inset-y-0 left-0 w-full max-w-xs bg-white shadow-xl dark:bg-dark-surface">
            {/* Header */}
            <div className="flex h-16 items-center justify-between border-b border-neutral-200 px-4 dark:border-dark-border">
              <span className="font-semibold text-neutral-900 dark:text-neutral-100">
                Course Menu
              </span>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-neutral-600 transition-colors hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-dark-elevated"
                aria-label="Close menu"
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
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>

            {/* Menu content */}
            <nav className="h-[calc(100%-4rem)] overflow-y-auto p-4">
              {/* Quick links */}
              <div className="mb-6 space-y-1">
                <a
                  href="/"
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-neutral-900 hover:bg-neutral-100 dark:text-neutral-100 dark:hover:bg-dark-elevated"
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
                    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                  Home
                </a>
                <a
                  href="/progress"
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-neutral-900 hover:bg-neutral-100 dark:text-neutral-100 dark:hover:bg-dark-elevated"
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
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                  </svg>
                  My Progress
                </a>
              </div>

              <div className="mb-4 border-t border-neutral-200 dark:border-dark-border" />

              {/* Course structure */}
              <div className="space-y-4">
                {parts.map((part) => (
                  <div key={part.number}>
                    <h3 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-500">
                      Part {part.number}: {part.title}
                    </h3>
                    <ul className="space-y-1">
                      {part.modules.map((module) => (
                        <li key={module.id}>
                          <a
                            href={`/module/${module.slug}`}
                            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-dark-elevated dark:hover:text-neutral-100"
                          >
                            <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center text-xs font-medium text-neutral-400 dark:text-neutral-600">
                              {module.id}
                            </span>
                            <span className="line-clamp-1">{module.title}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
