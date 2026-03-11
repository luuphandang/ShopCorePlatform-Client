'use client';

import { QueryHookOptions, useQuery } from '@apollo/client';

import {
  Unit,
  UnitQuery,
  UnitQueryVariables,
  UnitsQuery,
  UnitsQueryVariables,
} from '@/graphql/@types';
import { UNIT, UNITS } from '@/graphql/gql';
import { IGetOneProps, IPaginationProps } from '@/graphql/interfaces';

type GetUnitOptions = Omit<QueryHookOptions<UnitQuery, UnitQueryVariables>, 'variables'> &
  IGetOneProps<Unit>;

type GetUnitsOptions = Omit<QueryHookOptions<UnitsQuery, UnitsQueryVariables>, 'variables'> &
  IPaginationProps<Unit>;

export const useUnitQuery = ({ where, ...options }: GetUnitOptions) => {
  return useQuery<UnitQuery, UnitQueryVariables>(UNIT, {
    variables: {
      query: { where: JSON.stringify(where) },
    },
    fetchPolicy: 'cache-first',
    errorPolicy: 'all',
    notifyOnNetworkStatusChange: true,
    ...options,
  });
};

export const useUnitsQuery = ({ where, pagination, order, ...options }: GetUnitsOptions) => {
  return useQuery<UnitsQuery, UnitsQueryVariables>(UNITS, {
    variables: {
      query: { where: JSON.stringify(where), pagination, order: JSON.stringify(order) },
    },
    fetchPolicy: 'cache-first',
    errorPolicy: 'all',
    notifyOnNetworkStatusChange: true,
    ...options,
  });
};
