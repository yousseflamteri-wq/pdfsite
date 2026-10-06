'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import {
  FileText,
  ShieldCheck,
  Zap,
  Sparkles,
  Languages,
  AlertCircle,
  ScanText,
  X,
} from 'lucide-react';
import Dropzone from '../../components/Dropzone';
import TextOutput from '../../components/TextOutput';
import ToolSeoContent from '../../components/ToolSeoContent';
import { tools } from '../../lib/toolsConfig';
import { formatSize, baseName } from '../../lib/format';
import { loadPdfJs } from '../../lib/loadPdfJs';
import { loadTesseract } from '../../lib/loadTesseract';
import { parsePageRange } from '../../lib/pageRange';
import { joinPages } from '../../lib/pdfText';
import { isHeic } from '../../lib/prepareImage';

const LANGUAGES = [
  { code: 'eng', label: 'English' },
  { code: 'ara', label: 'Arabic' },
  { code: 'fra', label: 'French' },
  { code: 'ara+eng', label: 'Arabic + English' },
  { code: 'fra+eng', label: 'French + English' },
  { code: 'ara+fra', label: 'Arabic + French' },
  { code: 'spa', label: 'Spanish' },
  { code: 'deu', label: 'German' },
  { code: 'ita', label: 'Italian' },
  { code: 'por', label: 'Portuguese' },
  { code: 'nld', label: 'Dutch' },
  { code: 'tur', label: 'Turkish' },
  { code: 'rus', label: 'Russian' },
  { code: 'hin', label: 'Hindi' },
  { code: 'chi_sim', label: 'Chinese (Simplified)' },
  { code: 'jpn', label: 'Japanese' },
  { code: 'kor', label: 'Korean' },
];

const ACCEPT = 'application/pdf,.pdf,image/*,.jpg,.jpeg,.png,.webp,.bmp,.gif';
const MAX_RENDER_SIDE = 4000;
const RENDER_SCALE = 3;

const theme = {
  badge: 'bg-fuchsia-100 text-fuchsia-700',
  linkHover: 'hover:text-fuchsia-700 hover:border-fuchsia-300',
};

const fieldClass =
  'w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-fuchsia-200 focus:border-fuchsia-400 disabled:opacity-50';

function safeTerminate(worker) {
  try {
    const result = worker.terminate();
    if (result && typeof result.catch === 'function') result.catch(() => {});
  } catch {
    // worker already gone
  }
}

