import { preyCatalog } from '@/lib/diets';
import { ArtImage } from '@/components/art-image';
import { Bone, Bug } from '@/components/icons';
import { preyFraming } from '@/lib/prey-framing';
import { cn } from '@/lib/utils';
import { imageSource } from '@/lib/optimized-images';
type PreyArtVariant = 'atlas' | 'tile' | 'choice' | 'placed' | 'drag';

const frameSizes: Record<PreyArtVariant, string> = {
  atlas: 'size-[64px] mx-auto mb-2',
  tile: 'size-[72px] min-h-0 mx-0 mb-2',
  choice: 'size-full m-0',
  placed: 'size-[28px] min-h-0 m-0',
  drag: 'size-[80px] m-0',
};
const symbolSizes: Record<PreyArtVariant, string> = {
  atlas: 'size-full min-h-[50px]',
  tile: 'size-[72px] min-h-0 mb-2',
  choice: 'size-full min-h-[50px] m-0',
  placed: 'size-[28px] min-h-0 m-0',
  drag: 'size-[80px] min-h-[50px] m-0',
};

/** The same crop and icon sizing in the atlas, knowledge tiles and quiz. */
export function PreyArt({
  preyKey,
  variant = 'atlas',
}: {
  preyKey: string;
  variant?: PreyArtVariant;
}) {
  const frame = preyFraming[preyKey];
  if (!frame && !preyCatalog[preyKey]?.icon) return null;
  if (!frame)
    return (
      <span
        className={cn(
          'prey-symbol text-muted-foreground grid place-items-center',
          symbolSizes[variant],
        )}
      >
        {preyCatalog[preyKey].icon === 'bug' ? (
          <Bug size={variant === 'placed' ? 24 : 46} aria-hidden="true" />
        ) : (
          <Bone size={variant === 'placed' ? 24 : 46} aria-hidden="true" />
        )}
      </span>
    );
  const size = Math.max(frame.width, frame.height);
  // The crop zooms into the source, so the <img> is painted much wider than
  // the tile that shows it — an atlas cell fills a 130px tile from a 300px
  // slice of a 1254px sheet. Scale the tile by that factor to ask for the
  // resolution the crop actually needs.
  const displayWidth = Math.ceil((130 * frame.imageWidth) / frame.width);
  return (
    <span
      className={cn(
        'prey-image framed-prey relative flex justify-center aspect-square p-0 max-w-full',
        preyKey === 'fisch' ? 'items-center' : 'items-end',
        frameSizes[variant],
      )}
    >
      <span
        className="prey-crop relative block overflow-hidden flex-none"
        style={{
          width: `${(frame.width / size) * 100}%`,
          height: `${(frame.height / size) * 100}%`,
        }}
      >
        <ArtImage
          className="absolute block"
          src={imageSource(frame.src)}
          alt=""
          width={frame.imageWidth}
          height={frame.imageHeight}
          displayWidth={displayWidth}
          style={{
            width: `${(frame.imageWidth / frame.width) * 100}%`,
            maxWidth: 'none',
            height: 'auto',
            left: `${(-frame.x / frame.width) * 100}%`,
            top: `${(-frame.y / frame.height) * 100}%`,
          }}
        />
      </span>
    </span>
  );
}
