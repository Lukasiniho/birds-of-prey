import { birdImage, type BirdSpecies } from './birds';
import { birdFullscreenHref, birdHref, birdTaxonomyHref } from './bird-routes';
import { msg, siteUrl, type Locale } from './i18n';
import { serverTranslator } from './i18n/en';
import { imageSource } from './optimized-images';
import { SITE_NAMES, SITE_URLS } from './site';

export type BirdPageKind = 'overview' | 'steckbrief' | 'systematik';

const subpages: Record<
  Exclude<BirdPageKind, 'overview'>,
  { name: string; href: (bird: BirdSpecies) => string }
> = {
  steckbrief: { name: msg('Steckbrief'), href: birdFullscreenHref },
  systematik: { name: msg('Systematik'), href: birdTaxonomyHref },
};

/** Schema.org graph for a species page: the page itself, the species it
 * describes and the breadcrumb trail Start › Art › Unterseite. */
export function birdStructuredData(
  bird: BirdSpecies,
  kind: BirdPageKind,
  title: string,
  locale: Locale = 'de',
) {
  const t = serverTranslator(locale);
  const site = { name: SITE_NAMES[locale], url: SITE_URLS[locale] };
  const overviewUrl = siteUrl(birdHref(bird), locale);
  const subpage = kind === 'overview' ? undefined : subpages[kind];
  const url = subpage ? siteUrl(subpage.href(bird), locale) : overviewUrl;
  const crumbs = [
    { name: site.name, item: site.url },
    { name: t(bird.name), item: overviewUrl },
    ...(subpage ? [{ name: t(subpage.name), item: url }] : []),
  ];
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': url,
        url,
        name: title,
        description: t(bird.intro),
        inLanguage: locale,
        isPartOf: { '@type': 'WebSite', ...site },
        primaryImageOfPage: {
          '@type': 'ImageObject',
          url: site.url + imageSource(birdImage(bird.id, 'male')),
        },
        about: {
          '@type': 'Taxon',
          name: bird.latin,
          alternateName: t(bird.name),
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
