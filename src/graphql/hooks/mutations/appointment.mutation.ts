'use client';

import { ApolloCache, DefaultContext, MutationHookOptions, useMutation } from '@apollo/client';

import { CreateAppointmentMutation, CreateAppointmentMutationVariables } from '@/graphql/@types';
import { CREATE_APPOINTMENT } from '@/graphql/gql';
import { sanitizeAppointmentSchema } from '@/shared/dto';
import { TAppointmentSchema } from '@/shared/schema';

type CreateAppointmentOptions = Omit<
  MutationHookOptions<
    CreateAppointmentMutation,
    CreateAppointmentMutationVariables,
    DefaultContext,
    ApolloCache<Record<string, unknown>>
  >,
  'variables'
>;
export const useCreateAppointmentMutation = (options?: CreateAppointmentOptions) => {
  const [mutate, result] = useMutation<
    CreateAppointmentMutation,
    CreateAppointmentMutationVariables
  >(CREATE_APPOINTMENT, {
    errorPolicy: 'all',
    notifyOnNetworkStatusChange: true,
    refetchQueries: ['Appointments'],
    ...options,
  });

  const createAppointment = (data: TAppointmentSchema) =>
    mutate({ variables: { data: sanitizeAppointmentSchema(data) } });

  return [createAppointment, result] as const;
};
