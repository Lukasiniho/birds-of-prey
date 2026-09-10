import { sizeBuckets, sizeBucketFor, compareSizeWithinGroup } from './species-size.ts';
import { landscapes, speciesLandscapes } from './habitats.ts';
import { birdImages } from './bird-images.ts';
import { huntingImages } from './hunting-images.ts';
import { additionalBirds } from './additional-birds.ts';
/** A natural range as [min, max]. */
export type MeasurementRange = [number, number];
/** Per-sex measurements: wingspan in cm (optional), body mass in grams. */
export type SexMeasurements = { span?: MeasurementRange; weight: MeasurementRange };
export type BirdSpecies = {
  id: string;
  aliases?: string[];
  name: string;
  latin: string;
  group: string;
  tile: number | null;
  /** Wingspan in cm, both sexes. */
  span: MeasurementRange;
  /** Body mass in grams, both sexes — always grams, never kilograms. */
  weight: MeasurementRange;
  /** Sex-specific ranges where sources give them; weight always in grams. */
  sexes?: { male: SexMeasurements; female: SexMeasurements };
  intro: string;
  habitat: string;
  range: string;
  colors: [string, string][];
  source: string;
  sourceName: string;
};
export const birds: BirdSpecies[] = [
  {
    id: 'rotschwanzbussard',
    name: 'Rotschwanzbussard',
    latin: 'Buteo jamaicensis',
    group: 'Bussarde',
    tile: null,
    span: [115, 135],
    weight: [690, 2000],
    sexes: {
      male: { weight: [690, 1300] },
      female: { weight: [900, 2000] },
    },
    intro:
      'Über den offenen Landschaften Nordamerikas zieht er weite Kreise und hält nach Beute Ausschau.',
    habitat:
      'Offene Landschaften, Felder und Waldränder. Hohe Bäume und Pfähle dienen als Ansitz.',
    range: 'Nordamerika',
    colors: [
      ['Rostrot', '#AC603B'],
      ['Dunkelbraun', '#4B3C31'],
      ['Sandbraun', '#C3A781'],
      ['Cremeweiß', '#E8DFCD'],
      ['Anthrazit', '#353636'],
    ],
    source: 'https://www.allaboutbirds.org/guide/Red-tailed_Hawk/lifehistory',
    sourceName: 'Cornell Lab',
  },
  {
    id: 'habicht',
    name: 'Habicht',
    latin: 'Astur gentilis',
    group: 'Habichte',
    tile: 0,
    span: [100, 115],
    weight: [590, 1350],
    sexes: {
      male: { weight: [590, 870] },
      female: { weight: [890, 1350] },
    },
    intro:
      'Ein wendiger Jäger, der seine Beute zwischen Bäumen und aus der Deckung überrascht.',
    habitat:
      'Wälder mit alten Bäumen und strukturreiche Waldränder. In Städten besiedelt er auch große Parks, Friedhöfe und begrünte Innenhöfe mit altem Baumbestand.',
    range: 'Europa & Asien',
    colors: [
      ['Schiefergrau', '#626E74'],
      ['Braungrau', '#81776C'],
      ['Weiß', '#E2E0D7'],
      ['Dunkelgrau', '#3C4143'],
    ],
    source:
      'https://www.lbv.de/ratgeber/naturwissen/artenportraits/detail/habicht/',
    sourceName: 'LBV',
  },
  {
    id: 'maeusebussard',
    name: 'Mäusebussard',
    latin: 'Buteo buteo',
    group: 'Bussarde',
    tile: 1,
    span: [110, 140],
    weight: [427, 1370],
    sexes: {
      male: { weight: [427, 1183] },
      female: { weight: [486, 1370] },
    },
    intro:
      'Über Wiesen kreisend oder auf einem Zaunpfahl wartend: unser vertrauter Mäusejäger.',
    habitat:
      'Wiesen, Weiden und Felder nahe an Wäldern oder Baumgruppen. Dort findet er Jagdflächen und Brutplätze.',
    range: 'Europa & Westasien',
    colors: [
      ['Braun', '#705443'],
      ['Dunkelbraun', '#40362D'],
      ['Beige', '#BFA88C'],
      ['Cremeweiß', '#E4DECE'],
    ],
    source: 'https://www.voliere.ch/portfolio-items/maeusebussard/',
    sourceName: 'Voliere Zürich',
  },
  {
    id: 'wanderfalke',
    name: 'Wanderfalke',
    latin: 'Falco peregrinus',
    group: 'Falken',
    tile: 2,
    span: [90, 105],
    weight: [580, 1100],
    sexes: {
      male: { weight: [580, 730] },
      female: { weight: [850, 1100] },
    },
    intro:
      'Ein spezialisierter Vogeljäger, der seine Beute im freien Luftraum verfolgt.',
    habitat:
      'Felswände, Küsten und Steinbrüche. In Städten nutzt er hohe Gebäude als Brutplatz.',
    range: 'Fast weltweit',
    colors: [
      ['Blaugrau', '#53616D'],
      ['Anthrazit', '#2E3236'],
      ['Cremeweiß', '#E6E0D2'],
      ['Graubraun', '#95887A'],
    ],
    source:
      'https://www.jagdverband.de/zahlen-fakten/tiersteckbriefe/wanderfalke-falco-peregrinus',
    sourceName: 'Deutscher Jagdverband',
  },
  {
    id: 'turmfalke',
    name: 'Turmfalke',
    latin: 'Falco tinnunculus',
    group: 'Falken',
    tile: 3,
    span: [65, 85],
    weight: [136, 314],
    sexes: {
      male: { weight: [136, 252] },
      female: { weight: [154, 314] },
    },
    intro:
      'Im Rüttelflug steht er scheinbar still über dem Feld und sucht den Boden nach Mäusen ab.',
    habitat:
      'Offene Felder, Wiesen und Siedlungen. Brütet in Felsnischen, an Gebäuden und in Nistkästen.',
    range: 'Europa, Asien & Afrika',
    colors: [
      ['Rotbraun', '#AA673D'],
      ['Blaugrau', '#83919B'],
      ['Beige', '#D6BC92'],
      ['Dunkelbraun', '#483A2F'],
    ],
    source:
      'https://www.hgon.de/de/unsere-arbeit/voegel/artenliste/art/turmfalke/',
    sourceName: 'HGON',
  },
  {
    id: 'steinadler',
    name: 'Steinadler',
    latin: 'Aquila chrysaetos',
    group: 'Adler',
    tile: 4,
    span: [190, 230],
    weight: [2870, 6650],
    sexes: {
      male: { weight: [2870, 4550] },
      female: { weight: [3750, 6650] },
    },
    intro:
      'Mit ausgebreiteten Schwingen gleitet er an Berghängen entlang und nutzt die aufsteigende Luft.',
    habitat:
      'Offene Gebirgslandschaften und Felsregionen. In Deutschland vor allem in den Alpen.',
    range: 'Nördliche Erdhalbkugel',
    colors: [
      ['Dunkelbraun', '#493729'],
      ['Goldbraun', '#A57D46'],
      ['Erdbraun', '#705139'],
      ['Schwarzbraun', '#2E2925'],
    ],
    source: 'https://www.steinadlerschutz.de/steinadler-im-portr%C3%A4t/',
    sourceName: 'LBV Steinadlerschutz',
  },
  {
    id: 'seeadler',
    name: 'Seeadler',
    latin: 'Haliaeetus albicilla',
    group: 'Adler',
    tile: 5,
    span: [200, 245],
    weight: [4100, 6900],
    sexes: {
      male: { weight: [4100, 4600] },
      female: { weight: [5200, 6900] },
    },
    intro:
      'Über Seen und Küsten patrouilliert dieser mächtige Greifvogel mit seinen breiten Schwingen.',
    habitat:
      'Große Seen, Flüsse und Küsten mit alten Bäumen für den Horst und ungestörten Rückzugsorten.',
    range: 'Europa & Asien',
    colors: [
      ['Erdbraun', '#695849'],
      ['Hellbraun', '#A2957D'],
      ['Weiß', '#E8E6DC'],
      ['Dunkelbraun', '#45392F'],
    ],
    source:
      'https://www.wildtierportal.bayern.de/wildtiere_bayern/251679/index.php',
    sourceName: 'Wildtierportal Bayern',
  },
  {
    id: 'fischadler',
    name: 'Fischadler',
    latin: 'Pandion haliaetus',
    group: 'Fischadler',
    tile: 6,
    span: [150, 170],
    weight: [1300, 2100],
    sexes: {
      male: { weight: [1300, 1600] },
      female: { weight: [1600, 2100] },
    },
    intro:
      'Er sucht über dem Wasser nach Fischen und greift sie mit vorgestreckten Fängen.',
    habitat:
      'Fischreiche Seen, Flüsse und Küsten. Brütet auf hohen Bäumen, Masten und speziellen Nisthilfen.',
    range: 'Fast weltweit',
    colors: [
      ['Dunkelbraun', '#514539'],
      ['Weiß', '#EAE7DD'],
      ['Graubraun', '#948776'],
      ['Schwarzbraun', '#2F2D29'],
    ],
    source:
      'https://www.hgon.de/de/unsere-arbeit/voegel/artenliste/art/fischadler/',
    sourceName: 'HGON',
  },
  ...additionalBirds,
];
export function filterBirds(query: string) {
  const term = query.trim().toLocaleLowerCase('de');
  return birds.filter((b) =>
    `${b.name} ${b.latin} ${b.group} ${b.id} ${(b.aliases || []).join(' ')}`
      .toLocaleLowerCase('de')
      .includes(term),
  );
}
export type GroupMode = 'genus' | 'range' | 'habitat' | 'size';
export const groupingOptions = [
  { value: 'genus', label: 'Gattung' },
  { value: 'range', label: 'Verbreitung' },
  { value: 'habitat', label: 'Lebensraum' },
  { value: 'size', label: 'Größe' },
];
const genera: Record<string, string> = {
  Buteo: 'Bussarde',
  Astur: 'Habichte',
  Falco: 'Falken',
  Aquila: 'Echte Adler',
  Haliaeetus: 'Seeadler',
  Pandion: 'Fischadler',
  ...Object.fromEntries(
    additionalBirds.map((b) => [b.latin.split(' ')[0], b.genusLabel]),
  ),
};
export function groupBirds(list: BirdSpecies[], mode: GroupMode) {
  if (mode === 'size') {
    const bySize = new Map<string, BirdSpecies[]>();
    for (const bird of list) {
      const key = sizeBucketFor(bird)?.id ?? 'size-unknown';
      bySize.set(key, [...(bySize.get(key) ?? []), bird]);
    }
    return [
      ...sizeBuckets,
      { id: 'size-unknown', title: 'Größe nicht bekannt' },
    ]
      .filter((bucket) => bySize.has(bucket.id))
      .map((bucket) => ({
        id: bucket.id,
        title: bucket.title,
        subtitle: undefined,
        birds: [...bySize.get(bucket.id)!].sort(compareSizeWithinGroup),
      }));
  }
  const groups = new Map<
    string,
    { title: string; subtitle?: string; birds: BirdSpecies[] }
  >();
  for (const bird of list) {
    const genus = bird.latin.split(' ')[0];
    const keys =
      mode === 'habitat'
        ? speciesLandscapes[bird.id].map((id) => landscapes[id].label)
        : [mode === 'genus' ? genus : bird.range];
    for (const key of keys) {
      if (!groups.has(key))
        groups.set(key, {
          title: mode === 'genus' ? genera[key] : key,
          subtitle: mode === 'genus' ? key : undefined,
          birds: [],
        });
      groups.get(key)!.birds.push(bird);
    }
  }
  return [...groups.entries()].map(([id, g]) => ({ id, ...g }));
}
export type Plumage = 'male' | 'female' | 'juvenile';
export const plumages = [
  { value: 'male', label: 'Männchen' },
  { value: 'female', label: 'Weibchen' },
  { value: 'juvenile', label: 'Jungvogel' },
] as const;
export function plumagesFor(id: string): { value: Plumage; label: string }[] {
  return [
    'turmfalke',
    'gaukler',
    'sperber',
    'andenkondor',
    'fischadler',
  ].includes(id)
    ? [...plumages]
    : [
        { value: 'male', label: 'Altvogel' },
        { value: 'juvenile', label: 'Jungvogel' },
      ];
}
const adultNotes: Record<string, string> = {
  rotschwanzbussard:
    'Rostroter Schwanz und dunkles Bauchband kennzeichnen das Alterskleid. Die Geschlechter sind ähnlich gefärbt; Weibchen sind im Mittel größer.',
  habicht:
    'Feine Querbänder zeichnen die helle Unterseite. Weibchen sind deutlich größer und oft etwas brauner als die eher blaugrauen Männchen.',
  maeusebussard:
    'Das Gefieder reicht von sehr hell bis dunkelbraun. Diese Farbvarianten kommen bei beiden Geschlechtern vor.',
  wanderfalke:
    'Schiefergrauer Rücken, dunkler Bartstreif und quergebänderte Unterseite. Weibchen tragen das gleiche Grundmuster, sind aber deutlich größer.',
  steinadler:
    'Dunkelbraunes Gefieder mit goldbraunem Nacken. Die Geschlechter unterscheiden sich vor allem in der Größe; Weibchen sind meist kräftiger.',
  seeadler:
    'Heller brauner Kopf, gelber Schnabel und weißer Schwanz im Alterskleid. Weibchen sind ähnlich gefärbt, aber meist größer und schwerer.',
  weisskopfseeadler:
    'Weißer Kopf und Schwanz über einem dunkelbraunen Körper. Beide Geschlechter tragen dieses Alterskleid; Weibchen sind im Mittel größer.',
  riesenseeadler:
    'Weiße Schultern und ein weißer Keilschwanz kontrastieren mit dem dunklen Gefieder. Weibchen sind ähnlich gefärbt, aber meist deutlich schwerer.',
  aguja:
    'Ein dunkles Brustschild setzt sich vom hellen Bauch ab. Beide Geschlechter tragen das grau-weiße Alterskleid; Weibchen sind im Mittel größer.',
  uhu: 'Orange Augen, Federohren und ein dicht gemustertes braun-beiges Gefieder. Die Geschlechter sind ähnlich gefärbt, Weibchen jedoch deutlich größer.',
  schwarzmilan:
    'Dunkelbraunes Gefieder mit leicht gegabeltem Schwanz. Männchen und Weibchen lassen sich am Gefieder kaum unterscheiden.',
  rotmilan:
    'Rostroter Schwanz, heller Kopf und auffallend helle Felder unter den Flügeln. Beide Geschlechter sind ähnlich gefärbt.',
  gerfalke:
    'Hier ist die graue Farbvariante dargestellt; daneben gibt es helle und sehr dunkle Gerfalken. Die Farbvarianten hängen nicht vom Geschlecht ab.',
  sakerfalke:
    'Braune Oberseite und eine helle, dunkel gezeichnete Unterseite. Weibchen sind größer, im Gefieder aber weitgehend gleich.',
  lannerfalke:
    'Heller Kopf mit rostbraunem Scheitel und schmalem dunklem Bartstreif. Weibchen sind größer; die Gefiederzeichnung unterscheidet sich nur wenig.',
  baumfalke:
    'Dunkler Kopf, schiefergraue Oberseite und rostrotes Gefieder an den befiederten Beinen. Beide Geschlechter zeigen diese Zeichnung; Weibchen sind meist größer.',
};
export function plumageNoteFor(id: string, plumage: Plumage) {
  return plumage === 'male' && adultNotes[id]
    ? adultNotes[id]
    : plumageNotes[id][plumage];
}
export const plumageNotes: Record<string, Record<Plumage, string>> = {
  ...Object.fromEntries(additionalBirds.map((b) => [b.id, b.plumageNotes])),
  rotschwanzbussard: {
    male: 'Rostroter Schwanz und dunkles Bauchband. Am Gefieder lassen sich die Geschlechter kaum unterscheiden.',
    female:
      'Ähnlich gefärbt wie das Männchen, im Durchschnitt aber größer und schwerer.',
    juvenile:
      'Der Schwanz ist noch braun und fein gebändert. Die typische rostrote Färbung entwickelt sich erst später.',
  },
  habicht: {
    male: 'Blaugraue Oberseite und feine Querbänder auf der hellen Unterseite. Deutlich kleiner als das Weibchen.',
    female:
      'Kräftiger und deutlich größer als das Männchen. Die Oberseite wirkt meist etwas brauner.',
    juvenile:
      'Braunes Jugendkleid mit länglichen Tropfenflecken auf der Brust. Die Iris ist heller als bei älteren Vögeln.',
  },
  maeusebussard: {
    male: 'Die Gefiederfarbe variiert von sehr hell bis dunkelbraun. Männchen und Weibchen sind ähnlich gefärbt.',
    female:
      'Im Mittel größer und schwerer als das Männchen. Helle und dunkle Farbvarianten kommen bei beiden Geschlechtern vor.',
    juvenile:
      'Ähnelt bereits dem Altvogel. Die dunkle Endbinde des Schwanzes ist meist schwächer ausgeprägt.',
  },
  wanderfalke: {
    male: 'Schiefergrauer Rücken, dunkler Bartstreif und quergebänderte Unterseite. Kleiner als das Weibchen.',
    female:
      'Gleiches Grundmuster wie beim Männchen, jedoch deutlich kräftiger und größer.',
    juvenile:
      'Braune Oberseite und längsgestreifte, beige Unterseite. Die Querbänderung der Altvögel fehlt noch.',
  },
  turmfalke: {
    male: 'Grauer Kopf und grauer Schwanz mit dunkler Endbinde. Der rotbraune Rücken ist dunkel gefleckt.',
    female:
      'Kopf und Schwanz sind braun. Rücken und Schwanz tragen eine deutliche dunkle Bänderung.',
    juvenile:
      'Ähnelt dem Weibchen mit braunem Kopf und gebändertem Schwanz. Die Federn wirken häufig heller gesäumt.',
  },
  steinadler: {
    male: 'Dunkelbraunes Gefieder mit goldbraunem Nacken. Die Geschlechter unterscheiden sich hauptsächlich in der Größe.',
    female:
      'Gleich gefärbt wie das Männchen, jedoch im Durchschnitt größer und schwerer.',
    juvenile:
      'Weiße Felder in den Flügeln und eine helle Schwanzbasis mit dunkler Endbinde. Diese Jugendmerkmale verschwinden über mehrere Jahre.',
  },
  seeadler: {
    male: 'Heller brauner Kopf, gelber Schnabel und weißer Schwanz im Alterskleid.',
    female:
      'Ähnlich gefärbt wie das Männchen, meist aber größer und kräftiger.',
    juvenile:
      'Dunkles, unregelmäßig aufgehelltes Gefieder und ein dunkler Schnabel. Der Schwanz ist noch nicht rein weiß.',
  },
  fischadler: {
    male: 'Weißer Kopf mit dunklem Augenstreif. Das Brustband ist oft schwach ausgeprägt oder fehlt; die Unterflügeldecken sind meist weniger gefleckt als beim Weibchen. Es gibt Überschneidungen zwischen den Geschlechtern.',
    female:
      'Häufig breiteres, stärker geflecktes Brustband und mehr dunkle Tropfenflecken an den Unterflügeldecken. Weibchen sind im Mittel größer; die gleich groß dargestellten Bilder vergleichen die Gefiederzeichnung. Das Brustband allein erlaubt keine sichere Geschlechtsbestimmung.',
    juvenile:
      'Helle Säume an den Rücken- und Flügelfedern erzeugen ein geschupptes Muster. Die Augen wirken orangegelb.',
  },
};
export const hunts: Record<
  string,
  { title: string; tile: number; text: string; image?: string }
