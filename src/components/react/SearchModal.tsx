import { useState, useEffect, useMemo } from "react";
import Fuse, { type FuseResultMatch } from "fuse.js";
import { X } from "lucide-react";

export interface SearchIndexItem {
  slug: string;
  title: string;
  description: string;
  headings: string[];
  content: string; // stripped plain text excerpt
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  searchIndex: SearchIndexItem[];
}

interface SearchResult {
  item: SearchIndexItem;
  score?: number;
  matches?: FuseResultMatch[];
}

export default function SearchModal({
  isOpen,
  onClose,
  searchIndex,
}: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Initialize Fuse (lightweight client-side search)
  const fuse = useMemo(() => {
    if (!searchIndex || searchIndex.length === 0) return null;
    return new Fuse(searchIndex, {
      keys: [
        { name: "title", weight: 3 },
        { name: "headings", weight: 2 },
        { name: "description", weight: 1.5 },
        { name: "content", weight: 1 },
      ],
      threshold: 0.35,
      distance: 100,
      includeScore: true,
      includeMatches: true,
      minMatchCharLength: 2,
    });
  }, [searchIndex]);

  // Perform search when query or fuse changes
  useEffect(() => {
    if (!query.trim() || !fuse) {
      setResults([]);
      setSelectedIndex(0);
      return;
    }

    const searchResults = fuse.search(query.trim()).slice(0, 8); // top 8 results
    setResults(searchResults as SearchResult[]);
    setSelectedIndex(0);
  }, [query, fuse]);

  // Keyboard navigation + global hotkey handling inside modal
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        handleClose();
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
      }
      if (e.key === "Enter" && results.length > 0) {
        e.preventDefault();
        navigateToResult(results[selectedIndex].item);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, results, selectedIndex]);

  // Focus the input when modal opens
  useEffect(() => {
    if (isOpen) {
      // Small delay so the input is mounted
      const timer = setTimeout(() => {
        const input = document.getElementById(
          "search-input"
        ) as HTMLInputElement;
        input?.focus();
        input?.select();
      }, 50);
      return () => clearTimeout(timer);
    } else {
      setQuery("");
      setResults([]);
      setSelectedIndex(0);
    }
  }, [isOpen]);

  const handleClose = () => {
    setQuery("");
    setResults([]);
    onClose();
  };

  const navigateToResult = (item: SearchIndexItem) => {
    handleClose();
    // Use client-side navigation (Astro View Transitions friendly)
    window.location.href = `/module/${item.slug}`;
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center bg-black/60 px-4 pt-[10vh]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="search-modal-title"
      onClick={handleClose}
    >
      <div
        className="w-full max-w-2xl overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-2xl dark:border-dark-border dark:bg-dark-surface"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header / Input */}
        <div className="flex items-center gap-3 border-b border-neutral-200 px-4 py-3 dark:border-dark-border">
          <div className="flex flex-1 items-center gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-neutral-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              id="search-input"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search modules, headings, or content..."
              className="flex-1 bg-transparent text-lg placeholder:text-neutral-400 focus:outline-none dark:text-neutral-100"
              autoComplete="off"
            />
          </div>
          <button
            onClick={handleClose}
            className="rounded-lg p-2 text-neutral-400 transition-colors hover:bg-neutral-100 dark:hover:bg-dark-elevated"
            aria-label="Close search"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto">
          {query.trim() && results.length === 0 && (
            <div className="px-4 py-8 text-center text-neutral-500 dark:text-neutral-400">
              No results for “{query}”. Try different keywords.
            </div>
          )}

          {!query.trim() && (
            <div className="px-4 py-6 text-sm text-neutral-500 dark:text-neutral-400">
              <div className="mb-2 font-medium">Quick tips</div>
              <ul className="space-y-1 text-xs">
                <li>• Search by module title, section headings, or keywords</li>
                <li>• Use ↑↓ arrows + Enter to navigate results</li>
                <li>• Press Esc to close</li>
              </ul>
            </div>
          )}

          {results.length > 0 && (
            <div className="py-2">
              {results.map((result, index) => {
                const item = result.item;
                const isSelected = index === selectedIndex;
                return (
                  <button
                    key={item.slug}
                    onClick={() => navigateToResult(item)}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={`flex w-full flex-col gap-1 px-4 py-3 text-left transition-colors ${
                      isSelected
                        ? "bg-primary-50 dark:bg-primary-900/20"
                        : "hover:bg-neutral-50 dark:hover:bg-dark-elevated"
                    }`}
                  >
                    <div className="font-medium text-neutral-900 dark:text-neutral-100">
                      {item.title}
                    </div>
                    <div className="line-clamp-2 text-sm text-neutral-600 dark:text-neutral-400">
                      {item.description}
                    </div>
                    {item.headings.length > 0 && (
                      <div className="mt-0.5 text-xs text-neutral-500 dark:text-neutral-500">
                        {item.headings.slice(0, 2).join(" • ")}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-neutral-200 px-4 py-2 text-[10px] text-neutral-400 dark:border-dark-border">
          <div>
            {results.length > 0
              ? `${results.length} result${results.length === 1 ? "" : "s"}`
              : "Search the full course"}
          </div>
          <div className="hidden sm:block">
            ↑↓ to navigate • Enter to open • Esc to close
          </div>
        </div>
      </div>
    </div>
  );
}
