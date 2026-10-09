'use client';

/* oxlint-disable next/no-html-link-for-pages -- Use document navigation for the static Netlify export. */

import { TooltipHint } from '@/components/ui/tooltip';
import { useEffect, useState, type ComponentProps } from 'react';
import { ArtImage } from '@/components/art-image';
import { portraitImages } from '@/lib/portrait-images';

import {
  ArrowUpRight,
  InfoDuotone,
  List as Menu,
  Moon,
  Sun,
} from '@/components/icons';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Button, buttonVariants } from '@/components/ui/button';
import { SearchField } from '@/components/search-field';
import { useI18n } from '@/components/i18n';
import { currentUrl, localePath, msg } from '@/lib/i18n';
import { SITE_NAMES } from '@/lib/site';
import { cn } from '@/lib/utils';

const sections = [
  { id: 'birds', label: msg('Vögel'), href: '/' },
  { id: 'wissen', label: msg('Wissen'), href: '/wissen' },
  { id: 'quiz', label: 'Quiz', href: '/quiz' },
] as const;

export type SiteSection = (typeof sections)[number]['id'] | 'falknerei';

const siteLinks = [
  { label: msg('Meine Webseite'), href: 'https://lukasvonhohnhorst.com' },
  { label: msg('Lerntracking-App „Athenify“'), href: 'https://athenify.io' },
  {
    label: msg('Geschichtsatlas „World War Atlas“'),
    href: 'https://worldwaratlas.com',
  },
  { label: msg('Kartenspiel „Hexarcana“'), href: 'https://hexarcana-game.com' },
  {
    label: msg('Mentale Modelle „Weltklugheit“'),
    href: 'https://weltklugheit.com',
  },
  { label: msg('Fantasy-Projekt „Katamtka“'), href: 'https://katamtka.de' },
] as const;

