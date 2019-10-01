import { IBaseChanges } from '@generic/interfaces';

export interface IEmployeeLevel {
  uid: string;
  seq: number;
  value: string;
  description: string;
  changes?: IBaseChanges;
}