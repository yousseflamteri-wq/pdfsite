import './globals.css';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import { siteUrl, siteName, defaultDescription } from '../lib/siteConfig';

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Free Online PDF Tools – 100% Private In-Browser PDF Editor',
    template: `%s | ${siteName}`,
  },
  description: defaultDescription,
  icons: {
    icon: '/logo.svg',
    shortcut: '/logo.svg',
    apple: '/logo.svg',
  },
  authors: [{ name: `${siteName} Team` }],
  creator: siteName,
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    siteName,
    title: 'Free Online PDF Tools – 100% Private In-Browser PDF Editor',
    description: defaultDescription,
    url: siteUrl,
    images: [
      {
        url: `${siteUrl}/logo.svg`,
        width: 512,
        height: 512,
        alt: `${siteName} Logo`,
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'Free Online PDF Tools – 100% Private In-Browser PDF Editor',
    description: defaultDescription,
    images: [`${siteUrl}/logo.svg`],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 flex flex-col min-h-screen">
        {/* Navigation Bar */}
        <Navbar />

        <div className="flex-1">{children}</div>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 mt-20">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
              <div className="col-span-2">
                <div className="flex items-center space-x-2 mb-3">
                  <span className="bg-blue-600 text-white font-black px-2.5 py-0.5 rounded text-sm">PDF</span>
                  <span className="font-bold text-lg text-gray-900">Lab</span>
                </div>
                <p className="text-sm text-gray-500 max-w-sm leading-relaxed mb-4">
                  Free and completely private online PDF tools. All operations run directly in your web browser—no uploads, no server storage, total data confidentiality.
                </p>
              </div>

              <div>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">PDF Tools</h3>
                <div className="flex flex-col space-y-2.5 text-sm text-gray-600">
                  <Link href="/merge-pdf" className="hover:text-blue-600 transition-colors">Merge PDF</Link>
                  <Link href="/split-pdf" className="hover:text-blue-600 transition-colors">Split PDF</Link>
                  <Link href="/remove-pages" className="hover:text-blue-600 transition-colors">Remove Pages</Link>
                  <Link href="/compress-pdf" className="hover:text-blue-600 transition-colors">Compress PDF</Link>
                  <Link href="/jpg-to-pdf" className="hover:text-blue-600 transition-colors">JPG to PDF</Link>
                  <Link href="/pdf-to-jpg" className="hover:text-blue-600 transition-colors">PDF to JPG</Link>
                  <Link href="/rotate-pdf" className="hover:text-blue-600 transition-colors">Rotate PDF</Link>
                  <Link href="/add-watermark" className="hover:text-blue-600 transition-colors">Add Watermark</Link>
                  <Link href="/sign-pdf" className="hover:text-blue-600 transition-colors">Sign PDF</Link>
                  <Link href="/protect-pdf" className="hover:text-blue-600 transition-colors">Protect PDF</Link>
                  <Link href="/organize-pdf" className="hover:text-blue-600 transition-colors">Organize PDF</Link>
                  <Link href="/add-page-numbers" className="hover:text-blue-600 transition-colors">Add Page Numbers</Link>
                  <Link href="/image-to-pdf" className="hover:text-blue-600 transition-colors">Image to PDF</Link>
                  <Link href="/pdf-to-text" className="hover:text-blue-600 transition-colors">PDF to Text</Link>
                  <Link href="/pdf-to-md" className="hover:text-blue-600 transition-colors">PDF to Markdown</Link>
                  <Link href="/ocr-pdf" className="hover:text-blue-600 transition-colors">OCR PDF</Link>
                </div>
              </div>

              <div>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Company &amp; Resources</h3>
                <div className="flex flex-col space-y-2.5 text-sm text-gray-600">
                  <Link href="/blog" className="hover:text-blue-600 transition-colors">PDF Guides</Link>
                  <Link href="/privacy-policy" className="hover:text-blue-600 transition-colors">Privacy Policy</Link>
                  <Link href="/terms-of-use" className="hover:text-blue-600 transition-colors">Terms of Use</Link>
                  <Link href="/about" className="hover:text-blue-600 transition-colors">About Us</Link>
                  <Link href="/contact" className="hover:text-blue-600 transition-colors">Contact Us</Link>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-400">
              <p>© 2026 {siteName}. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}