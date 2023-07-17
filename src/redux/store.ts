import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userSlice';
import assetReducer from './features/assetSlice';

export const store = configureStore({
  reducer: {
    users: userReducer,
    asset: assetReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch;
