import { ApolloClient } from '@apollo/client';

import { TFilterOperator } from '@/graphql/@types/abstract.type';
import { IPagination } from '@/graphql/@types/graphql.type';

export interface IGraphQLServerContext {
  apolloClient: ApolloClient<unknown>;
}

export interface IGetOneProps<T> {
  where: { [key in keyof T]?: TFilterOperator<T[key]> };
}

export interface IPaginationProps<T> {
  where: { [key in keyof T]?: TFilterOperator<T[key]> };
  pagination: IPagination;
  order: { [key in keyof T]?: 'ASC' | 'DESC' };
}
