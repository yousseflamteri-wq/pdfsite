import MergeTool from './MergeTool';
import { siteUrl } from '../../lib/siteConfig';

export const metadata = {
  title: 'Merge PDF Files Online Free – Combine PDFs Instantly',
  description:
    'Combine multiple PDF files into one document in seconds. No upload, no watermark, no signup — merge PDFs 100% privately in your browser.',
  alternates: {
    canonical: `${siteUrl}/merge-pdf`,
  },
  openGraph: {
    title: 'Merge PDF Files Online Free – Combine PDFs Privately',
    description: 'Combine multiple PDFs directly in your browser with zero file uploads. Free, no watermark.',
    url: `${siteUrl}/merge-pdf`,
  },
  twitter: {
    card: 'summary',
    title: 'Merge PDF Files Free – No Upload, No Signup',
    description: 'Combine PDFs in your browser instantly. Private, free, no watermark.',
  },
};

const faqs = [
  {
    q: 'Is it safe to merge PDF files with this tool?',
    a: 'Yes, absolutely. All processing executes locally inside your web browser using WebAssembly and client-side JavaScript. Your files are never uploaded or stored on any server.',
  },
  {
    q: 'Can I reorder the PDF files before merging?',
    a: 'Yes. You can use the up/down arrows or simply drag and drop the files in the list to achieve your exact desired sequence before merging.',
  },
  {
    q: 'Does merging reduce document quality?',
    a: 'No. The merger extracts and combines the original pages and embedded vectors losslessly, keeping fonts, text clarity, and images at their original quality.',
  },
  {
    q: 'Can I merge password-protected PDFs?',
    a: 'If a PDF is encrypted with a password, you must first unlock it before merging. Encrypted files cannot be combined directly for security reasons.',
  },
  {
    q: 'Do you add any watermark to merged files?',
    a: 'No. PDF Lab never adds watermarks, branding, or page limits to your documents. The output is 100% clean and free.',
  },
  {
    q: 'Can I merge PDFs on mobile devices?',
    a: 'Yes. Our tools are fully responsive and work seamlessly on mobile browsers on iOS and Android with no app installation needed.',
  },
];

export default function Page() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Merge PDF',
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    url: `${siteUrl}/merge-pdf`,
    featureList: [
      'Combine multiple PDF files into one',
      'Drag-and-drop reordering',
      'Lossless merge — no quality reduction',
      'No watermarks or page limits',
      'Client-side only — no file upload',
    ],
    description: 'Free client-side tool to merge and combine multiple PDF files securely in browser memory.',
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
      <MergeTool faqs={faqs} />
    </>
  );
}