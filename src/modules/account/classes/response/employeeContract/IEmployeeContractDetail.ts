import { IBaseChanges } from '@generic/interfaces';

export interface IEmployeeContractDetail {
  uid: string;
  contractNumber: string;
  start: string;
  end: string;
  changes: IBaseChanges;
}