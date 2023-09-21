/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
// import type { PayloadAction } from '@reduxjs/toolkit';

import { ICity, cities } from '../../db';

interface citiesState {
  cities: ICity[]
}

const initialState: citiesState = {
  cities,
};
export const citySlice = createSlice({
  name: 'cities',
  initialState,
  reducers: {
  },
});

export default citySlice.reducer;
