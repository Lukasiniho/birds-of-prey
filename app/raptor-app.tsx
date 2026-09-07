'use client';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Search, Feather, X, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  Sidebar,
  SidebarProvider,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip';
import {
  birds,
  filterBirds,
  groupBirds,
  groupingOptions,
  plumagesFor,
  plumageNoteFor,
  hunts,
  birdImage,
  colorsFor,
  bodyColorsFor,
  type ColorSwatch,
  type Plumage,
  type GroupMode,
  type BirdSpecies,
} from '@/lib/birds';
import { landscapes, speciesLandscapes } from '@/lib/habitats';
import { habitatImages } from '@/lib/habitat-images';
import { portraitImages } from '@/lib/portrait-images';
import { huntingImages } from '@/lib/hunting-images';
import { diets, preyCatalog, type PreyExample } from '@/lib/diets';
import { preyFraming } from '@/lib/prey-framing';
import { imageSource } from '@/lib/optimized-images.ts';
import { loadImage } from '@/lib/image-loader';
import { speciesProfiles } from '@/lib/species-profiles';
import { RangeMap } from '@/components/range-map';
import {
  getBirdMorphConfig,
  getBirdMorphChoice,
  getBirdMorphAppearance,
} from '@/lib/morphs';
function Measurement({ value, unit }: { value: string; unit: string }) {
  // transitions.dev number pop-in: every character is a .t-digit, the last two
  // ride in behind the rest. Keying the group by value replays it on change.
  const parts = value.split(/(ca\.|bis|–)/g).filter(Boolean);
  type Piece = { qualifier: string } | { ch: string };
  const pieces: Piece[] = parts.flatMap((part): Piece[] =>
    /^(ca\.|bis)$/.test(part)
      ? [{ qualifier: part }]
      : part.split('').map((ch) => ({ ch: ch === ' ' ? '\u00A0' : ch })),
  );
  const digitIndexes = pieces
    .map((p, i) => ('ch' in p ? i : -1))
    .filter((i) => i >= 0);
  const stagger1 = digitIndexes[digitIndexes.length - 2];
  const stagger2 = digitIndexes[digitIndexes.length - 1];
  return (
    <p>
      <span className="t-digit-group is-animating" key={value}>
        {pieces.map((p, i) =>
          'qualifier' in p ? (
            <span
              className="measurement-secondary measurement-qualifier"
              key={i}
            >
              {p.qualifier}
            </span>
          ) : (
            <span
              className={`t-digit${p.ch === '–' ? ' measurement-secondary' : ''}`}
              data-stagger={
                i === stagger1 ? '1' : i === stagger2 ? '2' : undefined
              }
              key={i}
            >
              {p.ch}
            </span>
          ),
        )}
      </span>
      <small>{unit}</small>
    </p>
  );
}
/* transitions.dev texts reveal: the name and Latin name rise in with a
   staggered blur. On a species change the block fades out quietly (200ms),
   then the new text is written into the DOM and the reveal replays. */
