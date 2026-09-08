# birds-of-prey
A collection of various birds of prey

Interaktiver deutschsprachiger Greifvogelatlas für greifvogelkompass.de.

## Entwicklung

Node.js 22 verwenden, dann `npm ci` und `npm run dev`.

## Design und Typografie

Tailwind CSS 4 und shadcn/Base UI bilden die Basis; das Seitendesign nutzt eigene
CSS-Dateien. Schriftgrößen und Zeilenhöhen werden zentral in `app/typography.css`
definiert. Für neue und bestehende Komponenten gelten die
[Typografie-Regeln](docs/typography.md).

## Netlify

Repository mit Netlify verbinden und `main` als Production Branch wählen.
Die Datei `netlify.toml` konfiguriert den Build automatisch:

- Build command: `npm run build`
- Publish directory: `dist/client`
- Base directory: leer (Repository-Wurzel)
- Node.js: 22

Jeder Push auf `main` löst bei einer verbundenen Netlify-Site einen neuen Deploy aus.
Der Netlify-Build exportiert statisches HTML und Assets ohne Server-Funktionen.
Lokal lässt sich dieser Build mit `NETLIFY=true npm run build` prüfen.

Vor jedem Build optimiert Sharp die Originalbilder automatisch zu WebP:
280 px für Porträts, maximal 1400 px für größere Abbildungen, ohne Beschnitt.
Transparenz bleibt erhalten. Inhaltsversionierte Dateinamen ermöglichen dauerhaftes
Browser-Caching; ersetzte Bilder erhalten automatisch eine neue URL.

Die Domain bleibt bei Strato. Zuerst die Domain in Netlify hinzufügen, danach
die von Netlify angegebenen DNS-Einträge bei Strato setzen.
