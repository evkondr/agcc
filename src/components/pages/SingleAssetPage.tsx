/* eslint-disable consistent-return */
import React, { useLayoutEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import AssetFrom from '../assets/AssetForm';
import { fetchAssetById } from '../../redux/features/thunks/assetThunks';

const SingleAssetPage = () => {
  const { id } = useParams();
  const { currentAsset, loading, error } = useAppSelector((state) => state.assets);
  const { loggedUser } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  useLayoutEffect(() => {
    dispatch(fetchAssetById(id as string));
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
    <AssetFrom currentAsset={currentAsset} loggedUser={loggedUser} />
  );
};

export default SingleAssetPage;
