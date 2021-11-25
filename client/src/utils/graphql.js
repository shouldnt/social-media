import gql from 'graphql-tag';

export const GET_POST_QUERY = gql`
  query getPost($postId: ID!) {
    getPost(postId: $postId) {
      comments {
        id
        createdAt
        username
        body
      }
      id
      body
      createdAt
      username
      likeCount
      commentCount
      likes {
        id
        createdAt
        username
      }
    }
  }
`;
export const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
      id body
      createdAt
      username
      likeCount
      commentCount
      comments {
        id
        username
        body
        createdAt
      }
      likes {
        id
        createdAt
        username
      }
    }
  }
`;

