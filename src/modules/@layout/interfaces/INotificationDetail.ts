import { NotificationType } from '@layout/types';
import { INotificationDetailItem } from './INotificationDetailItem';

export interface INotificationDetail {
  type: NotificationType;
  items: INotificationDetailItem[];
  total: number;
}