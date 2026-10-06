import PdfToTextTool from './PdfToTextTool';
import { siteUrl } from '../../lib/siteConfig';

export const metadata = {
  title: 'PDF to Text Converter – Extract Text from PDF Free',
  description:
    'Extract selectable text from any PDF instantly. Copy to clipboard or download as .txt. No upload, no signup — free in-browser PDF text extraction.',
  alternates: {
    canonical: `${siteUrl}/pdf-to-text`,
  },
  openGraph: {
    title: 'PDF to Text – Extract Text from PDF Online Free',
    description: 'Copy or download the text of your PDF in seconds. No upload, no signup, completely private.',
    url: `${siteUrl}/pdf-to-text`,
  },
  twitter: {
    card: 'summary',
    title: 'PDF to Text Free – Extract Text Without Upload',
    description: 'Extract text from PDFs in your browser. Free, private, no signup.',
  },
};

const faqs = [
  {
    q: 'How do I extract text from a PDF?',
    a: 'Upload your PDF and the text of every page appears automatically. Then copy it to your clipboard or download it as a .txt file.',
  },
  {
    q: 'Does it work on scanned PDFs?',
    a: 'Only if the PDF contains real, selectable text. A scanned PDF is just pictures of pages, so there is no text to extract. When we detect this we tell you, and you can use our OCR PDF tool to recognise text from the scanned images instead.',
  },
  {
    q: 'Will the formatting be preserved?',
    a: 'The result is plain text. Line breaks and paragraph gaps are reconstructed as closely as possible, but fonts, images and table borders are not included. Multi-column pages and tables may come out as flowing lines of text.',
  },
  {
    q: 'Does it support Arabic, French and other languages?',
    a: 'Yes, as long as the PDF stores the text as real characters. The reading order of right-to-left text depends on how the PDF was created, so check the result for important documents.',
  },
  {
    q: 'Is there a file size or page limit?',
    a: 'There is no limit set by us. Very large PDFs depend on your device memory and may take longer, because everything is processed locally in your browser.',
  },
  {
    q: 'Is my PDF uploaded to a server?',
    a: 'No. The extraction runs inside your browser, so your document is never uploaded, stored or shared. That makes it safe for contracts and other private files.',
  },
];

export default function Page() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'PDF to Text Converter',
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    url: `${siteUrl}/pdf-to-text`,
    featureList: [
      'Extract selectable text from PDFs',
      'Copy to clipboard or download as .txt',
      'Multi-language support including Arabic and RTL',
      'Detects and alerts on scanned/image-only PDFs',
      'Client-side only — no file upload',
    ],
    description: 'Free client-side tool to extract text from PDF files and download it as a TXT file.',
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
      <PdfToTextTool faqs={faqs} />
    </>
  );
}