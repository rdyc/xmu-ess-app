import { IBaseChanges } from '@generic/interfaces';

export interface INotifPeriod {
  uid: string;
  type: string;
  name: string;
  range: string;
  from: number;
  to: number;
  changes?: IBaseChanges;
}