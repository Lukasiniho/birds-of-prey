import type { AdditionalBird } from './additional-birds.ts';

export const eagleAdditions: AdditionalBird[] = [
  {
    id: 'habichtsadler',
    name: 'Habichtsadler',
    latin: 'Aquila fasciata',
    aliases: ['Bonelli’s Eagle', "Bonelli's Eagle", 'Hieraaetus fasciatus'],
    span: [150, 180],
    length: [60, 74],
    weight: [1400, 3000],
    sexes: {
      male: { weight: [1400, 2200] },
      female: { weight: [2100, 3000] },
    },
    genusLabel: 'Echte Adler',
    intro:
      'Ein wendiger Adler mit heller Unterseite und dunklen Unterflügeln, der an warmen Felswänden brütet.',
    habitat:
      'Felsige Hügel und Schluchten mit offenem Buschland, lichten Wäldern und landwirtschaftlichen Flächen. Felsvorsprünge, regional auch Bäume, tragen den Horst.',
    range: 'Mittelmeerraum bis Süd- und Südostasien',
    regions: ['Europa', 'Afrika', 'Asien'],
    habitatGroup: 'Felslandschaften',
    colors: [
      ['Cremeweiß', '#EAE5D9'],
      ['Dunkelbraun', '#41372D'],
      ['Graubraun', '#8F887C'],
    ],
    source: 'https://seo.org/ave/aguila-perdicera/',
    sourceName: 'SEO/BirdLife',
    plumageNotes: {
      male: 'Helle, dunkel gestrichelte Unterseite, dunkle Unterflügeldecken und breite dunkle Schwanzendbinde. Oberseits braun mit weißem Rückenfleck; beide Geschlechter ähnlich gefärbt.',
      female:
        'Wie der männliche Altvogel gefärbt, im Durchschnitt größer und schwerer.',
      juvenile:
        'Zimtfarbener Körper und hellere, fein gebänderte Schwingen und Schwanzfedern. Die breite dunkle Schwanzendbinde und die kräftige Strichelung fehlen zunächst.',
    },
    juvenileColors: [
      ['Zimtbraun', '#BC8954'],
      ['Beige', '#D6BE94'],
      ['Dunkelbraun', '#564535'],
    ],
    hunt: {
      title: 'Wendige Jagd an Felshängen',
      text: 'Er überrascht Kaninchen und Vögel im schnellen Hangflug oder greift vom Ansitz an. Paare können bei der Jagd zusammenwirken.',
    },
    group: 'Adler',
    tile: null,
    bodyColors: {
      male: {
        eyes: [['Gelbbraun', '#BA984B']],
        legs: [['Gelbe Zehen', '#D7B044']],
        note: 'Die Läufe sind bis zu den Zehen befiedert.',
      },
      female: {
        eyes: [['Gelbbraun', '#BA984B']],
        legs: [['Gelbe Zehen', '#D7B044']],
        note: 'Die Läufe sind bis zu den Zehen befiedert.',
      },
      juvenile: {
        eyes: [['Braun', '#614831']],
        legs: [['Gelbe Zehen', '#D7B044']],
        note: 'Die Läufe sind bis zu den Zehen befiedert.',
      },
    },
  },
  {
    id: 'iberienadler',
    name: 'Iberienadler',
    latin: 'Aquila adalberti',
    aliases: [
      'Spanischer Kaiseradler',
      'Iberischer Kaiseradler',
      'Spanish Imperial Eagle',
    ],
    span: [180, 210],
    length: [75, 84],
    weight: [2400, 3500],
    sexes: {
      male: { weight: [2400, 2900] },
      female: { weight: [2800, 3500] },
    },
    genusLabel: 'Echte Adler',
    intro:
      'Weiße Schultern und ein heller Nacken setzen sich vom dunklen Gefieder dieses Adlers der Iberischen Halbinsel ab.',
    habitat:
      'Mediterrane Eichenhaine, lichte Kiefernwälder und offene Landschaften mit Kaninchenvorkommen. Große Bäume bieten Platz für den Horst.',
    range: 'Spanien & Portugal',
    regions: ['Europa'],
    habitatGroup: 'Wälder & Offenland',
    colors: [
      ['Schwarzbraun', '#302720'],
      ['Goldbeige', '#D2BC89'],
      ['Weiß', '#EBE7DB'],
    ],
    source: 'https://seo.org/ave/aguila-imperial-iberica/',
    sourceName: 'SEO/BirdLife',
    plumageNotes: {
      male: 'Dunkelbrauner Körper, cremefarbener Nacken und auffallend weiße Schultern beziehungsweise Flügelvorderkanten. Die Schwanzbasis ist heller als die Endbinde.',
      female:
        'Gleiches Alterskleid wie beim Männchen, im Durchschnitt größer und schwerer.',
      juvenile:
        'Warm rost- bis gelbbrauner Körper mit dunklen Schwungfedern; die weißen Schultern fehlen. Über gescheckte Zwischenkleider entsteht nach mehreren Jahren das dunkle Alterskleid.',
    },
    juvenileColors: [
      ['Rostbeige', '#C99960'],
      ['Ocker', '#B98243'],
      ['Dunkelbraun', '#4F3D2E'],
    ],
    hunt: {
      title: 'Kaninchenjagd über offenem Land',
      text: 'Von einer Warte oder im Suchflug entdeckt er Kaninchen und stößt auf sie herab. Bei knappem Kaninchenangebot erbeutet er vermehrt Vögel und andere Wirbeltiere.',
    },
    group: 'Adler',
    tile: null,
    bodyColors: {
      male: {
        eyes: [['Gelbbraun', '#BA984B']],
        legs: [['Gelbe Zehen', '#D7B044']],
        note: 'Die Läufe sind bis zu den Zehen befiedert.',
      },
      female: {
        eyes: [['Gelbbraun', '#BA984B']],
        legs: [['Gelbe Zehen', '#D7B044']],
        note: 'Die Läufe sind bis zu den Zehen befiedert.',
      },
      juvenile: {
        eyes: [['Braun', '#614831']],
        legs: [['Gelbe Zehen', '#D7B044']],
        note: 'Die Läufe sind bis zu den Zehen befiedert.',
      },
    },
  },
  {
    id: 'klippenadler',
    name: 'Klippenadler',
    latin: 'Aquila verreauxii',
    aliases: [
      'Verreauxadler',
      'Verreaux’s Eagle',
      "Verreaux's Eagle",
      'Kaffernadler',
    ],
    span: [180, 230],
    length: [75, 96],
    weight: [3000, 5800],
    sexes: {
      male: { weight: [3000, 4200] },
      female: { weight: [3100, 5800] },
    },
    genusLabel: 'Echte Adler',
    intro:
      'Ein schwarzer Felsenspezialist mit weißem Rücken und hellen Flügelfenstern, der vor allem Schliefer jagt.',
    habitat:
      'Felsmassive, Schluchten und steile Berghänge mit Schlieferkolonien; angrenzendes Busch- und Grasland dient ebenfalls der Jagd.',
    range: 'Afrika & südwestliche Arabische Halbinsel',
    regions: ['Afrika', 'Asien'],
    habitatGroup: 'Felslandschaften',
    colors: [
      ['Schwarz', '#222322'],
      ['Schiefergrau', '#555958'],
      ['Weiß', '#ECEBE2'],
    ],
    source: 'https://www.sanbi.org/animal-of-the-week/verreauxs-eagle/',
    sourceName: 'SANBI',
    plumageNotes: {
      male: 'Schwarzes Gefieder, weißes V auf dem Rücken und weißer Bürzel. Im Flug fallen helle Felder an den Handschwingen sowie die zur Basis schmaler werdenden Flügel auf.',
      female:
        'Gleiches schwarz-weißes Alterskleid wie beim Männchen, jedoch meist größer.',
      juvenile:
        'Gelb- bis rostbraunes Gefieder mit dunklem Gesicht und dunkler Kehle. Flügel und Schwanz wirken braun; der weiße Rücken des Altvogels fehlt.',
    },
    juvenileColors: [
      ['Rostbraun', '#A87542'],
      ['Goldbeige', '#CBAA73'],
      ['Schwarzbraun', '#352D26'],
    ],
    hunt: {
      title: 'Überraschungsangriff auf Schliefer',
      text: 'Im Hangaufwind gleitet er dicht an Felsen entlang und überrascht Schliefer vor ihren Verstecken. Jagdpartner können sich ergänzen, indem einer die Aufmerksamkeit der Beute bindet.',
    },
    group: 'Adler',
    tile: null,
    bodyColors: {
      male: {
        eyes: [['Braun', '#614831']],
        legs: [['Gelbe Zehen', '#D7B044']],
        note: 'Die Läufe sind bis zu den Zehen befiedert.',
      },
      female: {
        eyes: [['Braun', '#614831']],
        legs: [['Gelbe Zehen', '#D7B044']],
        note: 'Die Läufe sind bis zu den Zehen befiedert.',
      },
      juvenile: {
        eyes: [['Braun', '#614831']],
        legs: [['Gelbe Zehen', '#D7B044']],
        note: 'Die Läufe sind bis zu den Zehen befiedert.',
      },
    },
  },
  {
    id: 'zwergadler',
    name: 'Zwergadler',
    latin: 'Hieraaetus pennatus',
    aliases: ['Booted Eagle', 'Aquila pennata', 'Hieraaetus pennata'],
    span: [110, 135],
    length: [42, 52],
    weight: [650, 1100],
    sexes: {
      male: { weight: [650, 750] },
      female: { weight: [850, 1100] },
    },
    genusLabel: 'Zwergadler',
    intro:
      'Ein kleiner, wendiger Adler mit heller oder dunkler Morphe und vollständig befiederten Läufen.',
    habitat:
      'Lichte Wälder mit alten Horstbäumen sowie angrenzendes Buschland, Weiden und Felder. Im Winter auch Savannen und andere offene Landschaften.',
    range: 'Südeuropa bis Zentralasien; Afrika & Südasien',
    regions: ['Europa', 'Afrika', 'Asien'],
    habitatGroup: 'Wälder & Offenland',
    colors: [
      ['Cremeweiß', '#ECE5D6'],
      ['Braun', '#795B3C'],
      ['Schwarzbraun', '#342D26'],
    ],
    source: 'https://seo.org/ave/aguila-calzada/',
    sourceName: 'SEO/BirdLife',
    plumageNotes: {
      male: 'Die helle Morphe zeigt einen weißlichen Körper und helle Unterflügeldecken neben dunklen Schwungfedern. Kleine weiße Schulterflecken sind oft von vorn sichtbar.',
      female:
        'Beide Geschlechter kommen in heller und dunkler Morphe vor. Weibchen sind deutlich größer; die Morphe bestimmt nicht das Geschlecht.',
      juvenile:
        'Ähnelt bereits der jeweiligen adulten Morphe. Helle Jungvögel sind oft wärmer beige, mit frisch hell gesäumten Oberflügeldecken und dunklerer Iris.',
    },
    juvenileColors: [
      ['Cremebeige', '#DBC8A6'],
      ['Braun', '#886A49'],
      ['Dunkelbraun', '#3E332A'],
    ],
    hunt: {
      title: 'Steiler Angriff aus dem Suchflug',
      text: 'Er sucht Waldränder und offene Flächen im Kreisflug ab. Mit angelegten Flügeln stürzt er auf kleine Vögel, Eidechsen oder Säugetiere und kann Beute auch zwischen Bäumen verfolgen.',
    },
    group: 'Adler',
    tile: null,
    bodyColors: {
      male: {
        eyes: [['Gelbbraun', '#BA984B']],
        legs: [['Gelbe Zehen', '#D7B044']],
        note: 'Die Läufe sind bis zu den Zehen befiedert.',
      },
      female: {
        eyes: [['Gelbbraun', '#BA984B']],
        legs: [['Gelbe Zehen', '#D7B044']],
        note: 'Die Läufe sind bis zu den Zehen befiedert.',
      },
      juvenile: {
        eyes: [['Braun', '#614831']],
        legs: [['Gelbe Zehen', '#D7B044']],
        note: 'Die Läufe sind bis zu den Zehen befiedert.',
      },
    },
  },
];
