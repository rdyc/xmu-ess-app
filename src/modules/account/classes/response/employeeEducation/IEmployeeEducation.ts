import { ICommonSystem } from '@common/classes';
import { IBaseChanges } from '@generic/interfaces';

export interface IEmployeeEducation {
  uid: string;
  degreeType: string;
  degree: ICommonSystem | null;
  institution: string;
  major: string;
  start: number;
  end: number | null;
  changes: IBaseChanges | null;
}