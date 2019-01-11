import { ICommonSystem } from '@common/classes';
import { IBaseChanges } from '@generic/interfaces';

export interface IEmployeeFamily {
  uid: string;
  familyType: string;
  family?: ICommonSystem;
  genderType: string;
  gender?: ICommonSystem;
  fullName: string;
  birthPlace: string;
  birthDate?: string;
  changes?: IBaseChanges;
}