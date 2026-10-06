import CompressTool from './CompressTool';
import { siteUrl } from '../../lib/siteConfig';

export const metadata = {
  title: 'Compress PDF Online Free – Reduce File Size Instantly',
  description:
    'Reduce PDF file size while preserving quality. No upload, no signup — free in-browser PDF compression. Ideal for email, web upload limits and sharing.',
  alternates: {
    canonical: `${siteUrl}/compress-pdf`,
  },
  openGraph: {
    title: 'Compress PDF Online Free – Reduce File Size Privately',
    description: 'Shrink large PDFs in your web browser. Fast, secure, zero data uploads. Free forever.',
    url: `${siteUrl}/compress-pdf`,
  },
  twitter: {
    card: 'summary',
    title: 'Compress PDF Free – Reduce Size Without Upload',
    description: 'Shrink PDFs in your browser. Fast, private, no signup required.',
  },
};

const faqs = [
  {
    q: 'How does client-side PDF compression work?',
    a: 'Our tool renders each page onto an internal HTML5 Canvas and recompresses embedded images at optimized quality levels. Everything runs directly in your browser without transmitting your files across the internet.',
  },
  {
    q: 'Does compressing a PDF reduce text clarity?',
    a: 'Our recommended compression balance preserves text readability while aggressively optimizing high-resolution background scans and uncompressed images, providing the ideal ratio of file reduction to clarity.',
  },
  {
    q: 'Is there any file size limit for compression?',
    a: 'Since processing takes place locally in your device memory (RAM), there is no arbitrary cloud upload limit. You can compress large documents depending on your hardware capacity.',
  },
  {
    q: 'Are my private documents and scans safe?',
    a: 'Yes, 100%. We never receive, inspect, or store your documents. Because operations happen entirely client-side, your files never leave your device.',
  },
  {
    q: 'Which compression level should I choose?',
    a: 'Choose "Recommended Compression" for the best balance between size reduction and visual clarity. Use "Extreme Compression" when you need to meet strict email attachment or web portal limits.',
  },
  {
    q: 'Can I compress PDF documents on my smartphone?',
    a: 'Yes. The compression engine is fully web-standard and works seamlessly across mobile Safari on iPhone as well as Google Chrome on Android devices.',
  },
];

export default function Page() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Compress PDF',
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    url: `${siteUrl}/compress-pdf`,
    featureList: [
      'Reduce PDF file size significantly',
      'Recommended and extreme compression modes',
      'Preserves text and vector quality',
      'Client-side only — no file upload',
      'No watermarks, no signup, no limits',
    ],
    description: 'Free client-side tool to reduce PDF document file size with customizable quality levels.',
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
      <CompressTool faqs={faqs} />
    </>
  );
}