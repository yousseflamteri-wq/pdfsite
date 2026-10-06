'use client';

import { useState, useRef } from 'react';
import { PDFDocument } from 'pdf-lib';
import {
  ArrowUp,
  ArrowDown,
  GripVertical,
  AlertCircle,
  ShieldCheck,
  Zap,
  Sparkles,
  Smartphone,
} from 'lucide-react';
import Link from 'next/link';
import Dropzone from '../../components/Dropzone';
import { generateSafeId } from '../../lib/generateId';

export default function MergeTool({ faqs }) {
  const [fileList, setFileList] = useState([]);
  const [isMerging, setIsMerging] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

  const formatSize = (bytes) => {
    if (!bytes || bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleDrop = (acceptedFiles) => {
    setErrorMessage('');
    const newItems = acceptedFiles.map((file) => ({
      id: generateSafeId(),
      file,
    }));
    setFileList((prev) => [...prev, ...newItems]);
  };

  const removeFile = (idToRemove) => {
    setFileList((prev) => prev.filter((item) => item.id !== idToRemove));
  };

  const moveUp = (index) => {
    if (index === 0) return;
    setFileList((prev) => {
      const updated = [...prev];
      const item = updated.splice(index, 1)[0];
      updated.splice(index - 1, 0, item);
      return updated;
    });
  };

  const moveDown = (index) => {
    if (index === fileList.length - 1) return;
    setFileList((prev) => {
      const updated = [...prev];
      const item = updated.splice(index, 1)[0];
      updated.splice(index + 1, 0, item);
      return updated;
    });
  };

  const handleDragStart = (e, index) => {
    dragItem.current = index;
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEnter = (e, index) => {
    dragOverItem.current = index;
  };

  const handleDragEnd = () => {
    if (dragItem.current !== null && dragOverItem.current !== null) {
      setFileList((prev) => {
        const updated = [...prev];
        const draggedFile = updated.splice(dragItem.current, 1)[0];
        updated.splice(dragOverItem.current, 0, draggedFile);
        return updated;
      });
      dragItem.current = null;
      dragOverItem.current = null;
    }
  };

  const mergePdfs = async () => {
    if (fileList.length < 2) {
      setErrorMessage('Please add at least 2 PDF files to merge.');
      return;
    }

    setErrorMessage('');
    setIsMerging(true);

    try {
      const mergedPdf = await PDFDocument.create();

      for (const item of fileList) {
        const arrayBuffer = await item.file.arrayBuffer();
        let pdf;
        try {
          pdf = await PDFDocument.load(arrayBuffer);
        } catch (loadErr) {
          throw new Error(
            `Unable to process "${item.file.name}". It may be password-protected or corrupted.`
          );
        }
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }

      const mergedPdfBytes = await mergedPdf.save();
      const blob = new Blob([mergedPdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = 'merged-document.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error merging PDFs:', error);
      setErrorMessage(error.message || 'An error occurred while merging the PDF files.');
    } finally {
      setIsMerging(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6">
      {/* Rich H1 for SEO */}
      <div className="text-center mb-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
          Merge PDF Files Online – Free & Private
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Combine multiple PDF files into one clean document in seconds. 100% free, no signup, no watermark, and your files never leave your device.
        </p>
      </div>

      {/* Error notification banner */}
      {errorMessage && (
        <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 flex items-center space-x-3">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span className="text-sm font-medium">{errorMessage}</span>
        </div>
      )}

      {/* Tool Work Area */}
      {fileList.length === 0 ? (
        <Dropzone onDrop={handleDrop} text="Drag & drop PDF files here to merge" />
      ) : (
        <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Files to merge ({fileList.length}):</h2>
            <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full">
              Use arrows or drag to reorder
            </span>
          </div>

          <ul className="space-y-3 mb-6">
            {fileList.map((item, index) => (
              <li
                key={item.id}
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragEnter={(e) => handleDragEnter(e, index)}
                onDragEnd={handleDragEnd}
                onDragOver={(e) => e.preventDefault()}
                className="flex justify-between items-center p-3 sm:p-4 bg-gray-50 hover:bg-gray-100 rounded-2xl border border-gray-200 transition-all select-none"
              >
                <div className="flex items-center space-x-3 overflow-hidden">
                  <div className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600 shrink-0">
                    <GripVertical className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-gray-400 w-5">#{index + 1}</span>
                  <div className="overflow-hidden">
                    <p className="font-medium text-gray-800 truncate max-w-xs sm:max-w-sm">{item.file.name}</p>
                    <p className="text-xs text-gray-400">{formatSize(item.file.size)}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2 shrink-0">
                  <button
                    onClick={() => moveUp(index)}
                    disabled={index === 0}
                    className="p-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed text-gray-700 transition-colors"
                    title="Move Up"
                  >
                    <ArrowUp className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => moveDown(index)}
                    disabled={index === fileList.length - 1}
                    className="p-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed text-gray-700 transition-colors"
                    title="Move Down"
                  >
                    <ArrowDown className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => removeFile(item.id)}
                    className="text-red-500 hover:text-red-700 text-sm font-semibold bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-xl transition-colors ml-2"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Dropzone onDrop={handleDrop} text="Add more files" />
            </div>
            <button
              onClick={mergePdfs}
              disabled={isMerging}
              className={`flex-1 text-white font-bold py-4 px-8 rounded-2xl transition-colors text-xl shadow-md flex items-center justify-center 
                ${isMerging ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
            >
              {isMerging ? 'Merging Documents...' : 'Merge PDFs'}
            </button>
          </div>
        </div>
      )}

      {/* Extended SEO Content */}
      <div className="mt-20 border-t border-gray-200 pt-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-3">How to Merge PDF Files Online</h2>
          <p className="text-gray-600">Quickly organize and join your documents in 3 intuitive steps.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
            <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold mx-auto mb-4">1</div>
            <h3 className="font-bold text-lg text-gray-800 mb-2">Upload PDFs</h3>
            <p className="text-sm text-gray-500">Select or drop two or more PDF files from your desktop or phone.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
            <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold mx-auto mb-4">2</div>
            <h3 className="font-bold text-lg text-gray-800 mb-2">Reorder Document Pages</h3>
            <p className="text-sm text-gray-500">Use arrow buttons or drag entries to adjust the document order.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
            <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold mx-auto mb-4">3</div>
            <h3 className="font-bold text-lg text-gray-800 mb-2">Download Unified PDF</h3>
            <p className="text-sm text-gray-500">Click &quot;Merge PDFs&quot; to export your merged document immediately.</p>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Why Merge PDFs with PDF Lab?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex items-start space-x-3">
              <ShieldCheck className="w-6 h-6 text-green-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-gray-800 text-base">Guaranteed Privacy</h4>
                <p className="text-sm text-gray-500 mt-1">
                  Files are processed completely in local memory. No remote uploads, no storage, no risk of data leaks.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Zap className="w-6 h-6 text-yellow-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-gray-800 text-base">Instant Processing</h4>
                <p className="text-sm text-gray-500 mt-1">
                  Without upload or download waiting times, multi-megabyte documents are joined almost instantly.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Sparkles className="w-6 h-6 text-blue-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-gray-800 text-base">Zero Watermarks</h4>
                <p className="text-sm text-gray-500 mt-1">
                  Keep your work professional. Every combined document is 100% clean and free of watermarks.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Smartphone className="w-6 h-6 text-purple-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-gray-800 text-base">All Devices Supported</h4>
                <p className="text-sm text-gray-500 mt-1">
                  Compatible with Chrome, Safari, Edge, and Brave across Windows, macOS, Android, and iOS.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Common Use Cases for Merging PDFs</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
            <li className="p-4 bg-gray-50 rounded-xl border border-gray-100">
              <strong>Job Applications:</strong> Combine your CV, cover letter, and diplomas into a single submission file.
            </li>
            <li className="p-4 bg-gray-50 rounded-xl border border-gray-100">
              <strong>Invoicing & Accounting:</strong> Consolidate monthly receipts and purchase orders for tax preparation.
            </li>
            <li className="p-4 bg-gray-50 rounded-xl border border-gray-100">
              <strong>Academic Research:</strong> Merge research chapters, appendices, and reference papers together.
            </li>
            <li className="p-4 bg-gray-50 rounded-xl border border-gray-100">
              <strong>Legal Documentation:</strong> Assemble contracts, addendums, and identity documents in strict order.
            </li>
          </ul>
        </div>

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

        <div className="border-t border-gray-200 pt-10 text-center">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Related PDF Tools</h3>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/split-pdf" className="px-4 py-2 bg-white rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:text-blue-600 hover:border-blue-300 transition-colors">
              Split PDF
            </Link>
            <Link href="/compress-pdf" className="px-4 py-2 bg-white rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:text-blue-600 hover:border-blue-300 transition-colors">
              Compress PDF
            </Link>
            <Link href="/rotate-pdf" className="px-4 py-2 bg-white rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:text-blue-600 hover:border-blue-300 transition-colors">
              Rotate PDF
            </Link>
            <Link href="/protect-pdf" className="px-4 py-2 bg-white rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:text-blue-600 hover:border-blue-300 transition-colors">
              Protect PDF
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}