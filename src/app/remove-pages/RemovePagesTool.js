'use client';

import { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import {
  Trash2,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';
import Dropzone from '../../components/Dropzone';
import { tools } from '../../lib/toolsConfig';

export default function RemovePagesTool() {
  const [file, setFile] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [pagesInput, setPagesInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const toolInfo = tools?.find((t) => t.id === 'remove-pages');

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
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
      <div className="text-center mb-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
          Delete PDF Pages Online – Free & Private
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {toolInfo?.description || 'Quickly delete unwanted, duplicate, or blank pages from your PDF file in your browser.'}
        </p>
      </div>

      {errorMessage && (
        <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 flex items-center space-x-3">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span className="text-sm font-medium">{errorMessage}</span>
        </div>
      )}

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
              type="button"
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
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <input
                type="text"
                value={pagesInput}
                onChange={(e) => {
                  setPagesInput(e.target.value);
                  setIsSuccess(false);
                }}
                className="w-full sm:max-w-xs border border-gray-300 rounded-xl p-3 text-gray-800 focus:outline-rose-500 font-medium"
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
            type="button"
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
    </div>
  );
}