import { useState, useEffect, useCallback, useRef } from "react";
import {
  getModuleAnnotations,
  addBookmark,
  addNote,
  removeBookmark,
  removeNote,
  type Annotation,
} from "@/lib/notes";

interface ContentAnnotationsProps {
  moduleSlug: string;
}

interface TooltipState {
  visible: boolean;
  elementIndex: number;
  elementText: string;
  x: number;
  y: number;
  mode: "actions" | "note-editor";
  existingAnnotation?: Annotation;
}

export default function ContentAnnotations({
  moduleSlug,
}: ContentAnnotationsProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [annotations, setAnnotations] = useState<Map<number, Annotation>>(
    new Map()
  );
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);
  const [noteText, setNoteText] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  // Track client-side mounting
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Load annotations on mount and when they change
  const loadAnnotations = useCallback(() => {
    const moduleAnnotations = getModuleAnnotations(moduleSlug);
    const annotationMap = new Map<number, Annotation>();
    moduleAnnotations.forEach((a) => {
      annotationMap.set(a.elementIndex, a);
    });
    setAnnotations(annotationMap);
  }, [moduleSlug]);

  useEffect(() => {
    loadAnnotations();

    const handleUpdate = () => loadAnnotations();
    window.addEventListener("annotations-updated", handleUpdate);
    return () =>
      window.removeEventListener("annotations-updated", handleUpdate);
  }, [loadAnnotations]);

  // Find and setup annotatable elements
  useEffect(() => {
    const proseContainer = document.querySelector(".prose-custom");
    if (!proseContainer) return;

    // Get all annotatable elements (paragraphs, list items, headings, blockquotes)
    const selector = "p, li, h2, h3, h4, h5, h6, blockquote, .callout, pre";
    const elements = proseContainer.querySelectorAll(selector);

    // Add data attributes for identification
    elements.forEach((el, index) => {
      el.setAttribute("data-annotation-index", String(index));
      el.classList.add("annotatable-element");
    });

    // Setup event listeners
    const handleMouseEnter = (e: Event) => {
      const target = e.currentTarget as HTMLElement;
      const index = parseInt(target.dataset.annotationIndex || "-1", 10);
      if (index >= 0) {
        setHoveredIndex(index);
      }
    };

    const handleMouseLeave = () => {
      // Only clear hover if tooltip is not visible
      if (!tooltip?.visible) {
        setHoveredIndex(null);
      }
    };

    const handleClick = (e: Event) => {
      const target = e.currentTarget as HTMLElement;
      const index = parseInt(target.dataset.annotationIndex || "-1", 10);
      if (index >= 0) {
        const rect = target.getBoundingClientRect();
        const text = target.textContent || "";
        const existingAnnotation = annotations.get(index);

        setTooltip({
          visible: true,
          elementIndex: index,
          elementText: text,
          x: rect.left,
          y: rect.top + window.scrollY,
          mode: "actions",
          existingAnnotation,
        });
        setNoteText(existingAnnotation?.noteText || "");
      }
    };

    elements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
      el.addEventListener("click", handleClick);
    });

    // Cleanup
    return () => {
      elements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
        el.removeEventListener("click", handleClick);
        el.removeAttribute("data-annotation-index");
        el.classList.remove("annotatable-element");
      });
    };
  }, [annotations, tooltip?.visible]);

  // Close tooltip when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(e.target as Node)
      ) {
        setTooltip(null);
        setHoveredIndex(null);
      }
    };

    if (tooltip?.visible) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [tooltip?.visible]);

  const handleBookmark = () => {
    if (!tooltip) return;
    addBookmark(moduleSlug, tooltip.elementIndex, tooltip.elementText);
    setTooltip(null);
    setHoveredIndex(null);
  };

  const handleRemoveBookmark = () => {
    if (!tooltip?.existingAnnotation) return;
    removeBookmark(tooltip.existingAnnotation.id);
    setTooltip(null);
    setHoveredIndex(null);
  };

  const handleAddNote = () => {
    if (!tooltip) return;
    setTooltip({ ...tooltip, mode: "note-editor" });
  };

  const handleSaveNote = () => {
    if (!tooltip || !noteText.trim()) return;
    addNote(moduleSlug, tooltip.elementIndex, tooltip.elementText, noteText);
    setTooltip(null);
    setHoveredIndex(null);
    setNoteText("");
  };

  const handleRemoveNote = () => {
    if (!tooltip?.existingAnnotation) return;
    removeNote(tooltip.existingAnnotation.id);
    setTooltip(null);
    setHoveredIndex(null);
    setNoteText("");
  };

  const handleArrowClick = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const element = document.querySelector(
      `[data-annotation-index="${index}"]`
    );
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const text = element.textContent || "";
    const existingAnnotation = annotations.get(index);

    setTooltip({
      visible: true,
      elementIndex: index,
      elementText: text,
      x: rect.left - 10,
      y: rect.top + window.scrollY,
      mode: "actions",
      existingAnnotation,
    });
    setNoteText(existingAnnotation?.noteText || "");
  };

  // Render annotation indicators
  const renderIndicators = () => {
    const indicators: JSX.Element[] = [];
    // Guard against SSR - only run in browser
    if (typeof document === "undefined") return indicators;
    const proseContainer = document.querySelector(".prose-custom");
    if (!proseContainer) return indicators;

    // Get prose container's position to calculate relative offsets
    const proseRect = proseContainer.getBoundingClientRect();
    const elements = proseContainer.querySelectorAll("[data-annotation-index]");

    elements.forEach((el) => {
      const index = parseInt(
        (el as HTMLElement).dataset.annotationIndex || "-1",
        10
      );
      if (index < 0) return;

      const annotation = annotations.get(index);
      const isHovered = hoveredIndex === index;
      const isTooltipTarget = tooltip?.elementIndex === index;
      const showIndicator = isHovered || isTooltipTarget || annotation;

      if (showIndicator) {
        const rect = el.getBoundingClientRect();

        // Calculate position relative to the prose container
        const relativeTop = rect.top - proseRect.top + rect.height / 2 - 12;

        // Determine color based on state
        let colorClass = "text-amber-400/50"; // Default translucent yellow
        if (isTooltipTarget) {
          colorClass = "text-amber-500"; // Opaque yellow when clicked
        }
        if (annotation) {
          if (annotation.type === "both") {
            colorClass = "text-purple-500"; // Purple for both
          } else if (annotation.type === "bookmark") {
            colorClass = "text-blue-500"; // Blue for bookmark
          } else if (annotation.type === "note") {
            colorClass = "text-green-500"; // Green for note
          }
        }

        indicators.push(
          <button
            key={index}
            onClick={(e) => handleArrowClick(index, e)}
            className={`absolute -left-8 flex h-6 w-6 items-center justify-center rounded transition-all hover:scale-110 ${colorClass}`}
            style={{
              top: relativeTop,
            }}
            aria-label={annotation ? "Edit annotation" : "Add bookmark or note"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        );
      }
    });

    return indicators;
  };

  // Use a portal-like approach by rendering at the container level
  const [, forceUpdate] = useState(0);

  // Force re-render when hoveredIndex changes to update indicator positions
  useEffect(() => {
    const handleScroll = () => forceUpdate((n) => n + 1);
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  // Force update when hover changes
  useEffect(() => {
    forceUpdate((n) => n + 1);
  }, [hoveredIndex, annotations]);

  // Don't render anything during SSR
  if (!isMounted) {
    return null;
  }

  return (
    <div ref={containerRef}>
      {/* Annotation indicators */}
      {renderIndicators()}

      {/* Tooltip */}
      {tooltip?.visible && (
        <div
          ref={tooltipRef}
          className="fixed z-50 w-64 rounded-lg border border-neutral-200 bg-white p-3 shadow-lg dark:border-dark-border dark:bg-dark-surface"
          style={{
            left: Math.max(16, tooltip.x - 260),
            top: tooltip.y,
          }}
        >
          {tooltip.mode === "actions" ? (
            <div className="space-y-2">
              {/* Bookmark actions */}
              {tooltip.existingAnnotation?.type === "bookmark" ||
              tooltip.existingAnnotation?.type === "both" ? (
                <button
                  onClick={handleRemoveBookmark}
                  className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
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
                    <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
                    <line x1="15" y1="9" x2="9" y2="15" />
                    <line x1="9" y1="9" x2="15" y2="15" />
                  </svg>
                  Remove Bookmark
                </button>
              ) : (
                <button
                  onClick={handleBookmark}
                  className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-dark-elevated"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 text-blue-500"
                  >
                    <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
                  </svg>
                  Add Bookmark
                </button>
              )}

              {/* Note actions */}
              {tooltip.existingAnnotation?.type === "note" ||
              tooltip.existingAnnotation?.type === "both" ? (
                <>
                  <button
                    onClick={handleAddNote}
                    className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-dark-elevated"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4 text-green-500"
                    >
                      <path d="M12 20h9" />
                      <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
                    </svg>
                    Edit Note
                  </button>
                  <button
                    onClick={handleRemoveNote}
                    className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
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
                      <path d="M3 6h18" />
                      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                    </svg>
                    Remove Note
                  </button>
                </>
              ) : (
                <button
                  onClick={handleAddNote}
                  className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-dark-elevated"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 text-green-500"
                  >
                    <path d="M12 20h9" />
                    <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
                  </svg>
                  Add Note
                </button>
              )}

              {/* Show existing note preview */}
              {tooltip.existingAnnotation?.noteText && (
                <div className="mt-2 border-t border-neutral-200 pt-2 dark:border-dark-border">
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    Current note:
                  </p>
                  <p className="mt-1 text-sm text-neutral-700 dark:text-neutral-300">
                    {tooltip.existingAnnotation.noteText.length > 100
                      ? tooltip.existingAnnotation.noteText.slice(0, 100) +
                        "..."
                      : tooltip.existingAnnotation.noteText}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                  {tooltip.existingAnnotation?.noteText
                    ? "Edit Note"
                    : "Add Note"}
                </span>
                <button
                  onClick={() => setTooltip({ ...tooltip, mode: "actions" })}
                  className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300"
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
                    <path d="m15 18-6-6 6-6" />
                  </svg>
                </button>
              </div>
              <textarea
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder="Write your note..."
                className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 placeholder-neutral-400 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-dark-border dark:bg-dark-elevated dark:text-neutral-100 dark:placeholder-neutral-500"
                rows={3}
                autoFocus
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => {
                    setTooltip(null);
                    setHoveredIndex(null);
                    setNoteText("");
                  }}
                  className="rounded-md px-3 py-1.5 text-sm text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-dark-elevated"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveNote}
                  disabled={!noteText.trim()}
                  className="rounded-md bg-primary-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-primary-700 disabled:opacity-50 dark:bg-primary-500 dark:hover:bg-primary-600"
                >
                  Save
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
