import React from 'react';
import { Layout, Space } from 'antd';

const { Header, Footer, Sider, Content } = Layout;
function App() {
  return (
    <Layout>
      <Header>Header</Header>
      <Layout hasSider>
        <Sider>Sider</Sider>
        <Content>Content</Content>
      </Layout>
      <Footer>Footer</Footer>
    </Layout>
  );
}

export default App;
