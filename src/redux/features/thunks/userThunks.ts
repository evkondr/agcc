import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { IUser } from '../../../types';

export const fetchAllUsers = createAsyncThunk<IUser[], undefined, {rejectValue:string}>('user/fetchAllUsers', async (_, thunkApi) => {
  try {
    const response = await axios('/users');
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return thunkApi.rejectWithValue(error.message);
    }
    return thunkApi.rejectWithValue('Что-то пошло не так');
  }
});
export const fetchUserById = createAsyncThunk<IUser, string, {rejectValue:string}>('user/fetchUserById', async (userId, thunkApi) => {
  try {
    const response = await axios(`/users/${userId}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return thunkApi.rejectWithValue(error.message);
    }
    return thunkApi.rejectWithValue('Что-то пошло не так');
  }
});
export const findUsersByFullName = createAsyncThunk<IUser[], string, {rejectValue:string}>('user/findUsersByFullName', async (fullName, thunkApi) => {
  try {
    const response = await axios(`/users?fullName_like=${fullName}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return thunkApi.rejectWithValue(error.message);
    }
    return thunkApi.rejectWithValue('Что-то пошло не так');
  }
});
