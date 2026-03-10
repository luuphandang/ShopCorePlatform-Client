'use client';

import { ApolloCache, DefaultContext, MutationHookOptions, useMutation } from '@apollo/client';

import { UpdateUserInput, UpdateUserMutation, UpdateUserMutationVariables } from '@/graphql/@types';
import { UPDATE_USER } from '@/graphql/gql';
import { TUserSchema } from '@/shared/schema';

type UpdateUserOptions = Omit<
  MutationHookOptions<
    UpdateUserMutation,
    UpdateUserMutationVariables,
    DefaultContext,
    ApolloCache<Record<string, unknown>>
  >,
  'variables'
>;
export const useUpdateUserMutation = (options?: UpdateUserOptions) => {
  const [mutate, result] = useMutation<UpdateUserMutation, UpdateUserMutationVariables>(
    UPDATE_USER,
    {
      errorPolicy: 'all',
      notifyOnNetworkStatusChange: true,
      refetchQueries: ['MyUser'],
      ...options,
    },
  );

  const updateUser = (id: number, data: TUserSchema) =>
    mutate({ variables: { id, data: normalizeUser(data) } });

  return [updateUser, result] as const;
};

export const normalizeUser = (data: TUserSchema): UpdateUserInput => ({
  first_name: data.first_name,
  last_name: data.last_name,
  phone: data.phone,
  email: data.email,
  birthday: data.birthday,
  address: data.address,
  password: data.password,
});
