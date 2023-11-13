/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NotificationPlacement } from 'antd/es/notification/interface';

type NotificationType = 'success' | 'info' | 'warning' | 'error';
const openNotification = (
  api:any,
  type: NotificationType,
  message: string,
  description: string,
  placement?: NotificationPlacement,
) => {
  api[type]({
    message,
    description,
    placement,
  });
};
export default openNotification;
