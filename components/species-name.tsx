import type { HTMLAttributes, ReactNode } from 'react';

type NameVariant = 'standard' | 'atlas-title' | 'sidebar' | 'quiz' | 'knowledge';

type NameProps = HTMLAttributes<HTMLElement> & {
  variant?: NameVariant;
  as?: 'span' | 'strong' | 'h1' | 'h2' | 'h3' | 'p' | 'i' | 'em' | 'small';
};

export function SpeciesCommonName({
  as: Tag = 'span',
  className = '',
  variant = 'standard',
  ...props
}: NameProps) {
  return (
    <Tag
      {...props}
      data-species-name="common"
      data-name-variant={variant}
      className={`species-common-name ${className}`}
    />
  );
}

export function SpeciesScientificName({
  as: Tag = 'i',
  className = '',
  variant = 'standard',
  ...props
}: NameProps) {
  return (
    <Tag
      {...props}
      data-species-name="scientific"
      data-name-variant={variant}
      className={`species-scientific-name ${className}`}
    />
  );
}

/** Shared names with explicit editorial roles; no arbitrary local sizes. */
export function SpeciesName({
  name,
  latin,
  commonAs = 'span',
  scientificAs = 'i',
  animated = false,
  variant = 'standard',
}: {
  name: ReactNode;
  latin: ReactNode;
  commonAs?: NameProps['as'];
  scientificAs?: NameProps['as'];
  animated?: boolean;
  variant?: NameVariant;
}) {
  return (
    <>
      <SpeciesCommonName
        as={commonAs}
        variant={variant}
        className={animated ? 't-stagger-line t-stagger-line--1' : ''}
      >
        {name}
      </SpeciesCommonName>
      <SpeciesScientificName
        as={scientificAs}
        variant={variant}
        className={animated ? 't-stagger-line t-stagger-line--2' : ''}
      >
        {latin}
      </SpeciesScientificName>
    </>
  );
}
