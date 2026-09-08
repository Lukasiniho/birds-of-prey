import { birds, hunts } from './birds.ts';
import { diets } from './diets.ts';
import { foodCatalog } from './food-catalog.ts';
import { speciesLandscapes } from './habitats.ts';

export const preyCategories = {
  kleinsaeuger: {
    label: 'Kleinsäuger',
    description: 'Mäuse, Kaninchen, Hasen & Co.',
    example: 'wuehlmaus',
  },
  voegel: {
    label: 'Vögel',
    description: 'Vom Singvogel bis zum Wasservogel',
    example: 'taube',
  },
  fische: {
    label: 'Fische',
    description: 'Beute unter der Wasseroberfläche',
    example: 'fisch',
  },
  reptilien: {
    label: 'Reptilien',
    description: 'Schlangen, Echsen & Schildkröten',
    example: 'schlange',
  },
  insekten: {
    label: 'Insekten',
    description: 'Libellen, Heuschrecken & Wespenbrut',
    example: 'heuschrecke',
  },
  aas: {
    label: 'Aas',
    description: 'Tote Tiere und ihre Knochen',
    example: null,
  },
  weitere: {
    label: 'Weitere Nahrung',
    description: 'Größere Säugetiere, Amphibien & Wirbellose',
    example: 'affe',
  },
} as const;
export type PreyCategory = keyof typeof preyCategories;
export const huntingTypes = {
  ansitz: {
    label: 'Ansitzjagd',
    text: 'Warten, beobachten, zugreifen. Ein erhöhter Platz gibt den Blick auf die Jagdfläche frei.',
  },
  deckung: {
    label: 'Überraschungsjagd',
    text: 'Bäume, Hecken oder das Gelände verbergen den Anflug. Der entscheidende Angriff ist kurz.',
  },
  suchflug: {
    label: 'Suchflug',
    text: 'Im Gleit- oder Segelflug wird ein großes Gebiet nach Nahrung abgesucht.',
  },
  luftjagd: {
    label: 'Verfolgungsjagd',
    text: 'Die Beute wird im Flug verfolgt. Wendigkeit und Beschleunigung entscheiden.',
  },
  sturzflug: {
    label: 'Sturzflug',
    text: 'Aus der Höhe wird Geschwindigkeit aufgebaut, bevor der Vogel seine Beute erreicht.',
  },
  ruetteln: {
    label: 'Rüttelflug',
    text: 'Trotz Bewegung der Flügel bleibt der Vogel über derselben Stelle und sucht den Boden ab.',
  },
  wasser: {
    label: 'Fischfang',
    text: 'Fische werden mit den Fängen an oder knapp unter der Wasseroberfläche gegriffen.',
  },
  stosstauchen: {
    label: 'Stoßtauchen',
    text: 'Mit den Fängen voran stößt der Fischadler ins Wasser und greift den Fisch.',
  },
  boden: {
    label: 'Jagd zu Fuß',
    text: 'Schreitend wird der Boden abgesucht; Beute wird aufgescheucht, gepackt oder mit Tritten überwältigt.',
  },
  kooperativ: {
    label: 'Gemeinschaftsjagd',
    text: 'Mehrere Vögel arbeiten zusammen und können Beute aus der Deckung treiben.',
  },
  ausgraben: {
    label: 'Nester ausgraben',
    text: 'Der Wespenbussard öffnet Erdnester, um an die Larven und Puppen in den Waben zu gelangen.',
  },
  aas: {
    label: 'Aassuche',
    text: 'Kadaver liefern Nahrung ohne Jagd auf lebende Tiere. Auch einige aktive Jäger nutzen Aas.',
  },
  knochen: {
    label: 'Knochen fallen lassen',
    text: 'Zu große Knochen werden aus der Luft auf Felsen fallen gelassen, bis schluckbare Stücke entstehen.',
  },
} as const;
export type HuntingType = keyof typeof huntingTypes;
const techniques: Record<string, HuntingType[]> = {
  rotschwanzbussard: ['ansitz'],
  habicht: ['deckung'],
  maeusebussard: ['ansitz'],
  wanderfalke: ['luftjagd', 'sturzflug'],
  turmfalke: ['ruetteln'],
  steinadler: ['suchflug'],
  seeadler: ['wasser', 'ansitz', 'suchflug'],
  fischadler: ['stosstauchen'],
  wuestenbussard: ['kooperativ'],
  kaiseradler: ['ansitz', 'suchflug'],
  steppenadler: ['ansitz', 'boden'],
  sekretaer: ['boden'],
  andenkondor: ['aas', 'suchflug'],
  wespenbussard: ['ausgraben'],
  bartgeier: ['aas', 'knochen'],
  kronenadler: ['deckung'],
  weisskopfseeadler: ['wasser'],
  riesenseeadler: ['wasser'],
  gaukler: ['suchflug'],
  aguja: ['suchflug'],
  uhu: ['ansitz'],
  schwarzmilan: ['suchflug'],
  rotmilan: ['suchflug'],
  gerfalke: ['luftjagd'],
  sakerfalke: ['luftjagd'],
  lannerfalke: ['luftjagd'],
  baumfalke: ['luftjagd'],
  falklandkarakara: ['boden', 'aas'],
  schopfkarakara: ['boden', 'aas'],
  koenigsbussard: ['ansitz'],
  harpyie: ['deckung'],
  kampfadler: ['sturzflug'],
  virginiauhu: ['ansitz'],
  weissstorch: ['boden'],
  sperber: ['deckung'],
};
export const statusLabels = {
  brut: 'Brutvogel',
  winter: 'Wintervorkommen',
  durchzug: 'Durchzug',
  selten: 'Seltener Gast',
  wiederansiedlung: 'Wiederansiedlung',
  ausserhalb: 'Außerhalb des regulären Verbreitungsgebiets',
} as const;
export type SeasonStatus = keyof typeof statusLabels;
// Geographic scope is essential: these tags describe Germany, not the global range.
const germany: Record<string, SeasonStatus[]> = {
  habicht: ['brut', 'winter'],
  maeusebussard: ['brut', 'winter', 'durchzug'],
  wanderfalke: ['brut', 'winter', 'durchzug'],
  turmfalke: ['brut', 'winter'],
  steinadler: ['brut', 'winter'],
  seeadler: ['brut', 'winter'],
  fischadler: ['brut', 'durchzug'],
  uhu: ['brut', 'winter'],
  schwarzmilan: ['brut', 'durchzug'],
  rotmilan: ['brut', 'winter', 'durchzug'],
  baumfalke: ['brut', 'durchzug'],
  weissstorch: ['brut', 'winter', 'durchzug'],
  sperber: ['brut', 'winter', 'durchzug'],
  wespenbussard: ['brut', 'durchzug'],
  gerfalke: ['selten'],
  sakerfalke: ['selten'],
  kaiseradler: ['selten'],
  steppenadler: ['selten'],
  bartgeier: ['wiederansiedlung'],
};
export const relativeSizeLabels = {
  kleiner: 'Deutlich kleiner',
  aehnlich: 'Ähnliche Größenordnung',
  groesser: 'Größer als der Jäger',
  variabel: 'Variabel / nicht eingeordnet',
  nichtAnwendbar: 'Kein Lebendbeute-Vergleich',
} as const;
export type RelativeSize = keyof typeof relativeSizeLabels;
// Editorial, qualitative body-mass comparison for the illustrated prey examples.
// Never infer size from the display image or apply a category-wide size to every species.
const sizeBySpecies: Record<string, Partial<Record<string, RelativeSize>>> = {
  rotschwanzbussard: {
    wuehlmaus: 'kleiner',
    kaninchen: 'aehnlich',
    ziesel: 'kleiner',
    hase: 'groesser',
  },
  habicht: {
    taube: 'kleiner',
    kaninchen: 'aehnlich',
    eichhoernchen: 'kleiner',
  },
  maeusebussard: {
    wuehlmaus: 'kleiner',
    kaninchen: 'variabel',
    frosch: 'kleiner',
  },
  wanderfalke: { taube: 'aehnlich', singvogel: 'kleiner', ente: 'aehnlich' },
  turmfalke: { wuehlmaus: 'kleiner', heuschrecke: 'kleiner', echse: 'kleiner' },
  steinadler: {
    hase: 'aehnlich',
    murmeltier: 'aehnlich',
    gamskitz: 'variabel',
    rehkitz: 'variabel',
    fuchs: 'aehnlich',
  },
  seeadler: { fisch: 'variabel', ente: 'kleiner' },
  fischadler: { fisch: 'kleiner' },
  wuestenbussard: {
    kaninchen: 'groesser',
    hase: 'groesser',
    ziesel: 'kleiner',
    taube: 'kleiner',
    echse: 'kleiner',
  },
  kaiseradler: { ziesel: 'kleiner', hase: 'aehnlich', taube: 'kleiner' },
  steppenadler: { ziesel: 'kleiner', maus: 'kleiner', heuschrecke: 'kleiner' },
  sekretaer: {
    schlange: 'variabel',
    heuschrecke: 'kleiner',
    maus: 'kleiner',
    echse: 'kleiner',
  },
  wespenbussard: { kaefer: 'kleiner', frosch: 'kleiner', maus: 'kleiner' },
  kronenadler: { affe: 'variabel', schlange: 'variabel' },
  weisskopfseeadler: {
    fisch: 'variabel',
    ente: 'kleiner',
    kaninchen: 'kleiner',
  },
  riesenseeadler: { fisch: 'variabel', ente: 'kleiner' },
  gaukler: { maus: 'kleiner', schlange: 'variabel', taube: 'kleiner' },
  aguja: { maus: 'kleiner', kaninchen: 'aehnlich', hase: 'aehnlich' },
  uhu: { ratte: 'kleiner', kaninchen: 'aehnlich', hase: 'aehnlich' },
  schwarzmilan: { fisch: 'variabel', maus: 'kleiner', singvogel: 'kleiner' },
  rotmilan: {
    wuehlmaus: 'kleiner',
    singvogel: 'kleiner',
    regenwurm: 'kleiner',
  },
  gerfalke: { schneehuhn: 'aehnlich' },
  sakerfalke: {
    ziesel: 'kleiner',
    wuehlmaus: 'kleiner',
    taube: 'aehnlich',
    singvogel: 'kleiner',
  },
  lannerfalke: { taube: 'aehnlich', singvogel: 'kleiner' },
  baumfalke: { schwalbe: 'kleiner', libelle: 'kleiner' },
  falklandkarakara: { seevogelkueken: 'kleiner', krebs: 'kleiner' },
  schopfkarakara: { kaefer: 'kleiner', maus: 'kleiner', echse: 'kleiner' },
  koenigsbussard: {
    hase: 'groesser',
    kaninchen: 'aehnlich',
    ziesel: 'kleiner',
  },
  harpyie: { faultier: 'aehnlich', affe: 'variabel' },
  kampfadler: { perlhuhn: 'kleiner', hase: 'aehnlich' },
  virginiauhu: {
    kaninchen: 'aehnlich',
    stinktier: 'aehnlich',
    ratte: 'kleiner',
  },
  weissstorch: {
    frosch: 'kleiner',
    maus: 'kleiner',
    heuschrecke: 'kleiner',
    regenwurm: 'kleiner',
  },
  sperber: { singvogel: 'kleiner', taube: 'groesser' },
};
const preyCategoryById: Record<string, PreyCategory> = {
  aas: 'aas',
  knochen: 'aas',
  wespenbrut: 'insekten',
  wuehlmaus: 'kleinsaeuger',
  maus: 'kleinsaeuger',
  ratte: 'kleinsaeuger',
  kaninchen: 'kleinsaeuger',
  hase: 'kleinsaeuger',
  ziesel: 'kleinsaeuger',
  murmeltier: 'kleinsaeuger',
  eichhoernchen: 'kleinsaeuger',
  stinktier: 'weitere',
  taube: 'voegel',
  ente: 'voegel',
  singvogel: 'voegel',
  schwalbe: 'voegel',
  schneehuhn: 'voegel',
  perlhuhn: 'voegel',
  seevogelkueken: 'voegel',
  fisch: 'fische',
  heuschrecke: 'insekten',
  libelle: 'insekten',
  kaefer: 'insekten',
  echse: 'reptilien',
  schlange: 'reptilien',
  frosch: 'weitere',
  regenwurm: 'weitere',
  affe: 'weitere',
  faultier: 'weitere',
  gamskitz: 'weitere',
  rehkitz: 'weitere',
  fuchs: 'weitere',
  ei: 'weitere',
  krebs: 'weitere',
};
const namedPrey: Record<string, string[]> = {
  wuhlmause: ['wuehlmaus'],
  mause: ['maus'],
  ratten: ['ratte'],
  kaninchen: ['kaninchen'],
  hasen: ['hase'],
  tauben: ['taube'],
  singvogel: ['singvogel'],
  'kleine-singvogel': ['singvogel'],
  schwalben: ['schwalbe'],
  wasservogel: ['ente'],
  'enten-und-andere-wasservogel': ['ente'],
  'see-und-wasservogel': ['ente'],
  raufusshuhner: ['schneehuhn'],
  schneehuhner: ['schneehuhn'],
  fische: ['fisch'],
  susswasserfische: ['fisch'],
  meeresfische: ['fisch'],
  lachse: ['fisch'],
  ziesel: ['ziesel'],
  murmeltiere: ['murmeltier'],
  heuschrecken: ['heuschrecke'],
  libellen: ['libelle'],
  kafer: ['kaefer'],
  'wespenlarven-und-puppen': ['wespenbrut'],
  hummelbrut: ['wespenbrut'],
  schlangen: ['schlange'],
  eidechsen: ['echse'],
  frosche: ['frosch'],
  regenwurmer: ['regenwurm'],
  affen: ['affe'],
  faultiere: ['faultier'],
  fuchse: ['fuchs'],
  rehkitze: ['rehkitz'],
  'gamskitze-regional': ['gamskitz'],
  perlhuhner: ['perlhuhn'],
  seevogelkuken: ['seevogelkueken'],
  seevogeleier: ['ei'],
  krebse: ['krebs'],
  'mause-und-ratten': ['maus', 'ratte'],
  'kaninchen-und-hasen': ['kaninchen', 'hase'],
  'hasen-und-kaninchen': ['hase', 'kaninchen'],
  'mause-und-wuhlmause': ['maus', 'wuehlmaus'],
  'tauben-und-turteltauben': ['taube'],
};
export const speciesRecords = birds.map((bird) => {
  const diet = diets[bird.id];
  const food = [
    ...diet.primary.map((id) => ({
      id,
      importance: 'primary' as const,
      ...foodCatalog[id],
    })),
    ...diet.occasional.map((id) => ({
      id,
      importance: 'occasional' as const,
      ...foodCatalog[id],
    })),
  ];
  const categoryTags = [
    ...new Set<PreyCategory>(
      food
        .flatMap((f) => [...f.categories] as PreyCategory[])
        .concat(diet.carrion ? ['aas'] : []),
    ),
  ];
  const candidates = [
    ...diet.examples.map((p) => ({ ...p, importance: 'primary' as const })),
    ...diet.occasionalExamples.map((p) => ({
      ...p,
      importance: 'occasional' as const,
    })),
    ...food.flatMap((f) =>
      (namedPrey[f.id] ?? []).map((key) => ({
        key,
        note: undefined as string | undefined,
        importance: f.importance,
      })),
    ),
  ];
  const unique = new Map<string, (typeof candidates)[number]>();
  for (const p of candidates) {
    const existing = unique.get(p.key);
    if (!existing) unique.set(p.key, p);
    else if (p.importance === 'primary')
      unique.set(p.key, { ...existing, importance: 'primary' });
  }
  const prey = [...unique.values()].map((p) => {
    const carrion =
      p.key === 'aas' ||
      p.key === 'knochen' ||
      (p.note?.includes('Aas') ?? false);
    return {
      ...p,
      category: carrion ? ('aas' as const) : preyCategoryById[p.key],
      relativeSize:
        carrion || p.key === 'ei'
          ? ('nichtAnwendbar' as const)
          : ((p.key === 'wespenbrut'
              ? 'kleiner'
              : sizeBySpecies[bird.id]?.[p.key]) ?? ('variabel' as const)),
    };
  });
  return {
    ...bird,
    ecology: {
      food,
      categoryTags,
      prey,
      diet,
      habitatTags: speciesLandscapes[bird.id],
      huntingTags: techniques[bird.id],
      hunting: hunts[bird.id],
      status: {
        region: 'DE' as const,
        tags: germany[bird.id] ?? (['ausserhalb'] as SeasonStatus[]),
        sources:
          bird.id === 'bartgeier'
            ? [
                'https://www.lbv.de/naturschutz/arten-schuetzen/voegel/bartgeier/',
              ]
            : bird.id === 'weissstorch'
              ? [
                  'https://www.nabu.de/tiere-und-pflanzen/voegel/artenschutz/weissstorch/35551.html',
                ]
              : germany[bird.id]?.includes('brut')
                ? [
                    `https://www.nabu.de/tiere-und-pflanzen/voegel/portraets/${bird.id}/`,
                  ]
                : [bird.source],
      },
      sources: diet.sources,
    },
  };
});
export type SpeciesRecord = (typeof speciesRecords)[number];
export const speciesById = Object.fromEntries(
  speciesRecords.map((b) => [b.id, b]),
);
export function predatorsFor(
  category: PreyCategory,
  preyId?: string,
  size?: RelativeSize,
) {
  return speciesRecords.filter(
    (b) =>
      b.ecology.categoryTags.includes(category) &&
      ((!preyId && !size) ||
        b.ecology.prey.some(
          (p) =>
            p.category === category &&
            (!preyId || p.key === preyId) &&
            (!size || p.relativeSize === size),
        )),
  );
}
