'use client';

import { QueryHookOptions, useQuery } from '@apollo/client';

import {
  Product,
  ProductQuery,
  ProductQueryVariables,
  ProductsQuery,
  ProductsQueryVariables,
} from '@/graphql/@types';
import { PRODUCT, PRODUCTS } from '@/graphql/gql';
import { IGetOneProps, IPaginationProps } from '@/graphql/interfaces';

type GetProductOptions = Omit<QueryHookOptions<ProductQuery, ProductQueryVariables>, 'variables'> &
  IGetOneProps<Product>;

type GetProductsOptions = Omit<
  QueryHookOptions<ProductsQuery, ProductsQueryVariables>,
  'variables'
> &
  IPaginationProps<Product>;

export const useProductQuery = ({ where, ...options }: GetProductOptions) => {
  return useQuery<ProductQuery, ProductQueryVariables>(PRODUCT, {
    variables: {
      query: { where: JSON.stringify(where) },
    },
    fetchPolicy: 'network-only', // Ensures fresh data from network
    errorPolicy: 'all', // Returns both data and errors
    notifyOnNetworkStatusChange: true, // Notifies when network status changes
    ...options,
  });
};

export const useProductsQuery = ({ where, pagination, order, ...options }: GetProductsOptions) => {
  return useQuery<ProductsQuery, ProductsQueryVariables>(PRODUCTS, {
    variables: {
      query: { where: JSON.stringify(where), pagination, order: JSON.stringify(order) },
    },
    fetchPolicy: 'network-only', // Ensures fresh data from network
    errorPolicy: 'all', // Returns both data and errors
    notifyOnNetworkStatusChange: true, // Notifies when network status changes
    ...options,
  });
};
