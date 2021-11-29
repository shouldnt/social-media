const path =require('path');
const { ApolloServer } = require('apollo-server-express');
const {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageGraphQLPlayground
} = require('apollo-server-core');
const express = require('express');
const http = require('http');
const { PubSub } = require('graphql-subscriptions');
const mongoose = require('mongoose');
const {
  graphqlUploadExpress
} = require('graphql-upload');

const typeDefs = require('./graphql/typeDefs.js');
const resolvers = require('./graphql/resolvers');
const { MONGODB, PORT } = require('./config.js');

const pubSub = new PubSub();
async function startApolloServer(typeDefs, resolvers) {
  // Required logic for integrating with Express
  const app = express();
  const httpServer = http.createServer(app);

  // Same ApolloServer initialization as before, plus the drain plugin.
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
    ],
    context: ({ req }) => ({ req, pubSub }),
  });

  app.use('/images', express.static(path.join(__dirname, './images')))
  // More required logic for integrating with Express
  await server.start();
  app.use(graphqlUploadExpress());
  server.applyMiddleware({
    app,
    // By default, apollo-server hosts its GraphQL endpoint at the
    // server root. However, *other* Apollo Server packages host it at
    // /graphql. Optionally provide this to match apollo-server.
    path: '/'
  });

  // mongose db connnect
  await mongoose.connect(MONGODB, {
    useNewUrlParser: true
  }) .then(() => { console.log('mongodb connected'); });


  // Modified server startup
  await new Promise(resolve => httpServer.listen({ port: PORT }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

startApolloServer(typeDefs, resolvers);
