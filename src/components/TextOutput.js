'use client';

import { useMemo, useRef, useState } from 'react';
import { Copy, Check, Download } from 'lucide-react';
import { downloadBlob } from '../lib/format';
import { countWords } from '../lib/pdfText';

export default function TextOutput({ text, filename, primaryClass }) {
  const areaRef = useRef(null);
  const [copied, setCopied] = useState(false);

  const stats = useMemo(
    () => ({ words: countWords(text), chars: text.length }),
    [text]
  );

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      areaRef.current?.select();
      document.execCommand('copy');
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const download = () => {
    const blob = new Blob(['\uFEFF', text], { type: 'text/plain;charset=utf-8' });
    downloadBlob(blob, filename);
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
        <p className="text-sm text-gray-500">
          {stats.words.toLocaleString()} words &middot; {stats.chars.toLocaleString()} characters
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={copy}
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-sm font-semibold text-gray-700 transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied!' : 'Copy text'}</span>
          </button>
          <button
            type="button"
            onClick={download}
            className={`inline-flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-colors ${primaryClass}`}
          >
            <Download className="w-4 h-4" />
            <span>Download .txt</span>
          </button>
        </div>
      </div>
      <textarea
        ref={areaRef}
        readOnly
        dir="auto"
        value={text}
        className="w-full h-96 p-4 rounded-2xl border border-gray-200 bg-gray-50 text-sm text-gray-800 leading-relaxed font-mono resize-y focus:outline-none"
      />
    </div>
  );
}