import { IBaseChanges } from '@generic/interfaces';

export interface IMarkdownCategoryDetail {
  uid: string;
  name: string;
  description?: string;
  isActive: boolean;
  changes?: IBaseChanges;
}