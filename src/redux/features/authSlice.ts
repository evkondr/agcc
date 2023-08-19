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
const demoToken = 'demo123';

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    getDemoToken: (state) => {
      const token = localStorage.getItem('demoToken');
      state.demoToken = token;
    },
    setDemoToken: (state) => {
      localStorage.setItem('demoToken', demoToken);
      state.demoToken = demoToken;
    },
    removeDemoToken: (state) => {
      localStorage.removeItem('demoToken');
      state.demoToken = null;
    },
  },
});
export const { getDemoToken, setDemoToken, removeDemoToken } = authSlice.actions;
export default authSlice.reducer;
