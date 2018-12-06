import { ICommonSystem } from '@common/classes';
import { ILookupCompany, ILookupPosition, ILookupRole } from '@lookup/classes';
import { IAccountEmployee } from './IAccountEmployee';

export interface IAccountEmployeeAccess {
  uid: string;
  employeeUid: string;
  employee?: IAccountEmployee | null;
  companyUid: string;
  company?: ILookupCompany | null;
  roleUid: string;
  role?: ILookupRole | null;
  positionUid: string;
  position?: ILookupPosition | null;
  unitType?: string | null;
  unit?: ICommonSystem | null;
  departmentType?: string | null;
  department?: ICommonSystem | null;
  levelType: string;
  level?: ICommonSystem | null;
  start: string;
  end?: string | null;
  isActive: boolean;
  isExpired: boolean;
}