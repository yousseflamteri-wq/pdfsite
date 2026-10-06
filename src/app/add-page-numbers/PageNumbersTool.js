'use client';

import { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import {
  FileText,
  ShieldCheck,
  Zap,
  Sparkles,
  Smartphone,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';
import Dropzone from '../../components/Dropzone';
import ToolSeoContent from '../../components/ToolSeoContent';
import { tools } from '../../lib/toolsConfig';
import { formatSize, downloadBlob } from '../../lib/format';
import { addPageNumbers, buildLabel, NUMBER_FORMATS } from '../../lib/pageNumbers';

const POSITION_BUTTONS = [
  { id: 'top-left', cls: 'top-2 left-2' },
  { id: 'top-center', cls: 'top-2 left-1/2 -translate-x-1/2' },
  { id: 'top-right', cls: 'top-2 right-2' },
  { id: 'bottom-left', cls: 'bottom-2 left-2' },
  { id: 'bottom-center', cls: 'bottom-2 left-1/2 -translate-x-1/2' },
  { id: 'bottom-right', cls: 'bottom-2 right-2' },
];

const COLOR_OPTIONS = [
  { id: 'black', label: 'Black', swatch: 'bg-black' },
  { id: 'gray', label: 'Gray', swatch: 'bg-gray-500' },
  { id: 'blue', label: 'Blue', swatch: 'bg-blue-600' },
];

const MARGIN_OPTIONS = [
  { value: 18, label: 'Small' },
  { value: 30, label: 'Medium' },
  { value: 45, label: 'Large' },
];

const FONT_SIZES = [8, 9, 10, 11, 12, 14, 16, 18, 20, 24];

const theme = {
  badge: 'bg-sky-100 text-sky-700',
  linkHover: 'hover:text-sky-600 hover:border-sky-300',
};

const fieldClass =
  'w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-400';

export default function PageNumbersTool({ faqs }) {
  const [file, setFile] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [position, setPosition] = useState('bottom-center');
  const [formatId, setFormatId] = useState('plain');
  const [startPageInput, setStartPageInput] = useState('1');
  const [firstNumberInput, setFirstNumberInput] = useState('1');
  const [fontSize, setFontSize] = useState(12);
  const [margin, setMargin] = useState(30);
  const [color, setColor] = useState('black');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const toolInfo = tools.find((t) => t.id === 'add-page-numbers');

  const startPage = Math.min(Math.max(parseInt(startPageInput, 10) || 1, 1), Math.max(pageCount, 1));
  const parsedFirst = parseInt(firstNumberInput, 10);
  const firstNumber = Number.isNaN(parsedFirst) ? 1 : Math.max(parsedFirst, 0);
  const numberedCount = Math.max(pageCount - startPage + 1, 0);
  const lastNumber = firstNumber + Math.max(numberedCount - 1, 0);
  const previewLabel = buildLabel(formatId, firstNumber, lastNumber);

  const resetState = () => {
    setFile(null);
    setPageCount(0);
    setIsSuccess(false);
    setErrorMessage('');
  };

  const handleDrop = async (acceptedFiles) => {
    setErrorMessage('');
    setIsSuccess(false);
    const selected = acceptedFiles[0];
    if (!selected) return;

    if (selected.type !== 'application/pdf' && !/\.pdf$/i.test(selected.name)) {
      setErrorMessage('Please choose a PDF file.');
      return;
    }

    try {
      const buffer = await selected.arrayBuffer();
      const pdf = await PDFDocument.load(buffer);
      setPageCount(pdf.getPageCount());
      setFile(selected);
      setStartPageInput('1');
    } catch (err) {
      console.error(err);
      setErrorMessage('Unable to read this PDF. It might be password-protected or corrupted.');
    }
  };

  const handleAddNumbers = async () => {
    if (!file) return;
    setErrorMessage('');
    setIsSuccess(false);
    setIsProcessing(true);

    try {
      const buffer = await file.arrayBuffer();
      const bytes = await addPageNumbers(buffer, {
        position,
        formatId,
        startPage,
        firstNumber,
        fontSize,
        margin,
        color,
      });
      downloadBlob(new Blob([bytes], { type: 'application/pdf' }), `numbered-${file.name}`);
      setIsSuccess(true);
    } catch (err) {
      console.error(err);
      setErrorMessage('Could not add page numbers. Please make sure the PDF is valid and not password-protected.');
    } finally {
      setIsProcessing(false);
    }
  };

  const seo = {
    howTo: {
      title: 'How to Add Page Numbers to a PDF Online',
      subtitle: 'Number every page of your document in three quick steps.',
      steps: [
        { title: 'Upload Your PDF', text: 'Drag and drop the document you want to number into the drop zone.' },
        {
          title: 'Choose the Style',
          text: 'Pick a position on the page, a number format, the first number and the page to start on.',
        },
        {
          title: 'Download Instantly',
          text: 'Click the button and your numbered PDF is created and downloaded in seconds.',
        },
      ],
    },
    why: {
      title: 'Why Add Page Numbers with PDF Lab?',
      items: [
        {
          icon: Sparkles,
          iconClass: 'text-sky-500',
          title: 'Full Control Over Numbering',
          text: 'Six positions, five formats, custom start page and first number, plus font size, margin and colour.',
        },
        {
          icon: Smartphone,
          iconClass: 'text-purple-500',
          title: 'Works on Rotated Pages',
          text: 'Pages that are landscape or rotated still get upright, correctly placed numbers.',
        },
        {
          icon: ShieldCheck,
          iconClass: 'text-green-500',
          title: 'Your File Stays Private',
          text: 'Everything happens inside your browser. Your document is never uploaded to any server.',
        },
        {
          icon: Zap,
          iconClass: 'text-yellow-500',
          title: 'Original Content Untouched',
          text: 'Text, images and layout stay exactly as they were. The numbers are simply added on top.',
        },
      ],
    },
    uses: {
      title: 'When Do You Need to Number PDF Pages?',
      items: [
        { title: 'Reports and Theses', text: 'Skip the cover page and begin numbering from the introduction.' },
        { title: 'Contracts and Legal Bundles', text: 'Make long documents easy to reference with "Page 3 of 40" style numbering.' },
        { title: 'Scanned Documents', text: 'Add numbers to scanned pages so they can be cited and printed in order.' },
        { title: 'Handouts and Manuals', text: 'Give printed course material and guides clear, consistent page numbers.' },
      ],
    },
    related: [
      { href: '/merge-pdf', label: 'Merge PDF' },
      { href: '/organize-pdf', label: 'Organize Pages' },
      { href: '/watermark-pdf', label: 'Add Watermark' },
      { href: '/split-pdf', label: 'Split PDF' },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6">
      <div className="text-center mb-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
          Add Page Numbers to PDF Online – Free & Private
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {toolInfo?.description || 'Add page numbers to your PDF in your browser.'}
        </p>
      </div>

      {errorMessage && (
        <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 flex items-center space-x-3">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span className="text-sm font-medium">{errorMessage}</span>
        </div>
      )}

      {!file ? (
        <Dropzone onDrop={handleDrop} multiple={false} text="Drag & drop a PDF file to number its pages" />
      ) : (
        <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-200">
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
            <div className="flex items-center space-x-3 overflow-hidden">
              <FileText className="w-8 h-8 text-sky-500 shrink-0" />
              <div>
                <h2 className="text-xl font-bold text-gray-800 truncate max-w-xs sm:max-w-md">{file.name}</h2>
                <p className="text-sm text-gray-500">
                  {formatSize(file.size)} &middot; {pageCount} {pageCount === 1 ? 'page' : 'pages'}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={resetState}
              className="text-red-500 hover:text-red-700 font-semibold bg-red-50 px-4 py-2 rounded-xl text-sm transition-colors"
            >
              Change file
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-3">Position on the page:</label>
              <div className="relative w-44 h-60 mx-auto bg-white border-2 border-gray-200 rounded-lg shadow-sm">
                <div className="absolute inset-x-6 top-14 space-y-2 pointer-events-none">
                  {[100, 85, 95, 70, 90, 60, 80].map((w, i) => (
                    <div key={i} className="h-1.5 rounded bg-gray-100" style={{ width: `${w}%` }} />
                  ))}
                </div>
                {POSITION_BUTTONS.map((p) => {
                  const active = position === p.id;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      aria-label={`Position ${p.id.replace('-', ' ')}`}
                      aria-pressed={active}
                      onClick={() => {
                        setPosition(p.id);
                        setIsSuccess(false);
                      }}
                      className={`absolute w-10 h-6 rounded-md border text-[10px] font-bold transition-all ${p.cls} ${
                        active
                          ? 'bg-sky-600 border-sky-600 text-white shadow'
                          : 'bg-gray-50 border-gray-200 text-gray-300 hover:border-sky-400 hover:text-sky-500'
                      }`}
                    >
                      {active ? firstNumber : '•'}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5" htmlFor="pn-format">
                  Number format
                </label>
                <select
                  id="pn-format"
                  value={formatId}
                  onChange={(e) => {
                    setFormatId(e.target.value);
                    setIsSuccess(false);
                  }}
                  className={fieldClass}
                >
                  {NUMBER_FORMATS.map((f) => (
                    <option key={f.id} value={f.id}>
                      {f.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5" htmlFor="pn-start">
                    Start on page
                  </label>
                  <input
                    id="pn-start"
                    type="number"
                    min={1}
                    max={pageCount}
                    value={startPageInput}
                    onChange={(e) => {
                      setStartPageInput(e.target.value);
                      setIsSuccess(false);
                    }}
                    className={fieldClass}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5" htmlFor="pn-first">
                    First number
                  </label>
                  <input
                    id="pn-first"
                    type="number"
                    min={0}
                    value={firstNumberInput}
                    onChange={(e) => {
                      setFirstNumberInput(e.target.value);
                      setIsSuccess(false);
                    }}
                    className={fieldClass}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5" htmlFor="pn-size">
                    Font size
                  </label>
                  <select
                    id="pn-size"
                    value={fontSize}
                    onChange={(e) => setFontSize(Number(e.target.value))}
                    className={fieldClass}
                  >
                    {FONT_SIZES.map((s) => (
                      <option key={s} value={s}>
                        {s} pt
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5" htmlFor="pn-margin">
                    Distance from edge
                  </label>
                  <select
                    id="pn-margin"
                    value={margin}
                    onChange={(e) => setMargin(Number(e.target.value))}
                    className={fieldClass}
                  >
                    {MARGIN_OPTIONS.map((m) => (
                      <option key={m.value} value={m.value}>
                        {m.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <span className="block text-sm font-bold text-gray-700 mb-1.5">Colour</span>
                <div className="flex gap-3">
                  {COLOR_OPTIONS.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setColor(c.id)}
                      aria-pressed={color === c.id}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-xl border text-sm font-medium transition-all ${
                        color === c.id
                          ? 'border-sky-600 bg-sky-50 text-sky-700 ring-2 ring-sky-200'
                          : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <span className={`w-3.5 h-3.5 rounded-full ${c.swatch}`} />
                      <span>{c.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mb-6 p-3 rounded-xl bg-gray-50 border border-gray-100 text-sm text-gray-600 text-center">
            Page {startPage} will show <strong className="text-gray-900">{previewLabel}</strong>
            {startPage > 1 && ` (pages 1-${startPage - 1} stay unnumbered)`}
          </div>

          {isSuccess && (
            <div className="mb-6 p-4 bg-sky-50 rounded-2xl border border-sky-200 text-center flex items-center justify-center space-x-2">
              <CheckCircle2 className="w-5 h-5 text-sky-600 shrink-0" />
              <p className="text-sky-800 font-semibold text-sm">Page numbers added and your PDF was downloaded!</p>
            </div>
          )}

          <button
            type="button"
            onClick={handleAddNumbers}
            disabled={isProcessing}
            className={`w-full py-4 rounded-2xl font-bold text-white text-lg transition-all ${
              isProcessing ? 'bg-sky-300 cursor-not-allowed' : 'bg-sky-600 hover:bg-sky-700 shadow-md'
            }`}
          >
            {isProcessing ? 'Adding Page Numbers...' : 'Add Page Numbers'}
          </button>
        </div>
      )}

      <ToolSeoContent theme={theme} howTo={seo.howTo} why={seo.why} uses={seo.uses} faqs={faqs} related={seo.related} />
    </div>
  );
}