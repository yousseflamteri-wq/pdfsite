import Link from 'next/link';
import { FileQuestion, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center mb-6">
        <FileQuestion className="w-10 h-10" />
      </div>
      <h1 className="text-4xl sm:text-5xl font-black text-gray-900 mb-3">404 - Page Not Found</h1>
      <p className="text-gray-600 max-w-md mb-8">
        The tool or page you are trying to access does not exist or may have been moved.
      </p>
      <Link
        href="/"
        className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3.5 rounded-2xl shadow-sm transition-all"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Homepage</span>
      </Link>
    </main>
  );
}