function RevealHeading({ name, latin }: { name: string; latin: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [initial] = useState({ name, latin });
  useEffect(() => {
    const block = ref.current;
    if (!block) return;
    const lines = [...block.querySelectorAll<HTMLElement>('.t-stagger-line')];
    const [line1, line2] = lines;
    if (line1.textContent === name && line2.textContent === latin) return;
    block.classList.add('is-hiding');
    block.classList.remove('is-shown');
    const timer = setTimeout(() => {
      line1.textContent = name;
      line2.textContent = latin;
      // Snap to the hidden start state without a transition, otherwise the
      // lines would tween 0 -> 12px and the reveal would reverse that instead.
      for (const line of lines) line.style.transition = 'none';
      block.classList.remove('is-hiding');
      block.classList.remove('is-shown');
      void block.offsetHeight; // force reflow so the reveal replays
      for (const line of lines) line.style.transition = '';
      block.classList.add('is-shown');
    }, 200);
    return () => clearTimeout(timer);
  }, [name, latin]);
  return (
    <div className="t-stagger is-shown" ref={ref}>
      <h1 className="t-stagger-line t-stagger-line--1">{initial.name}</h1>
      <p className="t-stagger-line t-stagger-line--2">{initial.latin}</p>
    </div>
  );
}
/* transitions.dev tabs sliding: JS writes the active tab's offset and width
   onto the pill, CSS tweens it. A new group (another species) snaps instead. */
function useSlidingPill(group: string, active: string) {
  const barRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);
  const lastGroup = useRef<string | null>(null);
  useLayoutEffect(() => {
    const bar = barRef.current;
    const pill = pillRef.current;
    if (!bar || !pill) return;
    function moveTo(animate: boolean) {
      const tab = bar!.querySelector<HTMLElement>(
        '.t-tab[aria-selected="true"], .t-tab[aria-pressed="true"]',
      );
      if (!tab) return;
      if (!animate) {
        const prev = pill!.style.transition;
        pill!.style.transition = 'none';
        pill!.style.transform = `translateX(${tab.offsetLeft}px)`;
        pill!.style.width = `${tab.offsetWidth}px`;
        void pill!.offsetWidth;
        pill!.style.transition = prev;
      } else {
        pill!.style.transform = `translateX(${tab.offsetLeft}px)`;
        pill!.style.width = `${tab.offsetWidth}px`;
      }
    }
    const firstPaint = lastGroup.current === null;
    moveTo(!firstPaint && lastGroup.current === group);
    lastGroup.current = group;
    const snap = () => moveTo(false);
    window.addEventListener('resize', snap);
    // Web fonts can land after the first measurement; re-snap once they do.
    if (firstPaint) document.fonts?.ready.then(snap).catch(() => {});
    return () => window.removeEventListener('resize', snap);
  }, [group, active]);
  return { barRef, pillRef };
}
function BirdArt({
  bird,
  plumage,
  morphId,
}: {
  bird: BirdSpecies;
  plumage: Plumage;
  morphId?: string;
}) {
  const morph = getBirdMorphChoice(bird.id, morphId);
  const appearance = getBirdMorphAppearance(
    bird.id,
    morphId,
    plumage === 'juvenile' ? 'juvenile' : 'male',
  );
  const nextSource = imageSource(
    appearance?.image ?? birdImage(bird.id, plumage),
  );
  const nextAlt = `${bird.name} – ${plumagesFor(bird.id).find((p) => p.value === plumage)!.label}${morph ? `, Farbform ${morph.label}` : ''}`;
  const [displayed, setDisplayed] = useState({ src: nextSource, alt: nextAlt });
  const [incoming, setIncoming] = useState<{ src: string; alt: string } | null>(
    null,
  );
  const [decodedSource, setDecodedSource] = useState<string | null>(null);
  const [failedSource, setFailedSource] = useState<string | null>(null);
  const [retry, setRetry] = useState(0);
  useEffect(() => {
    if (nextSource === displayed.src) return;
    let cancelled = false;
    loadImage(nextSource)
      .then(() => {
        if (!cancelled) {
          setFailedSource(null);
          setDecodedSource(null);
          setIncoming({ src: nextSource, alt: nextAlt });
        }
      })
      .catch(() => {
        if (!cancelled) setFailedSource(nextSource);
      });
    return () => {
      cancelled = true;
    };
  }, [nextSource, nextAlt, displayed.src, retry]);
  useEffect(() => {
    if (
      !incoming ||
      incoming.src !== nextSource ||
      decodedSource !== nextSource
    )
      return;
    const timer = setTimeout(() => {
      setDisplayed(incoming);
      setIncoming(null);
      setDecodedSource(null);
    }, 200);
    return () => clearTimeout(timer);
  }, [incoming, decodedSource, nextSource]);
  const overlay = incoming?.src === nextSource ? incoming : null;
  const fading = overlay?.src === decodedSource;
  return (
    <div
      className={`bird-art crossfade-art${fading ? ' is-crossfading' : ''}`}
      aria-busy={nextSource !== displayed.src}
    >
      <Image
        key={displayed.src}
        src={displayed.src}
        alt={overlay ? '' : displayed.alt}
        width={1536}
        height={1536}
        unoptimized
        priority
      />
      {overlay && (
        <Image
          key={overlay.src}
          className="bird-incoming"
          onLoad={async (event) => {
            const image = event.currentTarget;
            try {
              await image.decode();
              setDecodedSource(overlay.src);
            } catch {
              setFailedSource(overlay.src);
            }
          }}
          src={overlay.src}
          alt={overlay.alt}
          width={1536}
          height={1536}
          unoptimized
          priority
        />
      )}
      {failedSource === nextSource && (
        <button
          className="image-retry"
          onClick={() => {
            setFailedSource(null);
            setRetry((n) => n + 1);
          }}
        >
          Bild erneut laden
        </button>
      )}
    </div>
  );
}

