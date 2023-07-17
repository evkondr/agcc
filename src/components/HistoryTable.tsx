import React from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { History } from '../db';

interface tableProps {
  history: History[]
}
const HistoryTable = ({ history }:tableProps) => {
  const columns: ColumnsType<History> = [
    {
      title: 'Дата',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Прошлое место положение',
      dataIndex: 'prevOwner',
      key: 'prevOwner',
    },
    {
      title: 'Комментарий',
      dataIndex: 'comments',
      key: 'comments',
    },
    {
      title: 'Ответственный',
      dataIndex: 'lastModified',
      key: 'lastModified',
    },
  ];
  return (
    <Table columns={columns} dataSource={history} />
  );
};

export default HistoryTable;
