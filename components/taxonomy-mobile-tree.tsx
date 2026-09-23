'use client';

import { useId, useLayoutEffect, useRef } from 'react';
import { CaretDown, CaretRight } from '@/components/icons';
import { TaxonomyCard } from '@/components/taxonomy-card';
import { taxonomyRoot, type TaxonomyNode } from '@/lib/taxonomy';

type TreeProps = {
  selected: string;
  onSelect: (id: string) => void;
  path: string[];
  onPathChange: (path: string[]) => void;
};

function TaxonomyBranch({
  node,
  depth,
  ...tree
}: TreeProps & { node: TaxonomyNode; depth: number }) {
  const childrenId = useId();
  const isOpen = tree.path[depth] === node.latin;
  const toggle = () =>
    tree.onPathChange(
      isOpen
        ? tree.path.slice(0, depth)
        : [...tree.path.slice(0, depth), node.latin],
    );
  const Chevron = isOpen ? CaretDown : CaretRight;

  return (
    <li className="min-w-0">
      {node.children.length ? (
        <>
          <button
            type="button"
            data-taxon={node.latin}
            aria-expanded={isOpen}
            aria-controls={childrenId}
            onClick={toggle}
            className={`flex min-h-(--control-height-touch) w-full items-start gap-2 rounded-(--radius-control) p-2 text-left hover:bg-(--hover) ${isOpen ? 'bg-(--selected)' : ''}`}
          >
            <Chevron size={20} className="mt-half shrink-0 text-primary" />
            <span className="min-w-0 flex-1">
              <span className="block wrap-anywhere font-(--weight-semibold)">
                {node.name ?? node.latin}
              </span>
              <span className="block wrap-anywhere text-(length:--type-caption) text-muted-foreground">
                {node.rank}
                {node.name ? ` · ${node.latin}` : ''}
              </span>
              <span className="mt-1 flex flex-wrap gap-x-1 text-(length:--type-caption) text-muted-foreground">
                <span
                  className={
                    node.atlasCount
                      ? 'text-primary font-(--weight-semibold)'
                      : ''
                  }
                >
                  {node.atlasCount} im Atlas
                </span>
                <span>
                  · {node.totalCount} {node.totalCount === 1 ? 'Art' : 'Arten'}
                </span>
              </span>
            </span>
          </button>
          <ul
            id={childrenId}
            hidden={!isOpen}
            className="ml-2 mt-1 space-y-1 border-l-(length:--border-structure) border-border pl-2"
          >
            {isOpen &&
              node.children.map((child) => (
                <TaxonomyBranch
                  key={child.latin}
                  {...tree}
                  node={child}
                  depth={depth + 1}
                />
              ))}
          </ul>
        </>
      ) : (
        <TaxonomyCard
          node={node}
          selected={tree.selected}
          isOpen={false}
          onToggle={toggle}
          onSelect={tree.onSelect}
        />
      )}
    </li>
  );
}

/** A nested disclosure list keeps every rank within a phone's width. */
export function TaxonomyMobileTree(props: TreeProps) {
  const scroller = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const element = scroller.current;
    if (!element) return;
    let positioned = false;
    const showCurrentSpecies = () => {
      if (positioned || !element.clientHeight) return;
      positioned = true;
      const current = element.querySelector<HTMLElement>(
        '[aria-current="page"]',
      );
      if (!current) return;
      // Only move this tree on first display, never the page or a branch
      // the reader is expanding. Its ancestors remain available above it.
      const offset =
        current.getBoundingClientRect().top -
        element.getBoundingClientRect().top;
      element.scrollTop +=
        offset - element.clientHeight / 2 + current.clientHeight / 2;
    };
    showCurrentSpecies();
    const observer = new ResizeObserver(showCurrentSpecies);
    observer.observe(element);
    return () => observer.disconnect();
  }, [props.selected]);

  return (
    <div
      ref={scroller}
      aria-label="Vertikaler Systematikbaum"
      className="hidden min-h-0 min-w-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-contain -mx-1 p-1 to-tablet:block"
    >
      <ul>
        <TaxonomyBranch {...props} node={taxonomyRoot} depth={0} />
      </ul>
    </div>
  );
}
