import React, { useContext, useState } from 'react';

import { gql, useMutation } from '@apollo/client';
import { Button, Confirm, Icon, Popup } from 'semantic-ui-react';

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
  if(!user || post.username !== user.username) {
    return null;
  }
  return (
    <>
      <li className="flex items-center group cursor-pointer"
        onClick={() => setConfirmOpen(true)}
      >
        <div
          className="rounded-full flex items-center justify-center border border-red-500 group-hover:bg-red-500"
          style={{width: 30, height: 30}}
        >
          <i
            className="ri-delete-bin-5-line text-red-500 group-hover:text-white"
          ></i>
        </div>
      </li>
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
