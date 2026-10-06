import { PDFDocument } from 'pdf-lib';

export const PAGE_SIZES = {
  a4: [595.28, 841.89],
  letter: [612, 792],
};

export const MARGINS = { none: 0, small: 24, big: 48 };

export function computePlacement({ imgW, imgH, pageSize = 'fit', orientation = 'auto', margin = 0 }) {
  if (pageSize === 'fit' || !PAGE_SIZES[pageSize]) {
    return { pageW: imgW + margin * 2, pageH: imgH + margin * 2, x: margin, y: margin, w: imgW, h: imgH };
  }

  let [pw, ph] = PAGE_SIZES[pageSize];
  const landscape = orientation === 'landscape' || (orientation === 'auto' && imgW > imgH);
  if (landscape) [pw, ph] = [ph, pw];

  const scale = Math.min((pw - margin * 2) / imgW, (ph - margin * 2) / imgH);
  const w = imgW * scale;
  const h = imgH * scale;
  return { pageW: pw, pageH: ph, x: (pw - w) / 2, y: (ph - h) / 2, w, h };
}

// images: [{ bytes: Uint8Array, kind: 'jpg' | 'png', width, height }]
export async function buildPdfFromImages(images, options = {}) {
  const pdfDoc = await PDFDocument.create();

  for (const img of images) {
    const embedded = img.kind === 'png' ? await pdfDoc.embedPng(img.bytes) : await pdfDoc.embedJpg(img.bytes);
    const p = computePlacement({ imgW: img.width, imgH: img.height, ...options });
    const page = pdfDoc.addPage([p.pageW, p.pageH]);
    page.drawImage(embedded, { x: p.x, y: p.y, width: p.w, height: p.h });
  }

  return pdfDoc.save();
}