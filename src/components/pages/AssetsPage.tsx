import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import AssetsTable from '../assets/AssetsTable';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchAllAssets, fetchAssetsByLocation, searchAssets } from '../../redux/features/thunks/assetThunks';
import SearchForm from '../SearchForm';
import Loader from '../Loader';

const AssetsPage = () => {
  const [searchParams] = useSearchParams();
  const location = searchParams.get('city');
  const { assets, loading, error } = useAppSelector((state) => state.assets);
  const dispatch = useAppDispatch();
  const searchHandler = (value:string) => {
    dispatch(searchAssets({ q: value }));
  };
  useEffect(() => {
    if (location) {
      dispatch(fetchAssetsByLocation(location));
    } else {
      dispatch(fetchAllAssets());
    }
  }, [dispatch, location]);
  if (loading) {
    return (
      <Loader size={70} />
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
    <>
      <SearchForm searchHandler={searchHandler} />
      <AssetsTable assets={assets} />
    </>
  );
};

export default AssetsPage;
