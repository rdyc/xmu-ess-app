import { IHrCategoryItem } from './IHrCategoryItem';

export interface IHrCompetencyClusterList {
  uid: string;
  name: string;
  description: string;
  categories: IHrCategoryItem[];
}