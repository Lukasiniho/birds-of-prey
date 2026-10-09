import { RootShell, rootMetadata } from '../root-layout';
import { createHash } from 'node:crypto';
import { en } from '@/lib/i18n/en';
export { viewport } from '../root-layout';

export const metadata = rootMetadata('en');
// Version im Dateinamen-Query, damit das Skript lange gecacht werden darf.
const dictVersion = createHash('sha1')
  .update(JSON.stringify(en))
  .digest('hex')
  .slice(0, 10);
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RootShell locale="en">
      {/* oxlint-disable-next-line next/no-sync-scripts -- must define the dictionary before hydration */}
      <script src={`/i18n-en.js?v=${dictVersion}`} />
      {children}
    </RootShell>
  );
}
