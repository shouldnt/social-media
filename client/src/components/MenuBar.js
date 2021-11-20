import React, { useState } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

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
  const [activeItem, setActiveItem] = useState(getCurrentItem());
  const handleItemClick = (_, { name }) => {
    setActiveItem(name);
  }
  return (
    <Menu pointing secondary size="massive" color="teal">
      <Menu.Item
        name={items.home}
        active={activeItem === items.home}
        onClick={handleItemClick}
        as={Link}
        to="/"
      />
      <Menu.Menu position='right'>
        <Menu.Item
          name={items.login}
          active={activeItem === items.login}
          onClick={handleItemClick}
          as={Link}
          to="/login"
        />
        <Menu.Item
          name={items.register}
          active={activeItem === items.register}
          onClick={handleItemClick}
          as={Link}
          to="/register"
        />
      </Menu.Menu>
    </Menu>
  )
}
export default MenuBar;
