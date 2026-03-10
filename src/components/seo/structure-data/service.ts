import { Product } from '@/graphql/@types';
import { JsonldHelper } from '@/shared/helpers/jsonld';

export default function generateServiceJSONLD(service: Product) {
  return {
    ...JsonldHelper.generateServiceJsonld(service),
  };
}
