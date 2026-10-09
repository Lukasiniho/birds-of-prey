import { speciesRoute } from '@/app/species-page';

const route = speciesRoute('systematik', 'de');
export const dynamicParams = false;
export const generateStaticParams = route.generateStaticParams;
export const generateMetadata = route.generateMetadata;
export default route.Page;
