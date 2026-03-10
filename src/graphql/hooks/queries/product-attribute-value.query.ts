'use client';

import { QueryHookOptions, useQuery } from '@apollo/client';

import {
  ProductAttributeValue,
  ProductAttributeValueQuery,
  ProductAttributeValueQueryVariables,
  ProductAttributeValuesQuery,
  ProductAttributeValuesQueryVariables,
} from '@/graphql/@types';
import { PRODUCT_ATTRIBUTE_VALUE, PRODUCT_ATTRIBUTE_VALUES } from '@/graphql/gql';
import { IGetOneProps, IPaginationProps } from '@/graphql/interfaces';

type GetProductAttributeValueOptions = Omit<
  QueryHookOptions<ProductAttributeValueQuery, ProductAttributeValueQueryVariables>,
  'variables'
> &
  IGetOneProps<ProductAttributeValue>;

type GetProductAttributeValuesOptions = Omit<
  QueryHookOptions<ProductAttributeValuesQuery, ProductAttributeValuesQueryVariables>,
  'variables'
> &
  IPaginationProps<ProductAttributeValue>;

export const useProductAttributeValueQuery = ({
  where,
  ...options
}: GetProductAttributeValueOptions) => {
  return useQuery<ProductAttributeValueQuery, ProductAttributeValueQueryVariables>(
    PRODUCT_ATTRIBUTE_VALUE,
    {
      variables: {
        query: { where: JSON.stringify(where) },
      },
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
      notifyOnNetworkStatusChange: true,
      ...options,
    },
  );
};

export const useProductAttributeValuesQuery = ({
  where,
  pagination,
  order,
  ...options
}: GetProductAttributeValuesOptions) => {
  return useQuery<ProductAttributeValuesQuery, ProductAttributeValuesQueryVariables>(
    PRODUCT_ATTRIBUTE_VALUES,
    {
      variables: {
        query: { where: JSON.stringify(where), pagination, order: JSON.stringify(order) },
      },
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
      notifyOnNetworkStatusChange: true,
      ...options,
    },
  );
};
