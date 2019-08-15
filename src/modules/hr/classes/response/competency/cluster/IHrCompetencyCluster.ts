import { IBaseChanges } from '@generic/interfaces';
import { IHrCompetencyCategoryList } from '../category/IHrCompetencyCategoryList';

export interface IHrCompetencyCluster {
  uid: string;
  name: string;
  description: string;
  categories: IHrCompetencyCategoryList[];
  changes?: IBaseChanges;
}