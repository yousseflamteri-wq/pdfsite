import { tools } from '../lib/toolsConfig';
import { blogPosts } from '../lib/blogPosts';
import { siteUrl } from '../lib/siteConfig';

export const dynamic = 'force-static';

export default function sitemap() {
  const currentDate = new Date().toISOString();

  const staticRoutes = ['', '/about', '/contact', '/privacy-policy', '/terms-of-use', '/blog'].map(
    (route) => ({
      url: `${siteUrl}${route}`,
      lastModified: currentDate,
      changeFrequency: route === '' ? 'daily' : 'monthly',
      priority: route === '' ? 1.0 : 0.6,
    })
  );

  const toolRoutes = tools.map((tool) => ({
    url: `${siteUrl}/${tool.id}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  const blogRoutes = blogPosts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...toolRoutes, ...blogRoutes];
}