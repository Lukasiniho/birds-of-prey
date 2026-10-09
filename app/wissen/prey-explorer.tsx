'use client';
import {
  ExplorerPanel,
  ExplorerStage,
  ExplorerHeader,
  ExplorerNotes,
} from '@/components/explorer-panel';
import { KnowledgeBirdGroup as HunterGroup } from '@/components/knowledge-bird-group';

import { DetailCopy } from '@/components/detail-text';

import { useState } from 'react';
import { useT } from '@/components/i18n';
import { ForkKnife } from '@/components/icons';
import { PreyArt } from '@/components/prey-art';
import type { PreyEntry, PreyHunter } from './knowledge-data';

export default function PreyExplorer({ prey }: { prey: PreyEntry[] }) {
  const t = useT();
  const countLabel = (count: number) =>
    count === 1 ? t('1 Art') : t('{count} Arten', { count });
  const [selected, setSelected] = useState(prey[0]?.key ?? '');
  const [hoveredHunter, setHoveredHunter] = useState<PreyHunter | null>(null);
  const entry = prey.find((item) => item.key === selected) ?? prey[0];
  const primary = entry.hunters.filter((h) => h.importance === 'primary');
  const occasional = entry.hunters.filter((h) => h.importance !== 'primary');

  return (
    <ExplorerPanel className={'knowledge-split prey-explorer'}>
      <ExplorerStage className="knowledge-surface" aria-label={t('Beutetiere')}>
        <ExplorerHeader
          eyebrow={t('Beute & Jäger')}
          title={t('Wer jagt was?')}
          actions={<ForkKnife size={24} aria-hidden="true" />}
        />
        <fieldset
          className="knowledge-grid grid grid-cols-[repeat(auto-fill,minmax(124px,1fr))] to-tablet:grid-cols-[repeat(auto-fill,minmax(104px,1fr))] gap-2"
          aria-label={t('Beutetier wählen')}
        >
          {prey.map((item) => (
            <button
              type="button"
              key={item.key}
              className="knowledge-tile flex flex-col items-center gap-half py-3 px-2 text-center"
              aria-pressed={item.key === entry.key}
              data-related={
                hoveredHunter
                  ? hoveredHunter.prey.includes(item.key)
                  : undefined
              }
              onClick={() => setSelected(item.key)}
            >
              <PreyArt preyKey={item.key} variant="tile" />
              <span className="knowledge-tile-name font-(--weight-medium) leading-(--leading-compact)">
                {item.name}
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
        scrollKey={entry.key}
      >
        <ExplorerHeader
          eyebrow={
            <>
              {' '}
              {t('Beutetier')} · {countLabel(entry.hunters.length)}{' '}
            </>
          }
          title={entry.name}
        />
        {primary.length > 0 && (
          <HunterGroup
            title={t('Hauptbeute')}
            hunters={primary}
            onHover={setHoveredHunter}
          />
        )}
        {occasional.length > 0 && (
          <HunterGroup
            title={t('Gelegentlich')}
            hunters={occasional}
            onHover={setHoveredHunter}
          />
        )}
        <DetailCopy className="mt-3">
          {t(
            'Beim Überfahren eines Greifvogels leuchten links alle Beutetiere auf, die er ebenfalls jagt.',
          )}
        </DetailCopy>
      </ExplorerNotes>
    </ExplorerPanel>
  );
}
