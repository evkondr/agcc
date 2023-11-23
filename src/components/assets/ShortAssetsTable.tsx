import React from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { NavLink } from 'react-router-dom';
import { IAssetModelShort } from '../../types';

interface tableProps {
  assets: IAssetModelShort[]
}
const ShortAssetsTable = ({ assets }:tableProps) => {
  const columns: ColumnsType<IAssetModelShort> = [
    {
      title: 'Модель',
      dataIndex: 'model',
      key: 'model',
      render: (text, record) => <NavLink to={`/assets/${record.id}`}>{text}</NavLink>,
    },
    {
      title: 'Тип',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Серийный номер',
      dataIndex: 'serialNumber',
      key: 'serialNumber',
    },
  ];
  return (
    <Table columns={columns} dataSource={assets} />
  );
};

export default ShortAssetsTable;
