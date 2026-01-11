import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
// import sitemap from "@astrojs/sitemap";

import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

export default defineConfig({
  site: "https://developer-of-tomorrow.onrender.com",
  output: "static",

  integrations: [
    react(),
    tailwind({ applyBaseStyles: false }),
    mdx({
      syntaxHighlight: "shiki",
      shikiConfig: {
        themes: {
          light: "github-light",
          dark: "github-dark",
        },
      },
      remarkPlugins: [remarkMath],
      rehypePlugins: [
        rehypeKatex,
        rehypeSlug,
        [rehypeAutolinkHeadings, { behavior: "wrap" }],
      ],
    }),
    // sitemap(),
  ],

  prefetch: {
    prefetchAll: true,
    defaultStrategy: "viewport",
  },

  vite: {
    ssr: {
      noExternal: ["@radix-ui/*"],
    },
  },
});
