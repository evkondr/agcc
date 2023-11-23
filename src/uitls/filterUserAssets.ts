import { IAssetModelShort } from '../types';

const filterUserAssets = (assets:IAssetModelShort[], assetID:string):IAssetModelShort[] => {
  const filtered = assets.filter((asset) => asset.id !== assetID);
  return filtered;
};
export default filterUserAssets;
