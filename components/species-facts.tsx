import { FactTooltip } from '@/components/fact-tooltip';
import { ConservationTooltip } from '@/components/conservation-tooltip';
import { MovementTooltip } from '@/components/movement-tooltip';
import { ActivityTooltip } from '@/components/activity-tooltip';
import { conservationLabels, speciesFacts } from '@/lib/species-facts';
import { falconryBirds } from '@/lib/falconry';
import { FalconryTooltip } from '@/components/falconry-tooltip';

import {
  HandFist,
  HourglassMedium,
  Egg,
  WarningCircle,
  SunHorizon,
  Compass,
} from '@/components/icons';

const factIcons = {
  'hourglass-medium': HourglassMedium,
  egg: Egg,
  'warning-circle': WarningCircle,
  'sun-horizon': SunHorizon,
  compass: Compass,
} as const;

export function SpeciesFacts({ speciesId }: { speciesId: string }) {
  const facts = speciesFacts[speciesId];
  const falconry = falconryBirds[speciesId];
  if (!facts) return null;
  const rows = [
    {
      label: 'Lebenserwartung',
      icon: 'hourglass-medium' as const,
      value: facts.lifespan.value,
      context: facts.lifespan.context,
    },
    { label: 'Gelegegröße', icon: 'egg' as const, value: facts.clutch.value },
    {
      label: 'Gefährdung weltweit',
      icon: 'warning-circle' as const,
      value: conservationLabels[facts.conservation.code],
    },
    {
      label: 'Aktivitätszeit',
      icon: 'sun-horizon' as const,
      value: facts.activity.value,
    },
    {
      label: 'Zugverhalten',
      icon: 'compass' as const,
      value: facts.movement.value,
    },
  ];
  return (
    <dl className="species-facts" aria-label="Wesentliche Artinformationen">
      {rows.map(({ label, icon, value, context }) => {
        const Icon = factIcons[icon];
        return (
          <div className="species-fact" key={label}>
            <dt>
              <Icon style={{ color: 'var(--main-color)' }} />
              <span>{label}</span>
            </dt>
            <dd>
              {icon === 'warning-circle' ? (
                <ConservationTooltip
                  key={speciesId}
                  code={facts.conservation.code}
                />
              ) : icon === 'compass' ? (
                <MovementTooltip key={speciesId} fact={facts.movement} />
              ) : icon === 'sun-horizon' ? (
                <ActivityTooltip key={speciesId} fact={facts.activity} />
              ) : context ? (
                <FactTooltip
                  key={speciesId}
                  value={value}
                  describe={`${value}: ${label} erklären`}
                  variant="compact"
                >
                  {context}
                </FactTooltip>
              ) : (
                value
              )}
            </dd>
          </div>
        );
      })}
      {falconry && (
        <div className="species-fact">
          <dt>
            <HandFist style={{ color: 'var(--main-color)' }} />
            <span>Falknerei</span>
          </dt>
          <dd>
            <FalconryTooltip key={speciesId} bird={falconry} />
          </dd>
        </div>
      )}
    </dl>
  );
}
