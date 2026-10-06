import RotatePdfTool from './RotatePdfTool';
import { siteUrl } from '../../lib/siteConfig';

export const metadata = {
  title: 'Rotate PDF Online Free – Fix Sideways Pages Permanently',
  description:
    'Rotate PDF pages 90°, 180° or 270° permanently in seconds. No upload, no signup — free in-browser PDF rotation. Fix upside-down or sideways scans instantly.',
  alternates: {
    canonical: `${siteUrl}/rotate-pdf`,
  },
  openGraph: {
    title: 'Rotate PDF Online Free – Permanent Page Rotation',
    description: 'Fix sideways or upside-down PDF pages permanently in your web browser. Zero file uploads.',
    url: `${siteUrl}/rotate-pdf`,
  },
  twitter: {
    card: 'summary',
    title: 'Rotate PDF Free – Fix Sideways Pages, No Upload',
    description: 'Permanently rotate PDF pages in your browser. Free, private, instant.',
  },
};

const faqs = [
  {
    q: 'How does client-side PDF rotation work?',
    a: 'Our tool reads the internal page rotation dictionary of your document directly in browser memory using WebAssembly. It modifies the orientation degree metadata without sending your document across the internet.',
  },
  {
    q: 'Is the page rotation permanent?',
    a: 'Yes. Once you select the angle (+90°, +180°, or +270°) and download the rotated document, the orientation changes are permanently written into the PDF file format and will display correctly in all viewers.',
  },
  {
    q: 'Does rotating a PDF reduce its visual quality?',
    a: 'Not at all. Rotating a PDF changes only the coordinate orientation flags in the document structure. The text vectors, high-res images, and embedded fonts remain untouched and 100% lossless.',
  },
  {
    q: 'Are my confidential documents safe?',
    a: 'Yes, absolutely. Because all calculations take place locally inside your browser, neither our servers nor any third party ever see, store, or transmit your files.',
  },
  {
    q: 'Can I rotate password-protected PDFs?',
    a: 'If a PDF document is locked with an open password, you need to unlock it first before rotating so that the internal page matrices can be adjusted.',
  },
  {
    q: 'Can I rotate PDFs on my smartphone or tablet?',
    a: 'Yes. Our tool is fully responsive and functions directly in Safari, Chrome, and Edge on iOS and Android devices without requiring any external application.',
  },
];

export default function Page() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Rotate PDF',
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    url: `${siteUrl}/rotate-pdf`,
    featureList: [
      'Rotate pages 90°, 180° or 270°',
      'Permanent lossless rotation',
      'Fixes sideways and upside-down scans',
      'Client-side only — no file upload',
      'No signup, no watermarks',
    ],
    description: 'Free client-side tool to permanently rotate PDF document pages clockwise or upside-down.',
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
      <RotatePdfTool faqs={faqs} />
    </>
  );
}