import { IBaseChanges } from '@generic/interfaces';
// import { IHrCategoryItem } from './IHrCategoryItem';
import { IHrCompetencyCategoryList } from '../category/IHrCompetencyCategoryList';

export interface IHrCompetencyClusterDetail {
  uid: string;
  name: string;
  description: string;
  categories: IHrCompetencyCategoryList[];
  changes?: IBaseChanges;
}