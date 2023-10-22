import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ICity } from '../../../types';

const fetchAllCities = createAsyncThunk<ICity[], undefined, {rejectValue: string}>('cities/fetchAllCities', async (_, thunkApi) => {
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
export default fetchAllCities;
