'use client';

import { ApolloCache, DefaultContext, MutationHookOptions, useMutation } from '@apollo/client';

import {
  CreateProductMutation,
  CreateProductMutationVariables,
  UpdateProductMutation,
  UpdateProductMutationVariables,
} from '@/graphql/@types';
import { CREATE_PRODUCT, UPDATE_PRODUCT } from '@/graphql/gql';
import { TProductSchema } from '@/shared/schema';

type CreateOptions = Omit<
  MutationHookOptions<
    CreateProductMutation,
    CreateProductMutationVariables,
    DefaultContext,
    ApolloCache<Record<string, unknown>>
  >,
  'variables'
>;
export const useCreateProductMutation = (options?: CreateOptions) => {
  const [mutate, result] = useMutation<CreateProductMutation, CreateProductMutationVariables>(
    CREATE_PRODUCT,
    {
      errorPolicy: 'all',
      notifyOnNetworkStatusChange: true,
      refetchQueries: ['Products'],
      ...options,
    },
  );

  const createProduct = (data: TProductSchema) => mutate({ variables: { data } });

  return [createProduct, result] as const;
};

type UpdateOptions = Omit<
  MutationHookOptions<
    UpdateProductMutation,
    UpdateProductMutationVariables,
    DefaultContext,
    ApolloCache<Record<string, unknown>>
  >,
  'variables'
>;
export const useUpdateProductMutation = (options?: UpdateOptions) => {
  const [mutate, result] = useMutation<UpdateProductMutation, UpdateProductMutationVariables>(
    UPDATE_PRODUCT,
    {
      errorPolicy: 'all',
      notifyOnNetworkStatusChange: true,
      refetchQueries: ['Products'],
      ...options,
    },
  );

  const updateProduct = (id: number, data: TProductSchema) => mutate({ variables: { id, data } });

  return [updateProduct, result] as const;
};
