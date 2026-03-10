import { AuthMutation } from './auth.mutation';
import { IGraphQLServerContext } from './interface';

export class GraphQLMutation {
  static auth({ apolloClient }: IGraphQLServerContext) {
    const authMutation = new AuthMutation({ apolloClient });

    return {
      refreshToken: () => authMutation.refreshToken(),
    };
  }
}
