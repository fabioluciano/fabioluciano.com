// =============================================================================
// RSS Feed
// =============================================================================

import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { getAllPosts, getPostSlug } from '@/lib/posts';
import { getSiteConfig, getAuthorConfig } from '@/config';

export const GET: APIRoute = async (context) => {
  const config = getSiteConfig();
  const author = getAuthorConfig();
  const posts = await getAllPosts();

  // Get locale from query param, default to PT
  const url = new URL(context.request.url);
  const locale = url.searchParams.get('lang') === 'en' ? 'en' : 'pt';

  // Filter posts by locale
  const localePosts = posts.filter((post) => post.data.locale === locale);

  return rss({
    title: config.site.title,
    description:
      locale === 'pt'
        ? config.site.description
        : 'Platform Engineering, Developer Experience & Cloud Native',
    site: context.site ?? config.site.url,
    items: localePosts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.publishedAt,
      link: `/${getPostSlug(post)}`,
      categories: [post.data.category, ...post.data.tags],
      author: author.author.name,
    })),
    customData: `
      <language>${locale === 'pt' ? 'pt-BR' : 'en-US'}</language>
      <managingEditor>${author.author.email} (${author.author.name})</managingEditor>
      <webMaster>${author.author.email} (${author.author.name})</webMaster>
      <copyright>Copyright ${new Date().getFullYear()} ${author.author.name}</copyright>
    `,
    stylesheet: '/rss/styles.xsl',
  });
};
