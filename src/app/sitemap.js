import { siteUrl } from '../lib/siteConfig';

export const dynamic = 'force-static';

const RELEASE_DATE = '2026-10-01';

/**
 * Static sitemap with fixed lastModified dates to prevent false
 * "modified on every crawl" signals to search engines.
 *
 * Priorities:
 *  1.0  – Homepage
 *  0.9  – Core / high-traffic tools
 *  0.8  – Secondary tools
 *  0.5  – Legal / informational pages
 */
const routes = [
  // Root
  { path: '',               priority: 1.0 },
  // Core tools (highest SEO value)
  { path: 'merge-pdf',      priority: 0.9 },
  { path: 'split-pdf',      priority: 0.9 },
  { path: 'compress-pdf',   priority: 0.9 },
  { path: 'jpg-to-pdf',     priority: 0.9 },
  { path: 'pdf-to-jpg',     priority: 0.9 },
  { path: 'image-to-pdf',   priority: 0.9 },
  { path: 'ocr-pdf',        priority: 0.9 },
  // Secondary tools
  { path: 'remove-pages',   priority: 0.8 },
  { path: 'rotate-pdf',     priority: 0.8 },
  { path: 'watermark-pdf',  priority: 0.8 },
  { path: 'sign-pdf',       priority: 0.8 },
  { path: 'protect-pdf',    priority: 0.8 },
  { path: 'organize-pdf',   priority: 0.8 },
  { path: 'add-page-numbers', priority: 0.8 },
  { path: 'pdf-to-text',    priority: 0.8 },
  // Legal / informational
  { path: 'privacy-policy', priority: 0.5 },
  { path: 'terms-of-use',   priority: 0.5 },
  { path: 'about',          priority: 0.5 },
  { path: 'contact',        priority: 0.5 },
];

export default function sitemap() {
  return routes.map(({ path, priority }) => ({
    url: path ? `${siteUrl}/${path}` : siteUrl,
    lastModified: RELEASE_DATE,
    changeFrequency: priority >= 0.9 ? 'weekly' : 'monthly',
    priority,
  }));
}