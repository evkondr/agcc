/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
// import type { PayloadAction } from '@reduxjs/toolkit';
import fetchAllCities from '../thuks';

import { ICity } from '../../types';

interface citiesState {
  cities: ICity[]
  error: null | string
}

const initialState: citiesState = {
  cities: [],
  error: null,
};
export const citySlice = createSlice({
  name: 'cities',
  initialState,
  reducers: {},
  extraReducers: (buider) => {
    buider.addCase(fetchAllCities.fulfilled, (state, action) => {
      state.cities.push(action.payload);
    });
    buider.addCase(fetchAllCities.rejected, (state, action) => {
      state.error = action.payload as string;
    });
  },
});

export default citySlice.reducer;
