import { IBaseChanges } from '@generic/interfaces';
import { IHrCornerCategoryList } from '../category/IHrCornerCategoryList';

export interface IHrCornerPage {
  uid: string;
  categoryUid: string;
  category: IHrCornerCategoryList;
  title: string;
  slug: string;
  headline: string;
  start: string;
  end?: string;
  changes: IBaseChanges;
}