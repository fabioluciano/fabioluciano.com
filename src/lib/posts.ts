// =============================================================================
// Posts Utilities
// =============================================================================

import { getCollection, type CollectionEntry } from 'astro:content';
import { getSiteConfig, type Locale } from '@/config';
import readingTime from 'reading-time';

export type Post = CollectionEntry<'posts'>;

// =============================================================================
// Filtering Functions
// =============================================================================

/**
 * Get all published posts (excluding drafts in production)
 */
export async function getAllPosts(): Promise<Post[]> {
  const posts = await getCollection('posts', ({ data }) => {
    // In production, exclude drafts
    if (import.meta.env.PROD && data.draft) {
      return false;
    }
    return true;
  });

  return sortPostsByDate(posts);
}

/**
 * Get posts by locale
 */
export async function getPostsByLocale(locale: Locale): Promise<Post[]> {
  const posts = await getAllPosts();
  return posts.filter((post) => post.data.locale === locale);
}

/**
 * Get posts by category
 */
export async function getPostsByCategory(category: string): Promise<Post[]> {
  const posts = await getAllPosts();
  return posts.filter(
    (post) => post.data.category.toLowerCase() === category.toLowerCase()
  );
}

/**
 * Get posts by tag
 */
export async function getPostsByTag(tag: string): Promise<Post[]> {
  const posts = await getAllPosts();
  return posts.filter((post) =>
    post.data.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
  );
}

/**
 * Get posts by series (series is now a simple string in frontmatter)
 */
export async function getPostsBySeries(seriesSlug: string): Promise<Post[]> {
  const posts = await getAllPosts();
  return posts
    .filter((post) => post.data.series === seriesSlug)
    .sort((a, b) => (a.data.seriesOrder ?? 0) - (b.data.seriesOrder ?? 0));
}

/**
 * Get all unique series from posts
 */
export async function getAllSeries(locale?: Locale): Promise<string[]> {
  const posts = locale ? await getPostsByLocale(locale) : await getAllPosts();

  const series = new Set<string>();
  posts.forEach((post) => {
    if (post.data.series) {
      series.add(post.data.series);
    }
  });

  return Array.from(series).sort();
}

/**
 * Get series info (aggregated from posts)
 */
export async function getSeriesInfo(seriesSlug: string, locale?: Locale) {
  const posts = await getPostsBySeries(seriesSlug);
  const filteredPosts = locale
    ? posts.filter((p) => p.data.locale === locale)
    : posts;

  if (filteredPosts.length === 0) return null;

  // Use first post's info as base
  const firstPost = filteredPosts[0];

  return {
    slug: seriesSlug,
    name: seriesSlug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
    posts: filteredPosts,
    totalPosts: filteredPosts.length,
    locale: firstPost.data.locale,
  };
}

// =============================================================================
// Single Post Functions
// =============================================================================

/**
 * Get a single post by slug (handles locale prefix)
 */
export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  const posts = await getAllPosts();
  return posts.find((post) => {
    // id format: "pt/post-slug" or "en/post-slug"
    const postSlug = post.id.split('/').pop();
    return postSlug === slug || post.id === slug;
  });
}

/**
 * Get localized post - finds the best match for locale
 */
export async function getLocalizedPost(
  slug: string,
  preferredLocale: Locale
): Promise<Post | undefined> {
  const posts = await getAllPosts();

  // Try exact match with locale prefix
  let post = posts.find((p) => p.id === `${preferredLocale}/${slug}`);

  // Fallback to other locale
  if (!post) {
    post = posts.find((p) => p.id.endsWith(`/${slug}`));
  }

  return post;
}

/**
 * Get translation of a post if available
 */
export async function getPostTranslation(
  post: Post
): Promise<Post | undefined> {
  if (!post.data.translationSlug) return undefined;

  const posts = await getAllPosts();
  const targetLocale = post.data.locale === 'pt' ? 'en' : 'pt';

  return posts.find(
    (p) =>
      p.data.locale === targetLocale &&
      p.id.endsWith(`/${post.data.translationSlug}`)
  );
}

// =============================================================================
// Navigation Functions
// =============================================================================

/**
 * Get previous and next posts in a series (filtered by locale)
 */
