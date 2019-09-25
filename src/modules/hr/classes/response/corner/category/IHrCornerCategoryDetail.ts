import { IBaseChanges } from '@generic/interfaces';

export interface IHrCornerCategoryDetail {
  uid: string;
  name: string;
  description: string;
  slug: string;
  changes?: IBaseChanges;
}