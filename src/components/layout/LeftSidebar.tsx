import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import {
  UserOutlined, ShopOutlined, UserAddOutlined, DesktopOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { NavLink } from 'react-router-dom';
import getMenuItems from '../../uitls/getMenuItems';

type MenuItem = Required<MenuProps>['items'][number];

const { Sider } = Layout;
const menuItems:MenuItem[] = [
  getMenuItems('Пользователи', 1, <UserOutlined />, [
    getMenuItems(<NavLink to="/users?city=Свободный">Свободный</NavLink>, 'sub1'),
    getMenuItems(<NavLink to="/users?city=Москва">Москва</NavLink>, 'sub2'),
    getMenuItems(<NavLink to="/users/add">Добавить</NavLink>, 'sub3', <UserAddOutlined />),
  ]),
  getMenuItems('Склад', 2, <ShopOutlined />, [
    getMenuItems(<NavLink to="/assets?city=Свободный">Свободный</NavLink>, 'sub4'),
    getMenuItems(<NavLink to="/assets?city=Москва">Москва</NavLink>, 'sub5'),
    getMenuItems(<NavLink to="/assets/add">Добавить</NavLink>, 'sub6', <DesktopOutlined />),
  ]),
];
interface LeftSidebarProps{
  // eslint-disable-next-line no-unused-vars
  setContentMargin: (value:number) => void,
  contentMargin: number
}
function LeftSidebar({ setContentMargin, contentMargin }:LeftSidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const onCollapse = () => {
    if (contentMargin === 200) {
      setCollapsed(true);
      setContentMargin(80);
    } else {
      setCollapsed(false);
      setContentMargin(200);
    }
  };
  return (
    <Sider className="sidebar" collapsible collapsed={collapsed} onCollapse={onCollapse}>
      <div className="demo-logo-vertical" />
      <Menu className="menu" theme="dark" defaultSelectedKeys={['1']} mode="inline" items={menuItems} />
    </Sider>
  );
}

export default LeftSidebar;
