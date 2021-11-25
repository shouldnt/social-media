import React, { useContext, useState } from 'react';

import { gql, useMutation } from '@apollo/client';
import { Button, Confirm, Icon, Popup } from 'semantic-ui-react';

import { AuthContext } from '../context/authContext';
import { GET_POST_QUERY } from '../utils/graphql'

const DeleteCommentButton = ({postId, commentId, onDeleteSuccess}) => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const [deleteComment] = useMutation(DELETE_COMMENT_MUTATION, {
    variables: { postId, commentId },
    update(cache, ) {
      setConfirmOpen(false);
      const data = cache.readQuery({
        variables: { postId },
        query: GET_POST_QUERY,
      })
      const newData = {
        getPost: {
          ...data.getPost,
          comments: data.getPost.comments.filter(comment => comment.id !== commentId)
        }
      }
      console.log(newData);
      cache.writeQuery({
        variables: { postId },
        query: GET_POST_QUERY,
        data: newData
      });

      if(onDeleteSuccess) {
        onDeleteSuccess();
      }
    }
  });
  return (
    <>

      <Popup
        content="Delete comment"
        trigger={(
          <Button
            float="right"
            as='div'
            color="red"
            onClick={() => setConfirmOpen(true)}
          >
            <Icon name='trash' style={{margin: 0}}/>
          </Button>
        )}
      />
      <Confirm
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)} onConfirm={() => {
          deleteComment();
        }}
        onCancel={() => setConfirmOpen(false)}
      />
    </>
  )
}

const DELETE_COMMENT_MUTATION = gql`
  mutation DeleteComment($postId: String!, $commentId: String!) {
    deleteComment(postId: $postId, commentId: $commentId)
  }
`

export default DeleteCommentButton;
