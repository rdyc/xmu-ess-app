import { IBaseChanges } from '@generic/interfaces';

export interface IHrCategoryItem {
  uid?: string;
  name: string;
  description: string;
  changes?: IBaseChanges;
}