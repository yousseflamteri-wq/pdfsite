'use client';

import { useState } from 'react';
import {
  Image as ImageIcon,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';
import Dropzone from '../../components/Dropzone';
import { tools } from '../../lib/toolsConfig';

export default function PdfToJpgTool() {
  const [file, setFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusText, setStatusText] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [completedCount, setCompletedCount] = useState(null);

  const toolInfo = tools?.find((t) => t.id === 'pdf-to-jpg');

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
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
      <div className="text-center mb-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
          Convert PDF to JPG Online – Free & High Quality
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {toolInfo?.description || 'Extract every page of your PDF into high-quality JPG image files directly in your browser.'}
        </p>
      </div>

      {errorMessage && (
        <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 flex items-center space-x-3">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span className="text-sm font-medium">{errorMessage}</span>
        </div>
      )}

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
              type="button"
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
            type="button"
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
    </div>
  );
}