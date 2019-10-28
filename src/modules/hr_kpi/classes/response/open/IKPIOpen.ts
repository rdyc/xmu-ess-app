import { IBaseChanges } from '@generic/interfaces';

export interface IKPIOpen {
  uid: string;
  year: number;
  period: number;
  date: string;
  changes?: IBaseChanges;
}