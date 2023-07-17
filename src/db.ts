/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
export interface User{
  id:number,
  name:string,
  secondName:string,
  suranme:string,
  email:string,
  city:string
}
export interface History{
  id:number,
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
  id:number,
  type:string,
  model:string,
  serialNumber:string,
  owner:User | null
  history:History[] | null
  status:assetStatus
}
export const users: User[] = [
  {
    id: 1, name: 'Иван', secondName: 'Иванович', suranme: 'Иванов', email: 'user@mail.ru', city: 'Москва',
  },
  {
    id: 2, name: 'Пётр', secondName: 'Петрович', suranme: 'Петров', email: 'user@mail.ru', city: 'Москва',
  },
];

export const assets: assetModel[] = [
  {
    id: 1,
    type: 'Монитор',
    model: 'Lenovo ThinkCenter TI24-10',
    serialNumber: 'VNA3031A503',
    owner: null,
    history: [{
      id: 1,
      prevOwner: 'Иванов Иван Иванович',
      date: '21.11.2022',
      comments: 'Не включается',
      lastModified: 'Кондратьев Евгений Александрович',
    }],
    status: assetStatus.notAssigned,
  },
  {
    id: 2, type: 'Ноутбук', model: 'Lenovo ThinkPad x280', serialNumber: 'VNA3031A503', owner: null, history: null, status: assetStatus.notAssigned,
  },
  {
    id: 3, type: 'Ноутбук', model: 'Lenovo ThinkPad x280', serialNumber: 'VNA3031A503', owner: null, history: null, status: assetStatus.notAssigned,
  },
  {
    id: 4, type: 'Ноутбук', model: 'Lenovo ThinkPad x280', serialNumber: 'VNA3031A503', owner: null, history: null, status: assetStatus.notAssigned,
  },
  {
    id: 5, type: 'Ноутбук', model: 'Lenovo ThinkPad x280', serialNumber: 'VNA3031A503', owner: null, history: null, status: assetStatus.notAssigned,
  },
];
