import { IBaseChanges } from '@generic/interfaces';
import { IHrCompetencyItem } from './IHrCompetencyItem';
import { IHrLevelItem } from './IHrLevelItem';

export interface IHrCompetencyCategory {
  uid: string;
  competencyUid: string;
  competency: IHrCompetencyItem;
  name: string;
  description: string;
  levels: IHrLevelItem[];
  changes?: IBaseChanges;
}