import { IAssetModel } from '../types';

const filterUserAssets = (assets:IAssetModel[], assetID:string):IAssetModel[] => {
  const filtered = assets.filter((asset) => asset.id !== assetID);
  return filtered;
};
export default filterUserAssets;
