import { RootShell, rootMetadata } from '../root-layout';
export { viewport } from '../root-layout';

export const metadata = rootMetadata('de');
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RootShell locale="de">{children}</RootShell>;
}
