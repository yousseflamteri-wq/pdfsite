import JpgToPdfTool from './JpgToPdfTool';
import { siteUrl } from '../../lib/siteConfig';

export const metadata = {
  title: 'JPG to PDF Converter – Instant JPEG & Photo to PDF, Free',
  description:
    'Convert JPG, JPEG & camera photos to PDF instantly. No upload, no signup — batch convert single or multiple JPEG files to a clean PDF right in your browser. 100% private.',
  alternates: {
    canonical: `${siteUrl}/jpg-to-pdf`,
  },
  openGraph: {
    title: 'JPG to PDF Converter – Instant JPEG & Photo to PDF, Free',
    description:
      'Convert single or batch JPEG photos to PDF in seconds. 100% private, runs entirely in your browser — no file upload required.',
    url: `${siteUrl}/jpg-to-pdf`,
  },
  twitter: {
    card: 'summary',
    title: 'JPG to PDF Converter – JPEG Photo to PDF, Free & Private',
    description: 'Batch convert JPEG camera photos to PDF in your browser. No upload. No signup.',
  },
};

const faqs = [
  {
    q: 'What is the difference between JPG to PDF and Image to PDF?',
    a: 'This JPG to PDF tool is optimized specifically for converting JPEG/JPG photos and camera images — such as those taken on your smartphone — directly into a PDF. If you need to combine multiple image formats like PNG, WebP, GIF, or BMP with custom A4/Letter page layout and margin controls, use our Image to PDF tool instead.',
  },
  {
    q: 'How do I convert a JPG photo to PDF?',
    a: 'Drop or select one or more JPEG/JPG files, use the arrow controls to arrange their order, then click "Convert to PDF." Your PDF downloads automatically within seconds — no upload needed.',
  },
  {
    q: 'Can I convert multiple JPEG photos into one PDF at once?',
    a: 'Yes. Select as many JPG or JPEG files as you need. Each image becomes its own page in a single combined PDF document, preserving the order you set.',
  },
  {
    q: 'Does converting JPG to PDF reduce image quality?',
    a: 'No. The converter retains the natural pixel dimensions of your JPEG photos. Images are re-encoded at high quality (92% JPEG) to ensure crisp text on receipts, scans, and sharp visuals in the final PDF.',
  },
  {
    q: 'Are my personal JPEG photos and camera images kept private?',
    a: 'Absolutely. All processing runs locally in your browser memory using client-side JavaScript. Neither our servers nor any third party can ever access, view, or store your photos.',
  },
  {
    q: 'Is there a file size or photo count limit?',
    a: 'There is no artificial restriction. You can convert dozens of JPEG images as long as your device RAM has enough capacity to hold them while processing.',
  },
];

export default function Page() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'JPG to PDF Converter',
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    url: `${siteUrl}/jpg-to-pdf`,
    featureList: [
      'Batch JPEG to PDF conversion',
      'Camera photo to PDF',
      'Drag-and-drop image ordering',
      'Client-side only — no file upload',
      'No watermarks, no signup, no limits',
    ],
    description:
      'Free in-browser tool to batch convert JPEG / JPG photos and camera images into a single PDF document. No upload required.',
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
      <JpgToPdfTool faqs={faqs} />
    </>
  );
}