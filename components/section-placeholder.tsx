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
      <main className="section-placeholder py-[clamp(48px,10vw,120px)] px-[28px] to-tablet:px-5 max-w-[960px] my-0 mx-auto">
        <h1 className="page-title font-(family-name:--font-stack-display) text-(length:--type-page-title) font-(--weight-semibold) leading-(--leading-display) tracking-(--tracking-tight)">
          {title}
        </h1>
        <p className="mt-5 max-w-[55ch] leading-(--leading-relaxed) text-muted-foreground">
          {description}
        </p>
        <a className="section-back-link inline-block mt-8 py-2" href="/">
          Vögel entdecken
        </a>
      </main>
    </div>
  );
}
