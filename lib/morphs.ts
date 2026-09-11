export type MorphSpeciesId =
  | 'maeusebussard'
  | 'gerfalke'
  | 'koenigsbussard'
  | 'rotschwanzbussard'
  | 'wespenbussard'
  | 'gaukler'
  | 'bartgeier'
  | 'zwergadler';

// The existing image convention calls the adult stage "male" for these species.
export type MorphStage = 'male' | 'female' | 'juvenile';
export type MorphColor = [label: string, hex: string];
export type MorphSource = { name: string; url: string };
export type BirdMorphChoice = {
  id: string;
  label: string;
  adultNote: string;
  juvenileNote: string;
  adultColors: MorphColor[];
  juvenileColors: MorphColor[];
  femaleNote?: string;
  femaleColors?: MorphColor[];
  rangeNote?: string;
  // Omitted for the default morph: use the species' existing stage image.
  images?: Partial<Record<MorphStage, string>>;
};
export type BirdMorphConfig = {
  label: string;
  stages?: MorphStage[];
  hintLabel?: string;
  defaultId: string;
  note: string;
  rangeNote?: string;
  sources: MorphSource[];
  choices: BirdMorphChoice[];
};

export const birdMorphs: Record<MorphSpeciesId, BirdMorphConfig> = {
  zwergadler: {
    label: 'Morphe',
    defaultId: 'hell',
    note: 'Helle und dunkle Zwergadler gehören zur selben Art. Beide Morphen kommen bei beiden Geschlechtern und auch bei Jungvögeln vor; braune Zwischenformen sind möglich.',
    sources: [
      {
        name: 'SEO/BirdLife – Zwergadler',
        url: 'https://seo.org/ave/aguila-calzada/',
      },
      {
        name: 'CSIC – Gefieder und Maße',
        url: 'https://www.vertebradosibericos.org/aves/identificacion/hiepenid.html',
      },
    ],
    choices: [
      {
        id: 'hell',
        label: 'Hell',
        adultNote:
          'Weißlicher Körper und helle Unterflügeldecken kontrastieren mit dunklen Schwungfedern. Der Schwanz ist heller graubraun; kleine helle Schulterflecken können auffallen.',
        juvenileNote:
          'Wie die helle adulte Morphe, oft mit wärmer beigefarbener Unterseite, hellen Federsäumen und dunkler Iris.',
        adultColors: [
          ['Cremeweiß', '#ECE5D6'],
          ['Braun', '#795B3C'],
          ['Schwarzbraun', '#342D26'],
        ],
        juvenileColors: [
          ['Cremebeige', '#DBC8A6'],
          ['Braun', '#886A49'],
          ['Dunkelbraun', '#3E332A'],
        ],
      },
      {
        id: 'dunkel',
        label: 'Dunkel',
        adultNote:
          'Brauner bis dunkel schokoladenbrauner Körper und dunkle Unterflügeldecken. Etwas hellere Schwungfedern und die hellen Schulterflecken bleiben als Kontraste erhalten.',
        juvenileNote:
          'Dunkelbrauner Körper mit frisch hell gesäumten Deckfedern und dunkler Iris. Die Grundfarbe ähnelt bereits der dunklen adulten Morphe.',
        adultColors: [
          ['Schokoladenbraun', '#493326'],
          ['Graubraun', '#948878'],
          ['Cremeweiß', '#E7DECD'],
        ],
        juvenileColors: [
          ['Dunkelbraun', '#57412E'],
          ['Ockerbeige', '#B19873'],
          ['Graubraun', '#908371'],
        ],
        images: {
          male: '/birds/morph-zwergadler-dark.png',
          juvenile: '/birds/morph-juvenile-zwergadler-dark.png',
        },
      },
    ],
  },
  wespenbussard: {
    label: 'Morphe',
    defaultId: 'mittel',
    note: 'Wespenbussarde variieren von sehr hell bis fast einfarbig dunkelbraun. Hell, Mittel und Dunkel zeigen Beispiele eines fließenden Spektrums, keine Unterarten. Die Farbvariation kommt auch bei Jungvögeln vor; Irisfarbe und Federzeichnung helfen bei der Altersbestimmung.',
    sources: [
      {
        name: 'Spanisches Umweltministerium – Wespenbussard',
        url: 'https://des.iepnb.es/areas-tematicas/especies-silvestres/eidos/10739/Pernis%20apivorus',
      },
      {
        name: 'Cornell Lab – Wespenbussard',
        url: 'https://ebird.org/species/euhbuz1',
      },
      {
        name: 'Birds in Bulgaria – Altersmerkmale',
        url: 'https://www.birdsinbulgaria.org/birds.php?l=en&semeystvo=13&type=bird&vid=72',
      },
    ],
    choices: [
      {
        id: 'hell',
        label: 'Hell',
        adultNote:
          'Sehr helle Unterseite und Unterflügeldecken mit wenigen braunen Zeichnungen. Dunkle Handwurzelflecken und Bänder auf Schwingen und Schwanz bleiben sichtbar; die Iris ist gelb.',
        juvenileNote:
          'Helle Unterseite mit wenigen braunen Strichen. Die Iris ist dunkel, die Wachshaut gelblich; Schwingen und Schwanz sind gleichmäßiger gebändert als beim Altvogel.',
        adultColors: [
          ['Cremeweiß', '#EEE9DE'],
          ['Braun', '#80674D'],
          ['Dunkelbraun', '#40352A'],
        ],
        juvenileColors: [
          ['Cremeweiß', '#E9E1D1'],
          ['Braune Striche', '#856C50'],
          ['Dunkelbraun', '#40352A'],
        ],
        images: {
          male: '/birds/morph-wespenbussard-hell-male.png',
          juvenile: '/birds/morph-wespenbussard-hell-juvenile.png',
        },
      },
      {
        id: 'mittel',
        label: 'Mittel',
        adultNote:
          'Cremefarbene Unterseite mit deutlicher brauner Zeichnung und dunklen Handwurzelflecken. Schwingen und Schwanz sind gebändert; die Iris ist gelb.',
        juvenileNote:
          'Brauner Kopf und braun gezeichnete, cremefarbene Unterseite. Dunkle Iris, gelbliche Wachshaut und mehrere gleichmäßiger verteilte Schwanzbänder kennzeichnen das Jugendkleid.',
        adultColors: [
          ['Cremebeige', '#DCD0B8'],
          ['Braun', '#80664A'],
          ['Dunkelbraun', '#40352A'],
        ],
        juvenileColors: [
          ['Cremebeige', '#D8C9AC'],
          ['Braun', '#80664A'],
          ['Dunkelbraun', '#40352A'],
        ],
        images: { juvenile: '/birds/morph-wespenbussard-mittel-juvenile.png' },
      },
      {
        id: 'dunkel',
        label: 'Dunkel',
        adultNote:
          'Dunkelbrauner Körper und dunkle Unterflügeldecken kontrastieren mit helleren, gebänderten Schwungfedern. Die gelbe Iris hebt sich vom dunklen Kopf ab.',
        juvenileNote:
          'Kopf, Körper und Unterflügeldecken sind dunkelbraun, die Schwungfedern heller und gebändert. Die Iris bleibt dunkel; der Schwanz zeigt mehrere gleichmäßiger verteilte Bänder.',
        adultColors: [
          ['Schokoladenbraun', '#493426'],
          ['Dunkelbraun', '#30271F'],
          ['Graubeige', '#B2A38A'],
        ],
        juvenileColors: [
          ['Schokoladenbraun', '#493426'],
          ['Dunkelbraun', '#30271F'],
          ['Graubeige', '#AD9D83'],
        ],
        images: {
          male: '/birds/morph-wespenbussard-dunkel-male.png',
          juvenile: '/birds/morph-wespenbussard-dunkel-juvenile.png',
        },
      },
    ],
  },
  gaukler: {
    label: 'Rückenfarbe',
    stages: ['male', 'female'],
    defaultId: 'kastanienbraun',
    note: 'Neben dem gewöhnlichen kastanienbraunen Rücken gibt es eine seltene cremefarbene Morphe mit hellerem, blass kastanienfarbenem Schwanz. Der schwarze Körper bleibt erhalten. Beide Rückenfarben sind bei Männchen und Weibchen auswählbar; die Geschlechtsmerkmale am Flügel bleiben bestehen. Das braune Jugendkleid wird als eigene Altersstufe gezeigt. Die Auswahl der Rückenfarbe gilt nur für Altvögel.',
    sources: [
      {
        name: 'Lip Kee – dokumentierte cremefarbene Morphe',
        url: 'https://commons.wikimedia.org/wiki/File:Bateleur_cream_backed_morph_(20964420378).jpg',
      },
      {
        name: 'Cornell Lab – Gaukler, Geschlechts- und Altersmerkmale',
        url: 'https://ebird.org/species/batele1',
      },
    ],
    choices: [
      {
        id: 'kastanienbraun',
        label: 'Kastanienbraun',
        adultNote:
          'Schwarzer Kopf und Körper, kastanienbrauner Rücken und kurzer kastanienbrauner Schwanz. Beim Männchen ist der schwarze Hinterrand des hellen Unterflügels breit.',
        femaleNote:
          'Kastanienbrauner Rücken und Schwanz wie beim Männchen. Die hellen Armschwingen des Weibchens tragen einen schmaleren schwarzen Hinterrand.',
        juvenileNote:
          'Junge Gaukler sind überwiegend braun. Die hier gezeigte Rückenfarbwahl gilt nur für das adulte Gefieder.',
        adultColors: [
          ['Schwarz', '#24242A'],
          ['Kastanienbraun', '#98552F'],
          ['Silbergrau', '#C4C1BF'],
        ],
        juvenileColors: [
          ['Braun', '#70553D'],
          ['Dunkelbraun', '#3D3027'],
        ],
      },
      {
        id: 'creme',
        label: 'Creme',
        adultNote:
          'Cremefarbener Rücken und blass kastanienfarbener Schwanz bei weiterhin schwarzem Kopf und Körper. Das Männchen behält den breiten schwarzen Flügelhinterrand.',
        femaleNote:
          'Cremefarbener Rücken und heller kastanienfarbener Schwanz. Die hellen Armschwingen mit schmalem schwarzem Hinterrand kennzeichnen das Weibchen.',
        juvenileNote:
          'Die adulte cremefarbene Rückenform wird hier nicht auf das überwiegend braune Jugendkleid übertragen.',
        adultColors: [
          ['Schwarz', '#24242A'],
          ['Graubeige', '#C1BCB0'],
          ['Helles Graubraun', '#AAA092'],
          ['Silbergrau', '#C4C1BF'],
        ],
        juvenileColors: [
          ['Braun', '#70553D'],
          ['Dunkelbraun', '#3D3027'],
        ],
        images: {
          male: '/birds/morph-gaukler-creme-male.png',
          female: '/birds/morph-gaukler-creme-female.png',
        },
      },
    ],
  },
  bartgeier: {
    label: 'Gefiederfärbung',
    hintLabel: 'Warum Weiß und Rostorange?',
    stages: ['male'],
    defaultId: 'rostorange',
    note: 'Weiß und Rostorange sind keine genetischen Farbmorphen. Die hellen Federn adulter Bartgeier sind von Natur aus weiß und werden durch Bäder in eisenoxidhaltigem Wasser rostorange gefärbt. Die Intensität kann sich bei demselben Vogel ändern. Jungvögel besitzen unabhängig davon ein überwiegend dunkles Jugendkleid.',
    sources: [
      {
        name: 'Vulture Conservation Foundation – Bartgeier',
        url: 'https://4vultures.org/vultures/bearded-vulture/',
      },
      {
        name: 'Negro et al. – kosmetische Gefiederfärbung',
        url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC6525594/',
      },
    ],
    choices: [
      {
        id: 'rostorange',
        label: 'Rostorange',
        adultNote:
          'Kopf, Hals und Unterseite sind durch äußere Eisenoxidablagerungen rostorange gefärbt. Flügel und Schwanz bleiben dunkel, Bart und Augenmaske schwarz.',
        juvenileNote:
          'Junge Bartgeier tragen überwiegend dunkelbraunes Gefieder mit dunklem Kopf und Hals; ihnen fehlt die helle adulte Unterseite.',
        adultColors: [
          ['Rostorange', '#CE9453'],
          ['Dunkelbraun', '#493E30'],
          ['Schwarz', '#252622'],
        ],
        juvenileColors: [
          ['Dunkelbraun', '#4A3A2D'],
          ['Braun', '#796047'],
        ],
      },
      {
        id: 'weiss',
        label: 'Weiß',
        adultNote:
          'Die ungefärbten Federn an Kopf, Hals und Unterseite sind weiß bis cremeweiß. Dunkle Flügel, dunkler Schwanz sowie schwarze Augenmaske und Bart bleiben erhalten.',
        juvenileNote:
          'Die weiße adulte Unterseite ist kein Jugendmerkmal. Junge Bartgeier sind überwiegend dunkelbraun.',
        adultColors: [
          ['Cremeweiß', '#EEEAE0'],
          ['Dunkelbraun', '#493E30'],
          ['Schwarz', '#252622'],
        ],
        juvenileColors: [
          ['Dunkelbraun', '#4A3A2D'],
          ['Braun', '#796047'],
        ],
        images: { male: '/birds/morph-bartgeier-weiss-male.png' },
      },
    ],
  },
  maeusebussard: {
    label: 'Morphe',
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
    label: 'Morphe',
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
          male: '/birds/morph-gerfalke-weiss-male.png?v=ecfc8cb16b28',
          juvenile: '/birds/morph-gerfalke-weiss-juvenile.png?v=3e506aebe4f6',
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
          male: '/birds/morph-gerfalke-dunkel-male.png?v=bab2a4ad27e7',
          juvenile: '/birds/morph-gerfalke-dunkel-juvenile.png?v=3cf027d7a27f',
        },
      },
    ],
    rangeNote:
      'In Nordamerika sind graue Gerfalken häufiger als weiße oder dunkle.',
  },
  koenigsbussard: {
    label: 'Morphe',
    defaultId: 'hell',
    note: 'Helle Königsbussarde sind häufig, dunkle selten. Zeichnung und Rostton unterscheiden sich auch innerhalb einer Morphe.',
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
    label: 'Morphe',
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
  stage?: MorphStage,
): BirdMorphConfig | undefined {
  if (!Object.prototype.hasOwnProperty.call(birdMorphs, speciesId))
    return undefined;
  const config = birdMorphs[speciesId as MorphSpeciesId];
  return stage && config.stages && !config.stages.includes(stage)
    ? undefined
    : config;
}

/** Unknown or absent choices resolve to the species' default morph. */
export function getBirdMorphChoice(
  speciesId: string,
  morphId?: string | null,
  stage?: MorphStage,
): BirdMorphChoice | undefined {
  const config = getBirdMorphConfig(speciesId, stage);
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
  const choice = getBirdMorphChoice(speciesId, morphId, stage);
  if (!choice) return undefined;
  return {
    note:
      stage === 'juvenile'
        ? choice.juvenileNote
        : stage === 'female'
          ? (choice.femaleNote ?? choice.adultNote)
          : choice.adultNote,
    colors:
      stage === 'juvenile'
        ? choice.juvenileColors
        : stage === 'female'
          ? (choice.femaleColors ?? choice.adultColors)
          : choice.adultColors,
    image: choice.images?.[stage],
  };
}
