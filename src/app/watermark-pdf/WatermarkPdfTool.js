'use client';

import { useState } from 'react';
import { PDFDocument, rgb, degrees, StandardFonts } from 'pdf-lib';
import {
  Stamp,
  FileText,
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

export default function WatermarkPdfTool({ faqs }) {
  const [file, setFile] = useState(null);
  const [watermarkText, setWatermarkText] = useState('CONFIDENTIAL');
  const [opacity, setOpacity] = useState(0.3);
  const [fontSize, setFontSize] = useState(48);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const toolInfo = tools.find((t) => t.id === 'watermark-pdf');

  const formatSize = (bytes) => {
    if (!bytes || bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleDrop = (acceptedFiles) => {
    setErrorMessage('');
    setIsSuccess(false);
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  };

  const addWatermark = async () => {
    if (!file) return;
    if (!watermarkText.trim()) {
      setErrorMessage('Please enter watermark text.');
      return;
    }

    setErrorMessage('');
    setIsSuccess(false);
    setIsProcessing(true);

    try {
      const arrayBuffer = await file.arrayBuffer();
      let pdfDoc;
      try {
        pdfDoc = await PDFDocument.load(arrayBuffer);
      } catch (loadErr) {
        throw new Error('Unable to read this PDF file. It might be password-protected or corrupted.');
      }

      const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
      const pages = pdfDoc.getPages();

      pages.forEach((page) => {
        const { width, height } = page.getSize();
        const textWidth = font.widthOfTextAtSize(watermarkText, fontSize);
        const textHeight = font.heightAtSize(fontSize);

        page.drawText(watermarkText, {
          x: width / 2 - textWidth / 2 + 30,
          y: height / 2 - textHeight / 2,
          size: fontSize,
          font: font,
          color: rgb(0.8, 0.1, 0.1),
          opacity: opacity,
          rotate: degrees(45),
        });
      });

      const watermarkedBytes = await pdfDoc.save();
      const blob = new Blob([watermarkedBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = `watermarked-${file.name}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setIsSuccess(true);
    } catch (err) {
      console.error(err);
      setErrorMessage(err.message || 'Error adding watermark to PDF.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6">
      {/* Rich H1 for SEO */}
      <div className="text-center mb-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
          Add Watermark to PDF Online – Free & Secure
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {toolInfo?.description || 'Stamp custom text or confidential marks across your PDF pages.'}
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
        <Dropzone onDrop={handleDrop} multiple={false} text="Drag & drop a PDF to add watermark" />
      ) : (
        <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-200">
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
            <div className="flex items-center space-x-3 overflow-hidden">
              <Stamp className="w-8 h-8 text-pink-500 shrink-0" />
              <div>
                <h2 className="text-xl font-bold text-gray-800 truncate max-w-xs sm:max-w-md">{file.name}</h2>
                <p className="text-sm text-gray-500">{formatSize(file.size)}</p>
              </div>
            </div>
            <button
              onClick={() => {
                setFile(null);
                setIsSuccess(false);
                setErrorMessage('');
              }}
              className="text-red-500 hover:text-red-700 font-semibold bg-red-50 px-4 py-2 rounded-xl text-sm transition-colors"
            >
              Change file
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-2">Watermark Text:</label>
              <input
                type="text"
                value={watermarkText}
                onChange={(e) => {
                  setWatermarkText(e.target.value);
                  setIsSuccess(false);
                }}
                placeholder="e.g. CONFIDENTIAL, DRAFT, SAMPLE"
                className="w-full border border-gray-300 rounded-xl p-3 text-gray-800 focus:outline-pink-500 font-medium"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Opacity ({Math.round(opacity * 100)}%):
              </label>
              <input
                type="range"
                min="0.1"
                max="0.8"
                step="0.05"
                value={opacity}
                onChange={(e) => {
                  setOpacity(parseFloat(e.target.value));
                  setIsSuccess(false);
                }}
                className="w-full mt-2 accent-pink-500 cursor-pointer"
              />
            </div>
          </div>

          {isSuccess && (
            <div className="mb-6 p-4 bg-pink-50 rounded-2xl border border-pink-200 text-center flex items-center justify-center space-x-2">
              <CheckCircle2 className="w-5 h-5 text-pink-600 shrink-0" />
              <p className="text-pink-800 font-semibold text-sm">
                Watermark applied successfully and document downloaded!
              </p>
            </div>
          )}

          <button
            onClick={addWatermark}
            disabled={isProcessing || !watermarkText.trim()}
            className={`w-full py-4 rounded-2xl font-bold text-white text-lg transition-all ${
              isProcessing || !watermarkText.trim()
                ? 'bg-pink-300 cursor-not-allowed'
                : 'bg-pink-600 hover:bg-pink-700 shadow-md'
            }`}
          >
            {isProcessing ? 'Applying Watermark...' : 'Download Watermarked PDF'}
          </button>
        </div>
      )}

      {/* SEO & Rich Content Area */}
      <div className="mt-20 border-t border-gray-200 pt-16">
        {/* Step-by-Step Guide */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-3">How to Watermark PDF Files Online</h2>
          <p className="text-gray-600">Stamp confidential marks and copyright text in 3 quick steps.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
            <div className="w-10 h-10 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center font-bold mx-auto mb-4">1</div>
            <h3 className="font-bold text-lg text-gray-800 mb-2">Upload Document</h3>
            <p className="text-sm text-gray-500">Drag & drop the PDF you wish to protect into the upload box above.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
            <div className="w-10 h-10 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center font-bold mx-auto mb-4">2</div>
            <h3 className="font-bold text-lg text-gray-800 mb-2">Customize Text</h3>
            <p className="text-sm text-gray-500">Type your custom watermark and adjust transparency to your preference.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
            <div className="w-10 h-10 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center font-bold mx-auto mb-4">3</div>
            <h3 className="font-bold text-lg text-gray-800 mb-2">Download Result</h3>
            <p className="text-sm text-gray-500">Your watermarked PDF is created locally in memory and downloaded instantly.</p>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Why Add Watermarks with PDF SaaS?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex items-start space-x-3">
              <ShieldCheck className="w-6 h-6 text-green-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-gray-800 text-base">Complete Document Privacy</h4>
                <p className="text-sm text-gray-500 mt-1">
                  Files are processed strictly in local browser memory. No data is uploaded or stored on any server.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Zap className="w-6 h-6 text-yellow-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-gray-800 text-base">Instant Processing</h4>
                <p className="text-sm text-gray-500 mt-1">
                  Watermarks are stamped across all pages in seconds without server queue delays.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Sparkles className="w-6 h-6 text-blue-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-gray-800 text-base">Professional Clean Output</h4>
                <p className="text-sm text-gray-500 mt-1">
                  We never add third-party advertising or our brand logo to your output documents.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Smartphone className="w-6 h-6 text-purple-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-gray-800 text-base">Mobile & Desktop Friendly</h4>
                <p className="text-sm text-gray-500 mt-1">
                  Works on iPhone, Android, Windows, and Mac browsers without requiring software installation.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Common Uses Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Common Scenarios for Watermarking PDFs</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
            <li className="p-4 bg-gray-50 rounded-xl border border-gray-100">
              <strong>Draft Agreements:</strong> Stamp &quot;DRAFT&quot; on contracts and proposals during negotiations.
            </li>
            <li className="p-4 bg-gray-50 rounded-xl border border-gray-100">
              <strong>Confidentiality Protection:</strong> Mark sensitive business records or audits as &quot;CONFIDENTIAL&quot;.
            </li>
            <li className="p-4 bg-gray-50 rounded-xl border border-gray-100">
              <strong>Copyright Protection:</strong> Protect creative portfolios, ebooks, and research with author notices.
            </li>
            <li className="p-4 bg-gray-50 rounded-xl border border-gray-100">
              <strong>Sample Invoices:</strong> Stamp &quot;SAMPLE&quot; or &quot;PAID&quot; on receipts and billing statements.
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
            <Link href="/protect-pdf" className="px-4 py-2 bg-white rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:text-pink-600 hover:border-pink-300 transition-colors">
              Protect PDF
            </Link>
            <Link href="/sign-pdf" className="px-4 py-2 bg-white rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:text-pink-600 hover:border-pink-300 transition-colors">
              Sign PDF
            </Link>
            <Link href="/rotate-pdf" className="px-4 py-2 bg-white rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:text-pink-600 hover:border-pink-300 transition-colors">
              Rotate PDF
            </Link>
            <Link href="/merge-pdf" className="px-4 py-2 bg-white rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:text-pink-600 hover:border-pink-300 transition-colors">
              Merge PDF
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}