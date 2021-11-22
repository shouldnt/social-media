const { AuthenticationError, UserInputError } = require('apollo-server');

const Post = require('../../models/Post.js');
const checkAuth = require('../../utils/check-auth');

module.exports = {
  Query: {
    async getPosts() {
      try {
        const posts = await Post.find().sort( { createdAt: -1 } );
        console.log(posts[0]);
        return posts;
      } catch(error) {
        throw new Error(error);
      }
    },
    async getPost(_, { postId }) {
      console.log('postid', postId);
      try {
        const post = await Post.findById(postId);
        if(post) {
          return post;
        } else {
          throw new Error("Post not found");
        }
      } catch(error) {
        throw new Error(error);
      }
    }
  },

  Mutation: {
    async createPost(_, { body }, context) {
      const user = checkAuth(context);
      console.log(user);
      if(body.trim() === '') {
        throw new UserInputError("Post body must not empty");
      }
      const newPost = new Post({
        body,
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString()
      });
      const post = await newPost.save();
      context.pubSub.publish("NEW_POST", {
        newPost: post
      })
      return post;
    },
    async deletePost(_, { postId }, context) {
      const user = checkAuth(context);
      console.log('delete post', postId);
      try {
        const post = await Post.findById(postId);
        if(user.username === post.username) {
          await post.delete();
          return 'Post deleted successfully';
        } else {
          throw new AuthenticationError('Action are not allow!')
        }
      } catch(error) {
        throw new Error(error);
      }
    },
    async likePost(_, { postId }, context) {
      const user = checkAuth(context);
      console.log('like post', postId);
      try {
        const post = await Post.findById(postId);
        if(post) {
          const postAlreadyLiked = post.likes.find(like => like.username === user.username);
          if(postAlreadyLiked) {
            post.likes = post.likes.filter(like => like.username !== user.username);
          } else {
            post.likes.push({ username: user.username, createdAt: new Date().toISOString() });
          }
          await post.save();
          return post;
        } else {
          throw new UserInputError("Post not found");
        }
      } catch(error) {
        throw new Error(error);
      }
    },
    async deleteAllPost(_, __) {
      try {
        await Post.deleteMany({});
        return "deleted all posts successfully";
      } catch(error) {
        throw new Error(error);
      }
    }
  },
  Subcription: {
    newPost: {
      subscribe: (_, __, { pubsub }) => {
        pubsub.asyncIterator("NEW_POST");
      }
    }
  }
}
