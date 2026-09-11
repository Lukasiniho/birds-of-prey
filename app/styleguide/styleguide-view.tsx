'use client';

/* Reference page for the design system. Every specimen below is rendered with a
 * shared role, so a new element can be compared against it by eye. If something
 * here looks wrong after a change, the role changed — not this page. */

import { useState } from 'react';
import { useSlidingPill } from '@/lib/use-sliding-pill';
import { SegmentedControl } from '@/components/segmented-control';

const surfaces = [
  ['--background', 'Seite, Kopfzeile, Tab-Pille'],
  ['--surface', 'Karten, Menüs, Dropdown-Trigger'],
  ['--stage', 'Bild- und Quizbühnen, Kartenwasser'],
  ['--muted', 'Ruhige Nebenfläche'],
  ['--hover', 'Zeilen- und Listen-Hover'],
  ['--selected', 'Aktive Navigation, Tags, gewählte Zeilen'],
  ['--selected-strong', 'Tag-Hover'],
] as const;

const inks = [
  ['--foreground', 'Text, Anatomiemarker'],
  ['--muted-foreground', 'Nebentext auf Seite und Karte'],
  ['--muted-foreground-stage', 'Nebentext auf Bühne und Tab-Schiene'],
  ['--muted-foreground-faint', 'Nur Nicht-Text: Schrittpunkte'],
  ['--border', 'Hairlines und Flächengrenzen'],
  ['--line-tint', 'Feine Rahmen auf Flächen'],
  ['--line-soft', 'Tab-Schiene'],
] as const;

const accents = [
  ['--main-color', 'Akzent; primary, ring, selection-border'],
  ['--primary-hover', 'Hover gefüllter Akzentbuttons'],
  ['--accent-ring', 'Leuchtringe um Marker und Pins'],
  ['--accent-line', 'Akzentrahmen'],
] as const;

const states = [
  ['--success', 'Richtige Antwort'],
  ['--success-soft', 'Fläche dahinter'],
  ['--danger', 'Falsche Antwort'],
  ['--danger-soft', 'Fläche dahinter'],
] as const;

const mapColors = [
  ['--map-water', 'Wasser'],
  ['--map-land', 'Land'],
  ['--map-border', 'Umriss'],
  ['--map-range', 'Verbreitung'],
] as const;

const tints = [
  ['--tint-1', '6 %', 'Tab-Schiene, hauchdünne Fläche'],
  ['--tint-2', '10 %', 'Auswahl, Tags, Hover auf Bühnen'],
  ['--tint-3', '16 %', 'Leuchtringe, Karten-Landfläche'],
  ['--tint-4', '24 %', 'Kräftige Auswahl (dunkel), Tag-Hover'],
  ['--tint-5', '34 %', 'Karten-Umriss, Tag-Hover (dunkel)'],
  ['--tint-6', '45 %', 'Verwandtschafts-Rahmen'],
] as const;

const textRoles = [
  ['--type-caption', 'Quellen und Bildnachweise', '12 px'],
  ['--type-ui', 'Filter und sonstige UI-Texte', '14 px'],
  ['--type-body', 'Fließtext und Aufgabentexte', '14 px'],
  ['--type-tag', 'Tags', '12 px'],
  ['--type-scientific', 'Wissenschaftlicher Artname', '16 px'],
  ['--type-button', 'Buttons und Hauptnavigation', '16 px'],
  ['--type-tab', 'Unterstrich-Tabs', '16 px'],
  ['--type-feedback-title', 'Quiz-Rückmeldung', '16 px'],
  ['--type-label-heading', 'Kompakte Artnamen', '18 px'],
  ['--type-lead', 'Einleitung', '18 px'],
  ['--type-label-title', 'Label-Titel', '20 px'],
  ['--type-card-title', 'Karten- und Listentitel', '20–24 px'],
  ['--type-detail-heading', 'Detailüberschrift', '24 px'],
  ['--type-heading', 'Weitere Überschrift', '28 px'],
  ['--type-quiz-question', 'Quiz-Frage', '32 px'],
  ['--type-page-title', 'Seitentitel', '32–40 px'],
  ['--type-section-title', 'Abschnittsüberschrift', '32–40 px'],
  ['--type-hero', 'Atlas-Titel', '32–48 px'],
] as const;

