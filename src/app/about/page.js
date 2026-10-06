import Link from 'next/link';
import { ShieldCheck, Zap, HeartHandshake } from 'lucide-react';

import { siteUrl } from '../../lib/siteConfig';

export const metadata = {
  title: 'About Us – The Mission Behind PDF Lab',
  description:
    'Learn how PDF Lab eliminates server fees and privacy concerns with local client-side document processing.',
  alternates: {
    canonical: `${siteUrl}/about`,
  },
};

export default function AboutPage() {
  return (
    <main className="max-w-4xl mx-auto py-16 px-4 sm:px-6">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-4">About PDF Lab</h1>
      <p className="text-lg text-gray-600 mb-10 leading-relaxed">
        Building private, lightning-fast document management tools that put user security first.
      </p>

      <div className="space-y-8 text-gray-700 leading-relaxed text-base">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Our Mission</h2>
          <p>
            Working with PDF files shouldn&apos;t compromise your confidentiality or force you into pricey recurring subscriptions. Most online tools require you to transmit sensitive personal information, legal contracts, and financial receipts to remote cloud servers, creating potential security vulnerabilities.
          </p>
          <p className="mt-2">
            <strong>PDF Lab was created to challenge that convention.</strong> By leveraging the latest WebAssembly and browser sandbox technologies, we run complex document operations entirely on your local machine. Your files never leave your device.
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-10">
          <div className="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm text-center">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-gray-900 mb-1">Guaranteed Privacy</h3>
            <p className="text-xs text-gray-500">Zero file transfers or remote document retention.</p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm text-center">
            <div className="w-12 h-12 bg-yellow-50 text-yellow-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-gray-900 mb-1">Instant Speed</h3>
            <p className="text-xs text-gray-500">Zero internet upload bottlenecks or cloud waitlists.</p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm text-center">
            <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-gray-900 mb-1">Free Forever</h3>
            <p className="text-xs text-gray-500">No account registrations, limits, or hidden fees.</p>
          </div>
        </div>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Get Started</h2>
          <p>
            Ready to organize your documents? Explore our full collection of free tools on our{' '}
            <Link href="/" className="text-blue-600 font-semibold hover:underline">
              homepage
            </Link>
            .
          </p>
        </section>
      </div>
    </main>
  );
}