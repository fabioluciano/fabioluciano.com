// =============================================================================
// Configuration Loader - Loads and parses TOML configuration files
// =============================================================================

import fs from 'node:fs';
import path from 'node:path';
import { parse } from 'toml';
import type {
  SiteConfig,
  NavigationConfig,
  AuthorConfig,
  Config,
  Locale,
} from './types';
import { getUrlPrefix } from './locales';

// =============================================================================
// Configuration File Paths
// =============================================================================

const CONFIG_DIR = path.resolve(process.cwd(), 'config');

const CONFIG_FILES = {
  site: 'site.config.toml',
  navigation: 'navigation.config.toml',
  author: 'author.config.toml',
} as const;

// =============================================================================
// Load and Parse Functions
// =============================================================================

function loadTomlFile<T>(filename: string): T {
  const filePath = path.join(CONFIG_DIR, filename);

  if (!fs.existsSync(filePath)) {
    throw new Error(`Configuration file not found: ${filePath}`);
  }

  const content = fs.readFileSync(filePath, 'utf-8');

  try {
    return parse(content) as T;
  } catch (error) {
    throw new Error(
      `Failed to parse TOML file ${filename}: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

// =============================================================================
// Cached Configuration Instances
// =============================================================================

let cachedSiteConfig: SiteConfig | null = null;
let cachedNavigationConfig: NavigationConfig | null = null;
let cachedAuthorConfig: AuthorConfig | null = null;

// =============================================================================
// Configuration Getters
// =============================================================================

export function getSiteConfig(): SiteConfig {
  if (!cachedSiteConfig) {
    cachedSiteConfig = loadTomlFile<SiteConfig>(CONFIG_FILES.site);
  }
  return cachedSiteConfig;
}

export function getNavigationConfig(): NavigationConfig {
  if (!cachedNavigationConfig) {
    cachedNavigationConfig = loadTomlFile<NavigationConfig>(
      CONFIG_FILES.navigation
    );
  }
  return cachedNavigationConfig;
}

export function getAuthorConfig(): AuthorConfig {
  if (!cachedAuthorConfig) {
    cachedAuthorConfig = loadTomlFile<AuthorConfig>(CONFIG_FILES.author);
  }
  return cachedAuthorConfig;
}

export function getConfig(): Config {
  return {
    site: getSiteConfig(),
    navigation: getNavigationConfig(),
    author: getAuthorConfig(),
  };
}

// =============================================================================
// Helper Functions
// =============================================================================

/**
 * Get the site title with template
 */
export function getPageTitle(pageTitle?: string): string {
  const config = getSiteConfig();

  if (!pageTitle) {
    return config.seo.defaultTitle;
  }

  return config.seo.titleTemplate.replace('%s', pageTitle);
}

/**
 * Get navigation items for a specific locale
 */
export function getNavItems(
  section: 'main' | 'footer',
  locale: Locale = 'pt'
) {
  const config = getNavigationConfig();
  const items = config[section];
  const urlPrefix = getUrlPrefix(locale);

  return items.map((item) => {
    // Determine the href based on locale
    const baseHref = locale === 'en' && item.hrefEn ? item.hrefEn : item.href;

    // Add locale prefix to internal links (not external and not already prefixed)
    const finalHref = item.external || baseHref.startsWith('http')
      ? baseHref
      : baseHref === '/'
        ? urlPrefix
        : `${urlPrefix}${baseHref}`;

    return {
      ...item,
      label: locale === 'en' ? item.labelEn : item.label,
      href: finalHref,
    };
  });
}

/**
 * Get author bio for a specific locale
 */
export function getAuthorBio(locale: Locale = 'pt'): string {
  const config = getAuthorConfig();
  return locale === 'en' ? config.author.bioEn : config.author.bio;
}

/**
 * Check if a feature is enabled
 */
export function isFeatureEnabled(
  feature: keyof SiteConfig['features']
): boolean {
  const config = getSiteConfig();
  return config.features[feature];
}

/**
 * Get canonical URL for a path
 */
export function getCanonicalUrl(pathname: string): string {
  const config = getSiteConfig();
  const baseUrl = config.site.url.replace(/\/$/, '');
  const cleanPath = pathname.startsWith('/') ? pathname : `/${pathname}`;
  return `${baseUrl}${cleanPath}`;
}

// =============================================================================
// Re-export Types
// =============================================================================

export type {
  SiteConfig,
  NavigationConfig,
  AuthorConfig,
  Config,
  Locale,
  NavItem,
  AuthorSkill,
} from './types';
