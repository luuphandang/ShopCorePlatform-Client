import { ApolloClient, OperationVariables } from '@apollo/client';
import { DocumentNode } from 'graphql';

import { IGraphQLServerContext } from './interface';

export abstract class AbstractMutation {
  private readonly CLASS_NAME = this.constructor.name;
  protected apolloClient: ApolloClient<unknown>;

  constructor({ apolloClient }: IGraphQLServerContext) {
    this.apolloClient = apolloClient;
  }

  protected async mutation<TData, TVariables extends OperationVariables = OperationVariables>(
    mutation: DocumentNode,
    variables?: TVariables,
  ): Promise<{ data: TData | null; errors: string[] | null }> {
    try {
      const { data, errors } = await this.apolloClient.mutate<TData, TVariables>({
        mutation,
        variables,
      });

      if (errors && errors.length > 0) {
        return { data: null, errors: errors.map((error) => error.message) };
      }

      return { data: data as TData, errors: null };
    } catch (error: unknown) {
      console.error(`[${this.CLASS_NAME}:mutation]:`, error);
      return {
        data: null,
        errors: ['Lỗi không xác định, vui lòng liên hệ quản trị viên!'],
      };
    }
  }

  protected get className() {
    return this.CLASS_NAME;
  }

  protected setClient(client: ApolloClient<unknown>) {
    this.apolloClient = client;
    return this;
  }
}
