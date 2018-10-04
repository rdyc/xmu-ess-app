import { ICommonSystem } from '@common/classes';

export interface INotificationDetailItem {
  uid: string;
  name: string;
  date: Date;
  commonType: string | null;
  type: ICommonSystem | null;
}