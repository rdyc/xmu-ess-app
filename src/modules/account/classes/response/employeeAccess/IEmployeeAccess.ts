import { ICommonSystem } from '@common/classes';
import { IBaseChanges } from '@generic/interfaces/IBaseChanges';
import { ILookupCompany, ILookupPosition, ILookupRole, ILookupRoleMenuList } from '@lookup/classes';

export interface IEmployeeAccess {
  uid: string;
  companyUid: string;
  company?: ILookupCompany;
  roleUid: string;
  role?: ILookupRole;
  positionUid: string;
  position?: ILookupPosition;
  menus?: ILookupRoleMenuList[];
  unitType?: string;
  unit?: ICommonSystem;
  departmentType?: string;
  department?: ICommonSystem;
  levelType: string;
  level?: ICommonSystem;
  start: string;
  end?: string;
  isActive: boolean;
  isExpired: boolean;
  changes?: IBaseChanges;
}