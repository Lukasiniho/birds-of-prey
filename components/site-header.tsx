'use client';

/* oxlint-disable next/no-html-link-for-pages -- Use document navigation for the static Netlify export. */

import { useEffect, useState } from 'react';
import { Moon, Search, Sun, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const sections = [
  { id: 'birds', label: 'Vögel', href: '/' },
  { id: 'wissen', label: 'Wissen', href: '/wissen' },
  { id: 'quiz', label: 'Quiz', href: '/quiz' },
] as const;

export type SiteSection = (typeof sections)[number]['id'] | 'falknerei';

export function SiteHeader({
  activeSection,
  query = '',
  onQueryChange,
}: {
  activeSection: SiteSection;
  query?: string;
  onQueryChange?: (query: string) => void;
}) {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      let savedDark = document.documentElement.dataset.theme === 'dark';
      try {
        savedDark = localStorage.getItem('raptor:theme') === 'dark';
      } catch {}
      setDark(savedDark);
      document.documentElement.dataset.theme = savedDark ? 'dark' : 'light';
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  function toggleTheme() {
    const nextDark = !dark;
    setDark(nextDark);
    document.documentElement.dataset.theme = nextDark ? 'dark' : 'light';
    try {
      localStorage.setItem('raptor:theme', nextDark ? 'dark' : 'light');
    } catch {}
  }

  return (
    <header className="topbar site-header" data-section={activeSection}>
      <div className="header-brand">
      {onQueryChange && (
        <div className="search-wrap topbar-search">
          <Search size={17} />
          <Input
            aria-label="Vogelart suchen"
            placeholder="Vogelart suchen"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
          />
          {query && (
            <button
              className="clear-search"
              aria-label="Suche leeren"
              onClick={() => onQueryChange('')}
            >
              <X size={14} />
            </button>
          )}
        </div>
      )}
      <a href="/" className="site-title">
        Die Welt der Greifvögel
      </a>
      </div>
      <div className="header-actions">
        <Button
          variant="ghost"
          size="icon"
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={dark ? 'Hellmodus aktivieren' : 'Dunkelmodus aktivieren'}
          title={dark ? 'Hellmodus' : 'Dunkelmodus'}
        >
          <span className="t-icon-swap" data-state={dark ? 'b' : 'a'}>
            <span className="t-icon" data-icon="a">
              <Moon />
            </span>
            <span className="t-icon" data-icon="b">
              <Sun />
            </span>
          </span>
        </Button>
      </div>
      <nav className="site-navigation" aria-label="Hauptnavigation">
        {sections.map((section) => (
          <a
            key={section.id}
            href={section.href}
            aria-current={activeSection === section.id ? 'page' : undefined}
          >
            {section.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
