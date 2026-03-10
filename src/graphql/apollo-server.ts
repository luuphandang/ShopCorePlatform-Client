import { ApolloClient, from, HttpLink, InMemoryCache } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import fetch from 'cross-fetch';
import { cookies } from 'next/headers';

import { GRAPHQL_URL } from '@/shared/constants/application';

export async function getApolloServer() {
  const cookieStore = await cookies();

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

  const httpLink = new HttpLink({
    uri: GRAPHQL_URL,
    fetch: async (uri, options) => {
      const backendResponse = await fetch(uri, {
        ...options,
        headers: {
          ...options?.headers,
          Cookie: cookieStore.toString(),
        },
      });

      return backendResponse;
    },
    credentials: 'include',
  });

  return new ApolloClient({
    cache: new InMemoryCache(),
    ssrMode: true,
    link: from([errorLink, httpLink]),
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
  });
}
