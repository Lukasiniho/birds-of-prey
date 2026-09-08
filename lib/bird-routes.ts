import { birds, type BirdSpecies } from './birds.ts';
export function birdSlug(bird: Pick<BirdSpecies, 'latin'>) {
  return bird.latin.toLowerCase().trim().replace(/\s+/g, '-');
}
export function birdHref(bird: Pick<BirdSpecies, 'latin'>) {
  return `/${birdSlug(bird)}`;
}
export const birdsBySlug = Object.fromEntries(
  birds.map((bird) => [birdSlug(bird), bird]),
);
export function birdForPath(path: string) {
  return birdsBySlug[path.replace(/^\/|\/$/g, '')];
}
