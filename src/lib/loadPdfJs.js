const PDFJS_VERSION = '3.11.174';
const BASE = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS_VERSION}`;

let pdfJsPromise = null;

export function loadPdfJs() {
  if (typeof window === 'undefined') {
    return Promise.reject(new Error('pdf.js can only be loaded in the browser'));
  }
  if (window.pdfjsLib) return Promise.resolve(window.pdfjsLib);
  if (pdfJsPromise) return pdfJsPromise;

  pdfJsPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = `${BASE}/pdf.min.js`;
    script.onload = () => {
      window.pdfjsLib.GlobalWorkerOptions.workerSrc = `${BASE}/pdf.worker.min.js`;
      resolve(window.pdfjsLib);
    };
    script.onerror = () => {
      pdfJsPromise = null;
      reject(new Error('Could not load the PDF engine. Check your internet connection and try again.'));
    };
    document.head.appendChild(script);
  });
  return pdfJsPromise;
}