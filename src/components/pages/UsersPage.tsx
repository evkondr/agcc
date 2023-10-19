import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import UsersTable from '../users/UsersTable';
import { getUsersByLocation } from '../../redux/features/userSlice';
import { fetchAllUsers } from '../../redux/features/thunks/userThunks';

const UsersPage = () => {
  const [searchParams] = useSearchParams();
  const { foundUsers } = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();
  const location = searchParams.get('location');
  useEffect(() => {
    dispatch(fetchAllUsers());
    dispatch(getUsersByLocation(location as string));
  }, [location, dispatch]);
  return (
    <UsersTable users={foundUsers} />
  );
};

export default UsersPage;
