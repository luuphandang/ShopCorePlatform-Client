import { ProductQuery, ProductsQuery } from './graphql.type';

export type TProductQuery = ProductQuery['product'];

export type TProductsQuery = ProductsQuery['products']['data'];
