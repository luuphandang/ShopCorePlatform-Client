'use client';

import { ApolloCache, DefaultContext, MutationHookOptions, useMutation } from '@apollo/client';

import {
  AssignUnitInput,
  CreateUnitInput,
  CreateUnitMutation,
  CreateUnitMutationVariables,
} from '@/graphql/@types';
import { CREATE_UNIT } from '@/graphql/gql';
import { TUnitSchema } from '@/shared/schema';

type CreateUnitOptions = Omit<
  MutationHookOptions<
    CreateUnitMutation,
    CreateUnitMutationVariables,
    DefaultContext,
    ApolloCache<Record<string, unknown>>
  >,
  'variables'
>;
export const useCreateUnitMutation = (options?: CreateUnitOptions) => {
  const [mutate, result] = useMutation<CreateUnitMutation, CreateUnitMutationVariables>(
    CREATE_UNIT,
    {
      errorPolicy: 'all',
      notifyOnNetworkStatusChange: true,
      refetchQueries: ['Units'],
      ...options,
    },
  );

  const createUnit = (data: TUnitSchema) => mutate({ variables: { data: normalizeUnit(data) } });

  return [createUnit, result] as const;
};

export const normalizeUnit = (data: TUnitSchema): CreateUnitInput => ({
  name: data.name,
  description: data.description,
});

export const normalizeAssignUnit = (data: TUnitSchema): AssignUnitInput => ({
  id: data.id,
  ...normalizeUnit(data),
});
