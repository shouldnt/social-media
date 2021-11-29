const postsResolvers = require('./posts.js') ;
const usersResolvers = require('./users.js');
const commentsResolvers = require('./comments.js');
const { GraphQLUpload } = require('graphql-upload');

module.exports = {
  Upload: GraphQLUpload,
  Post: {
    likeCount: (parent) => parent.likes.length,
    commentCount: (parent) => parent.comments.length
  },
  Query: {
    ...postsResolvers.Query
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...postsResolvers.Mutation,
    ...commentsResolvers.Mutation
  },
  Subscription: {
    ...postsResolvers.Subscription
  }

}
