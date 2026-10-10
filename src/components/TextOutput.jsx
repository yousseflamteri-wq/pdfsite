'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';

export default function TextOutput({ text, filename, primaryClass = 'bg-blue-600 hover:bg-blue-700' }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    
    toast.success('Text copied to clipboard!');
    
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!text) return;
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename || 'document.txt';
    link.click();
    URL.revokeObjectURL(url);
  };

  if (!text) return null;

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-3">
        <span className="font-semibold text-gray-700">Text Output:</span>
        <div className="flex gap-2">
          <button
            onClick={handleCopy}
            className="px-3 py-1.5 text-sm font-medium bg-gray-100 text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-200 transition"
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
          <button
            onClick={handleDownload}
            className={`px-3 py-1.5 text-sm font-medium text-white rounded-lg transition-colors ${primaryClass}`}
          >
            Download .txt
          </button>
        </div>
      </div>
      <textarea
        readOnly
        value={text}
        rows={12}
        className="w-full p-4 font-mono text-sm border border-gray-200 rounded-xl bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-opacity-50"
      />
    </div>
  );
}