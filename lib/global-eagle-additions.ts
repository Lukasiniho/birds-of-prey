import type { AdditionalBird } from './additional-birds.ts';

/** Measurements, factual sources and media provenance: docs/global-eagle-additions-20260913.md. */
export const globalEagleAdditions: AdditionalBird[] = [
  {
    id: 'schreiadler',
    name: 'Schreiadler',
    latin: 'Clanga pomarina',
    aliases: ['Aquila pomarina', 'Pommernadler', 'Lesser Spotted Eagle'],
    group: 'Adler',
    tile: null,
    span: [145, 170],
    length: [55, 65],
    weight: [1300, 2200],
    intro:
      'Zwischen alten Wäldern und feuchten Wiesen sucht dieser kleine Adler seine Beute oft zu Fuß.',
    habitat:
      'Störungsarme Wälder zum Brüten, daneben kurzrasige Wiesen, Weiden und Feuchtflächen für die Nahrungssuche.',
    range: 'Europa, Westasien & Afrika',
    colors: [
      ['Braun', '#806449'],
      ['Dunkelbraun', '#45382D'],
      ['Sandbraun', '#AD9069'],
    ],
    source: 'https://www.lifeschreiadler.de/vogelarten/schreiadler/index.html',
    sourceName: 'LIFE Schreiadler',
    regions: ['Europa', 'Asien', 'Afrika'],
    habitatGroup: 'Wälder & Wiesen',
    genusLabel: 'Schreiadler',
    plumageNotes: {
      male: 'Brauner Kopf und Körper, dunklere Schwungfedern und gelbliche Iris. Die Unterflügeldecken sind meist heller als die Schwungfedern; die Geschlechter sind ähnlich gefärbt.',
      female:
        'Gleiches braunes Alterskleid wie beim Männchen. Weibchen sind im Durchschnitt größer; das Gefieder allein trennt die Geschlechter nicht sicher.',
      juvenile:
        'Dunkelbraunes Jugendkleid mit hellen Spitzen an den Flügeldecken, hellem Nackenfleck und noch dunkler Iris. Die hellen Flecken sind meist kleiner als beim jungen Schelladler.',
    },
    juvenileColors: [
      ['Dunkelbraun', '#45382D'],
      ['Sandbeige', '#C2A57D'],
      ['Cremeweiß', '#DFD5BD'],
    ],
    bodyColors: {
      male: { eyes: [['Gelb', '#D6B24F']], legs: [['Gelb', '#D6B24F']] },
      female: { eyes: [['Gelb', '#D6B24F']], legs: [['Gelb', '#D6B24F']] },
      juvenile: {
        eyes: [['Dunkelbraun', '#493729']],
        legs: [['Gelb', '#D6B24F']],
      },
    },
    hunt: {
      title: 'Beutesuche auf der Wiese',
      text: 'Er schreitet über kurzrasige Flächen und greift Mäuse oder Frösche vom Boden. Auch von einem Ansitz und im niedrigen Suchflug hält er nach Beute Ausschau.',
    },
  },
  {
    id: 'keilschwanzadler',
    name: 'Keilschwanzadler',
    latin: 'Aquila audax',
    aliases: ['Wedge-tailed Eagle', 'Wedge Tailed Eagle', 'Eaglehawk'],
    group: 'Adler',
    tile: null,
    span: [180, 250],
    length: [100, 120],
    weight: [2500, 5300],
    sexes: {
      male: { weight: [2500, 4000] },
      female: { weight: [3200, 5300] },
    },
    intro:
      'Mit langen Schwingen und markantem Keilschwanz kreist Australiens größter Adler über offenem Land.',
    habitat:
      'Offene und halboffene Landschaften, lichte Wälder, Grasland und Gebirge mit großen Bäumen oder Felsen als Brutplatz.',
    range: 'Australien & südliches Neuguinea',
    colors: [
      ['Schwarzbraun', '#302C28'],
      ['Dunkelbraun', '#4B3B2D'],
      ['Rostbraun', '#96704D'],
    ],
    source: 'https://animaldiversity.org/accounts/Aquila_audax/',
    sourceName: 'Animal Diversity Web',
    regions: ['Australien & Ozeanien'],
    habitatGroup: 'Offene Landschaften',
    genusLabel: 'Echte Adler',
    plumageNotes: {
      male: 'Überwiegend dunkelbraun bis schwarzbraun, mit wärmerem Nacken und Schultergefieder. Der lange Schwanz endet keilförmig; die Läufe sind bis zu den Zehen befiedert.',
      female:
        'Ähnlich gefärbt wie das Männchen, im Durchschnitt größer und schwerer. Individuelle Alters- und Farbunterschiede sind ausgeprägter als die Unterschiede der Geschlechter.',
      juvenile:
        'Deutlich heller und rötlich bis goldbraun an Kopf, Körper und Flügeldecken. Schwungfedern und Keilschwanz bleiben dunkel; das Gefieder dunkelt über mehrere Jahre nach.',
    },
    juvenileColors: [
      ['Goldbraun', '#BB955D'],
      ['Rostbraun', '#96704D'],
      ['Dunkelbraun', '#4B3B2D'],
    ],
    bodyColors: {
      male: { eyes: [['Braun', '#493729']], legs: [['Elfenbein', '#DFD5BD']] },
      female: {
        eyes: [['Braun', '#493729']],
        legs: [['Elfenbein', '#DFD5BD']],
      },
      juvenile: {
        eyes: [['Braun', '#493729']],
        legs: [['Elfenbein', '#DFD5BD']],
      },
    },
    hunt: {
      title: 'Jagd über offenem Land',
      text: 'Im Segelflug oder von einem Ansitz entdeckt er Kaninchen und andere Beutetiere. Er greift am Boden zu, jagt gelegentlich gemeinsam mit einem Partner und nutzt auch Aas.',
    },
  },
  {
    id: 'philippinenadler',
    name: 'Philippinenadler',
    latin: 'Pithecophaga jefferyi',
    aliases: [
      'Affenadler',
      'Philippine Eagle',
      'Great Philippine Eagle',
      'Monkey-eating Eagle',
    ],
    group: 'Adler',
    tile: null,
    span: [185, 220],
    length: [85, 100],
    weight: [4700, 8000],
    intro:
      'Eine lange Federhaube und ein mächtiger Schnabel kennzeichnen den seltenen Waldadler der Philippinen.',
    habitat:
      'Tropische Wälder mit hohen alten Bäumen, vom Tiefland bis an bewaldete Berghänge. Große zusammenhängende Waldgebiete sind für die Brut wichtig.',
    range: 'Philippinen',
    colors: [
      ['Cremeweiß', '#EEE7D4'],
      ['Dunkelbraun', '#584638'],
      ['Goldbraun', '#BB955D'],
    ],
    source: 'https://www.philippineeaglefoundation.org/philippine-eagle',
    sourceName: 'Philippine Eagle Foundation',
    regions: ['Asien'],
    habitatGroup: 'Tropische Regenwälder',
    genusLabel: 'Philippinenadler',
    plumageNotes: {
      male: 'Helle Unterseite, braune Oberseite und lange, hell gerandete Kopf- und Nackenfedern. Der hohe Schnabel ist blaugrau, die Iris hell graublau.',
      female:
        'Ähnliches Gefieder wie beim Männchen. Weibchen sind im Durchschnitt kräftiger; ein eigenes Farbkleid lässt sich daraus nicht ableiten.',
      juvenile:
        'Flügge Jungvögel ähneln den Altvögeln bereits stark. Helle Säume an Rücken- und Oberflügelfedern sind deutlicher; aus der Unteransicht bleibt der Unterschied gering.',
    },
    juvenileColors: [
      ['Cremeweiß', '#EEE7D4'],
      ['Dunkelbraun', '#584638'],
      ['Sandbeige', '#C2A57D'],
    ],
    bodyColors: {
      male: { eyes: [['Graublau', '#9BAEB3']], legs: [['Gelb', '#D6B24F']] },
      female: { eyes: [['Graublau', '#9BAEB3']], legs: [['Gelb', '#D6B24F']] },
      juvenile: {
        eyes: [['Graublau', '#9BAEB3']],
        legs: [['Gelb', '#D6B24F']],
      },
    },
    hunt: {
      title: 'Überraschung in den Baumkronen',
      text: 'Von wechselnden Ansitzen sucht er den Wald nach Säugetieren und Vögeln ab. Ein kurzer Anflug bringt ihn zur Beute; gelegentlich lenkt ein Partner sie ab, während der andere zugreift.',
    },
  },
];
