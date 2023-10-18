/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { fetchAllAssets } from '../thunks';

import { IAssetModel } from '../../types';

interface assetsState {
  assets: IAssetModel[],
  currentAsset: IAssetModel | undefined
  loading: boolean
  error: null | string
}

const initialState: assetsState = {
  assets: [],
  currentAsset: undefined,
  loading: false,
  error: null,
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
  extraReducers: (buider) => {
    buider.addCase(fetchAllAssets.pending, (state) => {
      state.loading = true;
    });
    buider.addCase(fetchAllAssets.fulfilled, (state, aciton) => {
      state.loading = false;
      state.assets = aciton.payload;
      state.error = null;
    });
    buider.addCase(fetchAllAssets.rejected, (state, aciton) => {
      state.loading = false;
      state.error = aciton.payload as string;
    });
  },
});

export const {
  getCurrentAsset, resetCurrentAsset, addNewAsset, updateCurrentAsset,
} = assetsSlice.actions;

export default assetsSlice.reducer;
