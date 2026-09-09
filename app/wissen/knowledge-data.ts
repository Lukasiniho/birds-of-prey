export type KnowledgeBird = {
  id: string;
  name: string;
  latin: string;
  href: string;
  image: string;
  portrait: string;
};

export const flightModes = [
  {
    id: 'kreisen',
    name: 'Kreisen',
    bird: 'maeusebussard',
    title: 'Mit der warmen Luft nach oben',
    text: 'Über sonnengewärmtem Boden steigt Luft auf. Der Mäusebussard bleibt mit weiten Kreisen in diesem Aufwind und kann so Höhe gewinnen, ohne ständig mit den Flügeln zu schlagen.',
    watch:
      'Ausgebreitete Flügel, gespreizte Handschwingen und eine leichte Schräglage in der Kurve.',
    force: 'Aufsteigende Luft',
    movement: 'Kreisend aufwärts',
  },
  {
    id: 'gleiten',
    name: 'Gleiten',
    bird: 'maeusebussard',
    title: 'Höhe wird zu Strecke',
    text: 'Beim Gleiten bleiben die Flügel ausgebreitet. In ruhender Luft verliert der Vogel dabei allmählich Höhe. So gelangt er beispielsweise vom einen Aufwind zum nächsten.',
    watch:
      'Ruhige Flügel und eine flach abwärts gerichtete Flugbahn. Kleine Korrekturen halten den Vogel auf Kurs.',
    force: 'Gespeicherte Höhe',
    movement: 'Vorwärts und abwärts',
  },
  {
    id: 'ruetteln',
    name: 'Rütteln',
    bird: 'turmfalke',
    title: 'Ein fester Blick zum Boden',
    text: 'Mit raschen Flügelschlägen hält sich der Turmfalke annähernd über derselben Stelle. Der Kopf bleibt möglichst ruhig, während er den Boden nach Beute absucht. Gegenwind kann ihn dabei unterstützen.',
    watch:
      'Aktive Flügel, aufgefächerter Schwanz und wenig Ortsveränderung. Die Bewegung ist zur Beobachtung verlangsamt.',
    force: 'Flügelschläge und Wind',
    movement: 'Annähernd ortsfest',
  },
  {
    id: 'schlagflug',
    name: 'Schlagflug',
    bird: 'wanderfalke',
    title: 'Mit eigener Kraft vorwärts',
    text: 'Flügelschläge erzeugen Auftrieb und Vortrieb. Der Wanderfalke kann damit beschleunigen, Strecke zurücklegen oder Höhe gewinnen. Der Rhythmus verändert sich mit der Flugsituation.',
    watch:
      'Wiederholte Ab- und Aufschläge bei gleichzeitiger Vorwärtsbewegung. Die Bewegung ist zur Beobachtung verlangsamt.',
    force: 'Muskelkraft',
    movement: 'Aktiv vorwärts',
  },
] as const;
export type FlightMode = (typeof flightModes)[number]['id'];

export const falconryRegions = [
  {
    id: 'mongolei',
    name: 'Mongolei',
    place: 'Altai · Westmongolei',
    title: 'Adlerjäger im Altai',
    coordinates: [89.96, 48.97],
    birds: ['steinadler'],
    tag: 'Kasachische Adlerjagd',
    text: 'In der westmongolischen Provinz Bayan-Ölgii bewahren kasachische Adlerjäger die Jagd mit dem Steinadler. Die Tradition verbindet den Umgang mit dem Vogel mit dem Leben in der Bergsteppe und wird innerhalb von Familien weitergegeben.',
    detail:
      'Ein regionales Beispiel zentralasiatischer Adlerjagd: Verwandte Traditionen gibt es auch in Kasachstan und Kirgisistan.',
    source:
      'https://researchmap.jp/takuyasoma/published_papers/14716474/attachment_file.pdf',
    sourceName: 'Takuya Soma · Forschung zur Adlerjagd',
  },
  {
    id: 'arabien',
    name: 'Arabien',
    place: 'Arabische Halbinsel',
    title: 'Falken in der Wüste',
    coordinates: [46.7, 24.7],
    birds: ['sakerfalke', 'wanderfalke', 'lannerfalke'],
    tag: 'Falken und Wüstenkultur',
    text: 'Auf der Arabischen Halbinsel ist die Falknerei eng mit der Geschichte der Beduinen verbunden. Besonders Saker- und Wanderfalken prägen diese Tradition. Kenntnisse über Vögel, Beute und Landschaft werden über Generationen weitergegeben.',
    detail:
      'Einordnung des Lanners: Auch er wird als Beizvogel eingesetzt, ist aber nicht die charakteristische Leitart der arabischen Falknerei. Hier stehen deshalb Saker- und Wanderfalke im Mittelpunkt.',
    source:
      'https://www.falconryheritage.org/uploads/itemUploads/7890/FALCO%20Nr%207.pdf',
    sourceName: 'Middle East Falcon Research Group',
  },
  {
    id: 'europa',
    name: 'Europa',
    place: 'Beispiel Deutschland',
    title: 'Habicht und Wanderfalke',
    coordinates: [10.4, 51.1],
    birds: ['habicht', 'wanderfalke'],
    tag: 'Europäische Beizjagd',
    text: 'Die europäische Falknerei umfasst unterschiedliche regionale Traditionen. In Deutschland gehören Habicht und Wanderfalke zu den klassischen Beizvögeln: der Habicht für den wendigen Verfolgungsflug, der Wanderfalke für die Jagd im freien Luftraum.',
    detail:
      'Heute werden auch amerikanische Arten wie der Wüstenbussard eingesetzt. Falknereitraditionen sind lebendig und nicht auf die heimischen Vogelarten einer Region begrenzt.',
    source: 'https://d-f-o.de/falknerei/beizvoegel/',
    sourceName: 'Deutscher Falkenorden · Beizvögel',
  },
  {
    id: 'amerika',
    name: 'USA',
    place: 'Nordamerika · weltweit verbreitet',
    title: 'Der Wüstenbussard in der modernen Falknerei',
    coordinates: [-111, 33],
    birds: ['wuestenbussard', 'rotschwanzbussard'],
    tag: 'Harris Hawk',
    text: 'Die nordamerikanische Falknerei machte Wüstenbussard und Rotschwanzbussard auch international als Beizvögel bekannt. Besonders der soziale Wüstenbussard, oft Harris Hawk genannt, ist heute weit über Amerika hinaus in der Falknerei zu finden.',
    detail:
      'Der Kartenpunkt steht für die nordamerikanische Falknereigeschichte. Das natürliche Verbreitungsgebiet des Wüstenbussards reicht vom Südwesten der USA bis nach Südamerika.',
    source: 'https://www.n-a-f-a.com/?page=History',
    sourceName: 'North American Falconers Association',
  },
] as const;
