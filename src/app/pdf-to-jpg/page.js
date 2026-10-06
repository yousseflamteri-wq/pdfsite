import PdfToJpgTool from './PdfToJpgTool';
import { siteUrl } from '../../lib/siteConfig';

export const metadata = {
  title: 'PDF to JPG Converter – Extract PDF Pages as Images Free',
  description:
    'Convert every PDF page to a high-resolution JPG image instantly. No upload, no signup — free in-browser PDF to image extraction at 2× resolution.',
  alternates: {
    canonical: `${siteUrl}/pdf-to-jpg`,
  },
  openGraph: {
    title: 'PDF to JPG Converter – Extract PDF Pages as High-Res Images',
    description: 'Turn your PDF pages into sharp JPG pictures locally in your browser. Fast, private, no upload.',
    url: `${siteUrl}/pdf-to-jpg`,
  },
  twitter: {
    card: 'summary',
    title: 'PDF to JPG Free – Extract Pages as Images, No Upload',
    description: 'Convert PDF pages to high-resolution JPG images in your browser. Private and free.',
  },
};

const faqs = [
  {
    q: 'How does client-side PDF to JPG extraction work?',
    a: 'Our tool utilizes an in-browser WebAssembly PDF rendering engine. It draws each page onto an HTML5 canvas at high resolution (2x scaling) and exports crisp JPG image files directly to your device memory without transmitting any document over the web.',
  },
  {
    q: 'Will the extracted images maintain high quality?',
    a: 'Yes. Pages are rendered at double resolution (2.0x scale factor) with 92% JPEG quality compression, ensuring that small text, charts, diagrams, and figures remain sharp and readable.',
  },
  {
    q: 'Are my confidential documents safe?',
    a: 'Absolutely. Because rendering occurs 100% inside your web browser, no PDF file or extracted picture is ever uploaded, cached, or seen by our servers.',
  },
  {
    q: 'How will I receive multiple extracted pages?',
    a: 'Each page is automatically converted and downloaded sequentially to your default downloads folder, organized with your original file name and page numbers.',
  },
  {
    q: 'Can I extract images from password-protected PDFs?',
    a: 'If a PDF has an active password lock, you need to unlock it first before converting pages to images so the rendering engine can read the page layouts.',
  },
  {
    q: 'Can I use this tool on a smartphone or tablet?',
    a: 'Yes. The converter is fully responsive and functions reliably on modern mobile browsers including Chrome and Safari on iOS and Android.',
  },
];

export default function Page() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'PDF to JPG Converter',
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    url: `${siteUrl}/pdf-to-jpg`,
    featureList: [
      'Convert PDF pages to JPG images at 2× resolution',
      'High-quality JPEG export (92% quality)',
      'Client-side only — no file upload',
      'Works on mobile and desktop',
      'No signup, no watermarks, no limits',
    ],
    description: 'Free client-side utility to extract high-resolution JPG images from PDF document pages.',
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
      <PdfToJpgTool faqs={faqs} />
    </>
  );
}