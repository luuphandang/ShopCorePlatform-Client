import { ApolloClient, OperationVariables } from '@apollo/client';
import { DocumentNode } from 'graphql';
import { IncomingHttpHeaders } from 'http';

import { MetadataResponse } from '@/graphql/@types/graphql.type';

import { IGraphQLServerContext } from '../../interfaces/abstract.interface';
import { handleError } from '../../utils/error.util';
import { defaultMetadata } from '../../utils/metadata.util';

export abstract class AbstractFetcher {
  private readonly CLASS_NAME = this.constructor.name;
  protected apolloServer: ApolloClient<unknown>;
  protected authHeaders?: IncomingHttpHeaders;

  constructor({ apolloServer, authHeaders }: IGraphQLServerContext) {
    this.apolloServer = apolloServer;
    this.authHeaders = authHeaders;
  }

  protected async fetch<T, V extends OperationVariables = OperationVariables>(
    query: DocumentNode,
    variables?: V,
  ): Promise<{ data: T | null; errors: string[] | null }> {
    try {
      const { data, errors } = await this.apolloServer.query<T, V>({ query, variables });

      if (errors && errors.length > 0) {
        return { data: null, errors: errors.map((error) => error.message) };
      }

      return { data: data as T, errors: null };
    } catch (error: unknown) {
      console.log(`[${this.CLASS_NAME}:fetch]:`, handleError(error));
    }

    return { data: null, errors: ['Lỗi không xác định, vui lòng liên hệ quản trị viên!'] };
  }

  protected get defaultMetadata(): MetadataResponse {
    return defaultMetadata();
  }
}
