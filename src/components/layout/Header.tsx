import React from 'react';
import { NavLink } from 'react-router-dom';
import { Header } from 'antd/es/layout/layout';
import Logo from '../../images/logo.png';

function TopHeader() {
  return (
    <Header className="header">
      <NavLink to="/" className="logo">
        <img src={Logo} alt="logo" />
      </NavLink>
      <h1 className="header__title">Управление ИТ активами</h1>
    </Header>
  );
}

export default TopHeader;
