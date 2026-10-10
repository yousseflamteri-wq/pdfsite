'use client';

import { useState, useRef } from 'react';
import { PDFDocument } from 'pdf-lib';
import {
  ArrowUp,
  ArrowDown,
  GripVertical,
  AlertCircle,
} from 'lucide-react';
import Dropzone from '../../components/Dropzone';
import { generateSafeId } from '../../lib/generateId';

export default function MergeTool() {
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
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
      {/* Tool Header */}
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
    </div>
  );
}