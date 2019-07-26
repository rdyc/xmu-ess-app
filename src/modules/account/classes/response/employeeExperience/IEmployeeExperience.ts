import { ICommonSystem } from '@common/classes';
import { IBaseChanges } from '@generic/interfaces';
import { IEmployeeExperienceCompetency } from './IEmployeeExperienceCompetency';

export interface IEmployeeExperience {
  uid: string;
  company: string;
  position: string;
  profession?: ICommonSystem;
  professionType: string;
  start: number;
  end: number;
  changes?: IBaseChanges;
  competencies: IEmployeeExperienceCompetency[];
}