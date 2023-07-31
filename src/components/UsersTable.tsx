import React from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { User } from '../db';

interface UsersTableProps{
  users:User[]
}
const UsersTable = ({ users }:UsersTableProps) => {
  console.log(users);
  const columns:ColumnsType<User> = [
    {
      title: 'Фамилия',
      dataIndex: 'surname',
    },
    {
      title: 'Имя',
      dataIndex: 'name',
    },
  ];
  return (
    <Table columns={columns} dataSource={users} />
  );
};

export default UsersTable;
