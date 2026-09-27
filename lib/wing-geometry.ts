import { imageSrcSet } from '@/lib/optimized-images';

/** Wing tips of a flight illustration, in the pixels of its analysed copy. */
export type WingGeometry = {
  width: number;
  height: number;
  /** Lower-left wing tip. */
  a: [number, number];
  /** Upper-right wing tip. */
  b: [number, number];
};

/* Every flight image shares one pose: head left, wing axis from lower left to
   upper right (docs/vogelbild-standard.md). Projecting the opaque pixels onto
   that diagonal finds both tips without per-image data; the second-smallest
   encode is sharp enough and costs a few milliseconds. */
const cache = new Map<string, Promise<WingGeometry | null>>();

export function wingGeometry(src: string) {
  const cached = cache.get(src);
  if (cached) return cached;
  const promise = measure(src).catch(() => null);
  cache.set(src, promise);
  return promise;
}

async function measure(src: string): Promise<WingGeometry | null> {
  const ladder = imageSrcSet(src).srcSet?.split(', ') ?? [];
  const url = (ladder[1] ?? ladder[0])?.split(' ')[0] ?? src;
  const image = new window.Image();
  image.decoding = 'async';
  image.src = url;
  await image.decode();
  const { naturalWidth: width, naturalHeight: height } = image;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext('2d', { willReadFrequently: true });
  if (!context) return null;
  context.drawImage(image, 0, 0);
  const alpha = context.getImageData(0, 0, width, height).data;
  let low = Infinity;
  let high = -Infinity;
  let a: [number, number] = [0, 0];
  let b: [number, number] = [0, 0];
  for (let y = 0; y < height; y++)
    for (let x = 0; x < width; x++) {
      // Feather tips fade out; only solid pixels count as the tip.
      if (alpha[(y * width + x) * 4 + 3] < 160) continue;
      const along = x - y;
      if (along < low) [low, a] = [along, [x, y]];
      if (along > high) [high, b] = [along, [x, y]];
    }
  return low === Infinity ? null : { width, height, a, b };
}

/** Distance between the tips, in analysed pixels. */
export function tipDistance(geometry: WingGeometry) {
  return Math.hypot(
    geometry.b[0] - geometry.a[0],
    geometry.b[1] - geometry.a[1],
  );
}
