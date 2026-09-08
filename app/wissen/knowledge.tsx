'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Bone, Moon, Sun } from 'lucide-react';
import { SiteNavigation } from '@/components/site-navigation';
import { PreyArt } from '@/components/prey-art';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import {
  speciesRecords,
  preyCategories,
  huntingTypes,
  predatorsFor,
  relativeSizeLabels,
  type PreyCategory,
  type HuntingType,
  type RelativeSize,
  type SpeciesRecord,
} from '@/lib/ecology';
import { preyCatalog } from '@/lib/diets';
import { portraitImages } from '@/lib/portrait-images';
import { huntingImages } from '@/lib/hunting-images';
import { imageSource } from '@/lib/optimized-images';

function BirdCard({
  bird,
  category,
  preyId,
  size,
}: {
  bird: SpeciesRecord;
  category?: PreyCategory;
  preyId?: string;
  size?: RelativeSize;
}) {
  const relations = bird.ecology.prey.filter(
    (p) =>
      (!category || p.category === category) &&
      (!preyId || p.key === preyId) &&
      (!size || p.relativeSize === size),
  );
  const food = bird.ecology.food.filter(
    (f) => !category || (f.categories as readonly string[]).includes(category),
  );
  const primary = preyId
    ? relations.some((p) => p.importance === 'primary')
    : food.some((f) => f.importance === 'primary');
  return (
    <article className="predator-card">
      <Link className="predator-heading" href={`/?art=${bird.id}`}>
        <Image
          src={imageSource(portraitImages[bird.id])}
          alt=""
          width={112}
          height={112}
          unoptimized
        />
        <div>
          <h3>{bird.name}</h3>
          <i>{bird.latin}</i>
        </div>
        <ArrowUpRight size={18} />
      </Link>
      {category ? (
        <>
          <div className="predator-food">
            <span className="knowledge-eyebrow">
              {category === 'aas'
                ? 'Aasnutzung'
                : primary
                  ? 'Hauptnahrung'
                  : 'Gelegentlich'}
            </span>
            <p>
              {food.length
                ? food.map((f) => f.label).join(' · ')
                : 'Nutzt auch Aas; Häufigkeit je nach Art und Nahrungsangebot.'}
            </p>
          </div>
          {relations.length > 0 && (
            <ul className="size-relations">
              {relations.map((p) => (
                <li key={p.key}>
                  <span>
                    {preyCatalog[p.key].name}
                    {p.note && <small> · {p.note}</small>}
                  </span>
                  <span>{relativeSizeLabels[p.relativeSize]}</span>
                </li>
              ))}
            </ul>
          )}
        </>
      ) : (
        <p className="predator-technique">{bird.ecology.hunting.text}</p>
      )}
      <a
        className="ecology-source"
        href={category ? bird.ecology.sources[0] : bird.source}
        target="_blank"
        rel="noreferrer"
      >
        Art & Nahrung · Quelle ↗
      </a>
    </article>
  );
}
export default function Knowledge({
  section,
}: {
  section: 'prey' | 'techniques';
}) {
  const [category, setCategory] = useState<PreyCategory>('kleinsaeuger');
  const [technique, setTechnique] = useState<HuntingType>('ansitz');
  const [preyId, setPreyId] = useState('');
  const [size, setSize] = useState<RelativeSize | ''>('');
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const c = p.get('kategorie');
    const t = p.get('technik');
    if (c && c in preyCategories) setCategory(c as PreyCategory);
    if (t && t in huntingTypes) setTechnique(t as HuntingType);
    try {
      const isDark = localStorage.getItem('raptor:theme') === 'dark';
      setDark(isDark);
      document.documentElement.dataset.theme = isDark ? 'dark' : 'light';
    } catch {}
  }, []);
  function chooseCategory(id: PreyCategory) {
    setCategory(id);
    setPreyId('');
    setSize('');
    window.history.replaceState(null, '', `?kategorie=${id}`);
  }
  function chooseTechnique(id: HuntingType) {
    setTechnique(id);
    window.history.replaceState(null, '', `?technik=${id}`);
  }
  const preyOptions = [
    ...new Set(
      speciesRecords.flatMap((b) =>
        b.ecology.prey.filter((p) => p.category === category).map((p) => p.key),
      ),
    ),
  ];
  const result =
    section === 'prey'
      ? predatorsFor(category, preyId || undefined, size || undefined)
      : speciesRecords.filter((b) => b.ecology.huntingTags.includes(technique));
  const representative = result.find((b) => huntingImages[b.id]);
  return (
    <div className="knowledge-shell">
      <header className="topbar knowledge-topbar">
        <SiteNavigation active="knowledge" />
        <button
          className="theme-toggle"
          aria-label={dark ? 'Hellmodus aktivieren' : 'Dunkelmodus aktivieren'}
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
        <div className="knowledge-intro">
          <span className="knowledge-eyebrow">
            {section === 'prey'
              ? 'Nahrung & Beziehungen'
              : 'Strategien der Greifvögel'}
          </span>
          <h1>
            {section === 'prey' ? 'Wer jagt wen?' : 'Viele Wege zur Beute.'}
          </h1>
          <p>
            {section === 'prey'
              ? 'Wähle eine Beute und entdecke ihre Jäger. Vom winzigen Insekt bis zum Hasen, der seinen Jäger an Gewicht übertrifft.'
              : 'Abwarten, überraschen oder verfolgen: Entdecke die Techniken und die Vögel, die sie einsetzen.'}
          </p>
        </div>
        {section === 'prey' ? (
          <>
            <div className="prey-category-grid" aria-label="Beutekategorien">
              {Object.entries(preyCategories)
                .filter(([id]) => id !== 'weitere')
                .map(([id, c]) => (
                  <button
                    key={id}
                    className="prey-category-card"
                    aria-pressed={category === id}
                    onClick={() => chooseCategory(id as PreyCategory)}
                  >
                    <div className="category-art">
                      {c.example ? (
                        <PreyArt preyKey={c.example} />
                      ) : (
                        <Bone size={56} strokeWidth={1} />
                      )}
                    </div>
                    <strong>{c.label}</strong>
                    <span>
                      {predatorsFor(id as PreyCategory).length}{' '}
                      {id === 'aas' ? 'Aasnutzer' : 'Jäger'}
                    </span>
                  </button>
                ))}
            </div>
            <button
              className="other-food-link"
              aria-pressed={category === 'weitere'}
              onClick={() => chooseCategory('weitere')}
            >
              Weitere Nahrung: größere Säugetiere, Amphibien, Eier & Wirbellose{' '}
              <ArrowUpRight size={14} />
            </button>
            <section className="prey-explorer" aria-label="Beute eingrenzen">
              <div className="explorer-heading">
                <div>
                  <h2>{preyCategories[category].label}</h2>
                  <p>{preyCategories[category].description}</p>
                </div>
                <div className="size-select">
                  <label id="relative-size-label">
                    Beutegewicht relativ zum Jäger
                  </label>
                  <Select
                    value={size || 'all'}
                    onValueChange={(v) =>
                      setSize(v === 'all' ? '' : (v as RelativeSize))
                    }
                    disabled={category === 'aas'}
                  >
                    <SelectTrigger aria-labelledby="relative-size-label">
                      <SelectValue>
                        {size ? relativeSizeLabels[size] : 'Alle Größen'}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Alle Größen</SelectItem>
                      {(
                        ['kleiner', 'aehnlich', 'groesser', 'variabel'] as const
                      ).map((s) => (
                        <SelectItem key={s} value={s}>
                          {relativeSizeLabels[s]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="prey-choice-grid">
                <button
                  className="prey-choice all-prey"
                  aria-pressed={!preyId}
                  onClick={() => setPreyId('')}
                >
                  Alle
                  <br />
                  <small>{preyCategories[category].label}</small>
                </button>
                {preyOptions
                  .filter((id) => id !== 'aas')
                  .map((id) => (
                    <button
                      className="prey-choice"
                      key={id}
                      aria-pressed={preyId === id}
                      onClick={() => setPreyId(preyId === id ? '' : id)}
                    >
                      <PreyArt preyKey={id} />
                      <span>{preyCatalog[id].name}</span>
                    </button>
                  ))}
              </div>
              <p className="size-explanation">
                {category === 'aas'
                  ? 'Aas ist keine lebend erlegte Beute. Die Größe eines Kadavers sagt nichts über die Jagdfähigkeit des Vogels aus.'
                  : 'Größen sind grobe Einordnungen nach Körpergewicht, keine festen Grenzwerte. Alter, Geschlecht und Beuteart verändern das Verhältnis. Der Größenfilter nutzt die gezeigten Beutebeispiele; „variabel“ bedeutet, dass keine eindeutige Einordnung vorliegt.'}
              </p>
            </section>
          </>
        ) : (
          <div className="technique-explorer">
            <div
              className="technique-options"
              aria-label="Jagdtechnik auswählen"
            >
              {Object.entries(huntingTypes).map(([id, t]) => (
                <button
                  key={id}
                  aria-pressed={technique === id}
                  onClick={() => chooseTechnique(id as HuntingType)}
                >
                  <span>{t.label}</span>
                  <small>
                    {
                      speciesRecords.filter((b) =>
                        b.ecology.huntingTags.includes(id as HuntingType),
                      ).length
                    }{' '}
                    Arten
                  </small>
                </button>
              ))}
            </div>
            <section className="technique-feature">
              <div>
                <span className="knowledge-eyebrow">Die Technik</span>
                <h2>{huntingTypes[technique].label}</h2>
                <p>{huntingTypes[technique].text}</p>
              </div>
              {representative && (
                <figure>
                  <Image
                    src={imageSource(huntingImages[representative.id])}
                    alt={`${representative.name} bei der Nahrungssuche`}
                    width={600}
                    height={420}
                    unoptimized
                  />
                  <figcaption>Am Beispiel: {representative.name}</figcaption>
                </figure>
              )}
            </section>
          </div>
        )}
        <section className="predator-results" aria-label="Passende Vogelarten">
          <div className="results-heading">
            <h2>
              {section === 'prey'
                ? category === 'aas'
                  ? 'Diese Vögel nutzen Aas'
                  : preyId
                    ? `Wer jagt ${preyCatalog[preyId].name}?`
                    : 'Diese Vögel gehören dazu'
                : 'Diese Vögel nutzen die Technik'}
            </h2>
            <span role="status">{result.length} Arten</span>
          </div>
          <div className="predator-grid">
            {result.map((b) => (
              <BirdCard
                key={b.id}
                bird={b}
                category={section === 'prey' ? category : undefined}
                preyId={preyId || undefined}
                size={size || undefined}
              />
            ))}
          </div>
          {!result.length && (
            <div className="knowledge-empty">
              <h3>Keine passende Kombination</h3>
              <p>
                Für diese Beute und Größe ist aktuell keine Art eingeordnet.
              </p>
              <button
                onClick={() => {
                  setPreyId('');
                  setSize('');
                }}
              >
                Filter zurücksetzen
              </button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
