import { TooltipHint } from '@/components/ui/tooltip';
import { ConservationTooltip } from '@/components/conservation-tooltip';
import { conservationLabels, speciesFacts } from '@/lib/species-facts';

/*
 * Phosphor Duotone SVG paths: https://github.com/phosphor-icons/core
 * MIT License — Copyright (c) 2023 Phosphor Icons
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

const duotonePaths = {
  'hourglass-medium': [
    'M180.92,88,128,128,74.67,88Z',
    'M200,75.64V40a16,16,0,0,0-16-16H72A16,16,0,0,0,56,40V76a16.07,16.07,0,0,0,6.4,12.8L114.67,128,62.4,167.2A16.07,16.07,0,0,0,56,180v36a16,16,0,0,0,16,16H184a16,16,0,0,0,16-16V180.36a16.09,16.09,0,0,0-6.35-12.77L141.27,128l52.38-39.59A16.09,16.09,0,0,0,200,75.64ZM72,40H184V75.64L178.23,80H77.33L72,76Zm56,78L98.67,96h58.4Zm56,98H72V180l48-36v24a8,8,0,0,0,16,0V144.08l48,36.28Z',
  ],
  egg: [
    'M208,152a80,80,0,0,1-160,0C48,88,96,24,128,24S208,88,208,152Z',
    'M186.66,59.56C168.47,32.29,146.54,16,128,16S87.53,32.29,69.34,59.56C50.7,87.54,40,121.23,40,152a88,88,0,0,0,176,0C216,121.23,205.3,87.54,186.66,59.56ZM128,224a72.08,72.08,0,0,1-72-72c0-27.69,9.72-58.15,26.66-83.56C97.19,46.64,115.41,32,128,32s30.81,14.64,45.34,36.44C190.28,93.85,200,124.31,200,152A72.08,72.08,0,0,1,128,224Z',
  ],
  'warning-circle': [
    'M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z',
    'M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm-8-80V80a8,8,0,0,1,16,0v56a8,8,0,0,1-16,0Zm20,36a12,12,0,1,1-12-12A12,12,0,0,1,140,172Z',
  ],
  'sun-horizon': [
    'M192,144a64.33,64.33,0,0,1-2,16H66a64,64,0,1,1,126-16Z',
    'M240,152H199.55a73.54,73.54,0,0,0,.45-8,72,72,0,0,0-144,0,73.54,73.54,0,0,0,.45,8H16a8,8,0,0,0,0,16H240a8,8,0,0,0,0-16ZM72,144a56,56,0,1,1,111.41,8H72.59A56.13,56.13,0,0,1,72,144Zm144,56a8,8,0,0,1-8,8H48a8,8,0,0,1,0-16H208A8,8,0,0,1,216,200ZM72.84,43.58a8,8,0,0,1,14.32-7.16l8,16a8,8,0,0,1-14.32,7.16Zm-56,48.84a8,8,0,0,1,10.74-3.57l16,8a8,8,0,0,1-7.16,14.31l-16-8A8,8,0,0,1,16.84,92.42Zm192,15.16a8,8,0,0,1,3.58-10.73l16-8a8,8,0,1,1,7.16,14.31l-16,8a8,8,0,0,1-10.74-3.58Zm-48-55.16,8-16a8,8,0,0,1,14.32,7.16l-8,16a8,8,0,1,1-14.32-7.16Z',
  ],
  compass: [
    'M128,32a96,96,0,1,0,96,96A96,96,0,0,0,128,32Zm16,112L80,176l32-64,64-32Z',
    'M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216ZM172.42,72.84l-64,32a8.05,8.05,0,0,0-3.58,3.58l-32,64A8,8,0,0,0,80,184a8.1,8.1,0,0,0,3.58-.84l64-32a8.05,8.05,0,0,0,3.58-3.58l32-64a8,8,0,0,0-10.74-10.74ZM138,138,97.89,158.11,118,118l40.15-20.07Z',
  ],
} as const;

export function SpeciesFacts({ speciesId }: { speciesId: string }) {
  const facts = speciesFacts[speciesId];
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
      {rows.map(({ label, icon, value, context }) => (
        <div className="species-fact" key={label}>
          <dt>
            <svg
              aria-hidden="true"
              focusable="false"
              data-icon-weight="duotone"
              viewBox="0 0 256 256"
              fill="currentColor"
              style={{ color: 'var(--main-color)' }}
            >
              <path d={duotonePaths[icon][0]} opacity={0.2} />
              <path d={duotonePaths[icon][1]} />
            </svg>
            <span>{label}</span>
          </dt>
          <dd>
            {icon === 'warning-circle' ? (
              <ConservationTooltip
                key={speciesId}
                code={facts.conservation.code}
              />
            ) : context ? (
              <TooltipHint content={context}>
                <button
                  type="button"
                  className="cursor-help"
                  style={{
                    border: 0,
                    padding: 0,
                    background: 'transparent',
                    font: 'inherit',
                    color: 'inherit',
                  }}
                >
                  {value}
                </button>
              </TooltipHint>
            ) : (
              value
            )}
          </dd>
        </div>
      ))}
    </dl>
  );
}
