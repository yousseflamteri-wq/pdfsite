'use client';

import { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import {
  Trash2,
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

export default function RemovePagesTool({ faqs }) {
  const [file, setFile] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [pagesInput, setPagesInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const toolInfo = tools.find((t) => t.id === 'remove-pages');

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
      } catch (err) {
        console.error(err);
        setErrorMessage('Unable to read PDF file. It might be password-protected or corrupted.');
      }
    }
  };

  // تحويل النص (مثال: "1, 3, 5-7") إلى مجموعة أرقام صفحات للحذف
  const parsePagesToRemove = (input, maxPages) => {
    const toRemove = new Set();
    const parts = input.split(',').map((p) => p.trim()).filter(Boolean);

    for (const part of parts) {
      if (part.includes('-')) {
        const [startStr, endStr] = part.split('-').map((s) => s.trim());
        const start = parseInt(startStr, 10);
        const end = parseInt(endStr, 10);
        if (!isNaN(start) && !isNaN(end)) {
          const min = Math.max(1, Math.min(start, end));
          const max = Math.min(maxPages, Math.max(start, end));
          for (let i = min; i <= max; i++) {
            toRemove.add(i);
          }
        }
      } else {
        const pageNum = parseInt(part, 10);
        if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= maxPages) {
          toRemove.add(pageNum);
        }
      }
    }
    return toRemove;
  };

  const removePages = async () => {
    if (!file) return;
    setErrorMessage('');
    setIsSuccess(false);

    const pagesToDelete = parsePagesToRemove(pagesInput, pageCount);

    if (pagesToDelete.size === 0) {
      setErrorMessage('Please enter valid page numbers to remove (e.g. 1, 3-5).');
      return;
    }

    if (pagesToDelete.size >= pageCount) {
      setErrorMessage('You cannot delete all pages from the document.');
      return;
    }

    setIsProcessing(true);

    try {
      const buffer = await file.arrayBuffer();
      const srcPdf = await PDFDocument.load(buffer);
      const newPdf = await PDFDocument.create();

      // الصفحات المتبقية (0-indexed)
      const pagesToKeep = [];
      for (let i = 1; i <= pageCount; i++) {
        if (!pagesToDelete.has(i)) {
          pagesToKeep.push(i - 1);
        }
      }

      const copiedPages = await newPdf.copyPages(srcPdf, pagesToKeep);
      copiedPages.forEach((p) => newPdf.addPage(p));

      const pdfBytes = await newPdf.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = `cleaned-${file.name}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setIsSuccess(true);
    } catch (err) {
      console.error(err);
      setErrorMessage(err.message || 'Error occurred while removing pages.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
          Remove PDF Pages Online – Free & Private
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {toolInfo?.description || 'Delete specific pages from your PDF document easily and securely.'}
        </p>
      </div>

      {errorMessage && (
        <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 flex items-center space-x-3">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span className="text-sm font-medium">{errorMessage}</span>
        </div>
      )}

      {/* Tool Interactive Area */}
      {!file ? (
        <Dropzone onDrop={handleDrop} multiple={false} text="Drag & drop a PDF file to remove pages" />
      ) : (
        <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-200">
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
            <div className="flex items-center space-x-3 overflow-hidden">
              <Trash2 className="w-8 h-8 text-rose-500 shrink-0" />
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
                setPagesInput('');
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
              Pages to Delete (e.g. 1, 3, 5-7):
            </label>
            <div className="flex items-center space-x-3">
              <input
                type="text"
                value={pagesInput}
                onChange={(e) => {
                  setPagesInput(e.target.value);
                  setIsSuccess(false);
                }}
                className="w-full max-w-xs border border-gray-300 rounded-xl p-3 text-gray-800 focus:outline-rose-500 font-medium"
                placeholder="e.g. 1, 3-4"
              />
              <span className="text-xs text-gray-400">Total available: 1 to {pageCount}</span>
            </div>
          </div>

          {isSuccess && (
            <div className="mb-6 p-4 bg-rose-50 rounded-2xl border border-rose-200 text-center flex items-center justify-center space-x-2">
              <CheckCircle2 className="w-5 h-5 text-rose-600 shrink-0" />
              <p className="text-rose-800 font-semibold text-sm">
                Selected pages removed and modified PDF downloaded successfully!
              </p>
            </div>
          )}

          <button
            onClick={removePages}
            disabled={isProcessing}
            className={`w-full py-4 rounded-2xl font-bold text-white text-lg transition-all ${
              isProcessing ? 'bg-rose-300 cursor-not-allowed' : 'bg-rose-600 hover:bg-rose-700 shadow-md'
            }`}
          >
            {isProcessing ? 'Removing pages...' : 'Remove Selected Pages'}
          </button>
        </div>
      )}

      {/* SEO & Rich Content Area */}
      <div className="mt-20 border-t border-gray-200 pt-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-3">How to Delete Pages from a PDF Online</h2>
          <p className="text-gray-600">Eliminate unwanted sheets and blank pages in 3 simple steps.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
            <div className="w-10 h-10 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center font-bold mx-auto mb-4">1</div>
            <h3 className="font-bold text-lg text-gray-800 mb-2">Upload Document</h3>
            <p className="text-sm text-gray-500">Drop the PDF you want to clean up into the upload area above.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
            <div className="w-10 h-10 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center font-bold mx-auto mb-4">2</div>
            <h3 className="font-bold text-lg text-gray-800 mb-2">Select Pages</h3>
            <p className="text-sm text-gray-500">Enter comma-separated page numbers or ranges (e.g. 1, 4-6) to remove.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
            <div className="w-10 h-10 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center font-bold mx-auto mb-4">3</div>
            <h3 className="font-bold text-lg text-gray-800 mb-2">Download PDF</h3>
            <p className="text-sm text-gray-500">The filtered PDF is compiled instantly in memory and downloaded.</p>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Why Remove PDF Pages with PDF Lab?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex items-start space-x-3">
              <ShieldCheck className="w-6 h-6 text-green-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-gray-800 text-base">Complete Privacy</h4>
                <p className="text-sm text-gray-500 mt-1">
                  Files are processed entirely in browser memory. Nothing is uploaded to remote servers.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Zap className="w-6 h-6 text-yellow-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-gray-800 text-base">Instant Deletion</h4>
                <p className="text-sm text-gray-500 mt-1">
                  No queue times or upload buffering. Operations finish in milliseconds.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Sparkles className="w-6 h-6 text-blue-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-gray-800 text-base">Lossless Quality</h4>
                <p className="text-sm text-gray-500 mt-1">
                  The remaining pages keep their exact typography, sharpness, and metadata.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Smartphone className="w-6 h-6 text-purple-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-gray-800 text-base">Works Everywhere</h4>
                <p className="text-sm text-gray-500 mt-1">
                  Accessible on iOS, Android, Windows, and Mac without installing software.
                </p>
              </div>
            </div>
          </div>
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

        {/* Related Tools */}
        <div className="border-t border-gray-200 pt-10 text-center">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Related PDF Tools</h3>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/split-pdf" className="px-4 py-2 bg-white rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:text-rose-600 hover:border-rose-300 transition-colors">
              Split PDF
            </Link>
            <Link href="/merge-pdf" className="px-4 py-2 bg-white rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:text-rose-600 hover:border-rose-300 transition-colors">
              Merge PDF
            </Link>
            <Link href="/rotate-pdf" className="px-4 py-2 bg-white rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:text-rose-600 hover:border-rose-300 transition-colors">
              Rotate PDF
            </Link>
            <Link href="/compress-pdf" className="px-4 py-2 bg-white rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:text-rose-600 hover:border-rose-300 transition-colors">
              Compress PDF
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}