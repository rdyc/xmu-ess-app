import { IHrCompetencyIndicatorList } from '../indicator/IHrCompetencyIndicatorList';
import { IHrLevelCategory } from './IHrLevelCategory';

export interface IHrCompetencyLevelList {
  uid: string;
  level: number;
  description: string;
  categoryUid: string;
  category: IHrLevelCategory;
  indicators: IHrCompetencyIndicatorList[];
}