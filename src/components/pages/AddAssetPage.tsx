import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import AssetForm from '../assets/AssetForm';
import fetchAllCities from '../../redux/features/thunks/cityThunks';

const AddAssetPage = () => {
  const { loggedUser } = useAppSelector((state) => state.auth);
  const { cities } = useAppSelector((state) => state.cities);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchAllCities());
  }, [dispatch]);
  return (
    <AssetForm cities={cities} loggedUser={loggedUser} />
  );
};
export default AddAssetPage;
