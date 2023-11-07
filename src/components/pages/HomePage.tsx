import DesktopOutlined from '@ant-design/icons/lib/icons/DesktopOutlined';
import UserOutlined from '@ant-design/icons/lib/icons/UserOutlined';
import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <nav className="home-page-nav">
      <Link to="/assets" className="home-page-nav__item">
        <DesktopOutlined />
        <span>Устройства</span>
      </Link>
      <Link to="/users" className="home-page-nav__item">
        <UserOutlined />
        <span>Пользователи</span>
      </Link>
    </nav>
  );
};

export default HomePage;
