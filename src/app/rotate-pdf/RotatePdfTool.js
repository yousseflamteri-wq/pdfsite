'use client';

import { useState } from 'react';
import { PDFDocument, degrees } from 'pdf-lib';
import {
  RotateCw,
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

export default function RotatePdfTool({ faqs }) {
  const [file, setFile] = useState(null);
  const [rotationAngle, setRotationAngle] = useState(90);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const toolInfo = tools.find((t) => t.id === 'rotate-pdf');

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

  const rotatePdf = async () => {
    if (!file) return;
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

      const pages = pdfDoc.getPages();

      pages.forEach((page) => {
        const currentRotation = page.getRotation().angle;
        page.setRotation(degrees((currentRotation + rotationAngle) % 360));
      });

      const rotatedPdfBytes = await pdfDoc.save();
      const blob = new Blob([rotatedPdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = `rotated-${file.name}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setIsSuccess(true);
    } catch (err) {
      console.error(err);
      setErrorMessage(err.message || 'Error rotating PDF. Please ensure the file is valid.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6">
      {/* Rich H1 for SEO */}
      <div className="text-center mb-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
          Rotate PDF Online – Free & Permanent Rotation
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {toolInfo?.description || 'Rotate your PDF pages 90, 180, or 270 degrees clockwise permanently.'}
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
        <Dropzone onDrop={handleDrop} multiple={false} text="Drag & drop a PDF file to rotate" />
      ) : (
        <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-200">
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
            <div className="flex items-center space-x-3 overflow-hidden">
              <FileText className="w-8 h-8 text-indigo-500 shrink-0" />
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

          <div className="mb-8">
            <label className="block text-sm font-bold text-gray-700 mb-3">Select Rotation Angle:</label>
            <div className="grid grid-cols-3 gap-4">
              {[90, 180, 270].map((angle) => (
                <button
                  key={angle}
                  type="button"
                  onClick={() => {
                    setRotationAngle(angle);
                    setIsSuccess(false);
                  }}
                  className={`py-3 px-4 rounded-xl border font-bold flex items-center justify-center space-x-2 transition-all ${
                    rotationAngle === angle
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-700 ring-2 ring-indigo-200'
                      : 'border-gray-200 hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <RotateCw className="w-4 h-4" />
                  <span>+{angle}°</span>
                </button>
              ))}
            </div>
          </div>

          {isSuccess && (
            <div className="mb-6 p-4 bg-indigo-50 rounded-2xl border border-indigo-200 text-center flex items-center justify-center space-x-2">
              <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0" />
              <p className="text-indigo-800 font-semibold text-sm">
                Document rotated (+{rotationAngle}°) and downloaded successfully!
              </p>
            </div>
          )}

          <button
            onClick={rotatePdf}
            disabled={isProcessing}
            className={`w-full py-4 rounded-2xl font-bold text-white text-lg transition-all ${
              isProcessing ? 'bg-indigo-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 shadow-md'
            }`}
          >
            {isProcessing ? 'Rotating PDF Pages...' : `Rotate PDF (+${rotationAngle}°)`}
          </button>
        </div>
      )}

      {/* SEO & Rich Content Area */}
      <div className="mt-20 border-t border-gray-200 pt-16">
        {/* Step-by-Step Guide */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-3">How to Permanently Rotate a PDF Online</h2>
          <p className="text-gray-600">Fix sideways scans and orient documents correctly in 3 intuitive steps.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
            <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold mx-auto mb-4">1</div>
            <h3 className="font-bold text-lg text-gray-800 mb-2">Upload Document</h3>
            <p className="text-sm text-gray-500">Drag & drop your sideways or inverted PDF into the drop zone.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
            <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold mx-auto mb-4">2</div>
            <h3 className="font-bold text-lg text-gray-800 mb-2">Select Angle</h3>
            <p className="text-sm text-gray-500">Choose between +90°, +180°, or +270° clockwise rotation.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
            <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold mx-auto mb-4">3</div>
            <h3 className="font-bold text-lg text-gray-800 mb-2">Download Rotated File</h3>
            <p className="text-sm text-gray-500">The orientation is permanently saved and your file downloads instantly.</p>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Why Rotate PDFs with PDF Lab?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex items-start space-x-3">
              <ShieldCheck className="w-6 h-6 text-green-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-gray-800 text-base">Permanent File Orientation</h4>
                <p className="text-sm text-gray-500 mt-1">
                  Unlike temporary browser rotation buttons, our tool saves the rotation permanently into the document format.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Sparkles className="w-6 h-6 text-blue-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-gray-800 text-base">Lossless Vector Preservation</h4>
                <p className="text-sm text-gray-500 mt-1">
                  Only the page rotation angle headers are rewritten. Fonts, vector paths, and pictures lose zero quality.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Zap className="w-6 h-6 text-yellow-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-gray-800 text-base">100% Client-Side Speed</h4>
                <p className="text-sm text-gray-500 mt-1">
                  Processes immediately inside your browser memory with zero waiting times and zero file uploads.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Smartphone className="w-6 h-6 text-purple-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-gray-800 text-base">Universal Compatibility</h4>
                <p className="text-sm text-gray-500 mt-1">
                  Operate directly from iOS, Android, Windows, macOS, or ChromeOS with complete privacy.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Common Uses Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">When Do You Need to Rotate PDF Documents?</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
            <li className="p-4 bg-gray-50 rounded-xl border border-gray-100">
              <strong>Sideways Scanned Documents:</strong> Correct orientation when office scanners accidentally feed pages upside-down.
            </li>
            <li className="p-4 bg-gray-50 rounded-xl border border-gray-100">
              <strong>Landscape Presentations:</strong> Orient spreadsheets, charts, and slide decks correctly for portrait reading.
            </li>
            <li className="p-4 bg-gray-50 rounded-xl border border-gray-100">
              <strong>Mobile Camera Snapshots:</strong> Fix camera angle metadata when smartphone scans save in horizontal orientation.
            </li>
            <li className="p-4 bg-gray-50 rounded-xl border border-gray-100">
              <strong>Architectural & Engineering Drawings:</strong> Align wide blueprints and technical diagrams for uniform printing.
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
            <Link href="/split-pdf" className="px-4 py-2 bg-white rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:text-indigo-600 hover:border-indigo-300 transition-colors">
              Split PDF
            </Link>
            <Link href="/merge-pdf" className="px-4 py-2 bg-white rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:text-indigo-600 hover:border-indigo-300 transition-colors">
              Merge PDF
            </Link>
            <Link href="/compress-pdf" className="px-4 py-2 bg-white rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:text-indigo-600 hover:border-indigo-300 transition-colors">
              Compress PDF
            </Link>
            <Link href="/protect-pdf" className="px-4 py-2 bg-white rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:text-indigo-600 hover:border-indigo-300 transition-colors">
              Protect PDF
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}