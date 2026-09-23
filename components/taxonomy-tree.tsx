'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import { taxonomyRoot, type TaxonomyNode } from '@/lib/taxonomy';
import {
  TaxonomyColumn,
  motionMilliseconds,
} from '@/components/taxonomy-column';

const ranks = ['Klasse', 'Ordnung', 'Familie', 'Gattung', 'Art'];

// Each rank owns its height and scroll position. Descendants never participate
// in their ancestors' row layout, so opening a branch cannot displace siblings.
export function TaxonomyTree({
  selected,
  onSelect,
  path,
  onPathChange,
}: {
  selected: string;
  onSelect: (id: string) => void;
  path: string[];
  onPathChange: (path: string[]) => void;
}) {
  const stage = useRef<HTMLDivElement>(null);
  const connectors = useRef<SVGSVGElement>(null);
  const columns: TaxonomyNode[][] = [[taxonomyRoot]];
  for (let depth = 0; depth < 4; depth++) {
    const active = columns[depth]?.find((node) => node.latin === path[depth]);
    columns.push(active?.children ?? []);
  }
  const [lines, setLines] = useState<
    { d: string; active: boolean; opacity: number }[]
  >([]);
  const initialised = useRef(new Map<number, string>());
  const frame = useRef<number | null>(null);
  const measure = useRef(() => {});
  const schedule = () => {
    if (frame.current !== null) cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      frame.current = null;
      measure.current();
    });
  };
  useLayoutEffect(() => {
    const element = stage.current;
    if (!element) return;
    measure.current = () => {
      // Convert client rectangles back into SVG coordinates, including zoom
      // and the columns' animated translation.
      const matrix = connectors.current?.getScreenCTM();
      if (!matrix || !matrix.a || !matrix.d) return;
      const inverse = matrix.inverse();
      const toLocal = (x: number, y: number) =>
        new DOMPoint(x, y).matrixTransform(inverse);
      const panels = [
        ...element.querySelectorAll<HTMLElement>('[data-taxonomy-column]'),
      ];
      const next: { d: string; active: boolean; opacity: number }[] = [];
      for (let depth = 0; depth < panels.length - 1; depth++) {
        const from = [
          ...panels[depth].querySelectorAll<HTMLElement>('[data-taxon]'),
        ].find((node) => node.dataset.taxon === path[depth]);
        if (!from) continue;
        const source = from.getBoundingClientRect();
        const sourceClip = panels[depth].getBoundingClientRect();
        const targetClip = panels[depth + 1].getBoundingClientRect();
        const sourcePoint = toLocal(
          source.right,
          Math.max(
            sourceClip.top,
            Math.min(sourceClip.bottom, source.top + source.height / 2),
          ),
        );
        const { x: x1, y: y1 } = sourcePoint;
        const opacity = Math.min(
          Number(getComputedStyle(panels[depth]).opacity),
          Number(getComputedStyle(panels[depth + 1]).opacity),
        );
        for (const to of panels[depth + 1].querySelectorAll<HTMLElement>(
          '[data-taxon]',
        )) {
          const target = to.getBoundingClientRect();
          const middle = target.top + target.height / 2;
          if (middle < targetClip.top || middle > targetClip.bottom) continue;
          const { x: x2, y: y2 } = toLocal(target.left, middle);
          const joint = (x1 + x2) / 2;
          next.push({
            opacity,
            d: `M${x1},${y1}H${joint}V${y2}H${x2}`,
            active:
              to.dataset.taxon === path[depth + 1] ||
              to.getAttribute('aria-current') === 'page',
          });
        }
      }
      // Paint the selected path last so shared segments stay fully teal.
      setLines(next.sort((a, b) => Number(a.active) - Number(b.active)));
    };
    // Position only newly opened columns. Never scroll the page or a column
    // to the left of the clicked node; browser scroll anchoring is disabled.
    for (const panel of element.querySelectorAll<HTMLElement>(
      '[data-taxonomy-column]',
    )) {
      const depth = Number(panel.dataset.taxonomyColumn);
      const parent = depth ? (path[depth - 1] ?? '') : 'root';
      if (initialised.current.get(depth) === parent) continue;
      initialised.current.set(depth, parent);
      const current = [
        ...panel.querySelectorAll<HTMLElement>('[data-taxon]'),
      ].find(
        (node) =>
          node.dataset.taxon === path[depth] ||
          node.getAttribute('aria-current') === 'page',
      );
      panel.scrollTop = current
        ? Math.max(
            0,
            current.offsetTop -
              panel.clientHeight / 2 +
              current.clientHeight / 2,
          )
        : 0;
    }
    measure.current();
    // Keep connectors attached to the moving cards throughout the reveal.
    const until =
      performance.now() +
      Math.max(
        motionMilliseconds(element, '--panel-open-dur'),
        motionMilliseconds(element, '--panel-close-dur'),
      );
    let motionFrame: number;
    let motionFrames = 0;
    function followMotion() {
      measure.current();
      // Even without motion, wait for the new panels' open-state commit.
      if (++motionFrames < 2 || performance.now() <= until)
        motionFrame = requestAnimationFrame(followMotion);
    }
    motionFrame = requestAnimationFrame(followMotion);
    const observer = new ResizeObserver(schedule);
    observer.observe(element);
    // Font loading and scrollbar changes can resize cards without resizing
    // the fixed-height stage itself.
    for (const child of element.querySelectorAll(
      '[data-taxon], [data-taxonomy-column]',
    )) {
      observer.observe(child);
    }
    return () => {
      observer.disconnect();
      cancelAnimationFrame(motionFrame);
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    };
  }, [path]);
  return (
    <div
      className="min-h-0 min-w-0 flex-1 overflow-x-auto overflow-y-hidden overscroll-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      aria-label="Horizontaler Systematikbaum"
    >
      <div
        ref={stage}
        className="relative flex h-full w-max gap-8 p-2"
        onTransitionEnd={schedule}
      >
        <svg
          ref={connectors}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full overflow-hidden"
          fill="none"
        >
          {lines.map((line, index) => (
            <path
              key={index}
              d={line.d}
              stroke={line.active ? 'var(--selection-border)' : 'var(--border)'}
              style={{
                opacity: line.opacity,
                strokeWidth: line.active
                  ? 'var(--border-selection)'
                  : 'var(--border-structure)',
              }}
            />
          ))}
        </svg>
        {columns.map((nodes, depth) => (
          <section
            key={depth}
            className={`relative flex h-full shrink-0 flex-col gap-3 ${depth === 4 ? 'w-64' : 'w-52'}`}
            aria-label={ranks[depth]}
          >
            <h3 className="text-(length:--type-label-heading) font-(--weight-bold) text-foreground">
              {ranks[depth]}
            </h3>
            <TaxonomyColumn
              branch={depth ? (path[depth - 1] ?? '') : 'root'}
              nodes={nodes}
              depth={depth}
              selected={selected}
              path={path}
              onPathChange={onPathChange}
              onSelect={onSelect}
              onScroll={schedule}
            />
          </section>
        ))}
      </div>
    </div>
  );
}
