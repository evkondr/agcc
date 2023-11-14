/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/require-default-props */
import {
  Form, Input, Select, Button, Row, notification,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ICity, IUser } from '../../types';
import { useAppDispatch } from '../../redux/hooks';
import { addNewUser, deleteCurrentUser, updateCurrentUser } from '../../redux/features/thunks/userThunks';
import CustomModal from '../CustomModal';
import openNotification from '../../uitls/openNotification';

interface UserFormProps{
  user?:IUser
  cities: ICity[]
}
const UserForm = (props: UserFormProps) => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();
  let userValues: IUser | object = {};
  const { user, cities } = props;
  let userUpdates:object = {};
  if (user) {
    // If user provided, then use its values
    userValues = user;
  }
  const onValuesChange = (values:object) => {
    // Add only updated user data
    userUpdates = { ...userUpdates, ...values };
  };
  const handleOk = () => {
    if (user) {
      dispatch(deleteCurrentUser(user.id as string));
      navigate('/');
    }
    setIsModalOpen(false);
  };
  // Handle click Cancel on modal
  const hamdleCancel = () => {
    setIsModalOpen(false);
  };
  const handleRemove = () => {
    console.log();
    if (user && user.assets.length > 0) {
      return openNotification(api, 'error', 'Внимание!', 'Вы не можете удалить пользователя, пока на нем числится оборудование', 'top');
    }
    return setIsModalOpen(true);
  };
  const onFinish = (values:IUser) => {
    if (user) {
      // If user provided, then it may be updated
      dispatch(updateCurrentUser({ userId: user.id as string, updates: userUpdates }));
      setDisabled(true);
    } else {
      // Else it may be created
      const newUser = { ...values, assets: [], approvement: false };
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
    <>
      {contextHolder}
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
          <Row justify="space-between">
            <Button htmlType="submit">{user ? 'Обновить' : 'Создать'}</Button>
            {user && (
            <>
              <Button
                htmlType="button"
                onClick={() => setDisabled(!disabled)}
                disabled={false}
              >
                {disabled ? 'Редактировать' : 'Отменить'}
              </Button>
              <Button type="primary" danger onClick={handleRemove}>
                Удалить
              </Button>
            </>
            )}
          </Row>
        </Form.Item>
        <CustomModal title="Удаление актива" isModalOpen={isModalOpen} handleOk={handleOk} handleCancel={hamdleCancel}>
          Вы уверены?
        </CustomModal>
      </Form>
    </>
  );
};

export default UserForm;
