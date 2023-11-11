import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { IUser, IAssetModelShort } from '../../../types';

export const fetchAllUsers = createAsyncThunk<IUser[], undefined, {rejectValue:string}>('users/fetchAllUsers', async (_, thunkApi) => {
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
export const fetchUserById = createAsyncThunk<IUser, string, {rejectValue:string}>('users/fetchUserById', async (userId, thunkApi) => {
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
export const findUsersByFullName = createAsyncThunk<IUser[], string, {rejectValue:string}>('users/findUsersByFullName', async (fullName, thunkApi) => {
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
export const fetchUsersByLocation = createAsyncThunk<IUser[], string, {rejectValue:string}>('users/fetchUsersByLocation', async (location, thunkApi) => {
  try {
    const response = await axios(`/users?city=${location}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return thunkApi.rejectWithValue(error.message);
    }
    return thunkApi.rejectWithValue('Что-то пошло не так');
  }
});
export const putAssetToUser = createAsyncThunk<void, {userId: string, assets: IAssetModelShort[]}, {rejectValue:string}>('user/putAssetToUser', async ({ userId, assets }, thunkApi) => {
  try {
    const response = await axios.patch(`/users/${userId}`, { assets });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return thunkApi.rejectWithValue(error.message);
    }
    return thunkApi.rejectWithValue('Что-то пошло не так');
  }
});
