export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ||
  'https://onlinepdflab.app';

export const siteName = 'Online PDF Lab';

export const defaultDescription =
  'A fast and secure set of PDF tools. Edit, merge, and convert your documents directly on your device without server uploads.';