import OcrTool from './OcrTool';
import { siteUrl } from '../../lib/siteConfig';

export const metadata = {
  title: 'OCR PDF & Image to Text – Free Online OCR, No Upload',
  description:
    'Recognise text from scanned PDFs and images (JPG, PNG) using free online OCR. Supports 15+ languages including Arabic, French, English. No upload, no signup.',
  alternates: {
    canonical: `${siteUrl}/ocr-pdf`,
  },
  openGraph: {
    title: 'Free Online OCR – Scanned PDF and Image to Text',
    description: 'Recognise text from scans and photos in 15+ languages, privately in your browser. No upload.',
    url: `${siteUrl}/ocr-pdf`,
  },
  twitter: {
    card: 'summary',
    title: 'OCR PDF & Images Free – 15+ Languages, No Upload',
    description: 'Extract text from scanned PDFs and images in 15+ languages. Free, private, in-browser OCR.',
  },
};

const faqs = [
  {
    q: 'How does this online OCR work?',
    a: 'It uses Tesseract, a well-known open-source OCR engine compiled to run inside your browser. Each PDF page is turned into an image and the text in it is recognised on your own device.',
  },
  {
    q: 'Is my file uploaded to a server?',
    a: 'No. Your PDF or image is processed locally and never leaves your device. The OCR engine and the data for the language you choose are downloaded once from a public CDN and cached by your browser, but your own document is not sent anywhere.',
  },
  {
    q: 'Which languages are supported?',
    a: 'English, Arabic, French, Spanish, German, Italian, Portuguese, Dutch, Turkish, Russian, Hindi, Chinese (Simplified), Japanese and Korean, plus combinations such as Arabic + English, French + English and Arabic + French for mixed-language documents.',
  },
  {
    q: 'How can I get the most accurate result?',
    a: 'Use a sharp, straight, well-lit scan of at least 200 to 300 DPI, choose the correct language, and avoid heavy shadows. Printed text works much better than handwriting, which this tool does not recognise reliably.',
  },
  {
    q: 'Why is the first run slower?',
    a: 'The first time you use a language, its data (a few megabytes) has to download. After that it is cached, and recognition takes a few seconds per page depending on your device. For long PDFs you can enter a page range to process only the pages you need.',
  },
  {
    q: 'My PDF already has selectable text — do I need OCR?',
    a: 'No. If your PDF already contains real, selectable text you do not need OCR. Use our PDF to Text tool instead — it is instant and does not require any model download.',
  },
];

export default function Page() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'OCR PDF & Image to Text',
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    url: `${siteUrl}/ocr-pdf`,
    featureList: [
      'Tesseract OCR engine runs in-browser',
      '15+ language support including Arabic, French, English',
      'Works on scanned PDFs and JPG/PNG images',
      'Page range selection for large documents',
      'Copy or download extracted text as .txt',
      'Client-side only — no file upload',
    ],
    description: 'Free in-browser OCR tool to convert scanned PDFs and images to text in 15+ languages.',
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
      <OcrTool faqs={faqs} />
    </>
  );
}