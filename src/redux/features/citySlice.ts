/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
// import type { PayloadAction } from '@reduxjs/toolkit';

import { City, cities } from '../../db';

interface citiesState {
  cities: City[]
}

const initialState: citiesState = {
  cities,
};
export const citySlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
  },
});

export default citySlice.reducer;
