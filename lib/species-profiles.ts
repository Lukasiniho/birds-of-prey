export type SpeciesProfile = {
  identification: string;
  behaviour: string;
  breeding: string;
  sources: { name: string; url: string }[];
};
const cornell = (name: string) => [
  {
    name: 'Cornell Lab',
    url: `https://www.allaboutbirds.org/guide/${name}/lifehistory`,
  },
];
const nabu = (name: string) => [
  {
    name: 'NABU',
    url: `https://www.nabu.de/tiere-und-pflanzen/voegel/portraets/${name}/`,
  },
];
const lbv = (name: string) => [
  {
    name: 'LBV',
    url: `https://www.lbv.de/ratgeber/naturwissen/artenportraits/detail/${name}/`,
  },
];
const fund = (name: string) => [
  {
    name: 'The Peregrine Fund',
    url: `https://peregrinefund.org/explore-raptors-species/eagles/${name}`,
  },
];

export const speciesProfiles: Record<string, SpeciesProfile> = {
  habichtsadler: {
    identification:
      'Breite Flügel, langer Schwanz und ein heller Körper zwischen dunklen Unterflügeldecken. Die Schwanzendbinde ist beim Altvogel breit, beim Jungvogel noch undeutlich.',
    behaviour:
      'Paare besetzen feste Reviere; Jungvögel streifen nach dem Verlassen des Elternreviers weiträumig umher.',
    breeding:
      'Der Asthorst liegt meist in einer Felswand, regional auf einem Baum. Die Brut dauert etwa 37–40 Tage; nach rund zwei Monaten werden die Jungen flügge.',
    sources: [
      {
        name: 'SEO/BirdLife',
        url: 'https://seo.org/ave/aguila-perdicera/',
      },
    ],
  },
  iberienadler: {
    identification:
      'Rechteckige Flügel, kräftiger Schnabel und im Alterskleid weiße Schultern. Jungvögel sind warm rotbraun und deutlich anders gefärbt als junge Kaiseradler.',
    behaviour:
      'Die Altvögel halten ganzjährig am Revier fest. Jungvögel wandern während der Suche nach geeigneten Lebensräumen weiter umher.',
    breeding:
      'Beide Partner bauen den großen Baumhorst. Nach etwa 44 Tagen Brutzeit schlüpfen die Jungen; sie verbringen ungefähr elf Wochen im Nest.',
    sources: [
      {
        name: 'SEO/BirdLife',
        url: 'https://seo.org/ave/aguila-imperial-iberica/',
      },
    ],
  },
  klippenadler: {
    identification:
      'Schwarzer Altvogel mit weißem Rücken-V und Bürzel sowie hellen Flügelfenstern. Die Flügel sind zur Basis auffällig schmal; Jungvögel sind überwiegend braun.',
    behaviour:
      'Paare nutzen die Aufwinde steiler Hänge. Etablierte Altvögel bleiben ihrem Felsrevier treu, während Jungvögel abwandern.',
    breeding:
      'Ein großer Asthorst wird meist auf einem Felsvorsprung angelegt. Häufig überlebt nur das ältere Küken. Die Nestlingszeit dauert ungefähr drei Monate.',
    sources: [
      {
        name: 'SANBI',
        url: 'https://www.sanbi.org/animal-of-the-week/verreauxs-eagle/',
      },
    ],
  },
  zwergadler: {
    identification:
      'Etwa bussardgroß, mit sechs deutlich gefingerten Handschwingen und relativ langem Schwanz. Die helle Morphe hat einen markanten Hell-Dunkel-Kontrast; die dunkle ist braun.',
    behaviour:
      'Europäische Brutvögel ziehen meist nach Afrika. Helle und dunkle Vögel können sich miteinander verpaaren; die Morphen sind keine Unterarten.',
    breeding:
      'Er baut den Horst überwiegend in hohen Bäumen. Nach etwa 37–40 Tagen schlüpfen die Jungen; nach rund acht Wochen verlassen sie das Nest.',
    sources: [
      {
        name: 'SEO/BirdLife',
        url: 'https://seo.org/ave/aguila-calzada/',
      },
    ],
  },
  rotschwanzbussard: {
    identification:
      'Breite Flügel, ein gedrungener Körper und ein relativ kurzer, gerundeter Schwanz ergeben die typische Bussardsilhouette. Bei hellen Altvögeln fällt häufig ein dunkles Bauchband auf; der namensgebende rote Schwanz fehlt Jungvögeln noch.',
    behaviour:
      'Paare können über viele Jahre zusammenbleiben. Zur Balz zeigen sie Verfolgungsflüge und steile Flugmanöver. Das Revier und besonders der Horst werden auch gegen deutlich größere Greifvögel verteidigt.',
    breeding:
      'Beide Partner bauen oder erneuern den großen Asthorst, meist hoch in einem Baum. Auch Felsvorsprünge und Bauwerke werden genutzt. Die Jungen bleiben nach dem ersten Ausfliegen zunächst auf die Versorgung durch die Eltern angewiesen.',
    sources: cornell('Red-tailed_Hawk'),
  },
  habicht: {
    identification:
      'Relativ kurze, breite Flügel und ein langer Schwanz helfen beim Manövrieren zwischen Bäumen. Der helle Überaugenstreif wirkt markant. Gegenüber dem Sperber ist der Habicht kräftiger gebaut; Weibchen sind deutlich größer als Männchen.',
    behaviour:
      'Der Habicht lebt häufig unauffällig in Deckung. Bei der Balz im Spätwinter wird er mit auffälligen Flugmanövern sichtbarer. Etablierte Paare sind ihrem Revier treu und können es über viele Jahre nutzen.',
    breeding:
      'Der Horst liegt gewöhnlich in einer hohen Astgabel. Mit etwa sechs Wochen sind die Jungen flugfähig, werden aber noch weiter versorgt, bevor sie das elterliche Revier verlassen.',
    sources: lbv('habicht'),
  },
  maeusebussard: {
    identification:
      'Kompakter Körper, breite Flügel und ein kurzer, gefächerter Schwanz kennzeichnen das Flugbild. Die Gefiederfarbe allein genügt zur Bestimmung nicht: Fast weiße, braune und sehr dunkle Tiere gehören zur selben Art.',
    behaviour:
      'Häufig sitzt er weithin sichtbar auf Pfählen oder kreist über seinem Revier. Im Frühjahr begleiten miauende Rufe die Balzflüge. Zur Nahrungssuche braucht er offene Bereiche, auch wenn der Brutplatz im Wald liegt.',
    breeding:
      'Den Asthorst errichtet das Paar in hohen Bäumen, etwa Eichen oder Kiefern, häufig an Waldrändern. Geeignete Horste können wieder genutzt und ausgebessert werden. Ein guter Zugang zu Beute in der Umgebung ist für die Aufzucht entscheidend.',
    sources: [
      ...nabu('maeusebussard'),
      {
        name: 'NABU Leverkusen',
        url: 'https://nabu-leverkusen.de/natur-in-leverkusen/voegel/greifvoegel/maeusebussard/',
      },
    ],
  },
  wanderfalke: {
    identification:
      'Ein kräftiger Rumpf, spitze Flügel und ein vergleichsweise kurzer Schwanz unterscheiden ihn von schlankeren Falken. Die dunkle Kopfkappe und der breite Bartstreif rahmen die helle Wange ein.',
    behaviour:
      'Der Wanderfalke verbindet schnelle Flügelschläge mit Gleitphasen. Paare verteidigen ihren Brutplatz energisch. Zur Balz gehören gemeinsame Flugmanöver; die Bindung an geeignete Felswände oder Gebäude kann lange bestehen.',
    breeding:
      'Er baut keinen Asthorst, sondern legt seine Eier in eine ausgescharrte Mulde. Felsbänder und hohe Bauwerke bieten dafür geschützte Plätze. Das Weibchen übernimmt den größten Teil des Brütens, während das Männchen Nahrung bringt.',
    sources: cornell('Peregrine_Falcon'),
  },
  turmfalke: {
    identification:
      'Ein kleiner Falke mit spitzen Flügeln und langem Schwanz. Beim Männchen stehen der graue Kopf und Schwanz im Kontrast zum rostbraunen Rücken. Weibchen und Jungvögel sind überwiegend braun und stärker gebändert.',
    behaviour:
      'Der Rüttelflug ist besonders auffällig: Mit schnellen Flügelschlägen und aufgefächertem Schwanz hält er die Position über einer Jagdfläche. Viele Altvögel bleiben im Winter in Mitteleuropa oder weichen nur kleinräumig aus.',
    breeding:
      'Felsnischen, Kirchtürme und andere Gebäudenischen dienen als Brutplätze. Spezielle Nistkästen werden ebenfalls angenommen. Entscheidend ist neben dem geschützten Brutplatz eine erreichbare offene Jagdfläche für die Versorgung der Jungen.',
    sources: nabu('turmfalke'),
  },
  steinadler: {
    identification:
      'Breite, deutlich gefingerte Flügel und ein relativ langer Schwanz prägen den großen Adler. Goldbraune Nackenfedern sind aus der Nähe sichtbar. Jungvögel tragen oft auffällige weiße Felder in Flügeln und Schwanz.',
    behaviour:
      'Über seinem Revier nutzt er Aufwinde für ausdauerndes Segeln. Bei der Balz wechseln steile Stöße mit erneutem Aufsteigen. Paare können gemeinsam fliegen und bei einzelnen Jagden auch zusammenwirken.',
    breeding:
      'Felswände, örtlich auch große Bäume, tragen die umfangreichen Horste. Ein Paar kann mehrere Horste abwechselnd nutzen und sie über Jahre ergänzen. Die Jungen verbringen viele Wochen im Nest, bevor sie zum ersten Flug starten.',
    sources: cornell('Golden_Eagle'),
  },
  seeadler: {
    identification:
      'Sehr breite, fast brettartige Flügel, ein mächtiger Schnabel und ein kurzer Keilschwanz sind gute Kennzeichen. Der weiße Schwanz und der helle Kopf der Altvögel entwickeln sich erst über mehrere Jahre.',
    behaviour:
      'Erwachsene Paare bleiben meist im Brutrevier. Ihre hohen, gereihten Rufe sind besonders während der Balz zu hören, häufig im Duett. Jungvögel streifen nach dem Selbstständigwerden deutlich weiter umher.',
    breeding:
      'Bereits im Herbst kann das Paar am Horst arbeiten. Die Eiablage beginnt in Mitteleuropa oft schon gegen Ende des Winters. Die Jungen bleiben ungefähr drei Monate im Nest und werden nach dem Ausfliegen weiter von den Eltern begleitet.',
    sources: [
      {
        name: 'Wildtierportal Bayern',
        url: 'https://www.wildtierportal.bayern.de/wildtiere_bayern/251679/index.php',
      },
    ],
  },
  fischadler: {
    identification:
      'Lange, im Flug auffällig angewinkelte Flügel und eine helle Unterseite ergeben ein unverwechselbares Flugbild. Durch das Auge zieht sich ein dunkler Streif. Der Körper wirkt schlanker als bei den großen Seeadlern.',
    behaviour:
      'Er hält sich bevorzugt über offenen Gewässern auf. Zur Balz zeigt das Männchen wellenförmige Flugvorführungen, mitunter mit einem Fisch in den Fängen. Verteidigt wird vor allem die unmittelbare Umgebung des Horstes.',
    breeding:
      'Das große Astnest braucht einen freien Anflug: Baumspitzen, Masten und Nistplattformen sind typische Plätze. Wiederholtes Ergänzen lässt einen Horst über Jahre wachsen. Beide Eltern tragen zur Versorgung der Jungen bei.',
    sources: [
      ...cornell('Osprey'),
      {
        name: 'Roine Strandberg – Alter, Geschlecht und Unterarten des Fischadlers',
        url: 'https://www.dutchbirding.nl/journal/pdf/DB_2013_35_2.pdf',
      },
    ],
  },
  weisskopfseeadler: {
    identification:
      'Der weiße Kopf ist ein Altersmerkmal, kein Merkmal aller Lebensstufen. Junge Weißkopfseeadler sind braun und unregelmäßig hell gefleckt. Im Flug fallen die breiten Flügel und der weit vorgestreckte, kräftige Kopf auf.',
    behaviour:
      'Wo sich Fische oder andere Nahrung konzentrieren, können viele Adler zusammenkommen. Die Bindung an einen Brutplatz kann dagegen sehr dauerhaft sein. Große alte Bäume dienen als Aussichtspunkte und Ruheplätze.',
    breeding:
      'Paare errichten gewaltige Asthorste, gewöhnlich nahe am Stamm eines hohen Baumes. Beide sammeln Material. Alte Nester werden oft Jahr für Jahr ergänzt; in baumarmen Regionen kommen auch Fels- oder Bodenbruten vor.',
    sources: cornell('Bald_Eagle'),
  },
  riesenseeadler: {
    identification:
      'Der auffallend große orangegelbe Schnabel, weiße Schulterfelder und der weiße keilförmige Schwanz sind die markantesten Merkmale des Alterskleids. Jungvögel wirken insgesamt wesentlich dunkler und weniger kontrastreich.',
    behaviour:
      'Die Stimme ist ein tiefes, raues Bellen; in der Brutzeit werden auch laute Rufreihen hörbar. Saisonale Wanderungen führen viele Vögel von den Brutgebieten zu nahrungsreichen, eisfreien Küsten und Gewässern.',
    breeding:
      'Große Bäume oder Felswände nahe am Wasser tragen die mächtigen Horste. Paare kehren häufig zum alten Nest zurück. Meist überlebt ein Jungvogel; erfolgreiche Aufzuchten mit mehreren Jungen kommen ebenfalls vor.',
    sources: [
      {
        name: 'San Diego Zoo',
        url: 'https://animals.sandiegozoo.org/animals/stellers-sea-eagle',
      },
    ],
  },
  gaukler: {
    identification:
      'Der extrem kurze Schwanz und die langen breiten Flügel machen den Altvogel schon als Silhouette erkennbar. Rote unbefiederte Gesichtspartien und Beine kontrastieren mit dem dunklen Körper. Jungvögel sind braun und besitzen einen längeren Schwanz.',
    behaviour:
      'Beim niedrigen Suchflug kippt der Gaukler immer wieder leicht von einer Seite zur anderen. Die Gesichtshaut kann je nach Erregung kräftiger rot erscheinen. Er verbringt viel Zeit über offenem Gelände.',
    breeding:
      'Das Paar baut einen Asthorst in einer Baumgabel. Nach mehreren Monaten im Nest fliegt der Jungvogel aus, bleibt aber noch längere Zeit auf die Nahrung seiner Eltern angewiesen.',
    sources: fund('bateleur-eagle'),
  },
  aguja: {
    identification:
      'Der sehr breite Brustbereich, lange breite Flügel und ein kurzer Schwanz verleihen der Aguja eine fast dreieckige Silhouette. Altvögel zeigen eine dunkle Brust über hellerem Bauch; das Jugendkleid ist stärker braun gemustert.',
    behaviour:
      'An Hängen und über offenen Hochlagen nutzt sie Aufwinde für ausgedehnte Segelflüge. Aus der Entfernung wirkt sie dadurch oft adlerartig. Auch Felsen und andere erhöhte Punkte werden als Ansitz genutzt.',
    breeding:
      'Das Nest ist ein großer Bau aus Ästen, für den Felsen oder Bäume genutzt werden. Beide Partner beteiligen sich am Brutgeschäft und der Jungenversorgung. Die braunen Jungvögel erhalten ihre typische kontrastreiche Erwachsenenfärbung erst später.',
    sources: [
      {
        name: 'Zoológico Santacruz',
        url: 'https://zoosantacruz.org/animales/aguila-de-paramo/',
      },
    ],
  },
  uhu: {
    identification:
      'Eine große, kräftige Eule mit orangefarbenen Augen und langen Federohren. Der dunkel gezeichnete Gesichtsschleier und das grob gemusterte Gefieder tarnen sie am Tagesruheplatz. Im Flug sind die breiten gerundeten Flügel auffällig.',
    behaviour:
      'Meist wird der Uhu in der Dämmerung und nachts aktiv. Tagsüber ruht er verborgen an Felsen oder in Bäumen. Das tiefe, zweisilbige Rufen verrät sein Revier häufig früher als eine Sichtbeobachtung.',
    breeding:
      'Felsbänder und Steinbrüche sind typische Brutplätze. Wo Felsen fehlen, werden auch alte Greifvogelhorste oder Bodenmulden genutzt. Ein ungestörter Brutplatz ist wichtig; die Jungen können das engere Nestumfeld schon vor sicherem Flug erkunden.',
    sources: lbv('uhu'),
  },
  schwarzmilan: {
    identification:
      'Gegenüber dem Rotmilan wirkt er dunkler und kompakter. Sein Schwanz ist nur flach gegabelt und kann bei voller Fächerung fast gerade erscheinen. Der weniger kontrastreiche Unterflügel hilft beim Vergleich beider Arten.',
    behaviour:
      'Außerhalb des unmittelbaren Nestbereichs ist er oft gesellig. Europäische Brutvögel ziehen überwiegend nach Afrika und kehren im Frühjahr zurück. Thermik erleichtert lange Strecken; größere Wasserflächen werden dabei häufig umgangen.',
    breeding:
      'Der Horst liegt meist in einem Baum, häufig in Gewässernähe. Feldgehölze und lichte Altholzbestände bieten passende Standorte. Die Eltern brauchen erreichbare Nahrungsflächen im Umfeld, um die Jungen während der Brutzeit zu versorgen.',
    sources: [
      ...lbv('schwarzmilan'),
      {
        name: 'Landesamt für Umweltschutz Sachsen-Anhalt',
        url: 'https://natura2000.sachsen-anhalt.de/arten-lebensraeume/vogelarten/uebersicht-vogelarten/schwarzmilan',
      },
    ],
  },
  rotmilan: {
    identification:
      'Ein tief gegabelter rostfarbener Schwanz, lange Flügel und helle Felder auf den Unterflügeln sind charakteristisch. Der Schwanz wird beim Segeln ständig gedreht und dient als gut sichtbares Steuer.',
    behaviour:
      'Balzflüge und Verfolgungsjagden zeigen seine hohe Wendigkeit. Deutschland trägt eine besondere Verantwortung für diese Art, weil hier ein großer Teil des weltweiten Brutbestands lebt. Nicht alle Vögel ziehen im Winter gleich weit.',
    breeding:
      'Rotmilane brüten in Bäumen und brauchen dazu eine Landschaft aus Gehölzen und offenen Nahrungsflächen. Der Horst wird während der Brutzeit verteidigt. Alte, störungsarme Baumbestände sind deshalb wichtige Bestandteile eines geeigneten Reviers.',
    sources: nabu('rotmilan'),
  },
  gerfalke: {
    identification:
      'Der größte Falke wirkt kräftig und langschwänzig. Die breiten Flügel laufen in zugespitzte Hände aus. Weiße, graue und dunkle Vögel gehören zur selben Art; die Färbung allein verrät weder Alter noch Geschlecht.',
    behaviour:
      'Gerfalken leben meist einzeln oder paarweise und verteidigen ihren Brutbereich energisch. Das Männchen zeigt zur Balz Sturzflüge und Rollen. Im Winter können Vögel aus hohen arktischen Breiten weiter südlich erscheinen.',
    breeding:
      'Geschützte Felsbänder oder alte Nester anderer großer Vögel dienen als Brutplatz. Einen eigenen Asthorst baut der Gerfalke nicht. Stattdessen wird eine flache Mulde vorbereitet; die Jungen wachsen dort über mehrere Wochen heran.',
    sources: cornell('Gyrfalcon'),
  },
  sakerfalke: {
    identification:
      'Ein großer, kräftiger Falke mit langem Schwanz und weniger spitzen Flügeln als der Wanderfalke. Der Kopf wirkt oft hell, der Bartstreif schwächer. Dunkle Unterflügeldecken können deutlich gegen die helleren Schwungfedern abgesetzt sein.',
    behaviour:
      'Offenes Gelände bietet Raum für schnelle, bodennahe Verfolgungen. Bei der Bestimmung lohnt sich der Vergleich mit Lanner- und Wanderfalke: Körperproportionen und die Verteilung heller und dunkler Flügelbereiche sind zuverlässiger als eine einzelne Gefiederfarbe.',
    breeding:
      'Sakerfalken bauen keinen eigenen Asthorst. Sie nutzen vorhandene Nester anderer Vögel sowie geeignete Felsplätze und Nisthilfen. In baumarmen Landschaften können sichere künstliche Brutplätze deshalb eine wichtige Rolle spielen.',
    sources: [
      {
        name: 'MME · Saker LIFE',
        url: 'https://sakerlife3.mme.hu/en/content/saker',
      },
    ],
  },
  lannerfalke: {
    identification:
      'Der Lanner wirkt länger und schlanker als der Wanderfalke. Altvögel besitzen einen hellen bis rostfarbenen Nacken und einen schmaleren Bartstreif. Die helle Unterseite ist gewöhnlich weniger dicht gezeichnet als beim Wanderfalken.',
    behaviour:
      'Meist ist er einzeln oder paarweise unterwegs. Erwachsene Vögel können feste Reviere halten; jüngere streifen weiter umher. Regionale Wanderungen hängen auch davon ab, wie Regenfälle das Nahrungsangebot verändern.',
    breeding:
      'Felsvorsprünge sind wichtige Brutplätze, doch auch Bäume und Bauwerke werden genutzt. Statt selbst einen Horst zu bauen, übernimmt der Lanner vorhandene Nester. Nach dem Ausfliegen können die Jungen noch monatelang von den Eltern versorgt werden.',
    sources: [
      {
        name: 'Biodiversity & Development Institute',
        url: 'https://thebdi.org/2026/03/14/lanner-falcon-falco-biarmicus/',
      },
    ],
  },
  baumfalke: {
    identification:
      'Lange, schmale und sichelförmige Flügel sowie ein relativ kurzer Schwanz kennzeichnen den schnellen Flieger. Altvögel tragen rostrote Hosen, Jungvögel noch nicht. Der dunkle Bartstreif steht im Kontrast zur hellen Wange.',
    behaviour:
      'Ein ausgeprägter Langstreckenzieher, der den europäischen Winter in Afrika verbringt. In Deutschland erscheint er meist erst im späteren Frühjahr. Sein wendiger Flug ermöglicht rasche Richtungswechsel bei der Verfolgung fliegender Beute.',
    breeding:
      'Er übernimmt alte Krähen- oder Greifvogelnester und baut keinen eigenen Horst. Brutplätze liegen häufig in Feldgehölzen, Baumreihen oder auf Masten. Die späte Brutzeit passt zur sommerlichen Verfügbarkeit fliegender Beutetiere.',
    sources: [
      {
        name: 'Bundesamt für Naturschutz',
        url: 'https://www.bfn.de/artenportraits/falco-subbuteo-baumfalke',
      },
    ],
  },
  falklandkarakara: {
    identification:
      'Dunkles Gefieder mit hellen Längsstreifen an Hals und Brust, kräftige Beine und nackte Gesichtshaut kennzeichnen den Falklandkarakara. Er ist mit den Falken verwandt, wirkt aber im Gang und bei der Nahrungssuche ganz anders.',
    behaviour:
      'Neugieriges Erkunden und Nahrungssuche am Boden gehören zu seinem Alltag. Besonders junge Vögel treten gesellig auf. In der Nähe von Seevogelkolonien erschließt er sehr unterschiedliche Nahrungsquellen und untersucht dabei auch ungewohnte Gegenstände.',
    breeding:
      'Die Brutplätze liegen oft in der Nähe von Seevogelkolonien. Dort brütet die Art einzeln oder mit weiteren Paaren in der Umgebung. Die Jungen profitieren vom reichlichen Nahrungsangebot während der sommerlichen Brutzeit der Seevögel.',
    sources: [
      {
        name: 'Hawk Mountain Sanctuary',
        url: 'https://www.hawkmountain.org/conservation-science/active-research/raptor-conservation-studies/striated-caracaras',
      },
      {
        name: 'Harrington et al. · Movement Ecology',
        url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC5878424/',
      },
    ],
  },
  schopfkarakara: {
    identification:
      'Die schwarze Kopfkappe, helle Halsseiten und die nackte orange bis rote Gesichtshaut sind auffällig. Lange Beine und eine aufrechte Haltung passen zur häufigen Nahrungssuche am Boden. Im Flug erscheinen helle Flügel- und Schwanzpartien.',
    behaviour:
      'Er läuft und rennt regelmäßig am Boden und hebt oft erst nach einigen Schritten ab. Paare halten über längere Zeit zusammen. Außerhalb der Brutzeit können sich mehrere Vögel an reichlichen Nahrungsquellen versammeln.',
    breeding:
      'Anders als viele eigentliche Falken baut der Schopfkarakara selbst ein Nest aus Zweigen. Ein hoher Baum, Kaktus oder ähnlicher Standort wird genutzt. Beide Partner sammeln Material und können einen bewährten Brutplatz erneut beziehen.',
    sources: cornell('Crested_Caracara'),
  },
  koenigsbussard: {
    identification:
      'Ein großer Bussard mit breitem Brustkorb und langen Flügeln. Bei der hellen Form sind die rostfarben befiederten Beine besonders auffällig. Im Flug können sie vor dem hellen Bauch ein dunkles V bilden.',
    behaviour:
      'Meist lebt er einzeln oder paarweise. Im Winter können sich mehrere Tiere an ergiebigen Nahrungsplätzen aufhalten. Auch am Boden bewegt er sich laufend und hüpfend; zur Balz zeigt das Männchen auf- und absteigende Flüge.',
    breeding:
      'Der Neststandort ist ungewöhnlich variabel: Einzelbäume, Felsen, künstliche Strukturen und sogar der Boden kommen infrage. Beide Partner arbeiten am Horst. Störungen beim Nestbau können dazu führen, dass ein neuer Standort gewählt wird.',
    sources: cornell('Ferruginous_Hawk'),
  },
  harpyie: {
    identification:
      'Breite, relativ kurze Flügel und ein langer Schwanz sind an Flüge zwischen Baumkronen angepasst. Die aufrichtbare geteilte Haube, der graue Kopf und das dunkle Brustband prägen den Altvogel. Die Fänge sind außergewöhnlich kräftig.',
    behaviour:
      'Im dichten Wald bleibt die Harpyie trotz ihrer Größe leicht verborgen. Lange Ruhephasen auf einem Ansitz wechseln mit kurzen Flügen. Der Erhalt hoher Waldbäume ist für ihre Lebensweise und die Fortpflanzung besonders wichtig.',
    breeding:
      'Der mächtige Asthorst liegt hoch in einem großen Baum. Meist wird nur ein Jungvogel aufgezogen. Er fliegt nach etwa fünf bis sechs Monaten aus und bleibt noch lange abhängig; ein Paar brütet daher häufig nur alle zwei Jahre.',
    sources: fund('harpy-eagle'),
  },
  kampfadler: {
    identification:
      'Ein sehr großer Adler mit langen breiten Flügeln und dunklem Kopf sowie Brustbereich. Die helle Unterseite des Altvogels trägt dunkle Flecken. Junge Kampfadler sind an Kopf und Brust viel heller und noch kaum gefleckt.',
    behaviour:
      'Er nutzt große Reviere und verbringt viel Zeit im Segelflug. Paare können ihr Gebiet über Jahre halten. Während der Balz kreisen die Partner gemeinsam oder rufen einander von Ansitzen aus zu.',
    breeding:
      'Ein großer Asthorst liegt meist in einem hohen Baum, örtlich auch auf einer Felswand oder einem Strommast. Die aufwendige Aufzucht bindet beide Eltern: Anfangs jagt besonders das Männchen, während das Weibchen den Jungvogel betreut.',
    sources: fund('martial-eagle'),
  },
  virginiauhu: {
    identification:
      'Eine kräftige Eule mit gelben Augen, deutlich ausgebildeten Federohren und weißem Kehlfleck. Breite gerundete Flügel und ein kompakter Körper prägen das Flugbild. Die braune bis graue Grundfarbe unterscheidet sich regional.',
    behaviour:
      'Besonders in der Abend- und Morgendämmerung wird er aktiv. Mit tiefen Rufreihen verteidigen Paare ihr Revier. Bei Bedrohung kommen Schnabelklappen und Fauchen hinzu; tagsüber verraten ihn manchmal schimpfende Krähen oder Singvögel.',
    breeding:
      'Häufig übernimmt er alte Nester von Bussarden, Krähen oder anderen Vögeln. Auch Baumhöhlen, Felsbänder und Bauwerke werden genutzt. Die Jungen tragen zunächst weichen Flaum und werden nach dem Verlassen des Nestes weiter versorgt.',
    sources: cornell('Great_Horned_Owl'),
  },
  weissstorch: {
    identification:
      'Im Flug werden der Hals gerade nach vorn und die langen Beine nach hinten gestreckt. Das unterscheidet ihn von Reihern. Schwarze Schwungfedern kontrastieren mit dem weißen Körper; Altvögel haben rote Schnäbel und Beine.',
    behaviour:
      'Beim Segeln nutzt er Thermik und kann so große Strecken mit wenig Flügelschlag zurücklegen. Am Horst ist das Schnabelklappern besonders auffällig. Die Nahrungssuche erfolgt oft schreitend auf kurzrasigen oder feuchten Flächen.',
    breeding:
      'Horste auf Dächern, Bäumen oder Masten können durch wiederholtes Ergänzen sehr groß werden. Beide Eltern versorgen die Jungen. Diese bleiben ungefähr zwei Monate im Nest und lösen sich erst später vollständig von den Eltern.',
    sources: [
      {
        name: 'Bayerisches Landesamt für Umwelt',
        url: 'https://www.lfu.bayern.de/natur/vogelmonitoring/weissstorch/index.htm',
      },
    ],
  },
  sperber: {
    identification:
      'Kurze gerundete Flügel, ein langer Schwanz und dünne Beine kennzeichnen den kleinen Vogeljäger. Das Männchen ist deutlich kleiner als das Weibchen. Die Ähnlichkeit zum Habicht verlangt einen Blick auf Größe und Proportionen.',
    behaviour:
      'Im Wechsel zwischen kurzen Flügelschlägen und Gleitphasen bewegt er sich durch deckungsreiches Gelände. Während der Brutzeit lebt er heimlich; im Winter wird er häufiger in Gärten beobachtet. Seine Jagd kann bis in dichtes Gebüsch führen.',
    breeding:
      'Das Nest wird bevorzugt hoch in Nadelbäumen angelegt. Auch Parks und andere städtische Gehölze können als Brutrevier dienen. Während der Aufzucht braucht das Paar genügend kleine Vögel in erreichbarer Entfernung.',
    sources: nabu('sperber'),
  },
  wuestenbussard: {
    identification:
      'Die Kombination aus dunklem Körper, kastanienbraunen Flügelpartien und weiß gezeichnetem Schwanz ist charakteristisch. Er besitzt breite gerundete Flügel, einen langen Schwanz und lange Beine. Weibchen sind im Durchschnitt größer.',
    behaviour:
      'Wüstenbussarde leben oft in Gruppen mit einer Rangordnung. Sie sitzen eng beieinander und können sich bei Jagd und Revierverteidigung unterstützen. Dieses ausgeprägte Sozialverhalten unterscheidet sie von vielen anderen Greifvögeln.',
    breeding:
      'Das Brutpaar errichtet einen Asthorst, etwa in einem Baum oder auf einem großen Kaktus. Weitere Gruppenmitglieder können Nahrung bringen. Bei günstiger Versorgung sind mehrere Bruten im Jahr möglich.',
    sources: cornell('Harriss_Hawk'),
  },
  kaiseradler: {
    identification:
      'Ein großer, dunkler Adler mit langen, geraden Flügeln, die er im Segelflug flach hält. Der goldgelbe Nacken und die weißen Schulterflecken des Altvogels sind auf Distanz sichtbar. Jungvögel sind hell sandfarben mit dunkel gestreifter Unterseite.',
    behaviour:
      'Kaiseradler leben in festen Paaren und verteidigen weiträumige Reviere. Nordöstliche Populationen ziehen im Winter bis in den Nahen Osten, nach Afrika und Südasien; die Paare in Mitteleuropa bleiben meist ganzjährig im Brutgebiet.',
    breeding:
      'Der große Horst steht frei auf hohen Bäumen, in Steppen auch auf Strommasten. Die Jungen werden nach etwa zwei Monaten flügge und bleiben noch Wochen in der Nähe der Eltern.',
    sources: fund('eastern-imperial-eagle'),
  },
  steppenadler: {
    identification:
      'Ein kräftiger, einfarbig brauner Adler mit langen Flügeln und tief gefingerten Handschwingen. Der gelbe Mundwinkel reicht bis hinter das Auge, ein sicheres Merkmal. Jungvögel zeigen ein breites weißes Band auf den Unterflügeln.',
    behaviour:
      'Außerhalb der Brutzeit ist er ein Langstreckenzieher, der sich an Zugkonzentrationen wie Eilat oder Batumi zu Tausenden sammelt. Im Winterquartier schließen sich viele Vögel an Termitenschwärmen und Aasplätzen zusammen.',
    breeding:
      'Der flache Horst liegt oft direkt am Boden, auf niedrigen Büschen, Felsen oder Masten. Das Gelege wird rund sechs Wochen bebrütet; die Jungen fliegen nach etwa zwei Monaten aus.',
    sources: fund('steppe-eagle'),
  },
  sekretaer: {
    identification:
      'Unverwechselbar: ein grauer Greifvogel mit langen Storchenbeinen, schwarzen Federhosen, roter Gesichtshaut und einem Schopf aus langen Federn. Im Flug ragen die Beine weit über den Schwanz hinaus, dessen zwei mittlere Federn verlängert sind.',
    behaviour:
      'Sekretäre laufen am Tag bis zu 30 Kilometer durch das Gras und fliegen nur, um Ruhebäume oder den Horst zu erreichen. Paare bleiben zusammen und zeigen bei der Balz wellenförmige Schauflüge mit lauten Rufen.',
    breeding:
      'Der breite, flache Horst aus Zweigen liegt auf der Krone einer Schirmakazie. Das Gelege wird rund sechs Wochen bebrütet und verlassen den Horst nach etwa drei Monaten.',
    sources: [
      {
        name: 'San Diego Zoo',
        url: 'https://animals.sandiegozoo.org/animals/secretary-bird',
      },
    ],
  },
  andenkondor: {
    identification:
      'Ein riesiger schwarzer Segler mit brettartig flachen Flügeln, tief gefingerten Handschwingen und einer weißen Halskrause. Männchen tragen einen fleischigen Kamm auf dem nackten Kopf; junge Vögel sind einfarbig graubraun.',
    behaviour:
      'Andenkondore starten am Morgen an sonnenbeschienenen Hängen und nutzen Thermik und Hangaufwinde, um mit minimalem Kraftaufwand hunderte Kilometer zu segeln. An Kadavern und Schlafplätzen gelten feste Rangordnungen.',
    breeding:
      'Gebrütet wird in Felsnischen in großer Höhe, ohne eigentliches Nest. Das Ei wird knapp zwei Monate bebrütet, und der Jungvogel bleibt bis zu einem Jahr bei den Eltern, sodass Paare oft nur alle zwei Jahre brüten.',
    sources: [
      {
        name: 'San Diego Zoo',
        url: 'https://animals.sandiegozoo.org/animals/andean-condor',
      },
    ],
  },
  wespenbussard: {
    identification:
      'Dem Mäusebussard ähnlich, aber mit kleinem, weit vorgestrecktem Kopf, längerem Schwanz und flach gehaltenen Flügeln im Segelflug. Die Schwanzbinden, der graue Kopf des Männchens und die gelbe Iris helfen bei der Bestimmung.',
    behaviour:
      'Wespenbussarde treffen erst im Mai bei uns ein und ziehen im September wieder ab. Auf dem Zug meiden sie das offene Meer und sammeln sich an Engstellen wie Gibraltar und dem Bosporus zu Tausenden.',
    breeding:
      'Der Horst wird in hohen Bäumen gebaut und mit frischen belaubten Zweigen ausgekleidet. Das Gelege wird gut fünf Wochen bebrütet; die Jungen werden mit Wespenwaben gefüttert und fliegen nach etwa 40 Tagen aus.',
    sources: nabu('wespenbussard'),
  },
  bartgeier: {
    identification:
      'Ein sehr großer, schlanker Geier mit langen, spitzen Flügeln und einem langen Keilschwanz, an dem er sich schon von Weitem erkennen lässt. Der Kopf ist befiedert; Altvögel zeigen einen orangefarbenen Kopf mit schwarzem Augenstreif und Federbart.',
    behaviour:
      'Bartgeier segeln dicht an Felswänden entlang und suchen dort nach Knochen. Nach ihrer Ausrottung wurden sie seit 1986 in den Alpen wieder angesiedelt; heute brüten dort wieder über 300 Paare. Jungvögel wandern weit umher, bevor sie ein Revier gründen.',
    breeding:
      'Das Nest liegt in einer geschützten Felsnische und wird mit Wolle und Haaren ausgepolstert. Die Eiablage erfolgt im Winter; meist wird nur ein Junges großgezogen, das nach rund vier Monaten ausfliegt.',
    sources: lbv('bartgeier'),
  },
  kronenadler: {
    identification:
      'Eine aufrichtbare Haube und kräftige Fänge prägen den Waldadler. Seine kurzen breiten Flügel und der lange Schwanz ermöglichen enge Wendungen zwischen Bäumen. Junge Kronenadler sind deutlich heller als ausgewachsene Tiere.',
    behaviour:
      'Auch in manchen südafrikanischen Städten kommen Kronenadler vor, sofern geeignete Waldflächen erhalten bleiben. Eine Langzeitstudie in KwaZulu-Natal zeigt, wie flexibel die Art auf solche veränderten Landschaften reagieren kann.',
    breeding:
      'Viele Paare brüten nur in jedem zweiten Jahr. In stärker städtisch geprägten Revieren wurden häufiger jährliche Brutversuche beobachtet, allerdings auch mehr Fehlschläge. Häufigeres Brüten bedeutet deshalb nicht automatisch mehr flügge Junge.',
    sources: [
      {
        name: 'San Diego Zoo',
        url: 'https://animals.sandiegozoo.org/animals/crowned-eagle',
      },
      {
        name: 'Muller et al. · Universität Wien',
        url: 'https://ucrisportal.univie.ac.at/en/publications/urbanization-is-associated-with-increased-breeding-rate-but-decre/',
      },
    ],
  },
};
