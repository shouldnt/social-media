import gql from 'graphql-tag';

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
