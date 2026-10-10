'use client';

import { useState, useRef } from 'react';
import { PDFDocument } from 'pdf-lib';
import {
  UploadCloud,
  X,
  ArrowUp,
  ArrowDown,
  AlertCircle,
  FileImage,
} from 'lucide-react';
import Link from 'next/link';
import { tools } from '../../lib/toolsConfig';
import { generateSafeId } from '../../lib/generateId';

export default function JpgToPdfTool() {
  const [images, setImages] = useState([]);
  const [isConverting, setIsConverting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const fileInputRef = useRef(null);

  const toolInfo = tools?.find((t) => t.id === 'jpg-to-pdf');

  const addFiles = (newFiles) => {
    setErrorMessage('');
    const validImages = Array.from(newFiles).filter((file) => {
      const isJpegMime = file.type === 'image/jpeg';
      const hasJpegExt = /\.(jpe?g)$/i.test(file.name);
      return isJpegMime || hasJpegExt;
    });

    if (validImages.length > 0) {
      const newItems = validImages.map((file) => ({
        id: generateSafeId(),
        file,
      }));
      setImages((prev) => [...prev, ...newItems]);
    } else {
      setErrorMessage('Please select valid JPG or JPEG photos. For PNG, WebP, and other formats, please use our Image to PDF tool.');
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      addFiles(e.target.files);
      setTimeout(() => {
        e.target.value = '';
      }, 150);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      addFiles(e.dataTransfer.files);
    }
  };

  const removeImage = (idToRemove) => {
    setImages((prev) => prev.filter((item) => item.id !== idToRemove));
  };

  const moveUp = (index) => {
    if (index === 0) return;
    setImages((prev) => {
      const updated = [...prev];
      const item = updated.splice(index, 1)[0];
      updated.splice(index - 1, 0, item);
      return updated;
    });
  };

  const moveDown = (index) => {
    if (index === images.length - 1) return;
    setImages((prev) => {
      const updated = [...prev];
      const item = updated.splice(index, 1)[0];
      updated.splice(index + 1, 0, item);
      return updated;
    });
  };

  const processImageToBytes = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.naturalWidth || img.width;
          canvas.height = img.naturalHeight || img.height;

          const ctx = canvas.getContext('2d');
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0);

          canvas.toBlob(
            async (blob) => {
              if (!blob) {
                reject(new Error('Canvas export failed'));
                return;
              }
              const buffer = await blob.arrayBuffer();
              resolve({ buffer, width: canvas.width, height: canvas.height });
            },
            'image/jpeg',
            0.92
          );
        };
        img.onerror = () => reject(new Error('Failed to parse image data'));
        img.src = reader.result;
      };

      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsDataURL(file);
    });
  };

  const convertToPdf = async () => {
    if (images.length === 0) return;
    setErrorMessage('');
    setIsConverting(true);

    try {
      const pdfDoc = await PDFDocument.create();

      for (const item of images) {
        const { buffer, width, height } = await processImageToBytes(item.file);
        const embeddedImg = await pdfDoc.embedJpg(buffer);

        const page = pdfDoc.addPage([width, height]);
        page.drawImage(embeddedImg, {
          x: 0,
          y: 0,
          width,
          height,
        });
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = 'converted-jpg.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      setErrorMessage('Error converting JPG images to PDF. Please try different JPEG files.');
    } finally {
      setIsConverting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
      <div className="text-center mb-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
          Convert JPG to PDF Online – High Quality & Free
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {toolInfo?.description || 'Quickly convert JPG and JPEG photos into clean PDF documents directly in your browser. 100% private, free, and no file uploads required.'}
        </p>
      </div>

      {errorMessage && (
        <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 flex items-center space-x-3">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span className="text-sm font-medium">{errorMessage}</span>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept=".jpg,.jpeg,image/jpeg"
        onChange={handleFileChange}
        className="hidden"
      />

      {images.length === 0 ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          className="border-2 border-dashed border-gray-300 hover:border-blue-500 bg-white rounded-3xl p-12 text-center transition-all cursor-pointer shadow-sm active:bg-blue-50/40"
        >
          <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600">
            <UploadCloud className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Drag & drop JPG or JPEG photos here</h3>
          <p className="text-sm text-gray-500 mb-2">or tap to browse photos from your device</p>
          <p className="text-xs text-gray-400">
            Need to convert PNG, WebP or mixed image formats?{' '}
            <Link href="/image-to-pdf" className="text-blue-600 underline font-semibold hover:text-blue-700">
              Use Image to PDF
            </Link>
          </p>
        </div>
      ) : (
        <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-200">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-3">
              <FileImage className="w-8 h-8 text-blue-500 shrink-0" />
              <h2 className="text-xl font-bold text-gray-800">Selected JPG Images ({images.length}):</h2>
            </div>
            <button
              onClick={() => setImages([])}
              className="text-red-500 hover:text-red-700 text-sm font-semibold bg-red-50 px-3 py-1.5 rounded-xl transition-colors"
            >
              Clear All
            </button>
          </div>

          <ul className="space-y-3 mb-6">
            {images.map((item, idx) => (
              <li
                key={item.id}
                className="flex justify-between items-center p-3 sm:p-4 bg-gray-50 rounded-2xl border border-gray-200"
              >
                <div className="flex items-center space-x-3 overflow-hidden">
                  <span className="text-xs font-bold text-gray-400 w-5">#{idx + 1}</span>
                  <span className="font-medium text-gray-700 truncate max-w-xs sm:max-w-md">
                    {item.file.name}
                  </span>
                </div>
                <div className="flex items-center space-x-2 shrink-0">
                  <button
                    onClick={() => moveUp(idx)}
                    disabled={idx === 0}
                    className="p-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-100 disabled:opacity-30 transition-colors"
                    title="Move Up"
                  >
                    <ArrowUp className="w-4 h-4 text-gray-600" />
                  </button>
                  <button
                    onClick={() => moveDown(idx)}
                    disabled={idx === images.length - 1}
                    className="p-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-100 disabled:opacity-30 transition-colors"
                    title="Move Down"
                  >
                    <ArrowDown className="w-4 h-4 text-gray-600" />
                  </button>
                  <button
                    onClick={() => removeImage(item.id)}
                    className="p-1.5 text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 rounded-lg transition-colors ml-2"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex-1 w-full border border-gray-300 hover:border-blue-500 rounded-2xl p-4 text-center cursor-pointer bg-gray-50 hover:bg-gray-100 font-semibold text-gray-700 transition-colors"
            >
              + Add More JPGs
            </button>
            <button
              onClick={convertToPdf}
              disabled={isConverting}
              className={`flex-1 w-full text-white font-bold py-4 px-8 rounded-2xl text-xl shadow-md transition-all ${
                isConverting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {isConverting ? 'Converting JPGs...' : 'Convert to PDF'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}