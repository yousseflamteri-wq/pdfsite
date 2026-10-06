import WatermarkPdfTool from './WatermarkPdfTool';
import { siteUrl } from '../../lib/siteConfig';

export const metadata = {
  title: 'Add Watermark to PDF Free – Stamp Text on Every Page',
  description:
    'Stamp custom text watermarks — CONFIDENTIAL, DRAFT, or your brand — onto every PDF page. No upload, no signup, 100% private in-browser PDF watermarking.',
  alternates: {
    canonical: `${siteUrl}/watermark-pdf`,
  },
  openGraph: {
    title: 'Add Watermark to PDF Free – Custom Text Stamp, No Upload',
    description: 'Add customized watermark text to all PDF pages locally in your browser with zero data uploads.',
    url: `${siteUrl}/watermark-pdf`,
  },
  twitter: {
    card: 'summary',
    title: 'Add Watermark to PDF Free – No Upload Required',
    description: 'Stamp CONFIDENTIAL, DRAFT or custom text on PDF pages. Free & private.',
  },
};

const faqs = [
  {
    q: 'How does client-side PDF watermarking work?',
    a: 'Our tool embeds text layers and vector rotation transformations directly into your document inside browser memory using WebAssembly. Your files are never uploaded or transmitted to any server.',
  },
  {
    q: 'Can I customize the watermark text and opacity?',
    a: 'Yes. You can write any customized text (such as CONFIDENTIAL, DRAFT, COPY, or your company name) and adjust the opacity slider to ensure the watermark remains clearly visible without obscuring underlying text.',
  },
  {
    q: 'Will the watermark be applied to every page?',
    a: 'Yes. The watermark is automatically stamped across every single page of your document at a diagonal angle, centered perfectly on each page canvas.',
  },
  {
    q: 'Are my sensitive documents kept private?',
    a: 'Absolutely. Because all processing executes 100% in your device memory (RAM), no document content, text, or file data is ever stored, analyzed, or sent to external servers.',
  },
  {
    q: 'Can I watermark password-protected PDFs?',
    a: 'If a PDF document has an active open password, you need to unlock it first before applying watermarks so the page elements can be accessed.',
  },
  {
    q: 'Does adding a watermark reduce document quality?',
    a: 'No. The watermark is rendered as a vector typography overlay. Original high-resolution images, document fonts, and vector paths remain untouched.',
  },
];

export default function Page() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Add Watermark to PDF',
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    url: `${siteUrl}/watermark-pdf`,
    featureList: [
      'Custom watermark text (CONFIDENTIAL, DRAFT, etc.)',
      'Adjustable opacity and font size',
      'Applied to all pages at diagonal angle',
      'Vector overlay — no quality reduction',
      'Client-side only — no file upload',
    ],
    description: 'Free client-side tool to stamp custom watermark text across PDF document pages.',
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
      <WatermarkPdfTool faqs={faqs} />
    </>
  );
}