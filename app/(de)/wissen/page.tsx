import Page, { pageMetadata } from '@/app/wissen/wissen-page';

export const metadata = pageMetadata('de');
export default function Route() {
  return <Page locale="de" />;
}
