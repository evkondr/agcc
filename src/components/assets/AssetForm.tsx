/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Form,
  Input,
  Select,
  Row,
} from 'antd';

import { v4 as uuidv4 } from 'uuid';
import HistoryTable from './HistoryTable';
import { IAssetModel, ICity, assetStatus } from '../../types';
import { addNewAsset, deleteAsset, updateAsset } from '../../redux/features/thunks/assetThunks';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import fetchAllCities from '../../redux/features/thunks/cityThunks';
import CustomModal from '../CustomModal';

const { Option } = Select;

interface IAssetFormProps {
  currentAsset?:IAssetModel;
  cities:ICity[] | [];
  loggedUser: string | null;
}
const AssetCard = ({ currentAsset, loggedUser, cities }: IAssetFormProps) => {
  const [disabled, setDisabled] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const citiesOptions = cities.map((item:ICity) => ({ value: item.name, label: item.name }));
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const handleOk = () => {
    if (currentAsset) {
      dispatch(deleteAsset(currentAsset.id as string));
      navigate('/');
    }
    setIsModalOpen(false);
  };
  const hamdleCancel = () => {
    setIsModalOpen(false);
  };
  const onFinish = (values:IAssetModel) => {
    if (currentAsset) {
      // If asset provided, then it may be updated
      let owner:string;
      if (currentAsset.history.length > 0) {
        owner = values.owner as string;
      } else {
        owner = 'склад';
      }
      const assetUpdates:IAssetModel = {
        ...values,
        history: [...currentAsset.history, {
          owner, date: new Date().toLocaleDateString(), comments: 'обновлен', lastModified: loggedUser as string,
        }],
      };
      dispatch(updateAsset({ id: currentAsset.id, ...assetUpdates }));
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
          owner: 'склад',
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
      console.log(currentAsset.history);
    }
  }, [currentAsset, dispatch]);
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
          <Row justify="space-between">
            <Button htmlType="submit">{currentAsset ? 'Обновить' : 'Создать'}</Button>
            {currentAsset && (
            <>
              <Button
                htmlType="button"
                onClick={() => setDisabled(!disabled)}
                disabled={false}
              >
                {disabled ? 'Редактировать' : 'Отменить'}
              </Button>
              <Button type="primary" danger onClick={() => setIsModalOpen(true)}>
                Удалить
              </Button>
            </>
            )}
          </Row>
        </Form.Item>
      </Form>
      <Row>
        {currentAsset && currentAsset.history && currentAsset.history.length > 0
          && (
          <div style={{ width: '90%' }}>
            <h5 style={{ fontSize: '25px' }}>История</h5>
            <HistoryTable history={currentAsset.history} />
          </div>
          )}
      </Row>
      <CustomModal title="Удаление актива" isModalOpen={isModalOpen} handleOk={handleOk} handleCancel={hamdleCancel}>
        Вы уверены?
      </CustomModal>
    </>
  );
};

export default AssetCard;
