'use client';
import {
  ExplorerPanel,
  ExplorerStage,
  ExplorerHeader,
  ExplorerNotes,
} from '@/components/explorer-panel';
import { KnowledgeBirdGroup as HunterGroup } from '@/components/knowledge-bird-group';

import { DetailCopy } from '@/components/detail-text';

import { useEffect, useState } from 'react';
import { useI18n } from '@/components/i18n';
import { currentUrl, localePath } from '@/lib/i18n';
import { ArtImage } from '@/components/art-image';
import { Crosshair } from '@/components/icons';
import type { TechniqueEntry, TechniqueHunter } from './knowledge-data';

export default function TechniqueExplorer({
  techniques,
}: {
  techniques: TechniqueEntry[];
}) {
  const { locale, t } = useI18n();
  const countLabel = (count: number) =>
    count === 1 ? t('1 Art') : t('{count} Arten', { count });
  const [selected, setSelected] = useState(techniques[0]?.id ?? '');
  const [hovered, setHovered] = useState<TechniqueHunter | null>(null);
  // A hunting tag in the atlas links straight to its chapter: ?technik=<id>.
  useEffect(() => {
    function syncFromUrl() {
      const id = currentUrl().searchParams.get('technik');
      if (id && techniques.some((item) => item.id === id)) setSelected(id);
    }
    syncFromUrl();
    window.addEventListener('popstate', syncFromUrl);
    return () => window.removeEventListener('popstate', syncFromUrl);
  }, [techniques]);
  function choose(id: string) {
    setSelected(id);
    const url = currentUrl();
    url.searchParams.set('technik', id);
    window.history.replaceState(
      window.history.state,
      '',
      localePath(url.pathname + url.search + url.hash, locale),
    );
  }
  const entry =
    techniques.find((item) => item.id === selected) ?? techniques[0];
  const typical = entry.hunters.filter((h) => h.importance === 'primary');
  const additional = entry.hunters.filter((h) => h.importance !== 'primary');

  return (
    <ExplorerPanel className={'knowledge-split technique-explorer'}>
      <ExplorerStage
        className="knowledge-surface"
        aria-label={t('Jagdtechniken')}
      >
        <ExplorerHeader
          eyebrow={t('Strategie & Beute')}
          title={t('Wie Greifvögel jagen')}
          actions={<Crosshair size={24} aria-hidden="true" />}
        />
        <fieldset
          className="knowledge-grid grid grid-cols-5 to-tablet:grid-cols-3 gap-2"
          aria-label={t('Jagdtechnik wählen')}
        >
          {techniques.map((item) => (
            <button
              type="button"
              key={item.id}
              className="knowledge-tile flex flex-col items-center gap-half py-3 px-2 text-center"
              aria-pressed={item.id === entry.id}
              data-related={
                hovered ? hovered.techniques.includes(item.id) : undefined
              }
              onClick={() => choose(item.id)}
            >
              <span className="knowledge-tile-art size-[72px] min-h-0 mb-2 grid place-items-center">
                <ArtImage
                  className="size-full object-contain"
                  src={item.image}
                  alt=""
                  width={72}
                  height={72}
                  displayWidth={72}
                />
              </span>
              <span className="knowledge-tile-name font-(--weight-medium) leading-(--leading-compact)">
                {item.label}
              </span>
              <span className="knowledge-tile-count text-(length:--type-caption) text-muted-foreground">
                {countLabel(item.hunters.length)}
              </span>
            </button>
          ))}
        </fieldset>
      </ExplorerStage>
      <ExplorerNotes
        className="knowledge-notes"
        aria-live="polite"
        aria-atomic="true"
        scrollKey={entry.id}
      >
        <ExplorerHeader
          eyebrow={
            <>
              {' '}
              {t('Jagdtechnik')} · {countLabel(entry.hunters.length)}{' '}
            </>
          }
          title={entry.label}
        />
        <DetailCopy className="mt-3">{entry.text}</DetailCopy>
        {typical.length > 0 && (
          <HunterGroup
            title={t('Typische Technik')}
            hunters={typical}
            onHover={setHovered}
          />
        )}
        {additional.length > 0 && (
          <HunterGroup
            title={t('Ergänzend')}
            hunters={additional}
            onHover={setHovered}
          />
        )}
        <DetailCopy className="mt-3">
          {t(
            'Beim Überfahren einer Art leuchten links alle Techniken auf, die sie ebenfalls nutzt.',
          )}
        </DetailCopy>
      </ExplorerNotes>
    </ExplorerPanel>
  );
}
