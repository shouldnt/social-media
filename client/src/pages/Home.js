import React, { useContext } from 'react';

import { Grid, Image, Transition } from 'semantic-ui-react'
import { useQuery } from '@apollo/client';

import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';
import { AuthContext } from '../context/authContext';
import { FETCH_POSTS_QUERY } from '../utils/graphql';

const Home = () => {
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);
  const { user } = useContext(AuthContext);
  const { getPosts: posts } = data || { getPosts: [] };
  return (
    <div class="container mx-auto">
      <Grid columns={3}>
        <Grid.Row className="page-title">
          <Grid.Column>
            <h1>Recents Posts</h1>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          {user && (
            <Grid.Column>
              <PostForm/>
            </Grid.Column>
          )}
          {loading ? (<h1>loading posts...</h1>) : (
            <Transition.Group>
              {posts.map((post, index) => {
                return (
                  <Grid.Column key={index}>
                    <PostCard post={post}></PostCard>
                  </Grid.Column>
                )
              })}
            </Transition.Group>
          )}
        </Grid.Row>
      </Grid>
    </div>
  )
}
export default Home;
