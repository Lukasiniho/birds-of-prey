/** Arten, die weltweit in der Falknerei als Beizvögel geflogen werden.
 * Quellen: https://de.wikipedia.org/wiki/Beizvogel und der Deutsche
 * Falkenorden, https://d-f-o.de/falknerei/beizvoegel/ */
export type FalconryBird = {
  /** Kurze Einordnung, wofür der Vogel bei der Beizjagd steht. */
  subtitle: string;
  text: string;
  /** Steht auf der Falknerei-Seite in der Auswahl der Beizvögel. */
  featured?: boolean;
};

export const falconryBirds: Record<string, FalconryBird> = {
  habicht: {
    subtitle: 'Wendig im deckungsreichen Gelände',
    text: 'Mit kurzen, breiten Flügeln und einem langen Schwanz kann der Habicht schnell beschleunigen und enge Kurven fliegen. Er ist der häufigste Beizvogel in Deutschland und wird auf Vögel und Kaninchen geflogen.',
    featured: true,
  },
  sperber: {
    subtitle: 'Der kleinste heimische Beizvogel',
    text: 'Der Sperber jagt im dichten Gehölz und reagiert empfindlich auf Störungen. In der Beizjagd wird er auf Tauben, Elstern und junge Fasane geflogen.',
  },
  wuestenbussard: {
    subtitle: 'Auch als Harris Hawk bekannt',
    text: 'Der Wüstenbussard stammt aus Amerika und ist für sein ausgeprägtes Sozialverhalten bekannt. Gerade deshalb wird er in der europäischen Falknerei immer häufiger eingesetzt, ähnlich wie der Habicht.',
    featured: true,
  },
  rotschwanzbussard: {
    subtitle: 'Robuster Jäger aus Nordamerika',
    text: 'In Nordamerika ist der Rotschwanzbussard der verbreitetste Beizvogel. Er jagt aus dem Ansitz über offenem Land und gilt als kräftig und gelassen.',
  },
  koenigsbussard: {
    subtitle: 'Beizvogel der Prärie',
    text: 'Der Königsbussard wird vor allem in Nordamerika geflogen. Über weitem, offenem Gelände jagt er Hasen und Erdhörnchen.',
  },
  habichtsadler: {
    subtitle: 'Die Kraft eines Adlers',
    text: 'Der Habichtsadler verbindet die Wendigkeit der Habichtartigen mit der Kraft eines Adlers. In der arabischen Falknerei wird er auf größere Beute geflogen.',
  },
  steinadler: {
    subtitle: 'Beizjagd zu Pferd',
    text: 'Die Berkutchi Zentralasiens fliegen den Steinadler von der Faust auf Fuchs und Wolf. In Europa wird er auf Hase und Fuchs geflogen, selten und nur von erfahrenen Falknern.',
    featured: true,
  },
  wanderfalke: {
    subtitle: 'Jagd im freien Luftraum',
    text: 'Seine langen, spitzen Flügel machen den Wanderfalken zu einem ausdauernden und schnellen Flugjäger. Er wird auf Vögel bis Entengröße geflogen und ist nach dem Habicht der häufigste Beizvogel in Deutschland.',
    featured: true,
  },
  gerfalke: {
    subtitle: 'Der größte Falke',
    text: 'Aus dem arktischen Norden stammend, fliegt der Gerfalke schnell und ausdauernd über offenem Gelände. In der Falknerei gilt er als Universaljäger auf Flugwild, ist in Haltung und Ausbildung aber anspruchsvoll.',
  },
  sakerfalke: {
    subtitle: 'Leitart der arabischen Falknerei',
    text: 'Über der weiten Steppe jagt der Sakerfalke ausdauernd und tief. In Europa wird er auf Rebhuhn, Krähe und Ente geflogen, in Asien traditionell auf die Kragentrappe.',
  },
  lannerfalke: {
    subtitle: 'Falke des Mittelmeerraums',
    text: 'Der Lannerfalke jagt niedrig über offenem Gelände, vor allem auf Rebhuhn und Fasan. Auch er wird als Beizvogel eingesetzt, steht dabei aber im Schatten von Wander- und Sakerfalke.',
  },
  uhu: {
    subtitle: 'Der einzige Beizvogel der Nacht',
    text: 'Der Uhu wird in der Falknerei nur vereinzelt geflogen. Traditionell diente er als Lockvogel bei der Krähenjagd, weil kleinere Vögel ihn im Freien angreifen.',
  },
};
