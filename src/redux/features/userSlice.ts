/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import {
  addNewUser,
  fetchAllUsers,
  fetchUserById,
  fetchUsersByLocation,
  findUsersByFullName,
  putAssetToUser,
  updateCurrentUser,
} from './thunks/userThunks';

import { IUser } from '../../types';

interface usersState {
  users: IUser[]
  currentUser: IUser | undefined
  foundUsers: IUser[] | []
  loading: boolean
  error: string | null
}

const initialState: usersState = {
  users: [],
  foundUsers: [],
  currentUser: undefined,
  loading: false,
  error: null,
};
export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetching all users
    builder.addCase(fetchAllUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAllUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
      state.error = null;
    });
    builder.addCase(fetchAllUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    // Fetching user by id
    builder.addCase(fetchUserById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUserById.fulfilled, (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
      state.error = null;
    });
    builder.addCase(fetchUserById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    // Find users by full name
    builder.addCase(findUsersByFullName.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(findUsersByFullName.fulfilled, (state, action) => {
      state.loading = false;
      state.foundUsers = action.payload;
    });
    builder.addCase(findUsersByFullName.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    // put Asset to user
    builder.addCase(putAssetToUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(putAssetToUser.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(putAssetToUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    // FETCH USERS BY LOCATION
    builder.addCase(fetchUsersByLocation.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUsersByLocation.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.users = payload;
    });
    builder.addCase(fetchUsersByLocation.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload as string;
    });
    // ADD NEW USER
    builder.addCase(addNewUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addNewUser.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.users.push(payload);
    });
    builder.addCase(addNewUser.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload as string;
    });
    // UPDATE CURRENT USER
    builder.addCase(updateCurrentUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateCurrentUser.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.currentUser = payload;
    });
    builder.addCase(updateCurrentUser.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload as string;
    });
  },
});

export default usersSlice.reducer;
