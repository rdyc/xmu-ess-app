import { IBaseChanges } from '@generic/interfaces';

export interface ICompanyDetail {
  uid: string;
  code: string;
  name: string;
  changes?: IBaseChanges;
}