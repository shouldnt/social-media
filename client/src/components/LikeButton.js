import React, { useEffect, useState } from 'react';

import { Button, Label, Icon, Popup } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';

const LikeButton = ({post, user}) => {
  const [like, setLike] = useState(false);
  const userLikedThePost = (user, likes) => user && likes.find(like => like.username === user.username);
  const [likePost] = useMutation(LIKE_POST_MUTATION, {
    variables: {
      postId: post.id
    }
  });
  useEffect(() => {
    userLikedThePost(user, post.likes) ? setLike(true) : setLike(false);
  }, [post, user])
  const heart = (liked) => {
    return liked ? (
      <i className="ri-heart-fill text-red-400"></i>
    ) : (
      <i className="ri-heart-line text-red-300"></i>
    )
  }
  if(!user) {
    return (
      <Link to='/login'>
        <li className="flex items-center gap-2">
          <div
            className="rounded-full flex items-center justify-center border border-red-300 hover:border-red-500 cursor-pointer"
            style={{width: 30, height: 30}}
          >
            {heart(like)}
          </div>
          <div>{post.likeCount || 0}</div>
        </li>
      </Link>
    )
  }
  return (
    <li className="flex items-center gap-2">
      <div
        className={`rounded-full flex items-center justify-center border border-red-300 hover:border-red-500 cursor-pointer ${like ? "bg-red-200" : ''}`}
        style={{width: 30, height: 30}}
        onClick={likePost}
      >
        {heart(like)}
      </div>
      <div>{post.likeCount || 0}</div>
    </li>
  )
  return (
    <Popup
      content={`${like ? 'UnLike' : 'Like'} post`}
      trigger={(
        <Button as='div' labelPosition='right'>
          {user ?
              like ? (
                <Button color='teal' onClick={likePost}>
                  <Icon name='heart' />
                </Button>
              ) : (
                <Button color='teal' basic onClick={likePost}>
                  <Icon name='heart' />
                </Button>
              )
              : (
                <Button as={Link} to="/login" color='teal' basic>
                  <Icon name='heart' />
                </Button>
              )}
          <Label as='div' basic color='teal' pointing='left'>
            {post.likeCount}
          </Label>
        </Button>
      )}
    />
  )
}

const LIKE_POST_MUTATION = gql`
  mutation LikePost($postId: String!) {
    likePost(postId: $postId) {
      id
      body
      createdAt
      username
      comments {
        id
        createdAt
        username
        body
      }
      likes {
        id
        createdAt
        username
      }
      likeCount
      commentCount
    }
  }
`;

export default LikeButton;
