/* eslint-disable consistent-return */
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import UserForm from '../users/UserForm';
import { fetchUserById } from '../../redux/features/thunks/userThunks';
import ShortAssetsTable from '../assets/ShortAssetsTable';
import fetchAllCities from '../../redux/features/thunks/cityThunks';

const SingleUserPage = () => {
  const { userID } = useParams();
  const { currentUser, loading, error } = useAppSelector((state) => state.users);
  const { cities } = useAppSelector((state) => state.cities);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchUserById(userID as string));
    dispatch(fetchAllCities());
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
      <UserForm user={currentUser} cities={cities} />
      {currentUser
      && currentUser.assets.length > 0 && <ShortAssetsTable assets={currentUser.assets} />}
    </div>
  );
};

export default SingleUserPage;
