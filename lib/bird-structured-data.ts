import { birdImage, type BirdSpecies } from './birds';
import { birdFullscreenHref, birdHref, birdTaxonomyHref } from './bird-routes';
import { imageSource } from './optimized-images';
import { SITE_NAME, SITE_URL } from './site';

export type BirdPageKind = 'overview' | 'steckbrief' | 'systematik';

const subpages: Record<
  Exclude<BirdPageKind, 'overview'>,
  { name: string; href: (bird: BirdSpecies) => string }
> = {
  steckbrief: { name: 'Steckbrief', href: birdFullscreenHref },
  systematik: { name: 'Systematik', href: birdTaxonomyHref },
};

/** Schema.org graph for a species page: the page itself, the species it
 * describes and the breadcrumb trail Start › Art › Unterseite. */
export function birdStructuredData(
  bird: BirdSpecies,
  kind: BirdPageKind,
  title: string,
) {
  const overviewUrl = SITE_URL + birdHref(bird);
  const subpage = kind === 'overview' ? undefined : subpages[kind];
  const url = subpage ? SITE_URL + subpage.href(bird) : overviewUrl;
  const crumbs = [
    { name: SITE_NAME, item: SITE_URL },
    { name: bird.name, item: overviewUrl },
    ...(subpage ? [{ name: subpage.name, item: url }] : []),
  ];
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': url,
        url,
        name: title,
        description: bird.intro,
        inLanguage: 'de',
        isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: SITE_URL },
        primaryImageOfPage: {
          '@type': 'ImageObject',
          url: SITE_URL + imageSource(birdImage(bird.id, 'male')),
        },
        about: {
          '@type': 'Taxon',
          name: bird.latin,
          alternateName: bird.name,
          taxonRank: 'species',
        },
        breadcrumb: { '@id': `${url}#breadcrumb` },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${url}#breadcrumb`,
        itemListElement: crumbs.map((crumb, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: crumb.name,
          item: crumb.item,
        })),
      },
    ],
  };
}
