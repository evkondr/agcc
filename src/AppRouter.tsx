import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import AssetsPage from './components/pages/AssetsPage';
import AddUserPage from './components/pages/AddUserPage';
import LoginPage from './components/pages/LoginPage';
import SingleUserPage from './components/pages/SingleUserPage';
import SingleAssetPage from './components/pages/SingleAssetPage';
import AddAssetPage from './components/pages/AddAssetPage';
import HomePage from './components/pages/HomePage';
import UsersPage from './components/pages/UsersPage';

const AppRouter = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: 'assets/',
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
