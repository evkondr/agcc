import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import AssetsTable from '../assets/AssetsTable';

const AssetsPage = () => {
  const { assets } = useSelector((state: RootState) => state.asset);
  return (
    <AssetsTable assets={assets} />
  );
};

export default AssetsPage;
