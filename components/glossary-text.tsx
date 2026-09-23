import {
  Children,
  cloneElement,
  isValidElement,
  type ReactNode,
  type ReactElement,
} from 'react';
import { GlossaryLink } from '@/components/glossary-link';
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
            <GlossaryLink key={`${part.id}-${index}`} id={part.id}>
              {part.text}
            </GlossaryLink>
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
