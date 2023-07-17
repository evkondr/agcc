import { createSlice } from '@reduxjs/toolkit';
// import type { PayloadAction } from '@reduxjs/toolkit';

import { User, users } from '../../db';

interface usersState {
  users: User[]
}

const initialState: usersState = {
  users,
};
export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    getAllUsers: (state) => state,
  },
});

export const { getAllUsers } = usersSlice.actions;

export default usersSlice.reducer;
