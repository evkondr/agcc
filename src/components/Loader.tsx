import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

const Loader = ({ size }:{size?:number}) => {
  return (
    <div className="loader-wrapper">
      <Spin indicator={<LoadingOutlined style={{ fontSize: size || 70 }} spin />} />
    </div>
  );
};

export default Loader;
