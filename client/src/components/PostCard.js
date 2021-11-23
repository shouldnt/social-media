import React, { useContext } from 'react';

import moment from 'moment';
import { Card, Icon, Label, Image, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import LikeButton from './LikeButton';
import DeletePost from './DeletePost';
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
        <Card.Meta as={Link} to={`/posts/${id}`}>{moment(createdAt).fromNow()}</Card.Meta>
        <Card.Description>
          {body}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <LikeButton post={{id, likes, likeCount}} user={user}></LikeButton>
        <Button as={Link} to={`/posts/${post.id}`} labelPosition='right'>
          <Button color='teal' basic>
            <Icon name='comments' />
          </Button>
          <Label as='div' basic color='teal' pointing='left'>
            {commentCount}
          </Label>
        </Button>
        { user && user.username === username && (
          <DeletePost post={{id: post.id, username: post.username}} />
        ) }
      </Card.Content>
    </Card>
  )
}

export default PostCard;
