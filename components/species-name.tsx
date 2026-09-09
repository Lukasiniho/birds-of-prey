import type { HTMLAttributes, ReactNode } from 'react';

type NameProps = HTMLAttributes<HTMLElement> & {
  as?: 'span' | 'strong' | 'h1' | 'h2' | 'h3' | 'p' | 'i' | 'em' | 'small';
};

export function SpeciesCommonName({
  as: Tag = 'span',
  className = '',
  ...props
}: NameProps) {
  return (
    <Tag
      {...props}
      data-species-name="common"
      className={`species-common-name ${className}`}
    />
  );
}

export function SpeciesScientificName({
  as: Tag = 'i',
  className = '',
  ...props
}: NameProps) {
  return (
    <Tag
      {...props}
      data-species-name="scientific"
      className={`species-scientific-name ${className}`}
    />
  );
}

/** One name pair everywhere; callers choose semantics, never a different size. */
export function SpeciesName({
  name,
  latin,
  commonAs = 'span',
  scientificAs = 'i',
  animated = false,
}: {
  name: ReactNode;
  latin: ReactNode;
  commonAs?: NameProps['as'];
  scientificAs?: NameProps['as'];
  animated?: boolean;
}) {
  return (
    <>
      <SpeciesCommonName
        as={commonAs}
        className={animated ? 't-stagger-line t-stagger-line--1' : ''}
      >
        {name}
      </SpeciesCommonName>
      <SpeciesScientificName
        as={scientificAs}
        className={animated ? 't-stagger-line t-stagger-line--2' : ''}
      >
        {latin}
      </SpeciesScientificName>
    </>
  );
}
