'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Moon, Sun } from 'lucide-react';
import { SiteNavigation } from '@/components/site-navigation';
import { PreyArt } from '@/components/prey-art';
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip';
import {
  speciesRecords,
  huntingTypes,
  type HuntingType,
  type SpeciesRecord,
} from '@/lib/ecology';
import { preyCatalog } from '@/lib/diets';
import { portraitImages } from '@/lib/portrait-images';
import { huntingImages } from '@/lib/hunting-images';
import { imageSource } from '@/lib/optimized-images';
import { birdHref } from '@/lib/bird-routes';
import { birdImage } from '@/lib/birds';

const techniqueExamples: Record<HuntingType, string> = {
  ansitz: 'rotschwanzbussard',
  deckung: 'habicht',
  suchflug: 'steinadler',
  luftjagd: 'gerfalke',
  sturzflug: 'wanderfalke',
  ruetteln: 'turmfalke',
  wasser: 'weisskopfseeadler',
  stosstauchen: 'fischadler',
  boden: 'sekretaer',
  kooperativ: 'wuestenbussard',
  ausgraben: 'wespenbussard',
  aas: 'andenkondor',
  knochen: 'bartgeier',
  lautlos: 'uhu',
  beuteraub: 'weisskopfseeadler',
};

const preyIds = Object.keys(preyCatalog).filter(
  (id) =>
    id === 'aas' ||
    speciesRecords.some((bird) =>
      bird.ecology.prey.some((prey) => prey.key === id),
    ),
);
function BirdPortraits({
  birds,
  tooltips = false,
}: {
  birds: SpeciesRecord[];
  tooltips?: boolean;
}) {
  return (
    <div className="knowledge-portrait-grid">
      {birds.map((bird) => {
        const portrait = (
          <>
            <Image
              src={imageSource(portraitImages[bird.id])}
              alt=""
              width={112}
              height={112}
              unoptimized
            />
            <span>{bird.name}</span>
          </>
        );
        return tooltips ? (
          <Tooltip key={bird.id}>
            <TooltipTrigger
              render={<Link href={birdHref(bird)} />}
              className="technique-bird"
              aria-label={`${bird.name}: Steckbrief öffnen`}
            >
              {portrait}
            </TooltipTrigger>
            <TooltipContent
              side="left"
              sideOffset={12}
              className="hunting-bird-tooltip"
            >
              <strong>{bird.name}</strong>
              <p>{bird.ecology.hunting.text}</p>
            </TooltipContent>
          </Tooltip>
        ) : (
          <Link className="technique-bird" key={bird.id} href={birdHref(bird)}>
            {portrait}
          </Link>
        );
      })}
    </div>
  );
}
export default function Knowledge({
  section,
}: {
  section: 'prey' | 'techniques';
}) {
  const [technique, setTechnique] = useState<HuntingType>('ansitz');
  const [preyId, setPreyId] = useState('wuehlmaus');
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const t = params.get('technik');
    const p = params.get('beute');
    if (t && t in huntingTypes) setTechnique(t as HuntingType);
    if (p && preyIds.includes(p)) setPreyId(p);
    // Preserve links from species category tags in the simplified prey view.
    const category = params.get('kategorie');
    if (!p && category) {
      const representative = speciesRecords
        .flatMap((b) => b.ecology.prey)
        .find((p) => p.category === category);
      if (category === 'aas') setPreyId('aas');
      else if (representative) setPreyId(representative.key);
    }
    try {
      const value = localStorage.getItem('raptor:theme') === 'dark';
      setDark(value);
      document.documentElement.dataset.theme = value ? 'dark' : 'light';
    } catch {}
  }, []);
  const result =
    section === 'techniques'
      ? speciesRecords.filter((b) => b.ecology.huntingTags.includes(technique))
      : speciesRecords.filter((b) =>
          preyId === 'aas'
            ? b.ecology.diet.carrion
            : b.ecology.prey.some((p) => p.key === preyId),
        );
  const representative = result.find(
    (b) => b.id === techniqueExamples[technique],
  );
  const sceneImage =
    representative && technique !== 'beuteraub'
      ? huntingImages[representative.id]
      : undefined;
  return (
    <TooltipProvider delay={160}>
      <div className="knowledge-shell">
        <header className="topbar knowledge-topbar">
          <SiteNavigation active="knowledge" />
          <button
            className="theme-toggle"
            aria-label={
              dark ? 'Hellmodus aktivieren' : 'Dunkelmodus aktivieren'
            }
            onClick={() => {
              setDark(!dark);
              document.documentElement.dataset.theme = dark ? 'light' : 'dark';
              try {
                localStorage.setItem('raptor:theme', dark ? 'light' : 'dark');
              } catch {}
            }}
          >
            {dark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </header>
        <main className="knowledge-main">
          <nav className="knowledge-subnav" aria-label="Wissen">
            <Link
              href="/wissen/jagdtechniken"
              aria-current={section === 'techniques' ? 'page' : undefined}
            >
              Jagdtechniken
            </Link>
            <Link
              href="/wissen/jagdtiere"
              aria-current={section === 'prey' ? 'page' : undefined}
            >
              Jagdtiere
            </Link>
          </nav>
          {section === 'techniques' ? (
            <div className="technique-explorer">
              <div
                className="technique-options"
                aria-label="Jagdtechnik auswählen"
              >
                {Object.entries(huntingTypes).map(([id, t]) => (
                  <button
                    key={id}
                    aria-pressed={technique === id}
                    onClick={() => {
                      setTechnique(id as HuntingType);
                      window.history.replaceState(
                        window.history.state,
                        '',
                        `?technik=${id}`,
                      );
                    }}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
              <section className="technique-feature">
                <div>
                  <h1>{huntingTypes[technique].label}</h1>
                  <p>{huntingTypes[technique].text}</p>
                </div>
                {representative && (
                  <figure>
                    <Image
                      src={imageSource(
                        sceneImage ?? birdImage(representative.id, 'male'),
                      )}
                      alt={
                        sceneImage
                          ? `${representative.name} bei der Nahrungssuche`
                          : representative.name
                      }
                      width={600}
                      height={420}
                      unoptimized
                    />
                    <figcaption>{representative.name}</figcaption>
                  </figure>
                )}
              </section>
              <aside
                className="technique-birds"
                aria-label="Vögel mit dieser Jagdtechnik"
              >
                <BirdPortraits birds={result} tooltips />
              </aside>
            </div>
          ) : (
            <div className="simple-prey-explorer">
              <nav className="prey-sidebar" aria-label="Beutetier auswählen">
                {preyIds.map((id) => (
                  <button
                    key={id}
                    aria-pressed={preyId === id}
                    onClick={() => {
                      setPreyId(id);
                      window.history.replaceState(
                        window.history.state,
                        '',
                        `?beute=${id}`,
                      );
                    }}
                  >
                    <PreyArt preyKey={id} />
                    <span>{preyCatalog[id].name}</span>
                  </button>
                ))}
              </nav>
              <section
                className="prey-predators"
                aria-label={`Vögel, die ${preyCatalog[preyId].name} fressen`}
              >
                <h1 className="sr-only">{preyCatalog[preyId].name}</h1>
                <BirdPortraits birds={result} />
                <span className="sr-only" role="status">
                  {result.length} Vogelarten
                </span>
              </section>
            </div>
          )}
        </main>
      </div>
    </TooltipProvider>
  );
}
