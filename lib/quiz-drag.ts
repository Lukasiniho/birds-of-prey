type Point = { x: number; y: number };

/** Resolve a grid position from fixed slot centers, independent of card animation. */
export function closestWeightSlot(
  slots: readonly Point[],
  point: Point,
): number {
  let closest = -1;
  let distance = Infinity;
  slots.forEach((slot, index) => {
    const next = Math.hypot(point.x - slot.x, point.y - slot.y);
    if (next < distance) {
      closest = index;
      distance = next;
    }
  });
  return closest;
}
