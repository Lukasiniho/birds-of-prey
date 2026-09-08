export type BirdRecording = {
  url: string;
  label: string;
  author: string;
  sourceUrl: string;
  license: string;
  licenseUrl: string;
  note?: string;
};
// Individually checked Commons, Xeno-canto and Tierstimmenarchiv descriptions,
// 2026-09-08. Local audio provenance is recorded in data/audio/sources.json. No generic
// species-search results or guessed recordings: unavailable species stay unset.
const commons = 'https://commons.wikimedia.org/wiki/File:';
const upload = 'https://upload.wikimedia.org/wikipedia/commons/';
function recording(
  path: string,
  author: string,
  version: string,
  label = 'Ruf',
  note?: string,
): BirdRecording {
  return {
    url: upload + path,
    label,
    author,
    sourceUrl: commons + path.split('/').at(-1),
    license: version === 'public' ? 'Public Domain' : `CC BY-SA ${version}`,
    licenseUrl:
      version === 'public'
        ? 'https://creativecommons.org/publicdomain/mark/1.0/'
        : `https://creativecommons.org/licenses/by-sa/${version}/`,
    note,
  };
}
function tierstimmenarchiv(
  filename: string,
  identifier: string,
  author: string,
  note: string,
  label = 'Ruf',
): BirdRecording {
  return {
    url: `/audio/${filename}`,
    label,
    author: `${author} / Tierstimmenarchiv, Museum für Naturkunde Berlin`,
    sourceUrl: `https://suche.tierstimmenarchiv.de/search/showdetails.html?unique_identifier=${encodeURIComponent(identifier)}&language=deutsch`,
    license: 'CC BY-SA 3.0 DE',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/de/',
    note: `${note} Von uns unveränderte MP3-Fassung des Archivs.`,
  };
}
export const birdRecordings: Partial<Record<string, BirdRecording>> = {
  seeadler: tierstimmenarchiv(
    'seeadler-48dfa3642dcb.mp3',
    'TSA:Haliaeetus_albicilla_DIG_102_3_1',
    'Karl-Heinz Frommolt',
    'Rufreihe eines Seeadlers bei Niederspree, aufgenommen am 29. Juli 2008 aus etwa einem Kilometer Entfernung.',
    'Rufreihe',
  ),
  kaiseradler: tierstimmenarchiv(
    'kaiseradler-a9b93431123b.mp3',
    'TSA:Aquila_heliaca_V_1869_9_1',
    'Günter Tembrock',
    'Rufreihe aus dem Vogelpark Niendorf, aufgenommen am 21. September 1992.',
    'Rufreihe',
  ),
  steppenadler: tierstimmenarchiv(
    'steppenadler-1fe43188b5b7.mp3',
    'TSA:Aquila_nipalensis_Lue_60_2_1',
    'Hans Lütgens',
    'Rufe aus der Greifvogelwarte Berlebeck, aufgenommen am 5. September 1971.',
    'Ruf',
  ),
  sekretaer: tierstimmenarchiv(
    'sekretaer-230b335eff5f.mp3',
    'TSA:Sagittarius_serpentarius_Lue_61_2_1',
    'Hans Lütgens',
    'Rufe bei Annäherung an einen Vogel im Gehege des Ruhr-Zoos Gelsenkirchen.',
    'Ruf',
  ),
  kronenadler: tierstimmenarchiv(
    'kronenadler-85248cc94465.mp3',
    'TSA:Stephanoaetus_coronatus_Lue_61_1_1',
    'Hans Lütgens',
    'Rufe aus dem Tierpark Berlin.',
    'Ruf',
  ),
  riesenseeadler: tierstimmenarchiv(
    'riesenseeadler-4883a7160297.mp3',
    'TSA:Haliaeetus_pelagicus_Lue_59_2_1',
    'Hans Lütgens',
    'Duett aus dem Tierpark Berlin.',
    'Duett',
  ),
  gaukler: tierstimmenarchiv(
    'gaukler-999481fa5a1b.mp3',
    'TSA:Terathopius_ecaudatus_Lue_61_4_1',
    'Hans Lütgens',
    'Rufe aus dem Zoo Frankfurt.',
    'Ruf',
  ),
  sakerfalke: tierstimmenarchiv(
    'sakerfalke-d171447cac4d.mp3',
    'TSA:2500_Falco_cherrug_call',
    'Günter Tembrock',
    'Vom Archiv aufbereitete Rufreihe; Originalkennung Falco_cherrug_V0330_01.',
    'Rufreihe',
  ),
  lannerfalke: tierstimmenarchiv(
    'lannerfalke-195662490ee0.mp3',
    'TSA:Falco_biarmicus_Lue_59_1_0',
    'Hans Lütgens',
    'Rufe eines Paares aus dem Zoo London.',
    'Rufe eines Paares',
  ),
  falklandkarakara: tierstimmenarchiv(
    'falklandkarakara-c4a6d261d4de.mp3',
    'TSA:Phalcoboenus_australis_Lue_59_3_1',
    'Hans Lütgens',
    'Rufe aus dem Zoo Antwerpen; im Archiv unter dem Synonym Phalcoboenus australis geführt.',
    'Ruf',
  ),
  koenigsbussard: tierstimmenarchiv(
    'koenigsbussard-f25d0beacb50.mp3',
    'TSA:Buteo_regalis_V_1457_11_1',
    'Günter Tembrock',
    'Rufe aus dem Tierpark Berlin, aufgenommen am 18. April 1981. Im Hintergrund sind Seeadler und Riesenseeadler zu hören.',
    'Ruf',
  ),
  harpyie: tierstimmenarchiv(
    'harpyie-6f5dfc5a41ec.mp3',
    'TSA:Harpia_harpyja_V_1930_3_1',
    'Günter Tembrock',
    'Vier kurze Rufe eines Männchens aus dem Zoo Berlin, aufgenommen am 2. April 1994.',
    'Ruf des Männchens',
  ),
  kampfadler: {
    url: 'https://xeno-canto.org/sounds/uploaded/ZPOTJDOCCS/XC1148983-Martial-Eagle-3-mc.mp3',
    author: 'Kileo Jumah',
    sourceUrl: 'https://xeno-canto.org/1148983',
    license: 'CC0 1.0',
    licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
    label: 'Ruf',
    note: 'Aufgenommen im Tarangire-Nationalpark, Tansania. Weitere Vogelarten im Hintergrund; Aufnahme unverändert.',
  },
  bartgeier: {
    url: 'https://xeno-canto.org/sounds/uploaded/YYCETNTCXN/XC937988-240720_10h05_frepestel_tarne.mp3',
    author: 'Thomas SIGNEAU',
    sourceUrl: 'https://xeno-canto.org/937988',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    label: 'Bettelruf',
    note: 'Bettelruf aus einer Auswilderungsvoliere des Projekts Gyp’Act. Vom Urheber mit einem Hochpassfilter bearbeitet; von uns unverändert.',
  },
  schopfkarakara: recording(
    'e/e6/Caracara_cheriway_-_Northern_Crested_Caracara_XC497349.mp3',
    'Oliver Komar',
    '4.0',
    'Ruf der nördlichen Form',
    'Nördliche Form (Caracara plancus cheriway), aufgenommen in Honduras. Karakara-Rufe in der zweiten Hälfte; zu Beginn ist ein Zimtkolibri zu hören. Aufnahme unverändert.',
  ),
  rotschwanzbussard: recording(
    '0/0f/Buteo_jamaicensis_-_Red-tailed_Hawk_XC71575.mp3',
    'Jonathon Jongsma',
    '3.0',
  ),
  maeusebussard: recording(
    'e/ea/Buteo_buteo_warning_the_fledglings_7643.ogg',
    'T. Voekler',
    '3.0',
    'Ruf am Nest',
  ),
  habicht: recording(
    'e/e1/Accipiter_gentilis_-_Northern_Goshawk_XC124806.ogg',
    'Adrienne Eaton',
    '3.0',
    'Kontaktruf',
    'Vom Urheber gegen Straßenlärm gefiltert; von uns unverändert.',
  ),
  wuestenbussard: recording(
    '2/25/Parabuteo_unicinctus_-_Harris%27s_Hawk_XC202066.mp3',
    'Gabriele Magurno',
    '4.0',
    'Jungvogelrufe',
    'Leicht rauschgefilterte Originalaufnahme; von uns unverändert.',
  ),
  weisskopfseeadler: recording(
    '7/73/Yellowstone_sound_library_-_Bald_Eagle_-_003.mp3',
    'NPS & MSU Acoustic Atlas / Jennifer Jerrett',
    'public',
  ),
  steinadler: recording(
    'c/cf/Golden_Eagle_%28Aquila_chrysaetos%29_%28W1CDR0001387_BD6%29.ogg',
    'Lawrence Shove / The British Library Board',
    '4.0',
  ),
  schwarzmilan: recording(
    '0/0d/Milvus_migrans_-_Black_Kite_XC543161.mp3',
    'GESHORS Yann',
    '4.0',
  ),
  virginiauhu: recording(
    '6/6f/Bubo_virginianus_-_Great_Horned_Owl_XC450919.mp3',
    'Michael & Katie LaTour',
    '4.0',
    'Ruf',
    'Vom Urheber rauschgefiltert und leicht verstärkt; von uns unverändert.',
  ),
  wanderfalke: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/Halc%C3%B3n_peregrino.ogg',
    author: 'Sternanita3',
    sourceUrl:
      'https://commons.wikimedia.org/wiki/File:Halc%C3%B3n_peregrino.ogg',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    label: 'Ruf',
  },
  turmfalke: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Falco_tinnunculus_-_Common_Kestrel_XC468409.mp3',
    author: 'Marie-Lan Taÿ Pamart',
    sourceUrl:
      'https://commons.wikimedia.org/wiki/File:Falco_tinnunculus_-_Common_Kestrel_XC468409.mp3',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    label: 'Ruf',
  },
  andenkondor: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/a/a2/Andean_Condor_call_%28Vultur_gryphus%29.ogg',
    author: 'Fernando Castro',
    sourceUrl:
      'https://commons.wikimedia.org/wiki/File:Andean_Condor_call_(Vultur_gryphus).ogg',
    license: 'CC BY 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/4.0',
    label: 'Küken beim Schlupf',
    note: 'Rufe eines männlichen Kükens beim Schlüpfen; kein Altvogelruf. Aufnahme unverändert.',
  },
  wespenbussard: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/8/8a/Pernis_apivorus_-_European_Honey_Buzzard_XC580934.mp3',
    author: 'Benoît Van Hecke',
    sourceUrl:
      'https://commons.wikimedia.org/wiki/File:Pernis_apivorus_-_European_Honey_Buzzard_XC580934.mp3',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    label: 'Flugruf',
  },
  aguja: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/2/27/Geranoaetus_melanoleucus_-_Black-chested_Buzzard-Eagle_XC250871.mp3',
    author: 'Niels Krabbe',
    sourceUrl:
      'https://commons.wikimedia.org/wiki/File:Geranoaetus_melanoleucus_-_Black-chested_Buzzard-Eagle_XC250871.mp3',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    label: 'Balzruf',
  },
  uhu: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/b/be/Bubo_bubo_-_Eurasian_Eagle-Owl_XC461330.mp3',
    author: 'Mirko Tomasi',
    sourceUrl:
      'https://commons.wikimedia.org/wiki/File:Bubo_bubo_-_Eurasian_Eagle-Owl_XC461330.mp3',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    label: 'Ruf des Männchens',
  },
  rotmilan: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/e/ed/Milvus_milvus_-_Red_Kite_XC518958.mp3',
    author: 'Pascal Christe',
    sourceUrl:
      'https://commons.wikimedia.org/wiki/File:Milvus_milvus_-_Red_Kite_XC518958.mp3',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    label: 'Ruf',
  },
  gerfalke: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/0/09/Falco_rusticolus.ogg',
    author: 'Bubulcus',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Falco_rusticolus.ogg',
    license: 'CC BY 3.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/3.0',
    label: 'Ruf',
  },
  fischadler: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/a/a1/Pandion_haliaetus.ogg',
    author: 'National Park Service (Urheber nicht namentlich genannt)',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Pandion_haliaetus.ogg',
    license: 'Public domain',
    licenseUrl: 'https://creativecommons.org/publicdomain/mark/1.0/',
    label: 'Ruf',
  },
  baumfalke: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/5/54/Falco_subbuteo_-_Eurasian_Hobby_XC469763.mp3',
    author: 'Rafael Suleimanov',
    sourceUrl:
      'https://commons.wikimedia.org/wiki/File:Falco_subbuteo_-_Eurasian_Hobby_XC469763.mp3',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    label: 'Flugruf',
  },
  weissstorch: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/2/2c/Ciconia_ciconia_bill-clattering.ogg',
    author: 'felix.blume',
    sourceUrl:
      'https://commons.wikimedia.org/wiki/File:Ciconia_ciconia_bill-clattering.ogg',
    license: 'CC BY-SA 3.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    label: 'Schnabelklappern',
  },
  sperber: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/d/d6/Accipiter_nisus_-_Eurasian_Sparrowhawk_XC467097.mp3',
    author: 'Alvaro Ortiz Troncoso',
    sourceUrl:
      'https://commons.wikimedia.org/wiki/File:Accipiter_nisus_-_Eurasian_Sparrowhawk_XC467097.mp3',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    label: 'Ruf am Nest',
  },
};
