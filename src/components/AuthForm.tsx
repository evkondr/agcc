import React from 'react';
import {
  Button, Form, Input, Row,
} from 'antd';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';

interface AuthFormProps{
    onFinish: () => void,
    demoEntrance: () => void
}

type LoginField = {
    username?: string;
    password?: string;
}

const AuthForm = ({ onFinish, demoEntrance }:AuthFormProps) => {
  const { demoToken } = useAppSelector((state) => state.auth);
  if (demoToken) {
    return <Navigate to="/" />;
  }
  return (
    <Form name="auth-form" style={{ width: '300px' }} layout="vertical" onFinish={onFinish}>
      <Form.Item<LoginField> label="Логин" name="username">
        <Input />
      </Form.Item>
      <Form.Item<LoginField> label="Пароль" name="password">
        <Input />
      </Form.Item>
      <Form.Item>
        <Row style={{ columnGap: '10px' }}>
          <Button htmlType="submit">Войти</Button>
          <Button htmlType="button" onClick={demoEntrance}>Демо</Button>
        </Row>
      </Form.Item>
    </Form>
  );
};

export default AuthForm;
