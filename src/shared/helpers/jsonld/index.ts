import { TCategoryQuery, TProductQuery } from '@/graphql/@types';

import { CategoryJsonld } from './category.jsonld';
import { HomeJsonld } from './home.jsonld';
import { ProductJsonld } from './product.jsonld';
import { ServiceJsonld } from './service.jsonld';

export class JsonldHelper {
  static generateHomeJsonld() {
    const jsonld = new HomeJsonld();

    return jsonld.getJsonld();
  }

  static generateProductJsonld(product: TProductQuery) {
    const jsonld = new ProductJsonld(product);

    return jsonld.getJsonld();
  }

  static generateServiceJsonld(service: TProductQuery) {
    const jsonld = new ServiceJsonld(service);

    return jsonld.getJsonld();
  }

  static generateCategoryJsonld(category: TCategoryQuery) {
    const jsonld = new CategoryJsonld(category);

    return jsonld.getJsonld();
  }
}
