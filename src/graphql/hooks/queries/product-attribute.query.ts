'use client';

import { QueryHookOptions, useQuery } from '@apollo/client';

import {
  ProductAttribute,
  ProductAttributeQuery,
  ProductAttributeQueryVariables,
  ProductAttributesQuery,
  ProductAttributesQueryVariables,
} from '@/graphql/@types';
import { PRODUCT_ATTRIBUTE, PRODUCT_ATTRIBUTES } from '@/graphql/gql';
import { IGetOneProps, IPaginationProps } from '@/graphql/interfaces';

type GetProductAttributeOptions = Omit<
  QueryHookOptions<ProductAttributeQuery, ProductAttributeQueryVariables>,
  'variables'
> &
  IGetOneProps<ProductAttribute>;

type GetProductAttributesOptions = Omit<
  QueryHookOptions<ProductAttributesQuery, ProductAttributesQueryVariables>,
  'variables'
> &
  IPaginationProps<ProductAttribute>;

export const useProductAttributeQuery = ({ where, ...options }: GetProductAttributeOptions) => {
  return useQuery<ProductAttributeQuery, ProductAttributeQueryVariables>(PRODUCT_ATTRIBUTE, {
    variables: {
      query: { where: JSON.stringify(where) },
    },
    fetchPolicy: 'network-only',
    errorPolicy: 'all',
    notifyOnNetworkStatusChange: true,
    ...options,
  });
};

export const useProductAttributesQuery = ({
  where,
  pagination,
  order,
  ...options
}: GetProductAttributesOptions) => {
  return useQuery<ProductAttributesQuery, ProductAttributesQueryVariables>(PRODUCT_ATTRIBUTES, {
    variables: {
      query: { where: JSON.stringify(where), pagination, order: JSON.stringify(order) },
    },
    fetchPolicy: 'network-only',
    errorPolicy: 'all',
    notifyOnNetworkStatusChange: true,
    ...options,
  });
};
