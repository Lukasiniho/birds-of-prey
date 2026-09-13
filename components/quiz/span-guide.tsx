import type { CSSProperties } from 'react';
import { cn } from '@/lib/utils';

function GuideStroke({ end = false }: { end?: boolean }) {
  return (
    <span
      className={cn(
        "relative bg-current flex-1 h-px before:content-[''] before:absolute before:h-[12px] before:w-px before:bg-current before:-top-[5px]",
        end ? 'before:right-0' : 'before:left-0',
      )}
    />
  );
}

export function QuizSpanGuide({ span }: { span: number }) {
  return (
    <div
      className="q-measure-line mt-[5px] mx-auto to-tablet:mt-0 to-tablet:max-w-[330px] text-(--main-color) flex items-center gap-[10px] w-(--measure-width) min-h-[25px] transition-[width] duration-(--duration-quick) ease-(--ease-smooth-out)"
      style={
        { '--measure-width': `${32 + (span / 350) * 58}%` } as CSSProperties
      }
      aria-hidden="true"
    >
      <GuideStroke />
      <b className="text-(length:--type-ui) font-(--weight-medium) tabular-nums whitespace-nowrap">
        {span} cm
      </b>
      <GuideStroke end />
    </div>
  );
}
