import React from 'react';
import { Modal } from 'antd';

type CustomModalProps = {
  children: React.ReactNode,
  handleOk: () => void,
  handleCancel: () => void
  isModalOpen: boolean
}
const CustomModal = ({
  children, handleOk, handleCancel, isModalOpen,
}:CustomModalProps) => {
  return (
    <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      {children}
    </Modal>
  );
};

export default CustomModal;
