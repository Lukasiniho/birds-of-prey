import type { ReactNode } from 'react';
import { SurfaceHeader } from '@/components/surface';

export function PageHeader({
  title,
  description,
}: {
  title: ReactNode;
  description?: ReactNode;
}) {
  return (
    <SurfaceHeader className="mb-section" description={description}>
      <h1 className="page-title font-(family-name:--font-stack-display) text-(length:--type-page-title) font-(--weight-semibold) leading-(--leading-display) tracking-(--tracking-tight)">
        {title}
      </h1>
    </SurfaceHeader>
  );
}
