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
    fetchPolicy: 'network-only', // Ensures fresh data from network
    errorPolicy: 'all', // Returns both data and errors
    notifyOnNetworkStatusChange: true, // Notifies when network status changes
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
    fetchPolicy: 'network-only', // Ensures fresh data from network
    errorPolicy: 'all', // Returns both data and errors
    notifyOnNetworkStatusChange: true, // Notifies when network status changes
    ...options,
  });
};
