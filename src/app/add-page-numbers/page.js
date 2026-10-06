import PageNumbersTool from './PageNumbersTool';
import { siteUrl } from '../../lib/siteConfig';

export const metadata = {
  title: 'Add Page Numbers to PDF Free – Custom Position & Format',
  description:
    'Add page numbers to any PDF in seconds. Choose position, format, font size and starting number. No upload, no signup — 100% private in-browser numbering.',
  alternates: {
    canonical: `${siteUrl}/add-page-numbers`,
  },
  openGraph: {
    title: 'Add Page Numbers to PDF Free – No Upload Required',
    description: 'Number your PDF pages in your browser with custom position, format and start number. Free & private.',
    url: `${siteUrl}/add-page-numbers`,
  },
  twitter: {
    card: 'summary',
    title: 'Add Page Numbers to PDF Free – No Upload',
    description: 'Custom page numbering for PDFs. Free, private, no signup.',
  },
};

const faqs = [
  {
    q: 'How do I add page numbers to a PDF?',
    a: 'Upload your PDF, choose where the number should appear on the page, pick a format such as "Page 1 of 10", and click Add Page Numbers. Your numbered PDF downloads automatically. Want to add a branded watermark instead? Try our Watermark PDF tool.',
  },
  {
    q: 'Can I skip the cover page?',
    a: 'Yes. Set "Start on page" to 2 and the cover stays unnumbered. If you want page 2 to show the number 1, leave "First number" at 1. If you want it to show 2, set "First number" to 2.',
  },
  {
    q: 'Which number formats are available?',
    a: 'You can use a plain number (1), "Page 1", "Page 1 of 10", "1 / 10", or a dashed style (- 1 -). The total in the "of" formats is calculated from the pages that are actually numbered.',
  },
  {
    q: 'Does it work with landscape or rotated pages?',
    a: 'Yes. The tool reads each page orientation and places the number so it appears upright in the position you picked, even on pages that are rotated 90, 180, or 270 degrees.',
  },
  {
    q: 'Will adding page numbers change my document?',
    a: 'Only by adding the numbers. Your existing text, images and layout are not re-rendered or compressed. The numbers become part of the page, so keep a copy of the original if you may need an unnumbered version later.',
  },
  {
    q: 'Is it safe to number confidential PDFs here?',
    a: 'Yes. The numbering runs entirely inside your browser using client-side JavaScript. Your file is never uploaded, stored, or seen by us or any third party.',
  },
];

export default function Page() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Add Page Numbers to PDF',
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    url: `${siteUrl}/add-page-numbers`,
    featureList: [
      'Multiple number formats: 1, Page 1, Page 1 of N, 1/N, -1-',
      'Custom position: header or footer, left/center/right',
      'Configurable starting number',
      'Skip cover page option',
      'Landscape and rotated page support',
      'Client-side only — no file upload',
    ],
    description: 'Free client-side tool to add page numbers to PDF documents with custom position and format.',
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
      <PageNumbersTool faqs={faqs} />
    </>
  );
}