import { siteUrl } from '../../lib/siteConfig';

export const metadata = {
  title: 'Terms of Use – PDF Lab Legal Guidelines',
  description:
    'Terms of service and legal conditions for using PDF Lab free client-side PDF utilities. No accounts, no uploads, no data collection.',
  alternates: {
    canonical: `${siteUrl}/terms-of-use`,
  },
};

export default function TermsOfUsePage() {
  return (
    <main className="max-w-4xl mx-auto py-16 px-4 sm:px-6">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Terms of Use</h1>
      <p className="text-sm text-gray-500 mb-8">
        Effective date: 2026
      </p>

      <div className="space-y-8 text-gray-700 leading-relaxed text-base">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">1. Acceptance of Terms</h2>
          <p>
            By accessing and utilizing the web utilities on PDF Lab, you acknowledge and agree to comply with these Terms of Use. If you disagree with any portion of these conditions, you must immediately discontinue using our services.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">2. Permitted Lawful Use</h2>
          <p>
            Our software utilities are provided free of charge for both individual and corporate lawful needs. You agree not to exploit our platform for distributing malicious code, running automated denial-of-service traffic, or attempting to decompile proprietary delivery bundles.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">3. Disclaimer of Warranties</h2>
          <p>
            All tools and code executions are offered strictly on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis without warranties of any variety, whether express or implied. While we strive to support broad PDF specification standards, we do not guarantee uninterrupted performance on non-standard, malformed, or corrupt file structures.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">4. Limitation of Liability</h2>
          <p>
            Under no circumstances shall PDF Lab or its operators be held responsible for document corruption, loss of records, or secondary damages arising from browser crashes or file manipulation. Users are always advised to retain backup copies of source documents prior to executing batch operations.
          </p>
        </section>
      </div>
    </main>
  );
}