export default function OcrTool({ faqs }) {
  const [file, setFile] = useState(null);
  const [kind, setKind] = useState('pdf');
  const [previewUrl, setPreviewUrl] = useState('');
  const [pageCount, setPageCount] = useState(0);
  const [language, setLanguage] = useState('eng');
  const [rangeInput, setRangeInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [status, setStatus] = useState('');
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState([]);
  const [withSeparators, setWithSeparators] = useState(false);
  const [wasCancelled, setWasCancelled] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const runIdRef = useRef(0);
  const cancelRef = useRef(false);
  const workerRef = useRef(null);
  const pdfRef = useRef(null);
  const previewUrlRef = useRef('');

  const toolInfo = tools.find((t) => t.id === 'ocr-pdf');

  const fullText = useMemo(() => joinPages(results, withSeparators), [results, withSeparators]);
  const hasAnyText = results.some((r) => r.text.length > 0);

  const disposeEngines = () => {
    const worker = workerRef.current;
    workerRef.current = null;
    if (worker) safeTerminate(worker);
    const pdf = pdfRef.current;
    pdfRef.current = null;
    if (pdf && pdf.destroy) pdf.destroy();
  };

  useEffect(() => {
    return () => {
      runIdRef.current += 1;
      disposeEngines();
      if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current);
    };
  }, []);

  const clearPreview = () => {
    if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current);
    previewUrlRef.current = '';
    setPreviewUrl('');
  };

  const reset = () => {
    runIdRef.current += 1;
    cancelRef.current = true;
    disposeEngines();
    clearPreview();
    setFile(null);
    setPageCount(0);
    setRangeInput('');
    setResults([]);
    setErrorMessage('');
    setWasCancelled(false);
    setIsProcessing(false);
    setStatus('');
    setProgress(0);
  };

  const handleDrop = async (acceptedFiles) => {
    const selected = acceptedFiles[0];
    if (!selected) return;

    const isPdf = selected.type === 'application/pdf' || /\.pdf$/i.test(selected.name);
    const isImage =
      !isPdf &&
      !/svg/i.test(selected.type) &&
      (selected.type.startsWith('image/') || /\.(jpe?g|png|webp|bmp|gif)$/i.test(selected.name));

    if (isHeic(selected)) {
      setErrorMessage('HEIC/HEIF photos are not supported by most browsers. Export the photo as JPG first.');
      return;
    }
    if (!isPdf && !isImage) {
      setErrorMessage('Please choose a PDF or an image file (JPG, PNG, WebP, BMP, GIF).');
      return;
    }

    reset();
    cancelRef.current = false;
    setFile(selected);
    setKind(isPdf ? 'pdf' : 'image');

    if (isImage) {
      const url = URL.createObjectURL(selected);
      previewUrlRef.current = url;
      setPreviewUrl(url);
      return;
    }

    try {
      const pdfjsLib = await loadPdfJs();
      const data = new Uint8Array(await selected.arrayBuffer());
      const pdf = await pdfjsLib.getDocument({ data }).promise;
      setPageCount(pdf.numPages);
      pdf.destroy();
    } catch (err) {
      console.error(err);
      setErrorMessage(
        err && err.name === 'PasswordException'
          ? 'This PDF is password-protected. Please unlock it first, then try again.'
          : err?.message?.includes('PDF engine')
            ? err.message
            : 'Could not read this PDF. The file may be corrupted.'
      );
      setFile(null);
    }
  };

  const cancel = () => {
    cancelRef.current = true;
    runIdRef.current += 1;
    disposeEngines();
    setIsProcessing(false);
    setStatus('');
    setWasCancelled(true);
  };

  const startOcr = async () => {
    if (!file) return;

    let pageList = [1];
    if (kind === 'pdf') {
      const parsed = parsePageRange(rangeInput, pageCount);
      if (parsed.error) {
        setErrorMessage(parsed.error);
        return;
      }
      pageList = parsed.pages;
    }

    const runId = ++runIdRef.current;
    cancelRef.current = false;
    setErrorMessage('');
    setWasCancelled(false);
    setResults([]);
    setProgress(0);
    setIsProcessing(true);

    const total = pageList.length;
    const collected = [];
    let done = 0;

    try {
      setStatus('Loading OCR engine...');
      const Tesseract = await loadTesseract();
      if (runIdRef.current !== runId) return;

      setStatus('Preparing language data (the first run downloads a few MB)...');
      const worker = await Tesseract.createWorker(language, 1, {
        logger: (m) => {
          if (runIdRef.current !== runId) return;
          if (m.status === 'recognizing text') {
            setProgress((done + (m.progress || 0)) / total);
          } else if (typeof m.status === 'string' && m.status.includes('loading language')) {
            setStatus(`Downloading language data... ${Math.round((m.progress || 0) * 100)}%`);
          }
        },
      });
      if (runIdRef.current !== runId) {
        safeTerminate(worker);
        return;
      }
      workerRef.current = worker;

      if (kind === 'pdf') {
        const pdfjsLib = await loadPdfJs();
        const data = new Uint8Array(await file.arrayBuffer());
        const doc = await pdfjsLib.getDocument({ data }).promise;
        if (runIdRef.current !== runId) {
          doc.destroy();
          return;
        }
        pdfRef.current = doc;
      }

      for (let k = 0; k < total; k++) {
        if (runIdRef.current !== runId) return;
        const pageNumber = pageList[k];
        setStatus(total > 1 ? `Recognising page ${k + 1} of ${total}...` : 'Recognising text...');

        let input = file;
        let canvas = null;
        if (kind === 'pdf') {
          const page = await pdfRef.current.getPage(pageNumber);
          const base = page.getViewport({ scale: 1 });
          const scale = Math.min(RENDER_SCALE, MAX_RENDER_SIDE / Math.max(base.width, base.height));
          const viewport = page.getViewport({ scale });
          canvas = document.createElement('canvas');
          canvas.width = Math.ceil(viewport.width);
          canvas.height = Math.ceil(viewport.height);
          await page.render({ canvasContext: canvas.getContext('2d'), viewport }).promise;
          page.cleanup();
          input = canvas;
        }

        const { data } = await worker.recognize(input);
        if (canvas) {
          canvas.width = 0;
          canvas.height = 0;
        }
        if (runIdRef.current !== runId) return;

        collected.push({ pageNumber, text: (data.text || '').trim() });
        done += 1;
        setProgress(done / total);
        setResults([...collected]);
      }
    } catch (err) {
      if (runIdRef.current !== runId) return;
      console.error(err);
      setErrorMessage(
        err?.message?.includes('OCR engine')
          ? err.message
          : 'OCR failed. Check your internet connection (the language data must download once) and try again.'
      );
    } finally {
      if (runIdRef.current === runId) {
        disposeEngines();
        setIsProcessing(false);
        setStatus('');
      }
    }
  };

  const seo = {
    howTo: {
      title: 'How to Convert a Scanned PDF or Image to Text',
      subtitle: 'Run OCR on scans and photos in three simple steps.',
      steps: [
        { title: 'Add a PDF or Image', text: 'Drop a scanned PDF, or a JPG, PNG or WebP photo of a document.' },
        {
          title: 'Choose the Language',
          text: 'Pick the language of the text, or a combination such as Arabic + English. For PDFs you can also limit the pages.',
        },
        { title: 'Copy or Download', text: 'Wait while the text is recognised, then copy it or save it as a .txt file.' },
      ],
    },
    why: {
      title: 'Why Use Our Online OCR?',
      items: [
        {
          icon: ShieldCheck,
          iconClass: 'text-green-500',
          title: 'Your Documents Stay on Your Device',
          text: 'Recognition runs in your browser. Your file is never uploaded to a server.',
        },
        {
          icon: Languages,
          iconClass: 'text-fuchsia-600',
          title: 'Arabic, French, English and More',
          text: 'Over a dozen languages, including mixed-language options for bilingual documents.',
        },
        {
          icon: Zap,
          iconClass: 'text-yellow-500',
          title: 'Free, No Signup, No Page Limit',
          text: 'No account, no watermark and no daily quota. You can choose just the pages you need.',
        },
        {
          icon: Sparkles,
          iconClass: 'text-blue-500',
          title: 'Works on PDFs and Photos',
          text: 'Handles multi-page scanned PDFs as well as single photos of papers, receipts and notes.',
        },
      ],
    },
    uses: {
      title: 'What Is OCR Useful For?',
      items: [
        { title: 'Scanned Documents', text: 'Make the text in old scans and printed papers copyable and editable.' },
        { title: 'Photos of Notes and Boards', text: 'Turn a photo of handouts, slides or a whiteboard into text.' },
        { title: 'Receipts and Invoices', text: 'Pull the wording and figures from a photographed receipt.' },
        { title: 'Printed Books and Articles', text: 'Capture quotes from printed pages without retyping them.' },
      ],
    },
    related: [
      { href: '/pdf-to-text', label: 'PDF to Text' },
      { href: '/image-to-pdf', label: 'Image to PDF' },
      { href: '/pdf-to-jpg', label: 'PDF to JPG' },
      { href: '/compress-pdf', label: 'Compress PDF' },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6">
      <div className="text-center mb-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
          OCR PDF & Image to Text – Free Online OCR
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {toolInfo?.description || 'Recognise text in scanned PDFs and images, right in your browser.'}
        </p>
      </div>

      {errorMessage && (
        <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 flex items-center space-x-3">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span className="text-sm font-medium">{errorMessage}</span>
        </div>
      )}

      {!file ? (
        <Dropzone
          onDrop={handleDrop}
          multiple={false}
          accept={ACCEPT}
          text="Drag & drop a scanned PDF or image here"
        />
      ) : (
        <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-200">
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
            <div className="flex items-center space-x-3 overflow-hidden">
              <FileText className="w-8 h-8 text-fuchsia-500 shrink-0" />
              <div>
                <h2 className="text-xl font-bold text-gray-800 truncate max-w-xs sm:max-w-md">{file.name}</h2>
                <p className="text-sm text-gray-500">
                  {formatSize(file.size)}
                  {kind === 'pdf' && pageCount > 0 && ` · ${pageCount} ${pageCount === 1 ? 'page' : 'pages'}`}
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

          {kind === 'image' && previewUrl && (
            <div className="mb-6 flex justify-center bg-gray-50 border border-gray-100 rounded-2xl p-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={previewUrl} alt="Preview of the selected image" className="max-h-48 object-contain rounded-lg" />
            </div>
          )}

          <div className={`grid gap-4 mb-6 ${kind === 'pdf' && pageCount > 1 ? 'sm:grid-cols-2' : 'grid-cols-1'}`}>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5" htmlFor="ocr-lang">
                Language of the text
              </label>
              <select
                id="ocr-lang"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                disabled={isProcessing}
                className={fieldClass}
              >
                {LANGUAGES.map((l) => (
                  <option key={l.code} value={l.code}>
                    {l.label}
                  </option>
                ))}
              </select>
            </div>
            {kind === 'pdf' && pageCount > 1 && (
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5" htmlFor="ocr-range">
                  Pages to read (optional)
                </label>
                <input
                  id="ocr-range"
                  type="text"
                  value={rangeInput}
                  onChange={(e) => setRangeInput(e.target.value)}
                  disabled={isProcessing}
                  placeholder={`All ${pageCount} pages, or e.g. 1-3, 5`}
                  className={fieldClass}
                />
              </div>
            )}
          </div>

          {isProcessing ? (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2 gap-3">
                <p className="text-sm font-semibold text-gray-700">{status || 'Working...'}</p>
                <button
                  type="button"
                  onClick={cancel}
                  className="inline-flex items-center space-x-1 text-sm font-semibold text-gray-600 hover:text-red-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                  <span>Cancel</span>
                </button>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-fuchsia-500 transition-all"
                  style={{ width: `${Math.max(4, Math.round(progress * 100))}%` }}
                />
              </div>
              <p className="text-xs text-gray-400 mt-2">
                OCR runs on your device and usually takes a few seconds per page.
              </p>
            </div>
          ) : (
            <button
              type="button"
              onClick={startOcr}
              disabled={kind === 'pdf' && pageCount === 0}
              className="w-full py-4 rounded-2xl font-bold text-white text-lg bg-fuchsia-600 hover:bg-fuchsia-700 shadow-md transition-all disabled:bg-fuchsia-300 disabled:cursor-not-allowed"
            >
              {results.length > 0 ? 'Run OCR Again' : 'Recognise Text'}
            </button>
          )}

          {wasCancelled && !isProcessing && (
            <p className="mt-4 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-xl p-3">
              OCR was cancelled.{results.length > 0 ? ' The pages finished so far are shown below.' : ''}
            </p>
          )}

          {results.length > 0 && !hasAnyText && !isProcessing && (
            <p className="mt-6 text-sm text-amber-900 bg-amber-50 border border-amber-200 rounded-xl p-4">
              No text was recognised. Try a different language, or use a sharper, straighter and better-lit scan.
            </p>
          )}

          {results.length > 0 && hasAnyText && (
            <div className="mt-8">
              <label className="flex items-center space-x-2 mb-4 text-sm text-gray-700 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={withSeparators}
                  onChange={(e) => setWithSeparators(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 accent-fuchsia-600"
                />
                <span>Add a separator line before each page</span>
              </label>
              <TextOutput
                text={fullText}
                filename={`${baseName(file.name)}-ocr.txt`}
                primaryClass="bg-fuchsia-600 hover:bg-fuchsia-700"
              />
            </div>
          )}
        </div>
      )}

      <ToolSeoContent theme={theme} howTo={seo.howTo} why={seo.why} uses={seo.uses} faqs={faqs} related={seo.related} />
    </div>
  );
}