// =============================================================================
// Configuration Types - TypeScript interfaces for TOML configs
// =============================================================================

// Re-export Locale from centralized locales config
export { type Locale } from './locales';

export type ThemeMode = 'light' | 'dark' | 'system';

// =============================================================================
// Site Configuration
// =============================================================================

export interface SiteConfig {
  site: {
    title: string;
    description: string;
    tagline: string;
    domain: string;
    url: string;
    defaultLocale: Locale;
    supportedLocales: Locale[];
  };
  seo: {
    titleTemplate: string;
    defaultTitle: string;
    defaultDescription: string;
    defaultImage: string;
    twitterHandle: string;
    twitterCard: 'summary' | 'summary_large_image';
    openGraph: {
      type: string;
      locale: string;
      siteName: string;
    };
  };
  theme: {
    defaultMode: ThemeMode;
    codeThemeLight: string;
    codeThemeDark: string;
    accentColor: string;
  };
  features: {
    search: boolean;
    rss: boolean;
    sitemap: boolean;
    giscus: boolean;
    plantuml: boolean;
    tableOfContents: boolean;
    readingTime: boolean;
    relatedPosts: boolean;
    seriesNavigation: boolean;
  };
  giscus: {
    enabled: boolean;
    repo: string;
    repoId: string;
    category: string;
    categoryId: string;
    mapping: 'pathname' | 'url' | 'title' | 'og:title';
    strict: boolean;
    reactionsEnabled: boolean;
    emitMetadata: boolean;
    inputPosition: 'top' | 'bottom';
    lang: string;
  };
  plantuml: {
    enabled: boolean;
    renderMode: 'build' | 'server';
    serverUrl: string;
    format: 'svg' | 'png';
    cacheDir: string;
  };
  pagination: {
    postsPerPage: number;
    seriesPerPage: number;
    tagsPerPage: number;
  };
  readingTime: {
    wordsPerMinute: number;
  };
}

// =============================================================================
// Navigation Configuration
// =============================================================================

export interface NavItem {
  label: string;
  labelEn: string;
  href: string;
  hrefEn?: string;
  icon?: string;
  external?: boolean;
}

export interface NavigationConfig {
  main: NavItem[];
  footer: NavItem[];
}

// =============================================================================
// Author Configuration
// =============================================================================

export interface AuthorSkill {
  category: string;
  items: string[];
}

export interface AuthorConfig {
  author: {
    name: string;
    title: string;
    bio: string;
    bioEn: string;
    avatar: string;
    email: string;
    location: string;
    social: {
      github?: string;
      linkedin?: string;
      twitter?: string;
      bluesky?: string;
      mastodon?: string;
    };
    skills: AuthorSkill[];
  };
}

// =============================================================================
// Combined Configuration
// =============================================================================

export interface Config {
  site: SiteConfig;
  navigation: NavigationConfig;
  author: AuthorConfig;
}
