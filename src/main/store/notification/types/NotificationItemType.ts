import { NotificationItemType } from './NotificationDetailType';

export interface NotificationDetailType {
  type: string;
  items: NotificationItemType[];
  total: number;
}