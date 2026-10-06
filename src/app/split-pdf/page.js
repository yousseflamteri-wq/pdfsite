import SplitPdfTool from './SplitPdfTool';
import { siteUrl } from '../../lib/siteConfig';

export const metadata = {
  title: 'Split PDF Online Free – Extract Pages from PDF Instantly',
  description:
    'Extract specific pages or page ranges from any PDF into a separate file. 100% private, no upload, no signup — client-side PDF splitting in your browser.',
  alternates: {
    canonical: `${siteUrl}/split-pdf`,
  },
  openGraph: {
    title: 'Split PDF Online Free – Extract Pages Privately',
    description: 'Separate individual pages or custom ranges locally in your browser with zero data uploads.',
    url: `${siteUrl}/split-pdf`,
  },
  twitter: {
    card: 'summary',
    title: 'Split PDF Free – Extract Pages Without Upload',
    description: 'Extract PDF pages by range in your browser. Free, private, no signup.',
  },
};

const faqs = [
  {
    q: 'How does client-side PDF splitting work?',
    a: 'Our tool reads your document directly in your browser memory using WebAssembly. It isolates only the specific page indices you selected and compiles them into a brand-new PDF file without uploading your document across the internet.',
  },
  {
    q: 'How do I specify which pages to extract?',
    a: 'Enter page ranges using hyphens or individual numbers separated by commas (for instance, "1-3" or "5-8"). The tool automatically calculates and extracts only those designated pages.',
  },
  {
    q: 'Does splitting a PDF cause quality or font loss?',
    a: 'No. The extracted pages preserve their original vector objects, high-resolution scans, text layers, and embedded typography losslessly.',
  },
  {
    q: 'Are my personal documents kept confidential?',
    a: 'Yes, 100%. Because all extraction is handled locally inside your web browser, our servers never receive, store, or view your PDF files.',
  },
  {
    q: 'Can I split password-protected PDFs?',
    a: 'If a PDF has an active password lock, you need to unlock it first before splitting so that the internal page indexes can be accessed and copied.',
  },
  {
    q: 'Can I split PDF documents on my phone?',
    a: 'Yes. The tool is lightweight and works seamlessly on mobile devices running iOS Safari or Android Chrome without needing any external apps.',
  },
];

export default function Page() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Split PDF',
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    url: `${siteUrl}/split-pdf`,
    featureList: [
      'Extract specific pages by number or range',
      'Lossless page extraction',
      'Client-side only — no file upload',
      'Works on mobile and desktop',
      'No signup, no watermarks',
    ],
    description: 'Free client-side tool to extract specific pages and page ranges from PDF documents.',
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
      <SplitPdfTool faqs={faqs} />
    </>
  );
}