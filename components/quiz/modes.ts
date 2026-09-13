import {
  ArrowsLeftRight as ArrowLeftRight,
  ForkKnife as Utensils,
  Crosshair,
  Eye,
  Ear,
  GlobeHemisphereWest,
  MapPin,
  Ruler,
  Scales as Scale,
} from '@/components/icons';

export const modes = [
  { id: 'identify', label: 'Art erkennen', verb: 'Erkennen', Icon: Eye },
  { id: 'sex', label: 'Geschlechter', verb: 'Zuordnen', Icon: ArrowLeftRight },
  { id: 'call', label: 'Ruf erkennen', verb: 'Erkennen', Icon: Ear },
  {
    id: 'range',
    label: 'Verbreitung',
    verb: 'Erkennen',
    Icon: GlobeHemisphereWest,
  },
  { id: 'span', label: 'Spannweite', verb: 'Schätzen', Icon: Ruler },
  { id: 'hunt', label: 'Jagdweise', verb: 'Erkennen', Icon: Crosshair },
  { id: 'weight', label: 'Gewicht sortieren', verb: 'Sortieren', Icon: Scale },
  {
    id: 'weight-estimate',
    label: 'Gewicht schätzen',
    verb: 'Schätzen',
    Icon: Scale,
  },
  { id: 'habitat', label: 'Lebensraum', verb: 'Zuordnen', Icon: MapPin },
  { id: 'prey', label: 'Nahrung', verb: 'Zusammenstellen', Icon: Utensils },
  {
    id: 'compare',
    label: 'Flügelvergleich',
    verb: 'Vergleichen',
    Icon: ArrowLeftRight,
  },
] as const;
