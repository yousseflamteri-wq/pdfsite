import RemovePagesTool from './RemovePagesTool';
import { siteUrl } from '../../lib/siteConfig';

export const metadata = {
  title: 'Remove PDF Pages Free – Delete Blank or Unwanted Pages',
  description:
    'Delete unwanted or blank pages from any PDF in seconds. No upload, no signup — free in-browser page removal. Enter page numbers or ranges to remove.',
  alternates: {
    canonical: `${siteUrl}/remove-pages`,
  },
  openGraph: {
    title: 'Remove PDF Pages Free – Delete Pages Without Upload',
    description: 'Delete selected pages from PDF documents locally in your browser. Fast & private.',
    url: `${siteUrl}/remove-pages`,
  },
  twitter: {
    card: 'summary',
    title: 'Remove PDF Pages Free – No Upload Required',
    description: 'Delete unwanted or blank PDF pages in your browser. Free and private.',
  },
};

const faqs = [
  {
    q: 'How does client-side PDF page removal work?',
    a: 'Our tool analyzes your document structure directly in browser memory. It creates a clean PDF containing only the pages you choose to keep, completely discarding the selected pages without transmitting any data over the internet.',
  },
  {
    q: 'How do I specify which pages to delete?',
    a: 'You can enter individual page numbers separated by commas (e.g., "1, 3, 7") or specify ranges with hyphens (e.g., "4-6").',
  },
  {
    q: 'Does deleting pages affect the quality of the remaining document?',
    a: 'No. The remaining pages retain their original vector typography, embedded images, and layouts losslessly.',
  },
  {
    q: 'Are my confidential documents safe?',
    a: 'Yes, 100%. All processing occurs strictly within your browser sandbox. No file is ever sent to external cloud storage or servers.',
  },
  {
    q: 'Can I remove pages from a password-protected PDF?',
    a: 'If a document has an active open password, unlock it before removing pages so the internal page structure can be read.',
  },
  {
    q: 'Can I delete pages on mobile devices?',
    a: 'Yes, the tool is fully responsive and functions directly on mobile browsers across iOS and Android.',
  },
];

export default function Page() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Remove PDF Pages',
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    url: `${siteUrl}/remove-pages`,
    featureList: [
      'Delete specific pages by number or range',
      'Remove blank or unwanted pages',
      'Lossless output — remaining pages unaffected',
      'Client-side only — no file upload',
      'No signup, no watermarks',
    ],
    description: 'Free client-side tool to delete selected pages from PDF files securely in browser memory.',
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <RemovePagesTool faqs={faqs} />
    </>
  );
}