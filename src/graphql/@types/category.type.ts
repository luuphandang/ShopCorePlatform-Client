import { CategoriesQuery, CategoryQuery } from './graphql.type';

export type TCategoryQuery = CategoryQuery['category'];

export type TCategoriesQuery = CategoriesQuery['categories']['data'];
