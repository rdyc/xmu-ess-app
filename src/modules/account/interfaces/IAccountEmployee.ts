import { ICommonSystem } from '@common/interfaces';

export interface IAccountEmployee {
  uid: string;
  joinDate: Date;
  inactiveDate: Date | null;
  employmentNumber: string;
  employmentType: string | null;
  employment: ICommonSystem | null;
  fullName: string;
  email: string | null;
  mobilePhone: string | null;
  address: string | null;
  genderType: string | null;
  gender: ICommonSystem | null;
}