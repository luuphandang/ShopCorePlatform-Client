import { ApolloClient } from '@apollo/client';
import { IncomingHttpHeaders } from 'http';

import { TFilterOperator } from '../@types/abstract.type';
import { IPagination, User } from '../@types/graphql.type';

export interface IAuthProps {
  authUser?: User | null;
  authToken?: string | null;
  authHeaders?: IncomingHttpHeaders;
}

export interface IGraphQLClientContext extends IAuthProps {
  apolloClient: ApolloClient<unknown>;
}

export interface IGraphQLServerContext extends IAuthProps {
  apolloServer: ApolloClient<unknown>;
}

export interface IGetOneProps<T> {
  where: { [key in keyof T]?: TFilterOperator<T[key]> };
}

export interface IPaginationProps<T> {
  where?: { [key in keyof T]?: TFilterOperator<T[key]> };
  pagination?: IPagination;
  order?: { [key in keyof T]?: 'ASC' | 'DESC' };
}
