/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

interface authState {
  token: string | null
}

const initialState: authState = {
  token: null,
};
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    getToken: (state) => {
      const token = sessionStorage.getItem('token');
      state.token = token;
    },
  },
});
export default authSlice.reducer;
