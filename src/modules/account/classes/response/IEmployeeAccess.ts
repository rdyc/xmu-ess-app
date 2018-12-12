import { ICommonSystem } from '@common/classes';
import { IBaseChanges } from '@generic/interfaces/IBaseChanges';
import { ILookupCompany, ILookupPosition, ILookupRole } from '@lookup/classes';

export interface IEmployeeAccess {
  uid: string;
  companyUid: string | null;
  company: ILookupCompany | null;
  roleUid: string | null;
  role: ILookupRole | null;
  positionUid: string | null;
  position: ILookupPosition | null;
  // menus (Array[LookupRoleMenuListModel], optional),
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
  changes: IBaseChanges | null;
}