import { IHrCompetencyIndicatorList } from '../indicator/IHrCompetencyIndicatorList';

export interface IHrCompetencyLevelList {
  uid: string;
  level: number;
  description: string;
  indicators: IHrCompetencyIndicatorList[];
}