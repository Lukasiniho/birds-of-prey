import Page, { pageMetadata } from '@/app/quiz/quiz-page';

export const metadata = pageMetadata('en');
export default function Route() {
  return <Page locale="en" />;
}
