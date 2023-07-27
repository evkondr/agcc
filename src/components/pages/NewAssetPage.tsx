import React, { useEffect, useState } from 'react';
import {
  Button, Form, Input, AutoComplete,
} from 'antd';
import { v4 as uuidv4 } from 'uuid';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { findUserBySurname } from '../../redux/features/userSlice';
import { assetModel, assetStatus } from '../../db';
import { addNewAsset } from '../../redux/features/assetSlice';

const NewAssetPage = () => {
  const [options, setOptions] = useState<{ value: string; label: string }[]>([]);
  const [userValue, setUserValue] = useState<string>('');
  const { foundUsers } = useAppSelector((state) => state.users);
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const onChange = (data: string) => {
    setUserValue(data);
  };
  const onSelect = (data: string) => {
    console.log('onSelect', data);
  };
  const handleSearch = (value: string) => {
    let res: { value: string; label: string }[] = [];
    if (!value.length) {
      res = [];
    } else {
      res = foundUsers.map((user) => ({
        value: user.fullName,
        label: user.fullName,
      }));
    }
    setOptions(res);
  };
  const onFinish = (values: assetModel) => {
    form.resetFields();
    const newAsset:assetModel = {
      ...values,
      id: uuidv4(),
      city: 'Москва',
      status: assetStatus.notAssigned,
      history: [{
        id: uuidv4(),
        prevOwner: '',
        comments: 'Создал',
        date: new Date().toLocaleString(),
        lastModified: 'Кондратьев ЕА',
      }],
    };
    dispatch(addNewAsset(newAsset));
  };
  useEffect(() => {
    dispatch(findUserBySurname(userValue));
  }, [userValue, dispatch]);
  return (
    <Form
      layout="vertical"
      style={{ maxWidth: '350px' }}
      initialValues={{}}
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
      <Form.Item label="Расположение" name="owner">
        <AutoComplete onSearch={handleSearch} onSelect={onSelect} onChange={onChange} placeholder="Введите фамилию, нажмите пробел" options={options} value={userValue} />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit">Добавить</Button>
      </Form.Item>
    </Form>
  );
};

export default NewAssetPage;
