import React, { useState, useEffect, useContext} from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import { useLocation, useNavigate } from 'react-router-dom';

import HeaderAvatar from '../components/HeaderAvatar';
import { AuthContext } from '../context/authContext';

const items = {
  home: 'home',
  login: 'login',
  register: 'register'
}
const getCurrentItem = () => {
  const pathname = window.location.pathname;
  return pathname === '/' ? items.home : pathname.substr(1);
}
const MenuBar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  let location = useLocation();
  const [activeItem, setActiveItem] = useState(getCurrentItem());
  useEffect(() => {
    setActiveItem(getCurrentItem());
  }, [location]);
  return (
    <>
      <div className="page-header py-5 border-b border-gray-100 relative z-10">
        <div class="container mx-auto">
          <div className="flex justify-between items-center">
            <div>
              <Link to="/"
                className={`block py-2 px-3 rounded-lg border ${activeItem === items.home ? 'border-blue-100 bg-blue-100' : ''} text-blue-500 hover:bg-blue-100`}
              >
                <i className="ri-home-heart-line text-2xl"></i>
              </Link>
            </div>
            <div class="header__navigation-item flex items-center">
              {user ? (
                <HeaderAvatar/>
              ) : (
                <>
                  {activeItem !== items.login && (
                    <Link to="/login"
                      className="py-2 px-3 border border-gray-100 rounded-lg flex items-center text-blue-500 mr-2 hover:bg-blue-100"
                    >
                      <i className="ri-login-box-line mr-2"></i>
                      Login
                    </Link>
                  )}
                  {activeItem !== items.register && (
                    <Link to="/register"
                      className="py-2 px-3 border border-gray-100 rounded-lg flex items-center text-blue-500 mr-2 hover:bg-blue-100"
                    >
                      <i className="ri-edit-2-line mr-2"></i>
                      Register
                    </Link>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default MenuBar;
