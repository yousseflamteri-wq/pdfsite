import { PDFDocument, StandardFonts, rgb, degrees } from 'pdf-lib';

export const NUMBER_FORMATS = [
  { id: 'plain', label: '1, 2, 3', build: (n) => `${n}` },
  { id: 'page', label: 'Page 1, Page 2', build: (n) => `Page ${n}` },
  { id: 'page-of', label: 'Page 1 of 10', build: (n, last) => `Page ${n} of ${last}` },
  { id: 'slash', label: '1 / 10', build: (n, last) => `${n} / ${last}` },
  { id: 'dashes', label: '- 1 -', build: (n) => `- ${n} -` },
];

export const TEXT_COLORS = {
  black: rgb(0, 0, 0),
  gray: rgb(0.35, 0.35, 0.35),
  blue: rgb(0.15, 0.39, 0.92),
};

export function buildLabel(formatId, number, lastNumber) {
  const fmt = NUMBER_FORMATS.find((f) => f.id === formatId) || NUMBER_FORMATS[0];
  return fmt.build(number, lastNumber);
}

function normalizeRotation(angle) {
  const a = Math.round((angle || 0) / 90) * 90;
  return ((a % 360) + 360) % 360;
}

export function toUserSpace(rotation, W, H, vx, vy) {
  switch (rotation) {
    case 90:
      return { x: W - vy, y: vx };
    case 180:
      return { x: W - vx, y: H - vy };
    case 270:
      return { x: vy, y: H - vx };
    default:
      return { x: vx, y: vy };
  }
}

export async function addPageNumbers(arrayBuffer, options = {}) {
  const {
    position = 'bottom-center',
    formatId = 'plain',
    startPage = 1,
    firstNumber = 1,
    fontSize = 12,
    margin = 30,
    color = 'black',
  } = options;

  const pdfDoc = await PDFDocument.load(arrayBuffer);
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const pages = pdfDoc.getPages();

  const startIdx = Math.min(Math.max(Math.floor(startPage) || 1, 1), pages.length) - 1;
  const numberedCount = pages.length - startIdx;
  const lastNumber = firstNumber + numberedCount - 1;
  const [vPos, hPos] = position.split('-');

  pages.forEach((page, i) => {
    if (i < startIdx) return;

    const number = firstNumber + (i - startIdx);
    const label = buildLabel(formatId, number, lastNumber);

    const rotation = normalizeRotation(page.getRotation().angle);
    const box = page.getCropBox();
    const W = box.width;
    const H = box.height;
    const visualW = rotation % 180 === 0 ? W : H;
    const visualH = rotation % 180 === 0 ? H : W;

    const textWidth = font.widthOfTextAtSize(label, fontSize);
    let vx;
    if (hPos === 'left') vx = margin;
    else if (hPos === 'right') vx = visualW - margin - textWidth;
    else vx = (visualW - textWidth) / 2;
    const vy = vPos === 'top' ? visualH - margin - fontSize * 0.75 : margin;

    const p = toUserSpace(rotation, W, H, vx, vy);
    page.drawText(label, {
      x: box.x + p.x,
      y: box.y + p.y,
      size: fontSize,
      font,
      color: TEXT_COLORS[color] || TEXT_COLORS.black,
      rotate: degrees(rotation),
    });
  });

  return pdfDoc.save();
}