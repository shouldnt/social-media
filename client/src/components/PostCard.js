import React from 'react';
import moment from 'moment';
import { Card, Icon, Label, Image, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const PostCard = ({post}) => {
  const { body, username, createdAt, likeCount, commentCount, likes, id } = post;

  const likePost = () => {

  }
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
        <Button as='div' labelPosition='right'>
          <Button color='teal' basic>
            <Icon name='heart' />
          </Button>
          <Label as='a' basic color='teal' pointing='left'>
            {likeCount}
          </Label>
        </Button>
        <Button as='div' labelPosition='right'>
          <Button color='teal' basic>
            <Icon name='comments' />
          </Button>
          <Label as='a' basic color='teal' pointing='left'>
            {commentCount}
          </Label>
        </Button>
      </Card.Content>
    </Card>
  )
}

export default PostCard;
