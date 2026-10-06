export function itemsToText(items) {
  let out = '';
  let prev = null;
  let pendingEol = false;

  for (const item of items) {
    if (typeof item.str !== 'string') continue;

    if (item.str === '') {
      if (item.hasEOL) pendingEol = true;
      continue;
    }

    const x = item.transform[4];
    const y = item.transform[5];
    const size = Math.abs(item.transform[3]) || item.height || 10;

    if (prev) {
      const dy = Math.abs(y - prev.y);
      const newLine = pendingEol || dy > Math.max(2, prev.size * 0.6);

      if (newLine) {
        out += '\n';
        if (dy > prev.size * 2.2) out += '\n';
      } else {
        const gap = x - (prev.x + prev.width);
        if (gap > prev.size * 0.15 && !/\s$/.test(out) && !/^\s/.test(item.str)) out += ' ';
      }
    }

    out += item.str;
    pendingEol = !!item.hasEOL;
    prev = { x, y, width: item.width || 0, size };
  }

  return out
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

export function joinPages(pages, withSeparators) {
  if (!withSeparators) {
    return pages.map((p) => p.text).filter((t) => t.length > 0).join('\n\n');
  }
  return pages.map((p) => `--- Page ${p.pageNumber} ---\n\n${p.text}`).join('\n\n');
}

export function countWords(text) {
  return text.trim() ? text.trim().split(/\s+/).length : 0;
}