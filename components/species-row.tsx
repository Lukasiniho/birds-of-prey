import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { ArtImage } from '@/components/art-image';
import { SpeciesName } from '@/components/species-name';

/**
 * The one size a species portrait is painted at in a row, in CSS pixels.
 * Mirrors `--species-row-portrait`; the image ladder needs it as a number.
 */
export const SPECIES_ROW_PORTRAIT = 56;

/** The row portrait as a file: knowledge pages and every list built from art. */
export function SpeciesRowPortrait({ src }: { src: string }) {
  return (
    <ArtImage
      className="species-row-portrait"
      src={src}
      alt=""
      width={SPECIES_ROW_PORTRAIT}
      height={SPECIES_ROW_PORTRAIT}
      displayWidth={SPECIES_ROW_PORTRAIT}
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
}: SpeciesRowProps) {
  return (
    <>
      {typeof portrait === 'string' ? (
        <SpeciesRowPortrait src={portrait} />
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
  className = '',
  ...props
}: SpeciesRowProps & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a {...props} className={`species-row ${className}`}>
      <SpeciesRowContent
        portrait={portrait}
        name={name}
        latin={latin}
        trailing={trailing}
      />
    </a>
  );
}
