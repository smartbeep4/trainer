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
  }),
});

export const collections = {
  modules: modulesCollection,
};
