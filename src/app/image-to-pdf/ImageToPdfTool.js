'use client';

import { useEffect, useRef, useState } from 'react';
import {
  X,
  ArrowLeft,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  ImagePlus,
  Images,
} from 'lucide-react';
import Dropzone from '../../components/Dropzone';
import { tools } from '../../lib/toolsConfig';
import { generateSafeId } from '../../lib/generateId';
import { formatSize, downloadBlob } from '../../lib/format';
import { prepareImage, isSupportedImage, isHeic } from '../../lib/prepareImage';
import { buildPdfFromImages, MARGINS } from '../../lib/imagesToPdf';
import { useDragReorder, moveItem } from '../../lib/useDragReorder';

const ACCEPT = 'image/*,.jpg,.jpeg,.png,.webp,.bmp,.gif,.avif';

function OptionGroup({ label, value, onChange, options, disabled = false, hint }) {
  return (
    <div className={disabled ? 'opacity-40 pointer-events-none' : ''}>
      <span className="block text-sm font-bold text-gray-700 mb-2">{label}</span>
      <div className="grid grid-cols-3 gap-2">
        {options.map((o) => (
          <button
            key={o.value}
            type="button"
            onClick={() => onChange(o.value)}
            aria-pressed={value === o.value}
            className={`py-2.5 px-2 rounded-xl border text-sm font-semibold transition-all ${
              value === o.value
                ? 'border-lime-600 bg-lime-50 text-lime-800 ring-2 ring-lime-200'
                : 'border-gray-200 text-gray-700 hover:bg-gray-50'
            }`}
          >
            {o.label}
          </button>
        ))}
      </div>
      {hint && <p className="text-xs text-gray-400 mt-1.5">{hint}</p>}
    </div>
  );
}

