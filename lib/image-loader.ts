type DecodableImage = {
  src: string;
  decoding: string;
  decode(): Promise<void>;
};

export function createImageLoader(factory: () => DecodableImage, limit = 12) {
  const pending = new Map<string, Promise<void>>();
  return (src: string): Promise<void> => {
    const cached = pending.get(src);
    if (cached) return cached;
    const image = factory();
    image.decoding = 'async';
    image.src = src;
    const promise = image.decode().catch((error: unknown) => {
      if (pending.get(src) === promise) pending.delete(src);
      throw error;
    });
    pending.set(src, promise);
    if (pending.size > limit) pending.delete(pending.keys().next().value!);
    return promise;
  };
}

// Construct browser images only when called, never during static rendering.
export const loadImage = createImageLoader(() => new window.Image());
