import OrganizePdfTool from './OrganizePdfTool';
import { siteUrl } from '../../lib/siteConfig';

export const metadata = {
  title: 'Organize PDF Pages – Reorder, Rotate & Delete Online Free',
  description:
    'Rearrange PDF pages with drag-and-drop thumbnails. Reorder, rotate or delete pages visually. Free, private, no upload — runs entirely in your browser.',
  alternates: {
    canonical: `${siteUrl}/organize-pdf`,
  },
  openGraph: {
    title: 'Organize PDF Pages Online – Reorder, Rotate and Delete',
    description: 'Visually rearrange PDF pages using drag-and-drop thumbnails. No upload, free and private.',
    url: `${siteUrl}/organize-pdf`,
  },
  twitter: {
    card: 'summary',
    title: 'Organize PDF Pages Free – Drag & Drop Reorder, No Upload',
    description: 'Reorder, rotate or delete PDF pages visually in your browser. Free & private.',
  },
};

const faqs = [
  {
    q: 'How do I reorder pages in a PDF?',
    a: 'Upload your PDF and drag any page thumbnail to a new position. On a phone or tablet, use the left and right arrow buttons under each page. When the order looks right, click Save Organized PDF. Need to split pages into a separate document first? Use our Split PDF tool.',
  },
  {
    q: 'Can I delete pages and rotate pages at the same time?',
    a: 'Yes. Each page has its own rotate-left, rotate-right and delete buttons, and you can combine them with reordering in one go. Nothing is applied until you save.',
  },
  {
    q: 'How do I undo a change?',
    a: 'Press Reset to restore every page to its original position and orientation, including pages you deleted. Your original file is never modified.',
  },
  {
    q: 'Will the quality of my PDF change?',
    a: 'No. Pages are copied into the new document without being re-rendered or compressed, so text stays sharp and images keep their original quality. Only the order and rotation change.',
  },
  {
    q: 'Does it keep bookmarks and form fields?',
    a: 'The content of each page is kept. Document-level extras such as bookmarks (outline) and interactive form logic may not carry over, so check the result if your PDF depends on them.',
  },
  {
    q: 'Is my PDF uploaded to a server?',
    a: 'No. The page previews and the final PDF are all created inside your browser. Your file is never uploaded, stored, or shared.',
  },
];

export default function Page() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Organize PDF Pages',
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    url: `${siteUrl}/organize-pdf`,
    featureList: [
      'Drag-and-drop page reordering',
      'Visual thumbnail page management',
      'Per-page rotate and delete controls',
      'Lossless output — no re-rendering',
      'Client-side only — no file upload',
    ],
    description: 'Free client-side tool to reorder, rotate and delete PDF pages visually with drag-and-drop.',
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a,
      },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <OrganizePdfTool faqs={faqs} />
    </>
  );
}