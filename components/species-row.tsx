import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { ArtImage } from '@/components/art-image';
import { SpeciesName } from '@/components/species-name';

/**
 * Two sizes, both roles, no third: `rail` is a list the reader is picking
 * from, where the portrait is the thing being chosen; `inline` is a list
 * sitting inside prose, where the portrait illustrates a name the text
 * already introduced. The numbers mirror `--species-row-portrait`, because
 * the image ladder needs them as numbers.
 */
export type SpeciesRowSize = 'rail' | 'inline';
export const SPECIES_ROW_PORTRAIT: Record<SpeciesRowSize, number> = {
  rail: 64,
  inline: 48,
};

/** The row portrait as a file: knowledge pages and every list built from art. */
export function SpeciesRowPortrait({
  src,
  size = 'rail',
}: {
  src: string;
  size?: SpeciesRowSize;
}) {
  const painted = SPECIES_ROW_PORTRAIT[size];
  return (
    <ArtImage
      className="species-row-portrait"
      src={src}
      alt=""
      width={painted}
      height={painted}
      displayWidth={painted}
    />
  );
}

type SpeciesRowProps = {
  /** An image source, or a ready-made portrait node (the atlas rail paints
   *  its portrait as a background so a species swap cannot flash). */
  portrait: ReactNode;
  name: ReactNode;
  latin: ReactNode;
  /** Sits at the row's end: the link arrow, a selection mark. */
  trailing?: ReactNode;
  size?: SpeciesRowSize;
};

/**
 * Portrait, name pair and trailing mark — the inside of every species row.
 * The caller owns the interactive element and gives it `.species-row`, so a
 * link, a sidebar button and a plain list item all read the same.
 */
export function SpeciesRowContent({
  portrait,
  name,
  latin,
  trailing,
  size = 'rail',
}: SpeciesRowProps) {
  return (
    <>
      {typeof portrait === 'string' ? (
        <SpeciesRowPortrait src={portrait} size={size} />
      ) : (
        portrait
      )}
      <span className="species-row-name">
        <SpeciesName
          name={name}
          latin={latin}
          commonAs="strong"
          scientificAs="i"
        />
      </span>
      {trailing}
    </>
  );
}

/** The link form of the row, used wherever a row navigates to a species page. */
export function SpeciesRowLink({
  portrait,
  name,
  latin,
  trailing,
  size = 'rail',
  className = '',
  ...props
}: SpeciesRowProps & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a {...props} data-size={size} className={`species-row ${className}`}>
      <SpeciesRowContent
        portrait={portrait}
        name={name}
        latin={latin}
        trailing={trailing}
        size={size}
      />
    </a>
  );
}
