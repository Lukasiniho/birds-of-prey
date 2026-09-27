'use client';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { imageSrcSet } from '@/lib/optimized-images';
import {
  tipDistance,
  wingGeometry,
  type WingGeometry,
} from '@/lib/wing-geometry';
import { cn } from '@/lib/utils';

/** Rings that carry a call outwards over the stage while it plays. */
export function CallRings() {
  return (
    <div
      className="call-rings absolute inset-0 grid place-items-center pointer-events-none"
      aria-hidden="true"
    >
      {[0, 1 / 3, 2 / 3].map((phase) => (
        <span
          className="[grid-area:1/1] w-[min(72%,560px)] aspect-square rounded-[50%] border-(length:--border-selection) border-(--accent-line) opacity-0"
          key={phase}
          style={{ '--ring-phase': phase } as React.CSSProperties}
        />
      ))}
    </div>
  );
}

/** One rung of the encode ladder as CSS mask; -2 is sharp enough for the
    reference shadow and cheaper than the largest. */
function maskFor(src: string, rung: number) {
  const ladder = imageSrcSet(src).srcSet?.split(', ') ?? [];
  return `url("${(ladder.at(rung) ?? ladder[0])?.split(' ')[0] ?? src}")`;
}

export type WingReference = { name: string; src: string; span: number };

/**
 * Sits exactly over one illustration (same padding, same contain fit) and
 * draws, while the wingspan is inspected, a dimension line from tip to tip with a
 * reference bird's shadow behind it at true relative scale.
 */
export function WingOverlay({
  src,
  span,
  spanLabel,
  measuring,
  reference,
  className,
}: {
  src: string;
  /** Mean wingspan in cm. */
  span: number;
  spanLabel: string;
  measuring: boolean;
  reference?: WingReference;
  className?: string;
}) {
  const box = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<[number, number] | null>(null);
  const [geometry, setGeometry] = useState<WingGeometry | null>(null);
  const [referenceGeometry, setReferenceGeometry] =
    useState<WingGeometry | null>(null);
  const [drawn, setDrawn] = useState(false);
  useLayoutEffect(() => {
    const element = box.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) =>
      setSize([entry.contentRect.width, entry.contentRect.height]),
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  // Measured on first use only; the analysis is cached per image.
  useEffect(() => {
    if (!measuring) return;
    let cancelled = false;
    void Promise.all([
      wingGeometry(src),
      reference ? wingGeometry(reference.src) : null,
    ]).then(([own, other]) => {
      if (cancelled) return;
      setGeometry(own);
      setReferenceGeometry(other);
    });
    return () => {
      cancelled = true;
    };
  }, [measuring, src, reference]);
  // Mount first, draw on the next frame, so the line really draws itself.
  useEffect(() => {
    if (!measuring) return;
    let frame = requestAnimationFrame(() => {
      frame = requestAnimationFrame(() => setDrawn(true));
    });
    return () => {
      cancelAnimationFrame(frame);
      setDrawn(false);
    };
  }, [measuring]);
  let caliper: ReactNode = null;
  if (size && geometry && measuring) {
    const [width, height] = size;
    const scale = Math.min(width / geometry.width, height / geometry.height);
    const left = (width - geometry.width * scale) / 2;
    const top = (height - geometry.height * scale) / 2;
    const at = ([x, y]: [number, number]) =>
      [left + x * scale, top + y * scale] as const;
    const [ax, ay] = at(geometry.a);
    const [bx, by] = at(geometry.b);
    const length = Math.hypot(bx - ax, by - ay);
    // Offset the dimension line to the leading-edge side (upwards).
    let [nx, ny] = [(by - ay) / length, -(bx - ax) / length];
    if (ny > 0) [nx, ny] = [-nx, -ny];
    const offset = Math.min(56, length * 0.09);
    const [pax, pay] = [ax + nx * offset, ay + ny * offset];
    const [pbx, pby] = [bx + nx * offset, by + ny * offset];
    const angle = (Math.atan2(by - ay, bx - ax) * 180) / Math.PI;
    const tick = 7;
    let ghost: ReactNode = null;
    if (reference && referenceGeometry) {
      const k =
        (length * (reference.span / span)) / tipDistance(referenceGeometry);
      const [rmx, rmy] = [
        (referenceGeometry.a[0] + referenceGeometry.b[0]) / 2,
        (referenceGeometry.a[1] + referenceGeometry.b[1]) / 2,
      ];
      const referenceMask = maskFor(reference.src, -2);
      ghost = (
        <span
          className="wingspan-ghost absolute bg-(--wingspan-ghost) [mask-size:100%_100%] [mask-repeat:no-repeat]"
          style={{
            left: (ax + bx) / 2 - rmx * k,
            top: (ay + by) / 2 - rmy * k,
            width: referenceGeometry.width * k,
            height: referenceGeometry.height * k,
            maskImage: referenceMask,
            WebkitMaskImage: referenceMask,
          }}
        />
      );
    }
    caliper = (
      <div className="wing-caliper absolute inset-0" data-drawn={drawn}>
        {ghost}
        <svg
          width={width}
          height={height}
          className="absolute inset-0 overflow-visible fill-none stroke-(--main-color) stroke-2 [stroke-linecap:round]"
        >
          <g className="wing-caliper-extension stroke-1 [stroke-dasharray:3_4]">
            <line x1={ax} y1={ay} x2={pax + nx * tick} y2={pay + ny * tick} />
            <line x1={bx} y1={by} x2={pbx + nx * tick} y2={pby + ny * tick} />
          </g>
          <line
            className="wing-caliper-line"
            x1={pax}
            y1={pay}
            x2={pbx}
            y2={pby}
            pathLength={1}
          />
          <circle
            className="wing-caliper-tip fill-(--stage)"
            cx={ax}
            cy={ay}
            r={4.5}
          />
          <circle
            className="wing-caliper-tip fill-(--stage)"
            cx={bx}
            cy={by}
            r={4.5}
          />
        </svg>
        <span
          className="wing-caliper-label absolute flex flex-col items-center whitespace-nowrap py-1 px-3 rounded-(--radius-pill) border-(length:--border-structure) border-(--line-tint) bg-(--surface) shadow-(--shadow-floating) text-(length:--type-caption) leading-(--leading-compact) text-muted-foreground"
          style={{
            left: (pax + pbx) / 2 + nx * 18,
            top: (pay + pby) / 2 + ny * 18,
            transform: `translate(-50%, -50%) rotate(${angle}deg)`,
          }}
        >
          <strong className="font-(family-name:--font-stack-display) text-(length:--type-lead) font-(--weight-semibold) text-foreground">
            {spanLabel}
          </strong>
          {reference && <small>Schatten: {reference.name}</small>}
        </span>
      </div>
    );
  }
  return (
    <div
      className={cn(
        'wing-overlay absolute inset-0 pointer-events-none',
        className,
      )}
      aria-hidden="true"
    >
      <div className="relative size-full" ref={box}>
        {caliper}
      </div>
    </div>
  );
}
