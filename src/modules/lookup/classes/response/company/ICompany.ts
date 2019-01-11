import { IBaseChanges } from '@generic/interfaces';

export interface ICompany {
  uid: string;
  code: string;
  name: string;
  changes?: IBaseChanges;
}