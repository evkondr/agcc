import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import './index.css';
import App from './App';
import AssetsTable from './components/AssetsTable';
import { assets } from './db';
import AssetCard from './components/AssetCard';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <AssetsTable assets={assets} />,
      },
      {
        path: 'assets/:id',
        element: <AssetCard />,
      },
    ],
  },
]);
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(<RouterProvider router={router} />);
