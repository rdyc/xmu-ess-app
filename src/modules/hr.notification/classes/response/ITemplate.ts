import { IBaseChanges } from '@generic/interfaces';

export interface ITemplate {
  uid: string;
  name: string;
  changes: IBaseChanges;
}