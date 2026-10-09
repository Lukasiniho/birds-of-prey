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
type SiteLocale = keyof typeof SITE_NAMES;
/** Full title for the home page; other pages use `<Seite> · <Site>`. The
 * tagline is a translation key like every other German text. */
export const SITE_TAGLINE = 'Greifvögel bestimmen und entdecken';
export const siteTitle = (locale: SiteLocale, t: (text: string) => string) =>
  `${SITE_NAMES[locale]} – ${t(SITE_TAGLINE)}`;
export const SITE_DESCRIPTION =
  'Greifvögel und Eulen bestimmen: Steckbriefe mit Spannweite, Gewicht, Rufen, Verbreitung, Lebensraum und Beute – dazu Jagdwissen und ein Quiz.';

/** OpenGraph fields every page shares. Next replaces `openGraph` per page
 * instead of merging it, so page metadata spreads this in first. */
export const baseOpenGraph = (locale: SiteLocale) => ({
  type: 'website' as const,
  locale: locale === 'en' ? 'en_GB' : 'de_DE',
  siteName: SITE_NAMES[locale],
  images: [
    {
      url: '/icons/og-image.png',
      width: 1200,
      height: 630,
      alt: SITE_NAMES[locale],
    },
  ],
});

// Browser UI colours for the metadata tags. Metadata is generated on the
// server and cannot read CSS, so these mirror --background in app/colors.css.
export const THEME_COLOR_LIGHT = '#fafcfd';
export const THEME_COLOR_DARK = '#0b1014';
