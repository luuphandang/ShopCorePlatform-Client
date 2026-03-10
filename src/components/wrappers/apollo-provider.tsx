'use client';

import { ApolloNextAppProvider } from '@apollo/experimental-nextjs-app-support';

import { client } from '@/graphql/apollo-client';

function makeClient() {
  return client;
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return <ApolloNextAppProvider makeClient={makeClient}>{children}</ApolloNextAppProvider>;
}
