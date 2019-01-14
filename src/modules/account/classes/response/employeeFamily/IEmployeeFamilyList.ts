import { ICommonSystem } from '@common/classes';

export interface IEmployeeFamilyList {
  uid: string;
  familyType: string;
  family?: ICommonSystem;
  genderType: string;
  gender?: ICommonSystem;
  fullName: string;
  birthPlace: string;
  birthDate?: string;
}