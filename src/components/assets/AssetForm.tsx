/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';

import {
  Button,
  Form,
  Input,
  Select,
} from 'antd';

import { v4 as uuidv4 } from 'uuid';
import HistoryTable from './HistoryTable';
import { IAssetModel, ICity, assetStatus } from '../../types';
import { updateCurrentAsset } from '../../redux/features/assetSlice';
import { addNewAsset } from '../../redux/features/thunks/assetThunks';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import fetchAllCities from '../../redux/features/thunks/cityThunks';

const { Option } = Select;
interface IAssetFormProps {
  currentAsset?:IAssetModel;
  loggedUser: string | null;
}
const AssetCard = ({ currentAsset, loggedUser }: IAssetFormProps) => {
  const [disabled, setDisabled] = useState<boolean>(false);
  const { cities } = useAppSelector((state) => state.cities);
  const citiesOptions = cities.map((item:ICity) => ({ value: item.name, label: item.name }));
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const onFinish = (values:IAssetModel) => {
    if (currentAsset) {
      // If asset provided, then it may be updated
      let prevOwner:string;
      if (currentAsset.history.length > 0) {
        prevOwner = values.owner?.fullName as string;
      } else {
        prevOwner = 'склад';
      }
      const assetUpdates:IAssetModel = {
        ...values,
        history: [...currentAsset.history, {
          prevOwner, date: new Date().toLocaleDateString(), comments: 'asdasdsd', lastModified: loggedUser as string,
        }],
      };
      dispatch(updateCurrentAsset({ assetID: currentAsset.id as string, asset: assetUpdates }));
      setDisabled(true);
    } else {
      // Else it may be created
      form.resetFields();
      const newAsset:IAssetModel = {
        ...values,
        id: uuidv4(),
        status: assetStatus.notAssigned,
        history: [{
          id: uuidv4(),
          prevOwner: '',
          comments: 'Создал',
          date: new Date().toLocaleString(),
          lastModified: loggedUser as string,
        }],
      };
      dispatch(addNewAsset(newAsset));
    }
  };
  useEffect(() => {
    if (currentAsset) {
      setDisabled(true);
    }
    dispatch(fetchAllCities());
  }, [currentAsset, dispatch]);
  console.log(cities);
  return (
    <>
      <Form
        layout="vertical"
        style={{ maxWidth: '350px' }}
        initialValues={currentAsset || {}}
        disabled={disabled}
        onFinish={onFinish}
        form={form}
      >
        <Form.Item label="Модель" name="model">
          <Input />
        </Form.Item>
        <Form.Item label="Тип" name="type">
          <Input />
        </Form.Item>
        <Form.Item label="Серийный номер" name="serialNumber">
          <Input />
        </Form.Item>
        <Form.Item label="Город" name="city">
          <Select placeholder="Выбрать город" options={citiesOptions} />
        </Form.Item>
        <Form.Item label="Расположение" name="owner">
          <Input />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" style={{ marginRight: '10px' }}>{currentAsset ? 'Обновить' : 'Создать'}</Button>
          {currentAsset && (
          <Button
            htmlType="button"
            onClick={() => setDisabled(!disabled)}
            disabled={false}
          >
            {disabled ? 'Редактировать' : 'Отменить'}
          </Button>
          )}
        </Form.Item>
      </Form>
      {/* <Row>
        {currentAsset.history && currentAsset.history.length > 0
          && (
          <div style={{ width: '90%' }}>
            <h5 style={{ fontSize: '25px' }}>История</h5>
            <HistoryTable history={currentAsset.history} />
          </div>
          )}
      </Row> */}
    </>
  );
};

export default AssetCard;
