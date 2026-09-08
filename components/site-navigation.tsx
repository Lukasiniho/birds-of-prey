'use client';
import Link from 'next/link';
export function SiteNavigation({ active }: { active: 'birds' | 'knowledge' }) {
  return (
    <nav className="site-navigation" aria-label="Hauptnavigation">
      <Link href="/" aria-current={active === 'birds' ? 'page' : undefined}>
        Vögel
      </Link>
      <Link
        href="/wissen/jagdtechniken"
        aria-current={active === 'knowledge' ? 'page' : undefined}
      >
        Wissen
      </Link>
    </nav>
  );
}
