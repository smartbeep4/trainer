/**
 * Reading time calculation utilities
 */

/**
 * Calculate estimated reading time from word count
 * @param wordCount - Number of words in the content
 * @param wordsPerMinute - Average reading speed (default 200 WPM)
 * @returns Formatted reading time string
 */
export function calculateReadingTime(
  wordCount: number,
  wordsPerMinute: number = 200
): string {
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  if (minutes < 60) {
    return `${minutes} min read`;
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  if (remainingMinutes === 0) {
    return `${hours}h read`;
  }
  return `${hours}h ${remainingMinutes}m read`;
}

/**
 * Count words in a text string
 * @param text - The text to count words in
 * @returns Number of words
 */
export function countWords(text: string): number {
  return text.split(/\s+/).filter(Boolean).length;
}

/**
 * Estimate reading time from raw markdown/text content
 * @param content - The content to estimate reading time for
 * @param wordsPerMinute - Average reading speed (default 200 WPM)
 * @returns Formatted reading time string
 */
export function estimateReadingTime(
  content: string,
  wordsPerMinute: number = 200
): string {
  const wordCount = countWords(content);
  return calculateReadingTime(wordCount, wordsPerMinute);
}
