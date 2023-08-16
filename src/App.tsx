import React, { useState } from 'react';
import { Layout } from 'antd';
import { Navigate, Outlet } from 'react-router-dom';
import LeftSidebar from './components/layout/LeftSidebar';
import { useAppSelector } from './redux/hooks';
import TopHeader from './components/layout/Header';

const {
  Content,
} = Layout;
function App() {
  const [contentMargin, setContentMargin] = useState<number>(200);
  const { demoToken } = useAppSelector((state) => state.auth);
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
