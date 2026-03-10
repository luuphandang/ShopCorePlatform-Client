'use client';

import { ApolloCache, DefaultContext, MutationHookOptions, useMutation } from '@apollo/client';

import {
  AssignProductAttributeValueInput,
  CreateProductAttributeValueInput,
  CreateProductAttributeValueMutation,
  CreateProductAttributeValueMutationVariables,
} from '@/graphql/@types';
import { CREATE_PRODUCT_ATTRIBUTE_VALUE } from '@/graphql/gql';
import { TProductAttributeValueSchema } from '@/shared/schema';

type CreateProductAttributeValueOptions = Omit<
  MutationHookOptions<
    CreateProductAttributeValueMutation,
    CreateProductAttributeValueMutationVariables,
    DefaultContext,
    ApolloCache<Record<string, unknown>>
  >,
  'variables'
>;
export const useCreateProductAttributeValueMutation = (
  options?: CreateProductAttributeValueOptions,
) => {
  const [mutate, result] = useMutation<
    CreateProductAttributeValueMutation,
    CreateProductAttributeValueMutationVariables
  >(CREATE_PRODUCT_ATTRIBUTE_VALUE, {
    errorPolicy: 'all',
    notifyOnNetworkStatusChange: true,
    refetchQueries: ['ProductAttributeValues'],
    ...options,
  });

  const createProductAttribute = (data: TProductAttributeValueSchema) =>
    mutate({ variables: { data: normalizeProductAttributeValue(data) } });

  return [createProductAttribute, result] as const;
};

export const normalizeProductAttributeValue = (
  data: TProductAttributeValueSchema,
): CreateProductAttributeValueInput => ({
  attribute_id: data.attribute_id,
  value: data.value,
});

export const normalizeAssignProductAttributeValue = (
  data: TProductAttributeValueSchema,
): AssignProductAttributeValueInput => ({
  id: data.id,
  ...normalizeProductAttributeValue(data),
});
