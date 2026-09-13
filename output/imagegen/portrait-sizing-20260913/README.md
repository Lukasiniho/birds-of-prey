# Porträtkorrekturen vom 13. September 2026, ab 10:43 Uhr

Alle Größenänderungen beziehen sich linear auf den unmittelbar vorher sichtbaren Stand in der Artenleiste. Bildboxen und Zeilen bleiben unverändert; Skalierung über die vorhandenen artspezifischen CSS-Regeln in `app/atlas.css`.

| Arten | Änderung | CSS-Hintergrundgröße |
| --- | --- | --- |
| Mäusebussard, Rotschwanzbussard | +5 % | 105 % |
| Baumfalke | etwas weniger Hals, +7 % | 107 % |
| Kaiseradler | +6 % | 106 % |
| Steppenadler | +6 % relativ zu bisherigen 90 % | 95,4 % |
| Habichtsadler, Iberienadler | +4 % | 104 % |
| Fischadler | etwas mehr Hals unten, +5 % | 105 % |
| Uhu, Virginiauhu | +7 % | 107 % |

Neue Halsabschlüsse mit dem eingebauten Imagegen-Werkzeug erzeugt. Habicht ausschließlich als gemeinsame Kompositionsreferenz verwendet. Eingebrannte Schachbretthintergründe durch einen separaten grünen Maskierungshintergrund ersetzt und lokal freigestellt. Die ursprünglichen Köpfe bleiben pixelgenau erhalten; nur die unteren Halsbereiche werden mit den neuen Federabschlüssen verbunden, ohne Stauchung oder Dehnung. Vollständige Prompts, Quellen und SHA-256-Prüfsummen stehen in `manifest.json`; reproduzierbare lokale Verarbeitung in `finish.mjs`.

Neue aktive Dateien:
- `public/birds/portrait-baumfalke-20260913-v3.png`
- `public/birds/portrait-fischadler-20260913-v3.png`

Prüfung: natürliche Federabschlüsse auf hellem, dunklem und grünlichem Hintergrund (`neck-review.png`); alle zehn Porträts ohne angeschnittene sichtbare Federn bei Zielskalierung (`verification.json`). In der localhost-Artenleiste die berechneten CSS-Größen aller zehn Arten kontrolliert; Baumfalke, Fischadler und beide Uhus sowie angrenzende Adler visuell in den echten 64-px-Bildboxen geprüft. Originalköpfe der beiden Halskorrekturen pixelgenau unverändert bestätigt.

`npm run build` einschließlich Bildoptimierung erfolgreich. Design-Lint erfolgreich. Der vollständige Lint-Lauf meldet bereits bestehende Fehler in `components/ui/carousel.tsx:101` sowie `components/ui/chart.tsx:155`, `:203` und `:302`.
