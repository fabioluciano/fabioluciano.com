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