function SiteMenuItem(props: ComponentProps<typeof DropdownMenuItem>) {
  return (
    <DropdownMenuItem
      {...props}
      className="text-(length:--type-ui) font-(--weight-medium) py-2 px-3"
    />
  );
}

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
  const { locale, t } = useI18n();
  const otherLocale = locale === 'de' ? 'en' : 'de';
  // Same page in the other language; read on use because the atlas swaps
  // its URL with pushState.
  function pointLanguageLink(event: { currentTarget: HTMLAnchorElement }) {
    const url = currentUrl();
    event.currentTarget.href = localePath(
      url.pathname + url.search + url.hash,
      otherLocale,
    );
  }

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
    <header
      className="topbar site-header grid grid-cols-[minmax(0,1fr)_auto_auto] grid-rows-[minmax(0,1fr)] items-center gap-x-2 gap-y-0 h-(--site-header-height) px-page py-0 border-b-(length:--border-structure) border-border bg-background to-tablet:gap-y-3 to-tablet:py-2"
      data-section={activeSection}
    >
      <div className="header-brand col-start-1 row-start-1 flex items-center gap-3 min-w-0 to-tablet:contents">
        <a
          href={localePath('/', locale)}
          className="site-title flex flex-none items-center gap-2 min-w-0 font-(family-name:--font-stack-body) text-(length:--type-brand) font-(--weight-medium) tracking-(--tracking-tight) leading-(--leading-display) whitespace-nowrap to-tablet:col-start-1 to-tablet:row-start-1"
        >
          <span
            className="site-title-portrait size-8 flex-[0_0_var(--space-32)]"
            aria-hidden="true"
          >
            <ArtImage
              className="block size-full object-contain"
              src={portraitImages.steinadler}
              alt=""
              width={48}
              height={48}
              displayWidth={48}
            />
          </span>
          <span className="to-tablet:truncate">{SITE_NAMES[locale]}</span>
        </a>
        {activeSection === 'birds' && onQueryChange && (
          <SearchField
            query={query}
            onQueryChange={onQueryChange}
            label={t('Vogelart suchen')}
            className="topbar-search flex-[0_1_220px] min-w-[140px] w-full m-0 to-tablet:col-span-full to-tablet:row-start-2 to-phone:hidden"
          />
        )}
      </div>
      <nav
        className="site-navigation col-start-2 row-start-1 justify-self-end flex items-center gap-2 to-tablet:hidden"
        aria-label={t('Hauptnavigation')}
      >
        {sections.map((section) => (
          <a
            key={section.id}
            className="inline-flex items-center justify-center h-(--header-control-height) px-3 py-0 rounded-(--radius-control) text-(length:--type-button) leading-(--leading-normal) font-(--weight-medium) whitespace-nowrap"
            href={localePath(section.href, locale)}
            aria-current={activeSection === section.id ? 'page' : undefined}
          >
            {t(section.label)}
          </a>
        ))}
      </nav>
      <div className="mobile-navigation hidden to-tablet:flex to-tablet:items-center to-tablet:col-start-3 to-tablet:row-start-1">
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger
            render={
              <Button
                variant="ghost"
                size="icon"
                aria-label={t('Navigation öffnen')}
                className="to-tablet:size-(--header-control-height)"
              />
            }
          >
            <Menu />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="header-menu min-w-[160px] w-max"
          >
            {sections.map((section) => (
              <SiteMenuItem
                key={section.id}
                render={
                  // oxlint-disable-next-line jsx-a11y/anchor-has-content, jsx-a11y/control-has-associated-label -- the menu item supplies the link text
                  <a
                    href={localePath(section.href, locale)}
                    aria-current={
                      activeSection === section.id ? 'page' : undefined
                    }
                  />
                }
              >
                {t(section.label)}
              </SiteMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="header-actions col-start-3 row-start-1 flex items-center gap-2 justify-self-end to-tablet:col-start-2">
        <TooltipHint content={otherLocale === 'en' ? 'English' : 'Deutsch'}>
          <a
            href={localePath('/', otherLocale)}
            hrefLang={otherLocale}
            lang={otherLocale}
            className={cn(
              buttonVariants({ variant: 'ghost', size: 'icon' }),
              'header-action size-(--header-control-height) p-0 min-w-(--header-control-height) text-(length:--type-button)',
            )}
            aria-label={
              otherLocale === 'en'
                ? 'Switch to English'
                : 'Auf Deutsch wechseln'
            }
            onPointerEnter={pointLanguageLink}
            onFocus={pointLanguageLink}
            onClick={pointLanguageLink}
          >
            {otherLocale.toUpperCase()}
          </a>
        </TooltipHint>
        <TooltipHint content={t(dark ? 'Hellmodus' : 'Dunkelmodus')}>
          <Button
            variant="ghost"
            size="icon"
            className="header-action size-(--header-control-height) p-0 min-w-(--header-control-height) theme-toggle"
            onClick={toggleTheme}
            aria-label={t(
              dark ? 'Hellmodus aktivieren' : 'Dunkelmodus aktivieren',
            )}
          >
            <span
              className="t-icon-swap relative inline-grid"
              data-state={dark ? 'b' : 'a'}
            >
              <span
                className="t-icon [grid-area:1/1] inline-flex"
                data-icon="a"
              >
                <Moon className="size-[18px]" />
              </span>
              <span
                className="t-icon [grid-area:1/1] inline-flex"
                data-icon="b"
              >
                <Sun className="size-[18px]" />
              </span>
            </span>
          </Button>
        </TooltipHint>
        <DropdownMenu modal={false}>
          <TooltipHint content={t('Über diese Seite')}>
            <DropdownMenuTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="header-action size-(--header-control-height) p-0 min-w-(--header-control-height)"
                  aria-label={t('Über diese Seite')}
                />
              }
            >
              <InfoDuotone className="size-[18px]" />
            </DropdownMenuTrigger>
          </TooltipHint>
          <DropdownMenuContent
            align="end"
            className="header-menu min-w-[160px] w-max"
          >
            <DropdownMenuGroup>
              <DropdownMenuLabel className="pt-2 px-3 pb-1 text-(length:--type-ui) font-(--weight-medium) text-muted-foreground">
                {t('Andere Projekte')}
              </DropdownMenuLabel>
              {siteLinks.map((link) => (
                <SiteMenuItem
                  key={link.href}
                  render={
                    // oxlint-disable-next-line jsx-a11y/anchor-has-content, jsx-a11y/control-has-associated-label -- the menu item supplies the link text
                    <a href={link.href} target="_blank" rel="noreferrer" />
                  }
                >
                  {t(link.label)}
                  <ArrowUpRight
                    size={16}
                    className="ml-auto text-muted-foreground"
                    aria-hidden="true"
                  />
                </SiteMenuItem>
              ))}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <SiteMenuItem
              render={
                // oxlint-disable-next-line jsx-a11y/anchor-has-content, jsx-a11y/control-has-associated-label -- the menu item supplies the link text
                <a
                  href="https://lukasvonhohnhorst.com/impressum"
                  target="_blank"
                  rel="noreferrer"
                />
              }
            >
              {t('Impressum')}
              <ArrowUpRight
                size={16}
                className="ml-auto text-muted-foreground"
                aria-hidden="true"
              />
            </SiteMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
