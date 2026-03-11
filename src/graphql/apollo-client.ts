'use client';

import { from, HttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { ApolloClient, InMemoryCache } from '@apollo/experimental-nextjs-app-support';

import { GRAPHQL_URL } from '@/shared/constants/application';

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.log(`[GraphQLError]: Message: ${message}, Location: ${locations}, Path: ${path}`);
    });
  }
  if (networkError) {
    console.log(`[NetworkError]: ${networkError}`);
  }
  return;
});

function getCsrfToken(): string | undefined {
  if (typeof document === 'undefined') return undefined;

  const match = document.cookie.match(new RegExp('(^|;\\s*)csrf-token=([^;]*)'));
  return match?.[2];
}

const authLink = setContext((_, { headers }) => {
  const csrfToken = getCsrfToken();

  return {
    headers: {
      ...headers,
      ...(csrfToken ? { 'x-csrf-token': csrfToken } : {}),
    },
  };
});

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([
    errorLink,
    authLink,
    new HttpLink({
      uri: GRAPHQL_URL,
      credentials: 'include',
    }),
  ]),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache',
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
    mutate: {
      errorPolicy: 'all',
    },
  },
  connectToDevTools: process.env.NODE_ENV === 'development',
});
