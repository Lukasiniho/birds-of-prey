'use client';
import {
  AppSelectTrigger as SelectTrigger,
  AppSelectContent as SelectContent,
} from '@/components/app-select';
import { cn } from '@/lib/utils';
import { SpeciesName, SpeciesScientificName } from '@/components/species-name';
import { SpeciesRowContent } from '@/components/species-row';
import { useEffect, useRef, useState } from 'react';
import { useSlidingPill } from '@/lib/use-sliding-pill';
import { SegmentedControl } from '@/components/segmented-control';
import { ArtImage } from '@/components/art-image';
import { BirdAudio, BirdAudioCredit } from '@/components/bird-audio';
import { birdRecordings } from '@/lib/bird-recordings';
import { birdHref, birdForPath } from '@/lib/bird-routes';
import { techniqueHref } from '@/lib/knowledge-routes';
import { SITE_NAME, SITE_URL } from '@/lib/site';
import {
  Feather,
  CaretDown,
  GenderFemale,
  GenderMale,
  MagnifyingGlass as Search,
  X,
} from '@/components/icons';
import { Input } from '@/components/ui/input';
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { SiteHeader } from '@/components/site-header';
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
import { DetailHeading } from '@/components/detail-text';
import { AtlasSection } from '@/components/atlas-section';
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
      <span className="t-digit-group is-animating" key={value}>
        {pieces.map((p, i) => (
          <span
            className={cn(
              't-digit',
              p.ch === '–' &&
                'measurement-secondary text-muted-foreground measurement-dash',
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
        className="sex-switch-option rounded-(--radius-tab-pill) text-(--tabs-text-muted) inline-flex items-center justify-center w-[18px] h-[16px]"
        data-active={!male}
      >
        <GenderFemale size={12} />
      </span>
      <span
        className="sex-switch-option rounded-(--radius-tab-pill) text-(--tabs-text-muted) inline-flex items-center justify-center w-[18px] h-[16px]"
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
          ? 'grid grid-cols-[minmax(0,1fr)] grid-rows-[20px_minmax(32px,auto)] content-start items-center justify-items-center gap-y-half px-3 to-tablet:px-[7px] to-phone:px-1'
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
          'measurement-value font-(family-name:--font-stack-display) font-(--weight-medium) tracking-(--tracking-tight) leading-(--leading-display)',
          withAudio
            ? '-translate-y-[3px] m-0 flex items-baseline justify-center whitespace-nowrap text-(length:--type-metric-compact)'
            : 'text-(length:--type-metric) whitespace-normal to-phone:mt-[3px]',
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
    <div
      className="t-stagger is-shown w-full px-[15px] to-desktop:px-[3px] to-phone:w-auto to-phone:min-w-0 to-phone:p-0"
      ref={ref}
    >
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
type ArtLayer = { src: string; alt: string; size: string };
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
  const artSize =
    (
      {
        habicht: '97%',
        sperber: '94%',
        weissstorch: '93%',
        kampfadler: '97%',
        schopfkarakara: '98%',
        steinadler: '97%',
        kaiseradler: '103%',
        steppenadler: '104%',
        habichtsadler: '87.22%',
        zwergadler: '88.35%',
        iberienadler: '85.36%',
        klippenadler: '85.36%',
        weisskopfseeadler: '95%',
        seeadler: '95%',
        riesenseeadler: '108.16%',
        fischadler: '92.7%',
        sekretaer: '90%',
        andenkondor: '95%',
        wespenbussard: '92%',
        kronenadler: '92%',
        aguja: '95%',
        schwarzmilan: '90%',
        rotmilan: '90.78%',
        maeusebussard: '96.9%',
        rotschwanzbussard: '114.48%',
        koenigsbussard: '95%',
      } as Partial<Record<string, string>>
    )[bird.id] ?? '100%';
  const morph = getBirdMorphChoice(bird.id, morphId, plumage);
  const appearance = getBirdMorphAppearance(bird.id, morphId, plumage);
  const nextSource = imageSource(
    appearance?.image ?? birdImage(bird.id, plumage),
  );
  const nextAlt = `${bird.name} – ${plumagesFor(bird.id).find((p) => p.value === plumage)!.label}${morph ? `, ${morphConfig!.label} ${morph.label}` : ''}`;
  const [slots, setSlots] = useState<ArtSlots>({
    a: { src: nextSource, alt: nextAlt, size: artSize },
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
          [next]: { src: nextSource, alt: nextAlt, size: artSize },
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
  }, [nextSource, nextAlt, artSize, shown.src, slots.active, retry]);
  return (
    <div
      className="bird-art grid grid-cols-1 grid-rows-1 size-full max-h-full overflow-visible items-center justify-center t-icon-swap"
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
              // Keep each bird's approved framing throughout the crossfade.
              style={{
                width: layer.size,
                height: layer.size,
                maxHeight: layer.size,
              }}
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
          className="image-retry border-(length:--border-structure) rounded-lg bg-background absolute bottom-[20px] py-2 px-3 pointer-events-auto"
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
              className="color-dot"
              aria-label={`${label}: ${name}${note ? '. ' + note : ''}`}
              style={{ background: color }}
            />
            <TooltipContent>
              {name}
              {note && (
                <span className="swatch-detail max-w-[220px]">{note}</span>
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
    <div className="prey-list grid grid-cols-2 gap-x-4 gap-y-3 mt-(--rail-content-gap) mb-(--rail-section-gap)">
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
                {note}
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
  const [pickerOpen, setPickerOpen] = useState(false);
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
    'info',
    infoTab,
  );
  // The weight below belongs to the bird on show: picking Männchen or
  // Weibchen up here moves the figure with it. The Jungvogel keeps whichever
  // sex was last chosen, since it has no weight of its own.
  function choosePlumage(value: Plumage) {
    setPlumage(value);
    if (value === 'male' || value === 'female') setSex(value);
  }
  function select(id: string) {
    setSelected(id);
    setPickerOpen(false);
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
  function renderLibraryRail(inPicker = false) {
    return (
      <>
        <div className="library-top to-phone:items-center to-phone:flex-wrap to-phone:block to-phone:gap-4 p-0 gap-4">
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
        <nav
          aria-label="Vogelarten"
          className={cn(
            'grouped-navigation min-w-0 max-w-full to-phone:block to-phone:overflow-x-hidden',
            inPicker
              ? 'flex-1 min-h-0 pt-2 max-h-none overflow-y-auto overscroll-y-contain pb-[calc(var(--space-20)+env(safe-area-inset-bottom))]'
              : 'to-phone:max-h-[min(36dvh,320px)] to-phone:overscroll-y-contain to-phone:overflow-y-auto to-phone:pt-4 to-phone:pb-[5px]',
          )}
        >
          {groups.map((group) => (
            <section
              className="species-group min-w-0 max-w-full not-first:mt-3 to-phone:not-first:mt-4 to-phone:shrink-0"
              key={group.id}
            >
              <h3 className="species-group-title items-baseline mb-2 to-phone:flex-wrap to-phone:gap-2 font-(family-name:--font-stack-body) text-(length:--type-ui) leading-(--leading-normal) font-(--weight-medium) text-muted-foreground flex flex-wrap p-0 gap-2">
                <span>{group.title}</span>
                {group.subtitle && (
                  <SpeciesScientificName as="small">
                    {group.subtitle}
                  </SpeciesScientificName>
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
            <p className="text-(length:--type-body) flex items-center gap-2">
              <Feather size={17} aria-hidden="true" />
              Keine Art gefunden.
            </p>
            <span className="text-(length:--type-ui) text-muted-foreground leading-(--leading-relaxed)">
              Versuche einen anderen Suchbegriff.
            </span>
          </div>
        )}
      </>
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
        <SidebarProvider className="app-columns grid items-stretch min-h-[calc(100dvh-var(--site-header-height))] from-compact:min-h-0 from-compact:h-[calc(100dvh-var(--site-header-height))] from-compact:bg-stage from-compact:pr-(--atlas-gutter) from-compact:overflow-hidden to-phone:flex to-phone:flex-col">
          <Sidebar
            collapsible="none"
            className="species-panel max-h-[calc(100dvh-var(--site-header-height))] w-full h-auto bg-background p-(--atlas-gutter) border-r-(length:--border-structure) min-w-0 overflow-x-hidden overflow-y-auto from-compact:h-full from-compact:max-h-none from-compact:min-h-0 from-compact:overscroll-contain to-compact:max-h-[830px] to-phone:border-r-0 to-phone:border-b-(length:--border-structure) to-phone:max-h-none to-phone:hidden"
          >
            {renderLibraryRail()}
          </Sidebar>
          <main
            id="main-content"
            className="specimen-panel bg-stage relative flex flex-col min-w-0 min-h-[860px] from-compact:h-full from-compact:min-h-0 to-compact:min-h-[830px] to-phone:min-h-[620px] overflow-hidden"
          >
            <div className="specimen-heading pt-[48px] px-[48px] to-desktop:px-[30px] from-compact:pt-5 from-compact:-mt-[2px] from-wide:pt-6 from-wide:px-[50px] from-wide:mt-0 to-phone:pt-5 to-phone:px-4 to-phone:flex to-phone:items-start to-phone:justify-center to-phone:gap-3 justify-between gap-2 items-start z-2 relative block text-center">
              <RevealHeading name={bird.name} latin={bird.latin} />
              {/* The rail costs a phone most of its first screen, so there the
                  species list becomes a sheet under the name. */}
              <Sheet open={pickerOpen} onOpenChange={setPickerOpen}>
                <SheetTrigger
                  render={
                    <button
                      type="button"
                      className="species-picker to-phone:place-items-center to-phone:h-(--species-picker-size) to-phone:p-0 to-phone:bg-surface to-phone:shadow-(--shadow-subtle) to-phone:text-foreground hidden"
                      aria-label={
                        query
                          ? `Art wechseln, ${filtered.length} Treffer`
                          : 'Art wechseln'
                      }
                    />
                  }
                >
                  <CaretDown />
                </SheetTrigger>
                <SheetContent
                  side="bottom"
                  className="species-picker-sheet flex flex-col gap-0 max-h-[85dvh] pt-5 px-page pb-0 rounded-t-(--radius-surface) rounded-b-none bg-background"
                >
                  <SheetTitle className="species-picker-title mb-4 font-(family-name:--font-stack-display) text-(length:--type-label-title) text-foreground">
                    Art wählen
                  </SheetTitle>
                  {/* The search belongs where the list is: on a phone the
                      header keeps its single row. */}
                  <div className="search-wrap to-phone:flex-1 to-phone:min-w-[130px] relative flex items-center mb-3 picker-search">
                    <Search size={17} />
                    <Input
                      aria-label="Vogelart suchen"
                      placeholder="Vogelart suchen"
                      value={query}
                      onChange={(event) => setQuery(event.target.value)}
                    />
                    {query && (
                      <button
                        className="clear-search text-muted-foreground absolute right-[10px]"
                        aria-label="Suche leeren"
                        onClick={() => setQuery('')}
                      >
                        <X size={14} />
                      </button>
                    )}
                  </div>
                  {renderLibraryRail(true)}
                </SheetContent>
              </Sheet>
            </div>
            <div className="plumage-stage flex flex-col flex-1 min-h-0 gap-0">
              <div className="specimen-controls gap-x-[30px] gap-y-[10px] mt-8 mx-5 from-compact:relative from-compact:z-2 from-compact:mt-6 to-phone:mt-4 flex items-center justify-center flex-wrap">
                <div className="control-group flex items-center justify-center flex-wrap max-w-full gap-[10px] m-0 p-0 border-0">
                  <span
                    className="control-label tracking-(--tracking-caps) text-(--muted-foreground-stage) uppercase"
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
                      className="control-label tracking-(--tracking-caps) text-(--muted-foreground-stage) uppercase text-(--muted-foreground-stage)"
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
            <section
              className="measurements specimen-measurements grid gap-0 shrink-0 self-center max-w-[760px] rounded-(--radius-surface)"
              aria-label="Größe und Gewicht"
            >
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
                className="measurement-optional"
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
            </section>
            <div className="image-credit text-(length:--type-credit) text-(--muted-foreground-stage) leading-(--leading-normal) text-center shrink-0 self-stretch py-[calc(var(--space-8)-var(--space-2))] px-3 flex flex-wrap items-baseline justify-center gap-x-3 gap-y-1">
              <span>KI-generierte Illustration</span>
              <BirdAudioCredit
                key={bird.id}
                birdId={bird.id}
                name={bird.name}
              />
            </div>
          </main>
          <aside
            className="info-panel border-l-(length:--border-structure) to-compact:border-l-0 min-w-0 overflow-x-hidden to-compact:col-[1/-1] to-compact:border-t-(length:--border-structure) from-compact:h-[calc(100%-2*var(--atlas-gutter))] from-compact:my-(--atlas-gutter) from-compact:w-full from-compact:border-(length:--border-structure) from-compact:rounded-(--radius-surface) from-compact:bg-(--atlas-info-surface) from-compact:min-h-0 from-compact:relative from-compact:overflow-hidden to-compact:grid-cols-[1fr_1fr_1fr] to-compact:block to-compact:max-w-none to-phone:grid-cols-[1fr_1fr] flex flex-col gap-0"
            aria-label={`Informationen zum ${bird.name}`}
          >
            <Tabs
              value={infoTab}
              onValueChange={(v) => setInfoTab(String(v))}
              className="info-tabs min-w-0 max-w-full min-h-0 flex-1 gap-0 flex flex-col"
            >
              <TabsList
                variant="line"
                className="t-tabs t-tabs-line info-tab-list z-3"
                aria-label="Informationen"
                ref={infoBarRef}
              >
                <span
                  className="t-tabs-pill"
                  aria-hidden="true"
                  ref={infoPillRef}
                />
                <TabsTrigger
                  className="t-tab"
                  value="profil"
                  data-label="Steckbrief"
                >
                  Steckbrief
                </TabsTrigger>
                <TabsTrigger
                  className="t-tab"
                  value="nahrung"
                  data-label="Nahrung"
                >
                  Nahrung
                </TabsTrigger>
                <TabsTrigger
                  className="t-tab"
                  value="lebensraum"
                  data-label="Lebensraum"
                >
                  Lebensraum
                </TabsTrigger>
              </TabsList>
              <div className="info-scroll p-panel from-compact:min-h-0 from-compact:flex-1 from-compact:overflow-y-auto from-compact:overscroll-contain from-compact:pb-[calc(var(--panel-padding)+var(--rail-fade-height))]">
                <TabsContent
                  value="profil"
                  className="info-tab-content min-w-0 max-w-full text-(length:--type-body) leading-(--leading-relaxed) outline-none"
                >
                  <SpeciesFacts speciesId={bird.id} />
                  <AtlasSection className="profile-section first:mt-0 first:pt-0 first:border-t-0">
                    <DetailHeading className="tracking-(--tracking-tight)">
                      Erkennungsmerkmale
                    </DetailHeading>
                    <p className="mt-(--rail-caption-gap) leading-(--leading-relaxed)">
                      {speciesProfiles[bird.id].identification}
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
                    <div className="plumage-note mt-6 pt-0">
                      <h3 className="font-(family-name:--font-stack-display) text-(length:--type-label-heading) font-(--weight-label-heading) leading-(--leading-heading) tracking-(--tracking-tight) text-foreground">
                        {
                          plumagesFor(bird.id).find((p) => p.value === plumage)!
                            .label
                        }
                        {morph && ` · ${morph.label}`}
                      </h3>
                      <p className="leading-(--leading-relaxed) mt-2 text-(length:--type-caption)">
                        {appearance?.note ?? plumageNoteFor(bird.id, plumage)}
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
                            <span
                              className="t-acc-chevron inline-flex"
                              aria-hidden="true"
                            >
                              <CaretDown size={13} />
                            </span>
                            {morphConfig.hintLabel ?? 'Hinweis zu den Morphen'}
                          </button>
                          <div className="t-acc-panel grid">
                            <div className="t-acc-panel-inner overflow-hidden">
                              <p className="leading-(--leading-relaxed) mt-2 text-(length:--type-body)">
                                {morphConfig.note}
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
                      {speciesProfiles[bird.id].behaviour}
                    </p>
                  </AtlasSection>
                  <AtlasSection className="profile-section first:mt-0 first:pt-0 first:border-t-0">
                    <DetailHeading className="tracking-(--tracking-tight)">
                      Brut & Aufzucht
                    </DetailHeading>
                    <p className="mt-(--rail-caption-gap) leading-(--leading-relaxed)">
                      {speciesProfiles[bird.id].breeding}
                    </p>
                  </AtlasSection>
                </TabsContent>
                <TabsContent
                  value="nahrung"
                  className="info-tab-content min-w-0 max-w-full text-(length:--type-body) leading-(--leading-relaxed) outline-none"
                >
                  <section className="diet-section m-0 p-0 border-0 to-compact:col-span-2 to-phone:col-span-full">
                    <DetailHeading className="tracking-(--tracking-tight)">
                      Nahrungsbeispiele
                    </DetailHeading>
                    <PreyGallery items={bird.ecology.diet.examples} />
                    <p className="text-(length:--type-body) leading-(--leading-relaxed) text-foreground mt-4">
                      {bird.ecology.diet.summary}
                    </p>
                    {bird.ecology.diet.occasionalExamples.length > 0 && (
                      <div className="occasional-prey mt-6">
                        <h3 className="font-(family-name:--font-stack-body) text-(length:--type-caption) font-(--weight-medium) text-(--muted-foreground)">
                          Gelegentlich
                        </h3>
                        <PreyGallery
                          items={bird.ecology.diet.occasionalExamples}
                        />
                      </div>
                    )}
                  </section>
                  <AtlasSection className="hunting-section">
                    <DetailHeading className="tracking-(--tracking-tight)">
                      Jagdweise
                    </DetailHeading>
                    <HuntingArt bird={bird} />
                    {/* Each technique has its own chapter under Wissen. */}
                    <div className="ecology-tags flex flex-wrap gap-2">
                      {bird.ecology.huntingTags.map((id) => (
                        <a key={id} href={techniqueHref(id)}>
                          {huntingTypes[id].label}
                        </a>
                      ))}
                    </div>
                    <p className="hunting-text mt-3 text-(length:--type-body) leading-(--leading-relaxed)">
                      {bird.ecology.hunting.text}
                    </p>
                  </AtlasSection>
                </TabsContent>
                <TabsContent
                  value="lebensraum"
                  className="info-tab-content min-w-0 max-w-full text-(length:--type-body) leading-(--leading-relaxed) outline-none"
                >
                  <section className="habitat m-0 p-0 border-0 [container-type:inline-size] to-compact:col-start-3 to-compact:row-start-2 to-phone:col-span-full to-phone:row-auto">
                    <div className="range-block m-0 p-0 mb-(--rail-section-gap) pb-(--rail-section-gap) border-b-(length:--border-structure)">
                      <DetailHeading className="tracking-(--tracking-tight)">
                        Verbreitung
                      </DetailHeading>
                      <p className="text-foreground text-(length:--type-body) leading-(--leading-relaxed) mt-4">
                        {bird.range}
                      </p>
                      {bird.ecology.status.tags.some(
                        (id) => id !== 'ausserhalb',
                      ) && (
                        <div className="ecology-status my-[14px] mx-0">
                          <h3>Status in Deutschland</h3>
                          <div className="ecology-tags flex flex-wrap gap-2">
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
                    <DetailHeading className="tracking-(--tracking-tight)">
                      Lebensraum
                    </DetailHeading>
                    <p className="text-foreground text-(length:--type-body) leading-(--leading-relaxed) mt-4">
                      {bird.habitat}
                    </p>
                    <div className="habitat-gallery grid grid-cols-2 gap-4 mt-(--rail-content-gap)">
                      {bird.ecology.habitatTags.map((id) => (
                        <figure className="m-0 min-w-0" key={id}>
                          <ArtImage
                            className="block w-full h-auto aspect-[3/2] rounded-md object-cover"
                            src={imageSource(habitatImages[id])}
                            alt={landscapes[id].description}
                            width={1536}
                            height={1024}
                            displayWidth={220}
                          />
                          <figcaption className="mt-(--rail-caption-gap) text-(length:--type-caption) leading-(--leading-normal) text-(--muted-foreground)">
                            {landscapes[id].label}
                          </figcaption>
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
