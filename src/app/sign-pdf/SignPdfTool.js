'use client';

import { useState, useRef, useEffect } from 'react';
import { PDFDocument } from 'pdf-lib';
import {
  PenTool,
  Trash2,
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

export default function SignPdfTool({ faqs }) {
  const [file, setFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const canvasRef = useRef(null);

  const toolInfo = tools.find((t) => t.id === 'sign-pdf');

  const formatSize = (bytes) => {
    if (!bytes || bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  useEffect(() => {
    if (file && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      ctx.lineWidth = 2.5;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.strokeStyle = '#1e293b';
    }
  }, [file]);

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
    setErrorMessage('');
    setIsSuccess(false);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
    setHasSignature(true);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasSignature(false);
    setIsSuccess(false);
  };

  const handleDrop = (acceptedFiles) => {
    setErrorMessage('');
    setIsSuccess(false);
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  };

  const applySignature = async () => {
    if (!file) return;
    if (!hasSignature) {
      setErrorMessage('Please draw your signature on the pad before applying.');
      return;
    }

    setErrorMessage('');
    setIsSuccess(false);
    setIsProcessing(true);

    try {
      const canvas = canvasRef.current;
      const signatureDataUrl = canvas.toDataURL('image/png');
      const signatureBytes = await fetch(signatureDataUrl).then((res) => res.arrayBuffer());

      const arrayBuffer = await file.arrayBuffer();
      let pdfDoc;
      try {
        pdfDoc = await PDFDocument.load(arrayBuffer);
      } catch (loadErr) {
        throw new Error('Unable to read this PDF file. It might be password-protected or corrupted.');
      }

      const signatureImage = await pdfDoc.embedPng(signatureBytes);

      const pages = pdfDoc.getPages();
      const lastPage = pages[pages.length - 1];
      const { width } = lastPage.getSize();

      const sigWidth = 150;
      const sigHeight = (signatureImage.height / signatureImage.width) * sigWidth;

      lastPage.drawImage(signatureImage, {
        x: width - sigWidth - 50,
        y: 60,
        width: sigWidth,
        height: sigHeight,
      });

      const signedPdfBytes = await pdfDoc.save();
      const blob = new Blob([signedPdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = `signed-${file.name}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setIsSuccess(true);
    } catch (err) {
      console.error(err);
      setErrorMessage(err.message || 'Error applying signature to PDF.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6">
      {/* Rich H1 for SEO */}
      <div className="text-center mb-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
          Sign PDF Online – Free & Private Electronic Signature
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {toolInfo?.description || 'Draw your signature and embed it into your document.'}
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
        <Dropzone onDrop={handleDrop} multiple={false} text="Drag & drop a PDF file to sign" />
      ) : (
        <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-200">
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
            <div className="flex items-center space-x-3 overflow-hidden">
              <PenTool className="w-8 h-8 text-teal-500 shrink-0" />
              <div>
                <h2 className="text-xl font-bold text-gray-800 truncate max-w-xs sm:max-w-md">{file.name}</h2>
                <p className="text-sm text-gray-500">{formatSize(file.size)}</p>
              </div>
            </div>
            <button
              onClick={() => {
                setFile(null);
                setHasSignature(false);
                setIsSuccess(false);
                setErrorMessage('');
              }}
              className="text-red-500 hover:text-red-700 font-semibold bg-red-50 px-4 py-2 rounded-xl text-sm transition-colors"
            >
              Change file
            </button>
          </div>

          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-bold text-gray-700">Draw Your Signature:</label>
              <button
                type="button"
                onClick={clearCanvas}
                className="text-xs flex items-center space-x-1 text-gray-500 hover:text-red-500 bg-gray-100 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5 mr-1" />
                Clear Pad
              </button>
            </div>
            <div className="border-2 border-dashed border-gray-300 rounded-2xl p-2 bg-gray-50 flex justify-center">
              <canvas
                ref={canvasRef}
                width={500}
                height={180}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
                className="bg-white rounded-xl cursor-crosshair shadow-inner w-full max-w-lg touch-none"
              />
            </div>
            <p className="text-xs text-gray-400 mt-2 text-center">
              Draw your signature using your mouse or finger. It will be placed on the bottom of the last page.
            </p>
          </div>

          {isSuccess && (
            <div className="mb-6 p-4 bg-teal-50 rounded-2xl border border-teal-200 text-center flex items-center justify-center space-x-2">
              <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0" />
              <p className="text-teal-800 font-semibold text-sm">
                Signature embedded and document downloaded successfully!
              </p>
            </div>
          )}

          <button
            onClick={applySignature}
            disabled={isProcessing || !hasSignature}
            className={`w-full py-4 rounded-2xl font-bold text-white text-lg transition-all ${
              isProcessing || !hasSignature
                ? 'bg-teal-300 cursor-not-allowed'
                : 'bg-teal-600 hover:bg-teal-700 shadow-md'
            }`}
          >
            {isProcessing ? 'Embedding Signature...' : 'Download Signed PDF'}
          </button>
        </div>
      )}

      {/* SEO & Rich Content Area */}
      <div className="mt-20 border-t border-gray-200 pt-16">
        {/* Step-by-Step Guide */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-3">How to Electronically Sign a PDF Online</h2>
          <p className="text-gray-600">Complete, sign, and endorse your documents in 3 straightforward steps.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
            <div className="w-10 h-10 bg-teal-100 text-teal-700 rounded-full flex items-center justify-center font-bold mx-auto mb-4">1</div>
            <h3 className="font-bold text-lg text-gray-800 mb-2">Upload Document</h3>
            <p className="text-sm text-gray-500">Select or drop your PDF contract or form into the secure signer area.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
            <div className="w-10 h-10 bg-teal-100 text-teal-700 rounded-full flex items-center justify-center font-bold mx-auto mb-4">2</div>
            <h3 className="font-bold text-lg text-gray-800 mb-2">Draw Signature</h3>
            <p className="text-sm text-gray-500">Sign directly onto the signature pad using your finger, stylus, or mouse.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
            <div className="w-10 h-10 bg-teal-100 text-teal-700 rounded-full flex items-center justify-center font-bold mx-auto mb-4">3</div>
            <h3 className="font-bold text-lg text-gray-800 mb-2">Download Signed File</h3>
            <p className="text-sm text-gray-500">Your signature is fused onto the document and downloaded immediately.</p>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Why Sign PDFs with PDF Lab?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex items-start space-x-3">
              <ShieldCheck className="w-6 h-6 text-green-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-gray-800 text-base">Uncompromised Privacy</h4>
                <p className="text-sm text-gray-500 mt-1">
                  Your legal documents and digital signatures never leave your web browser. Zero server transmission.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Zap className="w-6 h-6 text-yellow-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-gray-800 text-base">Immediate Execution</h4>
                <p className="text-sm text-gray-500 mt-1">
                  Sign urgent documents without creating accounts, confirming emails, or waiting for third-party relays.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Sparkles className="w-6 h-6 text-blue-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-gray-800 text-base">Free Without Limitations</h4>
                <p className="text-sm text-gray-500 mt-1">
                  No monthly document quotas, credit card prompts, or intrusive trial locks.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Smartphone className="w-6 h-6 text-purple-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-gray-800 text-base">Intuitive Touch Signing</h4>
                <p className="text-sm text-gray-500 mt-1">
                  Sign naturally with your fingertip or stylus directly on iPhone, iPad, and Android screens.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Common Uses Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Common Documents You Can Sign Online</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
            <li className="p-4 bg-gray-50 rounded-xl border border-gray-100">
              <strong>Freelance & Client Contracts:</strong> Endorse service agreements, statements of work, and project quotes.
            </li>
            <li className="p-4 bg-gray-50 rounded-xl border border-gray-100">
              <strong>Non-Disclosure Agreements (NDAs):</strong> Quickly sign confidentiality terms before business meetings.
            </li>
            <li className="p-4 bg-gray-50 rounded-xl border border-gray-100">
              <strong>Employment Paperwork:</strong> Sign job offer letters, policy acknowledgments, and onboarding forms.
            </li>
            <li className="p-4 bg-gray-50 rounded-xl border border-gray-100">
              <strong>Rental & Lease Contracts:</strong> Sign residential or equipment rental documents securely from anywhere.
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
            <Link href="/protect-pdf" className="px-4 py-2 bg-white rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:text-teal-600 hover:border-teal-300 transition-colors">
              Protect PDF
            </Link>
            <Link href="/watermark-pdf" className="px-4 py-2 bg-white rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:text-teal-600 hover:border-teal-300 transition-colors">
              Add Watermark
            </Link>
            <Link href="/merge-pdf" className="px-4 py-2 bg-white rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:text-teal-600 hover:border-teal-300 transition-colors">
              Merge PDF
            </Link>
            <Link href="/compress-pdf" className="px-4 py-2 bg-white rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:text-teal-600 hover:border-teal-300 transition-colors">
              Compress PDF
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}