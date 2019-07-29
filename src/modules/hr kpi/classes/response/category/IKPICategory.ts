import { IBaseChanges } from '@generic/interfaces';

export interface IKPICategory {
  uid: string;
  name: string;
  changes?: IBaseChanges;
}