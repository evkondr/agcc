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
import HistoryTable from './HistoryTable';
import {
  IAssetModel, IAssetModelShort, ICity, IModelType, IUser, assetStatus, IAssetModelUpdates,
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
  const [assetUpdates, setAssetUpdates] = useState<IAssetModelUpdates>({});
  // On user search
  const onSearch = (value: string) => {
    // TODO: validation
    dispatch(findUsersByFullName(value));
  };
  // On user change
  const onOwnerChange = (value: string) => {
    if (value !== currentAsset?.owner) {
      setAssetUpdates({ ...assetUpdates, owner: value });
      dispatch(findUsersByFullName(value));
    }
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
    const newAsset:IAssetModel = {
      ...values,
      id: uuidv4(),
      history: [{
        id: uuidv4(),
        owner: 'склад',
        comments: 'Создал',
        date: new Date().toLocaleString(),
        lastModified: loggedUser as string,
      }],
    };
    dispatch(addNewAsset(newAsset));
    form.resetFields();
  };
  const onFormValuesChange = (values:IAssetModelUpdates) => {
    // Add only updated asset data
    setAssetUpdates({ ...assetUpdates, ...values });
  };
  const updateHandler = (values:IAssetModelUpdates) => {
    if (currentAsset) {
      const { id, assets, fullName } = foundUsers[0];
      const assetToAdd:IAssetModelShort = {
        id: currentAsset.id,
        type: currentAsset.type,
        model: currentAsset.model,
        serialNumber: currentAsset.serialNumber,
      };
      const history = [...currentAsset.history, {
        owner: fullName, date: new Date().toLocaleDateString(), comments: 'обновлен', lastModified: loggedUser as string,
      }];
      const newAssetUpdates = {
        ...values,
        status: assetStatus.assigned,
        history,
      };
      if (currentOwner && currentAsset.id && currentOwner.fullName !== values.owner) {
      // If owner was changed
      // Then filter assets of previous user
        const filtredAssets = filterUserAssets(currentOwner?.assets, currentAsset.id);
        dispatch(putAssetToUser({ userId: currentOwner.id as string, assets: filtredAssets }));
      }
      dispatch(updateAsset({ assetID: currentAsset.id as string, assetUpdates: newAssetUpdates }));
      dispatch(putAssetToUser({ userId: id as string, assets: [...assets, assetToAdd] }));
      setDisabled(true);
    }
  };
  useEffect(() => {
    dispatch(fetchModelTypes());
    if (currentAsset) {
      setDisabled(true);
      dispatch(findUsersByFullName(currentAsset?.owner));
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
      <Row>
        <h2>{currentAsset?.model}</h2>
      </Row>
      {currentAsset && (
      <Row>
        <p style={{ fontSize: 20 }}>
          Статус:
          {' '}
          <span>{currentAsset?.status}</span>
        </p>
      </Row>
      )}
      {currentAsset && (
      <Row className="asset-buttons-container">
        <Button htmlType="button" disabled={disabled} onClick={() => updateHandler(assetUpdates)}>Обновить</Button>
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
      </Row>
      )}
      <Form
        layout="vertical"
        style={{ maxWidth: '350px' }}
        initialValues={currentAsset || {}}
        disabled={disabled}
        onFinish={onFinish}
        form={form}
        onValuesChange={onFormValuesChange}
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
          <Select
            showSearch
            onSearch={onSearch}
            options={usersOptions}
            onChange={onOwnerChange}
          />
        </Form.Item>
        {!currentAsset && (
        <Row>
          <Button htmlType="submit">Создать</Button>
        </Row>
        )}
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
