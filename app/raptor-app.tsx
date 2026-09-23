'use client';
import { AtlasInfoPanel, AtlasPanelBody, SpecimenHeader } from '@/components/atlas-panel';
import { GlossaryText } from '@/components/glossary-text';
import { EcologyTag } from '@/components/ecology-tag';
import { MeasurementStrip } from '@/components/measurement-strip';
import { tabStyles } from '@/components/tab-styles';
import {
  AppSelectTrigger as SelectTrigger,
  AppSelectContent as SelectContent,
} from '@/components/app-select';
import { cn } from '@/lib/utils';
import {
  TaxonomyFullscreen,
  TaxonomyTrigger,
} from '@/components/taxonomy-fullscreen';
import { taxonomyPathForSearch, taxonomySearch } from '@/lib/taxonomy-routes';
import {
  SpeciesCommonName,
  SpeciesScientificName,
} from '@/components/species-name';
import { SpeciesRowContent } from '@/components/species-row';
import { useEffect, useRef, useState } from 'react';
import { useSlidingPill } from '@/lib/use-sliding-pill';
import { SegmentedControl } from '@/components/segmented-control';
import { ArtImage } from '@/components/art-image';
import { BirdAudio, BirdAudioCredit } from '@/components/bird-audio';
import { birdRecordings } from '@/lib/bird-recordings';
import {
  birdHref,
  birdForPath,
  birdFullscreenHref,
  birdTaxonomyHref,
  isBirdTaxonomyPath,
  isBirdFullscreenPath,
  birdInfoTabForSearch,
  birdInfoSearch,
  birdPageTitle,
  type BirdInfoTab,
} from '@/lib/bird-routes';
import { techniqueHref } from '@/lib/knowledge-routes';
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/lib/site';
import {
  Feather,
  CaretDown,
  GenderFemale,
  GenderMale,
} from '@/components/icons';
import { SearchField } from '@/components/search-field';
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { SiteHeader } from '@/components/site-header';
import {
  Select,
  SelectValue,
  SelectItem,
  SelectTrigger as PlainSelectTrigger,
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
import { DetailHeading } from '@/components/detail-text';
import { AtlasSection } from '@/components/atlas-section';
import { PreyArt } from '@/components/prey-art';
import { imageSource } from '@/lib/optimized-images.ts';
import { loadImage } from '@/lib/image-loader';
import { SpeciesFacts } from '@/components/species-facts';
import {
  InfoFullscreen,
  InfoFullscreenTrigger,
} from '@/components/info-fullscreen';
import { SpeciesTrivia } from '@/components/species-trivia';
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

function MeasurementValue({
  value,
  unit,
  withAudio,
}: {
  value: string;
  unit: string;
  withAudio: boolean;
}) {
  // transitions.dev number pop-in: every character is a .t-digit, the last two
  // ride in behind the rest. Keying the group by value replays it on change.
  const pieces = value
    .split('')
    .map((ch) => ({ ch: ch === ' ' ? '\u00A0' : ch }));
  const stagger1 = pieces.length - 2;
  const stagger2 = pieces.length - 1;
  return (
    <>
      <span
        className="t-digit-group inline-flex items-baseline whitespace-pre is-animating"
        key={value}
      >
        {pieces.map((p, i) => (
          <span
            className={cn(
              't-digit inline-block',
              p.ch === '–' &&
                'measurement-secondary text-muted-foreground measurement-dash px-[0.08em]',
            )}
            data-stagger={
              i === stagger1 ? '1' : i === stagger2 ? '2' : undefined
            }
            key={i}
          >
            {p.ch}
          </span>
        ))}
      </span>
      <small
        className={cn(
          'measurement-unit font-(family-name:--font-stack-body) text-(length:--type-ui) leading-(--leading-normal) font-(--weight-regular) tracking-(--tracking-normal) text-muted-foreground',
          withAudio
            ? 'ml-[6px] to-phone:ml-1 to-phone:text-(length:--type-caption)'
            : 'ml-2',
        )}
      >
        {unit}
      </small>
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
      className="sex-switch inline-flex items-center gap-[2px] p-[2px]"
      role="switch"
      aria-checked={male}
      aria-label={male ? 'Männchen angezeigt' : 'Weibchen angezeigt'}
      title={male ? 'Zu Weibchen wechseln' : 'Zu Männchen wechseln'}
      onClick={() => onChange(male ? 'female' : 'male')}
    >
      <span
        className="sex-switch-option bg-transparent data-[active=true]:text-(--tabs-text-active) data-[active=true]:bg-(--tabs-pill-bg) data-[active=true]:shadow-(--shadow-active-pill) transition-[color,background] duration-(--tabs-dur) ease-(--tabs-ease) rounded-(--radius-tab-pill) text-(--tabs-text-muted) inline-flex items-center justify-center w-[18px] h-[16px]"
        data-active={!male}
      >
        <GenderFemale size={12} />
      </span>
      <span
        className="sex-switch-option bg-transparent data-[active=true]:text-(--tabs-text-active) data-[active=true]:bg-(--tabs-pill-bg) data-[active=true]:shadow-(--shadow-active-pill) transition-[color,background] duration-(--tabs-dur) ease-(--tabs-ease) rounded-(--radius-tab-pill) text-(--tabs-text-muted) inline-flex items-center justify-center w-[18px] h-[16px]"
        data-active={male}
      >
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
  className = '',
  withAudio = false,
}: {
  withAudio?: boolean;
  label: string;
  range: MeasurementRange;
  sexes?: { male?: MeasurementRange; female?: MeasurementRange };
  unit: 'cm' | 'g';
  sex: Sex;
  onSexChange?: (sex: Sex) => void;
  className?: string;
}) {
  const shown = (sexes?.male && sexes?.female && sexes[sex]) || range;
  return (
    <div
      className={cn(
        'measurement-cell min-w-0 m-0 text-center [container-type:inline-size]',
        withAudio
          ? 'grid grid-cols-[minmax(0,1fr)] grid-rows-[var(--space-24)_auto] content-center items-center justify-items-center gap-y-half px-3 to-tablet:px-[7px] to-phone:px-1'
          : 'block px-4',
        className,
      )}
    >
      <span
        className={cn(
          'measurement-label inline-flex items-center justify-center gap-2 text-(length:--type-ui) text-muted-foreground',
          withAudio
            ? 'leading-[20px] m-0'
            : 'leading-(--leading-normal) mb-[7px] from-compact:mb-[5px]',
        )}
      >
        {label}
        {onSexChange && <SexSwitch value={sex} onChange={onSexChange} />}
      </span>
      <p
        className={cn(
          'measurement-value font-(family-name:--font-stack-display) font-(--weight-medium) tracking-(--tracking-tight)',
          withAudio
            ? 'm-0 flex items-baseline justify-center whitespace-nowrap text-(length:--type-metric-compact)'
            : 'text-(length:--type-metric) whitespace-normal to-phone:mt-[3px]',
          'leading-(--leading-display)',
        )}
      >
        <MeasurementValue
          value={formatMeasurement(shown)}
          unit={unit}
          withAudio={withAudio}
        />
      </p>
    </div>
  );
}
/* transitions.dev texts reveal: the name and Latin name rise in with a
   staggered blur. On a species change the block fades out quietly (200ms),
   then the new text is written into the DOM and the reveal replays. */
function RevealHeading({
  name,
  latin,
  selected,
  onOpenTaxonomy,
}: {
  name: string;
  latin: string;
  selected: string;
  onOpenTaxonomy: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [initial] = useState({ name, latin });
  useEffect(() => {
    const block = ref.current;
    if (!block) return;
    const lines = [...block.querySelectorAll<HTMLElement>('.t-stagger-line')];
    const common = block.querySelector<HTMLElement>(
      '[data-species-name="common"]',
    );
    const scientific = block.querySelector<HTMLElement>(
      '[data-species-name="scientific"]',
    );
    if (!common || !scientific) return;
    if (common.textContent === name && scientific.textContent === latin) return;
    block.classList.add('is-hiding');
    block.classList.remove('is-shown');
    const timer = setTimeout(() => {
      common.textContent = name;
      scientific.textContent = latin;
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
    <div
      className="t-stagger is-shown w-full px-[15px] to-desktop:px-[3px] to-phone:contents"
      ref={ref}
    >
      <SpeciesCommonName
        as="h1"
        variant="atlas-title"
        className="t-stagger-line t-stagger-line--1 to-phone:col-start-1 to-phone:row-start-1 to-phone:min-w-0"
      >
        {initial.name}
      </SpeciesCommonName>
      <TaxonomyTrigger selected={selected} onOpen={onOpenTaxonomy}>
        <SpeciesScientificName as="span" variant="atlas-title">
          {initial.latin}
        </SpeciesScientificName>
      </TaxonomyTrigger>
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
        setSlots((s) => ({
          ...s,
          [next]: { src: nextSource, alt: nextAlt },
        }));
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
      className="bird-art relative grid grid-cols-1 grid-rows-1 size-full max-h-full overflow-visible items-center justify-center t-icon-swap"
      data-state={slots.active}
      aria-busy={nextSource !== shown.src}
    >
      {(['a', 'b'] as const).map((slot) => {
        const layer = slots[slot];
        return (
          layer && (
            <span
              className="t-icon col-start-1 row-start-1 place-self-center overflow-hidden block size-full max-h-full min-w-0 min-h-0"
              data-icon={slot}
              key={slot}
            >
              <ArtImage
                className="p-5 to-phone:p-[15px] from-compact:p-0 block size-full max-w-full object-contain max-h-full pointer-events-none select-none"
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
          className="image-retry border-(length:--border-structure) rounded-(--radius-control) bg-background absolute bottom-[20px] py-2 px-3 pointer-events-auto"
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
    <div className="body-color-row contents">
      <span className="text-(length:--type-ui) text-muted-foreground font-(--weight-regular)">
        {label}
      </span>
      <div className="swatch-row flex flex-wrap items-center gap-3 p-half">
        {/* Stable slots let CSS blend colors instead of remounting each dot. */}
        {colors.map(([name, color], index) => (
          <Tooltip key={index}>
            <TooltipTrigger
              className="color-dot size-[28px]"
              aria-label={`${label}: ${name}${note ? '. ' + note : ''}`}
              style={{ background: color }}
            />
            <TooltipContent>
              {name}
              {note && (
                <span className="swatch-detail max-w-[220px]">
                  <GlossaryText>{note}</GlossaryText>
                </span>
              )}
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
      className="hunting-standalone w-full h-auto aspect-square object-contain my-(--rail-content-gap)"
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
    <div className="prey-list grid grid-cols-3 gap-x-3 gap-y-(--rail-caption-gap) mt-(--rail-content-gap) mb-(--rail-section-gap)">
      {items.map(({ key, note }) => {
        const prey = preyCatalog[key];
        return (
          <div
            className="prey min-w-0 text-(length:--type-ui) text-muted-foreground leading-(--leading-normal) text-center"
            key={key}
          >
            <PreyArt preyKey={key} />
            <span>{prey.name}</span>
            {note && (
              <small className="block text-(length:--type-caption) text-muted-foreground leading-(--leading-normal)">
                <GlossaryText>{note}</GlossaryText>
              </small>
            )}
          </div>
        );
      })}
    </div>
  );
}
export default function RaptorApp({
  initialBirdId = 'rotschwanzbussard',
  initialFullscreen = false,
  initialTaxonomy = false,
}: {
  initialBirdId?: string;
  initialFullscreen?: boolean;
  initialTaxonomy?: boolean;
}) {
  const [selected, setSelected] = useState(initialBirdId);
  const [chosenPlumage, setPlumage] = useState<Plumage>('male');
  const [sex, setSex] = useState<Sex>('male');
  const [chosenMorphs, setMorphs] = useState<Record<string, string>>({});
  const [query, setQuery] = useState('');
  const [grouping, setGrouping] = useState<GroupMode>('genus');
  const [hintOpen, setHintOpen] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [infoTab, setInfoTab] = useState<BirdInfoTab>('profil');
  const [taxonomyBranch, setTaxonomyBranch] = useState(() =>
    taxonomyPathForSearch('', initialBirdId),
  );
  const [path, setPath] = useState(
    initialTaxonomy
      ? birdTaxonomyHref(speciesById[initialBirdId])
      : initialFullscreen
        ? birdFullscreenHref(speciesById[initialBirdId])
        : '',
  );
  const fullscreen = isBirdFullscreenPath(path);
  const taxonomyOpen = isBirdTaxonomyPath(path);
  const bird = speciesById[selected];
  useEffect(() => {
    function syncFromUrl() {
      const legacyId = new URLSearchParams(window.location.search).get('art');
      const current =
        birdForPath(window.location.pathname) ??
        speciesById[legacyId ?? ''] ??
        speciesById[initialBirdId];
      setSelected(current.id);
      setTaxonomyBranch(
        taxonomyPathForSearch(window.location.search, current.id),
      );
      if (!isBirdFullscreenPath(window.location.pathname))
        setInfoTab(birdInfoTabForSearch(window.location.search));
      // The legacy ?art= links get rewritten to their species path. The home
      // page keeps its own URL: it is the site's canonical entry point, not a
      // duplicate of whichever species it happens to open on.
      if (legacyId) {
        const params = new URLSearchParams(window.location.search);
        params.delete('art');
        const query = params.toString();
        const href = isBirdTaxonomyPath(window.location.pathname)
          ? birdTaxonomyHref(current)
          : isBirdFullscreenPath(window.location.pathname)
            ? birdFullscreenHref(current)
            : birdHref(current);
        window.history.replaceState(
          window.history.state,
          '',
          href + (query ? `?${query}` : ''),
        );
        setPath(href);
      } else setPath(window.location.pathname);
    }
    syncFromUrl();
    window.addEventListener('popstate', syncFromUrl);
    return () => window.removeEventListener('popstate', syncFromUrl);
  }, [initialBirdId]);
  useEffect(() => {
    // Before the first sync the server-rendered title and canonical still fit.
    if (!path) return;
    const home = path === '/';
    const title = home
      ? SITE_NAME
      : birdPageTitle(bird, fullscreen) + (taxonomyOpen ? ' – Systematik' : '');
    const href = home
      ? '/'
      : taxonomyOpen
        ? birdTaxonomyHref(bird)
        : fullscreen
          ? birdFullscreenHref(bird)
          : birdHref(bird);
    const description = home ? SITE_DESCRIPTION : bird.intro;
    document.title = home ? title : `${title} · ${SITE_NAME}`;
    document
      .querySelector('link[rel="canonical"]')
      ?.setAttribute('href', SITE_URL + href);
    for (const [selector, content] of [
      ['meta[name="description"]', description],
      ['meta[property="og:title"]', title],
      ['meta[property="og:description"]', description],
      ['meta[property="og:url"]', SITE_URL + href],
      [
        'meta[property="og:image"]',
        SITE_URL +
          (home
            ? '/icons/og-image.png'
            : imageSource(birdImage(bird.id, 'male'))),
      ],
      ['meta[property="og:image:alt"]', home ? SITE_NAME : bird.name],
    ])
      document.querySelector(selector)?.setAttribute('content', content);
  }, [bird, path, fullscreen, taxonomyOpen]);
  const withAudio = Boolean(birdRecordings[bird.id]);
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
    fullscreen ? 'info-fullscreen' : 'info',
    infoTab,
  );
  // The weight below belongs to the bird on show: picking Männchen or
  // Weibchen up here moves the figure with it. The Jungvogel keeps whichever
  // sex was last chosen, since it has no weight of its own.
  function choosePlumage(value: Plumage) {
    setPlumage(value);
    if (value === 'male' || value === 'female') setSex(value);
  }
  function select(id: string, showFullscreen = fullscreen) {
    setSelected(id);
    setPickerOpen(false);
    const pathname = showFullscreen
      ? birdFullscreenHref(speciesById[id])
      : birdHref(speciesById[id]);
    const href = pathname + (showFullscreen ? '' : birdInfoSearch('', infoTab));
    if (window.location.pathname + window.location.search !== href)
      window.history.pushState(window.history.state, '', href);
    setPath(pathname);
  }
  function selectInfoTab(tab: BirdInfoTab) {
    setInfoTab(tab);
    const href =
      window.location.pathname +
      birdInfoSearch(window.location.search, tab) +
      window.location.hash;
    if (
      window.location.pathname +
        window.location.search +
        window.location.hash !==
      href
    )
      window.history.pushState(window.history.state, '', href);
  }
  function openTaxonomy() {
    const href = birdTaxonomyHref(bird);
    setTaxonomyBranch(taxonomyPathForSearch('', bird.id));
    window.history.pushState(window.history.state, '', href);
    setPath(href);
  }
  function selectTaxonomyBranch(branch: string[]) {
    setTaxonomyBranch(branch);
    const href =
      birdTaxonomyHref(bird) +
      taxonomySearch(window.location.search, branch, bird.id);
    if (window.location.pathname + window.location.search !== href)
      window.history.pushState(window.history.state, '', href);
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
  // Die Pfeiltasten im Vollbild folgen der Reihenfolge der sichtbaren
  // Artenliste; eine Art, die in zwei Gruppen steht, zählt nur einmal.
  const railOrder = [
    ...new Set(groups.flatMap((group) => group.birds).map((b) => b.id)),
  ];
  const speciesOptions = railOrder.map((id) => ({
    value: id,
    label: speciesById[id].name,
  }));
  // Im Vollbild gibt es keine Artenliste daneben; das Klappmenü am Namen ist
  // dort der Weg zu jeder anderen Art und benutzt dieselben Auswahlfelder wie
  // Gruppierung und Gefieder.
  const speciesPicker = (
    <Select
      value={selected}
      onValueChange={(v) => {
        if (v) select(String(v));
      }}
      items={speciesOptions}
    >
      {/* Kein Knopf, nur das Zeichen neben dem Namen. Fläche, Rand und
          Schatten stehen am Element, weil die Basisklassen des Auswahlfelds
          und die ungeschichtete `button`-Regel sie sonst zurückholen. */}
      <PlainSelectTrigger
        className="species-jump size-6 shrink-0 justify-center p-0 text-foreground data-[size=default]:h-6 [&_svg]:text-foreground"
        style={{
          border: 'none',
          background: 'transparent',
          boxShadow: 'none',
          borderRadius: 'var(--radius-small)',
        }}
        aria-label="Art wählen"
      />
      {/* Die Liste richtet sich sonst nach dem 36px-Knopf und schneidet die
          langen Namen ab; hier bestimmt der längste Name die Breite. */}
      <SelectContent
        className="w-auto min-w-[240px] max-w-[320px] max-h-[min(var(--available-height),320px)]"
        style={{ padding: 'var(--space-8)' }}
      >
        {speciesOptions.map((o) => (
          <SelectItem value={o.value} key={o.value}>
            {o.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
  function stepSpecies(delta: number) {
    const index = railOrder.indexOf(selected);
    if (index === -1 || railOrder.length < 2) return;
    select(railOrder[(index + delta + railOrder.length) % railOrder.length]);
  }
  function stepHref(delta: number) {
    const index = railOrder.indexOf(selected);
    const id =
      index === -1 || railOrder.length < 2
        ? selected
        : railOrder[(index + delta + railOrder.length) % railOrder.length];
    return birdFullscreenHref(speciesById[id]);
  }
  function renderLibraryRail(inPicker = false) {
    return (
      <>
        <div className="library-top shrink-0 to-phone:items-center to-phone:flex-wrap to-phone:block to-phone:gap-4 p-0 gap-4">
          <div
            className={cn(
              'grouping-control to-phone:flex-[0_0_100%] to-phone:flex-row to-phone:items-center to-phone:justify-between to-phone:gap-2 flex flex-col gap-2',
              inPicker ? 'pb-2' : 'pb-6 to-phone:pb-0',
            )}
          >
            <span className="text-(length:--type-caption) font-(family-name:--font-stack-body) leading-(--leading-normal) font-(--weight-medium) text-(--muted-foreground)">
              Gruppieren nach
            </span>
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
        <div
          className={
            inPicker
              ? 'flex-1 min-h-0 overflow-y-auto overscroll-y-contain pb-[calc(var(--space-20)+env(safe-area-inset-bottom))]'
              : 'contents'
          }
        >
          <nav
            aria-label="Vogelarten"
            className={cn(
              'grouped-navigation min-w-0 max-w-full to-phone:block to-phone:overflow-x-hidden',
              inPicker
                ? 'pt-2'
                : 'to-phone:max-h-[min(36dvh,320px)] to-phone:overscroll-y-contain to-phone:overflow-y-auto to-phone:pt-4 to-phone:pb-[5px]',
            )}
          >
            {groups.map((group) => (
              <section
                className="species-group min-w-0 max-w-full not-first:mt-3 to-phone:not-first:mt-4 to-phone:shrink-0"
                key={group.id}
              >
                {/* Die Gruppenzeile ist eine Beschriftung, kein Namenspaar: eine
                  Schrift (die der Oberfläche), der deutsche Name im Textton,
                  die Gattung aufrecht als Beiwerk in der zweiten Farbe. */}
                <h3 className="species-group-title items-baseline mb-2 to-phone:flex-wrap to-phone:gap-2 font-(family-name:--font-stack-body) text-(length:--type-ui) leading-(--leading-normal) font-(--weight-medium) text-foreground flex flex-wrap p-0 gap-2">
                  <span>{group.title}</span>
                  {group.subtitle && (
                    <small className="font-(family-name:--font-stack-body) text-(length:--type-ui) font-(--weight-regular) not-italic text-muted-foreground">
                      {group.subtitle}
                    </small>
                  )}
                </h3>
                <SidebarMenu className="bird-list gap-half min-w-0 max-w-full to-phone:overflow-visible to-phone:m-0 to-phone:p-0 to-phone:gap-1">
                  {group.birds.map((b) => (
                    <SidebarMenuItem
                      key={b.id}
                      className="to-phone:shrink-0 to-phone:w-full to-phone:min-w-0"
                    >
                      <SidebarMenuButton
                        className="species-row bird-entry max-w-full"
                        isActive={selected === b.id}
                        aria-current={selected === b.id ? 'page' : undefined}
                        render={
                          // oxlint-disable-next-line jsx-a11y/anchor-has-content, jsx-a11y/control-has-associated-label -- the sidebar button supplies the link text
                          <a href={birdHref(b) + birdInfoSearch('', infoTab)} />
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
                        <SpeciesRowContent
                          portrait={
                            <span
                              className="species-row-sprite own-portrait bg-no-repeat bg-contain bg-center"
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
                          }
                          name={b.name}
                          latin={b.latin}
                        />
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </section>
            ))}
          </nav>
          {filtered.length === 0 && (
            <div className="empty-library to-phone:min-h-[180px] to-phone:py-6 to-phone:px-3 to-phone:gap-1 flex-1 min-h-[320px] py-8 px-3 flex flex-col items-center justify-center gap-1 text-center">
              <p
                className={cn(
                  'flex items-center gap-2',
                  inPicker
                    ? 'text-(length:--type-label-heading) font-(--weight-bold)'
                    : 'text-(length:--type-body)',
                )}
              >
                <Feather size={inPicker ? 24 : 17} aria-hidden="true" />
                Keine Art gefunden.
              </p>
              <span className="text-(length:--type-ui) text-muted-foreground leading-(--leading-relaxed)">
                Versuche einen anderen Suchbegriff.
              </span>
            </div>
          )}
        </div>
      </>
    );
  }
  const measurementStrip = (
    <MeasurementStrip withAudio={withAudio}>
      <Measurement
        withAudio={withAudio}
        label="Spannweite"
        range={bird.span}
        unit="cm"
        sex={sex}
      />
      {/* Drops out on a narrow stage, where three labels would
        collide; the CSS says at which width. */}
      <Measurement
        withAudio={withAudio}
        className="measurement-optional stage-small:hidden"
        label="Körperlänge"
        range={bird.length}
        unit="cm"
        sex={sex}
      />
      <Measurement
        withAudio={withAudio}
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
      <BirdAudio
        className="px-3 to-tablet:px-[7px] to-phone:px-1"
        key={bird.id}
        birdId={bird.id}
        name={bird.name}
      />
    </MeasurementStrip>
  );
  const profilePanel = (
    <>
      <SpeciesFacts speciesId={bird.id} />
      <AtlasSection className="profile-section first:mt-0 first:pt-0 first:border-t-0">
        <DetailHeading className="tracking-(--tracking-tight)">
          Erkennungsmerkmale
        </DetailHeading>
        <p className="mt-(--rail-caption-gap) leading-(--leading-relaxed)">
          <GlossaryText>{speciesProfiles[bird.id].identification}</GlossaryText>
        </p>
      </AtlasSection>
      <AtlasSection className="color-section to-phone:col-span-full">
        <DetailHeading className="tracking-(--tracking-tight)">
          Farben
        </DetailHeading>
        <div className="body-colors grid grid-cols-[max-content_minmax(0,1fr)] items-center gap-x-5 gap-y-[14px] mt-[18px]">
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
        <div className="plumage-note mt-(--rail-section-gap) pt-0">
          <h3 className="font-(family-name:--font-stack-display) text-(length:--type-label-heading) font-(--weight-label-heading) leading-(--leading-heading) tracking-(--tracking-tight) text-foreground">
            {plumagesFor(bird.id).find((p) => p.value === plumage)!.label}
            {morph && ` · ${morph.label}`}
          </h3>
          <p className="leading-(--leading-relaxed) mt-2 text-(length:--type-caption)">
            <GlossaryText>
              {appearance?.note ?? plumageNoteFor(bird.id, plumage)}
            </GlossaryText>
          </p>
          {morphConfig && (
            <div
              className="morph-context t-acc text-(length:--type-caption) text-muted-foreground leading-(--leading-normal) mt-3"
              data-open={hintOpen ? 'true' : 'false'}
            >
              <button
                type="button"
                className="t-acc-head appearance-none flex items-center gap-2 min-h-[20px] m-0 p-0 border-0 bg-transparent text-inherit text-left select-none"
                aria-expanded={hintOpen}
                onClick={() => setHintOpen(!hintOpen)}
              >
                <span className="t-acc-chevron inline-flex" aria-hidden="true">
                  <CaretDown size={13} />
                </span>
                {morphConfig.hintLabel ?? 'Hinweis zu den Morphen'}
              </button>
              <div className="t-acc-panel grid">
                <div className="t-acc-panel-inner overflow-hidden">
                  <p className="leading-(--leading-relaxed) mt-2 text-(length:--type-body)">
                    <GlossaryText>{morphConfig.note}</GlossaryText>
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </AtlasSection>
      <AtlasSection className="profile-section first:mt-0 first:pt-0 first:border-t-0">
        <DetailHeading className="tracking-(--tracking-tight)">
          Lebensweise
        </DetailHeading>
        <p className="mt-(--rail-caption-gap) leading-(--leading-relaxed)">
          <GlossaryText>{speciesProfiles[bird.id].behaviour}</GlossaryText>
        </p>
      </AtlasSection>
      <AtlasSection className="profile-section first:mt-0 first:pt-0 first:border-t-0">
        <DetailHeading className="tracking-(--tracking-tight)">
          Brut & Aufzucht
        </DetailHeading>
        <p className="mt-(--rail-caption-gap) leading-(--leading-relaxed)">
          <GlossaryText>{speciesProfiles[bird.id].breeding}</GlossaryText>
        </p>
      </AtlasSection>
      <SpeciesTrivia speciesId={bird.id} />
    </>
  );
  const dietPanel = (
    <>
      <section className="diet-section m-0 p-0 border-0 to-compact:col-span-2 to-phone:col-span-full">
        <DetailHeading className="tracking-(--tracking-tight)">
          Nahrungsbeispiele
        </DetailHeading>
        <PreyGallery items={bird.ecology.diet.examples} />
        <p className="text-(length:--type-body) leading-(--leading-relaxed) text-foreground mt-(--rail-content-gap)">
          <GlossaryText>{bird.ecology.diet.summary}</GlossaryText>
        </p>
        {bird.ecology.diet.occasionalExamples.length > 0 && (
          <div className="occasional-prey mt-(--rail-section-gap)">
            <h3 className="font-(family-name:--font-stack-body) text-(length:--type-caption) font-(--weight-medium) text-(--muted-foreground)">
              Gelegentlich
            </h3>
            <PreyGallery items={bird.ecology.diet.occasionalExamples} />
          </div>
        )}
      </section>
      <AtlasSection className="hunting-section">
        <DetailHeading className="tracking-(--tracking-tight)">
          Jagdweise
        </DetailHeading>
        <HuntingArt bird={bird} />
        {/* Each technique has its own chapter under Wissen. */}
        <div className="ecology-tags flex flex-wrap gap-2 mt-[10px] mx-0 mb-(--rail-content-gap)">
          {bird.ecology.huntingTags.map((id) => (
            <EcologyTag as="a" key={id} href={techniqueHref(id)}>
              {huntingTypes[id].label}
            </EcologyTag>
          ))}
        </div>
        <p className="hunting-text mt-(--rail-caption-gap) text-(length:--type-body) leading-(--leading-relaxed)">
          <GlossaryText>{bird.ecology.hunting.text}</GlossaryText>
        </p>
      </AtlasSection>
    </>
  );
  const habitatPanel = (
    <>
      <section className="habitat m-0 p-0 border-0 [container-type:inline-size] to-compact:col-start-3 to-compact:row-start-2 to-phone:col-span-full to-phone:row-auto">
        <div className="range-block m-0 p-0 mb-(--rail-section-gap) pb-(--rail-section-gap) border-b-(length:--border-structure)">
          <DetailHeading className="tracking-(--tracking-tight)">
            Verbreitung
          </DetailHeading>
          <p className="text-foreground text-(length:--type-body) leading-(--leading-relaxed) mt-(--rail-content-gap)">
            <GlossaryText>{bird.range}</GlossaryText>
          </p>
          {bird.ecology.status.tags.some((id) => id !== 'ausserhalb') && (
            <div className="ecology-status my-[14px] mx-0">
              <h3 className="text-(length:--type-ui)">Status in Deutschland</h3>
              <div className="ecology-tags flex flex-wrap gap-2 mt-[10px] mx-0 mb-[7px]">
                {bird.ecology.status.tags
                  .filter((id) => id !== 'ausserhalb')
                  .map((id) => (
                    <EcologyTag key={id}>
                      <GlossaryText>{statusLabels[id]}</GlossaryText>
                    </EcologyTag>
                  ))}
              </div>
            </div>
          )}
          <RangeMap birdId={bird.id} name={bird.name} />
        </div>
        <DetailHeading className="tracking-(--tracking-tight)">
          Lebensraum
        </DetailHeading>
        <p className="text-foreground text-(length:--type-body) leading-(--leading-relaxed) mt-(--rail-content-gap)">
          <GlossaryText>{bird.habitat}</GlossaryText>
        </p>
        <div className="habitat-gallery grid grid-cols-2 gap-4 mt-(--rail-content-gap)">
          {bird.ecology.habitatTags.map((id) => (
            <figure className="m-0 min-w-0" key={id}>
              <ArtImage
                className="block w-full h-auto aspect-[3/2] rounded-(--radius-small) object-cover"
                src={imageSource(habitatImages[id])}
                alt={landscapes[id].description}
                width={1536}
                height={1024}
                displayWidth={220}
              />
              <figcaption className="mt-(--rail-caption-gap) text-(length:--type-caption) leading-(--leading-normal) text-(--muted-foreground)">
                <GlossaryText>{landscapes[id].label}</GlossaryText>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </>
  );
  if (taxonomyOpen) {
    return (
      <TaxonomyFullscreen
        selected={selected}
        path={taxonomyBranch}
        onPathChange={selectTaxonomyBranch}
        onSelect={(id) => select(id, false)}
        atlasHref={birdHref(bird) + birdInfoSearch('', infoTab)}
        onClose={() => select(bird.id, false)}
      />
    );
  }
  if (fullscreen) {
    return (
      <TooltipProvider delay={180}>
        <InfoFullscreen
          name={bird.name}
          latin={bird.latin}
          measurements={measurementStrip}
          onStep={stepSpecies}
          picker={speciesPicker}
          atlasHref={birdHref(bird) + birdInfoSearch('', infoTab)}
          previousHref={stepHref(-1)}
          nextHref={stepHref(1)}
          onClose={() => select(bird.id, false)}
          portrait={
            portraitImages[bird.id]
              ? imageSource(portraitImages[bird.id])
              : undefined
          }
          columns={[
            { value: 'profil', label: 'Steckbrief', content: profilePanel },
            { value: 'nahrung', label: 'Nahrung', content: dietPanel },
            { value: 'lebensraum', label: 'Vorkommen', content: habitatPanel },
          ]}
        />
        <output className="sr-only" aria-live="polite">
          {bird.name}
        </output>
      </TooltipProvider>
    );
  }
  return (
    <TooltipProvider delay={180}>
      <div className="app-shell from-compact:h-dvh from-compact:min-h-0 from-compact:overflow-hidden">
        <SiteHeader
          activeSection="birds"
          query={query}
          onQueryChange={setQuery}
        />
        <SidebarProvider className="app-columns grid grid-cols-[clamp(255px,calc(255px+(100vw-1191px)*29/78),284px)_minmax(0,1fr)_clamp(340px,calc(340px+(100vw-1191px)*50/78),390px)] from-wide:grid-cols-[310px_minmax(0,1fr)_420px] to-desktop:grid-cols-[255px_minmax(0,1fr)_340px] to-compact:grid-cols-[252px_minmax(0,1fr)] items-stretch min-h-[calc(100dvh-var(--site-header-height))] from-compact:min-h-0 from-compact:h-[calc(100dvh-var(--site-header-height))] from-compact:bg-stage from-compact:pr-(--atlas-gutter) from-compact:overflow-hidden to-phone:flex to-phone:flex-col">
          <Sidebar
            collapsible="none"
            className="species-panel [scrollbar-width:thin] [scrollbar-color:var(--border)_transparent] max-h-[calc(100dvh-var(--site-header-height))] w-full h-auto bg-background p-(--atlas-gutter) border-r-(length:--border-structure) min-w-0 overflow-x-hidden overflow-y-auto from-compact:h-full from-compact:max-h-none from-compact:min-h-0 from-compact:overscroll-contain to-compact:max-h-[830px] to-phone:border-r-0 to-phone:border-b-(length:--border-structure) to-phone:max-h-none to-phone:hidden"
          >
            {renderLibraryRail()}
          </Sidebar>
          <main
            id="main-content"
            className="specimen-panel [container:atlas-stage/inline-size] bg-stage relative flex flex-col min-w-0 min-h-[860px] from-compact:h-full from-compact:min-h-0 to-compact:min-h-[830px] to-phone:min-h-[620px] overflow-hidden"
          >
            <SpecimenHeader>
              <RevealHeading
                name={bird.name}
                latin={bird.latin}
                selected={selected}
                onOpenTaxonomy={openTaxonomy}
              />
              {/* The rail costs a phone most of its first screen, so there the
                  species list becomes a sheet under the name. */}
              <Sheet open={pickerOpen} onOpenChange={setPickerOpen}>
                <SheetTrigger
                  render={
                    <button
                      type="button"
                      className="species-picker to-phone:inline-grid to-phone:col-start-2 to-phone:row-start-1 to-phone:self-center to-phone:after:content-[''] to-phone:after:absolute to-phone:after:inset-0 to-phone:place-items-center to-phone:size-(--species-picker-size) to-phone:p-0 to-phone:text-foreground hidden"
                      aria-label={
                        query
                          ? `Art wechseln, ${filtered.length} Treffer`
                          : 'Art wechseln'
                      }
                    />
                  }
                >
                  <CaretDown size={24} className="translate-y-half" />
                </SheetTrigger>
                {/* Pin both edges so filtering cannot pull the search below
                    the keyboard; only the results area scrolls. */}
                <SheetContent
                  side="bottom"
                  className="species-picker-sheet data-[side=bottom]:top-[max(var(--space-20),env(safe-area-inset-top))]"
                  heading={<SheetTitle>Art wählen</SheetTitle>}
                  closeLabel="Artenauswahl schließen"
                >
                  {/* The search belongs where the list is: on a phone the
                      header keeps its single row. */}
                  <SearchField
                    query={query}
                    onQueryChange={setQuery}
                    label="Vogelart suchen"
                    className="shrink-0 min-w-0 picker-search"
                  />
                  {renderLibraryRail(true)}
                </SheetContent>
              </Sheet>
            </SpecimenHeader>
            <div className="plumage-stage flex flex-col flex-1 min-h-0 gap-0">
              <div className="specimen-controls gap-x-[30px] gap-y-[10px] mt-8 mx-5 from-compact:relative from-compact:z-2 from-compact:mt-6 to-phone:mt-4 flex items-center justify-center flex-wrap">
                <div className="control-group flex items-center justify-center flex-wrap max-w-full gap-[10px] m-0 p-0 border-0">
                  <span
                    className="control-label font-(family-name:--font-stack-body) font-(--weight-medium) text-(length:--type-caption) leading-(--leading-none) tracking-(--tracking-caps) text-(--muted-foreground-stage) uppercase"
                    aria-hidden="true"
                  >
                    {availablePlumages.length > 2 ? 'Kleid' : 'Alter'}
                  </span>
                  <SegmentedControl
                    label="Geschlecht und Alter"
                    group={bird.id}
                    value={plumage}
                    options={availablePlumages}
                    onChange={choosePlumage}
                    onPreload={(value) => warmBird(bird.id, value)}
                  />
                </div>
                {morphConfig && morph && (
                  <div className="morph-control control-group flex items-center justify-center flex-wrap max-w-full gap-[10px] m-0 p-0 border-0">
                    <span
                      className="control-label font-(family-name:--font-stack-body) font-(--weight-medium) text-(length:--type-caption) leading-(--leading-none) tracking-(--tracking-caps) text-(--muted-foreground-stage) uppercase text-(--muted-foreground-stage)"
                      aria-hidden="true"
                    >
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
              <div className="plumage-panel outline-none from-compact:overflow-visible flex flex-1 min-h-0 items-center justify-center overflow-hidden">
                <div className="image-stage size-full from-compact:overflow-visible to-phone:min-h-[350px] relative flex-1 overflow-hidden flex items-center justify-center min-h-0">
                  <div className="hero-art to-phone:w-[112%] from-compact:h-full from-compact:max-h-full from-compact:aspect-auto grid grid-cols-1 grid-rows-1 place-items-center shrink-0 pointer-events-none w-full aspect-square max-w-[950px]">
                    <BirdArt
                      bird={bird}
                      plumage={plumage}
                      morphId={morph?.id}
                    />
                  </div>
                </div>
              </div>
            </div>
            {measurementStrip}
            <div className="image-credit text-(length:--type-credit) text-(--muted-foreground-stage) leading-(--leading-normal) text-center shrink-0 self-stretch py-[calc(var(--space-8)-var(--space-2))] px-3 flex flex-wrap items-baseline justify-center gap-x-3 gap-y-1">
              <span>KI-generierte Illustration</span>
              <BirdAudioCredit
                key={bird.id}
                birdId={bird.id}
                name={bird.name}
              />
            </div>
          </main>
          <AtlasInfoPanel
            aria-label={`Informationen zum ${bird.name}`}
          >
            <Tabs
              value={infoTab}
              onValueChange={(v) => selectInfoTab(v as BirdInfoTab)}
              className="info-tabs min-w-0 max-w-full min-h-0 flex-1 gap-0 flex flex-col"
            >
              <TabsList
                variant="line"
                className={`${tabStyles.lineRail} info-tab-list z-3 mt-panel mx-panel mb-0 w-[calc(100%-2*var(--panel-padding))]`}
                aria-label="Informationen"
                ref={infoBarRef}
              >
                <span
                  className={tabStyles.lineIndicator}
                  aria-hidden="true"
                  ref={infoPillRef}
                />
                <TabsTrigger
                  className={tabStyles.lineTrigger}
                  value="profil"
                  data-label="Steckbrief"
                >
                  Steckbrief
                </TabsTrigger>
                <TabsTrigger
                  className={tabStyles.lineTrigger}
                  value="nahrung"
                  data-label="Nahrung"
                >
                  Nahrung
                </TabsTrigger>
                <TabsTrigger
                  className={tabStyles.lineTrigger}
                  value="lebensraum"
                  data-label="Vorkommen"
                >
                  Vorkommen
                </TabsTrigger>
                <InfoFullscreenTrigger
                  name={bird.name}
                  href={birdFullscreenHref(bird)}
                  onOpen={() => select(bird.id, true)}
                />
              </TabsList>
              <AtlasPanelBody>
                <TabsContent
                  value="profil"
                  className="info-tab-content min-w-0 max-w-full text-(length:--type-body) leading-(--leading-relaxed) outline-none"
                >
                  {profilePanel}
                </TabsContent>
                <TabsContent
                  value="nahrung"
                  className="info-tab-content min-w-0 max-w-full text-(length:--type-body) leading-(--leading-relaxed) outline-none"
                >
                  {dietPanel}
                </TabsContent>
                <TabsContent
                  value="lebensraum"
                  className="info-tab-content min-w-0 max-w-full text-(length:--type-body) leading-(--leading-relaxed) outline-none"
                >
                  {habitatPanel}
                </TabsContent>
              </AtlasPanelBody>
            </Tabs>
          </AtlasInfoPanel>
        </SidebarProvider>
        <output className="sr-only" aria-live="polite">
          {bird.name}
        </output>
      </div>
    </TooltipProvider>
  );
}
