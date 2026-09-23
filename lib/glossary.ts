export type GlossaryCategory =
  | 'Körper & Gefieder'
  | 'Flug & Jagd'
  | 'Brut & Entwicklung'
  | 'Lebensraum & Zug'
  | 'Falknerei';
export type GlossaryEntry = {
  id: string;
  term: string;
  category: GlossaryCategory;
  definition: string;
  aliases?: string[];
};

export const glossaryCategories: GlossaryCategory[] = [
  'Körper & Gefieder',
  'Flug & Jagd',
  'Brut & Entwicklung',
  'Lebensraum & Zug',
  'Falknerei',
];

export const glossaryEntries: GlossaryEntry[] = (
  [
    {
      id: 'handschwingen',
      term: 'Handschwingen',
      category: 'Körper & Gefieder',
      aliases: ['Handschwinge'],
      definition:
        'Die langen Schwungfedern am äußeren Teil des Flügels. Ihre Form prägt die Flügelspitze: bei vielen Adlern breit aufgefächert, bei Falken eher spitz.',
    },
    {
      id: 'armschwingen',
      term: 'Armschwingen',
      category: 'Körper & Gefieder',
      aliases: ['Armschwinge'],
      definition:
        'Die großen Schwungfedern am Unterarm. Sie bilden den körpernahen Teil der Flügelfläche und tragen zum Auftrieb bei.',
    },
    {
      id: 'schwungfedern',
      term: 'Schwungfedern',
      category: 'Körper & Gefieder',
      aliases: ['Schwungfeder', 'Schwingen'],
      definition:
        'Die großen Flugfedern des Flügels. Zu ihnen gehören Hand- und Armschwingen; die Schwanzfedern heißen dagegen Steuerfedern.',
    },
    {
      id: 'deckfedern',
      term: 'Deckfedern',
      category: 'Körper & Gefieder',
      aliases: [
        'Deckfeder',
        'Flügeldecken',
        'Unterflügeldecken',
        'Oberflügeldecken',
        'Handdecken',
        'Armdecken',
      ],
      definition:
        'Kleinere Federn, die unter anderem die Ansätze der Schwungfedern überdecken. Ober- und Unterflügeldecken können unterschiedlich gefärbt sein und helfen bei der Artbestimmung.',
    },
    {
      id: 'steuerfedern',
      term: 'Steuerfedern',
      category: 'Körper & Gefieder',
      aliases: ['Steuerfeder'],
      definition:
        'Die großen Federn des Schwanzes. Zusammen bilden sie eine Fläche zum Steuern, Bremsen und Stabilisieren im Flug.',
    },
    {
      id: 'stoss',
      term: 'Stoß',
      category: 'Körper & Gefieder',
      aliases: ['Stoßes'],
      definition:
        'Falknersprachliche Bezeichnung für den Schwanz eines Greifvogels. Länge, Form und Zeichnung sind wichtige Merkmale beim Bestimmen.',
    },
    {
      id: 'buerzel',
      term: 'Bürzel',
      category: 'Körper & Gefieder',
      aliases: ['Bürzels'],
      definition:
        'Der hintere Rückenbereich direkt vor dem Schwanzansatz. Ein heller oder anders gefärbter Bürzel kann im Flug auffallen.',
    },
    {
      id: 'fluegelbug',
      term: 'Flügelbug',
      category: 'Körper & Gefieder',
      aliases: ['Flügelbugs'],
      definition:
        'Die vordere Biegung des Flügels im Bereich des Handgelenks. Beim Mäusebussard fällt an dieser Stelle von unten oft ein dunkler Fleck auf.',
    },
    {
      id: 'fingerung',
      term: 'Fingerung',
      category: 'Körper & Gefieder',
      aliases: ['gefingert', 'gefingerte', 'gefingerten'],
      definition:
        'Die einzeln abstehenden Spitzen der äußeren Handschwingen. Sie geben breiten Flügeln im Gleit- und Segelflug ihr fingerartiges Aussehen.',
    },
    {
      id: 'wachshaut',
      term: 'Wachshaut',
      category: 'Körper & Gefieder',
      definition:
        'Die unbefiederte Haut an der Basis des Oberschnabels, in der die Nasenöffnungen liegen. Bei vielen Greifvögeln ist sie gelb.',
    },
    {
      id: 'falkenzahn',
      term: 'Falkenzahn',
      category: 'Körper & Gefieder',
      definition:
        'Ein zahnähnlicher Vorsprung an der Schneide des Oberschnabels vieler Falken. Er hilft ihnen, Beute mit einem gezielten Biss zu töten; es ist kein echter Zahn.',
    },
    {
      id: 'faenge',
      term: 'Fänge',
      category: 'Körper & Gefieder',
      aliases: ['Fängen'],
      definition:
        'Die Füße eines Greifvogels mit ihren Zehen und Krallen. Mit ihnen ergreift und hält er die Beute.',
    },
    {
      id: 'lauf',
      term: 'Lauf',
      category: 'Körper & Gefieder',
      aliases: ['Läufe', 'Läufen'],
      definition:
        'Der Beinabschnitt zwischen dem sichtbaren Fersengelenk und den Zehen. Er kann je nach Art nackt oder befiedert sein, etwa beim Steinadler bis zu den Zehen.',
    },
    {
      id: 'gesichtsschleier',
      term: 'Gesichtsschleier',
      category: 'Körper & Gefieder',
      definition:
        'Eine Anordnung von Federn um das Gesicht, besonders ausgeprägt bei Eulen. Sie lenkt Schall zu den Ohren und unterstützt das Orten von Beute.',
    },
    {
      id: 'federohren',
      term: 'Federohren',
      category: 'Körper & Gefieder',
      definition:
        'Aufrichtbare Federbüschel am Kopf mancher Eulen, etwa des Uhus. Sie sind keine Ohren; die eigentlichen Ohröffnungen liegen seitlich am Kopf unter den Federn.',
    },
    {
      id: 'bartstreif',
      term: 'Bartstreif',
      category: 'Körper & Gefieder',
      aliases: ['Bartstreifen'],
      definition:
        'Ein dunkler Streifen seitlich am Kopf, der von der Schnabelregion nach unten zieht. Beim Wanderfalken ist er besonders markant.',
    },
    {
      id: 'endbinde',
      term: 'Endbinde',
      category: 'Körper & Gefieder',
      aliases: ['Endbinden', 'Schwanzendbinde'],
      definition:
        'Ein quer verlaufendes Farbband nahe dem Ende von Schwanz- oder Flügelfedern. Breite und Kontrast können Art und Alter erkennen lassen.',
    },
    {
      id: 'baenderung',
      term: 'Bänderung',
      category: 'Körper & Gefieder',
      aliases: ['gebändert', 'gebänderte', 'gebänderten', 'Querbänderung'],
      definition:
        'Eine Zeichnung aus mehreren quer verlaufenden Streifen, etwa auf Schwanz, Flügeln oder Körpergefieder.',
    },
    {
      id: 'sperberung',
      term: 'Sperberung',
      category: 'Körper & Gefieder',
      aliases: ['gesperbert', 'gesperberte', 'gesperberten'],
      definition:
        'Eine feine Querbänderung des Körpergefieders. Sie ist beispielsweise auf der Unterseite erwachsener Sperber und Habichte zu sehen.',
    },
    {
      id: 'morphe',
      term: 'Morphe',
      category: 'Körper & Gefieder',
      aliases: ['Morphen', 'Farbmorphe', 'Farbmorphen'],
      definition:
        'Eine wiederkehrende, meist erblich bedingte Farbform innerhalb derselben Art. Helle und dunkle Morphen sind weder eigene Arten noch automatisch verschiedene Altersstufen oder Geschlechter.',
    },
    {
      id: 'mauser',
      term: 'Mauser',
      category: 'Körper & Gefieder',
      aliases: ['mausert', 'mausern'],
      definition:
        'Der regelmäßige Austausch alter Federn gegen neue. Bei Greifvögeln werden die großen Flugfedern gewöhnlich nach und nach erneuert, sodass die Vögel flugfähig bleiben.',
    },
    {
      id: 'geschlechtsdimorphismus',
      term: 'Geschlechtsdimorphismus',
      category: 'Körper & Gefieder',
      definition:
        'Äußerliche Unterschiede zwischen Männchen und Weibchen einer Art, etwa in Größe oder Färbung. Bei vielen Greifvögeln sind die Weibchen größer und schwerer.',
    },
    {
      id: 'ansitzjagd',
      term: 'Ansitzjagd',
      category: 'Flug & Jagd',
      definition:
        'Jagd von einem erhöhten Sitzplatz aus. Der Vogel beobachtet seine Umgebung und startet, sobald er geeignete Beute entdeckt.',
    },
    {
      id: 'ansitz',
      term: 'Ansitz',
      category: 'Flug & Jagd',
      aliases: ['Ansitze', 'Ansitzen'],
      definition:
        'Ein Sitzplatz mit guter Übersicht, etwa ein Ast, Zaunpfahl oder Fels. Er kann zum Ruhen oder als Ausgangspunkt für die Jagd dienen.',
    },
    {
      id: 'ruettelflug',
      term: 'Rüttelflug',
      category: 'Flug & Jagd',
      aliases: ['Rütteln', 'rüttelt', 'rüttelnd'],
      definition:
        'Ein Flug, bei dem der Vogel durch schnelle Flügelschläge und Ausgleichsbewegungen nahezu über derselben Stelle bleibt. Turmfalken suchen so den Boden nach Beute ab.',
    },
    {
      id: 'segelflug',
      term: 'Segelflug',
      category: 'Flug & Jagd',
      definition:
        'Fliegen mit ausgebreiteten Flügeln ohne anhaltende Flügelschläge, wobei Aufwinde die Höhe halten oder vergrößern. Adler und Geier nutzen das für weite, energiesparende Strecken.',
    },
    {
      id: 'gleitflug',
      term: 'Gleitflug',
      category: 'Flug & Jagd',
      definition:
        'Fliegen ohne Flügelschläge, bei dem der Vogel gegenüber der umgebenden Luft allmählich Höhe verliert. Er setzt Höhe in Vorwärtsbewegung um.',
    },
    {
      id: 'thermik',
      term: 'Thermik',
      category: 'Flug & Jagd',
      definition:
        'Aufsteigende Luft, die entsteht, wenn die Sonne den Boden und darüberliegende Luft erwärmt. Kreisende Greifvögel nutzen sie, um mit wenig Kraft Höhe zu gewinnen.',
    },
    {
      id: 'aufwind',
      term: 'Aufwind',
      category: 'Flug & Jagd',
      aliases: ['Aufwinde', 'Aufwinden'],
      definition:
        'Eine nach oben gerichtete Luftströmung. Sie kann durch Erwärmung entstehen oder dort, wo Wind an einem Hang nach oben abgelenkt wird.',
    },
    {
      id: 'stossflug',
      term: 'Stoßflug',
      category: 'Flug & Jagd',
      aliases: ['Sturzflug'],
      definition:
        'Ein schneller, abwärts gerichteter Angriff auf Beute. Der Wanderfalke legt dabei die Flügel stark an und beschleunigt aus großer Höhe.',
    },
    {
      id: 'suchflug',
      term: 'Suchflug',
      category: 'Flug & Jagd',
      aliases: ['Suchflüge', 'Suchflügen'],
      definition:
        'Ein Flug zum systematischen Absuchen eines Gebiets nach Nahrung. Höhe, Tempo und Flügelhaltung unterscheiden sich je nach Art und Lebensraum.',
    },
    {
      id: 'kleptoparasitismus',
      term: 'Kleptoparasitismus',
      category: 'Flug & Jagd',
      aliases: ['Beuteschmarotzen'],
      definition:
        'Das Stehlen bereits erbeuteter Nahrung von anderen Tieren. Ein Greifvogel kann beispielsweise einen anderen so lange bedrängen, bis dieser seine Beute fallen lässt.',
    },
    {
      id: 'gewoelle',
      term: 'Gewölle',
      category: 'Flug & Jagd',
      aliases: ['Gewöll', 'Gewöllen'],
      definition:
        'Ein ausgewürgter Ballen unverdaulicher Nahrungsreste, etwa Haare und Federn. Besonders Eulengewölle enthalten oft gut erhaltene Knochen; Gewölle sind kein Kot.',
    },
    {
      id: 'kropf',
      term: 'Kropf',
      category: 'Flug & Jagd',
      aliases: ['Kropfes'],
      definition:
        'Eine Erweiterung der Speiseröhre, in der viele Greifvögel Nahrung vorübergehend speichern. Eulen besitzen keinen solchen ausgeprägten Nahrungsspeicher.',
    },
    {
      id: 'manteln',
      term: 'Manteln',
      category: 'Flug & Jagd',
      aliases: ['mantelt'],
      definition:
        'Das Abschirmen der Beute mit ausgebreiteten Flügeln und oft gefächertem Schwanz. So schützt ein Greifvogel seine Nahrung vor Konkurrenten.',
    },
    {
      id: 'aas',
      term: 'Aas',
      category: 'Flug & Jagd',
      aliases: ['Kadaver', 'Kadavern'],
      definition:
        'Der Körper oder die Überreste eines toten Tieres als Nahrung. Nicht nur Geier, sondern auch viele Adler, Milane und Bussarde nutzen diese Nahrungsquelle.',
    },
    {
      id: 'horst',
      term: 'Horst',
      category: 'Brut & Entwicklung',
      aliases: ['Horste', 'Horsten', 'Horstes', 'Asthorst', 'Baumhorst'],
      definition:
        'Das Nest großer Vögel, insbesondere vieler Greifvögel. Manche Arten nutzen und erweitern denselben Horst über mehrere Jahre. Nicht alle Greifvögel bauen selbst ein Nest.',
    },
    {
      id: 'gelege',
      term: 'Gelege',
      category: 'Brut & Entwicklung',
      aliases: ['Geleges'],
      definition:
        'Die zu einem Brutversuch gehörenden Eier. Die Gelegegröße nennt ihre Anzahl; daraus lässt sich noch nicht ableiten, wie viele Jungvögel überleben.',
    },
    {
      id: 'balz',
      term: 'Balz',
      category: 'Brut & Entwicklung',
      aliases: ['Balzflug', 'Balzflüge', 'Balzflügen'],
      definition:
        'Verhalten zur Partnerwerbung und Festigung der Paarbindung. Bei Greifvögeln gehören dazu häufig auffällige Flüge, Rufe oder die Übergabe von Beute.',
    },
    {
      id: 'nestling',
      term: 'Nestling',
      category: 'Brut & Entwicklung',
      aliases: ['Nestlinge', 'Nestlingen'],
      definition:
        'Ein Jungvogel, der noch im Nest lebt und von seinen Eltern versorgt wird. Bei Greifvögeln dauert diese Phase je nach Art mehrere Wochen bis Monate.',
    },
    {
      id: 'aestling',
      term: 'Ästling',
      category: 'Brut & Entwicklung',
      aliases: ['Ästlinge', 'Ästlingen'],
      definition:
        'Ein Jungvogel, der das Nest bereits verlassen hat, aber noch nicht sicher fliegt und weiter von seinen Eltern versorgt wird. Er hält sich oft auf Ästen in Nestnähe auf.',
    },
    {
      id: 'fluegge',
      term: 'Flügge',
      category: 'Brut & Entwicklung',
      definition:
        'So weit entwickelt, dass ein Jungvogel fliegen kann. Flügge bedeutet noch nicht selbstständig: Viele junge Greifvögel erhalten danach weiter Nahrung von den Eltern.',
    },
    {
      id: 'bettelflugphase',
      term: 'Bettelflugphase',
      category: 'Brut & Entwicklung',
      definition:
        'Die Zeit nach dem Ausfliegen, in der junge Greifvögel weiter um Nahrung betteln und von ihren Eltern versorgt werden. Dabei üben sie Flug und Jagd.',
    },
    {
      id: 'juvenil',
      term: 'Juvenil',
      category: 'Brut & Entwicklung',
      aliases: [
        'juvenile',
        'juvenilen',
        'juveniler',
        'juvenilem',
        'juveniles',
        'Jugendkleid',
        'Jugendgefieder',
      ],
      definition:
        'Bezeichnung für einen jungen Vogel beziehungsweise sein erstes vollständiges Federkleid. Zeichnung und Färbung können deutlich vom erwachsenen Vogel abweichen.',
    },
    {
      id: 'immatur',
      term: 'Immatur',
      category: 'Brut & Entwicklung',
      aliases: ['immature', 'immaturen'],
      definition:
        'Noch nicht erwachsen. Der Begriff umfasst je nach Zusammenhang mehrere Altersstufen vor dem vollständig ausgeprägten Adultzustand.',
    },
    {
      id: 'subadult',
      term: 'Subadult',
      category: 'Brut & Entwicklung',
      aliases: ['subadulte', 'subadulten'],
      definition:
        'Eine Übergangsstufe kurz vor dem erwachsenen Zustand. Vor allem große Adler können mehrere Jahre brauchen, bis sie das vollständige Alterskleid tragen.',
    },
    {
      id: 'adult',
      term: 'Adult',
      category: 'Brut & Entwicklung',
      aliases: [
        'adulte',
        'adulten',
        'adulter',
        'adultem',
        'adultes',
        'Altvogel',
        'Altvögel',
        'Altvögeln',
        'Altvogels',
        'Alterskleid',
      ],
      definition:
        'Erwachsen beziehungsweise im arttypischen Alterskleid. Das Aussehen allein verrät nicht das genaue Lebensalter; bei manchen Arten wird die Geschlechtsreife vor dem vollständigen Alterskleid erreicht.',
    },
    {
      id: 'habitat',
      term: 'Habitat',
      category: 'Lebensraum & Zug',
      aliases: ['Habitate', 'Habitaten'],
      definition:
        'Der Lebensraum einer Art mit den Bedingungen, die sie zum Leben braucht, etwa Nahrung, Jagdflächen und Brutplätze.',
    },
    {
      id: 'revier',
      term: 'Revier',
      category: 'Lebensraum & Zug',
      aliases: ['Reviere', 'Revieren', 'Reviers', 'Brutrevier', 'Brutreviere'],
      definition:
        'Ein Gebiet, das ein Vogel oder ein Paar gegen Artgenossen verteidigt. Das gesamte genutzte Jagdgebiet kann größer sein als der verteidigte Bereich.',
    },
    {
      id: 'population',
      term: 'Population',
      category: 'Lebensraum & Zug',
      aliases: ['Populationen'],
      definition:
        'Die Individuen einer Art, die in einem bestimmten Gebiet leben und sich dort fortpflanzen. Verschiedene Populationen derselben Art können sich im Zugverhalten unterscheiden.',
    },
    {
      id: 'standvogel',
      term: 'Standvogel',
      category: 'Lebensraum & Zug',
      aliases: ['Standvögel', 'Standvögeln'],
      definition:
        'Ein Vogel, der ganzjährig im Brutgebiet oder dessen Umgebung bleibt. Auch Standvögel können umherstreifen, besonders in ihrer Jugend.',
    },
    {
      id: 'teilzieher',
      term: 'Teilzieher',
      category: 'Lebensraum & Zug',
      aliases: ['Teilziehern'],
      definition:
        'Eine Art oder Population, bei der ein Teil der Vögel saisonal zieht und ein anderer im Brutgebiet bleibt.',
    },
    {
      id: 'zugvogel',
      term: 'Zugvogel',
      category: 'Lebensraum & Zug',
      aliases: ['Zugvögel', 'Zugvögeln'],
      definition:
        'Ein Vogel, der regelmäßig zwischen Brutgebiet und einem saisonalen Aufenthaltsgebiet wandert. Diese Gebiete können nah beieinander oder auf verschiedenen Kontinenten liegen.',
    },
    {
      id: 'langstreckenzieher',
      term: 'Langstreckenzieher',
      category: 'Lebensraum & Zug',
      aliases: ['Langstreckenziehern'],
      definition:
        'Ein Zugvogel, der zwischen Brut- und Überwinterungsgebieten sehr große Entfernungen zurücklegt. Europäische Arten überwintern dabei häufig südlich der Sahara.',
    },
    {
      id: 'durchzuegler',
      term: 'Durchzügler',
      category: 'Lebensraum & Zug',
      aliases: ['Durchzüglern'],
      definition:
        'Ein Vogel, der ein Gebiet auf dem Zug durchquert oder dort rastet. Der Begriff beschreibt sein Auftreten an diesem Ort, nicht die Lebensweise der gesamten Art.',
    },
    {
      id: 'wintergast',
      term: 'Wintergast',
      category: 'Lebensraum & Zug',
      aliases: ['Wintergäste', 'Wintergästen'],
      definition:
        'Ein Vogel, der die Winterzeit in einem Gebiet verbringt, aber anderswo brütet. So kommen im Winter zusätzliche Greifvögel aus nördlichen Regionen nach Mitteleuropa.',
    },
    {
      id: 'unterart',
      term: 'Unterart',
      category: 'Lebensraum & Zug',
      aliases: ['Unterarten'],
      definition:
        'Eine geografisch unterscheidbare Gruppe innerhalb einer Art, die sich in erblichen Merkmalen von anderen Gruppen abhebt. Eine Unterart ist etwas anderes als eine helle oder dunkle Farbmorphe.',
    },
    {
      id: 'beizjagd',
      term: 'Beizjagd',
      category: 'Falknerei',
      aliases: ['Beize'],
      definition:
        'Die Jagd auf frei lebendes Wild mit einem ausgebildeten Greifvogel oder Falken. Sie ist der jagdliche Kern der Falknerei.',
    },
    {
      id: 'beizvogel',
      term: 'Beizvogel',
      category: 'Falknerei',
      aliases: ['Beizvögel', 'Beizvögeln'],
      definition:
        'Ein für die Beizjagd ausgebildeter Vogel, beispielsweise ein Habicht, Wanderfalke oder Steinadler.',
    },
    {
      id: 'terzel',
      term: 'Terzel',
      category: 'Falknerei',
      aliases: ['Terzels'],
      definition:
        'Falknersprachliche Bezeichnung für das Männchen vieler Greifvögel, besonders bei Falken und Habicht. Es ist meist kleiner als das Weibchen.',
    },
    {
      id: 'atzung',
      term: 'Atzung',
      category: 'Falknerei',
      aliases: ['ätzen'],
      definition:
        'Falknersprachlich die Nahrung beziehungsweise das Füttern eines Beizvogels. Auch die Versorgung junger Greifvögel wird als Atzen bezeichnet.',
    },
    {
      id: 'geschueh',
      term: 'Geschüh',
      category: 'Falknerei',
      definition:
        'Die am Lauf befestigten Riemen beziehungsweise Manschetten, an denen ein Beizvogel gesichert werden kann.',
    },
    {
      id: 'federspiel',
      term: 'Federspiel',
      category: 'Falknerei',
      aliases: ['Federspiels'],
      definition:
        'Ein meist mit Federn versehenes Trainingsgerät. Der Vogel lernt, es anzufliegen; es dient unter anderem dem Rückruf und dem Flugtraining.',
    },
  ] satisfies GlossaryEntry[]
).sort((a, b) => a.term.localeCompare(b.term, 'de'));

export function glossaryHref(id: string) {
  return `/wissen?begriff=${encodeURIComponent(id)}#glossar`;
}

export function normalizeGlossarySearch(value: string) {
  return value
    .toLocaleLowerCase('de')
    .replaceAll('ä', 'ae')
    .replaceAll('ö', 'oe')
    .replaceAll('ü', 'ue')
    .replaceAll('ß', 'ss')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

export function filterGlossary(
  query: string,
  category: GlossaryCategory | 'Alle' = 'Alle',
) {
  const words = normalizeGlossarySearch(query)
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  return glossaryEntries.filter((entry) => {
    const text = normalizeGlossarySearch(
      [entry.term, ...(entry.aliases ?? []), entry.definition].join(' '),
    );
    return (
      (category === 'Alle' || entry.category === category) &&
      words.every((word) => text.includes(word))
    );
  });
}
