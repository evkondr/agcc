import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import {
  UserOutlined, ShopOutlined, UserAddOutlined, DesktopOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { NavLink } from 'react-router-dom';
import getMenuItems from '../uitls/getMenuItems';

type MenuItem = Required<MenuProps>['items'][number];

const { Sider } = Layout;
const menuItems:MenuItem[] = [
  getMenuItems('Пользователи', 1, <UserOutlined />, [
    getMenuItems('Свободный', 'sub1'),
    getMenuItems('Москва', 'sub2'),
    getMenuItems(<NavLink to="/users/add">Добавить</NavLink>, 'sub3', <UserAddOutlined />),
  ]),
  getMenuItems('Склад', 2, <ShopOutlined />, [
    getMenuItems('Свободный', 'sub4'),
    getMenuItems('Москва', 'sub5'),
    getMenuItems(<NavLink to="/assets/add">Добавить</NavLink>, 'sub6', <DesktopOutlined />),
  ]),
];

function LeftSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Sider collapsible collapsed={collapsed} onCollapse={() => { setCollapsed(!collapsed); }}>
      <div className="demo-logo-vertical" />
      <Menu className="menu" theme="dark" defaultSelectedKeys={['1']} mode="inline" items={menuItems} />
    </Sider>
  );
}

export default LeftSidebar;
