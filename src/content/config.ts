import { defineCollection, z } from 'astro:content';

// Схема описана человеческим языком в CONTENT-SCHEMA.md — держать файлы синхронно.

// Блоки программы — каждый отдельным .md
const blocks = defineCollection({
  type: 'content',
  schema: z.object({
    order: z.number(),
    title: z.string(),
    tag: z.string().optional(),      // короткая подпись под заголовком
    outcome: z.string().optional(),  // что участница получает на выходе
  }),
});

// Эксперты — их несколько (главное отличие от «Алхимии молодости»)
const experts = defineCollection({
  type: 'content',
  schema: z.object({
    order: z.number(),
    lead: z.boolean().default(false), // true только у Марины
    name: z.string(),
    badge: z.string().optional(),
    role: z.string().optional(),
    blocks: z.string().optional(),
    photo: z.string().optional(),
    credentials: z.array(z.string()).optional(),
  }),
});

// Тарифы
const tariffs = defineCollection({
  type: 'content',
  schema: z.object({
    order: z.number(),
    name: z.string(),
    price: z.string(),
    badge: z.string().optional(),
    limit: z.string().optional(),
    features: z.array(z.string()),
    cta: z.string().default('Забронировать место'),
  }),
});

// Синглтоны страницы — поля опциональны, каждый файл берёт нужное
const page = defineCollection({
  type: 'content',
  schema: z.object({
    eyebrow: z.string().optional(),
    badge: z.string().optional(),
    title: z.string().optional(),
    titleMain: z.string().optional(),
    titleAccent: z.string().optional(),
    titleTail: z.string().optional(),
    subtitle: z.string().optional(),
    ctaPrimary: z.string().optional(),
    ctaSecondary: z.string().optional(),
    button: z.string().optional(),
    note: z.string().optional(),
    photo: z.string().optional(),
    photoAlt: z.string().optional(),
    trust: z.array(z.string()).optional(),
    stats: z.array(z.object({ value: z.string(), label: z.string() })).optional(),
    items: z.array(z.object({ label: z.string(), value: z.string() })).optional(),
    altTitles: z.array(z.string()).optional(),
  }),
});

export const collections = { blocks, experts, tariffs, page };
