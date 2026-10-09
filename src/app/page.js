import ToolsGrid from '../components/ToolsGrid';
import { siteUrl, siteName } from '../lib/siteConfig';

export const metadata = {
  title: 'PDF Lab – Free Online In-Browser PDF Tools',
  description:
    'Free online PDF tools. Merge, split, compress, convert, sign, and organize PDF documents directly inside your browser without uploading files to remote servers.',
  alternates: {
    canonical: siteUrl,
  },
};

const homeFaqs = [
  {
    q: 'Are my uploaded PDF files safe and private?',
    a: 'Yes. All file processing runs entirely inside your web browser using local resources. Documents are never transmitted or stored on any external server.',
  },
  {
    q: 'Do I need an account or subscription to use PDF Lab?',
    a: 'No. All utilities are accessible directly in the browser with no account creation, credits, or subscriptions required.',
  },
  {
    q: 'Is there any file size limit for merging or compressing?',
    a: 'Since processing takes place directly on your computer or phone, limits depend solely on your device memory rather than cloud server restrictions.',
  },
  {
    q: 'Can I use these tools on mobile devices?',
    a: 'Yes. PDF Lab is fully responsive and functions on modern mobile browsers across Android and iOS.',
  },
];

export default function HomePage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: homeFaqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };

  const softwareAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: siteName,
    url: siteUrl,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description:
      'Online suite of in-browser PDF utilities for merging, splitting, compressing, and converting documents.',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }}
      />

      <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6">
        {/* Simple & Clean Hero Section */}
        <section className="text-center max-w-3xl mx-auto mb-10">
          <h1 className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight mb-4">
            Free Online PDF Tools
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Fast and private PDF utilities right in your browser. Merge, split, compress, and convert documents locally without server uploads.
          </p>
        </section>

        {/* Category pills + tools grid */}
        <ToolsGrid />

        {/* Clean Features Section */}
        <section className="py-12 border-t border-gray-200 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Built for Privacy and Speed
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-600">
            <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-1.5">In-Browser Processing</h3>
              <p>Your documents stay strictly on your machine. All modifications are computed via local browser memory.</p>
            </div>
            <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-1.5">No Upload Latency</h3>
              <p>Skip long upload and download queues. Tasks execute instantaneously on your device hardware.</p>
            </div>
            <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-1.5">Standard PDF Architecture</h3>
              <p>Compiled with WebAssembly and compliant PDF specifications to ensure full cross-platform compatibility.</p>
            </div>
          </div>
        </section>

        {/* Frequently Asked Questions */}
        <section className="py-12 border-t border-gray-200 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {homeFaqs.map((faq, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm"
              >
                <h3 className="font-bold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}