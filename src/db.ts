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
export const users: IUser[] = [
  {
    id: '1', name: 'Иван', secondName: 'Иванович', surname: 'Иванов', email: 'user@mail.ru', city: 'Москва', fullName: 'Иван Иван Иванович', assets: [],
  },
  {
    id: '2', name: 'Пётр', secondName: 'Петрович', surname: 'Петров', email: 'user@mail.ru', city: 'Москва', fullName: 'Петров Пётр Петрович', assets: [],
  },
  {
    id: '3', name: 'Сергей', secondName: 'Сергеевич', surname: 'Сидоров', email: 'user@mail.ru', city: 'Свободный', fullName: 'Петров Пётр Петрович', assets: [],
  },
];

export const assets: IAssetModel[] = [
  {
    id: '1',
    type: 'Монитор',
    model: 'Lenovo ThinkCenter TI24-10',
    serialNumber: 'VNA3031A503',
    owner: null,
    history: [{
      id: '1',
      prevOwner: 'Иванов Иван Иванович',
      date: '21.11.2022',
      comments: 'Не включается',
      lastModified: 'Кондратьев Евгений Александрович',
    }],
    status: assetStatus.notAssigned,
    city: 'Москва',
  },
  {
    id: '2', type: 'Ноутбук', model: 'Lenovo ThinkPad x280', serialNumber: 'VNA3031A506673', owner: null, history: [], status: assetStatus.notAssigned, city: 'Москва',
  },
  {
    id: '3', type: 'Ноутбук', model: 'Lenovo ThinkPad x280', serialNumber: 'VNA3031A5012323', owner: null, history: [], status: assetStatus.notAssigned, city: 'Москва',
  },
  {
    id: '4', type: 'Ноутбук', model: 'Lenovo ThinkPad x280', serialNumber: 'VNA3031A22334', owner: null, history: [], status: assetStatus.notAssigned, city: 'Москва',
  },
  {
    id: '5', type: 'Ноутбук', model: 'Lenovo ThinkPad x280', serialNumber: 'VNA30311231', owner: null, history: [], status: assetStatus.notAssigned, city: 'Москва',
  },
];
export const cities: ICity[] = [
  {
    id: '1',
    name: 'Москва',
  },
  {
    id: '2',
    name: 'Свободный',
  },
];
