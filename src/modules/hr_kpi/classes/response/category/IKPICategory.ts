import { IBaseChanges } from '@generic/interfaces';

export interface IKPICategory {
  uid: string;
  name: string;
  measurementCount: number;
  changes?: IBaseChanges;
}