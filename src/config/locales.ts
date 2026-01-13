// =============================================================================
// Locale Configuration - Centralized i18n settings
// =============================================================================

export const LOCALES = ['pt', 'en'] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'pt';

export const localeConfig: Record<Locale, { prefix: string; label: string; flag: string }> = {
  pt: { prefix: '', label: 'Português', flag: '🇧🇷' },
  en: { prefix: '/en', label: 'English', flag: '🇺🇸' },
};

/**
 * Get URL prefix for a locale
 */
export function getUrlPrefix(locale: Locale): string {
  return localeConfig[locale].prefix;
}

/**
 * Get locale from URL path
 */
export function getLocaleFromPath(path: string): Locale {
  if (path.startsWith('/en/') || path === '/en') {
    return 'en';
  }
  if (path.startsWith('/pt/') || path === '/pt') {
    return 'pt';
  }
  return DEFAULT_LOCALE;
}

/**
 * Build localized URL
 */
export function localizeUrl(path: string, locale: Locale): string {
  const prefix = getUrlPrefix(locale);
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${prefix}${cleanPath}`;
}

/**
 * Get static paths for all locales (used in [lang] routes)
 */
export function getLocalePaths() {
  return LOCALES.map((lang) => ({ params: { lang } }));
}
