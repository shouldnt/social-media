import React, { useContext, useState } from 'react';

import { gql, useMutation } from '@apollo/client';
import { Button, Confirm, Icon } from 'semantic-ui-react';

import { AuthContext } from '../context/authContext';
import { FETCH_POSTS_QUERY } from '../utils/graphql'

const DeletePost = ({post, onDeleteSuccess}) => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const [deletePost] = useMutation(DELETE_POST_MUTATION, {
    variables: { postId: post.id },
    update(cache, ) {
      setConfirmOpen(false);

      const data = cache.readQuery({
        query: FETCH_POSTS_QUERY,
      })
      const newData = {
        getPosts: data.getPosts.filter(_post => _post.id !== post.id)
      }
      cache.writeQuery({ query: FETCH_POSTS_QUERY, data: newData });

      if(onDeleteSuccess) {
        onDeleteSuccess();
      }
    }
  });
  if(post.username !== user.username) {
    return null;
  }
  return (
    <>
      <Button
        float="right"
        as='div'
        color="red"
        onClick={() => setConfirmOpen(true)}
      >
        <Icon name='trash' style={{margin: 0}}/>
      </Button>
      <Confirm
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)} onConfirm={() => {
          deletePost();
        }}
        onCancel={() => setConfirmOpen(false)}
      />
    </>
  )
}

const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`

export default DeletePost;
