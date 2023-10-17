/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
export interface IUser{
  id?:string,
  name:string,
  secondName:string,
  surname:string,
  email:string,
  city:string;
  fullName: string;
  // eslint-disable-next-line no-use-before-define
  assets: IAssetModel[] | []
}
export interface IHistory{
  id?:string,
  prevOwner: string;
  date:string,
  comments:string,
  lastModified:string
}
export enum assetStatus{
  notConfirmed = 'Не подтверждено',
  confirmed = 'Подтверждено',
  notAssigned = 'Не назначено'
}
export interface IAssetModel{
  id?:string,
  type:string,
  model:string,
  serialNumber:string,
  owner: IUser | null
  history: IHistory[],
  status:assetStatus,
  city:string
}
export interface ICity{
  id:string,
  name:string,
}
