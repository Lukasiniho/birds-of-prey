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
    span: [105, 120],
    weight: [546, 1633],
    sexes: {
      male: { weight: [546, 850] },
      female: { weight: [766, 1633] },
    },
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
    id: 'kaiseradler',
    name: 'Kaiseradler',
    latin: 'Aquila heliaca',
    aliases: ['Eastern Imperial Eagle', 'Östlicher Kaiseradler'],
    group: 'Adler',
    genusLabel: 'Echte Adler',
    tile: null,
    span: [180, 220],
    weight: [2450, 4550],
    sexes: {
      male: { span: [180, 200], weight: [2450, 2750] },
      female: { span: [200, 220], weight: [3150, 4550] },
    },
    intro:
      'Ein großer, dunkler Adler der Steppen und Auwälder, dessen goldgelber Nacken und weiße Schulterflecken ihn im Alterskleid unverwechselbar machen.',
    habitat:
      'Offene Steppen, Agrarland mit Feldgehölzen sowie lichte Au- und Niederungswälder. Zum Brüten braucht er hohe, frei stehende Bäume mit weitem Blick über die Jagdgebiete.',
    range: 'Südosteuropa bis Zentralasien',
    regions: ['Europa', 'Asien'],
    habitatGroup: 'Steppen & Grasland',
    colors: [
      ['Schwarzbraun', '#2B2521'],
      ['Dunkelbraun', '#4A3B2E'],
      ['Goldbeige', '#C9A86A'],
      ['Weiß', '#E8E4D8'],
    ],
    source:
      'https://peregrinefund.org/explore-raptors-species/eagles/eastern-imperial-eagle',
    sourceName: 'The Peregrine Fund',
    plumageNotes: {
      male: 'Sehr dunkles, fast schwarzbraunes Gefieder mit goldgelbem Scheitel und Nacken. Auf den Schultern leuchten weiße Flecken; der Schwanz ist an der Basis grau und trägt eine breite dunkle Endbinde.',
      female:
        'Das Gefieder entspricht dem des Männchens. Weibchen sind größer und schwerer, was im Flug nur im direkten Vergleich auffällt.',
      juvenile:
        'Junge Kaiseradler sind hell sandfarben bis gelblich mit dunklen Längsstreifen auf Brust und Bauch. Die Schwungfedern sind dunkel mit einem helleren Fenster an den inneren Handschwingen; das dunkle Alterskleid entsteht erst über mehrere Jahre.',
    },
    juvenileColors: [
      ['Sandbeige', '#D5C29A'],
      ['Hellbraun', '#A98F68'],
      ['Dunkelbraun', '#5A4A3A'],
    ],
    bodyColors: {
      male: {
        eyes: [['Bernsteingelb', '#C99A3A']],
        legs: [['Gelbe Zehen', '#D8B23C']],
        note: 'Die Läufe sind bis zu den Zehen befiedert.',
      },
      female: {
        eyes: [['Bernsteingelb', '#C99A3A']],
        legs: [['Gelbe Zehen', '#D8B23C']],
        note: 'Die Läufe sind bis zu den Zehen befiedert.',
      },
      juvenile: {
        eyes: [['Dunkelbraun', '#4E3A2A']],
        legs: [['Gelbe Zehen', '#D8B23C']],
        note: 'Die Läufe sind bis zu den Zehen befiedert.',
      },
    },
    hunt: {
      title: 'Ansitz und niedriger Suchflug',
      text: 'Der Kaiseradler beobachtet Zieselkolonien und Feldränder von einer hohen Warte aus oder gleitet niedrig über die Steppe. Am Boden entdeckte Beute greift er in einem kurzen, flachen Angriff mit ausgestreckten Fängen.',
    },
  },
  {
    id: 'steppenadler',
    name: 'Steppenadler',
    latin: 'Aquila nipalensis',
    aliases: ['Steppe Eagle'],
    group: 'Adler',
    genusLabel: 'Echte Adler',
    tile: null,
    span: [170, 200],
    weight: [2000, 3900],
    sexes: {
      male: { weight: [2000, 3000] },
      female: { weight: [2300, 3900] },
    },
    intro:
      'Ein einfarbig brauner Adler der eurasischen Steppen, der im Winter in riesigen Zügen bis nach Afrika und Indien wandert.',
    habitat:
      'Weite Steppen, Halbwüsten und Grasland mit Zieselkolonien; im Winterquartier auch Savannen und Kulturland. Er brütet häufig am Boden oder auf niedrigen Büschen, Felsen und Masten.',
    range: 'Zentralasien; im Winter Afrika & Südasien',
    regions: ['Asien', 'Afrika'],
    habitatGroup: 'Steppen & Grasland',
    colors: [
      ['Dunkelbraun', '#4B3C2F'],
      ['Braun', '#6E5A45'],
      ['Graubraun', '#8C7B66'],
    ],
    source:
      'https://peregrinefund.org/explore-raptors-species/eagles/steppe-eagle',
    sourceName: 'The Peregrine Fund',
    plumageNotes: {
      male: 'Einfarbig dunkelbraunes Gefieder, mitunter mit einem rostfarbenen Nackenfleck. Der lange gelbe Mundwinkel reicht bis hinter das Auge; die Unterflügel zeigen fein gebänderte Schwungfedern mit dunklem Hinterrand.',
      female:
        'Das Gefieder entspricht dem des Männchens. Weibchen sind im Mittel deutlich größer und schwerer.',
      juvenile:
        'Junge Steppenadler sind heller graubraun und tragen ein breites weißes Band entlang der Unterflügel sowie weiße Hinterränder an Flügeln und Schwanz. Diese Zeichnung verblasst über mehrere Jahre.',
    },
    juvenileColors: [
      ['Hellbraun', '#A08A6C'],
      ['Beige', '#C8B79A'],
      ['Weiß', '#E9E5DA'],
      ['Dunkelbraun', '#57473A'],
    ],
    bodyColors: {
      male: {
        eyes: [['Braun', '#6A4A2E']],
        legs: [['Gelbe Zehen', '#D5B04A']],
        note: 'Die Läufe sind bis zu den Zehen befiedert.',
      },
      female: {
        eyes: [['Braun', '#6A4A2E']],
        legs: [['Gelbe Zehen', '#D5B04A']],
        note: 'Die Läufe sind bis zu den Zehen befiedert.',
      },
      juvenile: {
        eyes: [['Dunkelbraun', '#4A3627']],
        legs: [['Gelbe Zehen', '#D5B04A']],
        note: 'Die Läufe sind bis zu den Zehen befiedert.',
      },
    },
    hunt: {
      title: 'Jagd am Zieselbau',
      text: 'Der Steppenadler wartet oft geduldig am Boden oder auf einer niedrigen Warte neben einem Zieselbau und packt das Tier beim Auftauchen. Daneben sucht er im Gleitflug die Steppe ab und nutzt Heuschreckenschwärme und Aas.',
    },
  },
  {
    id: 'sekretaer',
    name: 'Sekretär',
    latin: 'Sagittarius serpentarius',
    aliases: ['Secretarybird', 'Secretary Bird', 'Sekretaer', 'Sekretärvogel'],
    group: 'Sekretäre',
    genusLabel: 'Sekretäre',
    tile: null,
    span: [190, 215],
    weight: [2300, 4300],
    intro:
      'Ein Greifvogel auf Stelzen: Der Sekretär durchstreift Afrikas Savannen zu Fuß und erlegt Schlangen mit gezielten Tritten.',
    habitat:
      'Offene Savannen, Grasland und leicht bebuschte Ebenen mit einzelnen Schirmakazien, auf denen er nachts ruht und seinen Horst baut. Dichte Wälder und Wüsten meidet er.',
    range: 'Afrika südlich der Sahara',
    regions: ['Afrika'],
    habitatGroup: 'Savanne & Grasland',
    colors: [
      ['Hellgrau', '#C7C6BF'],
      ['Schwarz', '#232323'],
      ['Weiß', '#EBE9E2'],
      ['Orangerot', '#D8633A'],
    ],
    source: 'https://animals.sandiegozoo.org/animals/secretary-bird',
    sourceName: 'San Diego Zoo',
    plumageNotes: {
      male: 'Hellgrauer Körper mit schwarzen Schwungfedern und schwarzen Federhosen, lange rosagraue Beine und eine nackte orangerote Gesichtshaut. Am Hinterkopf ragt ein Schopf aus langen, schwarz gespitzten Federn.',
      female:
        'Das Gefieder entspricht dem des Männchens. Weibchen sind geringfügig kleiner und haben einen etwas kürzeren Schopf.',
      juvenile:
        'Junge Sekretäre wirken bräunlicher grau, die Gesichtshaut ist gelblich statt rot, Schopf und Schwanzfedern sind kürzer. Die Iris ist graubraun und wird erst später dunkelbraun.',
    },
    juvenileColors: [
      ['Graubraun', '#A8A196'],
      ['Schwarzbraun', '#33302C'],
      ['Gelblich', '#D9B36A'],
    ],
    bodyColors: {
      male: {
        eyes: [['Braun', '#5A3E2C']],
        legs: [['Rosagrau', '#C9A8A0']],
        note: 'Die Oberschenkel sind schwarz befiedert.',
      },
      female: {
        eyes: [['Braun', '#5A3E2C']],
        legs: [['Rosagrau', '#C9A8A0']],
        note: 'Die Oberschenkel sind schwarz befiedert.',
      },
      juvenile: {
        eyes: [['Graubraun', '#8A7A6A']],
        legs: [['Rosagrau', '#C9A8A0']],
        note: 'Die Oberschenkel sind schwarz befiedert.',
      },
    },
    hunt: {
      title: 'Jagd zu Fuß mit Tritten',
      text: 'Der Sekretär legt am Tag viele Kilometer zu Fuß zurück und scheucht Beute aus dem Gras. Schlangen und andere Tiere tötet er mit blitzschnellen, kräftigen Tritten und weicht dabei mit erhobenen Flügeln Bissen aus.',
    },
  },
  {
    id: 'andenkondor',
    name: 'Andenkondor',
    latin: 'Vultur gryphus',
    aliases: ['Andean Condor', 'Kondor'],
    group: 'Geier',
    genusLabel: 'Neuweltgeier',
    tile: null,
    span: [270, 320],
    weight: [8000, 15000],
    intro:
      'Der größte flugfähige Greifvogel der Welt: Mit über drei Metern Spannweite segelt der Andenkondor stundenlang ohne Flügelschlag.',
    habitat:
      'Hochgebirge der Anden mit Felswänden und offenen Grasfluren, dazu Küstenwüsten und Steilküsten am Pazifik, wo er nach angespülten Kadavern sucht.',
    range: 'Anden & Pazifikküste Südamerikas',
    regions: ['Südamerika'],
    habitatGroup: 'Gebirge',
    colors: [
      ['Schwarz', '#1F1D1C'],
      ['Weiß', '#ECEAE3'],
      ['Rosarot', '#C97A78'],
    ],
    source: 'https://animals.sandiegozoo.org/animals/andean-condor',
    sourceName: 'San Diego Zoo',
    plumageNotes: {
      male: 'Schwarzes Gefieder mit einer weißen Halskrause aus Daunen und großen weißen Flächen auf den Oberflügeln. Kopf und Hals sind nackt und rötlich; das Männchen trägt einen fleischigen Kamm auf dem Scheitel.',
      female:
        'Ebenfalls schwarz mit weißer Halskrause, aber kleiner, ohne Kamm und mit roter Iris. Die weißen Flügelfelder sind weniger ausgedehnt.',
      juvenile:
        'Junge Kondore sind einfarbig graubraun mit brauner Halskrause und dunkelgrauem, nacktem Kopf. Das schwarz-weiße Alterskleid entsteht erst nach etwa sechs Jahren.',
    },
    juvenileColors: [
      ['Graubraun', '#6E655B'],
      ['Braun', '#8C8073'],
      ['Dunkelgrau', '#3C3A38'],
    ],
    bodyColors: {
      male: {
        eyes: [['Braun', '#6B4A32']],
        legs: [['Grau', '#8E8C88']],
        note: 'Kopf und Hals sind unbefiedert.',
      },
      female: {
        eyes: [['Rot', '#B8382F']],
        legs: [['Grau', '#8E8C88']],
        note: 'Kopf und Hals sind unbefiedert.',
      },
      juvenile: {
        eyes: [['Braun', '#6B4A32']],
        legs: [['Grau', '#8E8C88']],
        note: 'Kopf und Hals sind unbefiedert.',
      },
    },
    hunt: {
      title: 'Segelflug auf Aassuche',
      text: 'Der Andenkondor nutzt Aufwinde an Berghängen und segelt in großer Höhe über weite Gebiete. Kadaver findet er mit den Augen und beobachtet dabei auch andere Aasfresser. Am Fund verdrängt er mit seiner Größe kleinere Geier.',
    },
  },
  {
    id: 'wespenbussard',
    name: 'Wespenbussard',
    latin: 'Pernis apivorus',
    aliases: ['European Honey Buzzard', 'Honey Buzzard'],
    group: 'Bussarde',
    genusLabel: 'Wespenbussarde',
    tile: null,
    span: [120, 145],
    weight: [515, 1050],
    sexes: {
      male: { weight: [515, 945] },
      female: { weight: [530, 1050] },
    },
    intro:
      'Ein Sommergast unserer Wälder, der mit dem Mäusebussard leicht zu verwechseln ist und sich auf die Brut von Wespen spezialisiert hat.',
    habitat:
      'Laub- und Mischwälder mit Lichtungen, Waldwiesen und Waldrändern, in denen er Wespennester aufspürt. Von Mai bis September in Europa, den Winter verbringt er im tropischen Afrika.',
    range: 'Europa; im Winter Afrika',
    regions: ['Europa', 'Afrika'],
    habitatGroup: 'Wälder & Waldränder',
    colors: [
      ['Grau', '#8F8F8A'],
      ['Braun', '#6F5A45'],
      ['Cremeweiß', '#E6E0D2'],
      ['Dunkelbraun', '#4A3B2F'],
    ],
    source:
      'https://www.nabu.de/tiere-und-pflanzen/voegel/portraets/wespenbussard/',
    sourceName: 'NABU',
    plumageNotes: {
      male: 'Kleiner, taubenartiger Kopf mit grauem Gesicht und gelber Iris, braune Oberseite und hell gebänderte Unterseite. Der lange Schwanz trägt eine breite dunkle Endbinde und zwei schmale Binden nahe der Basis.',
      female:
        'Ähnlich dem Männchen, aber mit braunem statt grauem Kopf und stärker gefleckter Unterseite. Weibchen sind etwas größer.',
      juvenile:
        'Junge Wespenbussarde haben eine dunkle Iris, eine leuchtend gelbe Wachshaut und eine gleichmäßiger gebänderte Schwanzzeichnung. Die Unterseite ist oft kräftig gestreift, die Färbung insgesamt sehr variabel.',
    },
    juvenileColors: [
      ['Braun', '#7A6250'],
      ['Beige', '#D3C3A6'],
      ['Dunkelbraun', '#4A3B2F'],
    ],
    bodyColors: {
      male: {
        eyes: [['Gelb', '#D9C24A']],
        legs: [['Gelb', '#D6B33D']],
      },
      female: {
        eyes: [['Gelb', '#D9C24A']],
        legs: [['Gelb', '#D6B33D']],
      },
      juvenile: {
        eyes: [['Dunkelbraun', '#4E3A2A']],
        legs: [['Gelb', '#D6B33D']],
      },
    },
    hunt: {
      title: 'Wespennester ausgraben',
      text: 'Der Wespenbussard folgt heimfliegenden Wespen bis zu ihrem Nest, gräbt es mit den Füßen aus und trägt die Waben mit Larven zum Horst. Dichte Gesichtsfedern und schlitzförmige Nasenlöcher schützen ihn vor Stichen.',
    },
  },
  {
    id: 'bartgeier',
    name: 'Bartgeier',
    latin: 'Gypaetus barbatus',
    aliases: ['Bearded Vulture', 'Lämmergeier', 'Laemmergeier'],
    group: 'Geier',
    genusLabel: 'Bartgeier',
    tile: null,
    span: [250, 290],
    weight: [4500, 7150],
    intro:
      'Der Knochenbrecher der Alpen: Der Bartgeier lebt fast ausschließlich von Knochen und wurde nach seiner Ausrottung erfolgreich wieder angesiedelt.',
    habitat:
      'Hochgebirge mit steilen Felswänden, Schluchten und offenen Hängen oberhalb der Baumgrenze. Er brütet in Felsnischen und nutzt Aufwinde an den Graten für seine Suchflüge.',
    range: 'Alpen, Pyrenäen, Kaukasus bis Himalaya; Ostafrika',
    regions: ['Europa', 'Asien', 'Afrika'],
    habitatGroup: 'Gebirge',
    colors: [
      ['Rostorange', '#D0955A'],
      ['Cremeweiß', '#EAE1CF'],
      ['Schiefergrau', '#4A4A4C'],
      ['Schwarz', '#232323'],
    ],
    source:
      'https://www.lbv.de/ratgeber/naturwissen/artenportraits/detail/bartgeier/',
    sourceName: 'LBV',
    plumageNotes: {
      male: 'Cremefarbener bis rostoranger Kopf und Unterseite, ein schwarzer Augenstreif und der namensgebende Federbart unter dem Schnabel. Flügel und der lange, keilförmige Schwanz sind schiefergrau bis schwarz. Um die hellgelbe Iris leuchtet ein roter Skleralring.',
      female:
        'Das Gefieder entspricht dem des Männchens; die Orangefärbung stammt bei beiden vom Baden in eisenhaltigem Schlamm. Weibchen sind geringfügig größer.',
      juvenile:
        'Junge Bartgeier sind an Kopf und Hals schwarzbraun und am Körper dunkel gescheckt. Die Iris ist braun; das helle Alterskleid entwickelt sich erst über fünf bis sieben Jahre.',
    },
    juvenileColors: [
      ['Schwarzbraun', '#2E2825'],
      ['Dunkelbraun', '#54463B'],
      ['Graubraun', '#8A7E70'],
    ],
    bodyColors: {
      male: {
        eyes: [['Hellgelb mit rotem Ring', '#E5D27A']],
        legs: [['Graue Zehen', '#8F8D89']],
        note: 'Die Läufe sind bis zu den Zehen befiedert.',
      },
      female: {
        eyes: [['Hellgelb mit rotem Ring', '#E5D27A']],
        legs: [['Graue Zehen', '#8F8D89']],
        note: 'Die Läufe sind bis zu den Zehen befiedert.',
      },
      juvenile: {
        eyes: [['Braun', '#5E4634']],
        legs: [['Graue Zehen', '#8F8D89']],
        note: 'Die Läufe sind bis zu den Zehen befiedert.',
      },
    },
    hunt: {
      title: 'Knochen aus der Luft zerschmettern',
      text: 'Der Bartgeier trägt große Knochen in die Höhe und lässt sie aus 50 bis 80 Metern auf Felsplatten fallen, bis sie zerbrechen. Die Splitter und das Mark verschluckt er ganz; seine Magensäure löst den Knochen auf.',
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
    span: [150, 180],
    weight: [2550, 4700],
    sexes: {
      male: { weight: [2550, 4120] },
      female: { weight: [3200, 4700] },
    },
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