> = {
  ...Object.fromEntries(
    additionalBirds.map((b) => [
      b.id,
      { ...b.hunt, tile: 0, image: huntingImages[b.id] },
    ]),
  ),
  rotschwanzbussard: {
    title: 'Ansitzjagd',
    tile: 0,
    text: 'Von einem erhöhten Ansitz beobachtet er den Boden und wartet auf eine günstige Gelegenheit. Entdeckt er Beute, gleitet er hinab und greift mit vorgestreckten Fängen zu.',
  },
  habicht: {
    title: 'Jagd aus der Deckung',
    tile: 3,
    text: 'Er nähert sich möglichst ungesehen zwischen Bäumen, Hecken oder Gebäuden. Mit einem kurzen, schnellen Angriff überrascht er seine Beute.',
  },
  maeusebussard: {
    title: 'Ansitzjagd',
    tile: 0,
    text: 'Ein Pfahl oder eine Baumkrone bietet ihm einen guten Blick über die Jagdfläche. Sobald sich eine Maus zeigt, stößt er zum Boden hinab.',
  },
  wanderfalke: {
    title: 'Jagd im freien Luftraum',
    tile: 2,
    text: 'Er verfolgt fliegende Vögel oder nähert sich ihnen im schnellen Sturzflug aus großer Höhe. Die Beute greift oder trifft er mit den Fängen in der Luft.',
  },
  turmfalke: {
    title: 'Rüttelflug',
    tile: 1,
    text: 'Mit schnellen Flügelschlägen und gefächertem Schwanz hält er seine Position über dem Boden. Entdeckt er eine Maus, geht er in einen gezielten Jagdstoß über.',
  },
  steinadler: {
    title: 'Suchflug',
    tile: 4,
    text: 'Im Gleitflug sucht er offene Hänge und Bergrücken nach Beute ab. Er greift meist am Boden zu und nutzt dabei häufig die Deckung des Geländes.',
  },
  seeadler: {
    title: 'Jagd am Wasser',
    tile: 5,
    text: 'Von einem Ansitz oder im Suchflug hält er nach Fischen und Wasservögeln Ausschau. Fische greift er oft nahe der Oberfläche, Wasservögel erbeutet er auch nach längerer Verfolgung.',
  },
  fischadler: {
    title: 'Stoßtauchen',
    tile: 5,
    text: 'Er sucht im Flug nach Fischen nahe der Wasseroberfläche. Beim Angriff streckt er die Fänge nach vorn und taucht mit den Füßen zuerst ins Wasser ein.',
  },
};
export function birdImage(id: string, plumage: Plumage) {
  if (
    plumage === 'female' &&
    !plumagesFor(id).some((p) => p.value === 'female')
  )
    plumage = 'male';
  const key =
    plumage === 'male'
      ? id
      : `${plumage === 'female' ? 'female' : 'juvenile'}-${id}`;
  return birdImages[key] ?? `/birds/${key}.png?v=aligned-1`;
}
export function colorsFor(
  bird: BirdSpecies,
  plumage: Plumage,
): [string, string][] {
  const added = additionalBirds.find((b) => b.id === bird.id);
  if (added)
    return plumage === 'juvenile'
      ? added.juvenileColors
      : plumage === 'female' && added.femaleColors
        ? added.femaleColors
        : added.colors;
  if (plumage === 'juvenile') {
    const juvenile: Record<string, [string, string][]> = {
      rotschwanzbussard: [
        ['Braun', '#76543A'],
        ['Dunkelbraun', '#44382E'],
        ['Beige', '#CBB48D'],
        ['Cremeweiß', '#E5DCC9'],
      ],
      habicht: [
        ['Braun', '#8F6A47'],
        ['Dunkelbraun', '#4E3D2F'],
        ['Ockerbeige', '#D1B387'],
        ['Cremeweiß', '#E9DECA'],
      ],
      wanderfalke: [
        ['Dunkelbraun', '#584333'],
        ['Braun', '#937457'],
        ['Beige', '#D3B88D'],
        ['Cremeweiß', '#E8DDC8'],
      ],
      turmfalke: [
        ['Rotbraun', '#A9714C'],
        ['Braun', '#70503B'],
        ['Beige', '#D2B48A'],
        ['Dunkelbraun', '#48392E'],
      ],
      steinadler: [
        ['Dunkelbraun', '#433226'],
        ['Goldbraun', '#A17A44'],
        ['Weiß', '#E8E5DA'],
        ['Schwarzbraun', '#292622'],
      ],
      seeadler: [
        ['Dunkelbraun', '#4D3C2D'],
        ['Braun', '#806548'],
        ['Beige', '#C1AC87'],
        ['Schwarzbraun', '#312B25'],
      ],
      fischadler: [
        ['Braun', '#705742'],
        ['Hellbeige', '#DAC8A7'],
        ['Weiß', '#E8E6DA'],
        ['Dunkelbraun', '#3F352C'],
      ],
    };
    return juvenile[bird.id] || bird.colors;
  }
  if (plumage === 'female' && bird.id === 'turmfalke')
    return [
      ['Rotbraun', '#AA704A'],
      ['Braun', '#806047'],
      ['Beige', '#D7BE99'],
      ['Dunkelbraun', '#4A382A'],
    ];
  return bird.colors;
}
export type ColorSwatch = [string, string];
export type BodyColors = {
  eyes: ColorSwatch[];
  legs: ColorSwatch[];
  note?: string;
};
const yellow: ColorSwatch[] = [['Gelb', '#D6B44B']];
const darkEyes: ColorSwatch[] = [['Dunkelbraun', '#382B24']];
const adultBodyColors: Record<string, BodyColors> = {
  rotschwanzbussard: {
    eyes: [['Braun bis Rotbraun', '#795034']],
    legs: yellow,
  },
  habicht: {
    eyes: [
      ['Orange', '#C98337'],
      ['Rot', '#A84835'],
    ],
    legs: yellow,
  },
  maeusebussard: { eyes: darkEyes, legs: yellow },
  wanderfalke: { eyes: [['Fast schwarz', '#282521']], legs: yellow },
  turmfalke: { eyes: darkEyes, legs: yellow },
  steinadler: {
    eyes: [['Haselbraun', '#8C693D']],
    legs: yellow,
    note: 'Die Läufe sind braun befiedert; die freien Zehen sind gelb.',
  },
  seeadler: { eyes: [['Hellgelb', '#DCD28B']], legs: yellow },
  fischadler: { eyes: [['Gelb', '#DABD4D']], legs: [['Blaugrau', '#AFBDC3']] },
};
const youngBodyColors: Record<string, BodyColors> = {
  rotschwanzbussard: { eyes: [['Blassgelb', '#D7CC91']], legs: yellow },
  habicht: { eyes: [['Hellgelb', '#DECE7E']], legs: yellow },
  maeusebussard: { eyes: [['Graubraun', '#A2987A']], legs: yellow },
  wanderfalke: {
    eyes: [['Fast schwarz', '#282521']],
    legs: [['Blaugrau bis grünlich', '#99AEAB']],
  },
  turmfalke: { eyes: darkEyes, legs: yellow },
  steinadler: {
    eyes: darkEyes,
    legs: yellow,
    note: 'Auch im Jugendkleid sind die Läufe bis zu den gelben Zehen befiedert.',
  },
  seeadler: { eyes: darkEyes, legs: [['Mattgelb', '#C6B364']] },
  fischadler: {
    eyes: [['Orangegelb', '#D69844']],
    legs: [['Blaugrau', '#AFBDC3']],
  },
};
export function bodyColorsFor(id: string, plumage: Plumage): BodyColors {
  return (
    additionalBirds.find((b) => b.id === id)?.bodyColors[plumage] ??
    (plumage === 'juvenile' ? youngBodyColors : adultBodyColors)[id]
  );
}
