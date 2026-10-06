'use client';

import { useState } from 'react';
import {
  Image as ImageIcon,
  ShieldCheck,
  Zap,
  Sparkles,
  Smartphone,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';
import Link from 'next/link';
import Dropzone from '../../components/Dropzone';
import { tools } from '../../lib/toolsConfig';

export default function PdfToJpgTool({ faqs }) {
  const [file, setFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusText, setStatusText] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [completedCount, setCompletedCount] = useState(null);

  const toolInfo = tools.find((t) => t.id === 'pdf-to-jpg');

  const formatSize = (bytes) => {
    if (!bytes || bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const loadPdfJs = () => {
    return new Promise((resolve, reject) => {
      if (window.pdfjsLib) {
        resolve(window.pdfjsLib);
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
      script.onload = () => {
        window.pdfjsLib.GlobalWorkerOptions.workerSrc =
          'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
        resolve(window.pdfjsLib);
      };
      script.onerror = reject;
      document.head.appendChild(script);
    });
  };

  const handleDrop = (acceptedFiles) => {
    setErrorMessage('');
    setCompletedCount(null);
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  };

  const convertPdfToJpg = async () => {
    if (!file) return;
    setErrorMessage('');
    setIsProcessing(true);
    setCompletedCount(null);
    setStatusText('Loading PDF engine...');

    try {
      const pdfjsLib = await loadPdfJs();
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const totalPages = pdf.numPages;

      for (let i = 1; i <= totalPages; i++) {
        setStatusText(`Exporting page ${i} of ${totalPages}...`);
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 2 });

        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        await page.render({
          canvasContext: context,
          viewport: viewport,
        }).promise;

        const imgUrl = canvas.toDataURL('image/jpeg', 0.92);
        const link = document.createElement('a');
        link.href = imgUrl;
        link.download = `${file.name.replace(/\.[^/.]+$/, '')}-page-${i}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }

      setCompletedCount(totalPages);
    } catch (err) {
      console.error(err);
      setErrorMessage('Error rendering PDF pages to JPG. Make sure the file is not corrupted or password-protected.');
    } finally {
      setIsProcessing(false);
      setStatusText('');
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6">
      {/* Rich H1 for SEO */}
      <div className="text-center mb-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
          Convert PDF to JPG Online – Free & High Quality
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {toolInfo?.description || 'Extract every page of your PDF into high-quality JPG image files.'}
        </p>
      </div>

      {errorMessage && (
        <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 flex items-center space-x-3">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span className="text-sm font-medium">{errorMessage}</span>
        </div>
      )}

      {/* Tool Work Area */}
      {!file ? (
        <Dropzone onDrop={handleDrop} multiple={false} text="Drag & drop a single PDF to extract JPG images" />
      ) : (
        <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-200">
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
            <div className="flex items-center space-x-3 overflow-hidden">
              <ImageIcon className="w-8 h-8 text-purple-500 shrink-0" />
              <div>
                <h2 className="text-xl font-bold text-gray-800 truncate max-w-xs sm:max-w-md">{file.name}</h2>
                <p className="text-sm text-gray-500">{formatSize(file.size)}</p>
              </div>
            </div>
            <button
              onClick={() => {
                setFile(null);
                setCompletedCount(null);
                setErrorMessage('');
              }}
              className="text-red-500 hover:text-red-700 font-semibold bg-red-50 px-4 py-2 rounded-xl text-sm transition-colors"
            >
              Change file
            </button>
          </div>

          {completedCount && (
            <div className="mb-6 p-4 bg-purple-50 rounded-2xl border border-purple-200 text-center flex items-center justify-center space-x-2">
              <CheckCircle2 className="w-5 h-5 text-purple-600 shrink-0" />
              <p className="text-purple-800 font-semibold text-sm">
                Successfully extracted and downloaded {completedCount} page{completedCount > 1 ? 's' : ''} as JPG!
              </p>
            </div>
          )}

          <button
            onClick={convertPdfToJpg}
            disabled={isProcessing}
            className={`w-full py-4 rounded-2xl font-bold text-white text-lg transition-all ${
              isProcessing ? 'bg-purple-300 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700 shadow-md'
            }`}
          >
            {isProcessing ? statusText || 'Extracting...' : 'Extract JPG Pages'}
          </button>
        </div>
      )}

      {/* SEO & Rich Content Area */}
      <div className="mt-20 border-t border-gray-200 pt-16">
        {/* Step-by-Step Guide */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-3">How to Convert PDF Pages to JPG Images</h2>
          <p className="text-gray-600">Extract high-resolution image snapshots from your document in 3 easy steps.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
            <div className="w-10 h-10 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center font-bold mx-auto mb-4">1</div>
            <h3 className="font-bold text-lg text-gray-800 mb-2">Upload Document</h3>
            <p className="text-sm text-gray-500">Select or drop a PDF file from your computer, phone, or tablet.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
            <div className="w-10 h-10 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center font-bold mx-auto mb-4">2</div>
            <h3 className="font-bold text-lg text-gray-800 mb-2">High-Res Render</h3>
            <p className="text-sm text-gray-500">Each page is automatically converted into a crisp 2x resolution canvas.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
            <div className="w-10 h-10 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center font-bold mx-auto mb-4">3</div>
            <h3 className="font-bold text-lg text-gray-800 mb-2">Download JPGs</h3>
            <p className="text-sm text-gray-500">Images are generated directly into your device downloads folder instantly.</p>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Why Use Our Client-Side PDF to JPG Converter?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex items-start space-x-3">
              <ShieldCheck className="w-6 h-6 text-green-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-gray-800 text-base">Absolute Privacy Guaranteed</h4>
                <p className="text-sm text-gray-500 mt-1">
                  Your files remain entirely on your computer. Nothing is transmitted across public servers or stored remotely.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Zap className="w-6 h-6 text-yellow-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-gray-800 text-base">Ultra-Fast Processing</h4>
                <p className="text-sm text-gray-500 mt-1">
                  Enjoy instantaneous rendering power with zero cloud queue times or upload buffering bottlenecks.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Sparkles className="w-6 h-6 text-blue-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-gray-800 text-base">Sharp High-DPI Output</h4>
                <p className="text-sm text-gray-500 mt-1">
                  Pages are rendered at double resolution to preserve fine print, signatures, diagrams, and small annotations.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Smartphone className="w-6 h-6 text-purple-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-gray-800 text-base">Universal Browser Support</h4>
                <p className="text-sm text-gray-500 mt-1">
                  Runs smoothly across Chrome, Edge, Safari, Brave, and Firefox on both mobile and desktop platforms.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Common Uses Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Common Use Cases for Converting PDF to JPG</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
            <li className="p-4 bg-gray-50 rounded-xl border border-gray-100">
              <strong>Social Media & Presentations:</strong> Share visual excerpts of documents or slides directly on Instagram, LinkedIn, or PowerPoint.
            </li>
            <li className="p-4 bg-gray-50 rounded-xl border border-gray-100">
              <strong>Document Thumbnails:</strong> Create preview images for academic articles, digital brochures, or portfolio portfolios.
            </li>
            <li className="p-4 bg-gray-50 rounded-xl border border-gray-100">
              <strong>Archiving & Photo Viewers:</strong> Save important legal or financial statements in universal image formats for simple viewing.
            </li>
            <li className="p-4 bg-gray-50 rounded-xl border border-gray-100">
              <strong>Graphic Editing:</strong> Import specific PDF design assets and certificates into Photoshop, Canva, or Illustrator as pictures.
            </li>
          </ul>
        </div>

        {/* FAQs */}
        <div className="max-w-3xl mx-auto mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-100">
                <h3 className="font-bold text-gray-800 mb-2">{faq.q}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Related Tools Internal Linking */}
        <div className="border-t border-gray-200 pt-10 text-center">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Related PDF Tools</h3>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/jpg-to-pdf" className="px-4 py-2 bg-white rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:text-purple-600 hover:border-purple-300 transition-colors">
              JPG to PDF
            </Link>
            <Link href="/compress-pdf" className="px-4 py-2 bg-white rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:text-purple-600 hover:border-purple-300 transition-colors">
              Compress PDF
            </Link>
            <Link href="/merge-pdf" className="px-4 py-2 bg-white rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:text-purple-600 hover:border-purple-300 transition-colors">
              Merge PDF
            </Link>
            <Link href="/split-pdf" className="px-4 py-2 bg-white rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:text-purple-600 hover:border-purple-300 transition-colors">
              Split PDF
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}