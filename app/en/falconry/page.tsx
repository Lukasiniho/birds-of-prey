import Page, { pageMetadata } from '@/app/falknerei/falknerei-page';

export const metadata = pageMetadata('en');
export default function Route() {
  return <Page locale="en" />;
}
