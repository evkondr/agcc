import React from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { NavLink } from 'react-router-dom';
import { AssetModel } from '../db';

interface tableProps {
  assets: AssetModel[]
}
const AssetsTable = ({ assets }:tableProps) => {
  const columns: ColumnsType<AssetModel> = [
    {
      title: 'Модель',
      dataIndex: 'model',
      key: 'model',
      render: (text, record) => <NavLink to={`assets/${record.id}`}>{text}</NavLink>,
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
    {
      title: 'Расположение',
      dataIndex: 'owner',
      key: 'owner',
    },
    {
      title: 'Статус',
      dataIndex: 'status',
      key: 'status',
    },
  ];
  return (
    <Table columns={columns} dataSource={assets} />
  );
};

export default AssetsTable;
