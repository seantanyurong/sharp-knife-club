/**
 * Client-side image compression.
 *
 * Resizes the image so its longest side is at most MAX_DIMENSION pixels and
 * re-encodes as JPEG at the given quality.  This runs in the browser *before*
 * upload, so the server never has to handle phone-camera 12MP originals.
 *
 * @returns a new File object suitable for FormData.
 */
export const MAX_DIMENSION = 1600;
export const JPEG_QUALITY = 0.82;

export async function compressImage(file: File): Promise<File> {
  // Skip compression for files already under 500 KB — not worth the decode cycle.
  if (file.size < 500_000) return file;

  const bitmap = await createImageBitmap(file);

  const { width, height } = clampDimensions(
    bitmap.width,
    bitmap.height,
    MAX_DIMENSION,
  );

  // Only re-encode if the image actually needs shrinking.
  if (width === bitmap.width && height === bitmap.height) {
    bitmap.close();
    return file;
  }

  const canvas = new OffscreenCanvas(width, height);
  const ctx = canvas.getContext('2d')!;
  ctx.drawImage(bitmap, 0, 0, width, height);
  bitmap.close();

  const blob = await canvas.convertToBlob({ type: 'image/jpeg', quality: JPEG_QUALITY });
  const name = file.name.replace(/\.[^.]+$/, '.jpg');

  return new File([blob], name, { type: 'image/jpeg' });
}

function clampDimensions(
  w: number,
  h: number,
  max: number,
): { width: number; height: number } {
  if (w <= max && h <= max) return { width: w, height: h };

  const ratio = Math.min(max / w, max / h);
  return {
    width: Math.round(w * ratio),
    height: Math.round(h * ratio),
  };
}