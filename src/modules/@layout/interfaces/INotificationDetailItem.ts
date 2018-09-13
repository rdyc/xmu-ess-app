import { ICommonSystem } from '../../common/interfaces/ICommonSystem';

export interface INotificationDetailItem {
  uid: string;
  name: string;
  date: Date;
  commonType: string | null;
  type: ICommonSystem | null;
}