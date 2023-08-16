import React from 'react';
import { Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';
import TopHeader from '../layout/Header';

const LoginPage = () => {
  return (
    <Layout className="main">
      <TopHeader />
      <Layout hasSider>
        <Content className="content">
          Login Page
        </Content>
      </Layout>
    </Layout>
  );
};

export default LoginPage;
