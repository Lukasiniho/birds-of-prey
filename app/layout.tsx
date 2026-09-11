import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { TooltipProvider } from '@/components/ui/tooltip';
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  THEME_COLOR_DARK,
  THEME_COLOR_LIGHT,
} from '@/lib/site';
// Selbst gehostet statt über next/font/google: scripts/build-fonts.mjs schneidet
// Googles Latin-Subset auf den gebrauchten Zeichenvorrat und die Achse 400–700
// zu, 121 KB → 89 KB. `preload: false` lässt dem Heldenbild die Bandbreite.
const displayFont = localFont({
  variable: '--font-display',
  display: 'swap',
  preload: false,
  // Muss hier stehen: sonst setzt der Shim sein eigenes `sans-serif` davor.
  fallback: ['Cormorant Garamond Fallback', 'Georgia', 'serif'],
  src: [
    {
      path: './fonts/cormorant-garamond-latin.woff2',
      weight: '400 700',
      style: 'normal',
    },
    {
      path: './fonts/cormorant-garamond-latin-italic.woff2',
      weight: '400 700',
      style: 'italic',
    },
  ],
});
const bodyFont = localFont({
  variable: '--font-body',
  display: 'swap',
  preload: false,
  fallback: ['Inter Fallback', 'Arial', 'sans-serif'],
  src: [{ path: './fonts/inter-latin.woff2', weight: '400 700', style: 'normal' }],
});
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_NAME, template: `%s · ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
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
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    siteName: SITE_NAME,
    images: [
      { url: '/icons/og-image.png', width: 1200, height: 630, alt: SITE_NAME },
    ],
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
};
export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: THEME_COLOR_LIGHT },
    { media: '(prefers-color-scheme: dark)', color: THEME_COLOR_DARK },
  ],
};
// Names the site for search results; species pages add their own entity below.
const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  inLanguage: 'de',
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body className={`${displayFont.variable} ${bodyFont.variable}`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <TooltipProvider delay={180}>{children}</TooltipProvider>
      </body>
    </html>
  );
}
