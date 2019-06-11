import { IBaseChanges } from '@generic/interfaces';

export interface IEmployeeRateCurrent {
  uid: string;
  value: number;
  isActive: boolean;
  changes?: IBaseChanges;
}