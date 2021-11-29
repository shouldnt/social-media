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
import { createUploadLink } from 'apollo-upload-client';
import { getTokenFromLocal } from './context/authContext';
import appConstants from './appConstants';

const httpLink = new HttpLink({
  uri: appConstants.apiHost
});
const uploadLink = createUploadLink({
  uri: appConstants.apiHost
})
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
  link: concat(authMiddleware, uploadLink, httpLink ),
  cache: new InMemoryCache()
});
export default () => (
  <ApolloProvider client={client}>
    <App></App>
  </ApolloProvider>
);
