import { RefreshTokenMutation } from '@/graphql/@types/graphql.type';
import { REFRESH_TOKEN } from '@/graphql/gql/mutations/auth.mutation';

import { AbstractMutation } from './abstract.mutation';
import { IGraphQLServerContext } from './interface';

export class AuthMutation extends AbstractMutation {
  constructor({ apolloClient }: IGraphQLServerContext) {
    super({ apolloClient });
  }

  async refreshToken(): Promise<RefreshTokenMutation | null> {
    try {
      const { data, errors } = await this.mutation<RefreshTokenMutation>(REFRESH_TOKEN);

      if (errors) throw new Error(errors.join(', '));

      return data;
    } catch (error) {
      console.log('[AuthMutation:refreshToken]:', error);
      return null;
    }
  }
}
