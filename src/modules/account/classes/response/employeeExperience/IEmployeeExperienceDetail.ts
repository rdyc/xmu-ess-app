import { ICommonSystem } from '@common/classes';
import { IBaseChanges } from '@generic/interfaces';
import { IEmployeeExperienceCompetency } from './IEmployeeExperienceCompetency';

export interface IEmployeeExperienceDetail {
  uid: string;
  company: string;
  position: string;
  professionType: string;
  profession?: ICommonSystem;
  start: number;
  end: number;
  competencies: IEmployeeExperienceCompetency[];
  changes?: IBaseChanges;
}