import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import defaultAvatar from '../assets/default_avatar.png';
import { AuthContext } from '../context/authContext';

const HeaderAvatar = () => {
  const [expand, setExpand] = useState(false);
  const { user, logout } = useContext(AuthContext);
  return(
    <div className="header__navigation-avatar">
      <div className="rounded-lg border border-gray-100 overflow-hidden cursor-pointer" onClick={() => setExpand(!expand)}>
        <div className="navigation-img">
          <img src={defaultAvatar} alt="" />
        </div>
      </div>
      <ul className={`navigation-items border border-gray-100 rounded-lg bg-white p-3 ${ !expand ? 'hidden' : '' }`}>
        <li><Link className="navigation-item py-2 px-3 rounded-md hover:bg-blue-100 block" to="/profile"
          onClick={() => setExpand(false)}
        >Profile</Link></li>
        <li><Link className="navigation-item py-2 px-3 rounded-md hover:bg-blue-100 block" to="/"
          onClick={() => {
            setExpand(false);
            logout();
          }}
        >
          <div className="flex items-center whitespace-nowrap"><i className="ri-logout-box-r-line mr-1"></i> Sign out</div>
          <div className="font-bold text-lg">{user.username}</div>
        </Link></li>
      </ul>
    </div>
  )
}

export default HeaderAvatar;
