import ImageToPdfTool from './ImageToPdfTool';
import { siteUrl } from '../../lib/siteConfig';

export const metadata = {
  title: 'Image to PDF – PNG, WebP, GIF, BMP to PDF with Layout Control',
  description:
    'Convert multi-format images (PNG, WebP, GIF, BMP, AVIF) to PDF with A4, Letter or fit-to-image layout, custom margins & orientation. Free, private, no upload required.',
  alternates: {
    canonical: `${siteUrl}/image-to-pdf`,
  },
  openGraph: {
    title: 'Image to PDF – Multi-Format Converter with A4/Letter Page Layout',
    description:
      'Combine PNG, WebP, GIF, BMP and more into a PDF with full layout control — A4, Letter, margins, orientation. 100% in-browser, no upload.',
    url: `${siteUrl}/image-to-pdf`,
  },
  twitter: {
    card: 'summary',
    title: 'Image to PDF – PNG, WebP, BMP Converter with Page Layout',
    description:
      'Multi-format image to PDF with A4/Letter layout, margins and orientation controls. Free & private.',
  },
};

const faqs = [
  {
    q: 'How is Image to PDF different from JPG to PDF?',
    a: 'Image to PDF supports a wider range of formats — PNG (lossless), WebP, GIF, BMP, and AVIF — and gives you full page layout controls: choose A4, US Letter or fit-to-image sizing, set portrait/landscape/auto orientation, and add none, small or large margins. If you only need to convert JPEG/JPG camera photos without layout options, our JPG to PDF tool is simpler and faster.',
  },
  {
    q: 'Which image formats are supported?',
    a: 'JPG/JPEG, PNG, WebP, GIF, BMP and AVIF work in all modern browsers. HEIC photos from iPhones are not supported by most browsers — export them as JPG first via iPhone Settings → Camera → Formats → Most Compatible.',
  },
  {
    q: 'Can I set A4 or Letter page size with custom margins?',
    a: 'Yes. Choose A4 or US Letter as the page size, then pick portrait, landscape or automatic orientation. For each page size you can set no margin, a small margin, or a large margin around your images.',
  },
  {
    q: 'Can I combine several different image formats into one PDF?',
    a: 'Yes. You can mix PNG, WebP, BMP and JPEG images in any order. Drag the thumbnails to rearrange them. Each image becomes its own page in the resulting PDF.',
  },
  {
    q: 'Will my images lose quality when converted?',
    a: 'PNG images are kept lossless. Other formats are saved at very high JPEG quality. Extremely large photos are reduced to a maximum of about 4,500 pixels on the longest side to keep the PDF a reasonable size without visible quality loss.',
  },
  {
    q: 'Why do my phone photos sometimes come out sideways?',
    a: 'Smartphones store an EXIF rotation flag inside each photo. This tool reads and applies that rotation before building the PDF, so portrait photos always appear upright.',
  },
  {
    q: 'Are my images uploaded to a server?',
    a: 'No. All conversion happens locally inside your browser. Your images are never sent to a server or stored anywhere, making it safe for IDs, receipts, contracts and other private documents.',
  },
];

export default function Page() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Image to PDF Converter',
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    url: `${siteUrl}/image-to-pdf`,
    featureList: [
      'PNG, WebP, GIF, BMP, AVIF, JPEG to PDF',
      'A4, Letter, or fit-to-image page sizing',
      'Portrait, landscape, or auto orientation',
      'Custom margin settings (none, small, large)',
      'Drag-and-drop image reordering',
      'EXIF rotation correction',
      'Client-side only — no file upload',
    ],
    description:
      'Free in-browser multi-format image to PDF converter with full page layout controls: A4/Letter sizing, orientation, and margins. Supports PNG, WebP, GIF, BMP and more.',
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
      <ImageToPdfTool faqs={faqs} />
    </>
  );
}