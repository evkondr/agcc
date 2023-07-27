import React, { useState } from 'react';
import { Layout } from 'antd';
import { NavLink, Outlet } from 'react-router-dom';
import Logo from './images/logo.png';
import LeftSidebar from './components/LeftSidebar';

const {
  Header, Content,
} = Layout;
function App() {
  const [contentMargin, setContentMargin] = useState<number>(200);
  return (
    <Layout className="main">
      <Header className="header">
        <NavLink to="/" className="logo">
          <img src={Logo} alt="logo" />
        </NavLink>
        <h1 className="header__title">Управление ИТ активами</h1>
      </Header>
      <Layout hasSider>
        <LeftSidebar setContentMargin={setContentMargin} contentMargin={contentMargin} />
        <Content className="content" style={{ marginLeft: `${contentMargin}px` }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
