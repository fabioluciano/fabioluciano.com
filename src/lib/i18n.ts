// =============================================================================
// Internationalization Utilities (Simplified)
// =============================================================================

import ptTranslations from '@/i18n/pt.json';
import enTranslations from '@/i18n/en.json';
import { type Locale, DEFAULT_LOCALE, getUrlPrefix, getLocaleFromPath, localizeUrl, getLocalePaths } from '@/config/locales';

// Re-export locale utilities from centralized config
export { getUrlPrefix, getLocaleFromPath, localizeUrl, getLocalePaths, type Locale, DEFAULT_LOCALE } from '@/config/locales';

// =============================================================================
// Translation Data
// =============================================================================

type TranslationKeys = typeof ptTranslations;

const translations: Record<Locale, TranslationKeys> = {
  pt: ptTranslations,
  en: enTranslations,
};

// =============================================================================
// Translation Functions
// =============================================================================

/**
 * Get a nested value from an object using dot notation
 */
function getNestedValue(obj: unknown, path: string): string | undefined {
  const keys = path.split('.');
  let current: unknown = obj;

  for (const key of keys) {
    if (current === null || current === undefined) return undefined;
    if (typeof current !== 'object') return undefined;
    current = (current as Record<string, unknown>)[key];
  }

  return typeof current === 'string' ? current : undefined;
}

/**
 * Interpolate variables in translation string
 */
function interpolate(str: string, params?: Record<string, string | number>): string {
  if (!params) return str;
  return str.replace(/{(\w+)}/g, (_, key) => params[key]?.toString() ?? `{${key}}`);
}

/**
 * Get translation for a key
 */
export function t(
  key: string,
  locale: Locale = DEFAULT_LOCALE,
  params?: Record<string, string | number>
): string {
  const translation = getNestedValue(translations[locale], key);

  if (!translation) {
    const fallback = getNestedValue(translations[DEFAULT_LOCALE], key);
    if (!fallback) {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }
    return interpolate(fallback, params);
  }

  return interpolate(translation, params);
}

/**
 * Get all translations for a locale
 */
export function getTranslations(locale: Locale): TranslationKeys {
  return translations[locale];
}

/**
 * Create translation function bound to a locale
 */
export function useTranslations(locale: Locale) {
  return (key: string, params?: Record<string, string | number>) => t(key, locale, params);
}
