/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
// import type { PayloadAction } from '@reduxjs/toolkit';

import { User, users } from '../../db';

interface usersState {
  users: User[]
  foundUsers: User[] | []
}

const initialState: usersState = {
  users,
  foundUsers: [],
};
export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    getAllUsers: (state) => state,
    findUserBySurname: (state, action: PayloadAction<string>) => {
      state.foundUsers = state.users.filter((user) => user.surname === action.payload);
    },
    getUsersByLocation: (state, action: PayloadAction<string>) => {
      state.foundUsers = state.users.filter((user) => user.city === action.payload);
    },
  },
});

export const { getAllUsers, findUserBySurname, getUsersByLocation } = usersSlice.actions;

export default usersSlice.reducer;
