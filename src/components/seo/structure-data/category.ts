import { Category } from '@/graphql/@types';
import { JsonldHelper } from '@/shared/helpers/jsonld';

export default function generateCategoryJSONLD(category: Category) {
  return {
    ...JsonldHelper.generateCategoryJsonld(category),
  };
}
