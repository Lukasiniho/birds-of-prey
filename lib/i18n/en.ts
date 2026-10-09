import { translator, type Dictionary, type Locale } from '../i18n.ts';
import site from './en/site.json' with { type: 'json' };
import uiAtlas from './en/ui-atlas.json' with { type: 'json' };
import uiAtlasParts from './en/ui-atlas-parts.json' with { type: 'json' };
import uiCommon from './en/ui-common.json' with { type: 'json' };
import uiWissen from './en/ui-wissen.json' with { type: 'json' };
import uiQuiz from './en/ui-quiz.json' with { type: 'json' };
import dataSpeciesA from './en/data-species-a.json' with { type: 'json' };
import dataSpeciesB from './en/data-species-b.json' with { type: 'json' };
import dataEcology from './en/data-ecology.json' with { type: 'json' };
import dataMorphs from './en/data-morphs.json' with { type: 'json' };
import dataExtra from './en/data-extra.json' with { type: 'json' };

/** Englisches Wörterbuch, nur serverseitig importieren (sonst landet es in jedem Bundle). */
export const en: Dictionary = {
  ...dataSpeciesA,
  ...dataSpeciesB,
  ...dataEcology,
  ...dataMorphs,
  ...dataExtra,
  ...uiCommon,
  ...uiAtlas,
  ...uiAtlasParts,
  ...uiWissen,
  ...uiQuiz,
  ...site,
};

export const serverTranslator = (locale: Locale) =>
  translator(locale === 'en' ? en : null);
