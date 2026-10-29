import { glob } from "astro/loaders";
import { defineCollection } from "astro:content";
import { z } from "astro/zod";

const astro = defineCollection({
  loader: glob({ base: "./src/content/astro", pattern: "**/*.{md,mdx}"}),
  schema: z.object({
    title: z.string(),
    pubDate: z.coerce.date(),
    tag: z.string()
  })
})

const categories = defineCollection({
  loader: glob({ base: "./src/content/categories", pattern: "**/*.{md, mdx}"}),
  schema: z.object({
    title: z.string(),
    pubDate: z.coerce.date(),
    tag: z.string().optional()
  })
})

export const collections = { astro, categories };