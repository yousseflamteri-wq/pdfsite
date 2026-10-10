import PdfToMdTool from './PdfToMdTool';
import { siteUrl } from '../../lib/siteConfig';

export const metadata = {
  title: 'Convert PDF to Markdown Online Free – In-Browser PDF to MD',
  description:
    'Convert PDF documents to clean Markdown (.md) formatted text locally in your browser. Perfect for Obsidian, Notion, and AI prompts. 100% private, no uploads.',
  alternates: {
    canonical: `${siteUrl || 'https://onlinepdflab.app'}/pdf-to-md`,
  },
  openGraph: {
    title: 'Convert PDF to Markdown Online Free – In-Browser PDF to MD',
    description: 'Extract Markdown from PDF securely in your browser with zero file uploads.',
    url: `${siteUrl || 'https://onlinepdflab.app'}/pdf-to-md`,
    type: 'website',
  },
};

const faqs = [
  {
    q: 'How does client-side PDF to Markdown conversion work?',
    a: 'The tool extracts embedded text layers and detects approximate font sizes directly inside your browser using JavaScript. No files are uploaded to any server, ensuring total privacy.',
  },
  {
    q: 'Can I use this generated Markdown in Obsidian or Notion?',
    a: 'Yes. The output formats headers, page breaks, and standard text blocks ready to be pasted or imported directly into Obsidian, Notion, or any text editor.',
  },
  {
    q: 'Are my private documents safe?',
    a: 'Completely safe. All operations run directly inside your device memory (RAM), meaning your PDF files never leave your computer.',
  },
  {
    q: 'What should I do if my PDF is a scanned document?',
    a: 'This tool extracts embedded digital text. If your PDF is an image scan, use our OCR PDF tool first to recognize the text before converting it to Markdown.',
  },
];

export default function Page() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'PDF to Markdown Converter',
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    url: `${siteUrl || 'https://onlinepdflab.app'}/pdf-to-md`,
    description: 'Free client-side tool to extract Markdown text from PDF files privately.',
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
    <main className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <PdfToMdTool />

      {/* FAQs Rendered as HTML for SEO */}
      <section className="max-w-4xl mx-auto px-6 py-12 border-t border-gray-200 mt-12 mb-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 text-center">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((f, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="font-bold text-lg text-gray-800 mb-2">{f.q}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}