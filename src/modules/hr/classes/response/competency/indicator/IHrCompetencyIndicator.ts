import { IBaseChanges } from '@generic/interfaces';
import { IHrCompetencyLevelList } from '../level/IHrCompetencyLevelList';

export interface IHrCompetencyIndicator {
  uid: string;
  levelUid: string;
  level: IHrCompetencyLevelList;
  description: string;
  changes?: IBaseChanges;
}