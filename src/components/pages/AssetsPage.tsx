import React, { useEffect } from 'react';
import AssetsTable from '../assets/AssetsTable';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

const AssetsPage = () => {
  const { assets } = useAppSelector((state) => state.assets);
  const dispatch = useAppDispatch();
  useEffect(() => {
    //
  }, [dispatch]);
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
