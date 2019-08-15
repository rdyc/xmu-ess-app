import { IHrCompetencyCategoryList } from '../category/IHrCompetencyCategoryList';

export interface IHrCompetencyClusterList {
  uid: string;
  name: string;
  description: string;
  categories: IHrCompetencyCategoryList[];
}