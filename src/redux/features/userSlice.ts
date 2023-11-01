/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  fetchAllUsers,
  fetchUserById,
  findUsersByFullName,
  putAssetToUser,
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
  reducers: {
    findUserBySurname: (state, action: PayloadAction<string>) => {
      state.foundUsers = state.users.filter((user) => user.surname === action.payload);
    },
    getUsersByLocation: (state, action: PayloadAction<string>) => {
      state.foundUsers = state.users.filter((user) => user.city === action.payload);
    },
    addNewUser: (state, action: PayloadAction<IUser>) => {
      state.users.push(action.payload);
    },
    getUserById: (state, action: PayloadAction<string>) => {
      state.currentUser = state.users.find((user) => user.id === action.payload);
    },
    updateCurrentUser: (state, action: PayloadAction<{id:string, userData: IUser}>) => {
      const { id, userData } = action.payload;
      const newUsersState = state.users.map((user) => {
        if (user.id === action.payload.id) {
          user = { id, ...userData };
          return user;
        }
        return user;
      });
      state.users = newUsersState;
    },
    clearCurrentUser: (state) => {
      state.currentUser = undefined;
    },
  },
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
  },
});

export const {
  findUserBySurname,
  getUsersByLocation, addNewUser, getUserById, clearCurrentUser, updateCurrentUser,
} = usersSlice.actions;

export default usersSlice.reducer;
