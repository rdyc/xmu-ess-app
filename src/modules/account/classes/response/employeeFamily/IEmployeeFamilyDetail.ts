import { ICommonSystem } from '@common/classes';
import { IBaseChanges } from '@generic/interfaces';

export interface IEmployeeFamilyDetail {
  uid: string;
  familyType: string;
  family: ICommonSystem | null;
  genderType: string;
  gender: ICommonSystem | null;
  fullName: string;
  birthPlace: string;
  birthDate: string | null;
  changes: IBaseChanges | null;
}