import React, { useState } from 'react';

import gql from 'graphql-tag';
import { Form, Button } from 'semantic-ui-react';

import { useMutation } from '@apollo/client';
import { useForm } from '../utils/hooks';
import { FETCH_POSTS_QUERY } from '../utils/graphql';

const PostForm = () => {
  const { values, onSubmit, onChange } = useForm(createPostCallback, {body: ''});
  const [error, setError] = useState("");
  const [createPost] = useMutation(CREATE_POST, {
    variables: values,
    onError: (error) => {
      console.log(error);
      setError(error.graphQLErrors[0].message);
      window.createPostError = error;
    },
    update(cache, result) {
      setError("");
      const data = cache.readQuery({
        query: FETCH_POSTS_QUERY
      })
      cache.writeQuery({ query: FETCH_POSTS_QUERY, data: {
        getPosts: [result.data.createPost, ...data.getPosts]
      } });
      values.body = "";
    }
  });
  function createPostCallback() {
    createPost();
  }
  return (
    <Form onSubmit={onSubmit}>
      <h2>Create Post:</h2>
      <Form.Field>
        <Form.Input
          placeholder="input"
          name="body"
          onChange={onChange}
          value={values.body}
          error={!!error}
        />
      </Form.Field>
      {error && (
        <Form.Field>
          <p class="red">
            {error}
          </p>
        </Form.Field>
      )}
      <Button color="teal" type="submit">Create</Button>
    </Form>
  )
}

const CREATE_POST = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      username
      body
      createdAt
      comments {
        body
        username
        createdAt
        id
      }
      likeCount
      commentCount
      likes {
        id
        createdAt
        username
      }
    }
  }
`

export default PostForm;
