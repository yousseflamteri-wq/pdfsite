import Link from 'next/link';
import { tools } from '../lib/toolsConfig';
import { siteUrl, siteName, defaultDescription } from '../lib/siteConfig';
import { ShieldCheck, Zap, Lock, Sparkles } from 'lucide-react';

export const metadata = {
  title: 'Free Online PDF Tools – 100% Private In-Browser PDF Editor',
  description: defaultDescription,
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: 'Free Online PDF Tools – 100% Private In-Browser PDF Editor',
    description: defaultDescription,
    url: siteUrl,
  },
};

export default function HomePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteName,
    url: siteUrl,
    description: 'Free, private, and client-side online PDF tools suite.',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteUrl}/?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold mb-6 border border-blue-100">
            <Sparkles className="w-4 h-4" />
            <span>100% Client-Side • Zero Server Uploads • Free Forever</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-gray-900 tracking-tight leading-tight mb-6">
            Every PDF Tool You Need, <br className="hidden sm:inline" />
            <span className="text-blue-600">Processed In Your Browser.</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
            Fast, completely private, and effortless. Merge, split, compress, convert, sign, and encrypt your documents without transmitting a single byte to external servers.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-24">
          {tools && tools.length > 0 ? (
            tools.map((tool) => {
              const Icon = tool.icon;
              return (
                <Link
                  key={tool.id}
                  href={tool.slug}
                  className="group bg-white rounded-3xl p-6 border border-gray-200/80 hover:border-blue-500 hover:shadow-xl transition-all duration-200 flex flex-col justify-between"
                >
                  <div>
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 ${tool.bgColor} transition-transform group-hover:scale-105`}
                    >
                      <Icon className={`w-7 h-7 ${tool.color}`} />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {tool.name}
                    </h2>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      {tool.description}
                    </p>
                  </div>
                  <div className="mt-6 flex items-center text-sm font-semibold text-blue-600 group-hover:translate-x-1 transition-transform">
                    <span>Open Tool</span>
                    <span className="ml-1.5">→</span>
                  </div>
                </Link>
              );
            })
          ) : (
            <p className="text-gray-500 text-center col-span-full">Loading tools...</p>
          )}
        </div>

        {/* Value Proposition Section */}
        <section className="bg-white rounded-3xl border border-gray-200 p-8 sm:p-12 mb-20 shadow-sm">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-3">
              Why Privacy-Conscious Users Choose {siteName}
            </h2>
            <p className="text-gray-600">
              Traditional online PDF editors upload your sensitive files to remote cloud machines. We engineered a strictly local alternative.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-12 h-12 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Zero Remote Storage</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Your files never touch external servers or cloud databases. Every operation runs in temporary browser memory.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-4">
              <div className="w-12 h-12 bg-yellow-50 text-yellow-600 rounded-2xl flex items-center justify-center mb-4">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">No Upload Delays</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Eliminate slow file uploads and downloads. Large PDF documents process in fractions of a second on your device hardware.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-4">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-4">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Standard Encryption</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Utilizes browser WebCrypto and WebAssembly binaries ensuring high-grade encryption and standard PDF compliance.
              </p>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="max-w-4xl mx-auto mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-3">Frequently Asked Questions</h2>
            <p className="text-gray-600">Common questions about our free in-browser PDF utilities.</p>
          </div>

          <div className="space-y-4">
            <div className="bg-white p-6 rounded-2xl border border-gray-200">
              <h3 className="font-bold text-gray-800 mb-2">Are the tools really 100% free?</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Yes. There are no subscriptions, document limits, or hidden fees. We built this platform to provide open access to core document tools.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-200">
              <h3 className="font-bold text-gray-800 mb-2">How can you guarantee my files are secure?</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                You can disconnect your internet after opening any tool page and the software will continue to operate normally. No network requests are made with your file data.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-200">
              <h3 className="font-bold text-gray-800 mb-2">Do you add watermarks to merged or converted documents?</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                No. Output files are completely clean and unaltered, retaining professional formatting for personal or enterprise use.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}