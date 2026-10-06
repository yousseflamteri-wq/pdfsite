import { PDFDocument, degrees } from 'pdf-lib';

// pages: [{ index: <0-based page index in the source PDF>, rotation: <extra degrees, multiple of 90> }]
// The order of the array is the order of the output document.
export async function buildOrganizedPdf(arrayBuffer, pages) {
  const src = await PDFDocument.load(arrayBuffer);
  const out = await PDFDocument.create();
  const copied = await out.copyPages(src, pages.map((p) => p.index));

  copied.forEach((page, i) => {
    const base = page.getRotation().angle || 0;
    const extra = pages[i].rotation || 0;
    page.setRotation(degrees((((base + extra) % 360) + 360) % 360));
    out.addPage(page);
  });

  return out.save();
}