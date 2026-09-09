/* oxlint-disable next/no-html-link-for-pages -- Use document navigation for the static Netlify export. */

import { SiteHeader, type SiteSection } from '@/components/site-header';

export function SectionPlaceholder({
  section,
  title,
  description,
}: {
  section: Exclude<SiteSection, 'birds'>;
  title: string;
  description: string;
}) {
  return (
    <div className="app-shell section-shell">
      <SiteHeader activeSection={section} />
      <main className="section-placeholder">
        <h1 className="page-title">{title}</h1>
        <p>{description}</p>
        <a className="section-back-link" href="/">
          Vögel entdecken
        </a>
      </main>
    </div>
  );
}
