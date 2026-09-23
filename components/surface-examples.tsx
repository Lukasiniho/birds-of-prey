'use client';

import { useState } from 'react';
import { CloseControl } from '@/components/close-control';
import {
  Surface,
  SurfaceBody,
  SurfaceHeader,
  SurfaceFooter,
  surfaceStyles,
} from '@/components/surface';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardAction,
} from '@/components/ui/card';

const longTitle = 'Verbreitung und Lebensräume des Europäischen Wespenbussards';

export function SurfaceExamples() {
  const [compactVisible, setCompactVisible] = useState(true);
  return (
    <div className="grid gap-4">
      <Surface className={surfaceStyles.stack}>
        <SurfaceHeader
          actions={
            <CloseControl
              aria-label="Beispiel-Schließen (deaktiviert)"
              disabled
            />
          }
          description={
            <p className="text-muted-foreground">
              Standardfläche: 20 px Radius, 24 px Innenabstand; mobil 16 px.
            </p>
          }
        >
          <h3 className={surfaceStyles.title}>{longTitle}</h3>
        </SurfaceHeader>
        <SurfaceBody>
          <p>
            Der Titel darf umbrechen. Die Aktion bleibt oben rechts in ihrer
            eigenen Spalte. Kopf und Inhalt liegen auf derselben Achse.
          </p>
        </SurfaceBody>
        <SurfaceFooter>
          <Dialog>
            <DialogTrigger render={<Button variant="outline" />}>
              Stärker gerundeten Dialog testen
            </DialogTrigger>
            <DialogContent
              size="large"
              heading={<DialogTitle>{longTitle}</DialogTitle>}
            >
              <DialogDescription>
                Der Kopf bleibt sichtbar, während lange Inhalte innerhalb der
                Fläche scrollen.
              </DialogDescription>
              {Array.from({ length: 12 }, (_, index) => (
                <p key={index}>
                  Der Wespenbussard bewohnt abwechslungsreiche Landschaften mit
                  Wald, Wiesen und offenen Flächen. Er ernährt sich vor allem
                  von Wespenbrut. Abschnitt {index + 1}.
                </p>
              ))}
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger render={<Button variant="outline" />}>
              Kompakten Dialog testen
            </DialogTrigger>
            <DialogContent heading={<DialogTitle>Bildnachweis</DialogTitle>}>
              <DialogDescription>
                Die kompakte Variante verwendet 20 px Radius. Schließen, Kopf
                und Innenabstände bleiben gemeinsam.
              </DialogDescription>
            </DialogContent>
          </Dialog>
          <Sheet>
            <SheetTrigger render={<Button variant="outline" />}>
              Sheet testen
            </SheetTrigger>
            <SheetContent
              side="bottom"
              className="max-h-[80dvh]"
              heading={<SheetTitle>{longTitle}</SheetTitle>}
            >
              <SheetDescription>
                20 px an freien Ecken, derselbe Kopf und dieselbe
                Schließen-Aktion.
              </SheetDescription>
              {Array.from({ length: 12 }, (_, index) => (
                <p key={index}>
                  Die Artenauswahl und andere Sheets verwenden dieselben
                  Innenabstände wie große Dialoge. Eintrag {index + 1}.
                </p>
              ))}
            </SheetContent>
          </Sheet>
        </SurfaceFooter>
      </Surface>
      {compactVisible ? (
        <Card>
          <CardHeader>
            <CardTitle>Kompakte Karte</CardTitle>
            <CardDescription>
              12 px Radius, 16 px Innenabstand auf allen Bildschirmgrößen.
            </CardDescription>
            <CardAction>
              <CloseControl
                aria-label="Beispielkarte schließen"
                onClick={() => setCompactVisible(false)}
              />
            </CardAction>
          </CardHeader>
          <CardContent>
            Die Schließen-Aktion bleibt gleich groß; nur Fläche und Polster
            unterscheiden sich.
          </CardContent>
        </Card>
      ) : (
        <Button variant="outline" onClick={() => setCompactVisible(true)}>
          Beispielkarte wieder öffnen
        </Button>
      )}
    </div>
  );
}
