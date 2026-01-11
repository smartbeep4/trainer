import { useState, useEffect, useRef } from "react";
import { markModuleComplete, isModuleComplete } from "../../lib/progress";

interface Props {
  moduleSlug: string;
}

export default function ReadingProgress({ moduleSlug }: Props) {
  const [progress, setProgress] = useState(0);
  const [isFocusMode, setIsFocusMode] = useState(false);
  const hasMarkedComplete = useRef(false);

  useEffect(() => {
    // Reset completion flag when module changes
    hasMarkedComplete.current = isModuleComplete(moduleSlug);

    // Check initial focus mode state
    const checkFocusMode = () => {
      setIsFocusMode(document.documentElement.classList.contains("focus-mode"));
    };
    checkFocusMode();

    // Watch for focus mode changes via MutationObserver
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          checkFocusMode();
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // Scroll handler with RAF throttling
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollTop = window.scrollY;
          const docHeight =
            document.documentElement.scrollHeight - window.innerHeight;
          const scrollPercent = Math.min(
            100,
            Math.round((scrollTop / docHeight) * 100)
          );

          setProgress(scrollPercent);

          // Auto-complete at 90%
          if (scrollPercent >= 90 && !hasMarkedComplete.current) {
            hasMarkedComplete.current = true;
            markModuleComplete(moduleSlug);
            window.dispatchEvent(new CustomEvent("progress-updated"));
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial calculation

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [moduleSlug]);

  // Only render in focus mode
  if (!isFocusMode) return null;

  return (
    <div className="fixed left-0 right-0 top-16 z-30 h-1 bg-neutral-200 dark:bg-dark-border">
      <div
        className="h-full bg-primary-500 transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
