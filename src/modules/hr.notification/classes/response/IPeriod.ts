import { IBaseChanges } from '@generic/interfaces';

export interface IPeriod {
  uid: string;
  name: string;
  from: number;
  to: number;
  changes?: IBaseChanges;
}