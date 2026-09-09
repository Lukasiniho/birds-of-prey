'use client';

import { useSyncExternalStore } from 'react';
import { Bird, Globe, Scan } from '@/components/icons';
import { SiteHeader } from '@/components/site-header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AnatomyExplorer from './anatomy-explorer';
import FlightExplorer from './flight-explorer';
import FalconryWorld from './falconry-world';
import type { KnowledgeBird } from './knowledge-data';

const sections = [
  { id: 'koerperbau', label: 'Körperbau', icon: Scan },
  { id: 'flugkunst', label: 'Flugkunst', icon: Bird },
  { id: 'falknerei', label: 'Falknerei', icon: Globe },
];

export default function KnowledgeExplorer({
  birds,
}: {
  birds: KnowledgeBird[];
}) {
  const section = useSyncExternalStore(
    (notify) => {
      window.addEventListener('hashchange', notify);
      return () => window.removeEventListener('hashchange', notify);
    },
    () => {
      const hash = window.location.hash.slice(1);
      return sections.some((item) => item.id === hash) ? hash : 'koerperbau';
    },
    () => 'koerperbau',
  );
  return (
    <div className="app-shell section-shell knowledge-shell">
      <SiteHeader activeSection="wissen" />
      <main className="knowledge-main page-content">
        <header className="knowledge-heading">
          <h1>Greifvögel verstehen</h1>
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
          <TabsList className="knowledge-tabs" aria-label="Wissensbereiche">
            {sections.map(({ id, label, icon: Icon }) => (
              <TabsTrigger key={id} value={id}>
                <Icon aria-hidden="true" />
                {label}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value="koerperbau">
            <AnatomyExplorer
              images={[
                birds.find((bird) => bird.id === 'wanderfalke')!.image,
                birds.find((bird) => bird.id === 'maeusebussard')!.image,
              ]}
            />
          </TabsContent>
          <TabsContent value="flugkunst">
            <FlightExplorer birds={birds} />
          </TabsContent>
          <TabsContent value="falknerei">
            <FalconryWorld birds={birds} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
