import React, { useState, useRef } from 'react';

import gql from 'graphql-tag';
import { Form, Button } from 'semantic-ui-react';

import { useMutation } from '@apollo/client';
import { useForm } from '../utils/hooks';
import { FETCH_POSTS_QUERY } from '../utils/graphql';

const CommentForm = ({postId}) => {
  const inputRef = useRef(null);
  const { values, onSubmit, onChange } = useForm(createPostCallback, {body: ''});
  const [error, setError] = useState("");
  const [createPost] = useMutation(CREATE_COMMENT, {
    variables: {
      postId,
      body: values.body
    },
    onError: (error) => {
      console.log(error);
      setError(error.graphQLErrors[0].message);
      window.createPostError = error;
    },
    update(cache, result) {
      setError("");
      values.body = '';
      if(inputRef.current) inputRef.current.blur();
    }
  });
  function createPostCallback() {
    createPost();
  }
  return (
    <Form onSubmit={onSubmit}>
      <h2>write Comment:</h2>
      <Form.Field>
        <input
          placeholder="input"
          name="body"
          onChange={onChange}
          value={values.body}
          error={!!error}
          ref={inputRef}
        />
      </Form.Field>
      {error && (
        <Form.Field>
          <p class="red">
            {error}
          </p>
        </Form.Field>
      )}
      <Button
        disabled={values.body.trim() === ''}
        color="teal"
      >Create</Button>
    </Form>
  )
}

const CREATE_COMMENT = gql`
  mutation CreateComment($postId: String!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      body
      id
      createdAt
      username
      comments {
        id
        createdAt
        username
        body
      }
    }
  }
`

export default CommentForm;
