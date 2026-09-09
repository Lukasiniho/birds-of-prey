import { Egg, Hourglass, Route, Shield, SunMoon } from 'lucide-react';
import { conservationLabels, speciesFacts } from '@/lib/species-facts';

export function SpeciesFacts({ speciesId }: { speciesId: string }) {
  const facts = speciesFacts[speciesId];
  if (!facts) return null;
  const rows = [
    {
      label: 'Lebenserwartung',
      icon: Hourglass,
      value: facts.lifespan.value,
      context: facts.lifespan.context,
    },
    { label: 'Gelegegröße', icon: Egg, value: facts.clutch.value },
    {
      label: 'Gefährdung weltweit',
      icon: Shield,
      value: conservationLabels[facts.conservation.code],
    },
    { label: 'Aktivitätszeit', icon: SunMoon, value: facts.activity.value },
    { label: 'Zugverhalten', icon: Route, value: facts.movement.value },
  ];
  return (
    <dl className="species-facts" aria-label="Wesentliche Artinformationen">
      {rows.map(({ label, icon: Icon, value, context }) => (
        <div className="species-fact" key={label}>
          <dt>
            <Icon aria-hidden="true" strokeWidth={1.5} />
            <span>{label}</span>
          </dt>
          <dd>
            {value}
            {context && <small>{context}</small>}
          </dd>
        </div>
      ))}
    </dl>
  );
}
