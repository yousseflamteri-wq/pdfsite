'use client';

import { useId } from 'react';
import { UploadCloud } from 'lucide-react';

export default function Dropzone({
  onDrop,
  multiple = true,
  accept = 'application/pdf,.pdf',
  text = 'Drag & drop PDF files here, or tap to browse',
}) {
  const inputId = useId();

  const handleInputChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const fileList = Array.from(files);
      onDrop(fileList);
    }
    setTimeout(() => {
      e.target.value = '';
    }, 150);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer?.files && e.dataTransfer.files.length > 0) {
      onDrop(Array.from(e.dataTransfer.files));
    }
  };

  return (
    <label
      htmlFor={inputId}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className="relative block w-full border-2 border-dashed border-gray-300 hover:border-blue-500 bg-white hover:bg-gray-50 active:bg-blue-50/50 rounded-3xl p-8 sm:p-12 text-center transition-all cursor-pointer shadow-sm select-none"
    >
      <input
        id={inputId}
        type="file"
        multiple={multiple}
        accept={accept}
        onChange={handleInputChange}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
      />

      <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 pointer-events-none">
        <UploadCloud className="w-8 h-8" />
      </div>

      <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 pointer-events-none">
        {text}
      </h3>
      <p className="text-xs sm:text-sm text-gray-500 pointer-events-none">
        Tap to choose from device or files
      </p>
    </label>
  );
}