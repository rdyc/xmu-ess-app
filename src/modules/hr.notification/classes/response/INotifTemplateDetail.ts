import { IBaseChanges } from '@generic/interfaces';

export interface INotifTemplateDetail {
  uid: string;
  name: string;
  content: string;
  changes: IBaseChanges;
}