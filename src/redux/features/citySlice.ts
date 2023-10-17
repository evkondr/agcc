/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
// import type { PayloadAction } from '@reduxjs/toolkit';

import { ICity } from '../../types';

interface citiesState {
  cities: ICity[]
}

const initialState: citiesState = {
  cities: [],
};
export const citySlice = createSlice({
  name: 'cities',
  initialState,
  reducers: {
  },
});

export default citySlice.reducer;
