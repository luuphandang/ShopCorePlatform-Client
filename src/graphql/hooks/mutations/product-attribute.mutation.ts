'use client';

import { ApolloCache, DefaultContext, MutationHookOptions, useMutation } from '@apollo/client';

import {
  AssignProductAttributeInput,
  CreateProductAttributeInput,
  CreateProductAttributeMutation,
  CreateProductAttributeMutationVariables,
} from '@/graphql/@types';
import { CREATE_PRODUCT_ATTRIBUTE } from '@/graphql/gql';
import { TProductAttributeSchema } from '@/shared/schema';

import { normalizeAssignProductAttributeValue } from './product-attribute-value.mutation';

type CreateProductAttributeOptions = Omit<
  MutationHookOptions<
    CreateProductAttributeMutation,
    CreateProductAttributeMutationVariables,
    DefaultContext,
    ApolloCache<Record<string, unknown>>
  >,
  'variables'
>;
export const useCreateProductAttributeMutation = (options?: CreateProductAttributeOptions) => {
  const [mutate, result] = useMutation<
    CreateProductAttributeMutation,
    CreateProductAttributeMutationVariables
  >(CREATE_PRODUCT_ATTRIBUTE, {
    errorPolicy: 'all',
    notifyOnNetworkStatusChange: true,
    refetchQueries: ['ProductAttributes'],
    ...options,
  });

  const createProductAttribute = (data: TProductAttributeSchema) =>
    mutate({ variables: { data: normalizeProductAttribute(data) } });

  return [createProductAttribute, result] as const;
};

const normalizeProductAttribute = (data: TProductAttributeSchema): CreateProductAttributeInput => ({
  name: data.name,
  values: data.values?.map((value) => normalizeAssignProductAttributeValue(value)),
});

export const normalizeAssignProductAttribute = (
  data: TProductAttributeSchema,
): AssignProductAttributeInput => ({
  id: data.id,
  ...normalizeProductAttribute(data),
});
