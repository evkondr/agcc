/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
export interface User{
  id?:string,
  name:string,
  secondName:string,
  surname:string,
  email:string,
  city:string;
  fullName: string;
  // eslint-disable-next-line no-use-before-define
  assets: assetModel[] | []
}
export interface History{
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
export interface assetModel{
  id?:string,
  type:string,
  model:string,
  serialNumber:string,
  owner:User | null
  history:History[] | null
  status:assetStatus,
  city:string
}
export const users: User[] = [
  {
    id: '1', name: 'Иван', secondName: 'Иванович', surname: 'Иванов', email: 'user@mail.ru', city: 'Москва', fullName: 'Иван Иван Иванович', assets: [],
  },
  {
    id: '2', name: 'Пётр', secondName: 'Петрович', surname: 'Петров', email: 'user@mail.ru', city: 'Москва', fullName: 'Петров Пётр Петрович', assets: [],
  },
];

export const assets: assetModel[] = [
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
    id: '2', type: 'Ноутбук', model: 'Lenovo ThinkPad x280', serialNumber: 'VNA3031A503', owner: null, history: null, status: assetStatus.notAssigned, city: 'Москва',
  },
  {
    id: '3', type: 'Ноутбук', model: 'Lenovo ThinkPad x280', serialNumber: 'VNA3031A503', owner: null, history: null, status: assetStatus.notAssigned, city: 'Москва',
  },
  {
    id: '4', type: 'Ноутбук', model: 'Lenovo ThinkPad x280', serialNumber: 'VNA3031A503', owner: null, history: null, status: assetStatus.notAssigned, city: 'Москва',
  },
  {
    id: '5', type: 'Ноутбук', model: 'Lenovo ThinkPad x280', serialNumber: 'VNA3031A503', owner: null, history: null, status: assetStatus.notAssigned, city: 'Москва',
  },
];
