/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { assetModel, assets } from '../../db';

interface assetsState {
  assets: assetModel[],
  currentAsset: assetModel | undefined
}

const initialState: assetsState = {
  assets,
  currentAsset: undefined,
};
export const assetsSlice = createSlice({
  name: 'assets',
  initialState,
  reducers: {
    getCurrentAsset: (state, action: PayloadAction<number>):any => {
      state.currentAsset = state.assets.find((el) => el.id === action.payload);
    },
    resetCurrentAsset: (state) => {
      state.currentAsset = undefined;
    },
  },
});

export const { getCurrentAsset, resetCurrentAsset } = assetsSlice.actions;

export default assetsSlice.reducer;
