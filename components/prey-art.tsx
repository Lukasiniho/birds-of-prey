import { preyCatalog } from '@/lib/diets';
import Image from 'next/image';
import { Bone, Bug } from 'lucide-react';
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
  return (
    <span className="prey-image framed-prey">
      <span
        className="prey-crop"
        style={{
          width: `${(frame.width / size) * 100}%`,
          height: `${(frame.height / size) * 100}%`,
        }}
      >
        <Image
          src={imageSource(frame.src)}
          alt=""
          width={frame.imageWidth}
          height={frame.imageHeight}
          unoptimized
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
