import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import UsersTable from '../users/UsersTable';
import { fetchAllUsers } from '../../redux/features/thunks/userThunks';

const AllUsersPage = () => {
  const { users } = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);
  return (
    <UsersTable users={users} />
  );
};

export default AllUsersPage;
