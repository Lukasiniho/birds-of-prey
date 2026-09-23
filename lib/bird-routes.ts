import { birds, type BirdSpecies } from './birds.ts';
export function birdSlug(bird: Pick<BirdSpecies, 'latin'>) {
  return bird.latin.toLowerCase().trim().replace(/\s+/g, '-');
}
export function birdHref(bird: Pick<BirdSpecies, 'latin'>) {
  return `/${birdSlug(bird)}`;
}
export function birdFullscreenHref(bird: Pick<BirdSpecies, 'latin'>) {
  return `${birdHref(bird)}/steckbrief`;
}
export function birdTaxonomyHref(bird: Pick<BirdSpecies, 'latin'>) {
  return `${birdHref(bird)}/systematik`;
}
export type BirdInfoTab = 'profil' | 'nahrung' | 'lebensraum';
const tabParams: Record<BirdInfoTab, string> = {
  profil: 'steckbrief',
  nahrung: 'nahrung',
  lebensraum: 'vorkommen',
};
export function birdInfoTabForSearch(search: string): BirdInfoTab {
  const tab = new URLSearchParams(search).get('tab');
  return (
    (Object.keys(tabParams) as BirdInfoTab[]).find(
      (key) => tabParams[key] === tab,
    ) ?? 'profil'
  );
}
/** Keep unrelated parameters; the default tab needs no query parameter. */
export function birdInfoSearch(search: string, tab: BirdInfoTab) {
  const params = new URLSearchParams(search);
  if (tab === 'profil') params.delete('tab');
  else params.set('tab', tabParams[tab]);
  const query = params.toString();
  return query ? `?${query}` : '';
}
export const birdsBySlug = Object.fromEntries(
  birds.map((bird) => [birdSlug(bird), bird]),
);
export function birdForPath(path: string) {
  const parts = path.replace(/^\/|\/$/g, '').split('/');
  if (
    parts.length > 2 ||
    (parts.length === 2 && !['steckbrief', 'systematik'].includes(parts[1]))
  )
    return undefined;
  return birdsBySlug[parts[0]];
}
export function isBirdFullscreenPath(path: string) {
  return /\/steckbrief\/?$/.test(path) && Boolean(birdForPath(path));
}
export function isBirdTaxonomyPath(path: string) {
  return /\/systematik\/?$/.test(path) && Boolean(birdForPath(path));
}
export function birdPageTitle(
  bird: Pick<BirdSpecies, 'name' | 'latin'>,
  fullscreen = false,
) {
  return `${bird.name} (${bird.latin})${fullscreen ? ' – Steckbrief, Nahrung & Vorkommen' : ''}`;
}
