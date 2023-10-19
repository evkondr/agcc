import React, { useEffect } from 'react';
import AssetsTable from '../assets/AssetsTable';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchAllAssets } from '../../redux/features/thunks/assetThunks';

const AssetsPage = () => {
  const { assets, loading, error } = useAppSelector((state) => state.assets);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchAllAssets());
  }, [dispatch]);
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
  if (assets.length < 1) {
    return (
      <div>
        В базе данных еще нет оборудования.
      </div>
    );
  }
  return (
    <AssetsTable assets={assets} />
  );
};

export default AssetsPage;
