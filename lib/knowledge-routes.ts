import type { HuntingType } from './ecology.ts';

/** Deep link into the knowledge pages: the tab by hash, the entry by query. */
export function techniqueHref(id: HuntingType) {
  return `/wissen?technik=${id}#jagdtechniken`;
}
