import { IHrCompetencyItem } from './IHrCompetencyItem';
import { IHrLevelItem } from './IHrLevelItem';

export interface IHrCompetencyCategoryList {
  uid: string;
  competencyUid: string;
  competency: IHrCompetencyItem;
  name: string;
  description: string;
  levels: IHrLevelItem[];
}