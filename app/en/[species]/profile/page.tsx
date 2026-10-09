import { speciesRoute } from '@/app/species-page';

const route = speciesRoute('steckbrief', 'en');
export const dynamicParams = false;
export const generateStaticParams = route.generateStaticParams;
export const generateMetadata = route.generateMetadata;
export default route.Page;
