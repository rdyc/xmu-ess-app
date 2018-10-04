import { INotificationDetailItem } from './INotificationDetailItem';

export interface INotificationDetail {
  type: string;
  items: INotificationDetailItem[];
  total: number;
}