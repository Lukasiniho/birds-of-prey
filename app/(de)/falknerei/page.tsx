import Page, { pageMetadata } from '@/app/falknerei/falknerei-page';

export const metadata = pageMetadata('de');
export default function Route() {
  return <Page locale="de" />;
}
