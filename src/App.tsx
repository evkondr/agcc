import React from 'react';
import { Layout } from 'antd';
import Logo from './images/logo.png';
import LeftSidebar from './components/LeftSidebar';

const {
  Header, Content,
} = Layout;
function App() {
  return (
    <Layout className="main">
      <Header className="header">
        <div className="logo">
          <img src={Logo} alt="logo" />
        </div>
        <h1 className="header__title">Управление ИТ активами</h1>
      </Header>
      <Layout hasSider>
        <LeftSidebar />
        <Content>Content</Content>
      </Layout>
    </Layout>
  );
}

export default App;
