import { IEmployeeAccessList } from '@account/classes';
import { ILookupRoleMenuList } from '@lookup/classes';

import { IUserCompany } from './IUserCompany';
import { IUserPosition } from './IUserPosition';
import { IUserRole } from './IUserRole';

export interface IAppUser {
  uid: string;
  fullName: string;
  email: string;
  company: IUserCompany;
  position: IUserPosition;
  role: IUserRole;
  menus: ILookupRoleMenuList[] | null | undefined;
  access: IEmployeeAccessList[];
}