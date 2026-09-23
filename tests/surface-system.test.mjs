import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  auditSurfaces,
  checkSurfaceSource,
} from '../scripts/check-surface-system.mjs';

for (const [name, code] of [
  ['arbitrary property radius', '<div className="[border-radius:18px]" />'],
  ['Tailwind default radius', '<div className="rounded-xl" />'],
  ['responsive radius', '<div className="to-tablet:rounded-tr-[18px]" />'],
  [
    'calculated radius',
    '<div className="rounded-[calc(var(--radius-card)-2px)]" />',
  ],
  ['inline radius', '<div style={{ borderTopRightRadius: 18 }} />'],
  ['dynamic radius', '<div style={{ borderRadius: value }} />'],
  [
    'aliased close icon',
    'import { X as Dismiss } from "@/components/icons"; const x = <Dismiss />',
  ],
  ['close override', '<CloseControl className="size-7" />'],
  [
    'aliased component override',
    'import { SurfaceHeader as Header } from "@/components/surface"; const x = <Header className="gap-3 pr-10" />',
  ],
  ['panel padding override', '<DialogContent className="p-[22px]" />'],
])
  await test(`rejects ${name}`, () =>
    assert.ok(checkSurfaceSource('app/example.tsx', code).length));

await test('checks excluded library primitives too', () =>
  assert.ok(
    checkSurfaceSource(
      'components/ui/unused.tsx',
      '<div className="rounded-xl" />',
    ).length,
  ));
await test('checks CSS longhands and compatibility definitions', () => {
  assert.ok(
    checkSurfaceSource('app/test.css', '.x { border-top-left-radius: 22px; }')
      .length,
  );
  assert.ok(checkSurfaceSource('app/globals.css', '--radius-lg: 18px;').length);
});
await test('accepts approved roles, circles, native dismissal composition and layout', () => {
  assert.deepEqual(
    checkSurfaceSource(
      'app/example.tsx',
      '<Surface className="grid grid-cols-2"><SurfaceHeader actions={<Dialog.Close render={<CloseControl />} />} /><div className="rounded-(--radius-card) rounded-full" style={{ borderRadius: "var(--radius-control)" }} /></Surface>',
    ),
    [],
  );
});
await test('entire application obeys the contract', () =>
  assert.deepEqual(auditSurfaces(process.cwd()).findings, []));
