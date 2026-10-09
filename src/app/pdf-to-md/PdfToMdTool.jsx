'use client';

import { useState } from 'react';

// Loads pdf.js from /public at runtime so the bundler never touches it
const loadPdfJs = () =>
  new Promise((resolve, reject) => {
    if (window.pdfjsLib) return resolve(window.pdfjsLib);
    const script = document.createElement('script');
    script.src = '/pdf.min.js';
    script.onload = () => {
      if (window.pdfjsLib) resolve(window.pdfjsLib);
      else reject(new Error('pdf.js loaded but pdfjsLib is missing'));
    };
    script.onerror = () => reject(new Error('Could not load /pdf.min.js'));
    document.head.appendChild(script);
  });

export default function PdfToMdTool() {
  const [file, setFile] = useState(null);
  const [markdown, setMarkdown] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleFileUpload = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setMarkdown('');
    }
  };

  const convertToMarkdown = async () => {
    if (!file) return;
    setLoading(true);

    try {
      const pdfjsLib = await loadPdfJs();
      pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';

      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      let fullMarkdown = '';

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();

        let pageText = '';
        let lastY = null;

        textContent.items.forEach((item) => {
          if (!item.str || !item.str.trim()) return;

          if (lastY !== null && Math.abs(item.transform[5] - lastY) > 10) {
            pageText += '\n\n';
          } else if (lastY !== null) {
            pageText += ' ';
          }

          if (item.height > 18) {
            pageText += `# ${item.str}`;
          } else if (item.height > 14) {
            pageText += `## ${item.str}`;
          } else {
            pageText += item.str;
          }

          lastY = item.transform[5];
        });

        fullMarkdown += `<!-- Page ${i} -->\n\n${pageText}\n\n---\n\n`;
      }

      setMarkdown(fullMarkdown.trim());
    } catch (err) {
      console.error('PDF to MD error:', err);
      alert(`Error extracting text: ${err.message || err}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${file.name.replace('.pdf', '')}.md`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-sm border border-gray-100 my-8">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Convert PDF to Markdown (.md)</h2>
        <p className="text-gray-500 mt-1">Extract formatted text locally in your browser for Notion, Obsidian, or AI prompts</p>
      </div>

      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50 hover:bg-gray-100 transition">
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileUpload}
          className="hidden"
          id="pdf-upload"
        />
        <label htmlFor="pdf-upload" className="cursor-pointer flex flex-col items-center">
          <span className="text-blue-600 font-medium">Click to select PDF</span>
          <span className="text-sm text-gray-400 mt-1">or drag & drop your document here</span>
        </label>
        {file && <p className="mt-3 font-medium text-gray-700">{file.name}</p>}
      </div>

      {file && !markdown && (
        <div className="text-center mt-6">
          <button
            onClick={convertToMarkdown}
            disabled={loading}
            className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
          >
            {loading ? 'Processing...' : 'Convert to Markdown'}
          </button>
        </div>
      )}

      {markdown && (
        <div className="mt-8">
          <div className="flex justify-between items-center mb-3">
            <span className="font-semibold text-gray-700">Markdown Output:</span>
            <div className="flex gap-2">
              <button
                onClick={handleCopy}
                className="px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition"
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
              <button
                onClick={handleDownload}
                className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Download .md
              </button>
            </div>
          </div>
          <textarea
            readOnly
            value={markdown}
            rows={14}
            className="w-full p-4 font-mono text-sm border rounded-lg bg-gray-50 text-gray-800 focus:outline-none"
          />
        </div>
      )}
    </div>
  );
}n