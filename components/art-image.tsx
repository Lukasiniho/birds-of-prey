import { preload } from 'react-dom';
import { imageSrcSet } from '@/lib/optimized-images';

type ArtImageProps = Omit<
  React.ImgHTMLAttributes<HTMLImageElement>,
  'src' | 'srcSet' | 'sizes' | 'width' | 'height'
> & {
  src: string;
  alt: string;
  /** Intrinsic aspect of the artwork, used to reserve layout space. */
  width: number;
  height: number;
  /**
   * The widest this image is ever painted, in CSS pixels. The browser scales
   * it by the device pixel ratio and picks the smallest encode that still
   * covers the result, so a 72px tile stops downloading a 1400px bird.
   * Leave it unset for images whose width tracks the viewport and pass
   * `sizes` instead.
   */
  displayWidth?: number;
  /** A full CSS `sizes` list, for images that resize with the viewport. */
  sizes?: string;
  /** Preload and decode eagerly. For above-the-fold artwork only. */
  priority?: boolean;
};

/**
 * The site's images are pre-encoded to a fixed ladder of widths at build time
 * rather than resized on demand, because the Netlify deploy is a static export
 * with no image server behind it. This renders a plain <img> pointing at that
 * ladder; `next/image` was only ever used here in `unoptimized` mode, where it
 * drops the `sizes` attribute and so cannot express any of this.
 */
export function ArtImage({
  src,
  alt,
  width,
  height,
  displayWidth,
  sizes,
  priority,
  ...rest
}: ArtImageProps) {
  const candidates = imageSrcSet(src, displayWidth);
  const resolvedSizes = sizes ?? candidates.sizes;
  if (priority)
    preload(candidates.src, {
      as: 'image',
      imageSrcSet: candidates.srcSet,
      imageSizes: resolvedSizes,
      fetchPriority: 'high',
    });
  return (
    // The deploy is a static export with no image server, and next/image drops
    // `sizes` in the `unoptimized` mode a static export forces. The build-time
    // ladder does the same job, so the bare element is the point here.
    // eslint-disable-next-line next/no-img-element
    <img
      src={candidates.src}
      srcSet={candidates.srcSet}
      sizes={resolvedSizes}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : undefined}
      decoding="async"
      {...rest}
    />
  );
}
