export const landscapes: Record<
  string,
  { label: string; description: string }
> = {
  regenwald: {
    label: 'Regenwälder',
    description: 'Artenreicher tropischer Regenwald mit mächtigen Baumkronen',
  },
  inseln: {
    label: 'Südliche Inselküsten',
    description: 'Baumlose felsige Inselküste mit Tussockgras und Meer',
  },
  park: {
    label: 'Parks & Stadtwälder',
    description: 'Große alte Bäume und dichtes Grün in einem städtischen Park',
  },
  feldflur: {
    label: 'Wiesen & Felder',
    description: 'Offene Wiesen, Felder und strukturreiche Heckenlandschaft',
  },
  wald: {
    label: 'Wälder',
    description: 'Alter Laubmischwald mit lichten Stellen und Waldrändern',
  },
  gebirge: {
    label: 'Gebirge',
    description: 'Offene Berghänge mit Felsen und alpinen Matten',
  },
  kueste: {
    label: 'Küsten',
    description: 'Felsige Küste mit offenem Meer und bewaldeten Hängen',
  },
  gewaesser: {
    label: 'Seen & Flüsse',
    description: 'Großer See mit Schilfufer und angrenzendem Wald',
  },
  stadt: {
    label: 'Städte',
    description: 'Hohe Türme und Dächer in einer europäischen Stadt',
  },
  savanne: {
    label: 'Savannen',
    description: 'Offenes Grasland mit einzelnen Akazien',
  },
  steppe: {
    label: 'Steppen',
    description: 'Weite trockene Graslandschaft mit niedrigen Hügeln',
  },
  tundra: {
    label: 'Tundra',
    description: 'Baumlose arktische Landschaft mit niedriger Vegetation',
  },
  felsen: {
    label: 'Felslandschaften',
    description: 'Felswände und Vorsprünge über offenem Buschland',
  },
};
export const speciesLandscapes: Record<string, string[]> = {
  rotschwanzbussard: ['feldflur', 'wald'],
  habicht: ['wald', 'park'],
  maeusebussard: ['feldflur', 'wald'],
  wanderfalke: ['felsen', 'kueste', 'stadt'],
  turmfalke: ['feldflur', 'stadt'],
  steinadler: ['gebirge', 'steppe'],
  seeadler: ['gewaesser', 'kueste'],
  fischadler: ['gewaesser', 'kueste'],
  weisskopfseeadler: ['gewaesser', 'kueste'],
  riesenseeadler: ['kueste', 'gewaesser'],
  gaukler: ['savanne'],
  aguja: ['gebirge', 'steppe'],
  uhu: ['felsen', 'wald'],
  gerfalke: ['tundra'],
  sakerfalke: ['steppe', 'feldflur'],
  lannerfalke: ['felsen', 'steppe'],
  baumfalke: ['feldflur', 'wald'],
  virginiauhu: ['wald', 'feldflur'],
  weissstorch: ['feldflur', 'gewaesser'],
  sperber: ['wald', 'park'],
  harpyie: ['regenwald'],
  kampfadler: ['savanne'],
  falklandkarakara: ['inseln'],
  schopfkarakara: ['savanne', 'steppe'],
  koenigsbussard: ['steppe', 'feldflur'],
  schwarzmilan: ['gewaesser', 'feldflur'],
  rotmilan: ['feldflur', 'wald'],
};
