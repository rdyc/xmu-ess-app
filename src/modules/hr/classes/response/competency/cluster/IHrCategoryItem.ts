import { IHrLevelItem } from '../category/IHrLevelItem';

export interface IHrCategoryItem {
  uid: string;
  competencyUid: string;
  name: string;
  description: string;
  levels: IHrLevelItem[];
}