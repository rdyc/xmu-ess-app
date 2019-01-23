import { ICommonSystem } from '@common/classes';
import { ILookupCompany, ILookupPosition, ILookupRole, ILookupRoleMenuList } from '@lookup/classes';

export interface IEmployeeAccessList {
  uid: string;
  companyUid: string | null;
  company: ILookupCompany | null;
  roleUid: string | null;
  role: ILookupRole | null;
  positionUid: string | null;
  position: ILookupPosition | null;
  menus: ILookupRoleMenuList[] | null;
  unitType: string | null;
  unit: ICommonSystem | null;
  departmentType: string | null;
  department: ICommonSystem | null;
  levelType: string | null;
  level: ICommonSystem | null;
  start: string | null;
  end: string | null;
  isActive: boolean;
  isExpired: boolean;
}