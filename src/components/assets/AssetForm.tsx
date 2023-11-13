/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Form,
  Input,
  Select,
  Row,
  notification,
} from 'antd';

import { v4 as uuidv4 } from 'uuid';
import { isLabeledStatement } from 'typescript';
import HistoryTable from './HistoryTable';
import {
  IAssetModel, IAssetModelShort, ICity, IModelType, IUser, assetStatus,
} from '../../types';
import {
  addNewAsset, deleteAsset, fetchCurrentAssetOwner, fetchModelTypes, updateAsset,
} from '../../redux/features/thunks/assetThunks';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import CustomModal from '../CustomModal';
import { findUsersByFullName, putAssetToUser } from '../../redux/features/thunks/userThunks';
import filterUserAssets from '../../uitls/filterUserAssets';
import openNotification from '../../uitls/openNotification';

interface IAssetFormProps {
  currentAsset?:IAssetModel;
  cities:ICity[] | [];
  loggedUser: string | null;
}
const AssetForm = ({ currentAsset, loggedUser, cities }: IAssetFormProps) => {
  const [disabled, setDisabled] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [api, contextHolder] = notification.useNotification();
  const { foundUsers } = useAppSelector((state) => state.users);
  const { currentOwner, modelTypes } = useAppSelector((state) => state.assets);
  const statusOptions = [assetStatus.warehouse, assetStatus.assigned, assetStatus.repair]
    .map((item) => ({
      value: item,
      label: item,
    }));
  const usersOptions = foundUsers.map((item:IUser) => ({
    value: item.fullName,
    label: item.fullName,
  }));
  const modelTypesOptions = modelTypes.map((item:IModelType) => ({
    value: item.name,
    label: item.name,
  }));
  const navigate = useNavigate();
  const citiesOptions = cities.map((item:ICity) => ({ value: item.name, label: item.name }));
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  // On user search
  const onSearch = (value: string) => {
    // TODO: validation
    dispatch(findUsersByFullName(value));
  };
  // On user change
  const onChange = (value: string) => {
    dispatch(findUsersByFullName(value));
  };
  // Handle click Ok on modal
  const handleOk = () => {
    if (currentAsset) {
      dispatch(deleteAsset(currentAsset.id as string));
      navigate('/');
    }
    setIsModalOpen(false);
  };
  // Handle click Cancel on modal
  const hamdleCancel = () => {
    setIsModalOpen(false);
  };
  const handleRemove = () => {
    if (currentAsset && currentAsset.owner) {
      return openNotification(api, 'error', 'Внимание!', 'Вы не можете удалить актив, пока он назначен на пользователя', 'top');
    }
    setIsModalOpen(true);
  };
  // Submit form handler
  const onFinish = (values:IAssetModel) => {
    if (currentAsset) {
      // If asset provided, then it may be updated
      let owner:string;
      const { id, assets } = foundUsers[0];
      const assetToAdd:IAssetModelShort = {
        id: currentAsset.id,
        type: currentAsset.type,
        model: currentAsset.model,
        serialNumber: currentAsset.serialNumber,
      };
      if (currentAsset.history.length > 0) {
        owner = values.owner as string;
      } else {
        owner = 'склад';
      }
      const assetUpdates:IAssetModel = {
        ...values,
        history: [...currentAsset.history, {
          owner, date: new Date().toLocaleDateString(), comments: 'обновлен', lastModified: loggedUser as string,
        }],
      };
      if (currentOwner && currentAsset.id) {
        // If owner was changed
        const filtredAssets = filterUserAssets(currentOwner?.assets, currentAsset.id);
        dispatch(putAssetToUser({ userId: currentOwner.id as string, assets: filtredAssets }));
      }
      dispatch(updateAsset({ id: currentAsset.id, ...assetUpdates }));
      dispatch(putAssetToUser({ userId: id as string, assets: [...assets, assetToAdd] }));
      setDisabled(true);
    } else {
      // Else it may be created
      form.resetFields();
      const newAsset:IAssetModel = {
        ...values,
        history: [{
          id: uuidv4(),
          owner: 'склад',
          comments: 'Создал',
          date: new Date().toLocaleString(),
          lastModified: loggedUser as string,
        }],
      };
      dispatch(addNewAsset(newAsset));
    }
  };
  useEffect(() => {
    dispatch(fetchModelTypes());
    if (currentAsset) {
      setDisabled(true);
    }
    return () => {
      if (currentAsset) {
        dispatch(fetchCurrentAssetOwner(currentAsset.owner));
      }
    };
  }, [currentAsset, dispatch]);
  return (
    <>
      {contextHolder}
      <Form
        layout="vertical"
        style={{ maxWidth: '350px' }}
        initialValues={currentAsset || {}}
        disabled={disabled}
        onFinish={onFinish}
        form={form}
      >
        <Form.Item label="Модель" name="model">
          <Input />
        </Form.Item>
        <Form.Item label="Тип" name="type">
          <Select showSearch options={modelTypesOptions} />
        </Form.Item>
        <Form.Item label="Серийный номер" name="serialNumber">
          <Input />
        </Form.Item>
        <Form.Item label="Город" name="city">
          <Select placeholder="Выбрать город" options={citiesOptions} />
        </Form.Item>
        <Form.Item label="Расположение" name="owner">
          <Select showSearch onSearch={onSearch} options={usersOptions} onChange={onChange} />
        </Form.Item>
        <Form.Item label="Статус" name="status" initialValue={assetStatus.warehouse}>
          <Select
            options={
            statusOptions
          }
          />
        </Form.Item>
        <Form.Item>
          <Row justify="space-between">
            <Button htmlType="submit">{currentAsset ? 'Обновить' : 'Создать'}</Button>
            {currentAsset && (
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
      </Form>
      <Row>
        {currentAsset && currentAsset.history && currentAsset.history.length > 0
          && (
          <div style={{ width: '90%' }}>
            <h5 style={{ fontSize: '25px' }}>История</h5>
            <HistoryTable history={currentAsset.history} />
          </div>
          )}
      </Row>
      <CustomModal title="Удаление актива" isModalOpen={isModalOpen} handleOk={handleOk} handleCancel={hamdleCancel}>
        Вы уверены?
      </CustomModal>
    </>
  );
};

export default AssetForm;
