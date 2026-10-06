export function parsePageRange(input, max) {
  const trimmed = (input || '').trim();
  if (!trimmed) {
    return { pages: Array.from({ length: max }, (_, i) => i + 1), error: '' };
  }

  const set = new Set();
  for (const raw of trimmed.split(',')) {
    const part = raw.trim();
    if (!part) continue;
    const m = part.match(/^(\d+)\s*(?:-\s*(\d+))?$/);
    if (!m) return { pages: [], error: `"${part}" is not a valid page or range.` };
    const a = parseInt(m[1], 10);
    const b = m[2] ? parseInt(m[2], 10) : a;
    const lo = Math.min(a, b);
    const hi = Math.max(a, b);
    if (hi < 1 || lo > max) return { pages: [], error: `Page ${part} is outside this document (1-${max}).` };
    for (let p = Math.max(1, lo); p <= Math.min(max, hi); p++) set.add(p);
  }

  const pages = [...set].sort((x, y) => x - y);
  if (pages.length === 0) return { pages: [], error: 'No valid pages selected.' };
  return { pages, error: '' };
}