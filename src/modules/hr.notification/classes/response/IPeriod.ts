import { IBaseChanges } from '@generic/interfaces';

export interface IPeriod {
  uid: string;
  type: string;
  name: string;
  from: number;
  to: number;
  changes?: IBaseChanges;
}