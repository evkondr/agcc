import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import AssetsPage from './components/pages/AssetsPage';
import AssetCard from './components/AssetCard';
import NewAssetPage from './components/pages/NewAssetPage';

const AppRouter = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <AssetsPage />,
      },
      {
        path: 'assets/:id',
        element: <AssetCard />,
      },
      {
        path: 'assets/add',
        element: <NewAssetPage />,
      },
    ],
  },
]);
export default AppRouter;
