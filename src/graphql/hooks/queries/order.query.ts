'use client';

import { QueryHookOptions, useQuery } from '@apollo/client';

import {
  Order,
  OrderQuery,
  OrderQueryVariables,
  OrdersQuery,
  OrdersQueryVariables,
} from '@/graphql/@types';
import { ORDER, ORDERS } from '@/graphql/gql';
import { IGetOneProps, IPaginationProps } from '@/graphql/interfaces';

type GetOrderOptions = Omit<QueryHookOptions<OrderQuery, OrderQueryVariables>, 'variables'> &
  IGetOneProps<Order>;

type GetOrdersOptions = Omit<QueryHookOptions<OrdersQuery, OrdersQueryVariables>, 'variables'> &
  IPaginationProps<Order>;

export const useOrderQuery = ({ where, ...options }: GetOrderOptions) => {
  return useQuery<OrderQuery, OrderQueryVariables>(ORDER, {
    variables: {
      query: { where: JSON.stringify(where) },
    },
    fetchPolicy: 'network-only', // Ensures fresh data from network
    errorPolicy: 'all', // Returns both data and errors
    notifyOnNetworkStatusChange: true, // Notifies when network status changes
    ...options,
  });
};

export const useOrdersQuery = ({ where, pagination, order, ...options }: GetOrdersOptions) => {
  return useQuery<OrdersQuery, OrdersQueryVariables>(ORDERS, {
    variables: {
      query: { where: JSON.stringify(where), pagination, order: JSON.stringify(order) },
    },
    fetchPolicy: 'network-only', // Ensures fresh data from network
    errorPolicy: 'all', // Returns both data and errors
    notifyOnNetworkStatusChange: true, // Notifies when network status changes
    ...options,
  });
};
