import { ICommonSystem } from '@common/classes';

export interface IEmployeeEducationList {
  uid: string;
  degreeType: string;
  degree: ICommonSystem | null;
  institution: string;
  major: string;
  start: number;
  end: number | null;
}