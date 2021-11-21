import React, { useState, useEffect, useContext} from 'react';
import { AuthContext } from '../context/authContext';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import { useLocation, useNavigate } from 'react-router-dom';

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
  if(user) {
    return (
      <Menu pointing secondary size="massive" color="teal">
        <Menu.Item
          name={user.username}
          active
          as={Link}
          to="/"
        />
        <Menu.Menu position='right'>
          <Menu.Item
            name="logout"
            active={activeItem === items.register}
            onClick={(e) => {
              logout();
              navigate('/');
            }}
          />
        </Menu.Menu>
      </Menu>
    )
  }
  return (
    <Menu pointing secondary size="massive" color="teal">
      <Menu.Item
        name={items.home}
        active={activeItem === items.home}
        as={Link}
        to="/"
      />
      <Menu.Menu position='right'>
        <Menu.Item
          name={items.login}
          active={activeItem === items.login}
          as={Link}
          to="/login"
        />
        <Menu.Item
          name={items.register}
          active={activeItem === items.register}
          as={Link}
          to="/register"
        />
      </Menu.Menu>
    </Menu>
  )
}
export default MenuBar;
