import { IBaseChanges } from '@generic/interfaces';

export interface IEmployeeExperience {
  uid: string;
  company: string;
  position: string;
  start: number;
  end: number;
  changes?: IBaseChanges;
}