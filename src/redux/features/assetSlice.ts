/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from '@reduxjs/toolkit';
import {
  addNewAsset,
  deleteAsset,
  fetchAllAssets,
  fetchAssetById,
  fetchAssetsByLocation,
  fetchCurrentAssetOwner,
  fetchModelTypes,
  searchAssets,
  updateAsset,
} from './thunks/assetThunks';

import { IAssetModel, IModelType, IUser } from '../../types';

interface assetsState {
  assets: IAssetModel[],
  currentAsset: IAssetModel | undefined,
  currentOwner: IUser | null,
  loading: boolean,
  error: null | string,
  modelTypes:IModelType[]
}

const initialState: assetsState = {
  assets: [],
  currentAsset: undefined,
  loading: false,
  error: null,
  currentOwner: null,
  modelTypes: [],
};
export const assetsSlice = createSlice({
  name: 'assets',
  initialState,
  reducers: {
    resetCurrentAsset: (state) => {
      state.currentAsset = undefined;
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
    // Update asset
    builder.addCase(updateAsset.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateAsset.fulfilled, (state, action) => {
      state.currentAsset = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(updateAsset.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    // Fetch current owner
    builder.addCase(fetchCurrentAssetOwner.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCurrentAssetOwner.fulfilled, (state, aciton) => {
      state.loading = false;
      state.currentOwner = aciton.payload;
    });
    builder.addCase(fetchCurrentAssetOwner.rejected, (state, aciton) => {
      state.loading = false;
      state.error = aciton.payload as string;
    });
    // Fetch assets by location
    builder.addCase(fetchAssetsByLocation.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAssetsByLocation.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.assets = payload;
    });
    builder.addCase(fetchAssetsByLocation.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload as string;
    });
    // FETCH MODEL TYPES
    builder.addCase(fetchModelTypes.fulfilled, (state, { payload }) => {
      state.modelTypes = payload;
    });
    builder.addCase(fetchModelTypes.rejected, (state, { payload }) => {
      state.error = payload as string;
    });
    // FETCH MODEL TYPES
    builder.addCase(searchAssets.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(searchAssets.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.assets = payload;
    });
  },
});

export const { resetCurrentAsset } = assetsSlice.actions;

export default assetsSlice.reducer;
