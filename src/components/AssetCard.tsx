/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import React, { useState, useLayoutEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Button,
  Form,
  Input,
  Select,
  Col,
  Row,
} from 'antd';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { getCurrentAsset, resetCurrentAsset } from '../redux/features/assetSlice';
import HistoryTable from './HistoryTable';

const { Option } = Select;

const AssetCard = () => {
  const { id } = useParams();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const onEditHandler = () => {
    setIsEdit(!isEdit);
  };
  const { currentAsset } = useAppSelector((state) => state.asset);
  const dispatch = useAppDispatch();
  useLayoutEffect(() => {
    if (id) {
      dispatch(getCurrentAsset(id));
      return () => {
        dispatch(resetCurrentAsset());
      };
    }
  }, [dispatch, id]);
  if (!currentAsset) {
    return <div>Загрузка...</div>;
  }
  return (
    <>
      <Form
        layout="vertical"
        style={{ maxWidth: '350px' }}
        initialValues={currentAsset}
        disabled={!isEdit}
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
        <Form.Item label="Расположение" name="owner">
          <Select>
            <Option value="red">Иванов</Option>
            <Option value="green">Петров</Option>
            <Option value="blue">Сидоров</Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button disabled={false} onClick={onEditHandler}>{isEdit ? 'Сохранить' : 'Редактировать'}</Button>
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
