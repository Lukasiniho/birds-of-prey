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
  {
    id: 'japan',
    name: 'Japan',
    place: 'Japan · Takagari',
    title: 'Der Habicht und die Samurai',
    coordinates: [139.7, 35.7],
    birds: ['habicht'],
    tag: 'Jagd als Herrschaftssymbol',
    text: 'Takagari heißt die japanische Kunst der Beizjagd. Neben der kaiserlichen Hofkultur prägten Samurai und Shōgune ihre Geschichte. Der Habicht war ein besonders geschätzter Jagdgefährte; wertvolle Vögel wurden auch als politische Geschenke überreicht.',
    detail:
      'Unter den Tokugawa-Shōgunen war Falknerei mehr als Jagd: Jagdrechte, Reviere und das Verschenken von Greifvögeln machten gesellschaftlichen Rang und Herrschaft sichtbar.',
    source:
      'https://www.falconryheritage.org/uploads/itemUploads/8608/05_p095.pdf',
    sourceName: 'Japanese Falconry in the Edo Period',
  },
  {
    id: 'persien',
    name: 'Persien & Indien',
    place: 'Persien · Mogulreich in Nordindien',
    title: 'Beizvögel am Kaiserhof',
    coordinates: [78, 27.2],
    birds: ['sperber'],
    tag: 'Höfische Falknerei',
    text: 'Persien zählt zu den großen historischen Traditionsregionen der Falknerei. Persische Fachschriften sammelten Wissen über Haltung, Ausbildung und Pflege der Vögel. Auch die Mogulherrscher in Indien waren begeisterte Falkner: Kaiser Akbar schätzte besonders den Sperber.',
    detail:
      'Falknerei verband Jagdkunst mit höfischem Prestige. Ein einziger Ursprungsort der frühen Falknerei lässt sich nicht sicher bestimmen; die persische und die indische Geschichte bilden eigene, miteinander verbundene Kapitel.',
    source: 'https://iaf.org/a-history-of-falconry',
    sourceName: 'International Association for Falconry · Geschichte',
    additionalSource:
      'https://www.iranicaonline.org/articles/baz-nama-books-or-treatises-on-the-keeping-and-training-of-falcons-containing-information-concerning-various-kinds-of-bird/',
    additionalSourceName:
      'Encyclopaedia Iranica · Persische Falknereischriften',
  },
  {
    id: 'zentralasien',
    name: 'Zentralasien',
    place: 'Kasachstan · Kirgisistan',
    title: 'Mit Adler und Taigan',
    coordinates: [75, 43],
    birds: ['steinadler'],
    tag: 'Berkutchi & Salbuurun',
    text: 'Berkutchi, die Adlerjäger Zentralasiens, führen Steinadler zur Jagd. In Kasachstan und Kirgisistan ist dieses Wissen Teil regionaler Jagdkultur. Das kirgisische Salbuurun verbindet die Jagd mit Greifvögeln mit der Arbeit der Taigans, einer einheimischen Windhundrasse.',
    detail:
      'Eine eigene regionale Perspektive, aber keine getrennte Herkunft: Die Adlerjäger der Westmongolei gehören ebenfalls zur kasachischen Tradition. Unterschiede liegen unter anderem in Landschaft, lokaler Weitergabe und der Verbindung mit anderen Jagdformen.',
    source: 'https://worldnomadgames.org/en/sport/eagle-hunting/',
    sourceName: 'World Nomad Games · Burkut Saluu & Salbuurun',
    additionalSource: 'https://www.ijih.org/volumes/article/469',
    additionalSourceName:
      'International Journal of Intangible Heritage · Altai Kazakh Falconry',
  },
  {
    id: 'britische-inseln',
    name: 'Britische Inseln',
    place: 'Britische Inseln · England im Spätmittelalter',
    title: 'Welcher Vogel für welchen Stand?',
    coordinates: [-2, 53],
    birds: ['gerfalke', 'wanderfalke', 'habicht'],
    tag: 'Boke of St Albans · 1486',
    text: 'Ein Greifvogel auf der Faust konnte gesellschaftlichen Rang verkörpern. Das 1486 gedruckte Boke of St Albans enthält eine berühmte Rangordnung, die verschiedenen Ständen bestimmte Beizvögel zuweist. So wird Falknerei zum Spiegel einer hierarchischen Gesellschaft.',
    detail:
      'Diese Liste ist keine verlässliche Vorschrift für die tatsächliche Jagdpraxis. Die British Library betont: Welche Vögel eingesetzt wurden, hing auch von Beute und Gelände ab. Das englische Buch steht hier für ein Beispiel innerhalb der vielfältigen britischen Traditionen.',
    source: 'https://www.bl.uk/stories/blogs/posts/a-kestrel-for-a-knave',
    sourceName: 'British Library · A kestrel for a knave',
  },
  {
    id: 'nordischer-raum',
    name: 'Island & Skandinavien',
    place: 'Island · Skandinavische Höfe und Handelswege',
    title: 'Gerfalken als kostbare Geschenke',
    coordinates: [-19, 65],
    birds: ['gerfalke'],
    tag: 'Handel & Diplomatie',
    text: 'Gerfalken aus dem hohen Norden waren an europäischen und arabischen Höfen begehrt. Besonders helle Vögel galten als Kostbarkeiten. Aus Island gelangten sie über weite Handelswege zu ihren Empfängern und dienten Herrschern auch als diplomatische Geschenke.',
    detail:
      'Der Handel verband Island eng mit Skandinavien: Dänische Könige kontrollierten Fang und Ausfuhr; später brachte ein eigens eingesetztes Falkenschiff die Vögel nach Kopenhagen. Die Karte markiert Island als Herkunftsregion dieses historischen Netzwerks.',
    source: 'https://fishandships.dsm.museum/?p=328',
    sourceName: 'Deutsches Schifffahrtsmuseum · Icelandic gyrfalcons',
    additionalSource:
      'https://www.academia.edu/37525267/The_export_of_gyrfalcons_from_Iceland_during_the_16th_century_a_boundless_business_in_a_proto_globalized_world',
    additionalSourceName:
      'Mehler, Küchelmann & Holterman · Historischer Gerfalkenhandel',
  },
] as const;
