import { en } from '@/lib/i18n/en';

// Das Wörterbuch als ein gecachtes Skript statt in jeder englischen Seite.
// Nur im Dev-Server; der Build schreibt die Datei in scripts/promote-locale-site.mjs.
export const dynamic = 'force-static';
export function GET() {
  return new Response(`window.__I18N_EN__=${JSON.stringify(en)};`, {
    headers: { 'content-type': 'text/javascript; charset=utf-8' },
  });
}
