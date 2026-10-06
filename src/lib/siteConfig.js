/**
 * Centralized site configuration.
 * Override NEXT_PUBLIC_SITE_URL in your Cloudflare Pages environment variables
 * for production deployments.
 */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ||
  'https://pdfsite-9ug.pages.dev';

export const siteName = 'PDF SaaS';

export const defaultDescription =
  'Free online PDF tools — 100% private, in-browser. Merge, split, compress, sign, rotate & convert PDFs without uploading a single file. No signup. No limits.';
