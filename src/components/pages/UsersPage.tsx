import React from 'react';
import { useAppSelector } from '../../redux/hooks';
import UsersTable from '../UsersTable';

const UsersPage = () => {
  const { users } = useAppSelector((state) => state.users);
  return (
    <UsersTable users={users} />
  );
};

export default UsersPage;
