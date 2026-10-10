'use client';

import { useState } from 'react';
import { PDFDocument, rgb, degrees, StandardFonts } from 'pdf-lib';
import {
  Stamp,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';
import Dropzone from '../../components/Dropzone';
import { tools } from '../../lib/toolsConfig';

export default function WatermarkPdfTool() {
  const [file, setFile] = useState(null);
  const [watermarkText, setWatermarkText] = useState('CONFIDENTIAL');
  const [opacity, setOpacity] = useState(0.3);
  const [fontSize, setFontSize] = useState(48);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const toolInfo = tools?.find((t) => t.id === 'watermark-pdf');

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
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
      <div className="text-center mb-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
          Add Watermark to PDF Online – Free & Secure
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {toolInfo?.description || 'Stamp custom text or confidential marks across your PDF pages directly in your browser.'}
        </p>
      </div>

      {errorMessage && (
        <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 flex items-center space-x-3">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span className="text-sm font-medium">{errorMessage}</span>
        </div>
      )}

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
              type="button"
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
            type="button"
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
    </div>
  );
}