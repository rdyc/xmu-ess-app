import { INotificationDetail } from './INotificationDetail';

export interface INotification {
  name: string;
  moduleUid: string;
  details: INotificationDetail[];
}