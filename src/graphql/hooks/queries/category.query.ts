'use client';

import { QueryHookOptions, useQuery } from '@apollo/client';

import {
  CategoriesQuery,
  CategoriesQueryVariables,
  Category,
  CategoryQuery,
  CategoryQueryVariables,
} from '@/graphql/@types';
import { CATEGORIES, CATEGORY } from '@/graphql/gql';
import { IGetOneProps, IPaginationProps } from '@/graphql/interfaces';

type GetCategoryOptions = Omit<
  QueryHookOptions<CategoryQuery, CategoryQueryVariables>,
  'variables'
> &
  IGetOneProps<Category>;

type GetCategoriesOptions = Omit<
  QueryHookOptions<CategoriesQuery, CategoriesQueryVariables>,
  'variables'
> &
  IPaginationProps<Category>;

export const useCategoryQuery = ({ where, ...options }: GetCategoryOptions) => {
  return useQuery<CategoryQuery, CategoryQueryVariables>(CATEGORY, {
    variables: {
      query: { where: JSON.stringify(where) },
    },
    fetchPolicy: 'cache-first',
    errorPolicy: 'all',
    notifyOnNetworkStatusChange: true,
    ...options,
  });
};

export const useCategoriesQuery = ({
  where,
  pagination,
  order,
  ...options
}: GetCategoriesOptions) => {
  return useQuery<CategoriesQuery, CategoriesQueryVariables>(CATEGORIES, {
    variables: {
      query: { where: JSON.stringify(where), pagination, order: JSON.stringify(order) },
    },
    fetchPolicy: 'cache-first',
    errorPolicy: 'all',
    notifyOnNetworkStatusChange: true,
    ...options,
  });
};
