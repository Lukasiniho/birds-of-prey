import { Surface, SurfaceHeader } from '@/components/surface';
import { GlossaryText } from '@/components/glossary-text';
import { Lightbulb } from '@/components/icons';
import { speciesTrivia } from '@/lib/species-trivia';

/* Die Randnotiz zur Art. Sie bekommt als einzige Steckbrief-Sektion eine
 * eigene Fläche statt der Trennlinie — die Anekdote ist keine Messgröße und
 * soll sich beim Durchblättern vom Fließtext abheben. Der Abstand nach oben
 * ist der doppelte Sektionsabstand, weil die Nachbarsektionen ihre Luft auf
 * Rand und Polster verteilen und der Kasten sonst am Text klebt. */
export function SpeciesTrivia({ speciesId }: { speciesId: string }) {
  const trivia = speciesTrivia[speciesId];
  if (!trivia) return null;
  return (
    <Surface as="aside" kind="card"
      className="trivia-box mt-[calc(var(--rail-section-gap)*2)]"
      aria-label="Wusstest Du schon?"
    >
      <SurfaceHeader><h2 className="trivia-title flex items-center gap-2 font-(family-name:--font-stack-body) text-(length:--type-ui) font-(--weight-semibold) leading-(--leading-heading) tracking-(--tracking-tight)">
        <Lightbulb className="size-[18px] flex-none" />
        Wusstest Du schon?
      </h2></SurfaceHeader>
      <p className="mt-2 text-(length:--type-body) leading-(--leading-relaxed)">
        <GlossaryText>{trivia}</GlossaryText>
      </p>
    </Surface>
  );
}
