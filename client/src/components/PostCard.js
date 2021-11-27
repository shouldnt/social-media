import React, { useContext } from 'react';

import moment from 'moment';
import { Card, Icon, Label, Image, Button, Popup } from 'semantic-ui-react';
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
    <>
      <article className="post-card rounded-lg border border-blue-100 p-5 shadow-lg">
        <header className="card__header flex items-center mb-3">
          <div className="mr-3 rounded-md overflow-hidden">
            <img
              style={{width: 50, height: 50, display: 'block'}}
              src='https://react.semantic-ui.com/images/avatar/large/molly.png'
            />
          </div>
          <div>
            <h3 className="font-bold text-lg">{username}</h3>
            <Link
              to={`/posts/${id}`}
              className="text-gray-500 font-light"
            >{moment(createdAt).fromNow()}</Link>
          </div>
        </header>
        <div className="text-normal text-lg">
          {body}
        </div>
        <div className="pb-6"></div>
        <footer className="flex justify-between items-center">
          <ul className="flex items-center gap-5">
            <LikeButton post={{id, likes, likeCount}} user={user}></LikeButton>
            <Link to={`/posts/${id}`}>
              <li className="flex items-center gap-2 cursor-pointer">
                <div className="rounded-full flex items-center justify-center border border-blue-300" style={{width: 30, height: 30}}>
                  <i className="ri-chat-3-line text-blue-300"></i>
                </div>
                <div>{commentCount || 0}</div>
              </li>
            </Link>
          </ul>
          { user && user.username === username && (
            <DeletePost post={{id: post.id, username: post.username}} />
          ) }
        </footer>
      </article>
    </>
  )
}

export default PostCard;
