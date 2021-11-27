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
      <div className="feed-container">
        { user && (<PostForm/>) }
        <div className="pb-3"></div>
        {loading ? (<h1>loading posts...</h1>) : (
          <Transition.Group>
            {posts.map((post, index) => {
              return (
                <div key={index} className="mb-8">
                <PostCard post={post}></PostCard>
                </div>
              )
            })}
          </Transition.Group>
        )}
      </div>
    </div>
  )
}
export default Home;
