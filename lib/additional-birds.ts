import { eagleAdditions } from './eagle-additions.ts';
import { catalogAdditions } from './catalog-additions.ts';
import type { BirdSpecies, Plumage, BodyColors, ColorSwatch } from './birds.ts';
export type AdditionalBird = BirdSpecies & {
  regions: string[];
  habitatGroup: string;
  genusLabel: string;
  plumageNotes: Record<Plumage, string>;
  juvenileColors: ColorSwatch[];
  femaleColors?: ColorSwatch[];
  bodyColors: Record<Plumage, BodyColors>;
  hunt: { title: string; text: string };
};
export const additionalBirds: AdditionalBird[] = [
  ...catalogAdditions,
  ...eagleAdditions,
  {
    id: 'weisskopfseeadler',
    name: 'Weißkopfseeadler',
    latin: 'Haliaeetus leucocephalus',
    group: 'Adler',
    span: [180, 230],
    weight: [3000, 6300],
    intro:
      'Der weiße Kopf und Schwanz leuchten über den Seen und Küsten Nordamerikas.',
    habitat:
      'Fischreiche Seen, Flüsse, Feuchtgebiete und Küsten mit großen Bäumen für Horst und Ansitz.',
    range: 'Nordamerika',
    colors: [
      ['Dunkelbraun', '#443729'],
      ['Schwarzbraun', '#28251F'],
      ['Weiß', '#EEECE2'],
    ],
    source: 'https://www.allaboutbirds.org/guide/bald_eagle/id',
    sourceName: 'Cornell Lab',
    regions: ['Nordamerika'],
    habitatGroup: 'Seen & Küsten',
    genusLabel: 'Seeadler',
    plumageNotes: {
      male: 'Weißer Kopf und Schwanz, dunkelbraune Flügel und gelbe Iris. Das Gefieder entspricht dem des Weibchens.',
      female:
        'Gleiches weiß-braunes Alterskleid wie beim Männchen, im Durchschnitt jedoch größer und schwerer.',
      juvenile:
        'Brauner Kopf, braune Augen und dunkler Schnabel. Flügel und Schwanz sind unregelmäßig hell gemustert; das weiße Alterskleid entsteht über mehrere Jahre.',
    },
    juvenileColors: [
      ['Dunkelbraun', '#46372B'],
      ['Braun', '#826C52'],
      ['Cremeweiß', '#DBD1BD'],
    ],
    bodyColors: {
      male: {
        eyes: [['Blassgelb', '#D7CC90']],
        legs: [['Gelb', '#D7B94D']],
      },
      female: {
        eyes: [['Blassgelb', '#D7CC90']],
        legs: [['Gelb', '#D7B94D']],
      },
      juvenile: {
        eyes: [['Braun', '#705238']],
        legs: [['Gelb', '#D7B94D']],
      },
    },
    hunt: {
      title: 'Fischfang im Vorbeiflug',
      text: 'Von einem Baum oder im Suchflug beobachtet er die Wasseroberfläche. Fische greift er mit vorgestreckten Fängen, nimmt aber auch Aas auf oder stiehlt anderen Vögeln ihre Beute.',
    },
    tile: null,
  },
  {
    id: 'riesenseeadler',
    name: 'Riesenseeadler',
    latin: 'Haliaeetus pelagicus',
    group: 'Adler',
    span: [195, 250],
    weight: [4900, 9500],
    sexes: {
      male: { weight: [4900, 6800] },
      female: { weight: [6200, 9500] },
    },
    intro:
      'Ein gewaltiger Schnabel und weiße Schulterfelder kennzeichnen diesen Seeadler des Nordpazifiks.',
    habitat:
      'Felsige Küsten, Flussmündungen und große Flüsse im Nordosten Asiens; im Winter auch an eisfreien Gewässern.',
    range: 'Nordostasien',
    colors: [
      ['Schwarzbraun', '#332C25'],
      ['Dunkelbraun', '#574533'],
      ['Weiß', '#EFECE0'],
    ],
    source: 'https://animals.sandiegozoo.org/animals/stellers-sea-eagle',
    sourceName: 'San Diego Zoo',
    regions: ['Asien'],
    habitatGroup: 'Seen & Küsten',
    genusLabel: 'Seeadler',
    plumageNotes: {
      male: 'Dunkler Körper mit weißen Schultern, weißen Hosen und weißem Keilschwanz. Der riesige Schnabel und die Fänge sind gelb.',
      female:
        'Gleiches kontrastreiches Alterskleid wie beim Männchen, jedoch meist deutlich schwerer.',
      juvenile:
        'Überwiegend dunkelbraun mit hellen Sprenkeln und noch unvollständig weißem Schwanz. Iris, Schnabel und Fänge sind matter als bei Altvögeln.',
    },
    juvenileColors: [
      ['Rußbraun', '#3B322B'],
      ['Graubraun', '#796B5C'],
      ['Cremeweiß', '#CFC7B5'],
    ],
    bodyColors: {
      male: {
        eyes: [['Gelb', '#D7B94D']],
        legs: [['Orangegelb', '#DEA93C']],
      },
      female: {
        eyes: [['Gelb', '#D7B94D']],
        legs: [['Orangegelb', '#DEA93C']],
      },
      juvenile: {
        eyes: [['Dunkelbraun', '#594335']],
        legs: [['Blassgelb', '#CEC69A']],
      },
    },
    hunt: {
      title: 'Lachsjagd am Wasser',
      text: 'Im Suchflug oder von einem erhöhten Ansitz entdeckt er Fische nahe der Oberfläche. Mit kräftigen Fängen greift er zu und trägt die Beute häufig an Land.',
    },
    tile: null,
  },
  {
    id: 'gaukler',
    name: 'Gaukler',
    latin: 'Terathopius ecaudatus',
    group: 'Adler',
    span: [170, 190],
    weight: [1800, 3000],
    intro:
      'Auf langen Schwingen schaukelt er über Afrikas Savannen; sein Schwanz ist auffallend kurz.',
    habitat:
      'Savannen, lichte Trockenwälder und offene Landschaften mit einzelnen hohen Bäumen.',
    range: 'Afrika südlich der Sahara',
    colors: [
      ['Schwarz', '#252626'],
      ['Kastanienbraun', '#914D30'],
      ['Silbergrau', '#AEB0AD'],
      ['Weiß', '#E6E4DB'],
    ],
    source:
      'https://peregrinefund.org/explore-raptors-species/eagles/bateleur-eagle',
    sourceName: 'The Peregrine Fund',
    regions: ['Afrika'],
    habitatGroup: 'Offene Landschaften',
    genusLabel: 'Gaukler',
    plumageNotes: {
      male: 'Schwarzer Körper, kastanienbrauner Rücken und sehr kurzer Schwanz. Die Unterflügel zeigen eine breite schwarze Hinterkante.',
      female:
        'Ähnelt dem Männchen, hat aber deutlich mehr helle Flächen an den Armschwingen und nur eine schmale dunkle Flügelhinterkante.',
      juvenile:
        'Braunes Gefieder mit hellen Säumen und längerem Schwanz. Die Gesichtshaut ist grünlich graublau und die Fänge sind weißlich statt rot.',
    },
    juvenileColors: [
      ['Braun', '#71503A'],
      ['Dunkelbraun', '#46362B'],
      ['Ockerbeige', '#BA9D72'],
    ],
    bodyColors: {
      male: {
        eyes: [['Dunkelbraun', '#473025']],
        legs: [['Rot', '#C44837']],
      },
      female: {
        eyes: [['Dunkelbraun', '#473025']],
        legs: [['Rot', '#C44837']],
      },
      juvenile: {
        eyes: [['Honigbraun', '#8B683D']],
        legs: [['Gräulichweiß', '#C1C7BB']],
      },
    },
    hunt: {
      title: 'Suchflug über der Savanne',
      text: 'In niedrigem Gleitflug sucht er große Flächen nach kleinen Wirbeltieren und Aas ab. Entdeckt er geeignete Beute am Boden, setzt er zum gezielten Zugriff an.',
    },
    tile: null,
  },
  {
    id: 'aguja',
    name: 'Aguja',
    latin: 'Geranoaetus melanoleucus',
    group: 'Bussarde',
    span: [150, 200],
    weight: [1700, 3200],
    intro:
      'Mit breiten Flügeln und dunklem Brustschild kreist dieser kräftige Bussard über Südamerikas offenen Landschaften.',
    habitat:
      'Offene Berghänge, Grasland und trockene Steppen; vom Andenhochland bis zu südlichen Tiefländern.',
    range: 'Südamerika',
    colors: [
      ['Schiefergrau', '#59636A'],
      ['Dunkelgrau', '#343C40'],
      ['Silbergrau', '#AEB1AF'],
      ['Cremeweiß', '#E7E3D8'],
    ],
    source: 'https://ebird.org/species/bcbeag1',
    sourceName: 'Cornell Lab · eBird',
    regions: ['Südamerika'],
    habitatGroup: 'Gebirge',
    genusLabel: 'Andenbussarde',
    plumageNotes: {
      male: 'Schiefergrauer Kopf und dunkles Brustschild über dem weißen Bauch. Die breiten Flügel und der kurze Schwanz prägen die Silhouette.',
      female:
        'Ähnliches grau-weißes Alterskleid wie beim Männchen, meist aber größer und schwerer.',
      juvenile:
        'Braunes Jugendkleid mit heller Grundfarbe und dunklen Längsflecken an Brust und Bauch. Das einfarbige Brustschild fehlt und der Schwanz ist länger.',
    },
    juvenileColors: [
      ['Dunkelbraun', '#4A382B'],
      ['Braun', '#896448'],
      ['Zimtbeige', '#C5A47A'],
      ['Cremeweiß', '#DBCFB7'],
    ],
    bodyColors: {
      male: {
        eyes: [['Braun', '#765D43']],
        legs: [['Gelb', '#D4B451']],
      },
      female: {
        eyes: [['Braun', '#765D43']],
        legs: [['Gelb', '#D4B451']],
      },
      juvenile: {
        eyes: [['Braun', '#745238']],
        legs: [['Gelb', '#CAB46A']],
      },
    },
    hunt: {
      title: 'Gleitjagd am Hang',
      text: 'Er kreist in aufsteigender Luft über Hängen und Grasland und sucht nach kleinen Säugetieren. Eine entdeckte Beute verfolgt er im Gleitflug und greift am Boden zu.',
    },
    tile: null,
    aliases: ['Andenbussard', 'Kordillerenadler'],
  },
  {
    id: 'uhu',
    name: 'Uhu',
    latin: 'Bubo bubo',
    group: 'Eulen',
    span: [160, 190],
    weight: [1500, 4200],
    sexes: {
      male: { weight: [1500, 2800] },
      female: { weight: [1800, 4200] },
    },
    intro:
      'Mit leisen Flügelschlägen zieht die große Eule in der Dämmerung über ihre Jagdflächen.',
    habitat:
      'Felswände, Steinbrüche und Wälder nahe strukturreicher offener Landschaften.',
    range: 'Europa & Asien',
    colors: [
      ['Ockerbraun', '#AD8350'],
      ['Dunkelbraun', '#493A2C'],
      ['Sandbeige', '#D2B78B'],
      ['Cremeweiß', '#E6DDC9'],
    ],
    source:
      'https://www.lbv.de/ratgeber/naturwissen/artenportraits/detail/uhu/',
    sourceName: 'LBV',
    regions: ['Europa', 'Asien'],
    habitatGroup: 'Felsen & Wälder',
    genusLabel: 'Uhus',
    plumageNotes: {
      male: 'Braun und ockerfarben gemustert, mit dunklen Längsflecken und orangefarbenen Augen. Die Läufe und Zehen sind dicht befiedert.',
      female:
        'Gleiches Grundmuster wie beim Männchen, meist aber größer und schwerer. Die Geschlechter lassen sich am Gefieder kaum unterscheiden.',
      juvenile:
        'Flügge Jungvögel ähneln bereits den Altvögeln. Ihre frischen Schwung- und Schwanzfedern zeigen eine gleichmäßigere Bänderung; eine sichere Altersbestimmung verlangt genaue Federmerkmale.',
    },
    juvenileColors: [
      ['Ockerbeige', '#C6A576'],
      ['Braun', '#896541'],
      ['Dunkelbraun', '#493A2C'],
      ['Cremebeige', '#DFCFAD'],
    ],
    bodyColors: {
      male: {
        eyes: [['Orange', '#DA7C24']],
        legs: [['Beigefarbene Befiederung', '#CDB389']],
      },
      female: {
        eyes: [['Orange', '#DA7C24']],
        legs: [['Beigefarbene Befiederung', '#CDB389']],
      },
      juvenile: {
        eyes: [['Orange', '#D88935']],
        legs: [['Beigefarbene Befiederung', '#D3BC98']],
      },
    },
    hunt: {
      title: 'Leiser Jagdflug',
      text: 'In der Dämmerung und nachts sucht er vom Ansitz oder im niedrigen Flug nach Beute. Entdeckt er ein Tier, nähert er sich mit leisen Flügelschlägen und greift mit seinen kräftigen Fängen zu.',
    },
    tile: null,
  },
  {
    id: 'schwarzmilan',
    name: 'Schwarzmilan',
    latin: 'Milvus migrans',
    group: 'Milane',
    span: [135, 150],
    weight: [630, 950],
    sexes: {
      male: { weight: [630, 920] },
      female: { weight: [740, 950] },
    },
    intro:
      'Mit leicht gegabeltem Schwanz gleitet er über Flüsse, Seen und offene Landschaften.',
    habitat:
      'Gewässerreiche Landschaften mit alten Bäumen sowie offene Felder und Siedlungsränder.',
    range: 'Europa, Asien, Afrika & Australien',
    colors: [
      ['Dunkelbraun', '#493D32'],
      ['Graubraun', '#7D7568'],
      ['Erdbraun', '#806447'],
      ['Schwarzbraun', '#302D28'],
    ],
    source:
      'https://www.lbv.de/ratgeber/naturwissen/artenportraits/detail/schwarzmilan/',
    sourceName: 'LBV',
    regions: ['Europa', 'Asien', 'Afrika', 'Australien'],
    habitatGroup: 'Seen & Küsten',
    genusLabel: 'Milane',
    plumageNotes: {
      male: 'Dunkelbraunes Gefieder, grauer gestreifter Kopf und schwach gegabelter Schwanz. Die Iris wird mit zunehmendem Alter heller und kann gelblich wirken.',
      female:
        'Ähnlich gefärbt wie das Männchen, durchschnittlich etwas größer. Das Gefieder allein erlaubt keine sichere Geschlechtsbestimmung.',
      juvenile:
        'Helle Federsäume verleihen Rücken und Flügeldecken ein geschupptes Muster. Die Iris ist dunkelbraun und die Brust heller mit dunklen Schaftstrichen.',
    },
    juvenileColors: [
      ['Braun', '#816244'],
      ['Dunkelbraun', '#4B3D30'],
      ['Hellbeige', '#CCB48D'],
      ['Graubraun', '#95816A'],
    ],
    bodyColors: {
      male: {
        eyes: [
          ['Hellbraun', '#A68E58'],
          ['Gelblich, ältere Tiere', '#C4B56A'],
        ],
        legs: [['Gelb', '#D9AA36']],
      },
      female: {
        eyes: [
          ['Hellbraun', '#A68E58'],
          ['Gelblich, ältere Tiere', '#C4B56A'],
        ],
        legs: [['Gelb', '#D9AA36']],
      },
      juvenile: {
        eyes: [['Dunkelbraun', '#493829']],
        legs: [['Gelb', '#D9AA36']],
      },
    },
    hunt: {
      title: 'Suchflug am Wasser',
      text: 'Im langsamen Suchflug hält er über Gewässern und offenem Land nach erreichbarer Nahrung Ausschau. Kleine Fische greift er an der Oberfläche auf, daneben nutzt er häufig Aas und andere leicht verfügbare Nahrung.',
    },
    tile: null,
  },
  {
    id: 'rotmilan',
    name: 'Rotmilan',
    latin: 'Milvus milvus',
    group: 'Milane',
    span: [155, 180],
    weight: [800, 1300],
    sexes: {
      male: { weight: [800, 1200] },
      female: { weight: [1000, 1300] },
    },
    intro:
      'Sein langer, tief gegabelter Schwanz steuert ihn elegant über Wiesen und Felder.',
    habitat:
      'Abwechslungsreiche Kulturlandschaften mit Wiesen, Äckern, Feldgehölzen und alten Waldrändern.',
    range: 'Vor allem Europa',
    colors: [
      ['Rostrot', '#AB633C'],
      ['Rotbraun', '#87543B'],
      ['Hellgrau', '#C1BEB1'],
      ['Cremeweiß', '#E7E1D3'],
      ['Schwarzbraun', '#35312B'],
    ],
    source: 'https://www.nabu.de/tiere-und-pflanzen/voegel/portraets/rotmilan/',
    sourceName: 'NABU',
    regions: ['Europa', 'Afrika'],
    habitatGroup: 'Offene Landschaften',
    genusLabel: 'Milane',
    plumageNotes: {
      male: 'Rostrotes Gefieder, heller Kopf und tief gegabelter Schwanz. Große helle Handflügelfelder kontrastieren mit dunklen Flügelspitzen; die Iris ist blassgelb.',
      female:
        'Im Gefieder ähnlich wie das Männchen und im Durchschnitt etwas größer. Einzelne Tiere lassen sich anhand der Größe nicht sicher einem Geschlecht zuordnen.',
      juvenile:
        'Die Brust ist heller und schmal dunkel gestrichelt, die Flügeldecken tragen helle Spitzen. Schwanz und Iris wirken brauner als beim Altvogel.',
    },
    juvenileColors: [
      ['Hellbraun', '#B08B66'],
      ['Braun', '#805F45'],
      ['Cremebeige', '#DCCAA7'],
      ['Dunkelbraun', '#45372C'],
      ['Weißlich', '#E5DFD0'],
    ],
    bodyColors: {
      male: {
        eyes: [['Blassgelb', '#D8CC80']],
        legs: [['Gelb', '#D9AA36']],
      },
      female: {
        eyes: [['Blassgelb', '#D8CC80']],
        legs: [['Gelb', '#D9AA36']],
      },
      juvenile: {
        eyes: [['Braungrau', '#827564']],
        legs: [['Gelb', '#D9AA36']],
      },
    },
    hunt: {
      title: 'Suchflug über Wiesen',
      text: 'Mit langsamen Flügelschlägen und Gleitphasen sucht er offene Flächen nach kleinen Tieren und Aas ab. Sein beweglicher Gabelschwanz hilft ihm beim Steuern, bevor er zum Boden hinabgreift.',
    },
    tile: null,
  },
  {
    id: 'gerfalke',
    name: 'Gerfalke',
    latin: 'Falco rusticolus',
    group: 'Falken',
    span: [110, 135],
    weight: [950, 2000],
    sexes: {
      male: { span: [110, 130], weight: [950, 1300] },
      female: { span: [125, 135], weight: [1400, 2000] },
    },
    intro:
      'Der größte Falke jagt über weite Tundren und arktische Küsten. Die Gefiederfarbe reicht von Weiß bis Dunkelgrau.',
    habitat:
      'Offene Tundra, felsige Küsten und Gebirge. Im Winter auch Grasland und weite Felder.',
    range: 'Arktis der Nordhalbkugel',
    colors: [
      ['Grau', '#8A8E90'],
      ['Dunkelgrau', '#4B4B4A'],
      ['Cremeweiß', '#E8E5DD'],
      ['Graubraun', '#8C7D6E'],
    ],
    source: 'https://www.allaboutbirds.org/guide/Gyrfalcon/lifehistory',
    sourceName: 'Cornell Lab',
    regions: ['Europa', 'Asien', 'Nordamerika'],
    habitatGroup: 'Tundra & Küsten',
    genusLabel: 'Falken',
    plumageNotes: {
      male: 'Graue Farbform mit gebänderter Oberseite und gefleckter Unterseite. Männchen sind deutlich kleiner als Weibchen.',
      female:
        'Gleiche graue Farbform, jedoch kräftigerer Körperbau. Die Gefiederfarbe ist kein verlässliches Geschlechtsmerkmal.',
      juvenile:
        'Graue Jungvögel wirken meist brauner und sind unten längsgestreift. Wachshaut und Füße sind zunächst blaugrau.',
    },
    juvenileColors: [
      ['Graubraun', '#85786C'],
      ['Dunkelbraun', '#554D45'],
      ['Cremeweiß', '#DFD8C9'],
    ],
    bodyColors: {
      male: {
        eyes: [['Dunkelbraun', '#33271E']],
        legs: [['Gelb', '#D7AF39']],
      },
      female: {
        eyes: [['Dunkelbraun', '#33271E']],
        legs: [['Gelb', '#D7AF39']],
      },
      juvenile: {
        eyes: [['Dunkelbraun', '#33271E']],
        legs: [['Blaugrau', '#8D9EAF']],
      },
    },
    hunt: {
      title: 'Tiefe Verfolgungsjagd',
      text: 'Er nähert sich Beutevögeln oft schnell und bodennah entlang der Geländeformen. Bei der anschließenden Verfolgung kann er seine Beute über längere Strecken ermüden.',
    },
    tile: null,
  },
  {
    id: 'sakerfalke',
    name: 'Sakerfalke',
    latin: 'Falco cherrug',
    group: 'Falken',
    span: [110, 125],
    weight: [700, 1300],
    sexes: {
      male: { weight: [700, 900] },
      female: { weight: [970, 1300] },
    },
    intro:
      'Ein kräftiger Falke der eurasischen Steppen, der am Boden und im freien Luftraum jagt.',
    habitat:
      'Steppen, kurzrasige Weiden und offene Agrarlandschaften. Nutzt Felsen und verlassene Nester auf Bäumen oder Masten.',
    range: 'Europa & Asien; Winterquartiere auch in Afrika',
    colors: [
      ['Erdbraun', '#896B4D'],
      ['Dunkelbraun', '#584431'],
      ['Beige', '#CFB992'],
      ['Cremeweiß', '#ECE5D5'],
    ],
    source: 'https://sakerlife3.mme.hu/en/content/saker',
    sourceName: 'MME / Saker LIFE',
    regions: ['Europa', 'Asien', 'Afrika'],
    habitatGroup: 'Steppen & Grasland',
    genusLabel: 'Falken',
    plumageNotes: {
      male: 'Braune Oberseite, heller Kopf und schmaler Bartstreif. Wachshaut und Füße sind im Alterskleid gelb.',
      female:
        'Im Durchschnitt größer und oft etwas dunkler als das Männchen. Die grundlegende Gefiederzeichnung ist ähnlich.',
      juvenile:
        'Dunklerer Kopf und dichtere Längsflecken auf Brust und Bauch. Die anfangs blaugraue Wachshaut und die Füße vergilben erst mit zunehmendem Alter.',
    },
    juvenileColors: [
      ['Dunkelbraun', '#5F4937'],
      ['Braun', '#8B6A4E'],
      ['Beige', '#D1B891'],
      ['Cremeweiß', '#E2D7C3'],
    ],
    bodyColors: {
      male: {
        eyes: [['Dunkelbraun', '#33271E']],
        legs: [['Gelb', '#D7AF39']],
      },
      female: {
        eyes: [['Dunkelbraun', '#33271E']],
        legs: [['Gelb', '#D7AF39']],
      },
      juvenile: {
        eyes: [['Dunkelbraun', '#33271E']],
        legs: [['Blaugrau', '#8FA3B4']],
      },
    },
    hunt: {
      title: 'Jagd über der Steppe',
      text: 'Im niedrigen, schnellen Flug sucht er offene Flächen nach kleinen Säugetieren und Vögeln ab. Er ergreift Beute am Boden oder verfolgt auffliegende Vögel in der Luft.',
    },
    tile: null,
  },
  {
    id: 'lannerfalke',
    name: 'Lannerfalke',
    latin: 'Falco biarmicus',
    group: 'Falken',
    span: [100, 110],
    weight: [500, 900],
    sexes: {
      male: { weight: [500, 600] },
      female: { weight: [700, 900] },
    },
    intro:
      'Mit langen Schwingen verfolgt dieser Falke Vögel über offenen Landschaften und felsigen Hängen.',
    habitat:
      'Trockene Grasländer, Savannen und offene Kulturlandschaften. Felsen und Steilwände bieten häufig den Brutplatz.',
    range: 'Afrika, Südeuropa & Naher Osten',
    colors: [
      ['Blaugrau', '#6F7780'],
      ['Graubraun', '#877C6B'],
      ['Rostbeige', '#B78759'],
      ['Cremeweiß', '#E8DDCA'],
      ['Dunkelbraun', '#4A3D31'],
    ],
    source: 'https://thebdi.org/2026/03/14/lanner-falcon-falco-biarmicus/',
    sourceName: 'Biodiversity & Development Institute',
    regions: ['Afrika', 'Europa', 'Asien'],
    habitatGroup: 'Offene Landschaften',
    genusLabel: 'Falken',
    plumageNotes: {
      male: 'Graue bis graubraune Oberseite, heller Bauch und rostbeiger Scheitel mit Nacken. Füße und Wachshaut sind gelb.',
      female:
        'Gleiches Grundmuster wie beim Männchen, häufig etwas dunkler und deutlich kräftiger.',
      juvenile:
        'Graubraunes Jugendkleid mit kräftigen, verwaschenen Längsstreifen auf beigem Grund. Sehr junge Vögel besitzen zunächst blaugraue Wachshaut und Füße.',
    },
    juvenileColors: [
      ['Graubraun', '#807364'],
      ['Braun', '#614D3B'],
      ['Beige', '#CEB58E'],
      ['Cremeweiß', '#E5D9C4'],
    ],
    bodyColors: {
      male: {
        eyes: [['Dunkelbraun', '#33271E']],
        legs: [['Dunkelgelb', '#C7A436']],
      },
      female: {
        eyes: [['Dunkelbraun', '#33271E']],
        legs: [['Dunkelgelb', '#C7A436']],
      },
      juvenile: {
        eyes: [['Dunkelbraun', '#33271E']],
        legs: [['Blaugrau', '#92A2B1']],
      },
    },
    hunt: {
      title: 'Wendige Verfolgungsjagd',
      text: 'Er überrascht Vögel mit einem schnellen Angriff und verfolgt sie im freien Luftraum. Manchmal jagen zwei Partner gemeinsam, wobei einer die Beute aufscheucht.',
    },
    tile: null,
  },
  {
    id: 'baumfalke',
    name: 'Baumfalke',
    latin: 'Falco subbuteo',
    group: 'Falken',
    span: [75, 85],
    weight: [130, 340],
    sexes: {
      male: { weight: [130, 230] },
      female: { weight: [140, 340] },
    },
    intro:
      'Ein schlanker Flugjäger mit sichelförmigen Flügeln, der Libellen und kleine Vögel in der Luft erbeutet.',
    habitat:
      'Offene Landschaften mit Feldgehölzen und Waldrändern, oft nahe an Feuchtgebieten. Brütet meist in alten Krähennestern.',
    range: 'Europa & Asien; Überwinterung in Afrika und Südasien',
    colors: [
      ['Schiefergrau', '#53606B'],
      ['Schwarzbraun', '#2E2D2C'],
      ['Cremeweiß', '#E7DFD0'],
      ['Rostrot', '#B66D41'],
    ],
    source: 'https://www.bfn.de/artenportraits/falco-subbuteo-baumfalke',
    sourceName: 'Bundesamt für Naturschutz',
    regions: ['Europa', 'Asien', 'Afrika'],
    habitatGroup: 'Offene Landschaften',
    genusLabel: 'Falken',
    plumageNotes: {
      male: 'Schiefergraue Oberseite, dunkler Bartstreif und kräftige Längsstreifen. Rostrote Federn an Schenkeln und Unterschwanz sind typisch für Altvögel.',
      female:
        'Ähnliches Alterskleid wie beim Männchen, im Durchschnitt größer. Die unbefiederten Beine und Füße sind gelb.',
      juvenile:
        'Braunere Oberseite mit hellen Federsäumen und beige Unterseite. Die rostroten Hosen fehlen noch; die Schenkelfedern sind rahmfarben.',
    },
    juvenileColors: [
      ['Graubraun', '#72685D'],
      ['Dunkelbraun', '#413B33'],
      ['Beige', '#CBB58D'],
      ['Cremeweiß', '#E1D7C4'],
    ],
    bodyColors: {
      male: {
        eyes: [['Dunkelbraun', '#33271E']],
        legs: [['Gelb', '#D7AF39']],
      },
      female: {
        eyes: [['Dunkelbraun', '#33271E']],
        legs: [['Gelb', '#D7AF39']],
      },
      juvenile: {
        eyes: [['Dunkelbraun', '#33271E']],
        legs: [['Blassgelb', '#C9B16E']],
      },
    },
    hunt: {
      title: 'Insektenfang im Flug',
      text: 'Mit schnellen Wendungen verfolgt er große Insekten und kleine Vögel über offenen Flächen. Kleine Beute greift er mit den Fängen und führt sie häufig noch im Flug zum Schnabel.',
    },
    tile: null,
  },
  {
    id: 'falklandkarakara',
    name: 'Falklandkarakara',
    latin: 'Daptrius australis',
    group: 'Karakaras',
    span: [115, 125],
    weight: [1200, 1700],
    intro:
      'Ein neugieriger Karakara der südlichsten Inseln Südamerikas, der an Küsten nach sehr unterschiedlicher Nahrung sucht.',
    habitat:
      'Felsige Küsten, Tussockgras und Inseln mit Seevogelkolonien. Im Winter auch Farmen und offene Flächen im Inselinneren.',
    range: 'Falklandinseln & Inseln um Feuerland',
    colors: [
      ['Schwarzbraun', '#322A25'],
      ['Cremeweiß', '#DDD7C6'],
      ['Rostrot', '#985631'],
    ],
    source:
      'https://www.hawkmountain.org/conservation-science/active-research/raptor-conservation-studies/striated-caracaras',
    sourceName: 'Hawk Mountain Sanctuary',
    regions: ['Südamerika'],
    habitatGroup: 'Küsten & Inseln',
    genusLabel: 'Karakaras',
    plumageNotes: {
      male: 'Dunkles Gefieder mit hellen Streifen an Hals und Brust, rostroten Schenkeln und weißer Schwanzspitze. Männchen und Weibchen sind ähnlich gefärbt.',
      female:
        'Gleiches Grundmuster wie beim Männchen. Orangegelbe nackte Gesichtshaut und Beine sind typisch für Altvögel.',
      juvenile:
        'Braunes Jugendkleid mit wenigen hellen Streifen und dunklem Schnabel. Gesichtshaut und Beine sind zunächst blass grau bis rosagrau; die Altersfärbung entsteht über mehrere Jahre.',
    },
    juvenileColors: [
      ['Dunkelbraun', '#4D3A2D'],
      ['Braun', '#79604A'],
      ['Beige', '#B89C77'],
    ],
    bodyColors: {
      male: {
        eyes: [['Dunkelbraun', '#392B24']],
        legs: [['Gelborange', '#E4AA37']],
      },
      female: {
        eyes: [['Dunkelbraun', '#392B24']],
        legs: [['Gelborange', '#E4AA37']],
      },
      juvenile: {
        eyes: [['Dunkelbraun', '#392B24']],
        legs: [['Rosagrau', '#A39B98']],
      },
    },
    hunt: {
      title: 'Nahrungssuche an der Küste',
      text: 'Mit Schnabel und Füßen untersucht er Strandgut, Grasbüschel und den Boden nach Wirbellosen. In Seevogelkolonien nutzt er außerdem Eier, Nestlinge und Aas.',
    },
    tile: null,
    aliases: ['Phalcoboenus australis', 'Falkland-Karakara'],
  },
  {
    id: 'schopfkarakara',
    name: 'Schopfkarakara',
    latin: 'Caracara plancus',
    group: 'Karakaras',
    span: [120, 130],
    weight: [900, 1600],
    intro:
      'Dieser langbeinige Verwandte der Falken ist ebenso geschickt zu Fuß wie im Flug und sucht vielseitig nach Nahrung.',
    habitat:
      'Offene Weiden, Savannen, Kulturland und Halbwüsten mit einzelnen Bäumen. Meidet dichte Bodenvegetation.',
    range: 'Südliche USA bis Feuerland',
    colors: [
      ['Schwarzbraun', '#302C29'],
      ['Cremeweiß', '#E4DECE'],
      ['Braun', '#705C46'],
    ],
    source: 'https://www.allaboutbirds.org/guide/Crested_Caracara/id',
    sourceName: 'Cornell Lab',
    regions: ['Nordamerika', 'Mittelamerika', 'Südamerika'],
    habitatGroup: 'Savannen & Offenland',
    genusLabel: 'Karakaras',
    plumageNotes: {
      male: 'Schwarze Haube, heller Hals, dunkler Körper und helle Flügelfelder. Gesichtshaut und Beine sind gelborange bis orange; dargestellt ist die südliche Form.',
      female:
        'Ähnliche Zeichnung wie beim Männchen, im Mittel etwas größer. Die Gesichtshaut kann ihre Farbe mit der Erregung verändern.',
      juvenile:
        'Braun statt schwarz, heller Hals mit länglicher dunkler Zeichnung. Gesichtshaut und Beine sind blasser und weniger orange als beim Altvogel.',
    },
    juvenileColors: [
      ['Braun', '#79624B'],
      ['Dunkelbraun', '#493B30'],
      ['Cremebeige', '#DBCFB8'],
    ],
    bodyColors: {
      male: {
        eyes: [['Dunkelbraun', '#392B24']],
        legs: [['Gelborange', '#E4AA37']],
      },
      female: {
        eyes: [['Dunkelbraun', '#392B24']],
        legs: [['Gelborange', '#E4AA37']],
      },
      juvenile: {
        eyes: [['Dunkelbraun', '#392B24']],
        legs: [['Graubeige', '#B2A58C']],
      },
    },
    hunt: {
      title: 'Jagd zu Fuß',
      text: 'Auf langen Beinen läuft er durch offene Flächen und greift kleine Tiere am Boden. Mit den Füßen wendet er auch loses Material, um darunter verborgene Nahrung zu finden.',
    },
    tile: null,
  },
  {
    id: 'koenigsbussard',
    name: 'Königsbussard',
    latin: 'Buteo regalis',
    group: 'Bussarde',
    span: [120, 160],
    weight: [980, 2100],
    intro:
      'Ein großer Bussard der nordamerikanischen Grasländer mit rostfarbenen Schultern und bis zu den Zehen befiederten Läufen.',
    habitat:
      'Prärien, weites Grasland und Beifußsteppen im westlichen Nordamerika. Jagt auch auf offenen landwirtschaftlichen Flächen.',
    range: 'Westliches Nordamerika',
    colors: [
      ['Rostbraun', '#A5643D'],
      ['Weiß', '#E9E7DF'],
      ['Graubraun', '#827B70'],
    ],
    source: 'https://www.allaboutbirds.org/guide/Ferruginous_Hawk/id',
    sourceName: 'Cornell Lab',
    regions: ['Nordamerika'],
    habitatGroup: 'Prärien & Grasland',
    genusLabel: 'Bussarde',
    plumageNotes: {
      male: 'Helle Farbform mit weißer Unterseite, rostrotem Rücken und rostfarbenen Beinfedern. Die Iris wird mit dem Alter braun.',
      female:
        'Gleiche helle Farbform, häufig erheblich größer als das Männchen. Eine seltenere dunkle Farbform kommt ebenfalls vor.',
      juvenile:
        'Braunere Oberseite, weißer Bauch und helle Beine mit braunen Flecken. Die Iris ist gelblich; der Schwanz wirkt dunkler als beim Altvogel.',
    },
    juvenileColors: [
      ['Braun', '#89705A'],
      ['Weiß', '#E6E1D5'],
      ['Dunkelbraun', '#5D4F42'],
    ],
    bodyColors: {
      male: {
        eyes: [['Dunkelbraun', '#392B24']],
        legs: [['Gelb', '#DAB24C']],
      },
      female: {
        eyes: [['Dunkelbraun', '#392B24']],
        legs: [['Gelb', '#DAB24C']],
      },
      juvenile: {
        eyes: [['Gelblich', '#D0B466']],
        legs: [['Blassgelb', '#CCB874']],
      },
    },
    hunt: {
      title: 'Beute im offenen Grasland',
      text: 'Von einer Warte oder aus dem Flug sucht er offene Flächen nach Säugetieren ab. Er jagt auch am Boden und wartet gelegentlich vor einem Nagerbau.',
    },
    tile: null,
  },
  {
    id: 'harpyie',
    name: 'Harpyie',
    latin: 'Harpia harpyja',
    group: 'Adler',
    span: [175, 225],
    weight: [4000, 9000],
    sexes: {
      male: { weight: [4000, 6000] },
      female: { weight: [6000, 9000] },
    },
    intro:
      'Mit breiten Flügeln und mächtigen Fängen jagt sie zwischen den Baumkronen des Regenwaldes.',
    habitat:
      'Große, zusammenhängende tropische Tieflandwälder mit alten, hohen Bäumen.',
    range: 'Mittel- & Südamerika',
    colors: [
      ['Schiefergrau', '#72777B'],
      ['Schwarzgrau', '#2F3336'],
      ['Weiß', '#E9E8DE'],
    ],
    source:
      'https://peregrinefund.org/explore-raptors-species/eagles/harpy-eagle',
    sourceName: 'The Peregrine Fund',
    regions: ['Mittelamerika', 'Südamerika'],
    habitatGroup: 'Tropenwald',
    genusLabel: 'Harpyien',
    plumageNotes: {
      male: 'Grauer Kopf mit doppelter Federhaube, dunkles Brustband und weißer Bauch. Die befiederten Schenkel sind dunkel gebändert; die Iris kann grau bis braun wirken.',
      female:
        'Dasselbe graue, schwarze und weiße Alterskleid wie beim Männchen. Das Weibchen ist deutlich größer und schwerer; die Augenfarbe allein ist kein verlässliches Geschlechtsmerkmal.',
      juvenile:
        'Kopf und Unterseite sind weitgehend weiß, Rücken und Flügel hellgrau mit dunkleren Partien. Das dunkle Brustband fehlt zunächst; das Alterskleid entsteht über mehrere Jahre.',
    },
    juvenileColors: [
      ['Weiß', '#EFEEE7'],
      ['Hellgrau', '#B8BBBC'],
      ['Graubraun', '#777573'],
    ],
    bodyColors: {
      male: {
        eyes: [['Grau bis Braun', '#9A968A']],
        legs: [['Gelb', '#D8B647']],
      },
      female: {
        eyes: [['Grau bis Braun', '#9A968A']],
        legs: [['Gelb', '#D8B647']],
      },
      juvenile: {
        eyes: [['Braun', '#79644A']],
        legs: [['Blassgelb', '#D4C177']],
      },
    },
    hunt: {
      title: 'Überraschung in den Baumkronen',
      text: 'Die Harpyie wartet oft lange auf einem Ansitz und sucht die Baumkronen nach Faultieren oder Affen ab. Mit einem kurzen, kräftigen Anflug packt sie die Beute mit ihren großen Fängen.',
    },
    tile: null,
  },
  {
    id: 'kampfadler',
    name: 'Kampfadler',
    latin: 'Polemaetus bellicosus',
    group: 'Adler',
    span: [190, 240],
    weight: [2200, 6500],
    sexes: {
      male: { weight: [2200, 3800] },
      female: { weight: [4400, 6500] },
    },
    intro:
      'Ein mächtiger Segelflieger über Afrikas Savannen, mit dunkler Brust und markant getupftem Bauch.',
    habitat:
      'Offene Savannen, Grasland, lichte Gehölze und Halbwüsten mit großen Bäumen oder anderen hohen Nistplätzen.',
    range: 'Afrika südlich der Sahara',
    colors: [
      ['Schokoladenbraun', '#41372E'],
      ['Schwarzbraun', '#282722'],
      ['Weiß', '#E9E6DB'],
    ],
    source:
      'https://peregrinefund.org/explore-raptors-species/eagles/martial-eagle',
    sourceName: 'The Peregrine Fund',
    regions: ['Afrika'],
    habitatGroup: 'Savanne & Grasland',
    genusLabel: 'Kampfadler',
    plumageNotes: {
      male: 'Dunkelbrauner Kopf, Hals und obere Brust, darüber eine kurze Haube. Der weiße Bauch und die befiederten Beine sind braun getupft; die Iris ist gelb.',
      female:
        'Das Gefieder entspricht dem des Männchens. Weibchen sind deutlich größer und können im Durchschnitt größere Beutetiere schlagen.',
      juvenile:
        'Heller Kopf und weiße, zunächst weitgehend ungezeichnete Unterseite. Das dunkle Brustschild und die kräftigen Bauchflecken fehlen; die Oberseite ist blasser braun und die Iris dunkler als beim Altvogel.',
    },
    juvenileColors: [
      ['Weiß', '#EBE9DF'],
      ['Hellbraun', '#9C8E7A'],
      ['Braun', '#675C50'],
    ],
    bodyColors: {
      male: {
        eyes: [['Gelb', '#D8BD55']],
        legs: [['Blass Graugrün', '#B5BAA0']],
      },
      female: {
        eyes: [['Gelb', '#D8BD55']],
        legs: [['Blass Graugrün', '#B5BAA0']],
      },
      juvenile: {
        eyes: [['Dunkelbraun', '#5C4A35']],
        legs: [['Blass Graugrün', '#B5BAA0']],
      },
    },
    hunt: {
      title: 'Stoß aus großer Höhe',
      text: 'Der Kampfadler sucht im Segelflug nach größeren Vögeln und Säugetieren am Boden. Entdeckt er eine geeignete Beute, greift er sie nach einem steilen Stoß mit seinen kräftigen Fängen.',
    },
    tile: null,
  },
  {
    id: 'virginiauhu',
    name: 'Virginia-Uhu',
    latin: 'Bubo virginianus',
    group: 'Eulen',
    span: [100, 145],
    weight: [680, 2500],
    sexes: {
      male: { weight: [680, 1600] },
      female: { weight: [820, 2500] },
    },
    intro:
      'Gelbe Augen und breite Federohren prägen diese kräftige Eule Amerikas.',
    habitat:
      'Wälder, Feldgehölze, offene Landschaften und Feuchtgebiete mit geeigneten Ansitzen.',
    range: 'Nord- & Südamerika',
    colors: [
      ['Graubraun', '#756A58'],
      ['Dunkelbraun', '#413A2F'],
      ['Ockerbeige', '#BBA079'],
      ['Weiß', '#E9E5D9'],
    ],
    source: 'https://www.allaboutbirds.org/guide/Great_Horned_Owl/id',
    sourceName: 'Cornell Lab of Ornithology',
    regions: ['Nordamerika', 'Südamerika'],
    habitatGroup: 'Wälder & Waldränder',
    genusLabel: 'Uhus',
    plumageNotes: {
      male: 'Graubraunes bis bräunliches Gefieder mit dunkler Querbänderung, weißem Kehlfleck und gelben Augen. Die Färbung variiert regional deutlich.',
      female:
        'Im Gefieder ähnlich wie das Männchen, gewöhnlich größer und schwerer. Läufe und Zehen sind dicht befiedert.',
      juvenile:
        'Flügge Jungvögel ähneln den Altvögeln, wirken anfangs am Kopf weicher und tragen weniger ausgeprägte Federohren. Die Augen sind bereits gelb.',
    },
    juvenileColors: [
      ['Graubeige', '#B5AA93'],
      ['Braun', '#806B50'],
      ['Dunkelbraun', '#493D2F'],
      ['Cremeweiß', '#E4DDCA'],
    ],
    bodyColors: {
      male: {
        eyes: [['Gelb', '#DABB46']],
        legs: [['Graubeige Befiederung', '#C8BA9C']],
      },
      female: {
        eyes: [['Gelb', '#DABB46']],
        legs: [['Graubeige Befiederung', '#C8BA9C']],
      },
      juvenile: {
        eyes: [['Gelb', '#DABB46']],
        legs: [['Graubeige Befiederung', '#C8BA9C']],
      },
    },
    hunt: {
      title: 'Leise Jagd in der Dämmerung',
      text: 'Von einem Ansitz ortet er kleine Säugetiere und Vögel mit Augen und Gehör. Dann nähert er sich im leisen Flug und greift die Beute mit seinen kräftigen Fängen.',
    },
    tile: null,
  },
  {
    id: 'weissstorch',
    name: 'Weißstorch',
    latin: 'Ciconia ciconia',
    group: 'Störche',
    span: [155, 215],
    weight: [2300, 4500],
    intro:
      'Mit gestrecktem Hals und weit ausgebreiteten Flügeln kreist er über Wiesen und Auen.',
    habitat:
      'Feuchte Wiesen, Weiden, Auen und offene Agrarlandschaften mit gut erreichbarer Nahrung.',
    range: 'Europa, Afrika & Asien',
    colors: [
      ['Weiß', '#EEEDE5'],
      ['Schwarz', '#242523'],
    ],
    source:
      'https://www.lfu.bayern.de/natur/vogelmonitoring/weissstorch/index.htm',
    sourceName: 'Bayerisches Landesamt für Umwelt',
    regions: ['Europa', 'Afrika', 'Asien'],
    habitatGroup: 'Feuchtgebiete',
    genusLabel: 'Störche',
    plumageNotes: {
      male: 'Weißes Gefieder mit schwarzen Schwungfedern sowie langen roten Beinen und rotem Schnabel. Im Flug bleiben Hals und Beine ausgestreckt.',
      female:
        'Ähnlich gefärbt wie das Männchen, im Mittel etwas kleiner. Am Gefieder lassen sich die Geschlechter kaum unterscheiden.',
      juvenile:
        'Flügge Jungstörche tragen bereits weißes Körpergefieder. Graubrauner Schnabel, stumpfrote Beine und bräunlich getönte dunkle Deckfedern unterscheiden sie vom Altvogel.',
    },
    juvenileColors: [
      ['Weiß', '#EEEDE5'],
      ['Schwarzbraun', '#3E3930'],
    ],
    bodyColors: {
      male: {
        eyes: [['Dunkelbraun', '#392F29']],
        legs: [['Rot', '#B84A35']],
      },
      female: {
        eyes: [['Dunkelbraun', '#392F29']],
        legs: [['Rot', '#B84A35']],
      },
      juvenile: {
        eyes: [['Dunkelbraun', '#392F29']],
        legs: [['Stumpfrot', '#A05F51']],
      },
    },
    hunt: {
      title: 'Schreitende Nahrungssuche',
      text: 'Langsam schreitet er über Wiesen oder durch flaches Wasser und sucht nach kleinen Tieren. Entdeckt er Beute, stößt er mit seinem langen Schnabel gezielt zu.',
    },
    tile: null,
  },
  {
    id: 'sperber',
    name: 'Sperber',
    latin: 'Accipiter nisus',
    group: 'Habichte & Sperber',
    span: [60, 75],
    weight: [110, 340],
    sexes: {
      male: { span: [60, 65], weight: [110, 200] },
      female: { span: [65, 75], weight: [180, 340] },
    },
    intro:
      'Kurze Flügel und ein langer Schwanz machen ihn zum wendigen Jäger kleiner Vögel.',
    habitat:
      'Wälder, Waldränder, Hecken, Parks und Gärten mit Deckung und vielen kleinen Vögeln.',
    range: 'Europa, Asien & Nordafrika',
    colors: [
      ['Blaugrau', '#73808A'],
      ['Rostorange', '#BE8053'],
      ['Weiß', '#E5E3D8'],
      ['Dunkelgrau', '#4A4B48'],
    ],
    source: 'https://www.nabu.de/tiere-und-pflanzen/voegel/portraets/sperber/',
    sourceName: 'NABU',
    regions: ['Europa', 'Asien', 'Afrika'],
    habitatGroup: 'Wälder & Waldränder',
    genusLabel: 'Habichte & Sperber',
    plumageNotes: {
      male: 'Blaugraue Oberseite und meist rostorange quergebänderte Unterseite. Die Iris adulter Männchen wird orange bis rötlich.',
      female:
        'Deutlich größer, oberseits grau bis braungrau und unterseits weiß mit graubrauner Querbänderung. Ein heller Überaugenstreif ist oft deutlich; die Iris ist gelb bis hellorange.',
      juvenile:
        'Braune Oberseite mit hellen Federsäumen und unregelmäßige braune Flecken auf der hellen Unterseite. Die Iris ist zunächst hellgelb.',
    },
    juvenileColors: [
      ['Braun', '#857157'],
      ['Cremeweiß', '#E0D9C7'],
      ['Dunkelbraun', '#524737'],
      ['Hellbeige', '#C8B898'],
    ],
    bodyColors: {
      male: {
        eyes: [['Orange', '#D88635']],
        legs: [['Gelb', '#D6B247']],
      },
      female: {
        eyes: [['Gelb bis Hellorange', '#D6AD50']],
        legs: [['Gelb', '#D6B247']],
      },
      juvenile: {
        eyes: [['Hellgelb', '#DECF79']],
        legs: [['Gelb', '#D6B247']],
      },
    },
    hunt: {
      title: 'Überraschungsjagd aus Deckung',
      text: 'Er nutzt Hecken, Bäume und andere Deckung, um sich kleinen Vögeln unbemerkt zu nähern. Mit kurzen Flügelschlägen und engem Wenden verfolgt er seine Beute durch die Vegetation.',
    },
    tile: null,
  },
];
