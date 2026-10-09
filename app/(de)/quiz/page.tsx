import Page, { pageMetadata } from '@/app/quiz/quiz-page';

export const metadata = pageMetadata('de');
export default function Route() {
  return <Page locale="de" />;
}
