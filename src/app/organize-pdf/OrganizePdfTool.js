'use client';

import { useEffect, useRef, useState } from 'react';
import {
  RotateCcw,
  RotateCw,
  Trash2,
  ArrowLeft,
  ArrowRight,
  ArrowUpDown,
  Undo2,
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
import { loadPdfJs } from '../../lib/loadPdfJs';
import { buildOrganizedPdf } from '../../lib/organizePdf';
import { useDragReorder, moveItem } from '../../lib/useDragReorder';

const THUMB_MAX = 220;
const THUMB_BOX = 132;

const theme = {
  badge: 'bg-amber-100 text-amber-700',
  linkHover: 'hover:text-amber-700 hover:border-amber-300',
};

function thumbStyle(thumb, rotation) {
  const rotated = rotation % 180 !== 0;
  const ew = rotated ? thumb.h : thumb.w;
  const eh = rotated ? thumb.w : thumb.h;
  const scale = Math.min(THUMB_BOX / ew, THUMB_BOX / eh);
  return {
    width: thumb.w * scale,
    height: thumb.h * scale,
    transform: `rotate(${rotation}deg)`,
  };
}

const iconBtn =
  'p-1 rounded-md border border-gray-200 bg-white hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-white transition-colors';

export default function OrganizePdfTool({ faqs }) {
  const [file, setFile] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [items, setItems] = useState([]);
  const [thumbs, setThumbs] = useState({});
  const [thumbsDone, setThumbsDone] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const runIdRef = useRef(0);
  const pdfRef = useRef(null);

  const toolInfo = tools.find((t) => t.id === 'organize-pdf');

  const { getItemProps, overIndex, draggingIndex } = useDragReorder((from, to) => {
    setItems((prev) => moveItem(prev, from, to));
    setIsSuccess(false);
  });

  const destroyPdf = () => {
    const pdf = pdfRef.current;
    pdfRef.current = null;
    if (pdf && pdf.destroy) pdf.destroy();
  };

  useEffect(() => {
    return () => {
      runIdRef.current += 1;
      destroyPdf();
    };
  }, []);

  const clearAll = () => {
    runIdRef.current += 1;
    destroyPdf();
    setFile(null);
    setPageCount(0);
    setItems([]);
    setThumbs({});
    setThumbsDone(0);
    setIsLoading(false);
    setIsSuccess(false);
    setErrorMessage('');
  };

  const handleDrop = async (acceptedFiles) => {
    const selected = acceptedFiles[0];
    if (!selected) return;

    if (selected.type !== 'application/pdf' && !/\.pdf$/i.test(selected.name)) {
      setErrorMessage('Please choose a PDF file.');
      return;
    }

    clearAll();
    const runId = runIdRef.current;
    setFile(selected);
    setIsLoading(true);

    try {
      const pdfjsLib = await loadPdfJs();
      const data = new Uint8Array(await selected.arrayBuffer());
      const pdf = await pdfjsLib.getDocument({ data }).promise;
      if (runIdRef.current !== runId) {
        pdf.destroy();
        return;
      }
      pdfRef.current = pdf;

      const n = pdf.numPages;
      setPageCount(n);
      setItems(Array.from({ length: n }, (_, i) => ({ index: i, rotation: 0 })));

      let batch = {};
      for (let i = 0; i < n; i++) {
        if (runIdRef.current !== runId) return;
        const page = await pdf.getPage(i + 1);
        const base = page.getViewport({ scale: 1 });
        const viewport = page.getViewport({ scale: THUMB_MAX / Math.max(base.width, base.height) });

        const canvas = document.createElement('canvas');
        canvas.width = Math.max(1, Math.ceil(viewport.width));
        canvas.height = Math.ceil(viewport.height);
        await page.render({ canvasContext: canvas.getContext('2d'), viewport }).promise;

        batch[i] = { url: canvas.toDataURL('image/jpeg', 0.75), w: canvas.width, h: canvas.height };
        canvas.width = 0;
        canvas.height = 0;
        page.cleanup();

        if ((i + 1) % 6 === 0 || i === n - 1) {
          const snapshot = batch;
          batch = {};
          if (runIdRef.current !== runId) return;
          setThumbs((prev) => ({ ...prev, ...snapshot }));
          setThumbsDone(i + 1);
        }
      }
    } catch (err) {
      if (runIdRef.current !== runId) return;
      console.error(err);
      setErrorMessage(
        err && err.name === 'PasswordException'
          ? 'This PDF is password-protected. Please unlock it first, then try again.'
          : err?.message?.includes('PDF engine')
            ? err.message
            : 'Unable to read this PDF. It might be corrupted.'
      );
      setFile(null);
      setItems([]);
      setPageCount(0);
    } finally {
      if (runIdRef.current === runId) {
        setIsLoading(false);
        destroyPdf();
      }
    }
  };

  const touch = (updater) => {
    setItems(updater);
    setIsSuccess(false);
  };

  const move = (pos, delta) => {
    const to = pos + delta;
    touch((prev) => (to < 0 || to >= prev.length ? prev : moveItem(prev, pos, to)));
  };

  const rotateAt = (pos, delta) =>
    touch((prev) => prev.map((it, i) => (i === pos ? { ...it, rotation: (it.rotation + delta + 360) % 360 } : it)));

  const removeAt = (pos) => touch((prev) => prev.filter((_, i) => i !== pos));

  const rotateAll = () => touch((prev) => prev.map((it) => ({ ...it, rotation: (it.rotation + 90) % 360 })));

  const reverse = () => touch((prev) => [...prev].reverse());

  const resetAll = () => touch(() => Array.from({ length: pageCount }, (_, i) => ({ index: i, rotation: 0 })));

  const save = async () => {
    if (!file || items.length === 0) return;
    setErrorMessage('');
    setIsSuccess(false);
    setIsSaving(true);
    try {
      const buffer = await file.arrayBuffer();
      const bytes = await buildOrganizedPdf(buffer, items);
      downloadBlob(new Blob([bytes], { type: 'application/pdf' }), `organized-${file.name}`);
      setIsSuccess(true);
    } catch (err) {
      console.error(err);
      setErrorMessage('Could not save the PDF. Please make sure the file is valid and not password-protected.');
    } finally {
      setIsSaving(false);
    }
  };

  const removedCount = pageCount - items.length;

  const seo = {
    howTo: {
      title: 'How to Reorder, Rotate and Delete PDF Pages',
      subtitle: 'Rearrange your document visually in three steps.',
      steps: [
        { title: 'Upload Your PDF', text: 'Drop your document in and see a thumbnail of every page.' },
        {
          title: 'Rearrange the Pages',
          text: 'Drag pages into a new order, use the arrows on a phone, rotate pages, or delete the ones you do not need.',
        },
        { title: 'Save the New PDF', text: 'Click Save and download your reorganised PDF instantly.' },
      ],
    },
    why: {
      title: 'Why Organize PDFs with PDF Lab?',
      items: [
        {
          icon: Sparkles,
          iconClass: 'text-amber-500',
          title: 'See Every Page',
          text: 'Visual thumbnails make it easy to spot the page you want to move, rotate or remove.',
        },
        {
          icon: Smartphone,
          iconClass: 'text-purple-500',
          title: 'Works on Phones and Tablets',
          text: 'Drag and drop on a computer, or tap the arrow buttons on a touch screen.',
        },
        {
          icon: Zap,
          iconClass: 'text-yellow-500',
          title: 'Pages Are Not Re-rendered',
          text: 'Pages are copied as they are, so text stays sharp and file quality is untouched.',
        },
        {
          icon: ShieldCheck,
          iconClass: 'text-green-500',
          title: 'Private by Design',
          text: 'Everything runs in your browser. Your PDF is never uploaded to a server.',
        },
      ],
    },
    uses: {
      title: 'When Do You Need to Organize PDF Pages?',
      items: [
        { title: 'Fixing Scan Order', text: 'Put pages back in the right sequence after a scanner or feeder shuffles them.' },
        { title: 'Removing Extra Pages', text: 'Drop blank, duplicate or confidential pages before sharing a file.' },
        { title: 'Straightening Pages', text: 'Rotate individual sideways or upside-down pages without touching the rest.' },
        { title: 'Restructuring Reports', text: 'Move sections around in a report, proposal or presentation exported to PDF.' },
      ],
    },
    related: [
      { href: '/merge-pdf', label: 'Merge PDF' },
      { href: '/split-pdf', label: 'Split PDF' },
      { href: '/remove-pages', label: 'Remove Pages' },
      { href: '/rotate-pdf', label: 'Rotate PDF' },
      { href: '/add-page-numbers', label: 'Add Page Numbers' },
    ],
  };

  return (
    <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6">
      <div className="text-center mb-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
          Organize PDF Pages – Reorder, Rotate & Delete
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {toolInfo?.description || 'Rearrange, rotate and delete PDF pages with a visual page view.'}
        </p>
      </div>

      {errorMessage && (
        <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 flex items-center space-x-3">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span className="text-sm font-medium">{errorMessage}</span>
        </div>
      )}

      {!file ? (
        <div className="max-w-4xl mx-auto">
          <Dropzone onDrop={handleDrop} multiple={false} text="Drag & drop a PDF to organize its pages" />
        </div>
      ) : (
        <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-200">
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
            <div className="flex items-center space-x-3 overflow-hidden">
              <FileText className="w-8 h-8 text-amber-500 shrink-0" />
              <div>
                <h2 className="text-xl font-bold text-gray-800 truncate max-w-xs sm:max-w-md">{file.name}</h2>
                <p className="text-sm text-gray-500">
                  {formatSize(file.size)}
                  {pageCount > 0 && ` · ${pageCount} ${pageCount === 1 ? 'page' : 'pages'}`}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={clearAll}
              className="text-red-500 hover:text-red-700 font-semibold bg-red-50 px-4 py-2 rounded-xl text-sm transition-colors"
            >
              Change file
            </button>
          </div>

          {pageCount > 0 && (
            <>
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <p className="text-sm text-gray-600">
                  <strong className="text-gray-900">{items.length}</strong> of {pageCount} pages
                  {removedCount > 0 && ` (${removedCount} removed)`}
                  {isLoading && ` · loading previews ${thumbsDone}/${pageCount}`}
                </p>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={reverse}
                    disabled={items.length < 2}
                    className="inline-flex items-center space-x-1.5 px-3 py-2 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-sm font-semibold text-gray-700 disabled:opacity-40 transition-colors"
                  >
                    <ArrowUpDown className="w-4 h-4" />
                    <span>Reverse</span>
                  </button>
                  <button
                    type="button"
                    onClick={rotateAll}
                    disabled={items.length === 0}
                    className="inline-flex items-center space-x-1.5 px-3 py-2 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-sm font-semibold text-gray-700 disabled:opacity-40 transition-colors"
                  >
                    <RotateCw className="w-4 h-4" />
                    <span>Rotate all</span>
                  </button>
                  <button
                    type="button"
                    onClick={resetAll}
                    className="inline-flex items-center space-x-1.5 px-3 py-2 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-sm font-semibold text-gray-700 transition-colors"
                  >
                    <Undo2 className="w-4 h-4" />
                    <span>Reset</span>
                  </button>
                </div>
              </div>
              <p className="text-xs text-gray-400 mb-4">
                Drag a page to move it, or use the arrow buttons. Changes are only applied when you save.
              </p>
            </>
          )}

          {pageCount > 0 && items.length === 0 && (
            <div className="mb-6 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-sm">
              All pages were removed. Press <strong>Reset</strong> to bring them back.
            </div>
          )}

          {pageCount === 0 && isLoading && (
            <p className="py-10 text-center text-sm font-semibold text-gray-500">Loading your PDF...</p>
          )}

          <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mb-8">
            {items.map((item, pos) => {
              const thumb = thumbs[item.index];
              return (
                <li
                  key={item.index}
                  {...getItemProps(pos)}
                  className={`relative bg-gray-50 border rounded-2xl p-2 cursor-grab active:cursor-grabbing transition-all ${
                    overIndex === pos && draggingIndex !== pos ? 'border-amber-500 ring-2 ring-amber-200' : 'border-gray-200'
                  } ${draggingIndex === pos ? 'opacity-40' : ''}`}
                >
                  <span className="absolute top-3 left-3 z-10 bg-white/95 text-xs font-bold text-gray-700 rounded-md px-1.5 py-0.5 shadow-sm">
                    {pos + 1}
                  </span>
                  <div
                    className="mx-auto flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden"
                    style={{ width: THUMB_BOX, height: THUMB_BOX, maxWidth: '100%' }}
                  >
                    {thumb ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={thumb.url}
                        alt={`Page ${item.index + 1}`}
                        draggable={false}
                        className="shadow-sm bg-white transition-transform duration-200 shrink-0"
                        style={thumbStyle(thumb, item.rotation)}
                      />
                    ) : (
                      <span className="text-xs text-gray-400">Page {item.index + 1}</span>
                    )}
                  </div>
                  <p className="mt-1.5 text-center text-[11px] text-gray-400">
                    Original page {item.index + 1}
                    {item.rotation !== 0 && ` · ${item.rotation}°`}
                  </p>
                  <div className="mt-1.5 flex items-center justify-between">
                    <button type="button" onClick={() => move(pos, -1)} disabled={pos === 0} aria-label="Move earlier" className={iconBtn}>
                      <ArrowLeft className="w-4 h-4 text-gray-600" />
                    </button>
                    <button type="button" onClick={() => rotateAt(pos, -90)} aria-label="Rotate left" className={iconBtn}>
                      <RotateCcw className="w-4 h-4 text-gray-600" />
                    </button>
                    <button type="button" onClick={() => rotateAt(pos, 90)} aria-label="Rotate right" className={iconBtn}>
                      <RotateCw className="w-4 h-4 text-gray-600" />
                    </button>
                    <button
                      type="button"
                      onClick={() => removeAt(pos)}
                      aria-label="Delete page"
                      className="p-1 rounded-md border border-red-100 bg-red-50 hover:bg-red-100 transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                    <button
                      type="button"
                      onClick={() => move(pos, 1)}
                      disabled={pos === items.length - 1}
                      aria-label="Move later"
                      className={iconBtn}
                    >
                      <ArrowRight className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>

          {isSuccess && (
            <div className="mb-6 p-4 bg-amber-50 rounded-2xl border border-amber-200 text-center flex items-center justify-center space-x-2">
              <CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0" />
              <p className="text-amber-900 font-semibold text-sm">Your organized PDF was saved and downloaded!</p>
            </div>
          )}

          {pageCount > 0 && (
            <button
              type="button"
              onClick={save}
              disabled={isSaving || items.length === 0}
              className="w-full py-4 rounded-2xl font-bold text-white text-lg bg-amber-600 hover:bg-amber-700 shadow-md transition-all disabled:bg-amber-300 disabled:cursor-not-allowed"
            >
              {isSaving ? 'Saving PDF...' : `Save Organized PDF (${items.length} ${items.length === 1 ? 'page' : 'pages'})`}
            </button>
          )}
        </div>
      )}

      <ToolSeoContent theme={theme} howTo={seo.howTo} why={seo.why} uses={seo.uses} faqs={faqs} related={seo.related} />
    </div>
  );
}