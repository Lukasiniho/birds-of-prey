'use client';
import { tabStyles } from '@/components/tab-styles';

import { useEffect, useSyncExternalStore } from 'react';
import { SiteHeader } from '@/components/site-header';
import { useSlidingPill } from '@/lib/use-sliding-pill';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AnatomyExplorer from './anatomy-explorer';
import FalconryWorld from './falconry-world';
import PreyExplorer from './prey-explorer';
import TechniqueExplorer from './technique-explorer';
import GlossaryExplorer from './glossary-explorer';
import type {
  KnowledgeBird,
  PreyEntry,
  TechniqueEntry,
} from './knowledge-data';

const sections = [
  { id: 'falknerei', label: 'Falknerei' },
  { id: 'jagdtiere', label: 'Jagdtiere' },
  { id: 'jagdtechniken', label: 'Jagdtechniken' },
  { id: 'koerperbau', label: 'Körperbau' },
  { id: 'glossar', label: 'Glossar' },
];

export default function KnowledgeExplorer({
  birds,
  prey,
  techniques,
}: {
  birds: KnowledgeBird[];
  prey: PreyEntry[];
  techniques: TechniqueEntry[];
}) {
  const section = useSyncExternalStore(
    (notify) => {
      window.addEventListener('hashchange', notify);
      window.addEventListener('popstate', notify);
      return () => {
        window.removeEventListener('hashchange', notify);
        window.removeEventListener('popstate', notify);
      };
    },
    () => {
      const hash = window.location.hash.slice(1);
      return sections.some((item) => item.id === hash) ? hash : 'falknerei';
    },
    () => 'falknerei',
  );
  const { barRef, pillRef } = useSlidingPill('wissen', section);
  useEffect(() => {
    // Keep the selected tab in view when it changes (e.g. via hash).
    barRef.current
      ?.querySelector<HTMLElement>('.t-tab[aria-selected="true"]')
      ?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  }, [section, barRef]);
  return (
    <div className="app-shell section-shell knowledge-shell">
      <SiteHeader activeSection="wissen" />
      <main className="knowledge-main max-w-[1360px] my-0 mx-auto page-content">
        <header className="knowledge-heading to-compact:items-start to-compact:flex-col to-compact:gap-5 to-compact:mb-section flex justify-between items-center gap-[28px] mb-section">
          <h1 className="page-title font-(family-name:--font-stack-display) text-(length:--type-page-title) font-(--weight-semibold) leading-(--leading-display) tracking-(--tracking-tight)">
            Greifvögel verstehen
          </h1>
        </header>
        <Tabs
          value={section}
          onValueChange={(value) => {
            const next = String(value);
            window.history.replaceState(null, '', `#${next}`);
            window.dispatchEvent(new HashChangeEvent('hashchange'));
          }}
          className="knowledge-explorer gap-6"
        >
          <TabsList
            variant="line"
            className={`${tabStyles.lineRail} knowledge-tabs`}
            aria-label="Wissensbereiche"
            ref={barRef}
          >
            <span
              className={tabStyles.lineIndicator}
              aria-hidden="true"
              ref={pillRef}
            />
            {sections.map(({ id, label }) => (
              <TabsTrigger
                key={id}
                value={id}
                className={tabStyles.lineTrigger}
                data-label={label}
              >
                {label}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value="falknerei">
            <FalconryWorld birds={birds} />
          </TabsContent>
          <TabsContent value="jagdtiere">
            <PreyExplorer prey={prey} />
          </TabsContent>
          <TabsContent value="jagdtechniken">
            <TechniqueExplorer techniques={techniques} />
          </TabsContent>
          <TabsContent value="koerperbau">
            <AnatomyExplorer
              images={[
                birds.find((bird) => bird.id === 'wanderfalke')!.image,
                birds.find((bird) => bird.id === 'maeusebussard')!.image,
              ]}
            />
          </TabsContent>
          <TabsContent value="glossar">
            <GlossaryExplorer />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
