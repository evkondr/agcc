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
    getAllAssets: (state) => {
      state.assets = state.assets.map((item) => item);
    },
    getCurrentAsset: (state, action: PayloadAction<string>):any => {
      state.currentAsset = state.assets.find((el) => el.id === action.payload);
    },
    resetCurrentAsset: (state) => {
      state.currentAsset = undefined;
    },
    addNewAsset: (state, aciton: PayloadAction<IAssetModel>) => {
      state.assets.push(aciton.payload);
    },
    updateCurrentAsset: (state, action: PayloadAction<{assetID:string, asset:IAssetModel}>) => {
      const { assetID, asset } = action.payload;
      state.assets = state.assets.map((item) => {
        if (item.id === assetID) {
          return { ...asset, id: item.id };
        }
        return item;
      });
    },
  },
});

export const {
  getCurrentAsset, resetCurrentAsset, addNewAsset, updateCurrentAsset, getAllAssets,
} = assetsSlice.actions;

export default assetsSlice.reducer;
