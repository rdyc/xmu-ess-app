import { IEmployeeAccessList } from '@account/classes';
import { ILookupRoleMenuList } from '@lookup/classes';

import { IUserCompany } from './IUserCompany';
import { IUserLevel } from './IUserLevel';
import { IUserPosition } from './IUserPosition';
import { IUserRole } from './IUserRole';

export interface IAppUser {
  uid: string;
  fullName: string;
  email: string;
  company: IUserCompany;
  position: IUserPosition;
  level: IUserLevel;
  role: IUserRole;
  menus: ILookupRoleMenuList[] | null | undefined;
  access: IEmployeeAccessList[];
}