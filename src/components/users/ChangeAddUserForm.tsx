import {
  Form, Input, Select, Button,
} from 'antd';
import React from 'react';
import { User } from '../../db';
import { useAppSelector } from '../../redux/hooks';

const ChangeAddUserForm = () => {
  const onFinish = (values:User) => {
    console.log(values);
  };
  const { cities } = useAppSelector((state) => state.cities);
  return (
    <Form layout="vertical" style={{ maxWidth: '350px' }} initialValues={{}} onFinish={onFinish}>
      <Form.Item name="suranme" label="Фамилия">
        <Input />
      </Form.Item>
      <Form.Item name="name" label="Имя">
        <Input />
      </Form.Item>
      <Form.Item name="secondname" label="Отчество">
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

export default ChangeAddUserForm;
