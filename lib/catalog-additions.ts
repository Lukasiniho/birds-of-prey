import type { AdditionalBird } from './additional-birds.ts';

export const catalogAdditions: AdditionalBird[] = [
  {
    id: 'wuestenbussard',
    name: 'Wüstenbussard',
    latin: 'Parabuteo unicinctus',
    aliases: [
      'Harris Hawk',
      'Harris’s Hawk',
      "Harris's Hawk",
      'Harrisbussard',
      'Wuestenbussard',
    ],
    group: 'Bussarde',
    genusLabel: 'Wüstenbussarde',
    tile: null,
    span: 'ca. 105–120',
    weight: 'ca. 515–880',
    unit: 'g',
    intro:
      'Ein ungewöhnlich geselliger Greifvogel: Wüstenbussarde jagen gemeinsam und unterstützen sich bei der Jungenaufzucht.',
    habitat:
      'Halboffene trockene Landschaften mit Dorngebüsch, Mesquite-Bäumen und Kakteen. Im Südwesten Nordamerikas besiedelt er besonders Wüstenbuschland; weiter südlich auch andere offene und locker bewaldete Lebensräume. Einzelne Bäume und große Kakteen bieten Ansitze und Nistplätze.',
    range: 'Südwestliches Nordamerika bis Südamerika',
    regions: ['Nordamerika', 'Südamerika'],
    habitatGroup: 'Wüsten & Dornbuschland',
    colors: [
      ['Schokoladenbraun', '#3B2B22'],
      ['Kastanienbraun', '#9A502E'],
      ['Weiß', '#EEEAE0'],
      ['Schwarzbraun', '#25231F'],
    ],
    prey: [1, 2],
    diet: 'Überwiegend Kaninchen, Hasen und Nagetiere, daneben Vögel und Reptilien.',
    source: 'https://www.allaboutbirds.org/guide/Harriss_Hawk/id',
    sourceName: 'Cornell Lab',
    plumageNotes: {
      male: 'Dunkelbrauner Körper, kastanienbraune Schultern und Hosen. Der lange dunkle Schwanz zeigt eine weiße Basis und eine breite weiße Endbinde.',
      female:
        'Wie das Männchen gefärbt, aber meist deutlich größer und schwerer. Eine eigene Farbzeichnung unterscheidet die Geschlechter nicht.',
      juvenile:
        'Helle Flecken und Strichelung an Bauch und Unterflügeln, fein gebänderte Schwingen und ein schmalerer weißer Schwanzsaum. Wie viel helles Gefieder sichtbar ist, variiert zwischen Individuen.',
    },
    juvenileColors: [
      ['Braun', '#68513A'],
      ['Cremeweiß', '#DCD0B5'],
      ['Dunkelbraun', '#352C25'],
      ['Rostbraun', '#995A39'],
    ],
    bodyColors: {
      male: { eyes: [['Dunkelbraun', '#473121']], legs: [['Gelb', '#DCAA35']] },
      female: {
        eyes: [['Dunkelbraun', '#473121']],
        legs: [['Gelb', '#DCAA35']],
      },
      juvenile: { eyes: [['Braun', '#67503C']], legs: [['Gelb', '#DCAA35']] },
    },
    hunt: {
      title: 'Gemeinsam auf Beutezug',
      text: 'Mehrere Vögel können ein Beutetier aus verschiedenen Richtungen bedrängen oder sich bei der Verfolgung ablösen. Auch am Boden wird gelaufen und gesprungen. Größere Beute wird anschließend innerhalb der Gruppe geteilt.',
    },
  },
  {
    id: 'kronenadler',
    name: 'Kronenadler',
    latin: 'Stephanoaetus coronatus',
    aliases: [
      'Crowned Eagle',
      'African Crowned Eagle',
      'Afrikanischer Kronenadler',
    ],
    group: 'Adler',
    genusLabel: 'Kronenadler',
    tile: null,
    span: 'ca. 150–180',
    weight: 'ca. 2.700–4.700',
    unit: 'g',
    intro:
      'Ein kräftiger Waldadler Afrikas, der mit kurzen breiten Flügeln und langem Steuerschwanz zwischen Baumkronen manövriert.',
    habitat:
      'Tropische Wälder, bewaldete Berglandschaften und dichte Waldstücke mit großen Horstbäumen. Zur Jagd nutzt er auch Lichtungen und Waldränder.',
    range: 'Afrika südlich der Sahara',
    regions: ['Afrika'],
    habitatGroup: 'Tropische Wälder',
    colors: [
      ['Dunkelbraun', '#392F29'],
      ['Rostbeige', '#B99064'],
      ['Cremeweiß', '#DBD1BA'],
      ['Schwarzbraun', '#292622'],
    ],
    prey: [],
    diet: 'Vor allem Säugetiere, darunter Affen und kleine Antilopen; gelegentlich Reptilien.',
    source: 'https://animals.sandiegozoo.org/animals/crowned-eagle',
    sourceName: 'San Diego Zoo',
    plumageNotes: {
      male: 'Dunkler Kopf mit aufrichtbarer Haube, dunkle Oberseite und kräftig gezeichnete cremefarbene bis rötliche Unterseite. Der lange Schwanz ist deutlich quergebändert.',
      female:
        'Ähnlich gezeichnet wie das Männchen, im Mittel größer und schwerer. Die kräftigen Läufe sind bis zu den gelben Zehen befiedert.',
      juvenile:
        'Kopf, Brust und Bauch sind auffallend hell; Rücken und Flügel graubraun mit hellen Federrändern. Das dunkle, kräftig gebänderte Alterskleid bildet sich erst über mehrere Jahre aus.',
    },
    juvenileColors: [
      ['Cremeweiß', '#E8E2D5'],
      ['Graubraun', '#837A6D'],
      ['Dunkelbraun', '#4F473E'],
    ],
    bodyColors: {
      male: {
        eyes: [['Gelb', '#CCB95C']],
        legs: [['Gelbe Zehen', '#D4AC43']],
        note: 'Die Läufe sind befiedert.',
      },
      female: {
        eyes: [['Gelb', '#CCB95C']],
        legs: [['Gelbe Zehen', '#D4AC43']],
        note: 'Die Läufe sind befiedert.',
      },
      juvenile: {
        eyes: [['Graubraun', '#898171']],
        legs: [['Gelbe Zehen', '#D4AC43']],
        note: 'Die Läufe sind befiedert.',
      },
    },
    hunt: {
      title: 'Überraschungsangriff im Wald',
      text: 'Von einem verdeckten Ansitz beobachtet der Kronenadler Lichtungen und Äste. Mit einem kurzen, kraftvollen Flug greift er Säugetiere am Boden oder in den Bäumen. Mitunter jagt ein Paar gemeinsam.',
    },
  },
];
