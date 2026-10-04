import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const rightCard = z.object({
  variant: z.enum(['default', 'hypo', 'formula', 'evo']).default('default'),
  // default variant
  header: z.string().optional().default(''),
  bodyHtml: z.string().optional().default(''),
  // hypo variant
  accent: z.enum(['green', 'gold', 'red']).optional(),
  label: z.string().optional(),
  title: z.string().optional(),
  body: z.string().optional(),
  note: z.string().optional(),
  // formula variant
  equation: z.string().optional(),
  rows: z.array(z.object({ sym: z.string(), desc: z.string() })).optional(),
  // evo variant
  steps: z
    .array(
      z.object({
        num: z.string(),
        title: z.string(),
        body: z.string(),
        formula: z.string().optional(),
      }),
    )
    .optional(),
});

const sectionSchema = z.object({
  id: z.string(),
  num: z.string(),
  title: z.string(),
  navLabel: z.string(),
  chapter: z.enum(['existence', 'reason', 'god', 'revelation', 'religions']),
  order: z.number(),
  rightLabel: z.string().optional(),
  rightCards: z.array(rightCard).default([]),
  replayRecap: z.boolean().default(false),
});

const existence = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/existence' }),
  schema: sectionSchema,
});

const reason = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/reason' }),
  schema: sectionSchema,
});

const god = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/god' }),
  schema: sectionSchema,
});

const revelation = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/revelation' }),
  schema: sectionSchema,
});

const religions = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/religions' }),
  schema: sectionSchema,
});

export const collections = { existence, reason, god, revelation, religions };
