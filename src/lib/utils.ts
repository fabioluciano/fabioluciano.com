// =============================================================================
// General Utilities
// =============================================================================

import type { Locale } from '@/config';

// =============================================================================
// Date Formatting
// =============================================================================

const dateFormatters: Record<Locale, Intl.DateTimeFormat> = {
  pt: new Intl.DateTimeFormat('pt-BR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }),
  en: new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }),
};

const shortDateFormatters: Record<Locale, Intl.DateTimeFormat> = {
  pt: new Intl.DateTimeFormat('pt-BR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }),
  en: new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }),
};

/**
 * Format date for display
 */
export function formatDate(date: Date | string, locale: Locale = 'pt'): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return dateFormatters[locale].format(d);
}

/**
 * Format date in short format
 */
export function formatShortDate(
  date: Date | string,
  locale: Locale = 'pt'
): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return shortDateFormatters[locale].format(d);
}

/**
 * Format date as ISO string (for datetime attributes)
 */
export function formatISODate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toISOString();
}

/**
 * Get relative time string (e.g., "2 days ago")
 */
export function getRelativeTime(
  date: Date | string,
  locale: Locale = 'pt'
): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - d.getTime()) / 1000);

  const rtf = new Intl.RelativeTimeFormat(locale === 'pt' ? 'pt-BR' : 'en-US', {
    numeric: 'auto',
  });

  if (diffInSeconds < 60) {
    return rtf.format(-diffInSeconds, 'second');
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return rtf.format(-diffInMinutes, 'minute');
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return rtf.format(-diffInHours, 'hour');
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return rtf.format(-diffInDays, 'day');
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return rtf.format(-diffInMonths, 'month');
  }

  const diffInYears = Math.floor(diffInDays / 365);
  return rtf.format(-diffInYears, 'year');
}

// =============================================================================
// String Utilities
// =============================================================================

/**
 * Slugify a string
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/[^\w\s-]/g, '') // Remove special chars
    .replace(/\s+/g, '-') // Replace spaces with dashes
    .replace(/--+/g, '-') // Replace multiple dashes
    .trim()
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing dashes
}

/**
 * Truncate text with ellipsis
 */
export function truncate(text: string, maxLength: number = 150): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}

/**
 * Strip HTML tags from string
 */
export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '');
}

/**
 * Capitalize first letter
 */
export function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

// =============================================================================
// Reading Time
// =============================================================================

/**
 * Format reading time for display
 */
export function formatReadingTime(
  minutes: number,
  locale: Locale = 'pt'
): string {
  if (locale === 'en') {
    return `${minutes} min read`;
  }
  return `${minutes} min de leitura`;
}

// =============================================================================
// URL Utilities
// =============================================================================

/**
 * Join URL segments
 */
export function joinUrl(...segments: string[]): string {
  return segments
    .map((s) => s.replace(/^\/+|\/+$/g, ''))
    .filter(Boolean)
    .join('/');
}

/**
 * Check if URL is external
 */
export function isExternalUrl(url: string): boolean {
  return /^https?:\/\//.test(url);
}

/**
 * Add query params to URL
 */
export function addQueryParams(
  url: string,
  params: Record<string, string>
): string {
  const urlObj = new URL(url, 'https://example.com');
  Object.entries(params).forEach(([key, value]) => {
    urlObj.searchParams.set(key, value);
  });
  return urlObj.pathname + urlObj.search;
}

// =============================================================================
// Array Utilities
// =============================================================================

/**
 * Chunk array into smaller arrays
 */
export function chunk<T>(array: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

/**
 * Get unique values from array
 */
export function unique<T>(array: T[]): T[] {
  return [...new Set(array)];
}

/**
 * Group array by key
 */
export function groupBy<T, K extends string | number>(
  array: T[],
  keyFn: (item: T) => K
): Record<K, T[]> {
  return array.reduce(
    (acc, item) => {
      const key = keyFn(item);
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(item);
      return acc;
    },
    {} as Record<K, T[]>
  );
}

// =============================================================================
// Class Name Utilities
// =============================================================================

type ClassValue = string | undefined | null | false | ClassValue[];

/**
 * Merge class names (simple cn function)
 */
export function cn(...classes: ClassValue[]): string {
  return classes
    .flat()
    .filter((c): c is string => typeof c === 'string' && c.length > 0)
    .join(' ');
}
