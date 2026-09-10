'use client';
import {
  AppSelectTrigger as SelectTrigger,
  AppSelectContent as SelectContent,
} from '@/components/app-select';
import { SpeciesName, SpeciesScientificName } from '@/components/species-name';
import { useEffect, useRef, useState } from 'react';
import { useSlidingPill } from '@/lib/use-sliding-pill';
import { SegmentedControl } from '@/components/segmented-control';
import { ArtImage } from '@/components/art-image';
import { BirdAudio, BirdAudioCredit } from '@/components/bird-audio';
import { birdHref, birdForPath } from '@/lib/bird-routes';
import { SITE_NAME, SITE_URL } from '@/lib/site';
import {
  Feather,
  CaretDown,
  GenderFemale,
  GenderMale,
} from '@/components/icons';
import { SiteHeader } from '@/components/site-header';
import { Button } from '@/components/ui/button';
import { Select, SelectValue, SelectItem } from '@/components/ui/select';
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
  filterBirds,
  groupBirds,
  groupingOptions,
  plumagesFor,
  plumageNoteFor,
  birdImage,
  colorsFor,
  bodyColorsFor,
  type ColorSwatch,
  type Plumage,
  type GroupMode,
  type BirdSpecies,
  type MeasurementRange,
} from '@/lib/birds';
import { landscapes } from '@/lib/habitats';
import { speciesById, huntingTypes, statusLabels } from '@/lib/ecology';
import { habitatImages } from '@/lib/habitat-images';
import { portraitImages } from '@/lib/portrait-images';
import { huntingImages } from '@/lib/hunting-images';
import { preyCatalog, type PreyExample } from '@/lib/diets';
import { PreyArt } from '@/components/prey-art';
import { imageSource } from '@/lib/optimized-images.ts';
import { loadImage } from '@/lib/image-loader';
import { SpeciesFacts } from '@/components/species-facts';
import { speciesProfiles } from '@/lib/species-profiles';
import { RangeMap } from '@/components/range-map';
import {
  getBirdMorphConfig,
  getBirdMorphChoice,
  getBirdMorphAppearance,
} from '@/lib/morphs';
const wholeNumber = new Intl.NumberFormat('de-DE', {
  maximumFractionDigits: 0,
});
/** Renders a stored [min, max] as display text; weights are always shown in grams. */
export function formatMeasurement([min, max]: MeasurementRange) {
  return min === max
    ? wholeNumber.format(min)
    : `${wholeNumber.format(min)}–${wholeNumber.format(max)}`;
}

function MeasurementValue({ value, unit }: { value: string; unit: string }) {
  // transitions.dev number pop-in: every character is a .t-digit, the last two
  // ride in behind the rest. Keying the group by value replays it on change.
  const pieces = value
    .split('')
    .map((ch) => ({ ch: ch === ' ' ? '\u00A0' : ch }));
  const stagger1 = pieces.length - 2;
  const stagger2 = pieces.length - 1;
  return (
    <>
      <span className="t-digit-group is-animating" key={value}>
        {pieces.map((p, i) => (
          <span
            className={`t-digit${p.ch === '–' ? ' measurement-secondary measurement-dash' : ''}`}
            data-stagger={
              i === stagger1 ? '1' : i === stagger2 ? '2' : undefined
            }
            key={i}
          >
            {p.ch}
          </span>
        ))}
      </span>
      <small>{unit}</small>
    </>
  );
}

type Sex = 'female' | 'male';

/** Two-icon mini switch, only rendered for dimorphic species: ♀ left, ♂ right. */
function SexSwitch({
  value,
  onChange,
}: {
  value: Sex;
  onChange: (sex: Sex) => void;
}) {
  // One control: clicking anywhere on the pill flips the sex.
  const male = value === 'male';
  return (
    <button
      type="button"
      className="sex-switch"
      role="switch"
      aria-checked={male}
      aria-label={male ? 'Männchen angezeigt' : 'Weibchen angezeigt'}
      title={male ? 'Zu Weibchen wechseln' : 'Zu Männchen wechseln'}
      onClick={() => onChange(male ? 'female' : 'male')}
    >
      <span className="sex-switch-option" data-active={!male}>
        <GenderFemale size={12} />
      </span>
      <span className="sex-switch-option" data-active={male}>
        <GenderMale size={12} />
      </span>
    </button>
  );
}

/**
 * One measurement cell. With sex-specific ranges it shows the range of the
 * chosen sex; the switch itself sits next to the label when `onSexChange` is given.
 * Only the weight is dimorphic; the wingspan is always the combined species range.
 */
