import { createAsyncThunk } from '@reduxjs/toolkit';
import { ICity } from '../types';

const fetchAllCities = createAsyncThunk('cities/fetchAllCities', async (_, thunkApi) => {
  console.log('fetch');
  try {
    const response = await fetch('/cities');
    console.log(await response.json());
    return (await response.json()) as ICity;
  } catch (error) {
    return thunkApi.rejectWithValue('Ошибка');
  }
});
export default fetchAllCities;
