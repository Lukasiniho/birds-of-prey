'use client';
import { PageHeader } from '@/components/page-header';
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
import { useI18n } from '@/components/i18n';
import { currentUrl, localePath, msg } from '@/lib/i18n';
import type {
  KnowledgeBird,
  PreyEntry,
  TechniqueEntry,
} from './knowledge-data';

const sections = [
  { id: 'falknerei', label: msg('Falknerei') },
  { id: 'jagdtiere', label: msg('Jagdtiere') },
  { id: 'jagdtechniken', label: msg('Jagdtechniken') },
  { id: 'koerperbau', label: msg('Körperbau') },
  { id: 'glossar', label: msg('Glossar') },
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
  const { locale, t } = useI18n();
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
      const hash = currentUrl().hash.slice(1);
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
      <main className="knowledge-main w-full page-content">
        <PageHeader title={t('Greifvögel verstehen')} />
        <Tabs
          value={section}
          onValueChange={(value) => {
            const next = String(value);
            const url = currentUrl();
            url.hash = next;
            if (next !== 'glossar') url.searchParams.delete('begriff');
            window.history.replaceState(
              window.history.state,
              '',
              localePath(url.pathname + url.search + url.hash, locale),
            );
            window.dispatchEvent(new HashChangeEvent('hashchange'));
          }}
          className="knowledge-explorer gap-6"
        >
          <TabsList
            variant="line"
            className={`${tabStyles.lineRail} knowledge-tabs`}
            aria-label={t('Wissensbereiche')}
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
                data-label={t(label)}
              >
                {t(label)}
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
