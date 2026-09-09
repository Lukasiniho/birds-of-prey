export type KnowledgeBird = {
  id: string;
  name: string;
  latin: string;
  href: string;
  image: string;
  portrait: string;
};

export type PreyHunter = {
  id: string;
  name: string;
  latin: string;
  href: string;
  portrait: string;
  importance: 'primary' | 'occasional';
  note?: string;
  /** Every prey key this species hunts, for the reverse highlight. */
  prey: string[];
};

export type PreyEntry = {
  key: string;
  name: string;
  hunters: PreyHunter[];
};

export type TechniqueHunter = {
  id: string;
  name: string;
  latin: string;
  href: string;
  portrait: string;
  /** primary when this is the species' leading technique. */
  importance: 'primary' | 'occasional';
  /** Every technique this species uses, for the reverse highlight. */
  techniques: string[];
};

export type TechniqueEntry = {
  id: string;
  label: string;
  text: string;
  /** Hunting scene of a representative species, or its portrait. */
  image: string;
  hunters: TechniqueHunter[];
};

export const falconryRegions = [
  {
    id: 'arabien',
    name: 'Arabien',
    place: 'Arabische Halbinsel · Gegenwart',
    title: 'Falken in der Wüste',
    coordinates: [46.7, 24.7],
    birds: ['sakerfalke', 'wanderfalke', 'lannerfalke'],
    text: 'Auf der Arabischen Halbinsel ist die Falknerei eng mit der Geschichte der Beduinen verbunden. Besonders Saker- und Wanderfalken prägen diese Tradition. Kenntnisse über Vögel, Beute und Landschaft werden über Generationen weitergegeben.',
    detail:
      'Einordnung des Lanners: Auch er wird als Beizvogel eingesetzt, ist aber nicht die charakteristische Leitart der arabischen Falknerei. Hier stehen deshalb Saker- und Wanderfalke im Mittelpunkt.',
    sources: [
      {
        name: 'Middle East Falcon Research Group',
        url: 'https://www.falconryheritage.org/uploads/itemUploads/7890/FALCO%20Nr%207.pdf',
      },
    ],
  },
  {
    id: 'europa',
    name: 'Europa',
    place: 'Deutschland · Gegenwart',
    title: 'Habicht und Wanderfalke',
    coordinates: [10.4, 51.1],
    birds: ['wanderfalke', 'habicht'],
    text: 'Die europäische Falknerei umfasst unterschiedliche regionale Traditionen. In Deutschland gehören Habicht und Wanderfalke zu den klassischen Beizvögeln: der Habicht für den wendigen Verfolgungsflug, der Wanderfalke für die Jagd im freien Luftraum.',
    detail:
      'Heute werden auch amerikanische Arten wie der Wüstenbussard eingesetzt. Falknereitraditionen sind lebendig und nicht auf die heimischen Vogelarten einer Region begrenzt.',
    sources: [
      {
        name: 'Deutscher Falkenorden · Beizvögel',
        url: 'https://d-f-o.de/falknerei/beizvoegel/',
      },
    ],
  },
  {
    id: 'amerika',
    name: 'USA',
    place: 'Nordamerika · Gegenwart',
    title: 'Der Wüstenbussard in der modernen Falknerei',
    coordinates: [-111, 33],
    birds: ['wuestenbussard', 'rotschwanzbussard'],
    text: 'Die nordamerikanische Falknerei machte Wüstenbussard und Rotschwanzbussard auch international als Beizvögel bekannt. Besonders der soziale Wüstenbussard, oft Harris Hawk genannt, ist heute weit über Amerika hinaus in der Falknerei zu finden.',
    detail:
      'Der Kartenpunkt steht für die nordamerikanische Falknereigeschichte. Das natürliche Verbreitungsgebiet des Wüstenbussards reicht vom Südwesten der USA bis nach Südamerika.',
    sources: [
      {
        name: 'North American Falconers Association',
        url: 'https://www.n-a-f-a.com/?page=History',
      },
    ],
  },
  {
    id: 'japan',
    name: 'Japan',
    place: 'Japan · Edo-Zeit',
    title: 'Der Habicht und die Samurai',
    coordinates: [139.7, 35.7],
    birds: ['habicht'],
    text: 'Takagari heißt die japanische Kunst der Beizjagd. Neben der kaiserlichen Hofkultur prägten Samurai und Shōgune ihre Geschichte. Der Habicht war ein besonders geschätzter Jagdgefährte; wertvolle Vögel wurden auch als politische Geschenke überreicht.',
    detail:
      'Unter den Tokugawa-Shōgunen war Falknerei mehr als Jagd: Jagdrechte, Reviere und das Verschenken von Greifvögeln machten gesellschaftlichen Rang und Herrschaft sichtbar.',
    sources: [
      {
        name: 'Japanese Falconry in the Edo Period',
        url: 'https://www.falconryheritage.org/uploads/itemUploads/8608/05_p095.pdf',
      },
    ],
  },
  {
    id: 'persien',
    name: 'Persien & Indien',
    place: 'Persien & Nordindien · Mogulzeit',
    title: 'Beizvögel am Kaiserhof',
    coordinates: [78, 27.2],
    birds: ['sperber'],
    text: 'Persien zählt zu den großen historischen Traditionsregionen der Falknerei. Persische Fachschriften sammelten Wissen über Haltung, Ausbildung und Pflege der Vögel. Auch die Mogulherrscher in Indien waren begeisterte Falkner: Kaiser Akbar schätzte besonders den Sperber.',
    detail:
      'Falknerei verband Jagdkunst mit höfischem Prestige. Ein einziger Ursprungsort der frühen Falknerei lässt sich nicht sicher bestimmen; die persische und die indische Geschichte bilden eigene, miteinander verbundene Kapitel.',
    sources: [
      {
        name: 'International Association for Falconry · Geschichte',
        url: 'https://iaf.org/a-history-of-falconry',
      },
      {
        name: 'Encyclopaedia Iranica · Persische Falknereischriften',
        url: 'https://www.iranicaonline.org/articles/baz-nama-books-or-treatises-on-the-keeping-and-training-of-falcons-containing-information-concerning-various-kinds-of-bird/',
      },
    ],
  },
  {
    id: 'zentralasien',
    name: 'Zentralasien',
    place: 'Kasachstan, Kirgisistan & Westmongolei · Gegenwart',
    title: 'Die Adlerjäger Zentralasiens',
    coordinates: [75, 43],
    birds: ['steinadler'],
    text: 'Berkutchi, die Adlerjäger Zentralasiens, führen Steinadler zur Jagd. In Kasachstan und Kirgisistan ist dieses Wissen Teil regionaler Jagdkultur. In der westmongolischen Provinz Bayan-Ölgii bewahren kasachische Familien dieselbe Tradition und geben sie innerhalb der Familie weiter.',
    detail:
      'Das kirgisische Salbuurun verbindet die Jagd mit Greifvögeln mit der Arbeit der Taigans, einer einheimischen Windhundrasse. Unterschiede zwischen den Regionen liegen in Landschaft, lokaler Weitergabe und der Verbindung mit anderen Jagdformen, nicht in der Herkunft der Tradition.',
    sources: [
      {
        name: 'International Journal of Intangible Heritage · Altai Kazakh Falconry',
        url: 'https://www.ijih.org/volumes/article/469',
      },
      {
        name: 'Takuya Soma · Forschung zur Adlerjagd',
        url: 'https://researchmap.jp/takuyasoma/published_papers/14716474/attachment_file.pdf',
      },
      {
        name: 'World Nomad Games · Burkut Saluu & Salbuurun',
        url: 'https://worldnomadgames.org/en/sport/eagle-hunting/',
      },
    ],
  },
  {
    id: 'britische-inseln',
    name: 'Britische Inseln',
    place: 'England · Spätmittelalter',
    title: 'Welcher Vogel für welchen Stand?',
    coordinates: [-2, 53],
    birds: ['gerfalke', 'wanderfalke', 'habicht'],
    text: 'Ein Greifvogel auf der Faust konnte gesellschaftlichen Rang verkörpern. Das 1486 gedruckte Boke of St Albans enthält eine berühmte Rangordnung, die verschiedenen Ständen bestimmte Beizvögel zuweist. So wird Falknerei zum Spiegel einer hierarchischen Gesellschaft.',
    detail:
      'Diese Liste ist keine verlässliche Vorschrift für die tatsächliche Jagdpraxis. Die British Library betont: Welche Vögel eingesetzt wurden, hing auch von Beute und Gelände ab. Das englische Buch steht hier für ein Beispiel innerhalb der vielfältigen britischen Traditionen.',
    sources: [
      {
        name: 'British Library · A kestrel for a knave',
        url: 'https://www.bl.uk/stories/blogs/posts/a-kestrel-for-a-knave',
      },
    ],
  },
  {
    id: 'nordischer-raum',
    name: 'Island & Skandinavien',
    place: 'Island & Skandinavien · Mittelalter bis frühe Neuzeit',
    title: 'Gerfalken als kostbare Geschenke',
    coordinates: [-19, 65],
    birds: ['gerfalke'],
    text: 'Gerfalken aus dem hohen Norden waren an europäischen und arabischen Höfen begehrt. Besonders helle Vögel galten als Kostbarkeiten. Aus Island gelangten sie über weite Handelswege zu ihren Empfängern und dienten Herrschern auch als diplomatische Geschenke.',
    detail:
      'Der Handel verband Island eng mit Skandinavien: Dänische Könige kontrollierten Fang und Ausfuhr; später brachte ein eigens eingesetztes Falkenschiff die Vögel nach Kopenhagen. Die Karte markiert Island als Herkunftsregion dieses historischen Netzwerks.',
    sources: [
      {
        name: 'Deutsches Schifffahrtsmuseum · Icelandic gyrfalcons',
        url: 'https://fishandships.dsm.museum/?p=328',
      },
      {
        name: 'Mehler, Küchelmann & Holterman · Historischer Gerfalkenhandel',
        url: 'https://www.academia.edu/37525267/The_export_of_gyrfalcons_from_Iceland_during_the_16th_century_a_boundless_business_in_a_proto_globalized_world',
      },
    ],
  },
] as const;
