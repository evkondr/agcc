/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import {
  addNewAsset, deleteAsset, fetchAllAssets, fetchAssetById,
} from './thunks/assetThunks';

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
    resetCurrentAsset: (state) => {
      state.currentAsset = undefined;
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
  extraReducers: (builder) => {
    // Fetch all assets
    builder.addCase(fetchAllAssets.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAllAssets.fulfilled, (state, aciton) => {
      state.loading = false;
      state.assets = aciton.payload;
      state.error = null;
    });
    builder.addCase(fetchAllAssets.rejected, (state, aciton) => {
      state.loading = false;
      state.error = aciton.payload as string;
    });
    // Fetch assets by id
    builder.addCase(fetchAssetById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAssetById.fulfilled, (state, action) => {
      state.loading = false;
      state.currentAsset = action.payload;
      state.error = null;
    });
    builder.addCase(fetchAssetById.rejected, (state, aciton) => {
      state.loading = false;
      state.error = aciton.payload as string;
    });
    // Post new asset
    builder.addCase(addNewAsset.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addNewAsset.fulfilled, (state, aciton) => {
      state.loading = false;
      state.assets.push(aciton.payload);
      state.error = null;
    });
    builder.addCase(addNewAsset.rejected, (state, aciton) => {
      state.loading = false;
      state.error = aciton.payload as string;
    });
    // Delete asset
    builder.addCase(deleteAsset.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteAsset.fulfilled, (state) => {
      state.loading = false;
      state.error = null;
    });
    builder.addCase(deleteAsset.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { resetCurrentAsset, updateCurrentAsset } = assetsSlice.actions;

export default assetsSlice.reducer;
