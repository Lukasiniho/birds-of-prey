import type { Metadata } from 'next';
import { SectionPlaceholder } from '@/components/section-placeholder';

// Der Build setzt für die 404-Seite selbst `noindex`.
export const metadata: Metadata = { title: 'Seite nicht gefunden' };

export default function NotFound() {
  return (
    <SectionPlaceholder
      section="birds"
      title="Seite nicht gefunden"
      description="Diese Seite gibt es nicht oder nicht mehr. Über die Artenliste, das Wissen oder das Quiz geht es weiter."
    />
  );
}
