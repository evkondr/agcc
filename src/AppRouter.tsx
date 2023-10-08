import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import AssetsPage from './components/pages/AssetsPage';
import UsersPage from './components/pages/UsersPage';
import AddUserPage from './components/pages/AddUserPage';
import LoginPage from './components/pages/LoginPage';
import SingleUserPage from './components/pages/SingleUserPage';
import SingleAssetPage from './components/pages/SingleAssetPage';
import AddAssetPage from './components/pages/AddAssetPage';

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
        element: <SingleAssetPage />,
      },
      {
        path: 'assets/add',
        element: <AddAssetPage />,
      },
      {
        path: 'users/',
        element: <UsersPage />,
      },
      {
        path: 'users/:userID',
        element: <SingleUserPage />,
      },
      {
        path: 'users/add',
        element: <AddUserPage />,
      },
    ],
  },
  {
    path: 'authorization',
    element: <LoginPage />,
  },
]);
export default AppRouter;
