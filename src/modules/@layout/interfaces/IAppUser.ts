import { IUserCompany } from './IUserCompany';
import { IUserPosition } from './IUserPosition';

export interface IAppUser {
  uid: string;
  fullName: string;
  email: string;
  company: IUserCompany;
  position: IUserPosition;
}