import { IUserPosition } from './IUserPosition';
import { IUserCompany } from './IUserCompany';

export interface IAppUser {
  uid: string;
  fullName: string;
  email: string;
  company: IUserCompany;
  position: IUserPosition;
}