import React from 'react';
import { Layout } from 'antd';

const {
  Header, Footer, Sider, Content,
} = Layout;
function App() {
  return (
    <Layout className="main">
      <Header className="header">
        <div className="logo">
          <img src="" alt="logo" />
        </div>
      </Header>
      <Layout hasSider>
        <Sider>Sider</Sider>
        <Content>Content</Content>
      </Layout>
      <Footer>Footer</Footer>
    </Layout>
  );
}

export default App;
