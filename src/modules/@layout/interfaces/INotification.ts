import { INotificationDetail } from './INotificationDetail';

export interface INotification {
  name: string;
  details: INotificationDetail[];
}