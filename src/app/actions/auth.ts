'use server';

import { cookies } from 'next/headers';

import { getApolloServer } from '@/graphql/apollo-server';
import { GraphQLMutation } from '@/graphql/server/mutations';
import { convertCookieOptions } from '@/graphql/utils/metadata.util';
import { NumberUtil } from '@/shared/utils';
import { TokenUtil } from '@/shared/utils/token.util';

export async function AuthAction() {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get('access_token')?.value;
  const refreshToken = cookieStore.get('refresh_token')?.value;

  if (TokenUtil.isValid(accessToken)) return true;
  if (!refreshToken) return false;

  const response = await GraphQLMutation.auth({
    apolloClient: await getApolloServer(),
  }).refreshToken();

  if (!response?.refreshToken) return false;
  const { access_token, options } = response?.refreshToken;

  cookieStore.set(
    'access_token',
    access_token,
    convertCookieOptions({ ...options, maxAge: NumberUtil.round(Number(options.maxAge) / 1000) }),
  );

  return true;
}
