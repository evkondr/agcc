/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Layout } from 'antd';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import LeftSidebar from './components/layout/LeftSidebar';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import TopHeader from './components/layout/Header';
import { getDemoToken } from './redux/features/authSlice';

const {
  Content,
} = Layout;
function App() {
  const [contentMargin, setContentMargin] = useState<number>(200);
  const { demoToken } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const location = useLocation();
  useEffect(() => {
    dispatch(getDemoToken());
  }, [dispatch]);
  if (!demoToken) {
    return <Navigate to="authorization" state={{ from: location }} replace />;
  }
  return (
    <Layout className="main">
      <TopHeader />
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
