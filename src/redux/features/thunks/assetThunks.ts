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
export const addNewAsset = createAsyncThunk<IAssetModel, IAssetModel, {rejectValue: string}>('asset/addNewAsset', async (asset, thunkApi) => {
  try {
    const response = await axios.post('/assets', asset);
    return response.data;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      return thunkApi.rejectWithValue(e.message);
    }
    return thunkApi.rejectWithValue('Ошибка запроса');
  }
});
export const deleteAsset = createAsyncThunk<IAssetModel, string, {rejectValue: string}>('asset/deleteAsset', async (assetId, thunkApi) => {
  try {
    const response = await axios.delete(`/assets/${assetId}`);
    return response.data;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      return thunkApi.rejectWithValue(e.message);
    }
    return thunkApi.rejectWithValue('Ошибка запроса');
  }
});
