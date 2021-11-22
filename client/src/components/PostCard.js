import React, { useContext } from 'react';

import moment from 'moment';
import { Card, Icon, Label, Image, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import LikeButton from './LikeButton';
import { AuthContext } from '../context/authContext';

const PostCard = ({post}) => {
  const { user } = useContext(AuthContext);
  const { body, username, createdAt, likeCount, likes, commentCount, id } = post;

  const toggleComments = () => {

  }
  return (
    <Card style={{ marginBottom: '1rem' }} fluid>
      <Card.Content>
        <Image
          floated='right'
          size='mini'
          src='https://react.semantic-ui.com/images/avatar/large/molly.png'
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} to={`/post/${id}`}>{moment(createdAt).fromNow()}</Card.Meta>
        <Card.Description>
          {body}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <LikeButton post={{id, likes, likeCount}} user={user}></LikeButton>
        <Button as={Link} to={`/post/${post.id}`} labelPosition='right'>
          <Button color='teal' basic>
            <Icon name='comments' />
          </Button>
          <Label as='div' basic color='teal' pointing='left'>
            {commentCount}
          </Label>
        </Button>
        { user && user.username === username && (
          <Button
            float="right"
            as='div'
            color="red"
            onClick={(e) => {
              console.log('delete post');
            }}
          >
            <Icon name='trash' style={{margin: 0}}/>
          </Button>
        ) }
      </Card.Content>
    </Card>
  )
}

export default PostCard;
