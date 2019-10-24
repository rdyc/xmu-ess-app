import { IBaseChanges } from '@generic/interfaces';

export interface IKPIAssign {
  uid: string;
  employeeUid: string;
  year: number;
  templateUid: string;
  isFinal: boolean;
  revision?: string;
  note?: string;
  changes?: IBaseChanges;
}