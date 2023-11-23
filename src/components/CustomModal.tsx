import React from 'react';
import { Modal } from 'antd';

type CustomModalProps = {
  children: React.ReactNode,
  handleOk: () => void,
  handleCancel: () => void,
  isModalOpen: boolean,
  title: string;
}
const CustomModal = ({
  children, handleOk, handleCancel, isModalOpen, title,
}:CustomModalProps) => {
  return (
    <Modal title={title} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      {children}
    </Modal>
  );
};

export default CustomModal;
