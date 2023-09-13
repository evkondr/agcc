/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { User, users } from '../../db';

interface usersState {
  users: User[]
  currentUser: User | undefined,
  foundUsers: User[] | []
}

const initialState: usersState = {
  users,
  foundUsers: [],
  currentUser: undefined,
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
    addNewUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
    },
    getUserById: (state, action: PayloadAction<string>) => {
      state.currentUser = state.users.find((user) => user.id === action.payload);
    },
    clearCurrentUser: (state) => {
      state.currentUser = undefined;
    },
  },
});

export const {
  getAllUsers, findUserBySurname, getUsersByLocation, addNewUser, getUserById, clearCurrentUser,
} = usersSlice.actions;

export default usersSlice.reducer;
