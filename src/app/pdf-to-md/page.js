import PdfToMdTool from './PdfToMdTool';
import { siteUrl } from '../../lib/siteConfig';

export const metadata = {
  title: 'Convert PDF to Markdown Online Free – In-Browser PDF to MD',
  description:
    'Convert PDF documents to clean Markdown (.md) formatted text locally in your browser. Perfect for Obsidian, Notion, and AI. 100% private, no uploads.',
  alternates: {
    canonical: `${siteUrl}/pdf-to-md`,
  },
  openGraph: {
    title: 'Convert PDF to Markdown Online Free',
    description: 'Extract Markdown from PDF securely in your browser.',
    url: `${siteUrl}/pdf-to-md`,
  }
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
    url: `${siteUrl}/pdf-to-md`,
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
    <>
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
      <section className="max-w-4xl mx-auto px-6 py-12 border-t border-gray-100 mt-12 mb-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {faqs.map((f, idx) => (
            <div key={idx} className="bg-white p-5 rounded-lg shadow-sm border border-gray-50">
              <h3 className="font-semibold text-lg text-gray-800">{f.q}</h3>
              <p className="text-gray-600 mt-2 leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
