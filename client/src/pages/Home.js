import React from 'react';
import gql from 'graphql-tag';
import { Grid, Image } from 'semantic-ui-react'
import { useQuery } from '@apollo/react-hooks';
import PostCard from '../components/PostCard';

const Home = () => {
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);
  const { getPosts: posts } = data || { getPosts: [] };
  return (
    <Grid columns={3}>
      <Grid.Row className="page-title">
        <h1>Recents Posts</h1>
      </Grid.Row>
      <Grid.Row>
        {loading ? (<h1>loading posts...</h1>) : posts.map(post => {
          return (
            <Grid.Column>
              <PostCard post={post}></PostCard>
            </Grid.Column>
          )
        })}
      </Grid.Row>
    </Grid>
  )
}
const FETCH_POSTS_QUERY = gql`
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
export default Home;
