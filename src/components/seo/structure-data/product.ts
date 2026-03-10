import { Product } from '@/graphql/@types';
import { JsonldHelper } from '@/shared/helpers/jsonld';

export default function generateProductJSONLD(product: Product) {
  return {
    ...JsonldHelper.generateProductJsonld(product),
  };
}
