// One Netlify site per language: German on greifvogelkompass.de, English on
// raptoratlas.com. Both are built from this repo (see NEXT_PUBLIC_SITE_LOCALE).
export const SITE_URLS = {
  de: 'https://greifvogelkompass.de',
  en: 'https://raptoratlas.com',
} as const;
export const SITE_NAMES = {
  de: 'Greifvogelkompass',
  en: 'Raptor Atlas',
} as const;
export const SITE_URL = SITE_URLS.de;
export const SITE_NAME = SITE_NAMES.de;
export const SITE_DESCRIPTION =
  'Greifvögel entdecken: Arten, Lebensräume, Gefiederfarben und Beutetiere.';

// Browser UI colours for the metadata tags. Metadata is generated on the
// server and cannot read CSS, so these mirror --background in app/colors.css.
export const THEME_COLOR_LIGHT = '#fafcfd';
export const THEME_COLOR_DARK = '#0b1014';
