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

const cache = new InMemoryCache({
  typePolicies: {
    Product: {
      keyFields: ['id'],
    },
    Category: {
      keyFields: ['id'],
    },
    User: {
      keyFields: ['id'],
    },
    Order: {
      keyFields: ['id'],
      fields: {
        order_details: {
          merge(_existing, incoming) {
            return incoming;
          },
        },
      },
    },
    OrderDetail: {
      keyFields: ['product_id', 'variant_id', 'conversion_unit_id'],
    },
    ProductVariant: {
      keyFields: ['id'],
    },
    ConversionUnit: {
      keyFields: ['id'],
    },
    Unit: {
      keyFields: ['id'],
    },
    FileUpload: {
      keyFields: ['id'],
    },
  },
});

export const client = new ApolloClient({
  cache,
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
      fetchPolicy: 'cache-first',
    },
    query: {
      fetchPolicy: 'cache-first',
      errorPolicy: 'all',
    },
    mutate: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
  },
  connectToDevTools: process.env.NODE_ENV === 'development',
});
