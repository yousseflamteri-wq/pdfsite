import { siteUrl } from '../../lib/siteConfig';

export const metadata = {
  title: 'Privacy Policy – Zero Server Upload Guarantee | PDF SaaS',
  description:
    'PDF SaaS processes all files 100% in your browser — nothing is uploaded. Read our privacy policy for full details on our zero-data-collection architecture.',
  alternates: {
    canonical: `${siteUrl}/privacy-policy`,
  },
};

export default function PrivacyPolicyPage() {
  return (
    <main className="max-w-4xl mx-auto py-16 px-4 sm:px-6">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Privacy Policy</h1>
      <p className="text-sm text-gray-500 mb-8">
        Last modified: October 1, 2026
      </p>

      <div className="space-y-8 text-gray-700 leading-relaxed text-base">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">1. Complete Client-Side Processing Architecture</h2>
          <p>
            At PDF SaaS, privacy is our foundational architecture rather than an optional setting. Unlike standard online PDF services, all operations—including merging, splitting, compressing, rotating, signing, watermarking, and password encryption—execute <strong>entirely inside your local web browser</strong> using WebAssembly and client-side JavaScript.
          </p>
          <p className="mt-2">
            Your files, pictures, signatures, and credentials are never transmitted over the internet, stored on remote machines, or inspected by our infrastructure.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">2. Data We Do Not Collect</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>We do not upload, copy, or retain your documents, scans, or images.</li>
            <li>We do not record the passwords assigned to encrypted PDF files.</li>
            <li>We do not capture or store digital signatures drawn on the signature pad.</li>
            <li>We do not create persistent user profiles or demand account registration.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">3. Cookies & Web Analytics</h2>
          <p>
            We may utilize standard, privacy-focused analytical cookies to monitor aggregate website traffic, page performance, and technical errors. This data consists solely of non-personally identifiable telemetry such as browser family, screen dimensions, and visit timestamps.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">4. Third-Party Advertising (Google AdSense)</h2>
          <p>
            Third-party advertising partners, including Google, employ cookies to display advertisements relevant to a user&apos;s browsing history across our site and other destinations on the web. You have the right to decline or customize personalized advertising preferences anytime by visiting Google&apos;s Ads Settings page.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">5. Contact Information</h2>
          <p>
            For any inquiries, feedback, or legal questions regarding our technical privacy guarantees, please reach out to our team at <code>privacy@pdfsaas.com</code>.
          </p>
        </section>
      </div>
    </main>
  );
}