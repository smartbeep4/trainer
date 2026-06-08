import type { CollectionEntry } from "astro:content";

/**
 * Lightweight search index item (serialized for client).
 * Generated at build time from the modules collection.
 */
export interface SearchIndexItem {
  slug: string;
  title: string;
  description: string;
  headings: string[];
  content: string; // plain text excerpt for better recall
}

/**
 * Build a search index from the Astro content collection.
 * This runs at build time (server) and produces a small serializable array.
 */
export function buildSearchIndex(
  modules: CollectionEntry<"modules">[]
): SearchIndexItem[] {
  return modules.map((entry) => {
    const { title, description } = entry.data;
    const slug = entry.slug;

    // Extract headings from the rendered content (best effort)
    // We use the raw body + simple regex for h2/h3 as a pragmatic static approach.
    const rawBody = entry.body || "";
    const headingMatches = rawBody.match(/^#{2,3}\s+(.+)$/gm) || [];
    const headings = headingMatches
      .map((h) => h.replace(/^#{2,3}\s+/, "").trim())
      .filter(Boolean)
      .slice(0, 6); // limit for index size

    // Create a compact plain-text excerpt (strip most markdown)
    const plainContent = rawBody
      .replace(/```[\s\S]*?```/g, " ") // remove code blocks
      .replace(/`[^`]+`/g, " ")
      .replace(/#{1,6}\s+/g, " ")
      .replace(/\*\*?([^*]+)\*\*?/g, "$1")
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 1200); // keep index small

    return {
      slug,
      title,
      description: description || "",
      headings,
      content: plainContent,
    };
  });
}
