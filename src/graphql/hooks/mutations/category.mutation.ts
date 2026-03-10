'use client';

import { ApolloCache, DefaultContext, MutationHookOptions, useMutation } from '@apollo/client';

import {
  AssignCategoryInput,
  CreateCategoryInput,
  CreateCategoryMutation,
  CreateCategoryMutationVariables,
} from '@/graphql/@types';
import { CREATE_CATEGORY } from '@/graphql/gql';
import { TCategorySchema } from '@/shared/schema';

type CreateCategoryOptions = Omit<
  MutationHookOptions<
    CreateCategoryMutation,
    CreateCategoryMutationVariables,
    DefaultContext,
    ApolloCache<Record<string, unknown>>
  >,
  'variables'
>;
export const useCreateCategoryMutation = (options?: CreateCategoryOptions) => {
  const [mutate, result] = useMutation<CreateCategoryMutation, CreateCategoryMutationVariables>(
    CREATE_CATEGORY,
    {
      errorPolicy: 'all',
      notifyOnNetworkStatusChange: true,
      refetchQueries: ['Categories'],
      ...options,
    },
  );

  const createCategory = (data: TCategorySchema) =>
    mutate({ variables: { data: normalizeCategory(data) } });

  return [createCategory, result] as const;
};

export const normalizeCategory = (data: TCategorySchema): CreateCategoryInput => {
  return {
    name: data.name,
    type: data.type,
    description: data.description,
  };
};

export const normalizeAssignCategory = (data: TCategorySchema): AssignCategoryInput => {
  return {
    id: data.id,
    ...normalizeCategory(data),
  };
};
