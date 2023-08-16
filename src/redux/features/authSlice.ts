/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import getUserFromStorage from '../getUserFromStorage';

interface authState {
  token: string | null,
  demoToken: string | null,
}

const initialState: authState = {
  token: null,
  demoToken: getUserFromStorage('demoToken'),
};
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setDemoToken: () => {
      localStorage.setItem('demoToken', 'demo123');
    },
  },
});
export const { setDemoToken } = authSlice.actions;
export default authSlice.reducer;
