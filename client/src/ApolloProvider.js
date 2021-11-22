import React from 'react';

import App from './App';
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloProvider,
  ApolloLink,
  concat
} from '@apollo/client';
import { getTokenFromLocal } from './context/authContext';

const httpLink = new HttpLink({
  uri: 'http://localhost:3000'
});
const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => {
    const token = getTokenFromLocal();
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : null,
      }
    }
  });
  return forward(operation);
})
const client = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache: new InMemoryCache()
});
export default () => (
  <ApolloProvider client={client}>
    <App></App>
  </ApolloProvider>
);
