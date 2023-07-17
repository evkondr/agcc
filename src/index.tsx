import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import { store } from './redux/store';
import './index.css';
import App from './App';
import AssetCard from './components/AssetCard';
import AssetsPage from './components/pages/AssetsPage';

const router = createBrowserRouter([
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
    ],
  },
]);
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(<Provider store={store}><RouterProvider router={router} /></Provider>);
