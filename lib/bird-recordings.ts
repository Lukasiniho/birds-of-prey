export type BirdRecording = {
  url: string;
  label: string;
  author: string;
  sourceUrl: string;
  license: string;
  licenseUrl: string;
  note?: string;
};
// Individually checked Commons file descriptions, 2026-09-08. No generic
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
export const birdRecordings: Partial<Record<string, BirdRecording>> = {
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
};
