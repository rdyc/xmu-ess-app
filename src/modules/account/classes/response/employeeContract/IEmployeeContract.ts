import { IBaseChanges } from '@generic/interfaces';

export interface IEmployeeContract {
  uid: string;
  contractNumber: string;
  start: string;
  end: string;
  changes: IBaseChanges;
}