/* eslint-disable consistent-return */
import React, { useLayoutEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { getCurrentAsset, resetCurrentAsset } from '../../redux/features/assetSlice';
import AssetFrom from '../assets/AssetForm';

const SingleAssetPage = () => {
  const { id } = useParams();
  const { currentAsset } = useAppSelector((state) => state.assets);
  const { loggedUser } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  useLayoutEffect(() => {
    if (id) {
      dispatch(getCurrentAsset(id));
      return () => {
        dispatch(resetCurrentAsset());
      };
    }
  }, [dispatch, id]);
  return (
    <AssetFrom currentAsset={currentAsset} loggedUser={loggedUser} />
  );
};

export default SingleAssetPage;
