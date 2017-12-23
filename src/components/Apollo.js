import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const httpLink = new HttpLink({ uri: 'https://api.graph.cool/simple/v1/cjbjnipex0xp901307o5nvkhk' })

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

function Apollo(props) {
   return <ApolloProvider client={client} {...props} />;
}

export default Apollo;
