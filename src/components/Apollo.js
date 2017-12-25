import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { ApolloLink, concat } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { GRAPHCOOL_TOKEN_KEY } from '../constants';

const httpLink = new HttpLink({ uri: 'https://api.graph.cool/simple/v1/cjbjnipex0xp901307o5nvkhk' })

const authMiddleware = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem(GRAPHCOOL_TOKEN_KEY);
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : null,
    },
  });

  return forward(operation);
});

const client = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache: new InMemoryCache()
});

function Apollo(props) {
   return <ApolloProvider client={client} {...props} />;
}

export default Apollo;
