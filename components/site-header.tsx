'use client';

/* oxlint-disable next/no-html-link-for-pages -- Use document navigation for the static Netlify export. */

import { TooltipHint } from '@/components/ui/tooltip';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { portraitImages } from '@/lib/portrait-images';

import {
  InfoDuotone,
  List as Menu,
  Moon,
  MagnifyingGlass as Search,
  Sun,
  X,
} from '@/components/icons';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const sections = [
  { id: 'birds', label: 'Vögel', href: '/' },
  { id: 'wissen', label: 'Wissen', href: '/wissen' },
  { id: 'quiz', label: 'Quiz', href: '/quiz' },
] as const;

export type SiteSection = (typeof sections)[number]['id'] | 'falknerei';

const siteLinks = [
  { label: 'lukasvonhohnhorst.com', href: 'https://lukasvonhohnhorst.com' },
  { label: 'weltklugheit.com', href: 'https://weltklugheit.com' },
  { label: 'athenify.io', href: 'https://athenify.io' },
  { label: 'katamtka.de', href: 'https://katamtka.de' },
] as const;

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
        <a href="/" className="site-title">
          <span className="site-title-portrait" aria-hidden="true">
            <Image
              src={portraitImages.steinadler}
              alt=""
              width={48}
              height={48}
              unoptimized
            />
          </span>
          <span>Greifvogelkompass</span>
        </a>
        {activeSection === 'birds' && onQueryChange && (
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
      <div className="mobile-navigation">
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger
            render={
              <Button
                variant="ghost"
                size="icon"
                aria-label="Navigation öffnen"
              />
            }
          >
            <Menu />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="header-menu">
            {sections.map((section) => (
              <DropdownMenuItem
                key={section.id}
                render={
                  <a
                    href={section.href}
                    aria-current={
                      activeSection === section.id ? 'page' : undefined
                    }
                  />
                }
              >
                {section.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="header-actions">
        <TooltipHint content={dark ? 'Hellmodus' : 'Dunkelmodus'}>
          <Button
            variant="ghost"
            size="icon"
            className="header-action theme-toggle"
            onClick={toggleTheme}
            aria-label={
              dark ? 'Hellmodus aktivieren' : 'Dunkelmodus aktivieren'
            }
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
        </TooltipHint>
        <DropdownMenu modal={false}>
          <TooltipHint content="Über diese Seite">
            <DropdownMenuTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="header-action"
                  aria-label="Über diese Seite"
                />
              }
            >
              <InfoDuotone />
            </DropdownMenuTrigger>
          </TooltipHint>
          <DropdownMenuContent align="end" className="header-menu">
            {siteLinks.map((link) => (
              <DropdownMenuItem
                key={link.href}
                render={<a href={link.href} target="_blank" rel="noreferrer" />}
              >
                {link.label}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              render={
                <a
                  href="https://lukasvonhohnhorst.com/impressum"
                  target="_blank"
                  rel="noreferrer"
                />
              }
            >
              Impressum
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
