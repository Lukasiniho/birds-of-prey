'use client';
import { PageHeader } from '@/components/page-header';
import {
  ExplorerPanel,
  ExplorerStage,
  ExplorerNotes,
} from '@/components/explorer-panel';
import { SurfaceHeader } from '@/components/surface';
import { tabStyles } from '@/components/tab-styles';

import { cn } from '@/lib/utils';
import { DetailHeading, DetailCopy } from '@/components/detail-text';

import { SpeciesName, SpeciesCommonName } from '@/components/species-name';
import { useState } from 'react';
import { ArtImage } from '@/components/art-image';
import { ArrowUpRight } from '@/components/icons';
import { SiteHeader } from '@/components/site-header';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useSlidingPill } from '@/lib/use-sliding-pill';

type Species = {
  id: string;
  name: string;
  latin: string;
  href: string;
  image: string;
  portrait: string;
  subtitle: string;
  text: string;
};
const chapters = [
  { id: 'grundlagen', label: 'Grundlagen' },
  { id: 'ausruestung', label: 'Ausrüstung' },
  { id: 'beizvoegel', label: 'Beizvögel' },
  { id: 'verantwortung', label: 'Verantwortung' },
];
const sources: Record<string, { href: string; label: string }> = {
  grundlagen: {
    href: 'https://d-f-o.de/falknerei/',
    label: 'Deutscher Falkenorden',
  },
  ausruestung: {
    href: 'https://d-f-o.de/falknerei/haeufig-gestellte-fragen/',
    label: 'Falknerei: Fragen und Antworten',
  },
  beizvoegel: {
    href: 'https://d-f-o.de/falknerei/beizvoegel/',
    label: 'Beizvögel und Beizjagd',
  },
  verantwortung: {
    href: 'https://ich.unesco.org/en/RL/falconry-a-living-human-heritage-01708',
    label: 'Falknerei als UNESCO-Kulturerbe',
  },
};

