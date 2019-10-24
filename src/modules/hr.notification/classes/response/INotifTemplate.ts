import { IBaseChanges } from '@generic/interfaces';

export interface INotifTemplate {
  uid: string;
  name: string;
  changes: IBaseChanges;
}