import { siteName } from '../../lib/siteConfig';

export const metadata = {
  title: `Contact Us | ${siteName}`,
  description: 'Get in touch with us for any questions or support.',
};

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto py-16 px-4 sm:px-6">
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">Contact Us</h1>
        <p className="text-gray-600">Have questions? Send us a message directly.</p>
      </div>

      <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
        <form action="https://api.web3forms.com/submit" method="POST" className="space-y-6">
          
          {/* الساروت ديال Web3Forms اللي خديتي دابا */}
          <input type="hidden" name="access_key" value="23941e46-2f7c-4cbe-9a7c-3d4963b8a144" />
          
          <input type="hidden" name="redirect" value="https://onlinepdflab.app" />

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Your Name</label>
            <input
              type="text"
              name="name"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Email Address</label>
            <input
              type="email"
              name="email"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              placeholder="name@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Message</label>
            <textarea
              name="message"
              required
              rows="5"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
              placeholder="How can we help you?"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition-colors"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}