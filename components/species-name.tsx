import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

type NameVariant = 'standard' | 'big' | 'atlas-title' | 'quiz' | 'detail';

// These roles follow the component through portals and nested button labels.
const nameType =
  'font-(family-name:--font-stack-display) leading-(--leading-heading) tracking-(--tracking-normal) hyphens-auto wrap-anywhere';
const commonVariants: Record<NameVariant, string> = {
  standard: 'text-(length:--type-species-common)',
  /* Eine Stufe über der Listenzeile: für Kopfzeilen, die einen Namen tragen,
   * aber nicht die Bühne sind. Beide Zeilen steigen gemeinsam, damit das Paar
   * seine Proportion behält. */
  big: 'text-(length:--type-heading)',
  detail: 'text-(length:--type-species-big)',
  quiz: 'text-(length:--type-species-quiz) font-(--weight-bold)',
  'atlas-title':
    'text-(length:--type-hero) text-balance wrap-normal font-(--weight-label-heading) leading-(--leading-display) tracking-(--tracking-tight)',
};
const scientificVariants: Record<NameVariant, string> = {
  standard: 'text-(length:--type-scientific)',
  big: 'text-(length:--type-label-title)',
  detail: 'text-(length:--type-scientific)',
  quiz: 'text-(length:--type-scientific-quiz)',
  'atlas-title':
    'text-[length:max(var(--text-xl),calc(var(--type-hero)*0.5))] font-(--weight-regular) leading-(--leading-display) text-(--muted-foreground-stage) -mt-[0.15em]',
};

type NameProps = HTMLAttributes<HTMLElement> & {
  variant?: NameVariant;
  as?: 'span' | 'strong' | 'h1' | 'h2' | 'h3' | 'p' | 'i' | 'em' | 'small';
};

/* Die Zeilenhöhe steht hart am Element, nicht als Utility: sonst erbt das
 * Namenspaar die Zeilenhöhe seines Kastens — in einer Listenzeile 1.5, in
 * einem Dialogtitel 1 — und der lateinische Name sitzt je nach Ort anders
 * weit unter dem deutschen. */
const nameLeading = (variant: NameVariant) => ({
  lineHeight:
    variant === 'atlas-title'
      ? 'var(--leading-display)'
      : 'var(--leading-heading)',
});

export function SpeciesCommonName({
  as: Tag = 'span',
  className = '',
  variant = 'standard',
  style,
  ...props
}: NameProps) {
  return (
    <Tag
      {...props}
      style={{
        ...nameLeading(variant),
        // Wie die Zeilenhöhe hart am Element. Die große Variante liegt eine
        // Stufe über den übrigen, die auf dem Gewicht aller
        // Beschriftungsüberschriften bleiben.
        fontWeight:
          variant === 'big'
            ? 'var(--weight-bold)'
            : 'var(--weight-label-heading)',
        ...style,
      }}
      data-species-name="common"
      data-name-variant={variant}
      className={cn(
        className,
        'species-common-name',
        nameType,
        'font-(--weight-label-heading) not-italic text-foreground',
        commonVariants[variant],
      )}
    />
  );
}

export function SpeciesScientificName({
  as: Tag = 'i',
  className = '',
  variant = 'standard',
  style,
  ...props
}: NameProps) {
  return (
    <Tag
      {...props}
      style={{ ...nameLeading(variant), ...style }}
      data-species-name="scientific"
      data-name-variant={variant}
      className={cn(
        className,
        'species-scientific-name',
        nameType,
        'block font-(--weight-medium) italic text-muted-foreground -mt-[0.1em]',
        scientificVariants[variant],
      )}
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
