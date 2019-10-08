import { IBaseChanges } from '@generic/interfaces';
import { IHrCornerCategoryList } from '../category/IHrCornerCategoryList';

export interface IHrCornerPageDetail {
  uid: string;
  categoryUid: string;
  category: IHrCornerCategoryList;
  title: string;
  slug: string;
  headline: string;
  content: string;
  start: string;
  end?: string;
  changes: IBaseChanges;
}