import { CommonSystemType } from '../../common/types/CommonSystemType';

export interface NotificationItemType {
  uid: string;
  name: string;
  date: Date;
  commonType: string | null;
  type: CommonSystemType | null;
}