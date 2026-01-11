import { useState, useEffect } from "react";

interface Heading {
  depth: number;
  slug: string;
  text: string;
}

interface MobileTableOfContentsProps {
  headings: Heading[];
}

export default function MobileTableOfContents({
  headings,
}: MobileTableOfContentsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeHeading, setActiveHeading] = useState<string | null>(null);

  // Filter to only h2 and h3
  const filteredHeadings = headings.filter((h) => h.depth >= 2 && h.depth <= 3);

  useEffect(() => {
    if (filteredHeadings.length === 0) return;

    const headingElements = filteredHeadings
      .map((h) => document.getElementById(h.slug))
      .filter(Boolean) as HTMLElement[];

    if (headingElements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHeading(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-80px 0px -80% 0px",
        threshold: 0,
      }
    );

    headingElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [filteredHeadings]);

  if (filteredHeadings.length === 0) {
    return null;
  }

  const activeHeadingText =
    filteredHeadings.find((h) => h.slug === activeHeading)?.text ||
    filteredHeadings[0]?.text ||
    "On this page";

  return (
    <div className="sticky top-16 z-30 -mx-4 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 dark:bg-dark-bg/95 dark:supports-[backdrop-filter]:bg-dark-bg/80 xl:hidden">
      <div className="border-b border-neutral-200 px-4 dark:border-dark-border">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex w-full items-center justify-between py-3"
          aria-expanded={isOpen}
          aria-controls="mobile-toc-menu"
        >
          <div className="flex items-center gap-2 text-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4 text-neutral-500"
            >
              <line x1="8" x2="21" y1="6" y2="6" />
              <line x1="8" x2="21" y1="12" y2="12" />
              <line x1="8" x2="21" y1="18" y2="18" />
              <line x1="3" x2="3.01" y1="6" y2="6" />
              <line x1="3" x2="3.01" y1="12" y2="12" />
              <line x1="3" x2="3.01" y1="18" y2="18" />
            </svg>
            <span className="font-medium text-neutral-700 dark:text-neutral-300">
              On this page
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="max-w-[150px] truncate text-sm text-neutral-500 dark:text-neutral-400">
              {activeHeadingText}
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`h-4 w-4 text-neutral-400 transition-transform ${
                isOpen ? "rotate-180" : ""
              }`}
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </div>
        </button>

        {/* Dropdown menu */}
        {isOpen && (
          <nav
            id="mobile-toc-menu"
            className="max-h-64 overflow-y-auto pb-3"
            aria-label="Table of contents"
          >
            <ul className="space-y-1">
              {filteredHeadings.map((heading) => (
                <li
                  key={heading.slug}
                  style={{
                    paddingLeft: heading.depth === 3 ? "1rem" : "0",
                  }}
                >
                  <a
                    href={`#${heading.slug}`}
                    onClick={() => setIsOpen(false)}
                    className={`block rounded-md px-3 py-2 text-sm transition-colors ${
                      activeHeading === heading.slug
                        ? "bg-primary-50 font-medium text-primary-700 dark:bg-primary-900/20 dark:text-primary-300"
                        : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-dark-elevated dark:hover:text-neutral-100"
                    }`}
                  >
                    {heading.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </div>
  );
}
