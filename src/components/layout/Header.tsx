/* eslint-disable no-unused-vars */
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Header } from 'antd/es/layout/layout';
import { Button } from 'antd';
import Logo from '../../images/logo.png';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { removeDemoToken } from '../../redux/features/authSlice';

function TopHeader() {
  const { demoToken } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const logout = () => {
    dispatch(removeDemoToken());
  };
  return (
    <Header className="header">
      <NavLink to="/" className="logo">
        <img src={Logo} alt="logo" />
      </NavLink>
      <h1 className="header__title">Управление ИТ активами</h1>
      {demoToken && <Button htmlType="button" className="header__logout-btn" onClick={logout}>Выхов</Button>}
    </Header>
  );
}

export default TopHeader;
