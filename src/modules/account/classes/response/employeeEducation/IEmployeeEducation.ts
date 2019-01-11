import { ICommonSystem } from '@common/classes';
import { IBaseChanges } from '@generic/interfaces';

export interface IEmployeeEducation {
  uid: string;
  degreeType: string;
  degree?: ICommonSystem;
  institution: string;
  major: string;
  start: number;
  end?: number;
  changes?: IBaseChanges;
}