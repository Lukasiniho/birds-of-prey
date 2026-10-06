export const SITE_URL = 'https://greifvogelkompass.de';
export const SITE_NAME = 'Greifvogelkompass';
/** Full title for the home page; other pages use `<Seite> · SITE_NAME`. */
export const SITE_TITLE = `${SITE_NAME} – Greifvögel bestimmen und entdecken`;
export const SITE_DESCRIPTION =
  'Greifvögel und Eulen bestimmen: Steckbriefe mit Spannweite, Gewicht, Rufen, Verbreitung, Lebensraum und Beute – dazu Jagdwissen und ein Quiz.';

/** OpenGraph fields every page shares. Next replaces `openGraph` per page
 * instead of merging it, so page metadata spreads this in first. */
export const BASE_OPEN_GRAPH = {
  type: 'website' as const,
  locale: 'de_DE',
  siteName: SITE_NAME,
  images: [
    { url: '/icons/og-image.png', width: 1200, height: 630, alt: SITE_NAME },
  ],
};

// Browser UI colours for the metadata tags. Metadata is generated on the
// server and cannot read CSS, so these mirror --background in app/colors.css.
export const THEME_COLOR_LIGHT = '#fafcfd';
export const THEME_COLOR_DARK = '#0b1014';
