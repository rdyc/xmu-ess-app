import { ICommonSystem } from '@common/classes';

export interface IEmployeeFamilyList {
  uid: string;
  familyType: string;
  family: ICommonSystem | null;
  genderType: string;
  gender: ICommonSystem | null;
  fullName: string;
  birthPlace: string;
  birthDate: string | null;
}