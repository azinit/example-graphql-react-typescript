import React from 'react'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://graphqlzero.almansi.me/api',
  cache: new InMemoryCache(),
});

const withApollo = (component: () => React.ReactNode) => () => (
    <ApolloProvider client={client}>
        {component()}
    </ApolloProvider>
)

export default withApollo;
