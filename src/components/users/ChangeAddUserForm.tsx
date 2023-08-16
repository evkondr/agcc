import {
  Form, Input, Select, Button,
} from 'antd';
import React from 'react';
import { User } from '../../db';

const ChangeAddUserForm = () => {
  const onFinish = (values:User) => {
    console.log(values);
  };
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
          <Select.Option value="demo">Demo</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit">Создать</Button>
      </Form.Item>
    </Form>
  );
};

export default ChangeAddUserForm;
