// =============================================================================
// Content Collections Configuration
// =============================================================================

import { defineCollection, z } from 'astro:content';

// =============================================================================
// Posts Collection
// =============================================================================

const postsCollection = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      // Required fields
      title: z.string().min(1),
      description: z.string().min(1).max(300),
      publishedAt: z.coerce.date(),
      locale: z.enum(['pt', 'en']),
      category: z.string(),
      tags: z.array(z.string()).min(1),

      // Optional fields
      updatedAt: z.coerce.date().optional(),
      draft: z.boolean().default(false),

      // Series (simple string - series slug)
      series: z.string().optional(),
      seriesOrder: z.number().int().positive().optional(),

      // SEO
      canonicalUrl: z.string().url().optional(),
      ogImage: image().optional(),
      noIndex: z.boolean().default(false),

      // Display options
      toc: z.boolean().default(true),
      comments: z.boolean().default(true),

      // Cover image
      coverImage: image().optional(),
      coverImageAlt: z.string().optional(),

      // Author override (if different from default)
      author: z.string().optional(),

      // Translation reference (slug of the translated version)
      translationSlug: z.string().optional(),
    }),
});

// =============================================================================
// Export Collections
// =============================================================================

export const collections = {
  posts: postsCollection,
};
