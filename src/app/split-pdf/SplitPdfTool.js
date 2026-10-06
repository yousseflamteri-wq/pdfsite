'use client';

import { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import {
  SplitSquareVertical,
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

export default function SplitPdfTool({ faqs }) {
  const [file, setFile] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [isSplitting, setIsSplitting] = useState(false);
  const [splitRange, setSplitRange] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const toolInfo = tools.find((t) => t.id === 'split-pdf');

  const formatSize = (bytes) => {
    if (!bytes || bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleDrop = async (acceptedFiles) => {
    setErrorMessage('');
    setIsSuccess(false);
    if (acceptedFiles.length > 0) {
      const selectedFile = acceptedFiles[0];
      setFile(selectedFile);

      try {
        const buffer = await selectedFile.arrayBuffer();
        const pdf = await PDFDocument.load(buffer);
        const count = pdf.getPageCount();
        setPageCount(count);
        setSplitRange(`1-${count}`);
      } catch (err) {
        console.error(err);
        setErrorMessage('Unable to read this PDF file. It might be password-protected or corrupted.');
      }
    }
  };

  const splitPdf = async () => {
    if (!file) return;
    setErrorMessage('');
    setIsSuccess(false);
    setIsSplitting(true);

    try {
      const buffer = await file.arrayBuffer();
      let srcPdf;
      try {
        srcPdf = await PDFDocument.load(buffer);
      } catch (loadErr) {
        throw new Error('Unable to read this PDF file. It might be password-protected or corrupted.');
      }

      const newPdf = await PDFDocument.create();

      const parts = splitRange.split('-').map((n) => parseInt(n.trim(), 10));
      let start = (parts[0] || 1) - 1;
      let end = (parts[1] || pageCount) - 1;

      start = Math.max(0, Math.min(start, pageCount - 1));
      end = Math.max(start, Math.min(end, pageCount - 1));

      const pageIndices = [];
      for (let i = start; i <= end; i++) {
        pageIndices.push(i);
      }

      const copiedPages = await newPdf.copyPages(srcPdf, pageIndices);
      copiedPages.forEach((p) => newPdf.addPage(p));

      const pdfBytes = await newPdf.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = `split-${file.name}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setIsSuccess(true);
    } catch (err) {
      console.error(err);
      setErrorMessage(err.message || 'Error occurred while splitting the PDF.');
    } finally {
      setIsSplitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6">
      {/* Rich H1 for SEO */}
      <div className="text-center mb-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
          Split PDF Online – Extract Pages Privately
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {toolInfo?.description || 'Separate pages or extract a specific range into a new PDF document.'}
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
        <Dropzone onDrop={handleDrop} multiple={false} text="Drag & drop a single PDF to split" />
      ) : (
        <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-200">
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
            <div className="flex items-center space-x-3 overflow-hidden">
              <SplitSquareVertical className="w-8 h-8 text-orange-500 shrink-0" />
              <div>
                <h2 className="text-xl font-bold text-gray-800 truncate max-w-xs sm:max-w-md">{file.name}</h2>
                <p className="text-sm text-gray-500">
                  Total pages: <span className="font-semibold text-gray-700">{pageCount}</span> ({formatSize(file.size)})
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                setFile(null);
                setPageCount(0);
                setSplitRange('');
                setIsSuccess(false);
                setErrorMessage('');
              }}
              className="text-red-500 hover:text-red-700 font-semibold bg-red-50 px-4 py-2 rounded-xl text-sm transition-colors"
            >
              Change file
            </button>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Page Range to Extract:
            </label>
            <div className="flex items-center space-x-3">
              <input
                type="text"
                value={splitRange}
                onChange={(e) => {
                  setSplitRange(e.target.value);
                  setIsSuccess(false);
                }}
                className="w-full max-w-xs border border-gray-300 rounded-xl p-3 text-gray-800 focus:outline-orange-500 font-medium"
                placeholder="e.g. 1-2"
              />
              <span className="text-xs text-gray-400">Available: 1 to {pageCount}</span>
            </div>
          </div>

          {isSuccess && (
            <div className="mb-6 p-4 bg-orange-50 rounded-2xl border border-orange-200 text-center flex items-center justify-center space-x-2">
              <CheckCircle2 className="w-5 h-5 text-orange-600 shrink-0" />
              <p className="text-orange-800 font-semibold text-sm">
                Selected pages ({splitRange}) extracted and downloaded successfully!
              </p>
            </div>
          )}

          <button
            onClick={splitPdf}
            disabled={isSplitting}
            className={`w-full py-4 rounded-2xl font-bold text-white text-lg transition-all ${
              isSplitting ? 'bg-orange-300 cursor-not-allowed' : 'bg-orange-500 hover:bg-orange-600 shadow-md'
            }`}
          >
            {isSplitting ? 'Extracting pages...' : 'Split PDF'}
          </button>
        </div>
      )}

      {/* SEO & Rich Content Area */}
      <div className="mt-20 border-t border-gray-200 pt-16">
        {/* Step-by-Step Guide */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-3">How to Split a PDF Online</h2>
          <p className="text-gray-600">Extract pages or custom sections from your PDF in 3 quick steps.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
            <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-bold mx-auto mb-4">1</div>
            <h3 className="font-bold text-lg text-gray-800 mb-2">Upload Document</h3>
            <p className="text-sm text-gray-500">Drop your PDF file into the upload zone above to scan its page count.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
            <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-bold mx-auto mb-4">2</div>
            <h3 className="font-bold text-lg text-gray-800 mb-2">Define Range</h3>
            <p className="text-sm text-gray-500">Specify the page range (such as &quot;1-3&quot; or single page &quot;2-2&quot;) you want to extract.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
            <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-bold mx-auto mb-4">3</div>
            <h3 className="font-bold text-lg text-gray-800 mb-2">Download Split PDF</h3>
            <p className="text-sm text-gray-500">Your extracted pages are compiled instantly in browser memory and downloaded.</p>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Why Split PDFs with PDF Lab?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex items-start space-x-3">
              <ShieldCheck className="w-6 h-6 text-green-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-gray-800 text-base">Complete Document Privacy</h4>
                <p className="text-sm text-gray-500 mt-1">
                  Your files remain 100% on your device. We never transmit, store, or view your sensitive paperwork.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Zap className="w-6 h-6 text-yellow-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-gray-800 text-base">Lightning-Fast Extraction</h4>
                <p className="text-sm text-gray-500 mt-1">
                  Because nothing is uploaded across the web, documents are split and exported in mere milliseconds.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Sparkles className="w-6 h-6 text-blue-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-gray-800 text-base">Zero Watermarks or Limits</h4>
                <p className="text-sm text-gray-500 mt-1">
                  Extract as many pages as you require without watermark stamps, subscriptions, or hidden charges.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Smartphone className="w-6 h-6 text-purple-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-gray-800 text-base">Every Device Supported</h4>
                <p className="text-sm text-gray-500 mt-1">
                  Use on iPhone, iPad, Android smartphones, Mac, Windows, or Linux browsers without installing software.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Common Uses Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Common Scenarios for Splitting PDFs</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
            <li className="p-4 bg-gray-50 rounded-xl border border-gray-100">
              <strong>Extracting Specific Chapters:</strong> Separate chapters or sections from large e-books or research papers.
            </li>
            <li className="p-4 bg-gray-50 rounded-xl border border-gray-100">
              <strong>Sharing Partial Statements:</strong> Send only specific invoice pages or banking sheets without exposing all records.
            </li>
            <li className="p-4 bg-gray-50 rounded-xl border border-gray-100">
              <strong>Isolating Signed Signature Pages:</strong> Extract execution or endorsement pages from multi-page agreements.
            </li>
            <li className="p-4 bg-gray-50 rounded-xl border border-gray-100">
              <strong>Removing Unnecessary Pages:</strong> Eliminate blank sheets or duplicate pages to streamline document size.
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
            <Link href="/merge-pdf" className="px-4 py-2 bg-white rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:text-orange-600 hover:border-orange-300 transition-colors">
              Merge PDF
            </Link>
            <Link href="/compress-pdf" className="px-4 py-2 bg-white rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:text-orange-600 hover:border-orange-300 transition-colors">
              Compress PDF
            </Link>
            <Link href="/rotate-pdf" className="px-4 py-2 bg-white rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:text-orange-600 hover:border-orange-300 transition-colors">
              Rotate PDF
            </Link>
            <Link href="/pdf-to-jpg" className="px-4 py-2 bg-white rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:text-orange-600 hover:border-orange-300 transition-colors">
              PDF to JPG
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}