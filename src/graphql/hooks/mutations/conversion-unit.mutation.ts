'use client';

import { ApolloCache, DefaultContext, MutationHookOptions, useMutation } from '@apollo/client';

import {
  AssignConversionUnitInput,
  CreateConversionUnitInput,
  CreateConversionUnitMutation,
  CreateConversionUnitMutationVariables,
} from '@/graphql/@types';
import { CREATE_CONVERSION_UNIT } from '@/graphql/gql';
import { TConversionUnitSchema } from '@/shared/schema';

import { normalizeAssignUnit } from './unit.mutation';

type CreateConversionUnitOptions = Omit<
  MutationHookOptions<
    CreateConversionUnitMutation,
    CreateConversionUnitMutationVariables,
    DefaultContext,
    ApolloCache<Record<string, unknown>>
  >,
  'variables'
>;
export const useCreateConversionUnitMutation = (options?: CreateConversionUnitOptions) => {
  const [mutate, result] = useMutation<
    CreateConversionUnitMutation,
    CreateConversionUnitMutationVariables
  >(CREATE_CONVERSION_UNIT, {
    errorPolicy: 'all',
    notifyOnNetworkStatusChange: true,
    refetchQueries: ['ConversionUnits'],
    ...options,
  });

  const createConversionUnit = (data: TConversionUnitSchema) =>
    mutate({ variables: { data: normalizeConversionUnit(data) } });

  return [createConversionUnit, result] as const;
};

export const normalizeConversionUnit = (
  data: TConversionUnitSchema,
): CreateConversionUnitInput => ({
  conversion_rate: data.conversion_rate,
  regular_price: data.regular_price,
  sale_price: data.sale_price,
  price: data.price,
  unit: data.unit && normalizeAssignUnit(data.unit),
});

export const normalizeAssignConversionUnit = (
  data: TConversionUnitSchema,
): AssignConversionUnitInput => {
  return {
    id: data.id,
    ...normalizeConversionUnit(data),
  };
};
