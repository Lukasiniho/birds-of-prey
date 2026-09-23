'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import type { TaxonomyNode } from '@/lib/taxonomy';
import { TaxonomyCard } from '@/components/taxonomy-card';

export function motionMilliseconds(element: Element, token: string) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return 0;
  const value = getComputedStyle(element).getPropertyValue(token).trim();
  return parseFloat(value) * (value.endsWith('ms') ? 1 : 1000) || 0;
}

type ColumnProps = {
  nodes: TaxonomyNode[];
  branch: string;
  depth: number;
  selected: string;
  path: string[];
  onPathChange: (path: string[]) => void;
  onSelect: (id: string) => void;
  onScroll: () => void;
};

function ColumnPanel({
  nodes,
  depth,
  selected,
  path,
  onPathChange,
  onSelect,
  onScroll,
  active,
}: ColumnProps & { active: boolean }) {
  const panel = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  useLayoutEffect(() => {
    // Commit the snippet's closed state before revealing newly mounted content.
    if (panel.current) void panel.current.offsetHeight;
    const frame = requestAnimationFrame(() => setOpen(true));
    return () => cancelAnimationFrame(frame);
  }, []);
  return (
    <div
      ref={panel}
      data-taxonomy-column={active ? depth : undefined}
      data-open={open && active}
      aria-hidden={!active || undefined}
      inert={!active}
      className="t-panel-slide relative col-start-1 row-start-1 min-h-0 overflow-y-auto overscroll-contain [overflow-anchor:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      onScroll={active ? onScroll : undefined}
    >
      <ul className="flex flex-col gap-3 py-1">
        {nodes.map((node) => (
          <li key={node.latin}>
            <TaxonomyCard
              node={node}
              selected={selected}
              isOpen={path[depth] === node.latin}
              onToggle={() =>
                onPathChange(
                  path[depth] === node.latin
                    ? path.slice(0, depth)
                    : [...path.slice(0, depth), node.latin],
                )
              }
              onSelect={onSelect}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Only changed descendants cross-fade; ancestor DOM and scroll stay intact. */
export function TaxonomyColumn(props: ColumnProps) {
  const { branch, nodes } = props;
  const container = useRef<HTMLDivElement>(null);
  const [layers, setLayers] = useState([{ branch, nodes }]);
  const latest = layers[layers.length - 1];
  if (latest.branch !== branch) setLayers([latest, { branch, nodes }]);
  useLayoutEffect(() => {
    const element = container.current;
    if (!element) return;
    const timer = setTimeout(
      () => setLayers((current) => current.slice(-1)),
      motionMilliseconds(element, '--panel-close-dur'),
    );
    return () => clearTimeout(timer);
  }, [branch]);
  return (
    <div
      ref={container}
      className="grid min-h-0 flex-1 grid-cols-1 grid-rows-1"
    >
      {layers.map((layer) => (
        <ColumnPanel
          {...props}
          key={layer.branch}
          nodes={layer.nodes}
          active={layer.branch === branch}
        />
      ))}
    </div>
  );
}
