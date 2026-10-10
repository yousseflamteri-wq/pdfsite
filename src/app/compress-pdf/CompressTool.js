'use client';

import { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { AlertCircle, FileArchive, CheckCircle2 } from 'lucide-react';
import Dropzone from '../../components/Dropzone';
import { tools } from '../../lib/toolsConfig';

export default function CompressTool() {
  const [file, setFile] = useState(null);
  const [originalSize, setOriginalSize] = useState(0);
  const [compressedSize, setCompressedSize] = useState(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const [qualityLevel, setQualityLevel] = useState(0.55);
  const [progressText, setProgressText] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const toolInfo = tools?.find((t) => t.id === 'compress-pdf');

  const formatSize = (bytes) => {
    if (!bytes || bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleDrop = (acceptedFiles) => {
    setErrorMessage('');
    if (acceptedFiles.length > 0) {
      const selectedFile = acceptedFiles[0];
      setFile(selectedFile);
      setOriginalSize(selectedFile.size);
      setCompressedSize(null);
      setProgressText('');
    }
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

  const compressPdf = async () => {
    if (!file) return;
    setErrorMessage('');
    setIsCompressing(true);
    setProgressText('Initializing PDF engine...');

    try {
      const pdfjsLib = await loadPdfJs();
      const arrayBuffer = await file.arrayBuffer();
      const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
      const pdf = await loadingTask.promise;
      const totalPages = pdf.numPages;

      const outputPdf = await PDFDocument.create();

      for (let i = 1; i <= totalPages; i++) {
        setProgressText(`Compressing page ${i} of ${totalPages}...`);
        const page = await pdf.getPage(i);

        const viewport = page.getViewport({ scale: 1.2 });
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        await page.render({
          canvasContext: context,
          viewport: viewport,
        }).promise;

        const imgDataUrl = canvas.toDataURL('image/jpeg', qualityLevel);
        const imageBytes = await fetch(imgDataUrl).then((res) => res.arrayBuffer());

        const embeddedImage = await outputPdf.embedJpg(imageBytes);
        const newPage = outputPdf.addPage([viewport.width, viewport.height]);
        newPage.drawImage(embeddedImage, {
          x: 0,
          y: 0,
          width: viewport.width,
          height: viewport.height,
        });
      }

      setProgressText('Finalizing compressed PDF...');
      const compressedPdfBytes = await outputPdf.save();
      setCompressedSize(compressedPdfBytes.byteLength);

      const blob = new Blob([compressedPdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `compressed-${file.name}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      setErrorMessage('An error occurred while compressing this PDF file.');
    } finally {
      setIsCompressing(false);
      setProgressText('');
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
          Compress PDF Online – Reduce File Size Privately
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {toolInfo?.description || 'Reduce file size and optimize PDF data structures without degrading visual quality.'}
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
        <Dropzone onDrop={handleDrop} multiple={false} text="Drag & drop a PDF file here to compress" />
      ) : (
        <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-200">
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
            <div className="flex items-center space-x-3 overflow-hidden">
              <FileArchive className="w-8 h-8 text-green-500 shrink-0" />
              <div>
                <h2 className="text-xl font-bold text-gray-800 truncate max-w-xs sm:max-w-md">{file.name}</h2>
                <p className="text-sm text-gray-500">Original Size: {formatSize(originalSize)}</p>
              </div>
            </div>
            <button
              onClick={() => {
                setFile(null);
                setCompressedSize(null);
                setErrorMessage('');
              }}
              className="text-red-500 hover:text-red-700 font-semibold bg-red-50 px-4 py-2 rounded-xl text-sm transition-colors"
            >
              Change file
            </button>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Select Compression Level:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { label: 'Low Compression', desc: 'High Quality', val: 0.75 },
                { label: 'Recommended', desc: 'Optimal Quality & Size', val: 0.55 },
                { label: 'Extreme', desc: 'Smallest File Size', val: 0.35 },
              ].map((opt) => (
                <button
                  key={opt.val}
                  type="button"
                  onClick={() => setQualityLevel(opt.val)}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    qualityLevel === opt.val
                      ? 'border-green-600 bg-green-50 text-green-900 ring-2 ring-green-200'
                      : 'border-gray-200 hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <p className="font-bold text-sm">{opt.label}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{opt.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {compressedSize && (
            <div className="mb-6 p-4 bg-green-50 rounded-2xl border border-green-200 text-center flex items-center justify-center space-x-2">
              <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
              <p className="text-green-800 font-semibold text-sm">
                Success! Reduced from {formatSize(originalSize)} to {formatSize(compressedSize)} (
                {Math.round(((originalSize - compressedSize) / originalSize) * 100)}% saved)
              </p>
            </div>
          )}

          <button
            onClick={compressPdf}
            disabled={isCompressing}
            className={`w-full py-4 rounded-2xl font-bold text-white text-lg transition-all ${
              isCompressing ? 'bg-green-300 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 shadow-md'
            }`}
          >
            {isCompressing ? progressText || 'Processing...' : 'Compress PDF'}
          </button>
        </div>
      )}
    </div>
  );
}