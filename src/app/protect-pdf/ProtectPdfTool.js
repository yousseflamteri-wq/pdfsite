'use client';

import { useState } from 'react';
import {
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  Zap,
  Sparkles,
  Smartphone,
  AlertCircle,
  CheckCircle2,
  KeyRound,
} from 'lucide-react';
import Link from 'next/link';
import { encryptPDF } from '@pdfsmaller/pdf-encrypt-lite';
import Dropzone from '../../components/Dropzone';
import { tools } from '../../lib/toolsConfig';

export default function ProtectPdfTool({ faqs }) {
  const [file, setFile] = useState(null);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusText, setStatusText] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const toolInfo = tools.find((t) => t.id === 'protect-pdf');

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

  const protectPdf = async () => {
    if (!file) return;
    if (!password || password.trim().length === 0) {
      setErrorMessage('Please enter a password to protect your PDF.');
      return;
    }

    setErrorMessage('');
    setIsSuccess(false);
    setIsProcessing(true);
    setStatusText('Encrypting PDF with password...');

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfBytes = new Uint8Array(arrayBuffer);

      // تشفير قياسي 128-bit للـ PDF
      const encryptedBytes = await encryptPDF(pdfBytes, password, {
        ownerPassword: password + '_owner',
        allowPrinting: true,
        allowModifying: false,
        allowCopying: false,
      });

      const blob = new Blob([encryptedBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `protected-${file.name}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setIsSuccess(true);
    } catch (err) {
      console.error(err);
      setErrorMessage('Error encrypting PDF. Please try a different password or check if the file is already encrypted.');
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
          Protect PDF with Password Online – Free & Encrypted
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {toolInfo?.description || 'Encrypt your PDF with a password to prevent unauthorized access.'}
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
        <Dropzone onDrop={handleDrop} multiple={false} text="Drag & drop a PDF file to encrypt" />
      ) : (
        <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-200">
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
            <div className="flex items-center space-x-3 overflow-hidden">
              <Lock className="w-8 h-8 text-red-500 shrink-0" />
              <div>
                <h2 className="text-xl font-bold text-gray-800 truncate max-w-xs sm:max-w-md">{file.name}</h2>
                <p className="text-sm text-gray-500">{formatSize(file.size)}</p>
              </div>
            </div>
            <button
              onClick={() => {
                setFile(null);
                setPassword('');
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
              Set Security Password:
            </label>
            <div className="relative max-w-md">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setIsSuccess(false);
                }}
                placeholder="Enter password..."
                className="w-full border border-gray-300 rounded-xl p-3 pr-12 text-gray-800 focus:outline-red-500 font-medium"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Make sure to remember this password. Anyone opening this file will be prompted to enter it.
            </p>
          </div>

          {isSuccess && (
            <div className="mb-6 p-4 bg-green-50 rounded-2xl border border-green-200 text-center flex items-center justify-center space-x-2">
              <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
              <p className="text-green-800 font-semibold text-sm">
                Document encrypted successfully and downloaded!
              </p>
            </div>
          )}

          <button
            onClick={protectPdf}
            disabled={isProcessing || !password}
            className={`w-full py-4 rounded-2xl font-bold text-white text-lg transition-all ${
              isProcessing || !password
                ? 'bg-red-300 cursor-not-allowed'
                : 'bg-red-600 hover:bg-red-700 shadow-md'
            }`}
          >
            {isProcessing ? statusText || 'Encrypting...' : 'Protect PDF with Password'}
          </button>
        </div>
      )}

      {/* SEO & Rich Content Area */}
      <div className="mt-20 border-t border-gray-200 pt-16">
        {/* Step-by-Step Guide */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-3">How to Password Protect a PDF File</h2>
          <p className="text-gray-600">Lock and secure your confidential documents in 3 simple steps.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
            <div className="w-10 h-10 bg-red-100 text-red-600 rounded-full flex items-center justify-center font-bold mx-auto mb-4">1</div>
            <h3 className="font-bold text-lg text-gray-800 mb-2">Upload PDF</h3>
            <p className="text-sm text-gray-500">Select or drag & drop the PDF you wish to encrypt into the tool above.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
            <div className="w-10 h-10 bg-red-100 text-red-600 rounded-full flex items-center justify-center font-bold mx-auto mb-4">2</div>
            <h3 className="font-bold text-lg text-gray-800 mb-2">Set Password</h3>
            <p className="text-sm text-gray-500">Choose a secure password and review restriction settings.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
            <div className="w-10 h-10 bg-red-100 text-red-600 rounded-full flex items-center justify-center font-bold mx-auto mb-4">3</div>
            <h3 className="font-bold text-lg text-gray-800 mb-2">Download Protected PDF</h3>
            <p className="text-sm text-gray-500">The file is encrypted in browser memory and saved to your device immediately.</p>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Why Use Our In-Browser PDF Protector?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex items-start space-x-3">
              <ShieldCheck className="w-6 h-6 text-green-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-gray-800 text-base">Zero Server Uploads</h4>
                <p className="text-sm text-gray-500 mt-1">
                  Unlike traditional cloud encryption, your private documents and passwords never travel across the internet.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <KeyRound className="w-6 h-6 text-red-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-gray-800 text-base">Standard PDF Encryption</h4>
                <p className="text-sm text-gray-500 mt-1">
                  Compatible with Adobe Acrobat Reader, Google Chrome, Safari, and all standard PDF readers worldwide.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Zap className="w-6 h-6 text-yellow-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-gray-800 text-base">Instant In-Memory Speed</h4>
                <p className="text-sm text-gray-500 mt-1">
                  Encrypt large documents in fractions of a second without waiting for network upload queues.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Smartphone className="w-6 h-6 text-purple-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-gray-800 text-base">Universal Device Support</h4>
                <p className="text-sm text-gray-500 mt-1">
                  Lock files securely from your desktop, iPhone, Android, or tablet without installing third-party software.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Common Uses Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">When to Password Protect Your PDFs</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
            <li className="p-4 bg-gray-50 rounded-xl border border-gray-100">
              <strong>Financial & Tax Records:</strong> Protect bank statements, pay stubs, and tax returns before sending them to accountants.
            </li>
            <li className="p-4 bg-gray-50 rounded-xl border border-gray-100">
              <strong>Confidential Business Agreements:</strong> Encrypt NDAs, contracts, and proposals before sharing via email.
            </li>
            <li className="p-4 bg-gray-50 rounded-xl border border-gray-100">
              <strong>Personal Identity Documents:</strong> Safely archive passport scans, ID cards, and medical paperwork.
            </li>
            <li className="p-4 bg-gray-50 rounded-xl border border-gray-100">
              <strong>Client Deliverables:</strong> Guard proprietary client reports, audits, and source documents against unauthorized viewing.
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
            <Link href="/sign-pdf" className="px-4 py-2 bg-white rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:text-red-600 hover:border-red-300 transition-colors">
              Sign PDF
            </Link>
            <Link href="/watermark-pdf" className="px-4 py-2 bg-white rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:text-red-600 hover:border-red-300 transition-colors">
              Add Watermark
            </Link>
            <Link href="/compress-pdf" className="px-4 py-2 bg-white rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:text-red-600 hover:border-red-300 transition-colors">
              Compress PDF
            </Link>
            <Link href="/merge-pdf" className="px-4 py-2 bg-white rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:text-red-600 hover:border-red-300 transition-colors">
              Merge PDF
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}