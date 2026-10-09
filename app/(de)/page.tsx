import RaptorApp from '../raptor-app';
import { homeMetadata } from '../root-layout';
export const metadata = homeMetadata('de');
export default function Home() {
  return <RaptorApp />;
}
