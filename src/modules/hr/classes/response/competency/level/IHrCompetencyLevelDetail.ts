import { IBaseChanges } from '@generic/interfaces';
import { IHrCompetencyCategoryList } from '../category/IHrCompetencyCategoryList';

export interface IHrCompetencyLevelDetail {
  uid: string;
  categoryUid: string;
  category: IHrCompetencyCategoryList;
  level: number;
  description: string;
  changes?: IBaseChanges;
}