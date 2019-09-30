import { IBaseChanges } from '@generic/interfaces';

export interface IEmployeeLevelDetail {
  uid: string;
  seq: number;
  value: string;
  description: string;
  changes?: IBaseChanges;
}