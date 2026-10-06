'use client';

import { useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import {
  FileText,
  ShieldCheck,
  Zap,
  Sparkles,
  Smartphone,
  AlertCircle,
  AlertTriangle,
} from 'lucide-react';
import Dropzone from '../../components/Dropzone';
import TextOutput from '../../components/TextOutput';
import ToolSeoContent from '../../components/ToolSeoContent';
import { tools } from '../../lib/toolsConfig';
import { formatSize, baseName } from '../../lib/format';
import { loadPdfJs } from '../../lib/loadPdfJs';
import { itemsToText, joinPages } from '../../lib/pdfText';

const theme = {
  badge: 'bg-cyan-100 text-cyan-700',
  linkHover: 'hover:text-cyan-700 hover:border-cyan-300',
};

export default function PdfToTextTool({ faqs }) {
  const [file, setFile] = useState(null);
  const [pages, setPages] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState({ page: 0, total: 0 });
  const [withSeparators, setWithSeparators] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const runIdRef = useRef(0);

  const toolInfo = tools.find((t) => t.id === 'pdf-to-text');

  const fullText = useMemo(() => joinPages(pages, withSeparators), [pages, withSeparators]);

  const totalChars = useMemo(
    () => pages.reduce((n, p) => n + p.text.replace(/\s/g, '').length, 0),
    [pages]
  );
  const hasNoText = pages.length > 0 && totalChars === 0;
  const looksScanned = pages.length > 0 && totalChars > 0 && totalChars / pages.length < 25;

  const reset = () => {
    runIdRef.current += 1;
    setFile(null);
    setPages([]);
    setErrorMessage('');
    setIsProcessing(false);
    setProgress({ page: 0, total: 0 });
  };

  const handleDrop = async (acceptedFiles) => {
    const selected = acceptedFiles[0];
    if (!selected) return;

    if (selected.type !== 'application/pdf' && !/\.pdf$/i.test(selected.name)) {
      setErrorMessage('Please choose a PDF file.');
      return;
    }

    const runId = ++runIdRef.current;
    setErrorMessage('');
    setPages([]);
    setFile(selected);
    setIsProcessing(true);
    setProgress({ page: 0, total: 0 });

    let pdf;
    try {
      const pdfjsLib = await loadPdfJs();
      const data = new Uint8Array(await selected.arrayBuffer());
      pdf = await pdfjsLib.getDocument({ data }).promise;

      const results = [];
      for (let i = 1; i <= pdf.numPages; i++) {
        if (runIdRef.current !== runId) return;
        setProgress({ page: i, total: pdf.numPages });
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        results.push({ pageNumber: i, text: itemsToText(content.items) });
        page.cleanup();
      }

      if (runIdRef.current === runId) setPages(results);
    } catch (err) {
      if (runIdRef.current !== runId) return;
      console.error(err);
      setErrorMessage(
        err && err.name === 'PasswordException'
          ? 'This PDF is password-protected. Please unlock it first, then try again.'
          : err?.message?.includes('PDF engine')
            ? err.message
            : 'Could not read this PDF. The file may be corrupted.'
      );
      setFile(null);
    } finally {
      if (pdf && pdf.destroy) pdf.destroy();
      if (runIdRef.current === runId) setIsProcessing(false);
    }
  };

  const seo = {
    howTo: {
      title: 'How to Extract Text from a PDF',
      subtitle: 'Copy or save the text of any PDF in three quick steps.',
      steps: [
        { title: 'Upload Your PDF', text: 'Drag and drop a PDF, or tap to pick one from your device.' },
        { title: 'Text Appears Instantly', text: 'The text of every page is extracted automatically in your browser.' },
        { title: 'Copy or Download', text: 'Copy it to the clipboard or save it as a .txt file.' },
      ],
    },
    why: {
      title: 'Why Use Our PDF to Text Converter?',
      items: [
        {
          icon: ShieldCheck,
          iconClass: 'text-green-500',
          title: 'Completely Private',
          text: 'Your PDF is read locally in your browser. It is never uploaded to a server.',
        },
        {
          icon: Zap,
          iconClass: 'text-yellow-500',
          title: 'Instant Results',
          text: 'No waiting in a queue. Text is extracted as soon as you add the file.',
        },
        {
          icon: Sparkles,
          iconClass: 'text-cyan-600',
          title: 'Clean, Readable Output',
          text: 'Lines and paragraphs are rebuilt, and you can add page separators to see where each page starts.',
        },
        {
          icon: Smartphone,
          iconClass: 'text-purple-500',
          title: 'Smart Scan Detection',
          text: 'If your PDF is a scan with no real text, we tell you and point you to the OCR tool.',
        },
      ],
    },
    uses: {
      title: 'When Do You Need to Extract Text from a PDF?',
      items: [
        { title: 'Quoting and Research', text: 'Copy passages from papers, reports and e-books without retyping.' },
        { title: 'Translation and Editing', text: 'Move the content into a document or translator that cannot open PDFs.' },
        { title: 'Search and Analysis', text: 'Turn a document into plain text for word counts, keyword searches or data work.' },
        { title: 'Accessibility', text: 'Get a plain-text version that works with screen readers and simple text editors.' },
      ],
    },
    related: [
      { href: '/ocr-pdf', label: 'OCR PDF & Image to Text' },
      { href: '/pdf-to-jpg', label: 'PDF to JPG' },
      { href: '/split-pdf', label: 'Split PDF' },
      { href: '/compress-pdf', label: 'Compress PDF' },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6">
      <div className="text-center mb-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
          PDF to Text – Extract Text from PDF Online
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {toolInfo?.description || 'Extract the text from any PDF and copy it or save it as a .txt file.'}
        </p>
      </div>

      {errorMessage && (
        <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 flex items-center space-x-3">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span className="text-sm font-medium">{errorMessage}</span>
        </div>
      )}

      {!file ? (
        <Dropzone onDrop={handleDrop} multiple={false} text="Drag & drop a PDF to extract its text" />
      ) : (
        <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-200">
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
            <div className="flex items-center space-x-3 overflow-hidden">
              <FileText className="w-8 h-8 text-cyan-500 shrink-0" />
              <div>
                <h2 className="text-xl font-bold text-gray-800 truncate max-w-xs sm:max-w-md">{file.name}</h2>
                <p className="text-sm text-gray-500">
                  {formatSize(file.size)}
                  {pages.length > 0 && ` · ${pages.length} ${pages.length === 1 ? 'page' : 'pages'}`}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={reset}
              className="text-red-500 hover:text-red-700 font-semibold bg-red-50 px-4 py-2 rounded-xl text-sm transition-colors"
            >
              Change file
            </button>
          </div>

          {isProcessing && (
            <div className="py-6">
              <p className="text-sm font-semibold text-gray-700 mb-2 text-center">
                {progress.total > 0
                  ? `Extracting text from page ${progress.page} of ${progress.total}...`
                  : 'Loading PDF engine...'}
              </p>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-cyan-500 transition-all"
                  style={{ width: progress.total ? `${(progress.page / progress.total) * 100}%` : '8%' }}
                />
              </div>
            </div>
          )}

          {!isProcessing && (hasNoText || looksScanned) && (
            <div className="mb-6 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5 text-amber-600" />
              <p className="text-sm">
                {hasNoText
                  ? 'No selectable text was found. This PDF is probably a scan or a set of images. '
                  : 'Very little text was found, so this PDF may be a scan. '}
                Try our{' '}
                <Link href="/ocr-pdf" className="font-bold underline">
                  OCR tool
                </Link>{' '}
                to recognise the text from the page images.
              </p>
            </div>
          )}

          {!isProcessing && !hasNoText && pages.length > 0 && (
            <>
              <label className="flex items-center space-x-2 mb-4 text-sm text-gray-700 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={withSeparators}
                  onChange={(e) => setWithSeparators(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 accent-cyan-600"
                />
                <span>Add a separator line before each page</span>
              </label>
              <TextOutput
                text={fullText}
                filename={`${baseName(file.name)}.txt`}
                primaryClass="bg-cyan-600 hover:bg-cyan-700"
              />
            </>
          )}
        </div>
      )}

      <ToolSeoContent theme={theme} howTo={seo.howTo} why={seo.why} uses={seo.uses} faqs={faqs} related={seo.related} />
    </div>
  );
}