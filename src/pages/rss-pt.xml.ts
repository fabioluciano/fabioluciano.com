// =============================================================================
// RSS Feed - Portuguese
// =============================================================================

import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { getAllPosts, getPostSlug } from '@/lib/posts';
import { getSiteConfig, getAuthorConfig } from '@/config';

export const GET: APIRoute = async (context) => {
  const config = getSiteConfig();
  const author = getAuthorConfig();
  const posts = await getAllPosts();

  // Filter posts by Portuguese locale
  const localePosts = posts.filter((post) => post.data.locale === 'pt');

  return rss({
    title: config.site.title,
    description: config.site.description,
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
      <language>pt-BR</language>
      <managingEditor>${author.author.email} (${author.author.name})</managingEditor>
      <webMaster>${author.author.email} (${author.author.name})</webMaster>
      <copyright>Copyright ${new Date().getFullYear()} ${author.author.name}</copyright>
    `,
    stylesheet: '/rss/styles.xsl',
  });
};
