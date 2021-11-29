import React, { useContext } from 'react';

import classes from 'classnames';

import { AuthContext } from '../context/authContext';
import AvatarUpload from '../components/AvatarUpload';

const avatarSize = 100;
const Profile = () => {
  const { user, avatar } = useContext(AuthContext);
  return (
    <section>
      <div className="pt-10"></div>
      <div className="profile-container">
        <figure className="flex p-5 border border-blue-100 rounded-xl">
          <div
            style={{width: avatarSize, height: avatarSize}}
            className={classes(
              'rounded-lg overflow-hidden mr-5'
            )}
          >
            <img
              floated='right'
              size='mini'
              src={
                avatar ? avatar : 'https://react.semantic-ui.com/images/avatar/large/molly.png'
              }
              className="block"
            />
          </div>
          <figcaption
            className={classes(
              'flex flex-col justify-between'
            )}
          >
            <div>
              <h1
                className={classes(
                  'text-3xl font-bold'
                )}
              >{user.username}</h1>
              <h2
                className={classes(
                  'text-xl font-medium'
                )}
              >{user.email}</h2>
            </div>
            <AvatarUpload>
              {(selectFile, upload) => (
                <div
                  className={classes(
                    'flex items-center',
                    'group cursor-pointer'
                  )}
                >
                  <div
                    className={classes(
                      'flex justify-center items-center',
                      'border border-blue-100 rounded-full',
                      'mr-2',
                      'group-hover:bg-blue-500',
                    )}
                    style={{width: 30, height: 30}}
                  >
                    <i className={classes(
                      'ri-pencil-line text-blue-500',
                      'group-hover:text-white'
                    )}></i>
                  </div>
                  <div className={classes(
                    'group-hover:text-blue-500'

                  )}>change avatar</div>
                </div>
              )}
            </AvatarUpload>
          </figcaption>
        </figure>
      </div>
    </section>
  )
}


export default Profile;
