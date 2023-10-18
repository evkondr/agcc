import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { IAssetModel, ICity } from '../types';

export const fetchAllCities = createAsyncThunk<ICity, undefined, {rejectValue: string}>('cities/fetchAllCities', async (_, thunkApi) => {
  try {
    const response = await axios('/cities');
    return response.data;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      return thunkApi.rejectWithValue(e.message);
    }
    return thunkApi.rejectWithValue('Ошибка запроса');
  }
});
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
