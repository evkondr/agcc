import React from 'react';
import { Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';
import TopHeader from '../layout/Header';
import AuthForm from '../AuthForm';
import { useAppDispatch } from '../../redux/hooks';
import { setDemoToken } from '../../redux/features/authSlice';

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const onFinish = () => {
    console.log('finish');
  };
  const demoEntrance = () => {
    dispatch(setDemoToken());
  };
  return (
    <Layout className="main">
      <TopHeader />
      <Layout hasSider>
        <Content className="content" style={{ display: 'flex', justifyContent: 'center' }}>
          <AuthForm onFinish={onFinish} demoEntrance={demoEntrance} />
        </Content>
      </Layout>
    </Layout>
  );
};

export default LoginPage;
