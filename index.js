const { ApolloServer } = require('apollo-server');
const { PubSub } = require('graphql-subscriptions');
const mongoose = require('mongoose');

const typeDefs = require('./graphql/typeDefs.js');
const resolvers = require('./graphql/resolvers');
const { MONGODB } = require('./config.js');

const pubSub = new PubSub();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubSub })
})

mongoose.connect(MONGODB, {
  useNewUrlParser: true
})
  .then(() => {
    console.log('mongodb connected');
    return server.listen({port: 3000})
  }).then(res => {
    console.log(`Server running at ${res.url}`);
  });

