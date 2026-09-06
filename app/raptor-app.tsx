'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Bookmark, Search, Feather, X, Moon, Sun } from 'lucide-react';
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
import {
  getBirdMorphConfig,
  getBirdMorphChoice,
  getBirdMorphAppearance,
} from '@/lib/morphs';
function Measurement({ value, unit }: { value: string; unit: string }) {
  return (
    <p>
      {value.split(/(ca\.|bis|–)/g).map((part, i) =>
        /^(ca\.|bis|–)$/.test(part) ? (
          <span
            className={`measurement-secondary ${part === '–' ? '' : 'measurement-qualifier'}`}
            key={i}
          >
            {part}
          </span>
        ) : (
          part
        ),
      )}
      <small>{unit}</small>
    </p>
  );
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
  return (
    <div className="bird-art">
      <Image
        key={`${bird.id}-${plumage}`}
        src={appearance?.image ?? birdImage(bird.id, plumage)}
        alt={`${bird.name} – ${plumagesFor(bird.id).find((p) => p.value === plumage)!.label}${morph ? `, Farbform ${morph.label}` : ''}`}
        width={1536}
        height={1536}
        unoptimized
        priority
      />
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
      src={huntingImages[bird.id] ?? hunt.image ?? `/hunting-${bird.id}.png`}
      width={1536}
      height={1536}
      alt={`${bird.name}: ${hunt.title}`}
      unoptimized
    />
  );
}
const preyRects = [
  [0, 0, 430, 418],
  [430, 0, 410, 418],
  [840, 0, 414, 418],
  [0, 418, 480, 325],
  [480, 418, 380, 380],
  [840, 418, 414, 370],
  [0, 744, 446, 498],
  [450, 796, 395, 440],
  [855, 800, 399, 445],
];
function PreyArt({ index }: { index: number }) {
  if (index === 6)
    return (
      <span className="prey-image individual-prey">
        <Image
          src="/eichhoernchen.png"
          alt=""
          width={1254}
          height={1254}
          unoptimized
        />
      </span>
    );
  const [x, y, w, h] = preyRects[index];
  const d = Math.max(w, h);
  return (
    <span className="prey-image">
      <span
        className="sprite-window"
        style={{
          width: `${(w / d) * 100}%`,
          height: `${(h / d) * 100}%`,
          left: `${(1 - w / d) * 50}%`,
          top: `${(1 - h / d) * 50}%`,
        }}
      >
        <Image
          src="/prey-atlas.png"
          alt=""
          width={1254}
          height={1254}
          unoptimized
          style={{
            width: `${(1254 / w) * 100}%`,
            maxWidth: 'none',
            height: 'auto',
            left: `${(-x / w) * 100}%`,
            top: `${(-y / h) * 100}%`,
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
            {prey.image ? (
              <span className="prey-image individual-prey">
                <Image
                  src={prey.image}
                  alt=""
                  width={1254}
                  height={1254}
                  unoptimized
                />
              </span>
            ) : (
              <PreyArt index={prey.tile!} />
            )}
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
  const [saved, setSaved] = useState<string[]>([]);
  const [collection, setCollection] = useState(false);
  const [dark, setDark] = useState(false);
  const bird = birds.find((b) => b.id === selected)!;
  const availablePlumages = plumagesFor(bird.id);
  const plumage = availablePlumages.some((p) => p.value === chosenPlumage)
    ? chosenPlumage
    : 'male';
  const isSaved = saved.includes(selected);
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
        const ids: unknown = JSON.parse(
          localStorage.getItem('raptor:saved') || '[]',
        );
        if (Array.isArray(ids))
          setSaved(
            ids.filter(
              (id): id is string =>
                typeof id === 'string' && birds.some((b) => b.id === id),
            ),
          );
        const theme = localStorage.getItem('raptor:theme');
        setDark(theme === 'dark');
      } catch {}
    }, 0);
    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
  }, [dark]);
  function save() {
    const next = isSaved
      ? saved.filter((id) => id !== selected)
      : [...saved, selected];
    setSaved(next);
    try {
      localStorage.setItem('raptor:saved', JSON.stringify(next));
    } catch {}
  }
  function theme() {
    setDark(!dark);
    try {
      localStorage.setItem('raptor:theme', !dark ? 'dark' : 'light');
    } catch {}
  }
  function select(id: string) {
    setSelected(id);
  }
  const filtered = filterBirds(query, collection, saved);
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
            <Button
              variant="ghost"
              className={`collection-button ${collection ? 'chosen' : ''}`}
              onClick={() => setCollection(!collection)}
              aria-pressed={collection}
            >
              <Bookmark
                strokeWidth={1.4}
                fill={collection ? 'currentColor' : 'none'}
              />
              <span>Meine Sammlung</span>
              {saved.length > 0 && (
                <span className="count">{saved.length}</span>
              )}
            </Button>
            <span className="header-divider" />
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
                {dark ? <Sun /> : <Moon />}
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
                  <SelectContent className="grouping-options">
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
                        >
                          <span
                            className="portrait head-portrait own-portrait"
                            style={{
                              backgroundImage: `url(${portraitImages[b.id]})`,
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
                <p>
                  {collection && saved.length === 0
                    ? 'Noch keine Vögel gemerkt.'
                    : 'Keine Art gefunden.'}
                </p>
                <span>
                  {collection && saved.length === 0
                    ? 'Mit dem Lesezeichen neben dem Namen speicherst du deine Favoriten.'
                    : 'Versuche einen anderen Suchbegriff.'}
                </span>
                <Button
                  variant="link"
                  onClick={() => {
                    setQuery('');
                    setCollection(false);
                  }}
                >
                  Alle Arten anzeigen
                </Button>
              </div>
            )}
          </Sidebar>
          <main id="main-content" className="specimen-panel">
            <div className="specimen-heading">
              <div>
                <h1>{bird.name}</h1>
                <p>{bird.latin}</p>
              </div>
              <Tooltip>
                <TooltipTrigger
                  render={
                    <Button
                      variant="ghost"
                      className="save-button"
                      onClick={save}
                      aria-label={
                        isSaved
                          ? 'Aus Sammlung entfernen'
                          : 'In Sammlung speichern'
                      }
                      aria-pressed={isSaved}
                    />
                  }
                >
                  <Bookmark
                    strokeWidth={1.4}
                    fill={isSaved ? 'currentColor' : 'none'}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  {isSaved ? 'In deiner Sammlung' : 'Art merken'}
                </TooltipContent>
              </Tooltip>
            </div>
            <Tabs
              value={plumage}
              onValueChange={(v) => setPlumage(v as Plumage)}
              className="plumage-tabs"
            >
              <div className="specimen-controls">
                <TabsList
                  variant="line"
                  className="plumage-list"
                  aria-label="Geschlecht und Alter"
                >
                  {availablePlumages.map((p) => (
                    <TabsTrigger key={p.value} value={p.value}>
                      {p.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
                {morphConfig && morph && (
                  <fieldset className="morph-control" aria-label="Farbform">
                    {morphConfig.choices.map((choice) => (
                      <button
                        type="button"
                        key={choice.id}
                        className="morph-choice"
                        aria-pressed={morph.id === choice.id}
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
                  </fieldset>
                )}
              </div>
              {availablePlumages.map((p) => (
                <TabsContent
                  key={p.value}
                  value={p.value}
                  className="plumage-panel"
                >
                  <div className="image-stage">
                    <div className="hero-art">
                      <BirdArt
                        bird={bird}
                        plumage={p.value}
                        morphId={morph?.id}
                      />
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
            <div className="image-credit">KI-generierte Illustration</div>
          </main>
          <aside
            className="info-panel"
            aria-label={`Informationen zum ${bird.name}`}
          >
            <Tabs defaultValue="profil" className="info-tabs">
              <TabsList
                variant="line"
                className="info-tab-list"
                aria-label="Informationen"
              >
                <TabsTrigger value="profil">Steckbrief</TabsTrigger>
                <TabsTrigger value="nahrung">Nahrung</TabsTrigger>
                <TabsTrigger value="lebensraum">Lebensraum</TabsTrigger>
              </TabsList>
              <TabsContent value="profil" className="info-tab-content">
                <p className="species-intro">{bird.intro}</p>
                <section
                  className="measurements"
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
                <section className="color-section">
                  <h2>Farben</h2>
                  <div className="body-colors">
                    <ColorRow
                      label="Gefieder"
                      colors={appearance?.colors ?? colorsFor(bird, plumage)}
                    />
                    <div className="body-color-pair">
                      <ColorRow label="Augen" colors={bodyColors.eyes} />
                      <ColorRow
                        label="Beine & Füße"
                        colors={bodyColors.legs}
                        note={bodyColors.note}
                      />
                    </div>
                  </div>
                </section>
                <section className="plumage-note">
                  <h2>
                    {
                      plumagesFor(bird.id).find((p) => p.value === plumage)!
                        .label
                    }
                  </h2>
                  <p>{appearance?.note ?? plumageNoteFor(bird.id, plumage)}</p>
                  {morphConfig && (
                    <p className="morph-context">{morphConfig.note}</p>
                  )}
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
                          src={habitatImages[id]}
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
                  </div>
                </section>
              </TabsContent>
            </Tabs>
          </aside>
        </SidebarProvider>
        <output className="sr-only" aria-live="polite">
          {bird.name}
          {isSaved ? ', in deiner Sammlung' : ''}
        </output>
      </div>
    </TooltipProvider>
  );
}
