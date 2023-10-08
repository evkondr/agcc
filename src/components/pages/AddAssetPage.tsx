import React from 'react';
import { useAppSelector } from '../../redux/hooks';
import AssetForm from '../assets/AssetForm';

const AddAssetPage = () => {
  const { loggedUser } = useAppSelector((state) => state.auth);
  return (
    <AssetForm loggedUser={loggedUser} />
  );
};
export default AddAssetPage;