export async function getSeriesNavigation(post: Post): Promise<{
  previous: Post | undefined;
  next: Post | undefined;
  total: number;
  current: number;
  seriesName: string;
  seriesSlug: string;
  allPosts: Post[];
}> {
  if (!post.data.series) {
    return {
      previous: undefined,
      next: undefined,
      total: 0,
      current: 0,
      seriesName: '',
      seriesSlug: '',
      allPosts: [],
    };
  }

  const allSeriesPosts = await getPostsBySeries(post.data.series);
  // Filter by the same locale as the current post
  const seriesPosts = allSeriesPosts.filter((p) => p.data.locale === post.data.locale);
  const currentIndex = seriesPosts.findIndex((p) => p.id === post.id);
  const seriesName = post.data.series.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

  return {
    previous: currentIndex > 0 ? seriesPosts[currentIndex - 1] : undefined,
    next:
      currentIndex < seriesPosts.length - 1
        ? seriesPosts[currentIndex + 1]
        : undefined,
    total: seriesPosts.length,
    current: currentIndex + 1,
    seriesName,
    seriesSlug: post.data.series,
    allPosts: seriesPosts,
  };
}

/**
 * Get related posts (by tags and category)
 */
export async function getRelatedPosts(
  post: Post,
  limit: number = 3
): Promise<Post[]> {
  const posts = await getPostsByLocale(post.data.locale);

  // Score each post based on shared tags and category
  const scored = posts
    .filter((p) => p.id !== post.id)
    .map((p) => {
      let score = 0;

      // Same category: +2 points
      if (p.data.category === post.data.category) {
        score += 2;
      }

      // Shared tags: +1 point each
      const sharedTags = p.data.tags.filter((tag) =>
        post.data.tags.includes(tag)
      );
      score += sharedTags.length;

      return { post: p, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  return scored.map((item) => item.post);
}

// =============================================================================
// Metadata Functions
// =============================================================================

/**
 * Calculate reading time for a post
 */
export function calculateReadingTime(content: string): number {
  const config = getSiteConfig();
  const stats = readingTime(content, {
    wordsPerMinute: config.readingTime.wordsPerMinute,
  });
  return Math.ceil(stats.minutes);
}

/**
 * Get all unique tags from posts
 */
export async function getAllTags(locale?: Locale): Promise<string[]> {
  const posts = locale ? await getPostsByLocale(locale) : await getAllPosts();

  const tags = new Set<string>();
  posts.forEach((post) => {
    post.data.tags.forEach((tag) => tags.add(tag));
  });

  return Array.from(tags).sort();
}

/**
 * Get all unique categories from posts
 */
export async function getAllCategories(locale?: Locale): Promise<string[]> {
  const posts = locale ? await getPostsByLocale(locale) : await getAllPosts();

  const categories = new Set<string>();
  posts.forEach((post) => {
    categories.add(post.data.category);
  });

  return Array.from(categories).sort();
}

/**
 * Get tag counts
 */
export async function getTagCounts(
  locale?: Locale
): Promise<Map<string, number>> {
  const posts = locale ? await getPostsByLocale(locale) : await getAllPosts();

  const counts = new Map<string, number>();
  posts.forEach((post) => {
    post.data.tags.forEach((tag) => {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    });
  });

  return counts;
}

/**
 * Get category counts
 */
export async function getCategoryCounts(
  locale?: Locale
): Promise<Map<string, number>> {
  const posts = locale ? await getPostsByLocale(locale) : await getAllPosts();

  const counts = new Map<string, number>();
  posts.forEach((post) => {
    counts.set(post.data.category, (counts.get(post.data.category) ?? 0) + 1);
  });

  return counts;
}

/**
 * Get series counts
 */
export async function getSeriesCounts(
  locale?: Locale
): Promise<Map<string, number>> {
  const posts = locale ? await getPostsByLocale(locale) : await getAllPosts();

  const counts = new Map<string, number>();
  posts.forEach((post) => {
    if (post.data.series) {
      counts.set(post.data.series, (counts.get(post.data.series) ?? 0) + 1);
    }
  });

  return counts;
}

// =============================================================================
// Sorting Functions
// =============================================================================

/**
 * Sort posts by date (newest first)
 */
export function sortPostsByDate(posts: Post[]): Post[] {
  return [...posts].sort(
    (a, b) =>
      new Date(b.data.publishedAt).getTime() -
      new Date(a.data.publishedAt).getTime()
  );
}

/**
 * Extract slug without locale prefix
 */
export function getPostSlug(post: Post): string {
  return post.id.split('/').pop() ?? post.id;
}

/**
 * Get full URL path for a post
 */
export function getPostUrl(post: Post): string {
  return `/${getPostSlug(post)}`;
}
