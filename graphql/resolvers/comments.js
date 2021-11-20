const { AuthenticationError, UserInputError } = require('apollo-server');

const Post = require('../../models/Post.js');
const checkAuth = require('../../utils/check-auth');

module.exports = {
  Mutation: {
    async createComment(_, { postId, body }, context) {
      const user = checkAuth(context);
      if(body.trim() === "") {
        throw new UserInputError('Empty comment', {
          errors: {
            body: "Comment must not empty"
          }
        });
      }
      const post = await Post.findById(postId);
      if(post) {
        post.comments.unshift({
          body,
          username: user.username,
          createdAt: new Date().toISOString()
        })
        await post.save();
        return post;
      } else {
        throw new UserInputError("User input error");
      }
    },

    async deleteComment(_, { postId, commentId }, context) {
      const user = checkAuth(context);
      const post = await Post.findById(postId);
      if(post) {
        const commentIndex = post.comments.findIndex(comment => comment.id === commentId);
        if(post.comments[commentIndex].username === user.username) {
          post.comments.splice(commentIndex, 1);
          await post.save();
          return "Delete comment success";
        } else {
          throw new AuthenticationError("Action not allow");
        }
      } else {
        throw new UserInputError('Post not found');
      }
    }
  }
}
