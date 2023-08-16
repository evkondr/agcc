import React, { useEffect, useState } from 'react';
import { Layout } from 'antd';
import { Navigate, Outlet } from 'react-router-dom';
import LeftSidebar from './components/layout/LeftSidebar';
import { useAppSelector, useAppDispatch } from './redux/hooks';
import TopHeader from './components/layout/Header';
import { getDemoToken } from './redux/features/authSlice';

const {
  Content,
} = Layout;
function App() {
  const [contentMargin, setContentMargin] = useState<number>(200);
  const { demoToken } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  console.log(demoToken);
  useEffect(() => {
    dispatch(getDemoToken());
  }, [dispatch, demoToken]);
  if (!demoToken) {
    return <Navigate to="authorization" />;
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
