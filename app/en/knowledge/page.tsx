import Page, { pageMetadata } from '@/app/wissen/wissen-page';

export const metadata = pageMetadata('en');
export default function Route() {
  return <Page locale="en" />;
}
