import { IBaseChanges } from '@generic/interfaces';
import { IHrCategoryItem } from './IHrCategoryItem';

export interface IHrCompetencyCluster {
  uid: string;
  name: string;
  description: string;
  categories: IHrCategoryItem[];
  changes?: IBaseChanges;
}