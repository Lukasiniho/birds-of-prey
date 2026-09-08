import type { FoodId } from './food-catalog.ts';
export type PreyExample = { key: string; note?: string };
export type Diet = {
  summary: string;
  primary: FoodId[];
  occasional: FoodId[];
  carrion: boolean;
  sources: string[];
  examples: PreyExample[];
  occasionalExamples: PreyExample[];
};
export const preyCatalog: Record<
  string,
  { name: string; tile?: number; image?: string; icon?: 'bone' | 'bug' }
> = {
  aas: { name: 'Aas', icon: 'bone' },
  knochen: { name: 'Knochen', icon: 'bone' },
  wespenbrut: { name: 'Wespen- & Hummelbrut', icon: 'bug' },
  wuehlmaus: {
    name: 'Wühlmäuse',
    tile: 0,
  },
  kaninchen: {
    name: 'Kaninchen',
    tile: 1,
  },
  taube: {
    name: 'Tauben',
    tile: 2,
  },
  fisch: {
    name: 'Fische',
    tile: 3,
  },
  ente: {
    name: 'Wasservögel',
    tile: 4,
  },
  heuschrecke: {
    name: 'Heuschrecken',
    tile: 5,
  },
  eichhoernchen: {
    name: 'Eichhörnchen',
    tile: 6,
  },
  murmeltier: {
    name: 'Murmeltiere',
    tile: 7,
  },
  singvogel: {
    name: 'Singvögel',
    tile: 8,
  },
  hase: {
    name: 'Hasen',
    image: '/prey-hase.png?v=ff44988e0c',
  },
  fuchs: {
    name: 'Füchse',
    image: '/prey-fuchs.png?v=aad0834c5c',
  },
  rehkitz: {
    name: 'Rehkitze',
    image: '/prey-rehkitz.png?v=5c15b4f0d3',
  },
  schneehuhn: {
    name: 'Schneehühner',
    image: '/prey-schneehuhn.png?v=48f35d86bb',
  },
  ziesel: {
    name: 'Ziesel',
    image: '/prey-ziesel.png?v=d6eb84559b',
  },
  libelle: {
    name: 'Libellen',
    image: '/prey-libelle.png?v=0e328f9e75',
  },
  schwalbe: {
    name: 'Schwalben',
    image: '/prey-schwalbe.png?v=f843d70ba2',
  },
  frosch: {
    name: 'Frösche',
    image: '/prey-frosch.png?v=104fe82fcf',
  },
  regenwurm: {
    name: 'Regenwürmer',
    image: '/prey-regenwurm.png?v=93dd7e4398',
  },
  echse: {
    name: 'Eidechsen',
    image: '/prey-echse.png?v=1a9b7f0c59',
  },
  faultier: {
    name: 'Faultiere',
    image: '/prey-faultier.png?v=7f140823dd',
  },
  affe: {
    name: 'Affen',
    image: '/prey-affe.png?v=ab6a8d7141',
  },
  perlhuhn: {
    name: 'Perlhühner',
    image: '/prey-perlhuhn.png?v=7f3a508734',
  },
  seevogelkueken: {
    name: 'Seevogel-Nestlinge',
    image: '/prey-seevogelkueken.png?v=8712193940',
  },
  stinktier: {
    name: 'Stinktiere',
    image: '/prey-stinktier.png?v=080e00d7a7',
  },
  kaefer: {
    name: 'Käfer',
    image: '/prey-kaefer.png?v=230827f98b',
  },
  ratte: {
    name: 'Ratten',
    image: '/prey-ratte.png?v=67533497ca',
  },
  gamskitz: {
    name: 'Gamskitze',
    image: '/prey-gamskitz.png?v=8febc96a09',
  },
  ei: {
    name: 'Seevogeleier',
    image: '/prey-ei.png?v=fd6327f41f',
  },
  krebs: {
    name: 'Krebse',
    image: '/prey-krebs.png?v=2a85fe60a9',
  },
  schlange: {
    name: 'Schlangen',
    image: '/prey-schlange.png?v=a66a837d9f',
  },
  maus: {
    name: 'Mäuse',
    image: '/prey-maus.png?v=3a4bee834a',
  },
};
export const diets: Record<string, Diet> = {
  wuestenbussard: {
    summary:
      'Kaninchen, Hasen, Ziesel und weitere Nagetiere bilden den Schwerpunkt. Größere Beutetiere lassen sich durch gemeinsames Jagen überwältigen; Vögel und Reptilien ergänzen die Nahrung.',
    primary: ['kaninchen', 'hasen', 'nagetiere'],
    occasional: ['vogel', 'reptilien'],
    carrion: false,
    sources: ['https://www.allaboutbirds.org/guide/Harriss_Hawk/lifehistory'],
    examples: [{ key: 'kaninchen' }, { key: 'hase' }, { key: 'ziesel' }],
    occasionalExamples: [{ key: 'taube' }, { key: 'echse' }],
  },
  kaiseradler: {
    summary:
      'Kleine bis mittelgroße Säugetiere der offenen Landschaft bilden die Hauptnahrung, vor allem Ziesel, Hamster, Hasen und Igel. Dazu kommen Vögel bis Fasanengröße; Aas wird besonders im Winter angenommen.',
    primary: ['ziesel', 'hamster', 'hasen', 'igel'],
    occasional: ['fasane', 'krahen', 'tauben', 'reptilien'],
    carrion: true,
    sources: [
      'https://peregrinefund.org/explore-raptors-species/eagles/eastern-imperial-eagle',
    ],
    examples: [{ key: 'ziesel' }, { key: 'hase' }],
    occasionalExamples: [{ key: 'taube' }],
  },
  steppenadler: {
    summary:
      'In den Brutgebieten lebt er vor allem von Zieseln, Rennmäusen und Pfeifhasen. Auf dem Zug und im Winterquartier nimmt er in großer Zahl Heuschrecken und Termiten sowie Aas; gelegentlich schlägt er Vögel.',
    primary: ['ziesel', 'rennmause', 'pfeifhasen'],
    occasional: ['heuschrecken', 'termiten', 'vogel', 'reptilien'],
    carrion: true,
    sources: [
      'https://peregrinefund.org/explore-raptors-species/eagles/steppe-eagle',
    ],
    examples: [{ key: 'ziesel' }, { key: 'maus' }],
    occasionalExamples: [{ key: 'heuschrecke' }],
  },
  sekretaer: {
    summary:
      'Der Sekretär frisst, was er beim Durchstreifen der Savanne aufscheucht: vor allem Heuschrecken und andere Großinsekten, Mäuse und Eidechsen. Schlangen sind spektakulär, machen aber nur einen kleinen Teil der Nahrung aus. Bodenbrüter und ihre Eier nimmt er ebenfalls.',
    primary: ['heuschrecken', 'mause', 'eidechsen', 'schlangen'],
    occasional: ['kafer', 'jungvogel', 'eier', 'junghasen'],
    carrion: false,
    sources: ['https://animals.sandiegozoo.org/animals/secretary-bird'],
    examples: [{ key: 'schlange' }, { key: 'heuschrecke' }, { key: 'maus' }],
    occasionalExamples: [{ key: 'echse' }, { key: 'ei' }],
  },
  andenkondor: {
    summary:
      'Der Andenkondor ist ein reiner Aasfresser. In den Anden nutzt er Kadaver von Guanakos, Lamas, Rindern und Schafen, an der Pazifikküste auch tote Seelöwen und Wale. Er tötet keine Beute, plündert aber gelegentlich Kolonien von Seevögeln.',
    primary: [
      'aas-von-guanakos-und-lamas',
      'aas-von-rindern-und-schafen',
      'angespulte-meeressauger',
    ],
    occasional: ['seevogeleier', 'seevogelkuken'],
    carrion: true,
    sources: ['https://animals.sandiegozoo.org/animals/andean-condor'],
    examples: [{ key: 'aas' }],
    occasionalExamples: [{ key: 'ei' }],
  },
  wespenbussard: {
    summary:
      'Die Brut von Wespen und Hummeln ist seine Hauptnahrung: Er gräbt die Nester aus und verzehrt Larven und Puppen aus den Waben. Bei schlechtem Wetter weicht er auf Frösche, Nestlinge, Kleinsäuger und Käfer aus.',
    primary: ['wespenlarven-und-puppen', 'hummelbrut'],
    occasional: ['frosche', 'nestlinge', 'kleinsauger', 'kafer'],
    carrion: false,
    sources: [
      'https://www.nabu.de/tiere-und-pflanzen/voegel/portraets/wespenbussard/',
    ],
    examples: [{ key: 'wespenbrut' }],
    occasionalExamples: [{ key: 'frosch' }, { key: 'maus' }],
  },
  bartgeier: {
    summary:
      'Knochen machen den größten Teil seiner Nahrung aus: Von Kadavern verendeter Gämsen, Steinböcke und Schafe nimmt er die Knochen samt Mark und schluckt sie bis handlang ganz hinunter. Fleischreste und Schildkröten ergänzen den Speiseplan.',
    primary: ['knochen-von-gamsen-und-steinbocken', 'knochen-von-schafen'],
    occasional: ['aas', 'schildkroten'],
    carrion: true,
    sources: [
      'https://www.lbv.de/ratgeber/naturwissen/artenportraits/detail/bartgeier/',
    ],
    examples: [{ key: 'knochen' }],
    occasionalExamples: [],
  },
  kronenadler: {
    summary:
      'Säugetiere aus dem Wald, besonders Affen und kleine Antilopen, machen den Großteil der Nahrung aus. Welche Beute überwiegt, hängt vom Gebiet ab. Große Beute wird am Boden zerlegt und portionsweise zum Horst getragen.',
    primary: ['affen', 'kleine-antilopen'],
    occasional: ['mangusten', 'warane', 'schlangen'],
    carrion: false,
    sources: ['https://animals.sandiegozoo.org/animals/crowned-eagle'],
    examples: [{ key: 'affe' }],
    occasionalExamples: [{ key: 'schlange' }],
  },
  weisskopfseeadler: {
    summary:
      'Fische bilden meist den Schwerpunkt seiner Nahrung. Je nach Ort und Jahreszeit ergänzt er sie durch Wasservögel, kleinere Säugetiere und Aas.',
    primary: ['fische'],
    occasional: [
      'wasservogel',
      'kaninchen',
      'bisamratten',
      'reptilien',
      'amphibien',
      'krebse',
    ],
    carrion: true,
    sources: ['https://www.allaboutbirds.org/guide/Bald_Eagle/lifehistory'],
    examples: [
      {
        key: 'fisch',
      },
    ],
    occasionalExamples: [
      {
        key: 'ente',
      },
      {
        key: 'kaninchen',
      },
    ],
  },
  riesenseeadler: {
    summary:
      'Er frisst überwiegend Fische, besonders pazifische Lachse. Dazu kommen Wasservögel, kleinere Säugetiere und Aas; die Anteile ändern sich mit dem Angebot.',
    primary: ['fische', 'lachse'],
    occasional: ['wasservogel', 'junge-hasen', 'krebse', 'weichtiere'],
    carrion: true,
    sources: [
      'https://lazoo.org/explore-your-zoo/our-animals/birds/stellers-sea-eagle/',
      'https://animals.sandiegozoo.org/animals/stellers-sea-eagle',
    ],
    examples: [
      {
        key: 'fisch',
      },
    ],
    occasionalExamples: [
      {
        key: 'ente',
      },
    ],
  },
  gaukler: {
    summary:
      'Der Gaukler sucht sowohl lebende Wirbeltiere als auch Aas. Zu seiner Beute gehören kleine Säugetiere, Vögel und besonders Schlangen.',
    primary: ['kleine-saugetiere', 'schlangen', 'vogel'],
    occasional: ['eidechsen', 'termiten', 'fische'],
    carrion: true,
    sources: [
      'https://peregrinefund.org/explore-raptors-species/eagles/bateleur-eagle',
    ],
    examples: [
      {
        key: 'maus',
      },
      {
        key: 'schlange',
      },
      {
        key: 'taube',
      },
    ],
    occasionalExamples: [],
  },
  aguja: {
    summary:
      'Säugetiere wie Nagetiere und Kaninchen bilden häufig die Hauptbeute. Vögel, Reptilien, Insekten und gelegentlich Aas erweitern den Speiseplan.',
    primary: ['nagetiere', 'kaninchen', 'hasen'],
    occasional: ['vogel', 'reptilien', 'insekten'],
    carrion: true,
    sources: [
      'https://sie.car.gov.co/bitstreams/66e0aec7-473d-4b8c-a8e9-cc779633f630/download',
      'https://www.fcv.unl.edu.ar/aves/categorias/accipitridae/aguila_mora/',
    ],
    examples: [
      {
        key: 'maus',
      },
      {
        key: 'kaninchen',
      },
      {
        key: 'hase',
      },
    ],
    occasionalExamples: [],
  },
  steinadler: {
    summary:
      'Er jagt vor allem Säugetiere wie Hasen und Murmeltiere, regional auch häufig Gamskitze. Rehkitze, Füchse und Vögel gehören ebenfalls zum Beutespektrum; im Winter ist Aas wichtig.',
    primary: [
      'hasen',
      'kaninchen',
      'murmeltiere',
      'ziesel',
      'gamskitze-regional',
    ],
    occasional: [
      'rehkitze',
      'fuchse',
      'raufusshuhner',
      'mause',
      'schlangen',
      'eidechsen',
    ],
    carrion: true,
    sources: [
      'https://www.lbv.de/ratgeber/naturwissen/artenportraits/detail/steinadler/',
      'https://www.audubon.org/field-guide/bird/golden-eagle',
      'https://praxistipps.lbv.de/fileadmin/_migrated/content_uploads/Greifvoegel.pdf',
    ],
    examples: [
      {
        key: 'hase',
      },
      {
        key: 'murmeltier',
      },
      {
        key: 'gamskitz',
        note: 'regional',
      },
    ],
    occasionalExamples: [
      {
        key: 'rehkitz',
      },
      {
        key: 'fuchs',
      },
    ],
  },
  rotschwanzbussard: {
    summary:
      'Kleine bis mittelgroße Säugetiere stellen den größten Teil seiner Nahrung. Er schlägt auch Vögel und Schlangen und nimmt gelegentlich Aas auf.',
    primary: [
      'wuhlmause',
      'mause',
      'ratten',
      'kaninchen',
      'hasen',
      'erdhornchen',
    ],
    occasional: ['vogel', 'schlangen', 'insekten'],
    carrion: true,
    sources: [
      'https://www.allaboutbirds.org/guide/Red-tailed_Hawk/lifehistory',
      'https://www.allaboutbirds.org/news/bird-cams-faq-red-tailed-hawk-nest/',
    ],
    examples: [
      {
        key: 'wuehlmaus',
      },
      {
        key: 'kaninchen',
      },
      {
        key: 'ziesel',
      },
      {
        key: 'hase',
      },
    ],
    occasionalExamples: [],
  },
  harpyie: {
    summary:
      'Faultiere und Affen bilden vielerorts den Schwerpunkt ihrer Nahrung. Regional sind auch Opossums wichtig; hinzu kommen weitere Säugetiere, Vögel und Reptilien.',
    primary: ['faultiere', 'affen', 'opossums-regional'],
    occasional: [
      'baumstachler',
      'nasenbaren',
      'agutis',
      'gurteltiere',
      'papageien',
      'leguane',
    ],
    carrion: false,
    sources: [
      'https://peregrinefund.org/explore-raptors-species/eagles/harpy-eagle',
      'https://animals.sandiegozoo.org/animals/harpy-eagle',
      'https://www.researchgate.net/publication/367989459_Ficha_Aguila_Harpia_Harpia_harpyja',
    ],
    examples: [
      {
        key: 'faultier',
      },
      {
        key: 'affe',
      },
    ],
    occasionalExamples: [],
  },
  kampfadler: {
    summary:
      'Er jagt mittelgroße Säugetiere, größere Vögel und Warane. Je nach Region und Geschlecht dominieren etwa Hühnervögel oder kleine Antilopen; gelegentlich nutzt er Aas.',
    primary: [
      'perlhuhner',
      'frankoline',
      'hasen',
      'schliefer',
      'kleine-antilopen',
      'warane',
    ],
    occasional: [
      'mangusten',
      'affen',
      'trappen',
      'hornvogel',
      'warzenschwein-frischlinge',
    ],
    carrion: true,
    sources: [
      'https://peregrinefund.org/explore-raptors-species/eagles/martial-eagle',
      'https://nsojournals.onlinelibrary.wiley.com/doi/full/10.1002/wlb3.01223',
    ],
    examples: [
      {
        key: 'perlhuhn',
      },
      {
        key: 'hase',
      },
    ],
    occasionalExamples: [],
  },
  gerfalke: {
    summary:
      'Schneehühner bilden vielerorts die wichtigste Beute des Gerfalken. Je nach Region kommen andere Vögel und kleinere Säugetiere hinzu.',
    primary: ['schneehuhner'],
    occasional: [
      'see-und-wasservogel',
      'watvogel',
      'singvogel',
      'hasen',
      'ziesel',
      'lemminge',
    ],
    carrion: false,
    sources: ['https://www.allaboutbirds.org/guide/Gyrfalcon/lifehistory'],
    examples: [
      {
        key: 'schneehuhn',
      },
    ],
    occasionalExamples: [],
  },
  sakerfalke: {
    summary:
      'Der Sakerfalke jagt vor allem kleine Säugetiere und Vögel. Ihr Anteil schwankt stark zwischen Regionen und mit dem örtlichen Beuteangebot.',
    primary: [
      'ziesel',
      'hamster',
      'wuhlmause',
      'tauben',
      'kleine-boden-und-singvogel',
    ],
    occasional: ['reptilien'],
    carrion: false,
    sources: [
      'https://sakerlife3.mme.hu/sites/default/files/vii_egsm_book_of_abstracts_prn3.pdf',
      'https://sakerlife3.mme.hu/en',
      'https://www.researchgate.net/publication/305199411_A_Kerecsensolyom-vedelmi_Munkacsoport_2014_evi_beszamoloja_Report_of_the_Saker_Falcon_Falco_cherrug_Conservation_Working_Group_-_2014',
    ],
    examples: [
      {
        key: 'ziesel',
      },
      {
        key: 'wuehlmaus',
      },
      {
        key: 'taube',
      },
      {
        key: 'singvogel',
      },
    ],
    occasionalExamples: [],
  },
  lannerfalke: {
    summary:
      'Der Lannerfalke erbeutet überwiegend kleine bis mittelgroße Vögel. Säugetiere, Reptilien, Insekten und gelegentlich Aas ergänzen seine Nahrung.',
    primary: [
      'tauben-und-turteltauben',
      'kleine-singvogel',
      'frankoline-und-andere-huhnervogel',
      'flughuhner',
    ],
    occasional: ['kleine-saugetiere', 'fledermause', 'reptilien', 'insekten'],
    carrion: true,
    sources: ['https://thebdi.org/2026/03/14/lanner-falcon-falco-biarmicus/'],
    examples: [
      {
        key: 'taube',
      },
      {
        key: 'singvogel',
      },
    ],
    occasionalExamples: [],
  },
  baumfalke: {
    summary:
      'Der Baumfalke fängt kleine Vögel und große Insekten im Flug. Besonders typisch sind Schwalben und Libellen; ihr Anteil variiert mit Ort und Jahreszeit.',
    primary: [
      'schwalben',
      'andere-kleinvogel',
      'libellen',
      'andere-grosse-fluginsekten',
    ],
    occasional: [],
    carrion: false,
    sources: [
      'https://www.rspb.org.uk/birds-and-wildlife/hobby',
      'https://bfn.bsz-bw.de/files/1924/Schrift724.pdf',
    ],
    examples: [
      {
        key: 'schwalbe',
      },
      {
        key: 'libelle',
      },
    ],
    occasionalExamples: [],
  },
  wanderfalke: {
    summary:
      'Der Wanderfalke jagt fast ausschließlich Vögel, meist im freien Luftraum. Je nach Lebensraum zählen Tauben, Singvögel, Watvögel oder Enten zur häufigen Beute.',
    primary: [
      'tauben',
      'singvogel',
      'watvogel',
      'enten-und-andere-wasservogel',
    ],
    occasional: ['fledermause'],
    carrion: false,
    sources: [
      'https://www.allaboutbirds.org/guide/Peregrine_Falcon/lifehistory',
    ],
    examples: [
      {
        key: 'taube',
      },
      {
        key: 'singvogel',
      },
      {
        key: 'ente',
      },
    ],
    occasionalExamples: [],
  },
  fischadler: {
    summary:
      'Der Fischadler ernährt sich nahezu ausschließlich von lebenden Fischen. Andere Wirbeltiere oder tote Fische sind sehr seltene Ausnahmen.',
    primary: ['susswasserfische', 'meeresfische'],
    occasional: ['tote-fische-sehr-selten', 'andere-wirbeltiere-sehr-selten'],
    carrion: true,
    sources: ['https://www.allaboutbirds.org/guide/Osprey/lifehistory'],
    examples: [
      {
        key: 'fisch',
      },
    ],
    occasionalExamples: [],
  },
  seeadler: {
    summary:
      'Fische und Wasservögel sind die wichtigste Beute des Seeadlers. Er nimmt regelmäßig Aas auf, besonders im Winter, und erbeutet seltener Säugetiere.',
    primary: ['fische', 'wasservogel'],
    occasional: ['kleine-bis-mittelgrosse-saugetiere'],
    carrion: true,
    sources: [
      'https://www.seeadlerforschung.de/biologie.html',
      'https://seeadlerforschung.de/',
      'https://www.bund-nrw.de/themen/seeadler/steckbrief/',
    ],
    examples: [
      {
        key: 'fisch',
      },
      {
        key: 'ente',
      },
    ],
    occasionalExamples: [],
  },
  falklandkarakara: {
    summary:
      'Der Falklandkarakara nutzt Seevögel, ihre Eier und Nestlinge sowie Aas. Auch Wirbellose sind wichtig, und das Nahrungsangebot verändert sich deutlich mit der Jahreszeit.',
    primary: [
      'seevogel-und-ihre-nestlinge',
      'seevogeleier',
      'wirbellose-der-kuste',
    ],
    occasional: ['landinsekten', 'nahrungsreste-an-farmen'],
    carrion: true,
    sources: [
      'https://www.hawkmountain.org/download/?dl=1&id=5075',
      'https://www.hawkmountain.org/data/StreamSecureFile.ashx?id=2961',
    ],
    examples: [
      {
        key: 'seevogelkueken',
      },
      {
        key: 'ei',
      },
      {
        key: 'krebs',
      },
    ],
    occasionalExamples: [],
  },
  schopfkarakara: {
    summary:
      'Der Schopfkarakara ist ein vielseitiger Nahrungssucher, bei dem Aas häufig eine große Rolle spielt. Er erbeutet außerdem Insekten und verschiedene kleine Wirbeltiere.',
    primary: ['insekten', 'kleine-wirbeltiere'],
    occasional: [
      'fische',
      'reptilien',
      'amphibien',
      'vogel',
      'kleine-saugetiere',
      'eier',
    ],
    carrion: true,
    sources: [
      'https://www.allaboutbirds.org/guide/Crested_Caracara/lifehistory',
    ],
    examples: [
      {
        key: 'kaefer',
      },
      {
        key: 'maus',
      },
      {
        key: 'echse',
      },
    ],
    occasionalExamples: [],
  },
  koenigsbussard: {
    summary:
      'Der Königsbussard lebt hauptsächlich von kleinen Säugetieren der offenen Grasländer. Im Westen sind Hasen und Kaninchen besonders wichtig, östlich der Rocky Mountains häufig Ziesel und Präriehunde.',
    primary: ['hasen-und-kaninchen', 'ziesel', 'prariehunde', 'taschenratten'],
    occasional: ['vogel', 'reptilien', 'amphibien', 'insekten'],
    carrion: false,
    sources: [
      'https://www.allaboutbirds.org/guide/Ferruginous_Hawk/lifehistory',
      'https://hawkwatch.org/raptor-id/raptor-id-fact-sheets/ferruginous-hawk/',
    ],
    examples: [
      {
        key: 'hase',
      },
      {
        key: 'kaninchen',
      },
      {
        key: 'ziesel',
      },
    ],
    occasionalExamples: [],
  },
  uhu: {
    summary:
      'Der Uhu erbeutet vor allem Säugetiere von Mäusen bis zu Kaninchen und Hasen sowie Vögel. Gelegentlich kommen andere kleine Wirbeltiere hinzu.',
    primary: ['mause-und-ratten', 'kaninchen-und-hasen', 'vogel'],
    occasional: ['amphibien', 'reptilien', 'fische'],
    carrion: false,
    sources: [
      'https://www.lbv.de/ratgeber/naturwissen/artenportraits/detail/uhu/',
    ],
    examples: [
      {
        key: 'ratte',
      },
      {
        key: 'kaninchen',
      },
      {
        key: 'hase',
      },
      {
        key: 'singvogel',
      },
    ],
    occasionalExamples: [],
  },
  schwarzmilan: {
    summary:
      'Der Schwarzmilan nutzt häufig tote oder geschwächte Fische und andere leicht erreichbare Nahrung. Kleine Säugetiere und Vögel ergänzen seine regional sehr unterschiedliche Kost.',
    primary: ['fische', 'kleine-saugetiere', 'vogel'],
    occasional: ['grosse-insekten', 'amphibien', 'reptilien', 'regenwurmer'],
    carrion: true,
    sources: [
      'https://ffh-arten.naturschutzinformationen.nrw.de/ffh-arten/de/arten/vogelarten/kurzbeschreibung/103015',
      'https://www.natursport.info/tierarten/voegel/greifvoegel-falken/schwarzmilan/',
    ],
    examples: [
      {
        key: 'fisch',
      },
      {
        key: 'maus',
      },
      {
        key: 'singvogel',
      },
    ],
    occasionalExamples: [],
  },
  rotmilan: {
    summary:
      'Der Rotmilan frisst überwiegend kleine Säugetiere, Vögel und Aas. Welche Nahrung überwiegt, hängt vom örtlichen Angebot und der Jahreszeit ab.',
    primary: ['wuhlmause-und-andere-kleine-saugetiere', 'vogel'],
    occasional: ['grosse-insekten', 'regenwurmer'],
    carrion: true,
    sources: [
      'https://www.nabu.de/tiere-und-pflanzen/voegel/portraets/rotmilan/',
      'https://www.biosphaerenreservat-rhoen.de/fileadmin/media/Downloads_-_PDF/Schutzkonzept_Rotmilan_in_der_Rhoen_2016.pdf',
    ],
    examples: [
      {
        key: 'wuehlmaus',
      },
      {
        key: 'singvogel',
      },
    ],
    occasionalExamples: [],
  },
  habicht: {
    summary:
      'Der Habicht jagt vor allem Vögel, regional besonders Tauben und Rabenvögel, sowie kleine Säugetiere. Bei knapper Nahrung nimmt er gelegentlich auch Aas.',
    primary: ['tauben', 'rabenvogel', 'andere-vogel', 'kleine-saugetiere'],
    occasional: ['aas-bei-nahrungsknappheit'],
    carrion: true,
    sources: [
      'https://www.lbv.de/ratgeber/naturwissen/artenportraits/detail/habicht/',
      'https://www.nabu.de/tiere-und-pflanzen/voegel/portraets/habicht/',
    ],
    examples: [
      {
        key: 'taube',
      },
      {
        key: 'singvogel',
      },
      {
        key: 'kaninchen',
      },
      {
        key: 'eichhoernchen',
      },
    ],
    occasionalExamples: [],
  },
  maeusebussard: {
    summary:
      'Die wichtigste Beute des Mäusebussards sind kleine Säugetiere, besonders Wühlmäuse. Er nutzt auch andere kleine Tiere und frisst vor allem im Winter Aas.',
    primary: ['wuhlmause', 'andere-kleine-saugetiere'],
    occasional: [
      'junge-kaninchen',
      'amphibien',
      'kleine-reptilien',
      'kleine-vogel',
    ],
    carrion: true,
    sources: [
      'https://www.nabu.de/tiere-und-pflanzen/voegel/portraets/maeusebussard/',
    ],
    examples: [
      {
        key: 'wuehlmaus',
      },
      {
        key: 'maus',
      },
    ],
    occasionalExamples: [
      {
        key: 'frosch',
      },
    ],
  },
  turmfalke: {
    summary:
      'Der Turmfalke lebt hierzulande vor allem von kleinen Nagetieren wie Wühlmäusen. Große Insekten, Eidechsen und gelegentlich kleine Vögel oder Regenwürmer ergänzen die Nahrung.',
    primary: ['wuhlmause', 'andere-kleine-nagetiere'],
    occasional: ['grosse-insekten', 'eidechsen', 'kleine-vogel', 'regenwurmer'],
    carrion: false,
    sources: [
      'https://www.nabu.de/tiere-und-pflanzen/voegel/portraets/turmfalke/',
      'https://fuerstenfeldbruck.lbv.de/naturschutz/artenschutz/turmfalken-steckbrief/',
    ],
    examples: [
      {
        key: 'wuehlmaus',
      },
      {
        key: 'maus',
      },
    ],
    occasionalExamples: [
      {
        key: 'heuschrecke',
      },
      {
        key: 'echse',
      },
    ],
  },
  virginiauhu: {
    summary:
      'Der Virginia-Uhu jagt vor allem Säugetiere wie Kaninchen, Hasen und Mäuse sowie Vögel. Andere Tiergruppen und gelegentlich Aas erweitern sein großes Nahrungsspektrum.',
    primary: [
      'kaninchen-und-hasen',
      'mause-und-andere-kleine-saugetiere',
      'vogel',
    ],
    occasional: [
      'reptilien',
      'amphibien',
      'fische',
      'insekten-und-andere-wirbellose',
    ],
    carrion: true,
    sources: [
      'https://www.allaboutbirds.org/guide/Great_Horned_Owl/lifehistory',
    ],
    examples: [
      {
        key: 'kaninchen',
      },
      {
        key: 'hase',
      },
      {
        key: 'maus',
      },
      {
        key: 'singvogel',
      },
    ],
    occasionalExamples: [],
  },
  weissstorch: {
    summary:
      'Der Weißstorch sammelt kleine Säugetiere, Amphibien, große Insekten und Regenwürmer in Wiesen und flachem Wasser. Daneben nimmt er Reptilien, Fische, gelegentlich Jungvögel und Aas.',
    primary: [
      'mause-und-wuhlmause',
      'amphibien',
      'grosse-insekten',
      'regenwurmer',
    ],
    occasional: ['reptilien', 'fische', 'jungvogel'],
    carrion: true,
    sources: [
      'https://www.nabu.de/tiere-und-pflanzen/voegel/portraets/weissstorch/',
      'https://www.nabuzentrum-leiferde.de/tiere-im-zentrum/weissstorch/',
    ],
    examples: [
      {
        key: 'wuehlmaus',
      },
      {
        key: 'frosch',
      },
      {
        key: 'heuschrecke',
      },
      {
        key: 'regenwurm',
      },
    ],
    occasionalExamples: [],
  },
  sperber: {
    summary:
      'Der Sperber ist auf kleine Vögel spezialisiert. Kleine Nagetiere spielen nur ausnahmsweise eine Rolle.',
    primary: ['kleine-singvogel'],
    occasional: ['kleine-nagetiere'],
    carrion: false,
    sources: [
      'https://www.nabu.de/tiere-und-pflanzen/voegel/portraets/sperber/',
      'https://www.bto.org/learn/about-birds/birdfacts/sparrowhawk',
    ],
    examples: [
      {
        key: 'singvogel',
      },
    ],
    occasionalExamples: [],
  },
};
