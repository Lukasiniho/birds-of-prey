import {
  Children,
  cloneElement,
  isValidElement,
  type ReactNode,
  type ReactElement,
} from 'react';
import { glossaryHref } from '@/lib/glossary';
import { splitGlossaryText } from '@/lib/glossary-matching';

// Only descend into prose elements. Existing links, controls, SVGs and custom
// components are left intact; a glossary link must never contain another link.
const proseElements = new Set([
  'p',
  'span',
  'em',
  'strong',
  'b',
  'i',
  'small',
  'div',
  'li',
  'ul',
  'ol',
  'dd',
]);
export function GlossaryText({ children }: { children: ReactNode }) {
  const seen = new Set<string>();
  function enrich(nodes: ReactNode): ReactNode {
    return Children.map(nodes, (node) => {
      if (typeof node === 'string') {
        return splitGlossaryText(node, seen).map((part, index) =>
          part.id ? (
            <a
              key={`${part.id}-${index}`}
              href={glossaryHref(part.id)}
              className="glossary-link text-inherit underline decoration-dotted decoration-muted-foreground underline-offset-4 hover:text-(--main-color) hover:decoration-solid focus-visible:text-(--main-color)"
              title={`${part.term} im Glossar`}
            >
              {part.text}
            </a>
          ) : (
            part.text
          ),
        );
      }
      if (
        isValidElement(node) &&
        typeof node.type === 'string' &&
        proseElements.has(node.type)
      ) {
        const element = node as ReactElement<{ children?: ReactNode }>;
        return cloneElement(element, {}, enrich(element.props.children));
      }
      return node;
    });
  }
  return <>{enrich(children)}</>;
}
