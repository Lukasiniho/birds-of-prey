# birds-of-prey
A collection of various birds of prey

Interaktiver deutschsprachiger Greifvogelatlas für greifvogelkompass.de.

## Entwicklung

Node.js 22 verwenden, dann `npm ci` und `npm run dev`.

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

Die Domain bleibt bei Strato. Zuerst die Domain in Netlify hinzufügen, danach
die von Netlify angegebenen DNS-Einträge bei Strato setzen.
