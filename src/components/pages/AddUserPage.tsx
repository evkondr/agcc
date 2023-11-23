import React, { useEffect } from 'react';
import UserForm from '../users/UserForm';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import fetchAllCities from '../../redux/features/thunks/cityThunks';

const AddUserPage = () => {
  const dispatch = useAppDispatch();
  const { cities } = useAppSelector((state) => state.cities);
  useEffect(() => {
    dispatch(fetchAllCities());
  }, [dispatch]);
  return (
    <UserForm cities={cities} />
  );
};

export default AddUserPage;
