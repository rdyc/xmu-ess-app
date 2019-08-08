import { IHrCompetencyCategoryList } from '../category/IHrCompetencyCategoryList';

export interface IHrCompetencyLevelList {
  uid: string;
  categoryUid: string;
  category: IHrCompetencyCategoryList;
  level: number;
  description: string;
}