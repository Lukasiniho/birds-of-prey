/** Compact species facts. Source scope and methodology: docs/species-facts.md. */
export const factsReviewedAt = '2026-09-09';
export const conservationLabels = {
  LC: 'Nicht gefährdet',
  NT: 'Potenziell gefährdet',
  VU: 'Gefährdet',
  EN: 'Stark gefährdet',
} as const;
export type SpeciesFact = { value: string; sources: string[]; note?: string };
export type SpeciesFactsData = {
  lifespan: SpeciesFact & { context: string };
  clutch: SpeciesFact;
  conservation: { code: keyof typeof conservationLabels; sources: string[] };
  activity: SpeciesFact;
  movement: SpeciesFact;
};
export const speciesFacts: Record<string, SpeciesFactsData> = {
  rotschwanzbussard: {
    lifespan: {
      value: 'über 30 Jahre',
      context: 'Höchstalter · Wildbahn',
      sources: ['https://www.allaboutbirds.org/guide/Red-tailed_Hawk/overview'],
    },
    clutch: {
      value: '1–5 Eier',
      sources: [
        'https://www.allaboutbirds.org/guide/Red-tailed_Hawk/lifehistory',
      ],
    },
    conservation: {
      code: 'LC',
      sources: [
        'https://datazone.birdlife.org/species/factsheet/red-tailed-hawk-buteo-jamaicensis',
      ],
    },
    activity: {
      value: 'Tagaktiv',
      sources: ['https://animaldiversity.org/accounts/Buteo_jamaicensis/'],
    },
    movement: {
      value: 'Teilzieher',
      note: 'Je nach Population bleiben Vögel im Brutgebiet oder ziehen in wärmere Regionen. Jungvögel können weiter wandern.',
      sources: ['https://animaldiversity.org/accounts/Buteo_jamaicensis/'],
    },
  },
  habicht: {
    lifespan: {
      value: 'ca. 7 Jahre',
      context: 'Ab Brutreife · Wildbahn',
      sources: ['https://www.bto.org/learn/about-birds/birdfacts/goshawk'],
    },
    clutch: {
      value: '3–4 Eier',
      sources: ['https://www.bto.org/learn/about-birds/birdfacts/goshawk'],
    },
    conservation: {
      code: 'LC',
      sources: [
        'https://datazone.birdlife.org/species/factsheet/eurasian-goshawk-astur-gentilis',
      ],
    },
    activity: {
      value: 'Tagaktiv',
      sources: ['https://www.bto.org/learn/about-birds/birdfacts/goshawk'],
    },
    movement: {
      value: 'Überwiegend Standvogel',
      note: 'Kein regelmäßiger saisonaler Fernzug; Jungvögel können bei der Reviersuche größere Entfernungen zurücklegen.',
      sources: ['https://www.bto.org/learn/about-birds/birdfacts/goshawk'],
    },
  },
  maeusebussard: {
    lifespan: {
      value: 'ca. 12 Jahre',
      context: 'Ab Brutreife · Wildbahn',
      sources: ['https://www.bto.org/learn/about-birds/birdfacts/buzzard'],
    },
    clutch: {
      value: '2–3 Eier',
      sources: ['https://www.bto.org/learn/about-birds/birdfacts/buzzard'],
    },
    conservation: {
      code: 'LC',
      sources: [
        'https://datazone.birdlife.org/species/factsheet/common-buzzard-buteo-buteo',
      ],
    },
    activity: {
      value: 'Tagaktiv',
      sources: ['https://www.bto.org/learn/about-birds/birdfacts/buzzard'],
    },
    movement: {
      value: 'Teilzieher',
      note: 'Je nach Population bleiben Vögel im Brutgebiet oder ziehen in wärmere Regionen. Jungvögel können weiter wandern.',
      sources: ['https://www.bto.org/learn/about-birds/birdfacts/buzzard'],
    },
  },
  wanderfalke: {
    lifespan: {
      value: 'ca. 7 Jahre',
      context: 'Ab Brutreife · Wildbahn',
      sources: ['https://www.bto.org/learn/about-birds/birdfacts/peregrine'],
    },
    clutch: {
      value: '3–4 Eier',
      sources: ['https://www.bto.org/learn/about-birds/birdfacts/peregrine'],
    },
    conservation: {
      code: 'LC',
      sources: [
        'https://datazone.birdlife.org/species/factsheet/peregrine-falcon-falco-peregrinus',
      ],
    },
    activity: {
      value: 'Tagaktiv',
      sources: ['https://animaldiversity.org/accounts/Falco_peregrinus/'],
    },
    movement: {
      value: 'Teilzieher',
      note: 'Je nach Population bleiben Vögel im Brutgebiet oder ziehen in wärmere Regionen. Jungvögel können weiter wandern.',
      sources: ['https://animaldiversity.org/accounts/Falco_peregrinus/'],
    },
  },
  turmfalke: {
    lifespan: {
      value: 'ca. 4 Jahre',
      context: 'Ab Brutreife · Wildbahn',
      sources: ['https://www.bto.org/learn/about-birds/birdfacts/kestrel'],
    },
    clutch: {
      value: '4–5 Eier',
      sources: ['https://www.bto.org/learn/about-birds/birdfacts/kestrel'],
    },
    conservation: {
      code: 'LC',
      sources: [
        'https://datazone.birdlife.org/species/factsheet/common-kestrel-falco-tinnunculus',
      ],
    },
    activity: {
      value: 'Tagaktiv',
      sources: ['https://animaldiversity.org/accounts/Falco_tinnunculus/'],
    },
    movement: {
      value: 'Teilzieher',
      note: 'Je nach Population bleiben Vögel im Brutgebiet oder ziehen in wärmere Regionen. Jungvögel können weiter wandern.',
      sources: ['https://animaldiversity.org/accounts/Falco_tinnunculus/'],
    },
  },
  steinadler: {
    lifespan: {
      value: 'ca. 23 Jahre',
      context: 'Ab Brutreife · Wildbahn',
      sources: ['https://www.bto.org/learn/about-birds/birdfacts/golden-eagle'],
    },
    clutch: {
      value: 'Meist 2 Eier',
      sources: ['https://www.bto.org/learn/about-birds/birdfacts/golden-eagle'],
    },
    conservation: {
      code: 'LC',
      sources: [
        'https://datazone.birdlife.org/species/factsheet/golden-eagle-aquila-chrysaetos',
      ],
    },
    activity: {
      value: 'Tagaktiv',
      sources: ['https://animaldiversity.org/accounts/Aquila_chrysaetos/'],
    },
    movement: {
      value: 'Überwiegend Standvogel',
      note: 'Kein regelmäßiger saisonaler Fernzug; Jungvögel können bei der Reviersuche größere Entfernungen zurücklegen.',
      sources: ['https://animaldiversity.org/accounts/Aquila_chrysaetos/'],
    },
  },
  seeadler: {
    lifespan: {
      value: 'ca. 20 Jahre',
      context: 'Ab Brutreife · Wildbahn',
      sources: [
        'https://www.bto.org/learn/about-birds/birdfacts/white-tailed-eagle',
      ],
    },
    clutch: {
      value: 'Meist 2 Eier',
      sources: [
        'https://www.bto.org/learn/about-birds/birdfacts/white-tailed-eagle',
      ],
    },
    conservation: {
      code: 'LC',
      sources: [
        'https://datazone.birdlife.org/species/factsheet/white-tailed-eagle-haliaeetus-albicilla',
      ],
    },
    activity: {
      value: 'Tagaktiv',
      sources: [
        'https://www.bto.org/learn/about-birds/birdfacts/white-tailed-eagle',
      ],
    },
    movement: {
      value: 'Teilzieher',
      note: 'Je nach Population bleiben Vögel im Brutgebiet oder ziehen in wärmere Regionen. Jungvögel können weiter wandern.',
      sources: [
        'https://www.bto.org/learn/about-birds/birdfacts/white-tailed-eagle',
      ],
    },
  },
  fischadler: {
    lifespan: {
      value: 'ca. 9 Jahre',
      context: 'Ab Brutreife · Wildbahn',
      sources: ['https://www.bto.org/learn/about-birds/birdfacts/osprey'],
    },
    clutch: {
      value: '2–3 Eier',
      sources: ['https://www.bto.org/learn/about-birds/birdfacts/osprey'],
    },
    conservation: {
      code: 'LC',
      sources: [
        'https://datazone.birdlife.org/species/factsheet/osprey-pandion-haliaetus',
      ],
    },
    activity: {
      value: 'Tagaktiv',
      sources: ['https://animaldiversity.org/accounts/Pandion_haliaetus/'],
    },
    movement: {
      value: 'Überwiegend Zugvogel',
      note: 'Nördliche Populationen ziehen weit nach Süden; in warmen Regionen gibt es Standvögel.',
      sources: ['https://animaldiversity.org/accounts/Pandion_haliaetus/'],
    },
  },
  wuestenbussard: {
    lifespan: {
      value: 'mind. 15 Jahre',
      context: 'Belegtes Alter · Wildbahn',
      sources: ['https://www.allaboutbirds.org/guide/Harriss_Hawk/overview'],
    },
    clutch: {
      value: '2–4 Eier',
      sources: ['https://www.allaboutbirds.org/guide/Harriss_Hawk/lifehistory'],
    },
    conservation: {
      code: 'LC',
      sources: [
        'https://datazone.birdlife.org/species/factsheet/harriss-hawk-parabuteo-unicinctus',
      ],
    },
    activity: {
      value: 'Tagaktiv',
      sources: ['https://animaldiversity.org/accounts/Parabuteo_unicinctus/'],
    },
    movement: {
      value: 'Standvogel',
      note: 'Kein regelmäßiger saisonaler Fernzug; Jungvögel können bei der Reviersuche größere Entfernungen zurücklegen.',
      sources: ['https://animaldiversity.org/accounts/Parabuteo_unicinctus/'],
    },
  },
  kaiseradler: {
    lifespan: {
      value: 'über 25 Jahre',
      context: 'Höchstalter · Wildbahn',
      sources: ['https://www.birdlife.at/voegel/kaiseradler/'],
    },
    clutch: {
      value: '2–3 Eier',
      sources: ['https://www.birdlife.at/voegel/kaiseradler/'],
    },
    conservation: {
      code: 'VU',
      sources: [
        'https://datazone.birdlife.org/species/factsheet/eastern-imperial-eagle-aquila-heliaca',
      ],
    },
    activity: {
      value: 'Tagaktiv',
      sources: ['https://www.birdlife.at/voegel/kaiseradler/'],
    },
    movement: {
      value: 'Teilzieher',
      note: 'In Mitteleuropa überwiegend ortstreu; östliche Populationen ziehen nach Süden. Jungvögel unternehmen weite Wanderungen.',
      sources: [
        'https://www.birdlife.at/voegel/kaiseradler/',
        'https://datazone.birdlife.org/species/factsheet/eastern-imperial-eagle-aquila-heliaca',
      ],
    },
  },
  steppenadler: {
    lifespan: {
      value: 'ca. 17 Jahre',
      context: 'Durchschnitt · Wildbahn',
      sources: ['https://badoca.com/en/animals/steppe-eagle/'],
    },
    clutch: {
      value: '1–4 Eier',
      sources: [
        'https://peregrinefund.org/explore-raptors-species/eagles/steppe-eagle',
      ],
    },
    conservation: {
      code: 'EN',
      sources: [
        'https://datazone.birdlife.org/species/factsheet/steppe-eagle-aquila-nipalensis',
      ],
    },
    activity: {
      value: 'Tagaktiv',
      sources: [
        'https://peregrinefund.org/explore-raptors-species/eagles/steppe-eagle',
      ],
    },
    movement: {
      value: 'Zugvogel',
      note: 'Das Zugverhalten kann sich regional unterscheiden.',
      sources: [
        'https://peregrinefund.org/explore-raptors-species/eagles/steppe-eagle',
      ],
    },
  },
  sekretaer: {
    lifespan: {
      value: '10–15 Jahre',
      context: 'Wildbahn',
      sources: ['https://animals.sandiegozoo.org/animals/secretary-bird'],
    },
    clutch: {
      value: '1–3 Eier',
      sources: ['https://animals.sandiegozoo.org/animals/secretary-bird'],
    },
    conservation: {
      code: 'EN',
      sources: [
        'https://datazone.birdlife.org/species/factsheet/secretarybird-sagittarius-serpentarius',
      ],
    },
    activity: {
      value: 'Tagaktiv',
      sources: [
        'https://animaldiversity.org/accounts/Sagittarius_serpentarius/',
      ],
    },
    movement: {
      value: 'Standvogel · nomadisch',
      note: 'Meist ortstreu; bei wechselndem Nahrungsangebot oder Trockenheit auch weiträumige Wanderungen.',
      sources: [
        'https://animaldiversity.org/accounts/Sagittarius_serpentarius/',
      ],
    },
  },
  andenkondor: {
    lifespan: {
      value: 'bis 50 Jahre',
      context: 'Geschätztes Höchstalter · Wildbahn',
      sources: [
        'https://beardsleyzoo.org/plan-your-visit/animals/andean-condor/',
      ],
    },
    clutch: {
      value: '1 Ei',
      sources: ['https://animals.sandiegozoo.org/animals/andean-condor'],
    },
    conservation: {
      code: 'VU',
      sources: [
        'https://datazone.birdlife.org/species/factsheet/andean-condor-vultur-gryphus',
      ],
    },
    activity: {
      value: 'Tagaktiv',
      sources: ['https://animaldiversity.org/accounts/Vultur_gryphus/'],
    },
    movement: {
      value: 'Standvogel',
      note: 'Kein regelmäßiger saisonaler Fernzug; Jungvögel können bei der Reviersuche größere Entfernungen zurücklegen.',
      sources: ['https://animaldiversity.org/accounts/Vultur_gryphus/'],
    },
  },
  wespenbussard: {
    lifespan: {
      value: 'ca. 9 Jahre',
      context: 'Ab Brutreife · Wildbahn',
      sources: ['https://www.bto.org/our-work/news/press/ring-ring-ye-birds'],
    },
    clutch: {
      value: 'Meist 2 Eier',
      sources: [
        'https://www.bto.org/learn/about-birds/birdfacts/honey-buzzard',
      ],
    },
    conservation: {
      code: 'LC',
      sources: [
        'https://datazone.birdlife.org/species/factsheet/european-honey-buzzard-pernis-apivorus',
      ],
    },
    activity: {
      value: 'Tagaktiv',
      sources: [
        'https://www.bto.org/learn/about-birds/birdfacts/honey-buzzard',
      ],
    },
    movement: {
      value: 'Langstreckenzieher',
      note: 'Überwintert südlich der Sahara.',
      sources: [
        'https://www.bto.org/learn/about-birds/birdfacts/honey-buzzard',
      ],
    },
  },
  bartgeier: {
    lifespan: {
      value: '30–40 Jahre',
      context: 'Wildbahn',
      sources: [
        'https://bartgeier.ch/sites/default/files/dokumente/Jahresberichte/JahresberichtSPB2025_2026_LR.pdf',
      ],
    },
    clutch: {
      value: '1–2 Eier',
      sources: ['https://animaldiversity.org/accounts/Gypaetus_barbatus/'],
    },
    conservation: {
      code: 'NT',
      sources: [
        'https://datazone.birdlife.org/species/factsheet/bearded-vulture-gypaetus-barbatus',
      ],
    },
    activity: {
      value: 'Tagaktiv',
      sources: ['https://animaldiversity.org/accounts/Gypaetus_barbatus/'],
    },
    movement: {
      value: 'Standvogel',
      note: 'Kein regelmäßiger saisonaler Fernzug; Jungvögel können bei der Reviersuche größere Entfernungen zurücklegen.',
      sources: ['https://animaldiversity.org/accounts/Gypaetus_barbatus/'],
    },
  },
  kronenadler: {
    lifespan: {
      value: 'bis 15 Jahre',
      context: 'Lebensspanne laut San Diego Zoo',
      sources: ['https://animals.sandiegozoo.org/animals/crowned-eagle'],
    },
    clutch: {
      value: '1–2 Eier',
      sources: ['https://animals.sandiegozoo.org/animals/crowned-eagle'],
    },
    conservation: {
      code: 'NT',
      sources: [
        'https://datazone.birdlife.org/species/factsheet/crowned-eagle-stephanoaetus-coronatus',
      ],
    },
    activity: {
      value: 'Tagaktiv',
      sources: ['https://animals.sandiegozoo.org/animals/crowned-eagle'],
    },
    movement: {
      value: 'Standvogel',
      note: 'Kein regelmäßiger saisonaler Fernzug; Jungvögel können bei der Reviersuche größere Entfernungen zurücklegen.',
      sources: ['https://animals.sandiegozoo.org/animals/crowned-eagle'],
    },
  },
  weisskopfseeadler: {
    lifespan: {
      value: '15–20 Jahre',
      context: 'Durchschnitt · Wildbahn',
      sources: [
        'https://rrt5.org/LinkClick.aspx?fileticket=raqr9cS2ZT0%3D&portalid=0&tabid=2518',
      ],
    },
    clutch: {
      value: '1–3 Eier',
      sources: [
        'https://animaldiversity.org/accounts/Haliaeetus_leucocephalus/',
      ],
    },
    conservation: {
      code: 'LC',
      sources: [
        'https://datazone.birdlife.org/species/factsheet/bald-eagle-haliaeetus-leucocephalus',
      ],
    },
    activity: {
      value: 'Tagaktiv',
      sources: [
        'https://animaldiversity.org/accounts/Haliaeetus_leucocephalus/',
      ],
    },
    movement: {
      value: 'Teilzieher',
      note: 'Je nach Population bleiben Vögel im Brutgebiet oder ziehen in wärmere Regionen. Jungvögel können weiter wandern.',
      sources: [
        'https://animaldiversity.org/accounts/Haliaeetus_leucocephalus/',
      ],
    },
  },
  riesenseeadler: {
    lifespan: {
      value: '20–25 Jahre',
      context: 'Wildbahn',
      sources: [
        'https://www.rosamondgiffordzoo.org/visit/animals/birds/stellers-sea-eagle/',
      ],
    },
    clutch: {
      value: '1–3 Eier',
      sources: ['https://animals.sandiegozoo.org/animals/stellers-sea-eagle'],
    },
    conservation: {
      code: 'VU',
      sources: [
        'https://datazone.birdlife.org/species/factsheet/stellers-sea-eagle-haliaeetus-pelagicus',
      ],
    },
    activity: {
      value: 'Tagaktiv',
      sources: ['https://animaldiversity.org/accounts/Haliaeetus_pelagicus/'],
    },
    movement: {
      value: 'Teilzieher',
      note: 'Je nach Population bleiben Vögel im Brutgebiet oder ziehen in wärmere Regionen. Jungvögel können weiter wandern.',
      sources: ['https://animaldiversity.org/accounts/Haliaeetus_pelagicus/'],
    },
  },
  gaukler: {
    lifespan: {
      value: 'bis 27 Jahre',
      context: 'Höchstalter · Wildbahn',
      sources: [
        'https://lazoo.org/explore-your-zoo/our-animals/birds/bateleur-eagle/',
      ],
    },
    clutch: {
      value: '1 Ei',
      sources: [
        'https://peregrinefund.org/explore-raptors-species/eagles/bateleur-eagle',
      ],
    },
    conservation: {
      code: 'EN',
      sources: [
        'https://datazone.birdlife.org/species/factsheet/bateleur-terathopius-ecaudatus',
      ],
    },
    activity: {
      value: 'Tagaktiv',
      sources: [
        'https://peregrinefund.org/explore-raptors-species/eagles/bateleur-eagle',
      ],
    },
    movement: {
      value: 'Standvogel · lokale Wanderungen',
      note: 'Das Zugverhalten kann sich regional unterscheiden.',
      sources: [
        'https://peregrinefund.org/explore-raptors-species/eagles/bateleur-eagle',
      ],
    },
  },
  aguja: {
    lifespan: {
      value: 'bis 42 Jahre',
      context: 'Höchstalter · Tierhaltung',
      sources: [
        'https://genomics.senescence.info/species/entry.php?species=Geranoaetus_melanoleucus',
      ],
    },
    clutch: {
      value: '1–3 Eier',
      sources: [
        'https://www.tierpark-sababurg.de/tierdetails/nm/kordillerenadler-blaubussard-aguja/',
      ],
    },
    conservation: {
      code: 'LC',
      sources: [
        'https://datazone.birdlife.org/species/factsheet/black-chested-buzzard-eagle-geranoaetus-melanoleucus',
      ],
    },
    activity: {
      value: 'Tagaktiv',
      sources: [
        'https://www.zootier-lexikon.org/voegel-aves/greifvoegel/habichtartige/aguja-geranoaetus-melanoleucus',
      ],
    },
    movement: {
      value: 'Überwiegend Standvogel',
      note: 'Kein regelmäßiger saisonaler Fernzug; Jungvögel können bei der Reviersuche größere Entfernungen zurücklegen.',
      sources: [
        'https://www.zootier-lexikon.org/voegel-aves/greifvoegel/habichtartige/aguja-geranoaetus-melanoleucus',
      ],
    },
  },
  uhu: {
    lifespan: {
      value: '10–20 Jahre',
      context: 'Wildbahn',
      sources: ['https://animaldiversity.org/accounts/Bubo_bubo/'],
    },
    clutch: {
      value: '1–4 Eier',
      sources: ['https://animaldiversity.org/accounts/Bubo_bubo/'],
    },
    conservation: {
      code: 'LC',
      sources: [
        'https://datazone.birdlife.org/species/factsheet/eurasian-eagle-owl-bubo-bubo',
      ],
    },
    activity: {
      value: 'Dämmerungs- & nachtaktiv',
      sources: ['https://animaldiversity.org/accounts/Bubo_bubo/'],
    },
    movement: {
      value: 'Standvogel',
      note: 'Kein regelmäßiger saisonaler Fernzug; Jungvögel können bei der Reviersuche größere Entfernungen zurücklegen.',
      sources: ['https://animaldiversity.org/accounts/Bubo_bubo/'],
    },
  },
  schwarzmilan: {
    lifespan: {
      value: 'bis 24 Jahre',
      context: 'Höchstalter · Wildbahn',
      sources: ['https://animaldiversity.org/accounts/Milvus_migrans/'],
    },
    clutch: {
      value: '2–3 Eier',
      sources: ['https://animaldiversity.org/accounts/Milvus_migrans/'],
    },
    conservation: {
      code: 'LC',
      sources: [
        'https://datazone.birdlife.org/species/factsheet/black-kite-milvus-migrans',
      ],
    },
    activity: {
      value: 'Tagaktiv',
      sources: ['https://animaldiversity.org/accounts/Milvus_migrans/'],
    },
    movement: {
      value: 'Teilzieher',
      note: 'Europäische Brutvögel sind Langstreckenzieher. In wärmeren Teilen des Verbreitungsgebiets auch ganzjährig ansässig.',
      sources: ['https://animaldiversity.org/accounts/Milvus_migrans/'],
    },
  },
  rotmilan: {
    lifespan: {
      value: 'ca. 4 Jahre',
      context: 'Ab Brutreife · Wildbahn',
      sources: ['https://www.bto.org/learn/about-birds/birdfacts/red-kite'],
    },
    clutch: {
      value: 'Meist 2 Eier',
      sources: ['https://www.bto.org/learn/about-birds/birdfacts/red-kite'],
    },
    conservation: {
      code: 'LC',
      sources: [
        'https://datazone.birdlife.org/species/factsheet/red-kite-milvus-milvus',
      ],
    },
    activity: {
      value: 'Tagaktiv',
      sources: ['https://animaldiversity.org/accounts/Milvus_milvus/'],
    },
    movement: {
      value: 'Teilzieher',
      note: 'Je nach Population bleiben Vögel im Brutgebiet oder ziehen in wärmere Regionen. Jungvögel können weiter wandern.',
      sources: ['https://animaldiversity.org/accounts/Milvus_milvus/'],
    },
  },
  gerfalke: {
    lifespan: {
      value: 'über 15 Jahre',
      context: 'Höchstalter · Wildbahn',
      sources: ['https://www.allaboutbirds.org/guide/Gyrfalcon/overview'],
    },
    clutch: {
      value: '1–5 Eier',
      sources: ['https://www.allaboutbirds.org/guide/Gyrfalcon/lifehistory'],
    },
    conservation: {
      code: 'LC',
      sources: [
        'https://datazone.birdlife.org/species/factsheet/gyrfalcon-falco-rusticolus',
      ],
    },
    activity: {
      value: 'Tagaktiv',
      sources: ['https://animaldiversity.org/accounts/Falco_rusticolus/'],
    },
    movement: {
      value: 'Teilzieher',
      note: 'Je nach Population bleiben Vögel im Brutgebiet oder ziehen in wärmere Regionen. Jungvögel können weiter wandern.',
      sources: ['https://animaldiversity.org/accounts/Falco_rusticolus/'],
    },
  },
  sakerfalke: {
    lifespan: {
      value: '5–7 Jahre',
      context: 'Wildbahn',
      sources: ['https://animaldiversity.org/accounts/Falco_cherrug/'],
    },
    clutch: {
      value: '3–5 Eier',
      sources: ['https://animaldiversity.org/accounts/Falco_cherrug/'],
    },
    conservation: {
      code: 'EN',
      sources: [
        'https://datazone.birdlife.org/species/factsheet/saker-falcon-falco-cherrug',
      ],
    },
    activity: {
      value: 'Tagaktiv',
      sources: ['https://animaldiversity.org/accounts/Falco_cherrug/'],
    },
    movement: {
      value: 'Teilzieher',
      note: 'Je nach Population bleiben Vögel im Brutgebiet oder ziehen in wärmere Regionen. Jungvögel können weiter wandern.',
      sources: ['https://animaldiversity.org/accounts/Falco_cherrug/'],
    },
  },
  lannerfalke: {
    lifespan: {
      value: 'ca. 5 Jahre',
      context: 'Durchschnitt · Wildbahn',
      sources: ['https://www.lifelanner.eu/the-lanner-falcon/why-the-lanner/'],
    },
    clutch: {
      value: '3–4 Eier',
      sources: [
        'https://www.noahsarkzoofarm.co.uk/our-zoo/animals/lanner-falcon/',
      ],
    },
    conservation: {
      code: 'LC',
      sources: [
        'https://datazone.birdlife.org/species/factsheet/lanner-falcon-falco-biarmicus',
      ],
    },
    activity: {
      value: 'Tagaktiv',
      sources: ['https://animaldiversity.org/accounts/Falco_biarmicus/'],
    },
    movement: {
      value: 'Überwiegend Standvogel',
      note: 'Kein regelmäßiger saisonaler Fernzug; Jungvögel können bei der Reviersuche größere Entfernungen zurücklegen.',
      sources: ['https://animaldiversity.org/accounts/Falco_biarmicus/'],
    },
  },
  baumfalke: {
    lifespan: {
      value: 'ca. 5 Jahre',
      context: 'Ab Brutreife · Wildbahn',
      sources: ['https://www.bto.org/learn/about-birds/birdfacts/hobby'],
    },
    clutch: {
      value: '2–3 Eier',
      sources: ['https://www.bto.org/learn/about-birds/birdfacts/hobby'],
    },
    conservation: {
      code: 'LC',
      sources: [
        'https://datazone.birdlife.org/species/factsheet/eurasian-hobby-falco-subbuteo',
      ],
    },
    activity: {
      value: 'Tag- & dämmerungsaktiv',
      sources: ['https://www.bto.org/learn/about-birds/birdfacts/hobby'],
    },
    movement: {
      value: 'Langstreckenzieher',
      note: 'Europäische Brutvögel überwintern überwiegend im südlichen Afrika.',
      sources: ['https://www.bto.org/learn/about-birds/birdfacts/hobby'],
    },
  },
  falklandkarakara: {
    lifespan: {
      value: 'ca. 25 Jahre',
      context: 'Lebensspanne laut All Things Wild',
      sources: [
        'https://www.allthingswild.co.uk/wild-bunch/striated-caracara/',
      ],
    },
    clutch: {
      value: 'Bis 4 Eier',
      sources: ['https://falklandsconservation.com/caracara/'],
    },
    conservation: {
      code: 'NT',
      sources: [
        'https://datazone.birdlife.org/species/factsheet/striated-caracara-phalcoboenus-australis',
      ],
    },
    activity: {
      value: 'Tagaktiv',
      sources: ['https://falklandsconservation.com/caracara/'],
    },
    movement: {
      value: 'Standvogel · lokale Wanderungen',
      note: 'Das Zugverhalten kann sich regional unterscheiden.',
      sources: ['https://pmc.ncbi.nlm.nih.gov/articles/PMC5878424/'],
    },
  },
  schopfkarakara: {
    lifespan: {
      value: 'über 21 Jahre',
      context: 'Höchstalter · Wildbahn',
      sources: [
        'https://www.allaboutbirds.org/guide/Crested_Caracara/overview',
      ],
    },
    clutch: {
      value: '1–4 Eier',
      sources: [
        'https://www.allaboutbirds.org/guide/Crested_Caracara/lifehistory',
      ],
    },
    conservation: {
      code: 'LC',
      sources: [
        'https://datazone.birdlife.org/species/factsheet/crested-caracara-caracara-plancus',
      ],
    },
    activity: {
      value: 'Tagaktiv',
      sources: [
        'https://www.allaboutbirds.org/guide/Crested_Caracara/lifehistory',
      ],
    },
    movement: {
      value: 'Standvogel',
      note: 'Kein regelmäßiger saisonaler Fernzug; Jungvögel können bei der Reviersuche größere Entfernungen zurücklegen.',
      sources: [
        'https://www.allaboutbirds.org/guide/Crested_Caracara/lifehistory',
      ],
    },
  },
  koenigsbussard: {
    lifespan: {
      value: 'über 23 Jahre',
      context: 'Höchstalter · Wildbahn',
      sources: [
        'https://www.allaboutbirds.org/guide/Ferruginous_Hawk/overview',
      ],
    },
    clutch: {
      value: 'Meist 2–4 Eier',
      sources: ['https://www.audubon.org/field-guide/bird/ferruginous-hawk'],
    },
    conservation: {
      code: 'LC',
      sources: [
        'https://datazone.birdlife.org/species/factsheet/ferruginous-hawk-buteo-regalis',
      ],
    },
    activity: {
      value: 'Tagaktiv',
      sources: ['https://www.audubon.org/field-guide/bird/ferruginous-hawk'],
    },
    movement: {
      value: 'Teilzieher',
      note: 'Je nach Population bleiben Vögel im Brutgebiet oder ziehen in wärmere Regionen. Jungvögel können weiter wandern.',
      sources: ['https://www.audubon.org/field-guide/bird/ferruginous-hawk'],
    },
  },
  harpyie: {
    lifespan: {
      value: '25–35 Jahre',
      context: 'Lebensspanne laut San Diego Zoo',
      sources: ['https://animals.sandiegozoo.org/animals/harpy-eagle'],
    },
    clutch: {
      value: '1–2 Eier',
      sources: ['https://animals.sandiegozoo.org/animals/harpy-eagle'],
    },
    conservation: {
      code: 'VU',
      sources: [
        'https://datazone.birdlife.org/species/factsheet/harpy-eagle-harpia-harpyja',
      ],
    },
    activity: {
      value: 'Tagaktiv',
      sources: ['https://animaldiversity.org/accounts/Harpia_harpyja/'],
    },
    movement: {
      value: 'Standvogel',
      note: 'Kein regelmäßiger saisonaler Fernzug; Jungvögel können bei der Reviersuche größere Entfernungen zurücklegen.',
      sources: ['https://animaldiversity.org/accounts/Harpia_harpyja/'],
    },
  },
  kampfadler: {
    lifespan: {
      value: 'ca. 14 Jahre',
      context: 'Durchschnitt · Wildbahn',
      sources: ['https://animaldiversity.org/accounts/Polemaetus_bellicosus/'],
    },
    clutch: {
      value: 'Meist 1 Ei',
      sources: [
        'https://peregrinefund.org/explore-raptors-species/eagles/martial-eagle',
      ],
    },
    conservation: {
      code: 'EN',
      sources: [
        'https://datazone.birdlife.org/species/factsheet/martial-eagle-polemaetus-bellicosus',
      ],
    },
    activity: {
      value: 'Tagaktiv',
      sources: ['https://animaldiversity.org/accounts/Polemaetus_bellicosus/'],
    },
    movement: {
      value: 'Standvogel',
      note: 'Kein regelmäßiger saisonaler Fernzug; Jungvögel können bei der Reviersuche größere Entfernungen zurücklegen.',
      sources: ['https://animaldiversity.org/accounts/Polemaetus_bellicosus/'],
    },
  },
  virginiauhu: {
    lifespan: {
      value: 'ca. 13 Jahre',
      context: 'Durchschnitt · Wildbahn',
      sources: ['https://animaldiversity.org/accounts/Bubo_virginianus/'],
    },
    clutch: {
      value: '1–4 Eier',
      sources: [
        'https://www.allaboutbirds.org/guide/Great_Horned_Owl/lifehistory',
      ],
    },
    conservation: {
      code: 'LC',
      sources: [
        'https://datazone.birdlife.org/species/factsheet/great-horned-owl-bubo-virginianus',
      ],
    },
    activity: {
      value: 'Dämmerungs- & nachtaktiv',
      sources: ['https://animaldiversity.org/accounts/Bubo_virginianus/'],
    },
    movement: {
      value: 'Standvogel',
      note: 'Kein regelmäßiger saisonaler Fernzug; Jungvögel können bei der Reviersuche größere Entfernungen zurücklegen.',
      sources: ['https://animaldiversity.org/accounts/Bubo_virginianus/'],
    },
  },
  weissstorch: {
    lifespan: {
      value: '8–10 Jahre',
      context: 'Durchschnitt · Wildbahn',
      sources: [
        'https://sachsen-anhalt.nabu.de/tiere-und-pflanzen/tiere/weissstorch/weissstorch-im-portraet.html',
      ],
    },
    clutch: {
      value: '3–5 Eier',
      sources: [
        'https://thueringen.nabu.de/tiere-und-pflanzen/voegel/weissstorch/steckbrief/index.html',
      ],
    },
    conservation: {
      code: 'LC',
      sources: [
        'https://datazone.birdlife.org/species/factsheet/white-stork-ciconia-ciconia',
      ],
    },
    activity: {
      value: 'Tagaktiv',
      sources: ['https://animaldiversity.org/accounts/Ciconia_ciconia/'],
    },
    movement: {
      value: 'Überwiegend Zugvogel',
      note: 'Traditionell Langstreckenzieher; zunehmend Überwinterung in Süd- und Westeuropa, vereinzelt auch in Deutschland.',
      sources: ['https://animaldiversity.org/accounts/Ciconia_ciconia/'],
    },
  },
  sperber: {
    lifespan: {
      value: 'ca. 4 Jahre',
      context: 'Ab Brutreife · Wildbahn',
      sources: ['https://www.bto.org/learn/about-birds/birdfacts/sparrowhawk'],
    },
    clutch: {
      value: '4–5 Eier',
      sources: ['https://www.bto.org/learn/about-birds/birdfacts/sparrowhawk'],
    },
    conservation: {
      code: 'LC',
      sources: [
        'https://datazone.birdlife.org/species/factsheet/eurasian-sparrowhawk-accipiter-nisus',
      ],
    },
    activity: {
      value: 'Tagaktiv',
      sources: ['https://animaldiversity.org/accounts/Accipiter_nisus/'],
    },
    movement: {
      value: 'Teilzieher',
      note: 'Je nach Population bleiben Vögel im Brutgebiet oder ziehen in wärmere Regionen. Jungvögel können weiter wandern.',
      sources: ['https://animaldiversity.org/accounts/Accipiter_nisus/'],
    },
  },
};
