/* eslint-disable consistent-return */
import React, { useEffect } from 'react';
import { Divider } from 'antd';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import UserForm from '../users/UserForm';
import { fetchUserById } from '../../redux/features/thunks/userThunks';
import ShortAssetsTable from '../assets/ShortAssetsTable';
import fetchAllCities from '../../redux/features/thunks/cityThunks';
import Loader from '../Loader';

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
      <Loader />
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
      && currentUser.assets.length > 0 && (
      <>
        <div>
          <Divider orientation="left" orientationMargin="0">Оборудование на пользователе</Divider>
          <p>
            Подтверждение оборудования:
            {' '}
            <span style={{ color: currentUser.approvement ? 'green' : 'red' }}>{currentUser.approvement ? 'Подтверждено пользователеи' : 'Не подтверждено'}</span>
          </p>
        </div>
        <ShortAssetsTable assets={currentUser.assets} />
      </>
      )}
    </div>
  );
};

export default SingleUserPage;
