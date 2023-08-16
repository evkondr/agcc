/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

interface authState {
  token: string | null,
  demoToken: string | null,
}

const initialState: authState = {
  token: null,
  demoToken: null,
};
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    getDemoToken: (state) => {
      const token = localStorage.getItem('demoToken');
      state.demoToken = token;
    },
    setDemoToken: (state) => {
      state.demoToken = 'demo12345';
    },
  },
});
export const { getDemoToken, setDemoToken } = authSlice.actions;
export default authSlice.reducer;
