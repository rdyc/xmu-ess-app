import { IBaseChanges } from '@generic/interfaces';

export interface ITemplateDetail {
  uid: string;
  name: string;
  content: string;
  changes: IBaseChanges;
}