'use client';

import { useEffect, useSyncExternalStore } from 'react';
import { SiteHeader } from '@/components/site-header';
import { useSlidingPill } from '@/lib/use-sliding-pill';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AnatomyExplorer from './anatomy-explorer';
import FalconryWorld from './falconry-world';
import PreyExplorer from './prey-explorer';
import TechniqueExplorer from './technique-explorer';
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
      return () => window.removeEventListener('hashchange', notify);
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
      <main className="knowledge-main page-content">
        <header className="knowledge-heading">
          <h1 className="page-title">Greifvögel verstehen</h1>
        </header>
        <Tabs
          value={section}
          onValueChange={(value) => {
            const next = String(value);
            window.history.replaceState(null, '', `#${next}`);
            window.dispatchEvent(new HashChangeEvent('hashchange'));
          }}
          className="knowledge-explorer"
        >
          <TabsList
            variant="line"
            className="t-tabs t-tabs-line knowledge-tabs"
            aria-label="Wissensbereiche"
            ref={barRef}
          >
            <span className="t-tabs-pill" aria-hidden="true" ref={pillRef} />
            {sections.map(({ id, label }) => (
              <TabsTrigger key={id} value={id} className="t-tab">
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
        </Tabs>
      </main>
    </div>
  );
}