function Measurement({
  label,
  range,
  sexes,
  unit,
  sex,
  onSexChange,
}: {
  label: string;
  range: MeasurementRange;
  sexes?: { male?: MeasurementRange; female?: MeasurementRange };
  unit: 'cm' | 'g';
  sex: Sex;
  onSexChange?: (sex: Sex) => void;
}) {
  const shown = (sexes?.male && sexes?.female && sexes[sex]) || range;
  return (
    <div>
      <span>
        {label}
        {onSexChange && <SexSwitch value={sex} onChange={onSexChange} />}
      </span>
      <p>
        <MeasurementValue value={formatMeasurement(shown)} unit={unit} />
      </p>
    </div>
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
      <SpeciesName
        name={initial.name}
        latin={initial.latin}
        commonAs="h1"
        scientificAs="p"
        animated
        variant="atlas-title"
      />
    </div>
  );
}
/* transitions.dev tabs sliding: JS writes the active tab's offset and width
   onto the pill, CSS tweens it. A new group (another species) snaps instead. */
type ArtLayer = { src: string; alt: string };
type ArtSlots = { a: ArtLayer; b: ArtLayer | null; active: 'a' | 'b' };
/* transitions.dev icon swap: both illustrations sit in one grid cell and
   data-state picks the visible one. A new image is decoded first, parked in
   the hidden slot, then the state flips on the next frame so it fades in
   while the old one fades out with blur and a slight scale. */
