/* eslint-disable react/require-default-props */
import {
  Form, Input, Select, Button,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { IUser } from '../../types';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { addNewUser, updateCurrentUser } from '../../redux/features/userSlice';

interface UserFormProps{
  user?:IUser
}
const UserForm = (props: UserFormProps) => {
  const dispatch = useAppDispatch();
  let userValues: IUser | object = {};
  const { user } = props;
  const [disabled, setDisabled] = useState<boolean>(false);
  if (user) {
    // If user provided, then use its values
    userValues = user;
  }
  const onFinish = (values:IUser) => {
    if (user) {
      // If user provided, then it may be updated
      dispatch(updateCurrentUser({ id: user.id as string, userData: { ...values, assets: [] } }));
      setDisabled(true);
    } else {
      // Else it may be created
      dispatch(addNewUser({ ...values, id: uuidv4(), assets: [] }));
    }
  };
  const { cities } = useAppSelector((state) => state.cities);
  useEffect(() => {
    if (user) {
      setDisabled(true);
    }
  }, [user]);
  return (
    <Form layout="vertical" style={{ maxWidth: '350px' }} initialValues={userValues} onFinish={onFinish} disabled={disabled}>
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
