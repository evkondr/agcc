import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import UsersTable from '../users/UsersTable';
import { fetchAllUsers, fetchUsersByLocation } from '../../redux/features/thunks/userThunks';
import Loader from '../Loader';

const UsersPage = () => {
  const [searchParams] = useSearchParams();
  const { users, loading } = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();
  const location = searchParams.get('city');
  useEffect(() => {
    if (location) {
      dispatch(fetchUsersByLocation(location as string));
    } else {
      dispatch(fetchAllUsers());
    }
  }, [location, dispatch, searchParams]);
  if (loading) {
    return (
      <Loader />
    );
  }
  return (
    <UsersTable users={users} />
  );
};

export default UsersPage;
