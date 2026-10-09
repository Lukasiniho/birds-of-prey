import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { TooltipProvider } from '@/components/ui/tooltip';
import { I18nProvider } from '@/components/i18n';
import { JsonLd } from '@/components/json-ld';
import { languageAlternates, type Locale } from '@/lib/i18n';
import { serverTranslator } from '@/lib/i18n/en';
import {
  baseOpenGraph,
  SITE_DESCRIPTION,
  SITE_NAMES,
  SITE_URLS,
  siteTitle,
  THEME_COLOR_DARK,
  THEME_COLOR_LIGHT,
} from '@/lib/site';
// Selbst gehostet statt über next/font/google: scripts/build-fonts.mjs schneidet
// Googles Latin-Subset auf den gebrauchten Zeichenvorrat und die Gewichtsachse
// zu (Display 400–800, Text 400–700). `preload: false` lässt dem Heldenbild die
// Bandbreite.
const displayFont = localFont({
  variable: '--font-display',
  display: 'swap',
  preload: false,
  // Muss hier stehen: sonst setzt der Shim sein eigenes `sans-serif` davor.
  fallback: ['EB Garamond Fallback', 'Georgia', 'serif'],
  src: [
    {
      path: './fonts/eb-garamond-latin.woff2',
      weight: '400 800',
      style: 'normal',
    },
    {
      path: './fonts/eb-garamond-latin-italic.woff2',
      weight: '400 800',
      style: 'italic',
    },
  ],
});
const bodyFont = localFont({
  variable: '--font-body',
  display: 'swap',
  preload: false,
  fallback: ['Inter Fallback', 'Arial', 'sans-serif'],
  src: [
    { path: './fonts/inter-latin.woff2', weight: '400 700', style: 'normal' },
  ],
});
export const rootMetadata = (locale: Locale): Metadata => ({
  metadataBase: new URL(SITE_URLS[locale]),
  title: {
    default: SITE_NAMES[locale],
    template: `%s · ${SITE_NAMES[locale]}`,
  },
  description: serverTranslator(locale)(SITE_DESCRIPTION),
  applicationName: SITE_NAMES[locale],
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/icons/favicon-16.png', type: 'image/png', sizes: '16x16' },
      { url: '/icons/favicon-32.png', type: 'image/png', sizes: '32x32' },
      { url: '/icons/icon-192.png', type: 'image/png', sizes: '192x192' },
    ],
    apple: '/icons/apple-touch-icon.png',
  },
  openGraph: baseOpenGraph(locale),
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
});
/** Metadata for the home page of either site: the full title and its own
 * OpenGraph block (Next replaces `openGraph` per page instead of merging). */
export const homeMetadata = (locale: Locale): Metadata => {
  const t = serverTranslator(locale);
  const title = siteTitle(locale, t);
  const alternates = languageAlternates('/', locale);
  return {
    title: { absolute: title },
    alternates,
    openGraph: {
      ...baseOpenGraph(locale),
      title,
      description: t(SITE_DESCRIPTION),
      url: alternates.canonical,
    },
  };
};
export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: THEME_COLOR_LIGHT },
    { media: '(prefers-color-scheme: dark)', color: THEME_COLOR_DARK },
  ],
};
// Names the site for search results; species pages add their own entity below.
export function RootShell({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAMES[locale],
    url: SITE_URLS[locale],
    description: serverTranslator(locale)(SITE_DESCRIPTION),
    inLanguage: locale,
  };
  return (
    <html lang={locale}>
      <body className={`${displayFont.variable} ${bodyFont.variable}`}>
        <JsonLd data={websiteJsonLd} />
        <I18nProvider locale={locale}>
          <TooltipProvider delay={180}>{children}</TooltipProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
