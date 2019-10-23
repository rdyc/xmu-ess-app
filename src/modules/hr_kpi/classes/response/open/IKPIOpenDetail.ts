import { IBaseChanges } from '@generic/interfaces';

export interface IKPIOpenDetail {
  uid: string;
  year: number;
  period: number;
  date: string;
  changes?: IBaseChanges;
}