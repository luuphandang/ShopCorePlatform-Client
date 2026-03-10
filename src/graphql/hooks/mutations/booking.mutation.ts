'use client';

import { ApolloCache, DefaultContext, MutationHookOptions, useMutation } from '@apollo/client';

import { CreateBookingMutation, CreateBookingMutationVariables } from '@/graphql/@types';
import { CREATE_BOOKING } from '@/graphql/gql';
import { TBookingSchema } from '@/shared/schema';

type CreateBookingOptions = Omit<
  MutationHookOptions<
    CreateBookingMutation,
    CreateBookingMutationVariables,
    DefaultContext,
    ApolloCache<Record<string, unknown>>
  >,
  'variables'
>;
export const useCreateBookingMutation = (options?: CreateBookingOptions) => {
  const [mutate, result] = useMutation<CreateBookingMutation, CreateBookingMutationVariables>(
    CREATE_BOOKING,
    {
      errorPolicy: 'all',
      notifyOnNetworkStatusChange: true,
      refetchQueries: ['Bookings'],
      ...options,
    },
  );

  const createBooking = (data: TBookingSchema) =>
    mutate({ variables: { data: sanitizeBookingData(data) } });

  return [createBooking, result] as const;
};

const sanitizeBookingData = (data: TBookingSchema) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { attachments, agree_terms, ...rest } = data;

  return {
    ...rest,
    estimated_date: rest.estimated_date ? rest.estimated_date.toISOString() : undefined,
  };
};
