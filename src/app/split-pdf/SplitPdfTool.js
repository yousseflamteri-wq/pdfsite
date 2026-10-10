'use client';

import { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import {
  SplitSquareVertical,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';
import Dropzone from '../../components/Dropzone';
import { tools } from '../../lib/toolsConfig';

export default function SplitPdfTool() {
  const [file, setFile] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [isSplitting, setIsSplitting] = useState(false);
  const [splitRange, setSplitRange] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const toolInfo = tools?.find((t) => t.id === 'split-pdf');

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
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
      <div className="text-center mb-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
          Split PDF Online – Extract Pages Privately
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {toolInfo?.description || 'Separate pages or extract a specific page range into a new PDF document in seconds.'}
        </p>
      </div>

      {errorMessage && (
        <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 flex items-center space-x-3">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span className="text-sm font-medium">{errorMessage}</span>
        </div>
      )}

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
              type="button"
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
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <input
                type="text"
                value={splitRange}
                onChange={(e) => {
                  setSplitRange(e.target.value);
                  setIsSuccess(false);
                }}
                className="w-full sm:max-w-xs border border-gray-300 rounded-xl p-3 text-gray-800 focus:outline-orange-500 font-medium"
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
            type="button"
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
    </div>
  );
}