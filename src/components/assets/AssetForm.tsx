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
  Col,
  Row,
} from 'antd';

import { v4 as uuidv4 } from 'uuid';
import HistoryTable from './HistoryTable';
import { IAssetModel } from '../../db';
import { addNewAsset } from '../../redux/features/assetSlice';
import { useAppDispatch } from '../../redux/hooks';

const { Option } = Select;

const AssetCard = ({ currentAsset }:{currentAsset?:IAssetModel}) => {
  const [disabled, setDisabled] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const onFinish = (values:IAssetModel) => {
    if (currentAsset) {
      // If user provided, then it may be updated
    } else {
      // Else it may be created
      dispatch(addNewAsset({ ...values, id: uuidv4(), history: [] }));
    }
  };
  useEffect(() => {
    if (currentAsset) {
      setDisabled(true);
    }
  }, [currentAsset]);
  if (!currentAsset) {
    return <div>Загрузка...</div>;
  }
  return (
    <>
      <Form
        layout="vertical"
        style={{ maxWidth: '350px' }}
        initialValues={currentAsset || {}}
        disabled={disabled}
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
          <Input />
        </Form.Item>
        <Form.Item label="Расположение" name="owner">
          <Select>
            <Option value="red">Иванов</Option>
            <Option value="green">Петров</Option>
            <Option value="blue">Сидоров</Option>
          </Select>
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
      <Row>
        {currentAsset.history && currentAsset.history.length > 0
          && (
          <div style={{ width: '90%' }}>
            <h5 style={{ fontSize: '25px' }}>История</h5>
            <HistoryTable history={currentAsset.history} />
          </div>
          )}
      </Row>
    </>
  );
};

export default AssetCard;