const weights = [
  ['--weight-regular', '400'],
  ['--weight-medium', '500'],
  ['--weight-semibold', '600'],
  ['--weight-bold', '700'],
] as const;

const trackings = [
  ['--tracking-tight', 'Display-Größen'],
  ['--tracking-normal', 'Fließtext und UI'],
  ['--tracking-caps', 'Versal-Labels'],
] as const;

const spaces = [2, 4, 8, 12, 16, 20, 24, 32, 40] as const;

const layoutRoles = [
  ['--page-gutter', 'Seitenrand', '40 px / mobil 20 px'],
  ['--section-gap', 'Abstand zwischen Abschnitten', '32 px'],
  ['--panel-padding', 'Panel-Innenabstand', '24 px / mobil 16 px'],
  ['--atlas-gutter', 'Atlas-Außenabstand', '12 px'],
] as const;

const radii = [
  ['--radius-small', 'Kennzeichnungen, Bildausschnitte'],
  ['--radius-control', 'Buttons, Eingaben, Auswahl'],
  ['--radius-card', 'Karten und Vorschauen'],
  ['--radius-surface', 'Große Flächen und Dialoge'],
  ['--radius-pill', 'Tags'],
  ['--radius-tab-pill', 'Pillen-Tabs'],
] as const;

const heights = [
  ['--control-height-compact', '30 px', 'Pillen-Tabs, Schalter'],
  ['--control-height', '38 px', 'Kopfzeile, Suche, Selects, Leiste'],
  ['--control-height-touch', '44 px', 'Große Aktionsflächen'],
] as const;

const shadows = [
  ['--shadow-none', 'Karten und große Flächen'],
  ['--shadow-subtle', 'Leicht angehobene Controls'],
  ['--shadow-floating', 'Tooltip, Menü, Drag-Vorschau'],
  ['--shadow-active-pill', 'Aktive Tab-Pille, Geschlechtsschalter'],
] as const;

const durations = [
  ['--duration-stagger', '40 ms', 'Versatz je Element'],
  ['--duration-micro', '80 ms', 'Kurze Verzögerungen'],
  ['--duration-quick', '150 ms', 'Hover, Schließen, Textwechsel'],
  ['--duration-fast', '250 ms', 'Icon-Swap, Öffnen, Tab-Pille'],
  ['--duration-medium', '350 ms', 'Panel und Toast schließen'],
  ['--duration-slow', '400 ms', 'Panel öffnen, Inhalt einblenden'],
  ['--duration-very-slow', '500 ms', 'Betonte Momente, Zahlen'],
] as const;

const easings = [
  ['--ease-smooth-out', 'Öffnen, schließen, gleiten'],
  ['--ease-in-out', 'Icon- und Textwechsel'],
  ['--ease-out', 'Hover-Farbe, Tooltip'],
  ['--ease-linear', 'Shimmer, Spinner'],
  ['--ease-bounce', 'Die einzige Überschwingkurve'],
] as const;

const breakpoints = [
  ['640 px', 'Telefon: einspaltig, Messwerte gestapelt'],
  ['760 px', 'Tablet hochkant: mobile Kopfzeile, Rand 20 px'],
  ['980 px', 'Atlas einspaltig, Seitenspalten schmaler'],
  ['1190 px', 'Breite Layouts werden kompakter'],
  ['1600 px', 'Sehr breite Bildschirme: Spalten wachsen'],
] as const;

function Swatch({ token, note }: { token: string; note: string }) {
  return (
    <div className="sg-swatch">
      <div className="sg-chip" style={{ background: `var(${token})` }} />
      <span className="sg-name">{token}</span>
      <span className="sg-note">{note}</span>
    </div>
  );
}

function Section({
  title,
  intro,
  children,
}: {
  title: string;
  intro: string;
  children: React.ReactNode;
}) {
  return (
    <section className="sg-section">
      <h2>{title}</h2>
      <p>{intro}</p>
      {children}
    </section>
  );
}

