import { preyCatalog } from '@/lib/diets';
import { ArtImage } from '@/components/art-image';
import { Bone, Bug } from '@/components/icons';
import { preyFraming } from '@/lib/prey-framing';
import { imageSource } from '@/lib/optimized-images';
export function PreyArt({ preyKey }: { preyKey: string }) {
  const frame = preyFraming[preyKey];
  if (!frame && !preyCatalog[preyKey]?.icon) return null;
  if (!frame)
    return (
      <span className="prey-symbol">
        {preyCatalog[preyKey].icon === 'bug' ? (
          <Bug aria-hidden="true" />
        ) : (
          <Bone aria-hidden="true" />
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
    <span className="prey-image framed-prey">
      <span
        className="prey-crop"
        style={{
          width: `${(frame.width / size) * 100}%`,
          height: `${(frame.height / size) * 100}%`,
        }}
      >
        <ArtImage
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
