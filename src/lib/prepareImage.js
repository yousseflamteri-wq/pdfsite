const MAX_SIDE = 4500;

export async function prepareImage(file) {
  const url = URL.createObjectURL(file);
  try {
    const img = await new Promise((resolve, reject) => {
      const el = new Image();
      el.onload = () => resolve(el);
      el.onerror = () =>
        reject(new Error(`Could not read "${file.name}". Its format may not be supported by your browser.`));
      el.src = url;
    });

    const naturalW = img.naturalWidth || img.width;
    const naturalH = img.naturalHeight || img.height;
    if (!naturalW || !naturalH) throw new Error(`"${file.name}" appears to be empty or corrupted.`);

    const scale = Math.min(1, MAX_SIDE / Math.max(naturalW, naturalH));
    const width = Math.max(1, Math.round(naturalW * scale));
    const height = Math.max(1, Math.round(naturalH * scale));

    const keepPng = file.type === 'image/png' || /\.png$/i.test(file.name);

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!keepPng) {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, width, height);
    }
    ctx.drawImage(img, 0, 0, width, height);

    const blob = await new Promise((resolve) =>
      canvas.toBlob(resolve, keepPng ? 'image/png' : 'image/jpeg', 0.95)
    );
    canvas.width = 0;
    canvas.height = 0;
    if (!blob) throw new Error(`Could not process "${file.name}".`);

    return {
      bytes: new Uint8Array(await blob.arrayBuffer()),
      kind: keepPng ? 'png' : 'jpg',
      width,
      height,
    };
  } finally {
    URL.revokeObjectURL(url);
  }
}

export function isSupportedImage(file) {
  if (/\.(heic|heif)$/i.test(file.name) || /image\/hei[cf]/i.test(file.type)) return false;
  if (/svg/i.test(file.type) || /\.svg$/i.test(file.name)) return false;
  return (file.type && file.type.startsWith('image/')) || /\.(jpe?g|png|webp|bmp|gif|avif)$/i.test(file.name);
}

export function isHeic(file) {
  return /\.(heic|heif)$/i.test(file.name) || /image\/hei[cf]/i.test(file.type);
}