export default function ImageToPdfTool() {
  const [items, setItems] = useState([]);
  const [pageSize, setPageSize] = useState('a4');
  const [orientation, setOrientation] = useState('auto');
  const [marginKey, setMarginKey] = useState('small');
  const [isConverting, setIsConverting] = useState(false);
  const [progressText, setProgressText] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const fileInputRef = useRef(null);
  const itemsRef = useRef([]);

  const toolInfo = tools?.find((t) => t.id === 'image-to-pdf');

  const { getItemProps, overIndex, draggingIndex } = useDragReorder((from, to) => {
    setItems((prev) => moveItem(prev, from, to));
    setIsSuccess(false);
  });

  useEffect(() => {
    itemsRef.current = items;
  }, [items]);

  useEffect(() => {
    return () => {
      itemsRef.current.forEach((it) => URL.revokeObjectURL(it.url));
    };
  }, []);

  const addFiles = (fileList) => {
    setErrorMessage('');
    setIsSuccess(false);
    const all = Array.from(fileList);
    const valid = all.filter(isSupportedImage);
    const skipped = all.length - valid.length;
    const heicSkipped = all.some(isHeic);

    if (valid.length > 0) {
      const newItems = valid.map((file) => ({
        id: generateSafeId(),
        file,
        url: URL.createObjectURL(file),
      }));
      setItems((prev) => [...prev, ...newItems]);
    }

    if (skipped > 0) {
      setErrorMessage(
        heicSkipped
          ? 'HEIC/HEIF photos are not supported by most browsers. Export them as JPG first (on iPhone: Settings > Camera > Formats > Most Compatible).'
          : `${skipped} file${skipped > 1 ? 's were' : ' was'} skipped because ${skipped > 1 ? 'they are' : 'it is'} not a supported image.`
      );
    }
  };

  const handleInputChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      addFiles(e.target.files);
    }
    setTimeout(() => {
      e.target.value = '';
    }, 150);
  };

  const removeItem = (id) => {
    setItems((prev) => {
      const target = prev.find((it) => it.id === id);
      if (target) URL.revokeObjectURL(target.url);
      return prev.filter((it) => it.id !== id);
    });
    setIsSuccess(false);
  };

  const clearAll = () => {
    items.forEach((it) => URL.revokeObjectURL(it.url));
    setItems([]);
    setIsSuccess(false);
    setErrorMessage('');
  };

  const move = (index, delta) => {
    const to = index + delta;
    if (to < 0 || to >= items.length) return;
    setItems((prev) => moveItem(prev, index, to));
    setIsSuccess(false);
  };

  const convert = async () => {
    if (items.length === 0) return;
    setErrorMessage('');
    setIsSuccess(false);
    setIsConverting(true);

    try {
      const prepared = [];
      for (let i = 0; i < items.length; i++) {
        setProgressText(`Processing image ${i + 1} of ${items.length}...`);
        prepared.push(await prepareImage(items[i].file));
      }
      setProgressText('Building PDF...');
      const bytes = await buildPdfFromImages(prepared, {
        pageSize,
        orientation,
        margin: MARGINS[marginKey],
      });
      downloadBlob(new Blob([bytes], { type: 'application/pdf' }), 'images.pdf');
      setIsSuccess(true);
    } catch (err) {
      console.error(err);
      setErrorMessage(err.message || 'Error converting images to PDF. Please try different image files.');
    } finally {
      setIsConverting(false);
      setProgressText('');
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
      <div className="text-center mb-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
          Image to PDF Converter – PNG, WebP & JPG to PDF
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {toolInfo?.description || 'Combine images into one PDF with custom page sizes, margins, and orientation.'}
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
        accept={ACCEPT}
        onChange={handleInputChange}
        className="hidden"
      />

      {items.length === 0 ? (
        <Dropzone onDrop={addFiles} multiple accept={ACCEPT} text="Drag & drop images here, or tap to browse" />
      ) : (
        <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-200">
          <div className="flex justify-between items-center mb-5">
            <div className="flex items-center space-x-3">
              <Images className="w-8 h-8 text-lime-600 shrink-0" />
              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  {items.length} {items.length === 1 ? 'image' : 'images'} selected
                </h2>
                <p className="text-xs text-gray-500">Drag to reorder, or use the arrows.</p>
              </div>
            </div>
            <button
              type="button"
              onClick={clearAll}
              className="text-red-500 hover:text-red-700 text-sm font-semibold bg-red-50 px-3 py-1.5 rounded-xl transition-colors"
            >
              Clear all
            </button>
          </div>

          <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-6">
            {items.map((item, idx) => (
              <li
                key={item.id}
                {...getItemProps(idx)}
                className={`relative bg-gray-50 border rounded-2xl p-2 cursor-grab active:cursor-grabbing transition-all ${
                  overIndex === idx && draggingIndex !== idx
                    ? 'border-lime-500 ring-2 ring-lime-200'
                    : 'border-gray-200'
                } ${draggingIndex === idx ? 'opacity-40' : ''}`}
              >
                <span className="absolute top-3 left-3 z-10 bg-white/95 text-xs font-bold text-gray-700 rounded-md px-1.5 py-0.5 shadow-sm">
                  {idx + 1}
                </span>
                <button
                  type="button"
                  onClick={() => removeItem(item.id)}
                  aria-label={`Remove ${item.file.name}`}
                  className="absolute top-3 right-3 z-10 p-1 rounded-md bg-white/95 text-red-500 hover:text-red-700 hover:bg-red-50 shadow-sm transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="h-32 flex items-center justify-center bg-white rounded-xl overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.url}
                    alt={item.file.name}
                    draggable={false}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <p className="mt-2 text-xs font-medium text-gray-700 truncate" title={item.file.name}>
                  {item.file.name}
                </p>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-[11px] text-gray-400">{formatSize(item.file.size)}</span>
                  <div className="flex gap-1">
                    <button
                      type="button"
                      onClick={() => move(idx, -1)}
                      disabled={idx === 0}
                      aria-label="Move earlier"
                      className="p-1 rounded-md border border-gray-200 bg-white hover:bg-gray-100 disabled:opacity-30 transition-colors"
                    >
                      <ArrowLeft className="w-3.5 h-3.5 text-gray-600" />
                    </button>
                    <button
                      type="button"
                      onClick={() => move(idx, 1)}
                      disabled={idx === items.length - 1}
                      aria-label="Move later"
                      className="p-1 rounded-md border border-gray-200 bg-white hover:bg-gray-100 disabled:opacity-30 transition-colors"
                    >
                      <ArrowRight className="w-3.5 h-3.5 text-gray-600" />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="w-full mb-8 flex items-center justify-center space-x-2 border border-dashed border-gray-300 hover:border-lime-500 rounded-2xl p-3 bg-gray-50 hover:bg-gray-100 font-semibold text-gray-700 transition-colors"
          >
            <ImagePlus className="w-5 h-5" />
            <span>Add more images</span>
          </button>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 p-5 rounded-2xl bg-gray-50 border border-gray-100">
            <OptionGroup
              label="Page size"
              value={pageSize}
              onChange={setPageSize}
              options={[
                { value: 'fit', label: 'Fit image' },
                { value: 'a4', label: 'A4' },
                { value: 'letter', label: 'Letter' },
              ]}
            />
            <OptionGroup
              label="Orientation"
              value={orientation}
              onChange={setOrientation}
              disabled={pageSize === 'fit'}
              hint={pageSize === 'fit' ? 'Not needed: each page matches its image.' : undefined}
              options={[
                { value: 'auto', label: 'Auto' },
                { value: 'portrait', label: 'Portrait' },
                { value: 'landscape', label: 'Landscape' },
              ]}
            />
            <OptionGroup
              label="Margin"
              value={marginKey}
              onChange={setMarginKey}
              options={[
                { value: 'none', label: 'None' },
                { value: 'small', label: 'Small' },
                { value: 'big', label: 'Big' },
              ]}
            />
          </div>

          {isSuccess && (
            <div className="mb-6 p-4 bg-lime-50 rounded-2xl border border-lime-200 text-center flex items-center justify-center space-x-2">
              <CheckCircle2 className="w-5 h-5 text-lime-700 shrink-0" />
              <p className="text-lime-900 font-semibold text-sm">Your PDF was created and downloaded!</p>
            </div>
          )}

          <button
            type="button"
            onClick={convert}
            disabled={isConverting}
            className={`w-full py-4 rounded-2xl font-bold text-white text-lg transition-all ${
              isConverting ? 'bg-lime-400 cursor-not-allowed' : 'bg-lime-600 hover:bg-lime-700 shadow-md'
            }`}
          >
            {isConverting ? progressText || 'Converting...' : 'Convert to PDF'}
          </button>
        </div>
      )}
    </div>
  );
}