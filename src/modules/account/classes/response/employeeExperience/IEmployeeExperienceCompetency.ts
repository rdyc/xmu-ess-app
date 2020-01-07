import { ICommonSystem } from '@common/classes';
import { IBaseChanges } from '@generic/interfaces';

export interface IEmployeeExperienceCompetency {
  uid: string;
  competencyType: string;
  competency?: ICommonSystem;
  isAvailable: boolean;
  changes?: IBaseChanges;
}