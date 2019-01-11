import { IBaseChanges } from '@generic/interfaces';

export interface IEmployeeExperienceDetail {
  uid: string;
  company: string;
  position: string;
  start: number;
  end: number;
  changes?: IBaseChanges;
}