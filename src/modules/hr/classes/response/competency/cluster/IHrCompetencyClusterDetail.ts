import { IBaseChanges } from '@generic/interfaces';
import { IHrCategoryItem } from './IHrCategoryItem';

export interface IHrCompetencyClusterDetail {
  uid: string;
  name: string;
  description: string;
  categories: IHrCategoryItem[];
  changes?: IBaseChanges;
}