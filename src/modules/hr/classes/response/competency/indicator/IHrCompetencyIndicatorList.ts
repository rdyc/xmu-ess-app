import { IHrCompetencyLevelList } from '../level/IHrCompetencyLevelList';

export interface IHrCompetencyIndicatorList {
  uid: string;
  levelUid: string;
  level: IHrCompetencyLevelList;
  description: string;
}