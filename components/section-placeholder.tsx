import Link from 'next/link';
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
        <h1>{title}</h1>
        <p>{description}</p>
        <Link className="section-back-link" href="/">
          Vögel entdecken
        </Link>
      </main>
    </div>
  );
}
