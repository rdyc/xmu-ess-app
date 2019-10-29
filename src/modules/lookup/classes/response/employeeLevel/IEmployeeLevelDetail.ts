import { IBaseChanges } from '@generic/interfaces';

export interface IEmployeeLevelDetail {
  uid: string;
  seq: number;
  subSequence: number;
  value: string;
  description: string;
  changes?: IBaseChanges;
}