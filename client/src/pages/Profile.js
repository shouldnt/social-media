import React, { useContext, useMemo } from 'react';

import moment from 'moment';
import { Grid, Card, Image, Button, Icon, Label } from 'semantic-ui-react';
import { gql, useQuery } from '@apollo/client';
import { useParams, useNavigate } from 'react-router-dom';

import CommentForm from '../components/CommentForm';
import DeleteCommentButton from '../components/DeleteCommentButton.js';
import DeletePost from '../components/DeletePost';
import LikeButton from '../components/LikeButton';
import { AuthContext } from '../context/authContext';
import { GET_POST_QUERY } from '../utils/graphql';

const Profile = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { postId } = useParams();
  const { loading, data } = useQuery(GET_POST_QUERY, {
    variables: { postId },
  });
  const post = useMemo(() => {
    return data ? data.getPost : {};
  }, [data])

  if(loading) {
    return ( <h1>Loading...</h1> )
  }
  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width="2">
          <Image
            floated='right'
            size='mini'
            src='https://react.semantic-ui.com/images/avatar/large/molly.png'
          />
        </Grid.Column>
        <Grid.Column width="10">
          <Card fluid>
            <Card.Content>
              <Card.Header>{post.username}</Card.Header>
              <Card.Meta>{moment(post.createdAt).fromNow()}</Card.Meta>
              <Card.Description>{post.body}</Card.Description>
            </Card.Content>
            <Card.Content>
              <LikeButton post={post} user={user} />
              <Button
                as="div"
                labelPosition="right"
                onClick={() => console.log('comment on post')}
              >
                <Button basic color="blue">
                  <Icon name="comments"></Icon>
                </Button>
                <Label basic color="blue" pointing="left"></Label>
              </Button>
              <DeletePost post={{id: post.id, username: post.username}} onDeleteSuccess={() => {
                navigate('/');
              }}/>
            </Card.Content>
          </Card>
          <Card fluid>
            <Card.Content>
              <CommentForm postId={post.id} />
            </Card.Content>
          </Card>
          {post.comments.map(comment => {
            return (
              <Card fluid>
                { user && user.username === comment.username && (
                  <DeleteCommentButton postId={post.id} commentId={comment.id} />
                ) }
                <Card.Content>
                  <Card.Header>{comment.username}</Card.Header>
                  <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
                  <Card.Description>{comment.body}</Card.Description>
                </Card.Content>
              </Card>
            )
          })}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}


export default Profile;