export default function StyleguideView() {
  const [pill, setPill] = useState('altvogel');
  const [line, setLine] = useState('steckbrief');
  const { barRef, pillRef } = useSlidingPill('styleguide', line);

  return (
    <div className="app-shell section-shell">
      <main className="sg-main page-content">
        <header className="sg-heading">
          <h1 className="page-title">Design-System</h1>
          <p>
            Jede Rolle einmal, so wie sie in der Anwendung aussieht. Diese Seite
            definiert nichts eigenes: Wenn hier etwas falsch wirkt, hat sich die
            Rolle geändert. Zum Prüfen den Hell-Dunkel-Schalter der Anwendung
            umstellen und die Seite erneut ansehen.
          </p>
        </header>

        <Section
          title="Flächen"
          intro="Von der Seite nach vorn: Hintergrund, erhabene Fläche, vertiefte Bühne. Auswahl und Hover sind getönte Varianten, keine eigenen Farben."
        >
          <div className="sg-grid">
            {surfaces.map(([token, note]) => (
              <Swatch key={token} token={token} note={note} />
            ))}
          </div>
        </Section>

        <Section
          title="Text und Linien"
          intro="Nebentext und Hairlines haben je eine Rolle; abgeschwächte Varianten sind eigene Rollen, keine Opazität am Einsatzort."
        >
          <div className="sg-grid">
            {inks.map(([token, note]) => (
              <Swatch key={token} token={token} note={note} />
            ))}
          </div>
        </Section>

        <Section
          title="Akzent"
          intro="Ein Teal für alles: Auswahl, Fokus, Duotone-Icons und gefüllte Buttons."
        >
          <div className="sg-grid">
            {accents.map(([token, note]) => (
              <Swatch key={token} token={token} note={note} />
            ))}
          </div>
        </Section>

        <Section
          title="Status"
          intro="Richtig und falsch, jeweils als Text- und Flächenfarbe. Sie stammen aus dem Quiz und stehen jeder Seite zur Verfügung."
        >
          <div className="sg-grid">
            {states.map(([token, note]) => (
              <Swatch key={token} token={token} note={note} />
            ))}
          </div>
          <div
            className="sg-specimens"
            style={{ marginTop: 'var(--space-16)' }}
          >
            <span
              className="sg-surface"
              style={{
                background: 'var(--success-soft)',
                color: 'var(--success)',
                minWidth: '220px',
              }}
            >
              Alles richtig erkannt
            </span>
            <span
              className="sg-surface"
              style={{
                background: 'var(--danger-soft)',
                color: 'var(--danger)',
                minWidth: '220px',
              }}
            >
              Noch nicht vollständig
            </span>
          </div>
        </Section>

        <Section
          title="Tönungsstufen"
          intro="Getönte Flächen entstehen nur mit diesen sechs Anteilen. Jede andere Prozentzahl lässt den Lint-Lauf fehlschlagen."
        >
          <div className="sg-grid">
            {tints.map(([token, value, note]) => (
              <div className="sg-swatch" key={token}>
                <div
                  className="sg-chip"
                  style={{
                    background: `color-mix(in srgb, var(--main-color) var(${token}), var(--background))`,
                  }}
                />
                <span className="sg-name">
                  {token} · {value}
                </span>
                <span className="sg-note">{note}</span>
              </div>
            ))}
          </div>
        </Section>

        <Section
          title="Verbreitungskarte"
          intro="Die Karte hat eigene Flächenfarben, weil Wasser und Land nicht dieselbe Bedeutung haben wie Oberflächen der Anwendung."
        >
          <div className="sg-grid">
            {mapColors.map(([token, note]) => (
              <Swatch key={token} token={token} note={note} />
            ))}
          </div>
        </Section>

        <Section
          title="Schriftgrößen"
          intro="Jede Größe ist eine Rolle mit einer Aufgabe. Neue Größen entstehen nicht am Einsatzort, sondern in typography.css."
        >
          <dl className="sg-rows">
            {textRoles.map(([token, note, size]) => (
              <div className="sg-row" key={token}>
                <dt>
                  {token} · {size}
                </dt>
                <dd style={{ fontSize: `var(${token})` }}>{note}</dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section
          title="Schriftstapel, Gewichte und Laufweite"
          intro="Inter für Fließtext und Bedienelemente, Source Serif 4 für redaktionelle Titel. Fallback-Fonts stehen nur in den beiden Stapel-Rollen."
        >
          <dl className="sg-rows">
            <div className="sg-row">
              <dt>--font-stack-body</dt>
              <dd style={{ fontFamily: 'var(--font-stack-body)' }}>
                Der Wanderfalke stößt im Sturzflug auf seine Beute herab.
              </dd>
            </div>
            <div className="sg-row">
              <dt>--font-stack-display</dt>
              <dd
                style={{
                  fontFamily: 'var(--font-stack-display)',
                  fontSize: 'var(--type-detail-heading)',
                }}
              >
                Erkennungsmerkmale
              </dd>
            </div>
            {weights.map(([token, value]) => (
              <div className="sg-row" key={token}>
                <dt>
                  {token} · {value}
                </dt>
                <dd style={{ fontWeight: `var(${token})` }}>
                  Mäusebussard, Rotmilan, Habicht
                </dd>
              </div>
            ))}
            {trackings.map(([token, note]) => (
              <div className="sg-row" key={token}>
                <dt>{token}</dt>
                <dd
                  style={{
                    letterSpacing: `var(${token})`,
                    fontSize: 'var(--type-label-title)',
                    textTransform:
                      token === '--tracking-caps' ? 'uppercase' : 'none',
                  }}
                >
                  {note}
                </dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section
          title="Abstände"
          intro="Eine Skala für alle Abstände, dazu die Layoutrollen, die Seiten und Panels gemeinsam verwenden."
        >
          <dl className="sg-rows">
            {spaces.map((value) => (
              <div className="sg-row" key={value}>
                <dt>
                  --space-{value} · {value} px
                </dt>
                <dd>
                  <span
                    className="sg-chip"
                    style={{
                      display: 'block',
                      width: `var(--space-${value})`,
                      height: 'var(--space-24)',
                      background: 'var(--main-color)',
                      border: 0,
                    }}
                  />
                </dd>
              </div>
            ))}
            {layoutRoles.map(([token, note, value]) => (
              <div className="sg-row" key={token}>
                <dt>{token}</dt>
                <dd className="sg-note">
                  {note} · {value}
                </dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section
          title="Radien, Rahmen und Steuerhöhen"
          intro="Radien folgen der Größe der Fläche. Steuerhöhen gibt es in drei Stufen; jede Leiste und jedes Eingabefeld nimmt eine davon."
        >
          <div className="sg-specimens">
            {radii.map(([token, note]) => (
              <div className="sg-swatch" key={token} style={{ width: '210px' }}>
                <div
                  className="sg-chip"
                  style={{
                    borderRadius: `var(${token})`,
                    background: 'var(--stage)',
                  }}
                />
                <span className="sg-name">{token}</span>
                <span className="sg-note">{note}</span>
              </div>
            ))}
          </div>
          <dl className="sg-rows" style={{ marginTop: 'var(--space-24)' }}>
            {heights.map(([token, value, note]) => (
              <div className="sg-row" key={token}>
                <dt>
                  {token} · {value}
                </dt>
                <dd>
                  <span
                    style={{
                      display: 'inline-grid',
                      placeItems: 'center',
                      height: `var(${token})`,
                      padding: '0 var(--space-16)',
                      borderRadius: 'var(--radius-control)',
                      border: 'var(--border-structure) solid var(--border)',
                      fontSize: 'var(--type-ui)',
                      color: 'var(--muted-foreground)',
                    }}
                  >
                    {note}
                  </span>
                </dd>
              </div>
            ))}
            <div className="sg-row">
              <dt>--border-structure · 1 px</dt>
              <dd>
                <span
                  className="sg-box"
                  style={{
                    borderWidth: 'var(--border-structure)',
                    borderRadius: 'var(--radius-card)',
                  }}
                >
                  Fläche
                </span>
              </dd>
            </div>
            <div className="sg-row">
              <dt>--border-selection · 2 px</dt>
              <dd>
                <span
                  className="sg-box"
                  style={{
                    borderWidth: 'var(--border-selection)',
                    borderColor: 'var(--selection-border)',
                    borderRadius: 'var(--radius-card)',
                  }}
                >
                  Auswahl
                </span>
              </dd>
            </div>
          </dl>
        </Section>

        <Section
          title="Schatten"
          intro="Drei Stufen Höhe plus die Pille. Karten liegen flach; nur Schwebendes wirft einen Schatten."
        >
          <div className="sg-specimens">
            {shadows.map(([token, note]) => (
              <span
                key={token}
                className="sg-surface"
                style={{
                  width: '240px',
                  background: 'var(--surface)',
                  boxShadow: `var(${token})`,
                }}
              >
                {token}
                <br />
                {note}
              </span>
            ))}
          </div>
        </Section>

        <Section
          title="Fokus"
          intro="Ein Ring für alle Controls. Flächen, die ihren Überlauf beschneiden, verschieben nur den Offset nach innen."
        >
          <div className="sg-specimens">
            <button
              type="button"
              style={{
                height: 'var(--control-height)',
                padding: '0 var(--space-16)',
                border: 'var(--border-structure) solid var(--border)',
                background: 'var(--surface)',
                fontSize: 'var(--type-ui)',
              }}
            >
              Mit Tab hierher springen
            </button>
            <span className="sg-note">
              --focus-ring · 2 px solid var(--ring), Offset --focus-offset
            </span>
          </div>
        </Section>

        <Section
          title="Tabs"
          intro="Genau zwei Rollen: die Pille für Schalter innerhalb einer Fläche, die Unterstrich-Leiste für Abschnitte einer Seite."
        >
          <div className="sg-specimens">
            <SegmentedControl
              label="Pillen-Tabs"
              group="styleguide"
              value={pill}
              options={[
                { value: 'altvogel', label: 'Altvogel' },
                { value: 'jungvogel', label: 'Jungvogel' },
              ]}
              onChange={setPill}
            />
            <span className="sg-note">.t-tabs · 30 px, 14 px/500</span>
          </div>
          <div
            className="t-tabs t-tabs-line"
            role="group"
            aria-label="Unterstrich-Tabs"
            ref={barRef}
            style={{ marginTop: 'var(--space-24)' }}
          >
            <span className="t-tabs-pill" aria-hidden="true" ref={pillRef} />
            {[
              ['steckbrief', 'Steckbrief'],
              ['nahrung', 'Nahrung'],
              ['lebensraum', 'Lebensraum'],
            ].map(([id, label]) => (
              <button
                key={id}
                type="button"
                className="t-tab"
                data-label={label}
                aria-pressed={line === id}
                onClick={() => setLine(id)}
              >
                {label}
              </button>
            ))}
          </div>
          <p className="sg-note" style={{ marginTop: 'var(--space-8)' }}>
            .t-tabs.t-tabs-line · 38 px, 16 px, 2-px-Markierung
          </p>
        </Section>

        <Section
          title="Bewegung"
          intro="Dauern und Kurven kommen aus einer Skala. Snippet-Gruppen verweisen darauf; im Seiten-CSS stehen keine Zahlen."
        >
          <dl className="sg-rows">
            {durations.map(([token, value, note]) => (
              <div className="sg-row" key={token}>
                <dt>
                  {token} · {value}
                </dt>
                <dd className="sg-note">{note}</dd>
              </div>
            ))}
            {easings.map(([token, note]) => (
              <div className="sg-row" key={token}>
                <dt>{token}</dt>
                <dd className="sg-note">{note}</dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section
          title="Breakpoints"
          intro="Fünf Umbruchpunkte für die ganze Anwendung. Bricht ein Layout dazwischen, wird das Layout angepasst, nicht die Skala."
        >
          <dl className="sg-rows">
            {breakpoints.map(([value, note]) => (
              <div className="sg-row" key={value}>
                <dt>{value}</dt>
                <dd className="sg-note">{note}</dd>
              </div>
            ))}
          </dl>
        </Section>
      </main>
    </div>
  );
}
