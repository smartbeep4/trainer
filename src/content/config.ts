import { z, defineCollection } from "astro:content";

const modulesCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    part: z.number().min(1).max(4),
    partTitle: z.string(),
    moduleNumber: z.number().min(1).max(23),
    duration: z.string(),
    difficulty: z.enum([
      "Beginner",
      "Beginner-Intermediate",
      "Intermediate",
      "Intermediate-Advanced",
      "Advanced",
    ]),
    objectives: z.array(z.string()),
    published: z.boolean().default(true),
    // Optional reading time override (auto-calculated if not provided)
    readingTime: z.string().optional(),
    // Optional exercise time for hands-on activities
    exerciseTime: z.string().optional(),
  }),
});

export const collections = {
  modules: modulesCollection,
};

// Re-export reading time utility for convenience
// Note: calculateReadingTime is now in @/lib/reading-time.ts
export { calculateReadingTime } from "@/lib/reading-time";
