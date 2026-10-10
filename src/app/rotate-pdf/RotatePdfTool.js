'use client';

import { useState } from 'react';
import { PDFDocument, degrees } from 'pdf-lib';
import {
  RotateCw,
  FileText,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';
import Dropzone from '../../components/Dropzone';
import { tools } from '../../lib/toolsConfig';

export default function RotatePdfTool() {
  const [file, setFile] = useState(null);
  const [rotationAngle, setRotationAngle] = useState(90);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const toolInfo = tools?.find((t) => t.id === 'rotate-pdf');

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
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
      <div className="text-center mb-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
          Rotate PDF Pages Online – Free & Permanent
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {toolInfo?.description || 'Permanently rotate PDF pages clockwise or flip upside-down scans in seconds.'}
        </p>
      </div>

      {errorMessage && (
        <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 flex items-center space-x-3">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span className="text-sm font-medium">{errorMessage}</span>
        </div>
      )}

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
            type="button"
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
    </div>
  );
}