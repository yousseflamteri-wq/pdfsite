import SignPdfTool from './SignPdfTool';
import { siteUrl } from '../../lib/siteConfig';

export const metadata = {
  title: 'Sign PDF Online Free – Draw e-Signature on PDF, No Upload',
  description:
    'Draw and embed your electronic signature on any PDF document. No upload, no signup, 100% private — sign contracts, agreements and forms in your browser.',
  alternates: {
    canonical: `${siteUrl}/sign-pdf`,
  },
  openGraph: {
    title: 'Sign PDF Online Free – Draw & Embed e-Signature Privately',
    description: 'Add your electronic signature to PDF contracts locally in your browser with zero file uploads.',
    url: `${siteUrl}/sign-pdf`,
  },
  twitter: {
    card: 'summary',
    title: 'Sign PDF Free – e-Signature Without Upload',
    description: 'Draw and embed your signature on PDF files. Free, private, no signup.',
  },
};

const faqs = [
  {
    q: 'How does client-side PDF signing work?',
    a: 'When you draw your signature on the interactive canvas pad, your browser captures the vector strokes as a transparent PNG in memory and embeds it directly into your PDF document using client-side JavaScript. The file never leaves your device.',
  },
  {
    q: 'Are my signature and confidential documents safe?',
    a: 'Yes, 100%. Because all drawing and PDF modifications happen locally in your browser memory, your signature and sensitive documents are never transmitted to our servers or stored in any database.',
  },
  {
    q: 'Where will my signature appear on the PDF?',
    a: 'By default, your drawn signature is embedded at the bottom of the final page of your document, which is the standard placement for contracts, agreements, and approvals.',
  },
  {
    q: 'Can I draw my signature using a phone or tablet touchscreen?',
    a: 'Yes. The signature pad is fully optimized for touch gestures, allowing you to draw smooth signatures with your finger or stylus on mobile devices, iPads, and touch-enabled laptops.',
  },
  {
    q: 'Do you charge fees or require an account to sign PDFs?',
    a: 'No. Our e-signature tool is completely free to use without subscriptions, watermarks, page limits, or account registration.',
  },
  {
    q: 'Does signing a PDF affect text clarity or formatting?',
    a: 'No. The signature is embedded as a high-resolution transparent overlay without modifying original document fonts, vector layouts, or image quality.',
  },
];

export default function Page() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Sign PDF',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    url: `${siteUrl}/sign-pdf`,
    featureList: [
      'Draw electronic signature on canvas',
      'Embed signature into PDF pages',
      'Touch-optimized for mobile and tablet',
      'High-resolution transparent overlay',
      'Client-side only — no file upload',
      'No signup, no watermarks, no fees',
    ],
    description: 'Free client-side tool to draw electronic signatures and embed them into PDF contracts and documents.',
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
      <SignPdfTool faqs={faqs} />
    </>
  );
}