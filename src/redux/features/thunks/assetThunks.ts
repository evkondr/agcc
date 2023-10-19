import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { IAssetModel } from '../../../types';

export const fetchAllAssets = createAsyncThunk<IAssetModel[], undefined, {rejectValue: string}>('assets/fetchAllAssets', async (_, thunkApi) => {
  try {
    const response = await axios('/assets');
    return response.data;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      return thunkApi.rejectWithValue(e.message);
    }
    return thunkApi.rejectWithValue('Ошибка запроса');
  }
});
export const fetchAssetById = createAsyncThunk<IAssetModel, string, {rejectValue: string}>('asset/fetchAssetById', async (userId, thunkApi) => {
  try {
    const response = await axios(`/assets/${userId}`);
    return response.data;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      return thunkApi.rejectWithValue(e.message);
    }
    return thunkApi.rejectWithValue('Ошибка запроса');
  }
});