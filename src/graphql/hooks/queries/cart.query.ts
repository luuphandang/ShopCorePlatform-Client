'use client';

import { QueryHookOptions, useQuery } from '@apollo/client';

import { EOrderStatus, MyCartQuery, MyCartQueryVariables, Order, User } from '@/graphql/@types';
import { MY_CART } from '@/graphql/gql';
import { IGetOneProps } from '@/graphql/interfaces/abstract.interface';

type GetCartOptions = Omit<QueryHookOptions<MyCartQuery, MyCartQueryVariables>, 'variables'> &
  IGetOneProps<Order>;

export const useCartQuery = ({ where, ...options }: GetCartOptions) => {
  return useQuery<MyCartQuery, MyCartQueryVariables>(MY_CART, {
    variables: {
      query: { where: JSON.stringify(where) },
    },
    fetchPolicy: 'network-only',
    errorPolicy: 'all',
    notifyOnNetworkStatusChange: true,
    ...options,
  });
};

type TCartFilter = {
  user?: User | null;
  code?: string;
};
export const cartFilter = ({ user, code }: TCartFilter) => {
  const filter = {
    status: EOrderStatus.Cart,
  };

  if (user) {
    Object.assign(filter, { customer_id: user.id });
  } else if (code) {
    Object.assign(filter, { code });
  }

  return filter;
};