function BirdArt({
  bird,
  plumage,
  morphId,
}: {
  bird: BirdSpecies;
  plumage: Plumage;
  morphId?: string;
}) {
  const morphConfig = getBirdMorphConfig(bird.id, plumage);
  const morph = getBirdMorphChoice(bird.id, morphId, plumage);
  const appearance = getBirdMorphAppearance(bird.id, morphId, plumage);
  const nextSource = imageSource(
    appearance?.image ?? birdImage(bird.id, plumage),
  );
  const nextAlt = `${bird.name} – ${plumagesFor(bird.id).find((p) => p.value === plumage)!.label}${morph ? `, ${morphConfig!.label} ${morph.label}` : ''}`;
  const [slots, setSlots] = useState<ArtSlots>({
    a: { src: nextSource, alt: nextAlt },
    b: null,
    active: 'a',
  });
  const [failedSource, setFailedSource] = useState<string | null>(null);
  const [retry, setRetry] = useState(0);
  const shown = slots[slots.active]!;
  useEffect(() => {
    if (nextSource === shown.src) return;
    let cancelled = false;
    let frame = 0;
    loadImage(nextSource)
      .then(() => {
        if (cancelled) return;
        setFailedSource(null);
        const next = slots.active === 'a' ? 'b' : 'a';
        setSlots((s) => ({ ...s, [next]: { src: nextSource, alt: nextAlt } }));
        frame = requestAnimationFrame(() => {
          frame = requestAnimationFrame(() => {
            if (!cancelled) setSlots((s) => ({ ...s, active: next }));
          });
        });
      })
      .catch(() => {
        if (!cancelled) setFailedSource(nextSource);
      });
    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
    };
  }, [nextSource, nextAlt, shown.src, slots.active, retry]);
  return (
    <div
      className="bird-art t-icon-swap"
      data-state={slots.active}
      aria-busy={nextSource !== shown.src}
    >
      {(['a', 'b'] as const).map((slot) => {
        const layer = slots[slot];
        return (
          layer && (
            <span className="t-icon" data-icon={slot} key={slot}>
              <ArtImage
                key={layer.src}
                src={layer.src}
                alt={slots.active === slot ? layer.alt : ''}
                width={1536}
                height={1536}
                sizes="(max-width: 980px) 100vw, 920px"
                priority
              />
            </span>
          )
        );
      })}
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
        {/* Stable slots let CSS blend colors instead of remounting each dot. */}
        {colors.map(([name, color], index) => (
          <Tooltip key={index}>
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
  const hunt = speciesById[bird.id].ecology.hunting;
  const source = huntingImages[bird.id] ?? hunt.image;
  if (!source) return null;
  return (
    <ArtImage
      className="hunting-standalone"
      src={imageSource(source)}
      width={1536}
      height={1536}
      alt={`${bird.name}: ${hunt.title}`}
      displayWidth={440}
    />
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
export default function RaptorApp({
  initialBirdId = 'rotschwanzbussard',
}: {
  initialBirdId?: string;
}) {
  const [selected, setSelected] = useState(initialBirdId);
  const [chosenPlumage, setPlumage] = useState<Plumage>('male');
  const [sex, setSex] = useState<Sex>('male');
  const [chosenMorphs, setMorphs] = useState<Record<string, string>>({});
  const [query, setQuery] = useState('');
  const [grouping, setGrouping] = useState<GroupMode>('genus');
  const [hintOpen, setHintOpen] = useState(false);
  const [infoTab, setInfoTab] = useState('profil');
  const [path, setPath] = useState('');
  const bird = speciesById[selected];
  useEffect(() => {
    function syncFromUrl() {
      const legacyId = new URLSearchParams(window.location.search).get('art');
      const current =
        birdForPath(window.location.pathname) ??
        speciesById[legacyId ?? ''] ??
        speciesById[initialBirdId];
      setSelected(current.id);
      // The legacy ?art= links get rewritten to their species path. The home
      // page keeps its own URL: it is the site's canonical entry point, not a
      // duplicate of whichever species it happens to open on.
      if (legacyId) {
        window.history.replaceState(
          window.history.state,
          '',
          birdHref(current),
        );
        setPath(birdHref(current));
      } else setPath(window.location.pathname);
    }
    syncFromUrl();
    window.addEventListener('popstate', syncFromUrl);
    return () => window.removeEventListener('popstate', syncFromUrl);
  }, [initialBirdId]);
  useEffect(() => {
    // Before the first sync the server-rendered title and canonical still fit.
    if (!path || path === '/') return;
    document.title = `${bird.name} · ${SITE_NAME}`;
    document
      .querySelector('link[rel="canonical"]')
      ?.setAttribute('href', SITE_URL + birdHref(bird));
  }, [bird, path]);
  const availablePlumages = plumagesFor(bird.id);
  const plumage = availablePlumages.some((p) => p.value === chosenPlumage)
    ? chosenPlumage
    : 'male';
  const bodyColors = bodyColorsFor(bird.id, plumage);
  const morphConfig = getBirdMorphConfig(bird.id, plumage);
  const morph = getBirdMorphChoice(bird.id, chosenMorphs[bird.id], plumage);
  const appearance = getBirdMorphAppearance(bird.id, morph?.id, plumage);
  const morphOptions =
    morphConfig?.choices.map((choice) => ({
      value: choice.id,
      label: choice.label,
    })) ?? [];
  const { barRef: infoBarRef, pillRef: infoPillRef } = useSlidingPill(
    'info',
    infoTab,
  );
  function select(id: string) {
    setSelected(id);
    const href = birdHref(speciesById[id]);
    if (window.location.pathname !== href)
      window.history.pushState(window.history.state, '', href);
    setPath(href);
  }
  function warmBird(
    id: string,
    age = chosenPlumage,
    morphId = chosenMorphs[id],
  ) {
    const ageForBird = plumagesFor(id).some((p) => p.value === age)
      ? age
      : 'male';
    const variant = getBirdMorphAppearance(id, morphId, ageForBird);
    void loadImage(
      imageSource(variant?.image ?? birdImage(id, ageForBird)),
    ).catch(() => {});
  }
  const filtered = filterBirds(query);
  const groups = groupBirds(filtered, grouping);
  return (
    <TooltipProvider delay={180}>
      <div className="app-shell">
        <SiteHeader
          activeSection="birds"
          query={query}
          onQueryChange={setQuery}
        />
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
                  <SelectTrigger aria-label="Vogelarten gruppieren nach">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent
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
                    {group.subtitle && (
                      <SpeciesScientificName as="small">
                        {group.subtitle}
                      </SpeciesScientificName>
                    )}
                  </h3>
                  <SidebarMenu className="bird-list">
                    {group.birds.map((b) => (
                      <SidebarMenuItem key={b.id}>
                        <SidebarMenuButton
                          className="bird-entry"
                          isActive={selected === b.id}
                          aria-current={selected === b.id ? 'page' : undefined}
                          render={
                            // oxlint-disable-next-line jsx-a11y/anchor-has-content, jsx-a11y/control-has-associated-label -- the sidebar button supplies the link text
                            <a href={birdHref(b)} />
                          }
                          onClick={(event) => {
                            if (
                              event.metaKey ||
                              event.ctrlKey ||
                              event.shiftKey ||
                              event.altKey
                            )
                              return;
                            event.preventDefault();
                            select(b.id);
                          }}
                          onPointerEnter={() => warmBird(b.id)}
                          onFocus={() => warmBird(b.id)}
                        >
                          <span
                            className="portrait head-portrait own-portrait"
                            data-species={b.id}
                            style={
                              portraitImages[b.id]
                                ? {
                                    backgroundImage: `url(${imageSource(portraitImages[b.id])})`,
                                  }
                                : { backgroundImage: 'none' }
                            }
                            aria-hidden="true"
                          />
                          <span
                            className={`bird-label ${b.name.length > 15 ? 'long-label' : ''}`}
                          >
                            <SpeciesName
                              name={b.name}
                              variant="sidebar"
                              latin={b.latin}
                              commonAs="strong"
                              scientificAs="em"
                            />
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
            <div className="plumage-stage">
              <div className="specimen-controls">
                <div className="control-group">
                  <span className="control-label" aria-hidden="true">
                    {availablePlumages.length > 2 ? 'Kleid' : 'Alter'}
                  </span>
                  <SegmentedControl
                    label="Geschlecht und Alter"
                    group={bird.id}
                    value={plumage}
                    options={availablePlumages}
                    onChange={setPlumage}
                    onPreload={(value) => warmBird(bird.id, value)}
                  />
                </div>
                {morphConfig && morph && (
                  <div className="morph-control control-group">
                    <span className="control-label" aria-hidden="true">
                      {morphConfig.label}
                    </span>
                    <SegmentedControl
                      label={morphConfig.label}
                      group={bird.id}
                      value={morph.id}
                      options={morphOptions}
                      onChange={(id) =>
                        setMorphs((previous) => ({
                          ...previous,
                          [bird.id]: id,
                        }))
                      }
                      onPreload={(id) => warmBird(bird.id, plumage, id)}
                    />
                  </div>
                )}
              </div>
              <div className="plumage-panel">
                <div className="image-stage">
                  <div className="hero-art">
                    <BirdArt
                      bird={bird}
                      plumage={plumage}
                      morphId={morph?.id}
                    />
                  </div>
                </div>
              </div>
            </div>
            <section
              className="measurements specimen-measurements"
              aria-label="Größe und Gewicht"
            >
              <Measurement
                label="Spannweite"
                range={bird.span}
                unit="cm"
                sex={sex}
              />
              <Measurement
                label="Gewicht"
                range={bird.weight}
                sexes={
                  bird.sexes
                    ? {
                        male: bird.sexes.male.weight,
                        female: bird.sexes.female.weight,
                      }
                    : undefined
                }
                unit="g"
                sex={sex}
                onSexChange={bird.sexes ? setSex : undefined}
              />
              <BirdAudio key={bird.id} birdId={bird.id} name={bird.name} />
            </section>
            <div className="image-credit">
              <span>KI-generierte Illustration</span>
              <BirdAudioCredit
                key={bird.id}
                birdId={bird.id}
                name={bird.name}
              />
            </div>
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
                className="t-tabs t-tabs-line info-tab-list"
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
              <div className="info-scroll detail-panel">
                <TabsContent value="profil" className="info-tab-content">
                  <SpeciesFacts speciesId={bird.id} />
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
                              <CaretDown />
                            </span>
                            {morphConfig.hintLabel ??
                              'Hinweis zu den Farbformen'}
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
                    <h2>Nahrungsbeispiele</h2>
                    <PreyGallery items={bird.ecology.diet.examples} />
                    <p>{bird.ecology.diet.summary}</p>
                    {bird.ecology.diet.occasionalExamples.length > 0 && (
                      <div className="occasional-prey">
                        <h3>Gelegentlich</h3>
                        <PreyGallery
                          items={bird.ecology.diet.occasionalExamples}
                        />
                      </div>
                    )}
                  </section>
                  <section className="hunting-section">
                    <h2>Jagdweise</h2>
                    <div className="ecology-tags">
                      {bird.ecology.huntingTags.map((id) => (
                        <span key={id}>{huntingTypes[id].label}</span>
                      ))}
                    </div>
                    <HuntingArt bird={bird} />
                    <p className="hunting-text">{bird.ecology.hunting.text}</p>
                  </section>
                </TabsContent>
                <TabsContent value="lebensraum" className="info-tab-content">
                  <section className="habitat">
                    <div className="range-block">
                      <h2>Verbreitung</h2>
                      <p>{bird.range}</p>
                      {bird.ecology.status.tags.some(
                        (id) => id !== 'ausserhalb',
                      ) && (
                        <div className="ecology-status">
                          <h3>Status in Deutschland</h3>
                          <div className="ecology-tags">
                            {bird.ecology.status.tags
                              .filter((id) => id !== 'ausserhalb')
                              .map((id) => (
                                <span key={id}>{statusLabels[id]}</span>
                              ))}
                          </div>
                        </div>
                      )}
                      <RangeMap birdId={bird.id} name={bird.name} />
                    </div>
                    <h2>Lebensraum</h2>
                    <p>{bird.habitat}</p>
                    <div className="habitat-gallery">
                      {bird.ecology.habitatTags.map((id) => (
                        <figure key={id}>
                          <ArtImage
                            src={imageSource(habitatImages[id])}
                            alt={landscapes[id].description}
                            width={1536}
                            height={1024}
                            displayWidth={220}
                          />
                          <figcaption>{landscapes[id].label}</figcaption>
                        </figure>
                      ))}
                    </div>
                  </section>
                </TabsContent>
              </div>
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
