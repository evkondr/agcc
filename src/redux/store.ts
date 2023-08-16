import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userSlice';
import assetReducer from './features/assetSlice';
import authReducer from './features/authSlice';

export const store = configureStore({
  reducer: {
    users: userReducer,
    asset: assetReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch;
