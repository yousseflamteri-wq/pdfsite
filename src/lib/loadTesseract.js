const TESSERACT_VERSION = '7.0.0';

let tesseractPromise = null;

export function loadTesseract() {
  if (typeof window === 'undefined') {
    return Promise.reject(new Error('OCR can only run in the browser'));
  }
  if (window.Tesseract) return Promise.resolve(window.Tesseract);
  if (tesseractPromise) return tesseractPromise;

  tesseractPromise = new Promise((resolve, reject) => {
    const fail = () => {
      tesseractPromise = null;
      reject(new Error('Could not load the OCR engine. Check your internet connection and try again.'));
    };
    const script = document.createElement('script');
    script.src = `https://cdn.jsdelivr.net/npm/tesseract.js@${TESSERACT_VERSION}/dist/tesseract.min.js`;
    script.onload = () => (window.Tesseract ? resolve(window.Tesseract) : fail());
    script.onerror = fail;
    document.head.appendChild(script);
  });
  return tesseractPromise;
}