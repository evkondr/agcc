/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useLocale } from 'antd/es/locale';
import TopHeader from '../layout/Header';
import AuthForm from '../AuthForm';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getDemoToken, setDemoToken } from '../../redux/features/authSlice';

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const { demoToken } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';
  const onFinish = () => {
    console.log('finish');
  };
  const demoEntrance = () => {
    dispatch(setDemoToken());
  };
  useEffect(() => {
    dispatch(getDemoToken());
  }, [dispatch]);
  useEffect(() => {
    if (demoToken) {
      navigate(from, { replace: true });
    }
  }, [demoToken]);
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
