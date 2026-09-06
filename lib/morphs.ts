export type MorphSpeciesId =
  | 'maeusebussard'
  | 'gerfalke'
  | 'koenigsbussard'
  | 'rotschwanzbussard';

// The existing image convention calls the adult stage "male" for these species.
export type MorphStage = 'male' | 'juvenile';
export type MorphColor = [label: string, hex: string];
export type MorphSource = { name: string; url: string };
export type BirdMorphChoice = {
  id: string;
  label: string;
  adultNote: string;
  juvenileNote: string;
  adultColors: MorphColor[];
  juvenileColors: MorphColor[];
  rangeNote?: string;
  // Omitted for the default morph: use the species' existing stage image.
  images?: Record<MorphStage, string>;
};
export type BirdMorphConfig = {
  label: string;
  defaultId: string;
  note: string;
  rangeNote?: string;
  sources: MorphSource[];
  choices: BirdMorphChoice[];
};

export const birdMorphs: Record<MorphSpeciesId, BirdMorphConfig> = {
  maeusebussard: {
    label: 'Farbform',
    defaultId: 'mittel',
    note: 'Die Übergänge zwischen hellen, mittleren und dunklen Mäusebussarden sind fließend. Die drei Ansichten zeigen Beispiele der natürlichen individuellen Farbvariation, keine getrennten Unterarten oder festen Farbklassen.',
    sources: [
      {
        name: 'NABU-Artenschutzzentrum Leiferde',
        url: 'https://www.nabuzentrum-leiferde.de/tiere-im-zentrum/maeusebussard/',
      },
      {
        name: 'Max-Planck-Gesellschaft – Farbvielfalt des Mäusebussards',
        url: 'https://www.mpg.de/26239174/der-mausebussard-verliert-seine-farbvielfalt',
      },
      {
        name: 'Max-Planck-Institut für biologische Intelligenz – Originalstudie',
        url: 'https://ornithology.bi.mpg.de/CONTENT/news/2026/KasparBuzzardColouration2026.html',
      },
    ],
    choices: [
      {
        id: 'hell',
        label: 'Hell',
        adultNote:
          'Fast weißer Kopf und helle Unterseite mit wenigen braunen Zeichnungen; dunklere Spitzen und Bänder bleiben an den Schwungfedern sichtbar.',
        juvenileNote:
          'Ebenfalls sehr hell, mit wenigen feinen Längsstrichen und einer helleren graubraunen Iris. Junge Bussarde sind nicht grundsätzlich heller als Altvögel.',
        adultColors: [
          ['Cremeweiß', '#ECE7DC'],
          ['Hellbeige', '#C7B99F'],
          ['Braun', '#8A7257'],
          ['Dunkelbraun', '#4A3D2F'],
        ],
        juvenileColors: [
          ['Cremeweiß', '#ECE7DC'],
          ['Hellbeige', '#C7B99F'],
          ['Braun', '#8A7257'],
          ['Dunkelbraun', '#4A3D2F'],
        ],
        images: {
          male: '/birds/morph-maeusebussard-hell-male.png?v=d0073d5783e4',
          juvenile:
            '/birds/morph-maeusebussard-hell-juvenile.png?v=f20c054d3ee5',
        },
      },
      {
        id: 'mittel',
        label: 'Mittel',
        adultNote:
          'Braunes Gefieder mit hellen, unterschiedlich stark gefleckten Partien auf Brust und Bauch sowie gebänderten Schwungfedern.',
        juvenileNote:
          'Braune Oberseite und helle Partien mit stärker längsgerichteter Zeichnung; die Iris ist meist heller als beim Altvogel.',
        adultColors: [
          ['Braun', '#825F3E'],
          ['Dunkelbraun', '#463526'],
          ['Cremebeige', '#D8CAB1'],
          ['Graubraun', '#A49680'],
        ],
        juvenileColors: [
          ['Braun', '#825F3E'],
          ['Dunkelbraun', '#463526'],
          ['Cremebeige', '#D8CAB1'],
          ['Graubraun', '#A49680'],
        ],
      },
      {
        id: 'dunkel',
        label: 'Dunkel',
        adultNote:
          'Kopf, Körper und Flügeldecken sind weitgehend dunkelbraun. Die helleren, gebänderten Schwungfederunterseiten heben sich davon ab.',
        juvenileNote:
          'Auch Jungvögel können sehr dunkel sein; feine Längszeichnungen fallen dann wenig auf. Die hellere Iris und frischen Federmerkmale helfen bei der Altersbestimmung.',
        adultColors: [
          ['Schwarzbraun', '#30261E'],
          ['Dunkelbraun', '#503B2B'],
          ['Graubraun', '#928473'],
          ['Hellgraubeige', '#BEB6A5'],
        ],
        juvenileColors: [
          ['Schwarzbraun', '#30261E'],
          ['Dunkelbraun', '#503B2B'],
          ['Graubraun', '#928473'],
          ['Hellgraubeige', '#BEB6A5'],
        ],
        images: {
          male: '/birds/morph-maeusebussard-dunkel-male.png?v=c903f325f18f',
          juvenile:
            '/birds/morph-maeusebussard-dunkel-juvenile.png?v=c9b7e4fb1fb8',
        },
      },
    ],
  },
  gerfalke: {
    label: 'Farbform',
    defaultId: 'grau',
    note: 'Weiß, Grau und Dunkel bezeichnen Abschnitte eines fließenden Farbspektrums. Männchen und Weibchen haben dieselben Gefiederfarben.',
    sources: [
      {
        name: 'Cornell Lab – Gerfalke',
        url: 'https://www.allaboutbirds.org/guide/Gyrfalcon/id',
      },
      {
        name: 'HawkWatch International – Gerfalke',
        url: 'https://hawkwatch.org/raptor-id/raptor-id-fact-sheets/gyrfalcon/',
      },
    ],
    choices: [
      {
        id: 'weiss',
        label: 'Weiß',
        adultNote:
          'Fast schneeweiß mit kleinen dunklen Flecken und dunklen äußersten Handschwingenspitzen. Schwanz weiß bis fein gebändert.',
        juvenileNote:
          'Die weiße Grundfarbe bleibt; Oberseite und Unterseite sind stärker dunkel gezeichnet. Füße und Wachshaut sind blaugrau.',
        adultColors: [
          ['Schneeweiß', '#f4f2eb'],
          ['Dunkle Flecken', '#353437'],
          ['Feines Grau', '#c0bdb6'],
        ],
        juvenileColors: [
          ['Weiß', '#efeee9'],
          ['Dunkle Striche', '#55504a'],
          ['Blaugraue Füße', '#849199'],
        ],
        images: {
          male: '/birds/morph-gerfalke-weiss-male.png?v=6d0dc31fd0f5',
          juvenile: '/birds/morph-gerfalke-weiss-juvenile.png?v=78d0a89a4d06',
        },
      },
      {
        id: 'grau',
        label: 'Grau',
        adultNote:
          'Graue Oberseite mit Bändern, helle Unterseite mit dunklen Flecken. Wachshaut und Füße sind gelb.',
        juvenileNote:
          'Bräunlicher mit Längsstrichen auf der Unterseite und hell gesäumten Deckfedern. Wachshaut, Augenring und Füße sind zunächst blaugrau.',
        adultColors: [
          ['Grau', '#8a8984'],
          ['Grauweiß', '#e2dfd6'],
          ['Dunkelzeichnung', '#514c48'],
        ],
        juvenileColors: [
          ['Braungrau', '#74665b'],
          ['Cremeweiß', '#dfd6c5'],
          ['Dunkelbraun', '#494039'],
        ],
      },
      {
        id: 'dunkel',
        label: 'Dunkel',
        adultNote:
          'Dunkelschiefergrau mit schwacher Bänderung und schwärzlichem Kopf. Die Unterseite wirkt weitgehend gleichmäßig dunkel.',
        juvenileNote:
          'Dunkelbraun mit schwachen hellen Längsstrichen; die Schwungfedern sind heller als die Flügeldecken. Füße und Wachshaut sind blaugrau.',
        adultColors: [
          ['Schiefergrau', '#48474c'],
          ['Schwarzgrau', '#292a2d'],
          ['Schwache Bänder', '#737074'],
        ],
        juvenileColors: [
          ['Dunkelbraun', '#3d342d'],
          ['Helle Striche', '#9b8c78'],
          ['Graubraune Schwingen', '#777168'],
        ],
        images: {
          male: '/birds/morph-gerfalke-dunkel-male.png?v=7685df3aefc5',
          juvenile: '/birds/morph-gerfalke-dunkel-juvenile.png?v=ec3dc9ac897b',
        },
      },
    ],
    rangeNote:
      'In Nordamerika sind graue Gerfalken häufiger als weiße oder dunkle.',
  },
  koenigsbussard: {
    label: 'Farbform',
    defaultId: 'hell',
    note: 'Helle Königsbussarde sind häufig, dunkle selten. Zeichnung und Rostton unterscheiden sich auch innerhalb einer Farbform.',
    sources: [
      {
        name: 'Cornell Lab – Königsbussard',
        url: 'https://www.allaboutbirds.org/guide/Ferruginous_Hawk/id',
      },
      {
        name: 'HawkWatch International – Königsbussard',
        url: 'https://hawkwatch.org/raptor-id/raptor-id-fact-sheets/ferruginous-hawk/',
      },
    ],
    choices: [
      {
        id: 'hell',
        label: 'Hell',
        adultNote:
          'Weiße Unterseite, rostfarbene Beinbefiederung und rostige Flügeldecken. Schwanz und Schwungfedern sind hell.',
        juvenileNote:
          'Weiß mit braunen Flecken an Bauch und Beinen; oberseits brauner. Der Schwanz hat eine helle Basis und einen dunkleren Endbereich.',
        adultColors: [
          ['Weiß', '#eeeade'],
          ['Rostrot', '#a56537'],
          ['Graubraun', '#827a6d'],
        ],
        juvenileColors: [
          ['Weiß', '#ede8dd'],
          ['Braun', '#7a614a'],
          ['Dunkler Schwanz', '#625443'],
        ],
      },
      {
        id: 'dunkel',
        label: 'Dunkel',
        adultNote:
          'Rostbrauner bis schokoladenbrauner Körper und dunkle innere Flügeldecken kontrastieren mit hellen Schwungfedern. Der Schwanz ist hellgrau bis weißlich.',
        juvenileNote:
          'Weniger rostfarben und mit schwächerem Flügelhinterrand. Der Schwanz ist braun, teils mit weißer Basis; die Iris ist zunächst gelblich.',
        adultColors: [
          ['Schokoladenbraun', '#513525'],
          ['Rostbraun', '#925733'],
          ['Helle Schwingen', '#e5ded0'],
        ],
        juvenileColors: [
          ['Dunkelbraun', '#544032'],
          ['Schwingenweiß', '#d8d0c2'],
          ['Brauner Schwanz', '#786049'],
        ],
        images: {
          male: '/birds/morph-koenigsbussard-dunkel-male.png?v=d9eed7bbfa7d',
          juvenile:
            '/birds/morph-koenigsbussard-dunkel-juvenile.png?v=4c62d179c1f5',
        },
      },
    ],
  },
  rotschwanzbussard: {
    label: 'Farbform',
    defaultId: 'hell',
    note: 'Die dargestellten Farbmorphen orientieren sich an der westlichen Unterart calurus. Sie gehen durch zahlreiche Zwischenformen ineinander über; Harlans Rotschwanzbussard ist eine eigene Unterart und wird hier nicht als dunkle Morphe dargestellt.',
    sources: [
      {
        name: 'Cornell Lab – Unterarten des Rotschwanzbussards',
        url: 'https://www.allaboutbirds.org/news/red-tailed-hawk-subspecies-america-widespread/',
      },
      {
        name: 'Cornell Lab – Rotschwanzbussard',
        url: 'https://www.allaboutbirds.org/guide/Red-tailed_Hawk/id',
      },
    ],
    choices: [
      {
        id: 'hell',
        label: 'Hell',
        adultNote:
          'Helle Unterseite mit dunklem Bauchband. Der adulte Schwanz ist rostrot.',
        juvenileNote:
          'Helle Unterseite mit kräftiger dunkler Zeichnung. Der Schwanz ist braun und fein quergebändert.',
        adultColors: [
          ['Cremeweiß', '#EEE4CD'],
          ['Braun', '#665044'],
          ['Rostrot', '#B9693B'],
        ],
        juvenileColors: [
          ['Cremeweiß', '#EEE4CD'],
          ['Braune Zeichnung', '#665044'],
          ['Brauner Schwanz', '#827260'],
        ],
        rangeNote:
          'Helle Vögel sind weit verbreitet und stellen auch bei calurus im Westen die Mehrzahl.',
      },
      {
        id: 'rostbraun',
        label: 'Rostbraun',
        adultNote:
          'Rostbraune Brust und Unterseite mit dunklem Bauchbereich. Helle Schwungfedern und roter Schwanz setzen sich davon ab.',
        juvenileNote:
          'Warm braune Unterseite mit dichter dunkler Strichelung. Der braun gebänderte Schwanz besitzt noch kein adultes Rot.',
        adultColors: [
          ['Rostbraun', '#A35B34'],
          ['Dunkelbraun', '#493629'],
          ['Hellgrau', '#CFC8BC'],
          ['Schwanzrot', '#B65E35'],
        ],
        juvenileColors: [
          ['Warmbraun', '#946741'],
          ['Dunkle Strichelung', '#493629'],
          ['Hellgrau', '#CFC8BC'],
          ['Brauner Schwanz', '#78604A'],
        ],
        rangeNote:
          'Zwischenformen vor allem im westlichen Nordamerika, bei calurus von British Columbia bis Nordmexiko.',
        images: {
          male: '/birds/morph-rotschwanzbussard-rostbraun-male.png?v=de383baa409c',
          juvenile:
            '/birds/morph-rotschwanzbussard-rostbraun-juvenile.png?v=7a9a0f1399df',
        },
      },
      {
        id: 'dunkel',
        label: 'Dunkel',
        adultNote:
          'Schokoladenbrauner Körper und dunkle Unterflügeldecken. Hellere Schwungfedern kontrastieren mit dem roten Schwanz.',
        juvenileNote:
          'Sehr dicht dunkel gezeichnete Unterseite und gescheckte Flügeldecken. Die helleren Flügel und der braunweiße Schwanz sind quergebändert.',
        adultColors: [
          ['Schokoladenbraun', '#3D2D26'],
          ['Grauweiß', '#C9C5B9'],
          ['Rostrot', '#AA5734'],
        ],
        juvenileColors: [
          ['Schokoladenbraun', '#3D2D26'],
          ['Grauweiß', '#C9C5B9'],
          ['Brauner Schwanz', '#78634D'],
        ],
        rangeNote:
          'Seltenere Farbmorphe westlicher Populationen; die Darstellung folgt calurus.',
        images: {
          male: '/birds/morph-rotschwanzbussard-dunkel-male.png?v=8f28a7e54190',
          juvenile:
            '/birds/morph-rotschwanzbussard-dunkel-juvenile.png?v=f902be4f6724',
        },
      },
    ],
  },
};

export function getBirdMorphConfig(
  speciesId: string,
): BirdMorphConfig | undefined {
  if (!Object.prototype.hasOwnProperty.call(birdMorphs, speciesId))
    return undefined;
  return birdMorphs[speciesId as MorphSpeciesId];
}

/** Unknown or absent choices resolve to the species' default morph. */
export function getBirdMorphChoice(
  speciesId: string,
  morphId?: string | null,
): BirdMorphChoice | undefined {
  const config = getBirdMorphConfig(speciesId);
  return (
    config?.choices.find((choice) => choice.id === morphId) ??
    config?.choices.find((choice) => choice.id === config.defaultId)
  );
}

export function getBirdMorphAppearance(
  speciesId: string,
  morphId: string | null | undefined,
  stage: MorphStage,
): { note: string; colors: MorphColor[]; image?: string } | undefined {
  const choice = getBirdMorphChoice(speciesId, morphId);
  if (!choice) return undefined;
  return {
    note: stage === 'juvenile' ? choice.juvenileNote : choice.adultNote,
    colors: stage === 'juvenile' ? choice.juvenileColors : choice.adultColors,
    image: choice.images?.[stage],
  };
}
