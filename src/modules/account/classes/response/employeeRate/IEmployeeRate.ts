import { IBaseChanges } from '@generic/interfaces';

export interface IEmployeeRate {
  uid: string;
  value: number;
  isActive: boolean;
  changes: IBaseChanges | null;
}