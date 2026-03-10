import { ProductAttributeValueQuery, ProductAttributeValuesQuery } from './graphql.type';

export type TAttributeValueQuery = ProductAttributeValueQuery['productAttributeValue'];

export type TAttributeValuesQuery = ProductAttributeValuesQuery['productAttributeValues']['data'];
