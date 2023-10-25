/* eslint-disable consistent-return */
import React, { useLayoutEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import AssetFrom from '../assets/AssetForm';
import { fetchAssetById } from '../../redux/features/thunks/assetThunks';
import fetchAllCities from '../../redux/features/thunks/cityThunks';

const SingleAssetPage = () => {
  const { id } = useParams();
  const { currentAsset, loading, error } = useAppSelector((state) => state.assets);
  const { cities } = useAppSelector((state) => state.cities);
  const { loggedUser } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  useLayoutEffect(() => {
    dispatch(fetchAssetById(id as string));
    dispatch(fetchAllCities());
  }, [dispatch, id]);
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
    <AssetFrom currentAsset={currentAsset} cities={cities} loggedUser={loggedUser} />
  );
};

export default SingleAssetPage;
