/* eslint-disable consistent-return */
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import UserForm from '../users/UserForm';
import { fetchUserById } from '../../redux/features/thunks/userThunks';
import AssetsTable from '../assets/AssetsTable';

const SingleUserPage = () => {
  const { userID } = useParams();
  const { currentUser, loading, error } = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchUserById(userID as string));
  }, [dispatch, userID]);
  if (loading) {
    return (
      <div>
        Загрузка...
      </div>
    );
  }
  if (error) {
    return (
      <div>
        {error}
      </div>
    );
  }
  return (
    <div>
      <UserForm user={currentUser} />
      {currentUser && currentUser.assets.length > 0 && <AssetsTable assets={currentUser.assets} />}
    </div>
  );
};

export default SingleUserPage;
