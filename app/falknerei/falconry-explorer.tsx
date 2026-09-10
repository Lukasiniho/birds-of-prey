'use client';

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
      <main className="falconry-main page-content">
        <header className="falconry-heading">
          <h1 className="page-title">Falknerei kennenlernen</h1>
          <p>Die Beizjagd, ihre Vögel und das Handwerk dahinter.</p>
        </header>
        <Tabs
          value={activeChapter}
          onValueChange={(value) => setActiveChapter(String(value))}
          className="falconry-explorer"
        >
          <TabsList
            variant="line"
            className="t-tabs t-tabs-line falconry-tabs"
            aria-label="Themen der Falknerei"
            ref={barRef}
          >
            <span className="t-tabs-pill" aria-hidden="true" ref={pillRef} />
            {chapters.map((item) => (
              <TabsTrigger
                key={item.id}
                value={item.id}
                className="t-tab"
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
              className="falconry-panel"
            >
              <section
                className="falconry-stage"
                aria-label={
                  chapter.id === 'beizvoegel'
                    ? bird.name
                    : 'Wanderfalke auf der Faust'
                }
              >
                <div className="falconry-stage-label">
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
                </div>
                <div
                  className={`falconry-art ${chapter.id === 'beizvoegel' ? 'falconry-flight' : ''}`}
                >
                  <ArtImage
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
                    className="falconry-species"
                    aria-label="Beizvogel auswählen"
                  >
                    {species.map((item) => (
                      <button
                        type="button"
                        key={item.id}
                        aria-pressed={bird.id === item.id}
                        onClick={() => setSelectedBird(item.id)}
                      >
                        <ArtImage
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
                  <p className="falconry-art-caption">
                    {chapter.id === 'ausruestung'
                      ? 'Der Handschuh schützt die Hand vor den Fängen.'
                      : 'Die Faust ist der mit dem Handschuh geschützte Sitzplatz.'}
                  </p>
                )}
              </section>
              <aside
                className="falconry-notes detail-panel"
                aria-label={chapter.label}
              >
                {chapter.id === 'grundlagen' && (
                  <>
                    <h2>Die Beizjagd</h2>
                    <p>
                      Falknerei ist die Jagd mit einem ausgebildeten Greifvogel
                      auf wild lebende Beute in ihrem natürlichen Lebensraum.
                    </p>
                    <p>
                      Der Mensch arbeitet mit den natürlichen Fähigkeiten des
                      Vogels. Dafür muss er dessen Verhalten kennen und
                      Vertrauen aufbauen.
                    </p>
                    <dl>
                      <div>
                        <dt>Beizvogel</dt>
                        <dd>
                          Ein Greifvogel, der für die gemeinsame Jagd
                          ausgebildet ist.
                        </dd>
                      </div>
                      <div>
                        <dt>Abtragen</dt>
                        <dd>
                          Die behutsame Gewöhnung des Vogels an den Menschen und
                          seine Umgebung.
                        </dd>
                      </div>
                      <div>
                        <dt>Atzung</dt>
                        <dd>
                          Der falknerische Ausdruck für die Nahrung des Vogels.
                        </dd>
                      </div>
                    </dl>
                  </>
                )}
                {chapter.id === 'ausruestung' && (
                  <>
                    <h2>Die Ausrüstung</h2>
                    <p>
                      Jedes Stück erfüllt eine Aufgabe beim Umgang mit dem
                      Vogel.
                    </p>
                    <dl>
                      <div>
                        <dt>Handschuh</dt>
                        <dd>
                          Kräftiges Leder schützt die Hand und bietet dem Vogel
                          einen sicheren Sitzplatz auf der Faust.
                        </dd>
                      </div>
                      <div>
                        <dt>Haube</dt>
                        <dd>
                          Die angepasste Lederhaube schirmt optische Reize ab,
                          etwa beim Transport. Der Vogel wird behutsam an sie
                          gewöhnt.
                        </dd>
                      </div>
                      <div>
                        <dt>Federspiel</dt>
                        <dd>
                          Eine Beuteattrappe an einer Schnur. Falken trainieren
                          daran Anflug und Wendemanöver, verbunden mit einer
                          Futterbelohnung.
                        </dd>
                      </div>
                    </dl>
                  </>
                )}
                {chapter.id === 'beizvoegel' && (
                  <>
                    <SpeciesCommonName as="h2">{bird.name}</SpeciesCommonName>
                    <p className="falconry-note-subtitle">{bird.subtitle}</p>
                    <p>{bird.text}</p>
                    <div className="falconry-note-block">
                      <h3>Welcher Vogel passt?</h3>
                      <p>
                        Die Landschaft und die Beute bestimmen, welche
                        Fähigkeiten gefragt sind. Deshalb gehören neben Falken
                        auch Habichte und Bussarde zur Falknerei.
                      </p>
                    </div>
                    <a href={bird.href} className="falconry-profile-link">
                      Zum Artenporträt{' '}
                      <ArrowUpRight size={16} aria-hidden="true" />
                    </a>
                  </>
                )}
                {chapter.id === 'verantwortung' && (
                  <>
                    <h2>Der Vogel im Mittelpunkt</h2>
                    <p>
                      Falknerei bedeutet tägliche, fachkundige Betreuung. Der
                      Alltag richtet sich nach den Bedürfnissen des Vogels.
                    </p>
                    <dl>
                      <div>
                        <dt>Gesundheit & Haltung</dt>
                        <dd>
                          Passende Unterbringung, Ernährung und die aufmerksame
                          Beobachtung des Gesundheitszustands gehören dazu.
                        </dd>
                      </div>
                      <div>
                        <dt>Geduld & Erfahrung</dt>
                        <dd>
                          Gewöhnung und Training beruhen auf Belohnung und einem
                          guten Verständnis für das Verhalten des Vogels.
                        </dd>
                      </div>
                      <div>
                        <dt>Wissen weitergeben</dt>
                        <dd>
                          Erfahrene Falknerinnen und Falkner geben ihr Handwerk
                          weiter. Die UNESCO führt die Falknerei als
                          immaterielles Kulturerbe.
                        </dd>
                      </div>
                    </dl>
                  </>
                )}
                <a className="falconry-source" href={sources[chapter.id].href}>
                  {sources[chapter.id].label}
                  <ArrowUpRight size={14} aria-hidden="true" />
                </a>
              </aside>
            </TabsContent>
          ))}
        </Tabs>
        <footer className="falconry-footer">
          Naturkundliche Illustrationen · Falknerei-Motiv mit KI erstellt
        </footer>
      </main>
    </div>
  );
}
