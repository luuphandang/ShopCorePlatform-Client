import { ProductAttributeQuery, ProductAttributesQuery, ProductQuery } from './graphql.type';

export type TAttributeQuery = ProductAttributeQuery['productAttribute'];

export type TAttributesQuery = ProductAttributesQuery['productAttributes']['data'];

export type TProductAttributesQuery = NonNullable<ProductQuery['product']>['attributes'];

export type TProductAttributeQuery = NonNullable<
  NonNullable<ProductQuery['product']>['attributes']
>[number];