export default function FalconryExplorer({ species }: { species: Species[] }) {
  const [activeChapter, setActiveChapter] = useState(chapters[0].id);
  const { barRef, pillRef } = useSlidingPill('falknerei', activeChapter);
  const [selectedBird, setSelectedBird] = useState(species[0].id);
  const bird = species.find((item) => item.id === selectedBird) ?? species[0];

  return (
    <div className="app-shell section-shell falconry-shell">
      <SiteHeader activeSection="falknerei" />
      <main className="falconry-main w-full page-content">
        <PageHeader
          title="Falknerei kennenlernen"
          description={
            <DetailCopy leading="normal">
              Die Beizjagd, ihre Vögel und das Handwerk dahinter.
            </DetailCopy>
          }
        />
        <Tabs
          value={activeChapter}
          onValueChange={(value) => setActiveChapter(String(value))}
          className="falconry-explorer gap-6"
        >
          <TabsList
            variant="line"
            className={`${tabStyles.lineRail} falconry-tabs`}
            aria-label="Themen der Falknerei"
            ref={barRef}
          >
            <span
              className={tabStyles.lineIndicator}
              aria-hidden="true"
              ref={pillRef}
            />
            {chapters.map((item) => (
              <TabsTrigger
                key={item.id}
                value={item.id}
                className={tabStyles.lineTrigger}
                data-label={item.label}
              >
                {item.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {chapters.map((chapter) => (
            <TabsContent
              key={chapter.id}
              value={chapter.id}
              render={<ExplorerPanel />}
              className="falconry-panel m-0 min-h-[610px] to-tablet:min-h-0 text-(length:--type-body)"
            >
              <ExplorerStage
                className="falconry-stage"
                aria-label={
                  chapter.id === 'beizvoegel'
                    ? bird.name
                    : 'Wanderfalke auf der Faust'
                }
              >
                <SurfaceHeader className="falconry-stage-label relative z-1">
                  <SpeciesName
                    name={
                      chapter.id === 'beizvoegel'
                        ? bird.name
                        : 'Wanderfalke auf der Faust'
                    }
                    latin={
                      chapter.id === 'beizvoegel'
                        ? bird.latin
                        : 'Falco peregrinus'
                    }
                    commonAs="h2"
                    scientificAs="i"
                  />
                </SurfaceHeader>
                <div
                  className={`falconry-art to-tablet:min-h-0 flex-1 grid place-items-center min-h-[350px] ${chapter.id === 'beizvoegel' ? 'falconry-flight' : ''}`}
                >
                  <ArtImage
                    className={cn(
                      'block w-full object-contain to-tablet:h-auto to-tablet:aspect-square',
                      chapter.id === 'beizvoegel'
                        ? 'h-[385px] from-tablet:h-[470px] to-tablet:max-h-[360px]'
                        : 'h-[440px] from-tablet:h-[560px] to-tablet:max-h-[420px]',
                    )}
                    displayWidth={440}
                    src={
                      chapter.id === 'beizvoegel'
                        ? bird.image
                        : '/falknerei/falke-freigestellt-v2.webp'
                    }
                    alt={
                      chapter.id === 'beizvoegel'
                        ? `${bird.name} im Flug`
                        : 'Ein Wanderfalke sitzt auf einem ledernen Falknerhandschuh'
                    }
                    width={1024}
                    height={1024}
                    priority={chapter.id === 'grundlagen'}
                  />
                </div>
                {chapter.id === 'beizvoegel' ? (
                  <div
                    className="falconry-species to-compact:gap-3 to-tablet:mt-[14px] to-tablet:gap-3 flex justify-center gap-3 flex-wrap"
                    aria-label="Beizvogel auswählen"
                  >
                    {species.map((item) => (
                      <button
                        className="flex items-center gap-2 py-1 pl-2 pr-3 leading-(--leading-heading)"
                        type="button"
                        key={item.id}
                        aria-pressed={bird.id === item.id}
                        onClick={() => setSelectedBird(item.id)}
                      >
                        <ArtImage
                          className="size-[43px] to-compact:size-[32px] object-contain"
                          displayWidth={52}
                          src={item.portrait}
                          width={52}
                          height={52}
                          alt=""
                        />
                        <SpeciesCommonName as="span">
                          {item.name}
                        </SpeciesCommonName>
                      </button>
                    ))}
                  </div>
                ) : (
                  <DetailCopy
                    size="caption"
                    leading="normal"
                    className="falconry-art-caption to-tablet:max-w-[32ch] to-tablet:self-center leading-(--leading-normal) text-center mt-2"
                  >
                    {chapter.id === 'ausruestung'
                      ? 'Der Handschuh schützt die Hand vor den Fängen.'
                      : 'Die Faust ist der mit dem Handschuh geschützte Sitzplatz.'}
                  </DetailCopy>
                )}
              </ExplorerStage>
              <ExplorerNotes
                className="falconry-notes flex flex-col"
                aria-label={chapter.label}
              >
                {chapter.id === 'grundlagen' && (
                  <>
                    <DetailHeading className="mb-2">Die Beizjagd</DetailHeading>
                    <DetailCopy className="mb-4">
                      Falknerei ist die Jagd mit einem ausgebildeten Greifvogel
                      auf wild lebende Beute in ihrem natürlichen Lebensraum.
                    </DetailCopy>
                    <DetailCopy className="mb-4">
                      Der Mensch arbeitet mit den natürlichen Fähigkeiten des
                      Vogels. Dafür muss er dessen Verhalten kennen und
                      Vertrauen aufbauen.
                    </DetailCopy>
                    <dl className="mt-1">
                      <div className="py-4 px-0 border-t-(length:--border-structure)">
                        <DetailHeading as="dt">Beizvogel</DetailHeading>
                        <DetailCopy as="dd" className="mt-2">
                          Ein Greifvogel, der für die gemeinsame Jagd
                          ausgebildet ist.
                        </DetailCopy>
                      </div>
                      <div className="py-4 px-0 border-t-(length:--border-structure)">
                        <DetailHeading as="dt">Abtragen</DetailHeading>
                        <DetailCopy as="dd" className="mt-2">
                          Die behutsame Gewöhnung des Vogels an den Menschen und
                          seine Umgebung.
                        </DetailCopy>
                      </div>
                      <div className="py-4 px-0 border-t-(length:--border-structure)">
                        <DetailHeading as="dt">Atzung</DetailHeading>
                        <DetailCopy as="dd" className="mt-2">
                          Der falknerische Ausdruck für die Nahrung des Vogels.
                        </DetailCopy>
                      </div>
                    </dl>
                  </>
                )}
                {chapter.id === 'ausruestung' && (
                  <>
                    <DetailHeading className="mb-2">
                      Die Ausrüstung
                    </DetailHeading>
                    <DetailCopy className="mb-4">
                      Jedes Stück erfüllt eine Aufgabe beim Umgang mit dem
                      Vogel.
                    </DetailCopy>
                    <dl className="mt-1">
                      <div className="py-4 px-0 border-t-(length:--border-structure)">
                        <DetailHeading as="dt">Handschuh</DetailHeading>
                        <DetailCopy as="dd" className="mt-2">
                          Kräftiges Leder schützt die Hand und bietet dem Vogel
                          einen sicheren Sitzplatz auf der Faust.
                        </DetailCopy>
                      </div>
                      <div className="py-4 px-0 border-t-(length:--border-structure)">
                        <DetailHeading as="dt">Haube</DetailHeading>
                        <DetailCopy as="dd" className="mt-2">
                          Die angepasste Lederhaube schirmt optische Reize ab,
                          etwa beim Transport. Der Vogel wird behutsam an sie
                          gewöhnt.
                        </DetailCopy>
                      </div>
                      <div className="py-4 px-0 border-t-(length:--border-structure)">
                        <DetailHeading as="dt">Federspiel</DetailHeading>
                        <DetailCopy as="dd" className="mt-2">
                          Eine Beuteattrappe an einer Schnur. Falken trainieren
                          daran Anflug und Wendemanöver, verbunden mit einer
                          Futterbelohnung.
                        </DetailCopy>
                      </div>
                    </dl>
                  </>
                )}
                {chapter.id === 'beizvoegel' && (
                  <>
                    <SpeciesCommonName
                      as="h2"
                      variant="detail"
                      className="mb-2"
                    >
                      {bird.name}
                    </SpeciesCommonName>
                    <DetailCopy className="falconry-note-subtitle -mt-[5px] mb-4">
                      {bird.subtitle}
                    </DetailCopy>
                    <DetailCopy className="mb-4">{bird.text}</DetailCopy>
                    <div className="falconry-note-block mt-[6px] mb-6 border-t-(length:--border-structure) pt-[19px]">
                      <DetailHeading as="h3">
                        Welcher Vogel passt?
                      </DetailHeading>
                      <DetailCopy className="mt-2">
                        Die Landschaft und die Beute bestimmen, welche
                        Fähigkeiten gefragt sind. Deshalb gehören neben Falken
                        auch Habichte und Bussarde zur Falknerei.
                      </DetailCopy>
                    </div>
                    <a
                      href={bird.href}
                      className="falconry-profile-link self-start text-(length:--type-ui) bg-(--selected) rounded-(--radius-control) inline-flex items-center gap-2 py-2 px-4"
                    >
                      Zum Artenporträt{' '}
                      <ArrowUpRight size={16} aria-hidden="true" />
                    </a>
                  </>
                )}
                {chapter.id === 'verantwortung' && (
                  <>
                    <DetailHeading className="mb-2">
                      Der Vogel im Mittelpunkt
                    </DetailHeading>
                    <DetailCopy className="mb-4">
                      Falknerei bedeutet tägliche, fachkundige Betreuung. Der
                      Alltag richtet sich nach den Bedürfnissen des Vogels.
                    </DetailCopy>
                    <dl className="mt-1">
                      <div className="py-4 px-0 border-t-(length:--border-structure)">
                        <DetailHeading as="dt">
                          Gesundheit & Haltung
                        </DetailHeading>
                        <DetailCopy as="dd" className="mt-2">
                          Passende Unterbringung, Ernährung und die aufmerksame
                          Beobachtung des Gesundheitszustands gehören dazu.
                        </DetailCopy>
                      </div>
                      <div className="py-4 px-0 border-t-(length:--border-structure)">
                        <DetailHeading as="dt">
                          Geduld & Erfahrung
                        </DetailHeading>
                        <DetailCopy as="dd" className="mt-2">
                          Gewöhnung und Training beruhen auf Belohnung und einem
                          guten Verständnis für das Verhalten des Vogels.
                        </DetailCopy>
                      </div>
                      <div className="py-4 px-0 border-t-(length:--border-structure)">
                        <DetailHeading as="dt">
                          Wissen weitergeben
                        </DetailHeading>
                        <DetailCopy as="dd" className="mt-2">
                          Erfahrene Falknerinnen und Falkner geben ihr Handwerk
                          weiter. Die UNESCO führt die Falknerei als
                          immaterielles Kulturerbe.
                        </DetailCopy>
                      </div>
                    </dl>
                  </>
                )}
                <a
                  className="falconry-source text-(length:--type-caption) leading-(--leading-normal) mt-auto pt-6 flex items-center gap-2"
                  href={sources[chapter.id].href}
                >
                  {sources[chapter.id].label}
                  <ArrowUpRight
                    size={14}
                    className="shrink-0"
                    aria-hidden="true"
                  />
                </a>
              </ExplorerNotes>
            </TabsContent>
          ))}
        </Tabs>
        <footer className="falconry-footer text-(length:--type-caption) leading-(--leading-normal) text-muted-foreground pt-4">
          Naturkundliche Illustrationen · Falknerei-Motiv mit KI erstellt
        </footer>
      </main>
    </div>
  );
}
