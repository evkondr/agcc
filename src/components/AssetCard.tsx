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
      dispatch(getCurrentAsset(+id));
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
            <Option value="red">Red</Option>
            <Option value="green">Green</Option>
            <Option value="blue">Blue</Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button disabled={false} onClick={onEditHandler}>{isEdit ? 'Сохранить' : 'Редактировать'}</Button>
        </Form.Item>
      </Form>
      <Row>
        <div>
          <h5>История</h5>
        </div>
      </Row>
    </>
  );
};

export default AssetCard;
