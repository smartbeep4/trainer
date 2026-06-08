import { useState, useEffect } from "react";
import SearchModal, { type SearchIndexItem } from "./SearchModal";

interface GlobalSearchProps {
  searchIndex: SearchIndexItem[];
}

/**
 * Client-only component that owns global Cmd/Ctrl+K search behavior
 * and renders the actual SearchModal island.
 */
export default function GlobalSearch({ searchIndex }: GlobalSearchProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Global keyboard shortcut (Cmd/Ctrl + K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
      if ((isMac ? e.metaKey : e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Also allow opening via custom event (from header button)
  useEffect(() => {
    const openHandler = () => setIsOpen(true);
    window.addEventListener("open-global-search", openHandler);
    return () => window.removeEventListener("open-global-search", openHandler);
  }, []);

  return (
    <SearchModal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      searchIndex={searchIndex}
    />
  );
}
