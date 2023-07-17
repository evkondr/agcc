import { createSlice } from '@reduxjs/toolkit';
// import type { PayloadAction } from '@reduxjs/toolkit';

import { assetModel, assets } from '../../db';

interface assetsState {
  assets: assetModel[]
}

const initialState: assetsState = {
  assets,
};
export const assetsSlice = createSlice({
  name: 'assets',
  initialState,
  reducers: {
    getAllAssets: (state) => state,
  },
});

export const { getAllAssets } = assetsSlice.actions;

export default assetsSlice.reducer;
