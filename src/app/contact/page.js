import { Mail, Clock, ShieldCheck } from 'lucide-react';
import { siteUrl } from '../../lib/siteConfig';

export const metadata = {
  title: 'Contact Us – PDF Lab Support',
  description: 'Get in touch with the PDF Lab engineering and support team.',
  alternates: {
    canonical: `${siteUrl}/contact`,
  },
};

export default function ContactPage() {
  return (
    <main className="max-w-4xl mx-auto py-16 px-4 sm:px-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-3">Contact Support</h1>
        <p className="text-lg text-gray-600">
          Have questions, technical feedback, or need enterprise inquiries? We are here to help.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-2xl border border-gray-200 text-center shadow-sm">
          <Mail className="w-8 h-8 text-blue-600 mx-auto mb-3" />
          <h3 className="font-bold text-gray-800 mb-1">Email Support</h3>
          <p className="text-sm text-gray-500">support@pdfLab.com</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-200 text-center shadow-sm">
          <Clock className="w-8 h-8 text-green-600 mx-auto mb-3" />
          <h3 className="font-bold text-gray-800 mb-1">Response Time</h3>
          <p className="text-sm text-gray-500">Within 24–48 hours</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-200 text-center shadow-sm">
          <ShieldCheck className="w-8 h-8 text-purple-600 mx-auto mb-3" />
          <h3 className="font-bold text-gray-800 mb-1">Privacy Queries</h3>
          <p className="text-sm text-gray-500">privacy@pdfLab.com</p>
        </div>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm max-w-2xl mx-auto">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Send us a direct message</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Your Name</label>
            <input
              type="text"
              required
              className="w-full border border-gray-300 rounded-xl p-3 text-sm focus:outline-blue-500"
              placeholder="e.g. John Doe"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              required
              className="w-full border border-gray-300 rounded-xl p-3 text-sm focus:outline-blue-500"
              placeholder="name@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Message</label>
            <textarea
              rows="4"
              required
              className="w-full border border-gray-300 rounded-xl p-3 text-sm focus:outline-blue-500"
              placeholder="How can we assist you with our PDF utilities?"
            ></textarea>
          </div>
          <button
            type="button"
            className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors shadow-sm"
          >
            Send Message
          </button>
        </form>
      </div>
    </main>
  );
}