function ColorRow({
  label,
  colors,
  note,
}: {
  label: string;
  colors: ColorSwatch[];
  note?: string;
}) {
  return (
    <div className="body-color-row">
      <span>{label}</span>
      <div className="swatch-row">
        {colors.map(([name, color]) => (
          <Tooltip key={name}>
            <TooltipTrigger
              className="color-dot"
              aria-label={`${label}: ${name}${note ? '. ' + note : ''}`}
              style={{ background: color }}
            />
            <TooltipContent>
              {name}
              {note && <span className="swatch-detail">{note}</span>}
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </div>
  );
}
function HuntingArt({ bird }: { bird: BirdSpecies }) {
  const hunt = hunts[bird.id];
  return (
    <Image
      className="hunting-standalone"
      src={imageSource(
        huntingImages[bird.id] ?? hunt.image ?? `/hunting-${bird.id}.png`,
      )}
      width={1536}
      height={1536}
      alt={`${bird.name}: ${hunt.title}`}
      unoptimized
    />
  );
}
function PreyArt({ preyKey }: { preyKey: string }) {
  const frame = preyFraming[preyKey];
  const size = Math.max(frame.width, frame.height);
  return (
    <span className="prey-image framed-prey">
      <span
        className="prey-crop"
        style={{
          width: `${(frame.width / size) * 100}%`,
          height: `${(frame.height / size) * 100}%`,
        }}
      >
        <Image
          src={imageSource(frame.src)}
          alt=""
          width={frame.imageWidth}
          height={frame.imageHeight}
          unoptimized
          style={{
            width: `${(frame.imageWidth / frame.width) * 100}%`,
            maxWidth: 'none',
            height: 'auto',
            left: `${(-frame.x / frame.width) * 100}%`,
            top: `${(-frame.y / frame.height) * 100}%`,
          }}
        />
      </span>
    </span>
  );
}
function PreyGallery({ items }: { items: PreyExample[] }) {
  return (
    <div className="prey-list">
      {items.map(({ key, note }) => {
        const prey = preyCatalog[key];
        return (
          <div className="prey" key={key}>
            <PreyArt preyKey={key} />
            <span>{prey.name}</span>
            {note && <small>{note}</small>}
          </div>
        );
      })}
    </div>
  );
}
export default function RaptorApp() {
  const [selected, setSelected] = useState('rotschwanzbussard');
  const [chosenPlumage, setPlumage] = useState<Plumage>('male');
  const [chosenMorphs, setMorphs] = useState<Record<string, string>>({});
  const [query, setQuery] = useState('');
  const [grouping, setGrouping] = useState<GroupMode>('genus');
  const [dark, setDark] = useState(false);
  const [hintOpen, setHintOpen] = useState(false);
  const [infoTab, setInfoTab] = useState('profil');
  const bird = birds.find((b) => b.id === selected)!;
  const availablePlumages = plumagesFor(bird.id);
  const plumage = availablePlumages.some((p) => p.value === chosenPlumage)
    ? chosenPlumage
    : 'male';
  const bodyColors = bodyColorsFor(bird.id, plumage);
  const morphConfig = getBirdMorphConfig(bird.id);
  const morph = getBirdMorphChoice(bird.id, chosenMorphs[bird.id]);
  const appearance = getBirdMorphAppearance(
    bird.id,
    morph?.id,
    plumage === 'juvenile' ? 'juvenile' : 'male',
  );
  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const theme = localStorage.getItem('raptor:theme');
        setDark(theme === 'dark');
      } catch {}
    }, 0);
    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
  }, [dark]);
  const { barRef: plumageBarRef, pillRef: plumagePillRef } = useSlidingPill(
    bird.id,
    plumage,
  );
  const { barRef: morphBarRef, pillRef: morphPillRef } = useSlidingPill(
    bird.id,
    morph?.id ?? '',
  );
  const { barRef: infoBarRef, pillRef: infoPillRef } = useSlidingPill(
    'info',
    infoTab,
  );
  function theme() {
    setDark(!dark);
    try {
      localStorage.setItem('raptor:theme', !dark ? 'dark' : 'light');
    } catch {}
  }
  function select(id: string) {
    setSelected(id);
  }
  function warmBird(
    id: string,
    age = chosenPlumage,
    morphId = chosenMorphs[id],
  ) {
    const ageForBird = plumagesFor(id).some((p) => p.value === age)
      ? age
      : 'male';
    const variant = getBirdMorphAppearance(
      id,
      morphId,
      ageForBird === 'juvenile' ? 'juvenile' : 'male',
    );
    void loadImage(
      imageSource(variant?.image ?? birdImage(id, ageForBird)),
    ).catch(() => {});
  }
  const filtered = filterBirds(query);
  const groups = groupBirds(filtered, grouping);
  return (
    <TooltipProvider delay={180}>
      <div className="app-shell">
        <header className="topbar">
          <div className="site-title">Die Welt der Greifvögel</div>
          <div className="search-wrap topbar-search">
            <Search size={17} />
            <Input
              aria-label="Vogelart suchen"
              placeholder="Vogelart suchen"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {query && (
              <button
                className="clear-search"
                aria-label="Suche leeren"
                onClick={() => setQuery('')}
              >
                <X size={14} />
              </button>
            )}
          </div>
          <div className="header-actions">
            <Tooltip>
              <TooltipTrigger
                render={
                  <Button
                    variant="ghost"
                    size="icon"
                    className="theme-toggle"
                    onClick={theme}
                    aria-label={
                      dark ? 'Hellmodus aktivieren' : 'Dunkelmodus aktivieren'
                    }
                  />
                }
              >
                <span className="t-icon-swap" data-state={dark ? 'b' : 'a'}>
                  <span className="t-icon" data-icon="a">
                    <Moon />
                  </span>
                  <span className="t-icon" data-icon="b">
                    <Sun />
                  </span>
                </span>
              </TooltipTrigger>
              <TooltipContent>
                {dark ? 'Hellmodus' : 'Dunkelmodus'}
              </TooltipContent>
            </Tooltip>
          </div>
        </header>
        <SidebarProvider className="app-columns">
          <Sidebar collapsible="none" className="species-panel">
            <div className="library-top">
              <div className="grouping-control">
                <span>Gruppieren nach</span>
                <Select
                  value={grouping}
                  onValueChange={(v) => {
                    if (v) setGrouping(v as GroupMode);
                  }}
                  items={groupingOptions}
                >
                  <SelectTrigger
                    aria-label="Vogelarten gruppieren nach"
                    className="grouping-select"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent
                    className="grouping-options t-dropdown"
                    align="start"
                    sideOffset={6}
                    alignItemWithTrigger={false}
                    data-origin="top-left"
                  >
                    {groupingOptions.map((o) => (
                      <SelectItem value={o.value} key={o.value}>
                        {o.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <nav aria-label="Vogelarten" className="grouped-navigation">
              {groups.map((group) => (
                <section className="species-group" key={group.id}>
                  <h3 className="species-group-title">
                    <span>{group.title}</span>
                    {group.subtitle && <small>{group.subtitle}</small>}
                  </h3>
                  <SidebarMenu className="bird-list">
                    {group.birds.map((b) => (
                      <SidebarMenuItem key={b.id}>
                        <SidebarMenuButton
                          className="bird-entry"
                          isActive={selected === b.id}
                          aria-current={selected === b.id ? 'true' : undefined}
                          onClick={() => select(b.id)}
                          onPointerEnter={() => warmBird(b.id)}
                          onFocus={() => warmBird(b.id)}
                        >
                          <span
                            className="portrait head-portrait own-portrait"
                            data-species={b.id}
                            style={{
                              backgroundImage: `url(${imageSource(portraitImages[b.id])})`,
                            }}
                            aria-hidden="true"
                          />
                          <span
                            className={`bird-label ${b.name.length > 15 ? 'long-label' : ''}`}
                          >
                            <strong>{b.name}</strong>
                            <em>{b.latin}</em>
                          </span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </section>
              ))}
            </nav>
            {filtered.length === 0 && (
              <div className="empty-library">
                <Feather />
                <p>Keine Art gefunden.</p>
                <span>Versuche einen anderen Suchbegriff.</span>
                <Button variant="link" onClick={() => setQuery('')}>
                  Alle Arten anzeigen
                </Button>
              </div>
            )}
          </Sidebar>
          <main id="main-content" className="specimen-panel">
            <div className="specimen-heading">
              <RevealHeading name={bird.name} latin={bird.latin} />
            </div>
            <Tabs
              value={plumage}
              onValueChange={(v) => setPlumage(v as Plumage)}
              className="plumage-tabs"
            >
              <div className="specimen-controls">
                <div className="control-group">
                  <span className="control-label" aria-hidden="true">
                    {availablePlumages.length > 2 ? 'Kleid' : 'Alter'}
                  </span>
                  <TabsList
                    className="plumage-list t-tabs"
                    aria-label="Geschlecht und Alter"
                    ref={plumageBarRef}
                  >
                    <span
                      className="t-tabs-pill"
                      aria-hidden="true"
                      ref={plumagePillRef}
                    />
                    {availablePlumages.map((p) => (
                      <TabsTrigger
                        className="t-tab"
                        key={p.value}
                        value={p.value}
                        onPointerEnter={() => warmBird(bird.id, p.value)}
                        onFocus={() => warmBird(bird.id, p.value)}
                      >
                        {p.label}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </div>
                {morphConfig && morph && (
                  <fieldset
                    className="morph-control control-group"
                    aria-label={morphConfig.label}
                  >
                    <span className="control-label" aria-hidden="true">
                      {morphConfig.label}
                    </span>
                    <div className="t-tabs" ref={morphBarRef}>
                      <span
                        className="t-tabs-pill"
                        aria-hidden="true"
                        ref={morphPillRef}
                      />
                      {morphConfig.choices.map((choice) => (
                        <button
                          type="button"
                          key={choice.id}
                          className="morph-choice t-tab"
                          aria-pressed={morph.id === choice.id}
                          onPointerEnter={() =>
                            warmBird(bird.id, plumage, choice.id)
                          }
                          onFocus={() => warmBird(bird.id, plumage, choice.id)}
                          onClick={() =>
                            setMorphs((previous) => ({
                              ...previous,
                              [bird.id]: choice.id,
                            }))
                          }
                        >
                          {choice.label}
                        </button>
                      ))}
                    </div>
                  </fieldset>
                )}
              </div>
              <TabsContent
                value={plumage}
                keepMounted
                className="plumage-panel"
              >
                <div className="image-stage">
                  <div className="hero-art">
                    <BirdArt
                      bird={bird}
                      plumage={plumage}
                      morphId={morph?.id}
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            <section
              className="measurements specimen-measurements"
              aria-label="Größe und Gewicht"
            >
              <div>
                <span>Spannweite</span>
                <Measurement value={bird.span} unit="cm" />
              </div>
              <div>
                <span>Gewicht</span>
                <Measurement value={bird.weight} unit={bird.unit} />
              </div>
            </section>
            <div className="image-credit">KI-generierte Illustration</div>
          </main>
          <aside
            className="info-panel"
            aria-label={`Informationen zum ${bird.name}`}
          >
            <Tabs
              value={infoTab}
              onValueChange={(v) => setInfoTab(String(v))}
              className="info-tabs"
            >
              <TabsList
                variant="line"
                className="info-tab-list t-tabs"
                aria-label="Informationen"
                ref={infoBarRef}
              >
                <span
                  className="t-tabs-pill"
                  aria-hidden="true"
                  ref={infoPillRef}
                />
                <TabsTrigger className="t-tab" value="profil">
                  Steckbrief
                </TabsTrigger>
                <TabsTrigger className="t-tab" value="nahrung">
                  Nahrung
                </TabsTrigger>
                <TabsTrigger className="t-tab" value="lebensraum">
                  Lebensraum
                </TabsTrigger>
              </TabsList>
              <TabsContent value="profil" className="info-tab-content">
                <section className="profile-section">
                  <h2>Erkennungsmerkmale</h2>
                  <p>{speciesProfiles[bird.id].identification}</p>
                </section>
                <section className="color-section">
                  <h2>Farben</h2>
                  <div className="body-colors">
                    <ColorRow
                      label="Gefieder"
                      colors={appearance?.colors ?? colorsFor(bird, plumage)}
                    />
                    <ColorRow label="Augen" colors={bodyColors.eyes} />
                    <ColorRow
                      label="Beine & Füße"
                      colors={bodyColors.legs}
                      note={bodyColors.note}
                    />
                  </div>
                  <div className="plumage-note">
                    <h3>
                      {
                        plumagesFor(bird.id).find((p) => p.value === plumage)!
                          .label
                      }
                      {morph && ` · ${morph.label}`}
                    </h3>
                    <p>
                      {appearance?.note ?? plumageNoteFor(bird.id, plumage)}
                    </p>
                    {morphConfig && (
                      <div
                        className="morph-context t-acc"
                        data-open={hintOpen ? 'true' : 'false'}
                      >
                        <button
                          type="button"
                          className="t-acc-head"
                          aria-expanded={hintOpen}
                          onClick={() => setHintOpen(!hintOpen)}
                        >
                          <span className="t-acc-chevron" aria-hidden="true">
                            <svg viewBox="0 0 16 16">
                              <path d="M4 6.5L8 10.5L12 6.5" />
                            </svg>
                          </span>
                          Hinweis zu den Farbformen
                        </button>
                        <div className="t-acc-panel">
                          <div className="t-acc-panel-inner">
                            <p>{morphConfig.note}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </section>
                <section className="profile-section">
                  <h2>Lebensweise</h2>
                  <p>{speciesProfiles[bird.id].behaviour}</p>
                </section>
                <section className="profile-section">
                  <h2>Brut & Aufzucht</h2>
                  <p>{speciesProfiles[bird.id].breeding}</p>
                </section>
              </TabsContent>
              <TabsContent value="nahrung" className="info-tab-content">
                <section className="diet-section">
                  <h2>Beutetiere</h2>
                  <PreyGallery items={diets[bird.id].examples} />
                  <p>{diets[bird.id].summary}</p>
                  {diets[bird.id].occasionalExamples.length > 0 && (
                    <div className="occasional-prey">
                      <h3>Gelegentlich</h3>
                      <PreyGallery items={diets[bird.id].occasionalExamples} />
                    </div>
                  )}
                </section>
                <section className="hunting-section">
                  <h2>Jagdweise</h2>
                  <HuntingArt bird={bird} />
                  <h3>{hunts[bird.id].title}</h3>
                  <p className="hunting-text">{hunts[bird.id].text}</p>
                </section>
              </TabsContent>
              <TabsContent value="lebensraum" className="info-tab-content">
                <section className="habitat">
                  <div className="habitat-gallery">
                    {speciesLandscapes[bird.id].map((id) => (
                      <figure key={id}>
                        <Image
                          src={imageSource(habitatImages[id])}
                          alt={landscapes[id].description}
                          width={1536}
                          height={1024}
                          unoptimized
                        />
                        <figcaption>{landscapes[id].label}</figcaption>
                      </figure>
                    ))}
                  </div>
                  <h2>Lebensraum</h2>
                  <p>{bird.habitat}</p>
                  <div className="range-block">
                    <h2>Verbreitung</h2>
                    <p>{bird.range}</p>
                    <RangeMap key={bird.id} birdId={bird.id} name={bird.name} />
                  </div>
                </section>
              </TabsContent>
            </Tabs>
          </aside>
        </SidebarProvider>
        <output className="sr-only" aria-live="polite">
          {bird.name}
        </output>
      </div>
    </TooltipProvider>
  );
}
