/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/require-default-props */
import {
  Form, Input, Select, Button,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { ICity, IUser } from '../../types';
import { useAppDispatch } from '../../redux/hooks';
import { addNewUser, updateCurrentUser } from '../../redux/features/thunks/userThunks';

interface UserFormProps{
  user?:IUser
  cities: ICity[]
}
const UserForm = (props: UserFormProps) => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  let userValues: IUser | object = {};
  const { user, cities } = props;
  const [disabled, setDisabled] = useState<boolean>(false);
  let userUpdates:object = {};
  if (user) {
    // If user provided, then use its values
    userValues = user;
  }
  const onValuesChange = (values:object) => {
    // Add only updated user data
    userUpdates = { ...userUpdates, ...values };
  };
  const onFinish = (values:IUser) => {
    if (user) {
      // If user provided, then it may be updated
      dispatch(updateCurrentUser({ userId: user.id as string, updates: userUpdates }));
      setDisabled(true);
    } else {
      // Else it may be created
      const newUser = { ...values, assets: [] };
      dispatch(addNewUser(newUser));
      form.resetFields();
    }
  };
  useEffect(() => {
    if (user) {
      setDisabled(true);
    }
  }, [user]);
  return (
    <Form form={form} onValuesChange={onValuesChange} layout="vertical" style={{ maxWidth: '350px' }} initialValues={userValues} onFinish={onFinish} disabled={disabled}>
      <Form.Item name="surname" label="Фамилия">
        <Input />
      </Form.Item>
      <Form.Item name="name" label="Имя">
        <Input />
      </Form.Item>
      <Form.Item name="secondName" label="Отчество">
        <Input />
      </Form.Item>
      <Form.Item name="email" label="Почта">
        <Input />
      </Form.Item>
      <Form.Item name="city" label="Город">
        <Select>
          {cities.map((item) => {
            return <Select.Option key={item.id} value={item.name}>{ item.name }</Select.Option>;
          })}
        </Select>
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" style={{ marginRight: '10px' }}>{user ? 'Обновить' : 'Создать'}</Button>
        {user && (
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
  );
};

export default UserForm;
