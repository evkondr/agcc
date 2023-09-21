/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { IAssetModel, assets } from '../../db';

interface assetsState {
  assets: IAssetModel[],
  currentAsset: IAssetModel | undefined
}

const initialState: assetsState = {
  assets,
  currentAsset: undefined,
};
export const assetsSlice = createSlice({
  name: 'assets',
  initialState,
  reducers: {
    getCurrentAsset: (state, action: PayloadAction<string>):any => {
      state.currentAsset = state.assets.find((el) => el.id === action.payload);
    },
    resetCurrentAsset: (state) => {
      state.currentAsset = undefined;
    },
    addNewAsset: (state, aciton: PayloadAction<IAssetModel>) => {
      state.assets.push(aciton.payload);
    },
  },
});

export const { getCurrentAsset, resetCurrentAsset, addNewAsset } = assetsSlice.actions;

export default assetsSlice.reducer;
