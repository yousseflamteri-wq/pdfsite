export const dynamic = "force-static";

export default function manifest() {
  return {
    name: 'PDF SaaS - Free In-Browser PDF Tools',
    short_name: 'PDF SaaS',
    description: '100% private, client-side online PDF tools suite.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#2563eb',
    icons: [
      {
        src: '/logo.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  };
}