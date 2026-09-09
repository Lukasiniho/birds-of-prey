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

/** A map region or a timeline era: both feed the same notes panel. */
export type FalconryChapter = {
  id: string;
  place: string;
  title: string;
  birds: readonly string[];
  text: string;
  detail: string;
  sources: readonly { name: string; url: string }[];
};

// The timeline adds the missing axis to the map: rounded dates, one
// station per turning point, and the four single topics folded into the
// era they belong to (Frederick II, equipment transfer, falconers' German,
// falconry today).
export const falconryEras = [
  {
    id: 'ursprung',
    era: 'vor rund 4000 Jahren',
    name: 'Ursprünge in der Steppe',
    summary: 'Reiternomaden Zentralasiens jagen mit Greifvögeln.',
    place: 'Zentralasiatische Steppe · vor rund 4000 Jahren',
    title: 'Ursprünge in der Steppe',
    birds: ['steinadler'],
    text: 'Die Falknerei entstand vermutlich in den Steppen Zentralasiens, wo Reiternomaden Greifvögel für die Jagd in offener Landschaft abrichteten. Ein genauer Ort und ein genaues Datum lassen sich nicht belegen; die UNESCO geht von mehr als 4000 Jahren zurück.',
    detail:
      'Die Adlerjagd der Berkutchi in Kasachstan, Kirgisistan und der Westmongolei gilt als lebendige Fortsetzung dieser frühen Form: zu Pferd, in weiter Landschaft und mit dem Steinadler als Beizvogel.',
    sources: [
      {
        name: 'UNESCO · Falconry, a living human heritage',
        url: 'https://ich.unesco.org/en/RL/falconry-a-living-human-heritage-01708',
      },
      {
        name: 'International Association for Falconry · A history of falconry',
        url: 'https://iaf.org/a-history-of-falconry',
      },
    ],
  },
  {
    id: 'ausbreitung',
    era: 'Antike bis 7. Jh.',
    name: 'Ausbreitung nach Ostasien und in den Nahen Osten',
    summary: 'Falknerei erreicht China, Japan, Persien und Arabien.',
    place: 'Von China bis Arabien · Antike bis 7. Jh.',
    title: 'Ausbreitung entlang der Handelswege',
    birds: ['sakerfalke', 'wanderfalke'],
    text: 'Aus der Steppe verbreitete sich die Kunst in beide Richtungen: nach Osten über China bis nach Japan, wo sie ab dem 4. Jahrhundert schriftlich belegt ist, und nach Westen nach Persien und auf die Arabische Halbinsel. In Persien entstanden eigene Lehrbücher, die Baz-Nama.',
    detail:
      'Mit den Vögeln wanderte die Ausrüstung: Die Falkenhaube kam aus dem Orient nach Europa, Handschuh, Geschüh und Glocken haben ähnliche Wanderungsgeschichten. Diese Übernahmen verbinden die Regionen der Karte miteinander.',
    sources: [
      {
        name: 'International Association for Falconry · A history of falconry',
        url: 'https://iaf.org/a-history-of-falconry',
      },
      {
        name: 'Encyclopaedia Iranica · Bāz-nāma',
        url: 'https://www.iranicaonline.org/articles/baz-nama-books-or-treatises-on-the-keeping-and-training-of-falcons-containing-information-concerning-various-kinds-of-bird/',
      },
    ],
  },
  {
    id: 'bluetezeit',
    era: '12.–16. Jh.',
    name: 'Europäische Blütezeit',
    summary:
      'Beizjagd als höfische Kunst; Friedrich II. schreibt ihr Standardwerk.',
    place: 'Europa · 12.–16. Jh.',
    title: 'Blütezeit an den Höfen',
    birds: ['wanderfalke', 'habicht', 'gerfalke'],
    text: 'Im Hochmittelalter wurde die Beizjagd in Europa zur Kunst des Adels. Kaiser Friedrich II. verfasste um 1240 „De arte venandi cum avibus“ („Über die Kunst, mit Vögeln zu jagen“): Er beschrieb Vögel nach eigener Beobachtung statt nach Überlieferung, weshalb das Werk bis heute als eines der genauesten vormodernen Vogelbücher gilt.',
    detail:
      'Aus dieser Zeit stammt die Falknersprache, die im Deutschen weiterlebt: „sich mausern“ von der Mauser, „nicht viel Federlesens machen“ vom Reinigen des Vogels, „abrichten“ von der Ausbildung und der „Kropf“ als Zeichen für einen satten Beizvogel.',
    sources: [
      {
        name: 'Biblioteca Apostolica Vaticana · De arte venandi cum avibus (Pal. lat. 1071)',
        url: 'https://digi.vatlib.it/view/MSS_Pal.lat.1071',
      },
      {
        name: 'British Library · A kestrel for a knave',
        url: 'https://www.bl.uk/stories/blogs/posts/a-kestrel-for-a-knave',
      },
    ],
  },
  {
    id: 'niedergang',
    era: 'ab dem 17. Jh.',
    name: 'Niedergang',
    summary: 'Feuerwaffen und Flurbereinigung verdrängen die Beizjagd.',
    place: 'Europa · ab dem 17. Jh.',
    title: 'Feuerwaffen und Flurbereinigung',
    birds: [],
    text: 'Ab dem 17. Jahrhundert verlor die Beizjagd ihren Rang. Bessere Feuerwaffen machten die Jagd mit dem Vogel als Nahrungsquelle überflüssig, und die Flurbereinigung nahm den Falken den offenen Raum: Hecken, Zäune und dichter bewirtschaftete Felder ließen weite Jagdflüge nicht mehr zu.',
    detail:
      'Mit dem Ende der adeligen Jagdprivilegien nach 1789 verschwand die Falknerei in Mitteleuropa fast vollständig. Nur wenige Vereinigungen, etwa in den Niederlanden und in Großbritannien, hielten das Wissen im 19. Jahrhundert am Leben.',
    sources: [
      {
        name: 'International Association for Falconry · A history of falconry',
        url: 'https://iaf.org/a-history-of-falconry',
      },
    ],
  },
  {
    id: 'wiederbelebung',
    era: '20. Jh.',
    name: 'Wiederbelebung',
    summary: 'Verbände, Zucht und Artenschutz holen die Falknerei zurück.',
    place: 'Deutschland & Europa · 20. Jh.',
    title: 'Wiederbelebung und Artenschutz',
    birds: ['wanderfalke', 'habicht'],
    text: 'Im 20. Jahrhundert kehrte die Falknerei als geregelte Jagdform zurück; in Deutschland gründete sich 1923 der Deutsche Falkenorden. Als der Wanderfalke durch das Insektizid DDT in den 1960er Jahren fast verschwand, trugen Falkner mit Zucht und Auswilderung zu seiner Rückkehr bei.',
    detail:
      'Seit dem Washingtoner Artenschutzabkommen CITES von 1975 ist der Handel mit Greifvögeln streng geregelt. Beizvögel stammen heute aus Nachzuchten statt aus Wildfang, und die Beizjagd ist an Jagdschein und Falknerprüfung gebunden.',
    sources: [
      {
        name: 'Deutscher Falkenorden',
        url: 'https://d-f-o.de/',
      },
      {
        name: 'CITES · Washingtoner Artenschutzabkommen',
        url: 'https://cites.org/eng/disc/what.php',
      },
    ],
  },
  {
    id: 'kulturerbe',
    era: 'seit 2010',
    name: 'Immaterielles Kulturerbe',
    summary: 'Die UNESCO erkennt die Falknerei als lebendiges Erbe an.',
    place: 'Weltweit · seit 2010',
    title: 'Immaterielles Kulturerbe',
    birds: ['wuestenbussard', 'habicht'],
    text: 'Seit 2010 steht die Falknerei auf der Repräsentativen Liste des immateriellen Kulturerbes der UNESCO, eingetragen als gemeinsamer Antrag mehrerer Länder von Arabien bis Europa. Deutschland gehört seit 2016 dazu; heute tragen mehr als zwanzig Staaten den Eintrag.',
    detail:
      'Zugleich hat die Falknerei neue Aufgaben: An Flughäfen vertreiben Habichte und Wüstenbussarde Vögel von den Startbahnen und beugen Vogelschlag vor. So schlägt die alte Kunst die Brücke von der Geschichte zum Naturschutz.',
    sources: [
      {
        name: 'UNESCO · Falconry, a living human heritage',
        url: 'https://ich.unesco.org/en/RL/falconry-a-living-human-heritage-01708',
      },
      {
        name: 'Deutscher Falkenorden',
        url: 'https://d-f-o.de/',
      },
    ],
  },
] as const satisfies readonly (FalconryChapter & {
  era: string;
  name: string;
  summary: string;
})[];
