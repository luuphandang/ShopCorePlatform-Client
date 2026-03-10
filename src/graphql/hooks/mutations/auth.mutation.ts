'use client';

import { ApolloCache, DefaultContext, MutationHookOptions, useMutation } from '@apollo/client';

import {
  RefreshTokenMutation,
  RefreshTokenMutationVariables,
  SignInInput,
  SignInMutation,
  SignInMutationVariables,
  SignOutMutation,
  SignOutMutationVariables,
  SignUpInput,
  SignUpMutation,
  SignUpMutationVariables,
} from '@/graphql/@types';
import { REFRESH_TOKEN, SIGN_IN, SIGN_OUT, SIGN_UP } from '@/graphql/gql';

type SignInOptions = Omit<
  MutationHookOptions<
    SignInMutation,
    SignInMutationVariables,
    DefaultContext,
    ApolloCache<Record<string, unknown>>
  >,
  'variables'
>;
export const useSignInMutation = (options?: SignInOptions) => {
  const [mutate, result] = useMutation<SignInMutation, SignInMutationVariables>(SIGN_IN, {
    errorPolicy: 'all',
    notifyOnNetworkStatusChange: true,
    ...options,
  });

  const signIn = (data: SignInInput) =>
    mutate({ variables: { data: JSON.parse(JSON.stringify(data)) } });

  return [signIn, result] as const;
};

type SignUpOptions = Omit<
  MutationHookOptions<
    SignUpMutation,
    SignUpMutationVariables,
    DefaultContext,
    ApolloCache<Record<string, unknown>>
  >,
  'variables'
>;
export const useSignUpMutation = (options?: SignUpOptions) => {
  const [mutate, result] = useMutation<SignUpMutation, SignUpMutationVariables>(SIGN_UP, {
    errorPolicy: 'all',
    notifyOnNetworkStatusChange: true,
    ...options,
  });

  const signUp = (data: SignUpInput) =>
    mutate({ variables: { data: JSON.parse(JSON.stringify(data)) } });

  return [signUp, result] as const;
};

type SignOutOptions = Omit<
  MutationHookOptions<
    SignOutMutation,
    SignOutMutationVariables,
    DefaultContext,
    ApolloCache<Record<string, unknown>>
  >,
  'variables'
>;
export const useSignOutMutation = (options?: SignOutOptions) => {
  const [mutate, result] = useMutation<SignOutMutation, SignOutMutationVariables>(SIGN_OUT, {
    errorPolicy: 'all',
    notifyOnNetworkStatusChange: true,
    ...options,
  });

  const signOut = () => mutate({});

  return [signOut, result] as const;
};

type RefreshTokenOptions = Omit<
  MutationHookOptions<
    RefreshTokenMutation,
    RefreshTokenMutationVariables,
    DefaultContext,
    ApolloCache<Record<string, unknown>>
  >,
  'variables'
>;
export const useRefreshTokenMutation = (options?: RefreshTokenOptions) => {
  const [mutate, result] = useMutation<RefreshTokenMutation, RefreshTokenMutationVariables>(
    REFRESH_TOKEN,
    { ...options },
  );

  const refreshToken = () => mutate({});

  return [refreshToken, result] as const;
};
