/* eslint-disable react/require-default-props */
import {
  Form, Input, Select, Button,
} from 'antd';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../../db';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { addNewUser } from '../../redux/features/userSlice';

interface UserFormProps{
  user?:User
}
const UserForm = (props: UserFormProps) => {
  const dispatch = useAppDispatch();
  let userValues: User | object = {};
  const { user } = props;
  if (user) {
    userValues = user;
  }
  const onFinish = (values:User) => {
    if (user) {
      console.log(values);
    } else {
      dispatch(addNewUser({ ...values, id: uuidv4(), assets: [] }));
    }
  };
  const { cities } = useAppSelector((state) => state.cities);
  return (
    <Form layout="vertical" style={{ maxWidth: '350px' }} initialValues={userValues} onFinish={onFinish}>
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
        <Button htmlType="submit">Создать</Button>
      </Form.Item>
    </Form>
  );
};

export default UserForm;
